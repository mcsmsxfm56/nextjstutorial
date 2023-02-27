This is a starter template for [Learn Next.js](https://nextjs.org/learn).

npx create-next-app nextjs-blog --use-npm --example "https://github.com/vercel/next-learn/tree/master/basics/assets-metadata-css-starter"

tutorial made reading the nextjs docs

first-post.tsx
index.tsx
lib/posts.js

[dynamic route].js
las rutas dinamicas van entre corchetes

## Rutas dinamcas

1)crear pages/posts/[id].js 2)[id].js debe tener
-un componente react a renderizar
-getStaticPaths que retorna un array con los posibles valores de id
-getStaticProps que fetchea la data necesaria para el post id

Router
If you want to access the Next.js router, you can do so by importing the useRouter hook from next/router.

404 Pages
To create a custom 404 page, create pages/404.js. This file is statically generated at build time.

// pages/404.js
export default function Custom404() {
return <h1>404 - Page Not Found</h1>;
}
