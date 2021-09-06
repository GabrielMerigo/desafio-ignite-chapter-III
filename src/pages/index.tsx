import { GetStaticProps } from 'next';
import Image from 'next/image';
import { FiCalendar, FiUser } from "react-icons/fi";

import { getPrismicClient } from '../services/prismic';

import Logo from '../assets/Logo.svg'
import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';


interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home() {
  return (
    <div className={styles.PostContainer}>
      <Image src={Logo} alt="Logo" width="100%" height="100%" />      
      <div className={styles.post}>
        <h1>Como utilizar Hooks</h1>
        <p>Pensando em sincronização em vez de ciclos de vida.</p>
        <div className={styles.Icons}>
          <FiCalendar/><time>19 abr 2021</time>
          <FiUser/><span>Gabriel Merigo</span>
        </div>
      </div>

      <div className={styles.post}>
        <h1>Criando um app CRA do zero</h1>
        <p>Tudo sobre como criar a sua primeira aplicação utilizando Create React App.</p>
        <div className={styles.Icons}>
          <FiCalendar/><time>19 Abr 2021</time>
          <FiUser/><span>Danilo Vieira</span>
        </div>
      </div>

      <div className={styles.post}>
        <h1>Como utilizar Hooks</h1>
        <p>Pensando em sincronização em vez de ciclos de vida.</p>
        <div className={styles.Icons}>
          <FiCalendar/><time>19 abr 2021</time>
          <FiUser/><span>Gabriel Merigo</span>
        </div>
      </div>

      <div className={styles.post}>
        <h1>Criando um app CRA do zero</h1>
        <p>Tudo sobre como criar a sua primeira aplicação utilizando Create React App.</p>
        <div className={styles.Icons}>
          <FiCalendar/><time>19 Abr 2021</time>
          <FiUser/><span>Danilo Vieira</span>
        </div>
      </div>

      <a>Carregar mais posts</a>
    </div>
  )
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient();
//   // const postsResponse = await prismic.query(TODO);

//   // TODO
// };
