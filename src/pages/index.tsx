import Head from 'next/head';
import { useRef, useState } from 'react';
import CardComic from "../components/CardComic";
import { Header } from "../components/Header";

import { api } from '../service/api';

import styles from './home.module.scss';

type Comic = {
  id: number;
  title: string;
  thumbnail: {
    path: string;
    extension: string;
  },
  images: {
    path: string;
    extension: string;
  },
  description: string;
  urls: [];
  isSelected: false
}

type HomeProps = {
  comics: Comic[]
}

export default function Home({ comics }: HomeProps) {

  const [state, setState] = useState({
    Comics: comics
  });

  const inputRef = useRef<HTMLInputElement>(null);      
  

  const [filter, setFilter] = useState('');  

  function findComics(){
    let textSearched = inputRef.current.value;    

    setFilter(textSearched)
  }

  return (
    <div>
      <Head>
        <title>MARVEL | Comics</title>
      </Head>      
      <Header />

      <div className={styles.searchBox}>
        <input type="text" 
        placeholder="Find comic" 
        //value={filter}
        //onChange={event => setFilter(event.target.value)}
        ref={inputRef}       
        />
        <button type="button" onClick={findComics}>
          <img src="/icons/arrow-button.svg" />
        </button>
      </div>

      <div className={styles.cardsComic}>
        
        {
          state.Comics.filter(comic => comic.title.toLowerCase().includes(filter) || filter === '').map((comic, index) => {                                         
            return (                    
              <div key={comic.id}>
              <CardComic key={comic.id} images={comic.images} thumbnail={comic.thumbnail} title={comic.title} id={comic.id} description={comic.description} isSelected={comic.isSelected}/> 
              </div>
            );
          })
        }        
      </div>
     
    </div>
  )
}

//maneira SSR
export async function getServerSideProps() {  

  const { data } = await api.get('comics', {
    params: {
      format: 'comic',
      limit: 3          
    }
  })  

  const comics = data.data.results.map(comic => {
    console.log('comicao', comic)
    comic.isSelected = false    

    return {
      id: comic.id,
      title: comic.title,
      thumbnail: comic.thumbnail,
      images: comic.images,
      urls: comic.urls,
      description: comic.description,
      isSelected: comic.isSelected
    };

  })
    
    return {
    props: {
      comics: comics
    }
  };
}
