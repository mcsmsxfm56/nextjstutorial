import Link from "next/link";
import React from "react";
import Image from "next/image";
//el elemento image es como <img> pero de nextjs
//ventajas de image:
//1)la imagen es responsiva automaticamente
//2)disminuye el tamano de archivo de la foto sin disminuir su calidad(asi carga mas rapido la web)
//3)solo carga las imagenes cuando entran en el viewport
//4)si es posible pone la foto en formato .webp (formato que hace imagenes mas livianas sin sacrificar calidad)
import Head from "next/head";
//head sirve para incluir la etiqueta head en la pagina
import Script from "next/script";
import Layout from "../../components/layout";
//Layout importa estilos del module layout module.css y de ahi se puede aplicar a toda la pagina

export default function firstPost() {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
        {
          //<script src="https://connect.facebook.net/en_US/sdk.js" /> introduciendo scripts de terceros
          //en head
        }
      </Head>
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload" //strategy define cuando se debe cargar el script, aca dice que lo cargue de forma lazy
        //lazy load es que solo lo carga cuando hace falta
        onLoad={
          () =>
            console.log(`script loaded correctly, window.FB has been populated`) //se ejecuta cuando termina de cargar el script
        }
      />
      First Post
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
      <Image
        src="/images/profile.jpg" // Route of the image file
        height={144} // Desired size with correct aspect ratio
        width={144} // Desired size with correct aspect ratio
        alt="Your Name"
      />
    </Layout>
  );
}
