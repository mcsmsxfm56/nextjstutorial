import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
//nextjs solo carga un html estatico y solo carga el javascript cuando se va a usar(lazy loading)
//hay dos formas de renderizar en nextjs
//1)Static Generation is the pre-rendering method that generates the HTML at build time. The
//pre-rendered HTML is then reused on each request.
//2)Server-side Rendering is the pre-rendering method that generates the HTML on each request.
//usar siempre que se pueda static generation
//la renderizacion por server solo se usa cuando los datos de la pagina cambian constantemente
//(tiene que estar haciendo requests al server a cada rato)

//Using Static Generation (getStaticProps())
//server side-rendering getServerSideProps
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

/*
export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    },
  };
}
*/

//client side-rendering: 1)genera estaticamente las partes que no necesitan data del server
//2)cuando la pagina se carga, llama a la data externa usando javascript y puebla el resto de la pagina
//client side rendering es ideal para dashboard admins

//SWR hook: used to fetch data
//ejemplo SWR hook
/*
import useSWR from 'swr';

function Profile() {
  const { data, error } = useSWR('/api/user', fetch);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <div>hello {data.name}!</div>;
}
*/

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
//pages/index.js renders route /
//pages/post renders route /post
//Link funciona igual al link de react-router-dom
//para referenciar pagina externas se usa <a>
