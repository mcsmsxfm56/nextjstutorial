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
import { getSortedPostsData } from "../lib/posts";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

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
              {title}
              <br />
              {id}
              <br />
              {date}
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
