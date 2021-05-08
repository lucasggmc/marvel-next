import Head from 'next/head';
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
  urls: []
}

type HomeProps = {
  comics: Comic[]
}

export default function Home({ comics }: HomeProps) {
  
  //useEffect(() => {
    // fetch(`https://gateway.marvel.com:443/v1/public/comics?format=comic&limit=1&apikey=${apiKey}`)
    // .then(response => response.json())
    // .then(data => console.log(data))        
  //}, [])
    

   console.log('props', comics);

  return (
    <div className={styles.homepage}>
      <Head>
        <title>MARVEL | Comics</title>
      </Head>      
      <Header />

      <div className={styles.searchBox}>
        <input type="text" placeholder="Find comic" />
        <button type="button">
          <img src="/icons/arrow-button.svg" />
        </button>
      </div>

      <div className={styles.cardsComic}>
        
        {
          comics.map((comic, index) => {                        
            <CardComic />                        
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
      //ts: ts,
      //apikey: apiKey,  
      //hash: hash    
    }
  })

  //console.log('datona', data.data.results);
  const comics = data.data.results.map(comic => {
    console.log('comicao', comic)

    return {
      id: comic.id,
      title: comic.title,
      thumbnail: comic.thumbnail,
      urls: comic.urls
    };

  })
  
    return {
    props: {
      comics: comics
    }
  };
}
