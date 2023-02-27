# CREATE NEXTJS APP

## TEMPLATE USADO AQUI

npx create-next-app nextjs-blog --use-npm --example "https://github.com/vercel/next-learn/tree/master/basics/assets-metadata-css-starter"

la flag de --example indica que se debe usar cierto repositorio como template
la flag --use-npm es para indicar que el proyecto esta basado en npm

## CREATE NEXTJS APP EN GENERAL

npx create-next-app@latest

# Funcionamiento carpeta pages

pages/index.js se renderiza en la ruta /
pages/posts/first-post.js se renderiza en la ruta /posts/first-post

# Links

el tag `<a></a>` sirve para linkear a paginas externas
el componente `link` sirve para linkear paginas internas

```
import Link from "next/link";
<Link href="/">Back to home</Link>
<a href="www.google.com">Go to Google</a>
```

# Fotos

Las fotos van en la carpeta public/images (todos los assets estaticos van en la carpeta public para
mejorar la SEO)

En nextjs se usa el componente Image para introducir imagenes en vez de `<img>` por las siguientes razones:

- Hace a la imagen automaticamente responsiva
- Disminuye el peso de la imagen sin disminuir su calidad
- Solo carga las imagenes cuando entran al viewport (lazyloading)
- Siempre que se pueda pone las fotos en formato .webp (para disminuir su peso)(webp no es compatible en todos los navegadores)

```
<Image
    src="/images/profile.jpg" // imagen que esta en public/images/profile.jpg
    height={144} // Desired size with correct aspect ratio
    width={144} // Desired size with correct aspect ratio
    alt="Your Name"
  />
```

# Editar el <head>

```
import Head from 'next/head';
export default function FirstPost() {
  return (
    <>
      <Head>
        <title>First Post</title>
      </Head>
      <h1>First Post</h1>
      <h2>
        <Link href="/">← Back to home</Link>
      </h2>
    </>
  );
}
```

De esta forma cada pagina puede tener un Head distinto

# Scripts de terceros

```
import Script from 'next/script';
export default function FirstPost() {
  return (
    <>
      <Head>
        <title>First Post</title>
      </Head>
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload" //lazyload
        onLoad={() =>
          console.log(`script loaded correctly, window.FB has been populated`)
        }
      />
      <h1>First Post</h1>
      <h2>
        <Link href="/">← Back to home</Link>
      </h2>
    </>
  );
}
```

Con el componente script se cargan scripts de terceros

# Layout para todas las paginas

se realiza creando el componente `<Layout/>` en components/layout.js
para estilos globales consultar archivo pages/\_app.js

# Formas de prerenderizado

Nextjs usa prerenderizado (se renderiza todo lo que el usuario pueda llegar a usar para disminuir tiempos de carga), hay dos metodos de prerrenderizado (static y server-side)

## Static generation

Genera un archivo html en el build time, el HTML es reutilizado posteriormente en cada request
NOTA: se puede hacer una web hibrida que utilize un metodo static en algunas rutas y server-side en otras
Siempre que se pueda usar static generation, el server-side solo debe usarse cuando en una pagina
se este actualizando constantemente informacion traida del server (dashboard admin por ej)

### getStaticProps

Esta funcion va en el mismo archivo en el que esta el componente React estatico, esta funcion se ejecuta en el build time, trae la data externa y finalizado el fetch se renderiza
NOTA: getStaticProps solo se puede exportar de archivos pagina

```
export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const data = ...

  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: ...
  }
}
```

## Server-side generation

Genera un archivo html en cada request

```
funciona igual que getStaticProps
export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    },
  };
}
```

### Client side-rendering (ideal for dashboard admin)

If you do not need to pre-render the data, you can also use the following strategy (called Client-side Rendering):

Statically generate (pre-render) parts of the page that do not require external data.
When the page loads, fetch external data from the client using JavaScript and populate the remaining parts.

### Hook SWR

Hook ideal para fetchear data al client
Mas info: https://swr.vercel.app

# Rutas dinamcas

[dynamic route].js
las rutas dinamicas van entre corchetes
1)crear pages/posts/[id].js 2)[id].js debe tener
-un componente react a renderizar
-getStaticPaths que retorna un array con los posibles valores de id
-getStaticProps que fetchea la data necesaria para el post id

```
export async function getStaticPaths() {
  // Return a list of possible value for id
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  const paths = se espera un array de objetos, cada objeto debe tener una propiedad params
  que debe ser un objeto que tenga la propiedad id, id debe ser un string
  return {
    paths,
    fallback: false,
    si fallback es false cualquier path que no este en getStaticPaths() mandara un 404 not found
    si es true en vez de mandarte a un 404 not found te va a dar una fallbak page
    If fallback is blocking, then new paths will be server-side rendered with getStaticProps, and cached for future requests so it only happens once per path.
    https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#fallback-false
  };
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
}
```

## Catch-all Routes

Dynamic routes can be extended to catch all paths by adding three dots (...) inside the brackets. For example:

pages/posts/[...id].js matches /posts/a, but also /posts/a/b, /posts/a/b/c and so on.

if you do this, in getStaticPaths, you must return an array as the value of the id key like so:

```
return [
  {
    params: {
      // Statically Generates /posts/a/b/c
      id: ['a', 'b', 'c'],
    },
  },
  //...
];
```

## Router

If you want to access the Next.js router, you can do so by importing the useRouter hook from next/router.

## 404 Pages

To create a custom 404 page, create pages/404.js. This file is statically generated at build time.

pages/404.js

```
export default function Custom404() {
return <h1>404 - Page Not Found</h1>;
}
```

# API

en pages/api podes crear archivos .js que te generen rutas de una api
pages/api/hello.js

```
export default function handler(req, res) {
  res.status(200).json({ text: "Hello" });
}
```
