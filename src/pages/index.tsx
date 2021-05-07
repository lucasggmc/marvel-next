import Head from 'next/head';
import CardComic from "../components/CardComic";
import { Header } from "../components/Header";

import styles from './home.module.scss';

export default function Home() {
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
        <CardComic />
        <CardComic />
        <CardComic />
      </div>

    </div>
  )
}
