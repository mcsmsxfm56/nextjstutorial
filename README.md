# CREATE NEXTJS APP

## TEMPLATE USED IN THIS APP

npx create-next-app nextjs-blog --use-npm --example "https://github.com/vercel/next-learn/tree/master/basics/assets-metadata-css-starter"

la flag de --example indica que se debe usar cierto repositorio como template
la flag --use-npm es para indicar que el proyecto esta basado en npm

## CREATE NEXTJS APP IN GENERAL

npx create-next-app@latest

# FUNCIONAMIENTO CARPETA pages

pages/index.js se renderiza en la ruta /
pages/posts/first-post.js se renderiza en la ruta /posts/first-post

# Links

el tag `<a></a>` sirve para linkear a paginas externas
el componente `link` sirve para linkear paginas internas

```
import Link from "next/link";
<Link href="/">Back to home</Link>
```

## Rutas dinamcas

[dynamic route].js
las rutas dinamicas van entre corchetes
1)crear pages/posts/[id].js 2)[id].js debe tener
-un componente react a renderizar
-getStaticPaths que retorna un array con los posibles valores de id
-getStaticProps que fetchea la data necesaria para el post id

## Router

If you want to access the Next.js router, you can do so by importing the useRouter hook from next/router.

## 404 Pages

To create a custom 404 page, create pages/404.js. This file is statically generated at build time.

pages/404.js
export default function Custom404() {
return <h1>404 - Page Not Found</h1>;
}
