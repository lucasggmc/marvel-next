import Head from "next/head";
import { useRef, useState } from "react";

import CardComic from "../components/CardComic";
import { Header } from "../components/Header";

import axios from "axios";
import { api } from "../service/api";

import { store } from "react-notifications-component";
import styles from "./home.module.scss";

type Comic = {
  id: number;
  title: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  images: {
    path: string;
    extension: string;
  };
  description: string;
  urls: [];
  isSelected: false;
};

type HomeProps = {
  comics: Comic[];
};

export default function Home({ comics }: HomeProps) {
  const [state, setState] = useState({
    Comics: comics,
  });

  const [email, setEmail] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const [filter, setFilter] = useState("");

  function findComics() {
    let textSearched = inputRef.current.value;

    setFilter(textSearched);
  }

  //chama o método que faz o envio de e-mail na API
  function send(comicsToSend) {
    axios
      .post(`/api/sendEmail`, { req: comicsToSend, email: email })
      .then((response) => {
        showNotification(200);
      })
      .catch((error) => {
        showNotification(400);
      });
  }

  function verifyComicsToSend() {
    if (email == "") return;

    const comicsSelected = state.Comics.filter((comic) => comic.isSelected);
    if (comicsSelected.length != 0) send(comicsSelected);
  }

  function showNotification(status: number) {
    let title = "E-mail sent";
    let message = "Check your inbox";
    let type = "success";

    if (status === 400) {
      title = "Email not sent";
      message = "An error occurred sending email";
      type = "danger";
    }

    store.addNotification({
      title: title,
      message: message,
      type: type,
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    });
  }

  return (
    <div>
      <Head>
        <title>MARVEL | Comics</title>
      </Head>
      <Header />

      <div className={styles.searchBox}>
        <input type="text" placeholder="Find comic" ref={inputRef} />
        <button type="button" onClick={findComics}>
          <img src="/icons/arrow-button.svg" />
        </button>
      </div>

      <div className={styles.cardsComic}>
        {state.Comics.filter(
          (comic) => comic.title.toLowerCase().includes(filter) || filter === ""
        ).map((comic, index) => {
          return (
            <div key={comic.id}>
              <CardComic key={comic.id} comic={comic} />
            </div>
          );
        })}
      </div>

      <div className={styles.info}>
        <p>You can select and send some comics by email!</p>
      </div>

      <div className={styles.footerEmail}>
        <input
          type="text"
          placeholder="Your best email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <button type="button" onClick={verifyComicsToSend}>
          Send!
        </button>
      </div>
    </div>
  );
}

//maneira SSR
export async function getServerSideProps() {
  const { data } = await api.get("comics", {
    params: {
      format: "comic",
      limit: 3,
    },
  });

  const comics = data.data.results.map((comic) => {
    return {
      id: comic.id,
      title: comic.title,
      thumbnail: comic.thumbnail,
      images: comic.images,
      urls: comic.urls,
      description: comic.description,
      isSelected: false,
    };
  });

  return {
    props: {
      comics: comics,
    },
  };
}
