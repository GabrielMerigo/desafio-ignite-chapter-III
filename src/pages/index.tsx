import { GetStaticProps } from 'next';
import { getPrismicClient } from '../services/prismic';
import Prismic from '@prismicio/client';
import commonStyles from '../styles/common.module.scss';
import { FiCalendar, FiUser } from "react-icons/fi";
import styles from './home.module.scss';
import Header from '../components/Header'
import { Link } from 'prismic-dom';


interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    banner: string;
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
  preview: boolean;
}

export default function Home(props: HomeProps): JSX.Element {
  return (
    <>
      <div className={styles.PostContainer}>
        <Header />
        {(props.postsPagination.results.map(post => (
          <a href={`/post/${post.uid}`} key={post.uid}>
            <div className={styles.post}>
              <h1>{post.data.title}</h1>
              <p>{post.data.subtitle}</p>
              <div className={styles.Icons}>
                <FiCalendar /><time>{post.first_publication_date}</time>
                <FiUser /><span>{post.data.author}</span>
              </div>
            </div>
          </a>
        )))}

        <a>Carregar mais posts</a>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async ({
  preview = false,
  previewData,
}) => {
  const prismic = getPrismicClient();

  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'post')],
    {
      fetch: ['post.banner', 'post.title', 'post.subtitle', 'post.author'],
      pageSize: 2, // default 20
      // ref: previewData?.ref ?? null,
    }
  );

  const posts = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      data: {
        banner: post.data.banner.url,
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
      first_publication_date: post.first_publication_date,
    };
  });

  return {
    props: {
      postsPagination: {
        next_page: postsResponse.next_page,
        results: posts,
      },
      preview,
    },
  };
};