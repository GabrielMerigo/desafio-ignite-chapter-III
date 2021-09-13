import { GetStaticProps } from 'next';
import { getPrismicClient } from '../services/prismic';
import Prismic from '@prismicio/client';
import commonStyles from '../styles/common.module.scss';
import { FiCalendar, FiUser } from "react-icons/fi";
import styles from './home.module.scss';
import Header from '../components/Header'


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

interface Posts {
  posts: Post[]
}

export default function Home(props: Posts) {
  return (
    <div className={styles.PostContainer}>
      <Header />
      {(props.posts.map(post => (
        <div key={post.uid} className={styles.post}>
          <h1>{post.data.title}</h1>
          <p>{post.data.subtitle}</p>
          <div className={styles.Icons}>
            <FiCalendar /><time>19 abr 2021</time>
            <FiUser /><span>Gabriel Merigo</span>
          </div>
        </div>
      )))}

      <a>Carregar mais posts</a>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    [Prismic.Predicates.at('document.type', 'post')],
    { fetch: ['post.title', 'post.subtitle', 'post.author'], pageSize: 1 }
  );

  const posts = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      }
    }
  })

  console.log(postsResponse.results)
  return {
    props: {
      posts
    }
  }
};