import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router'

interface IProduct {
  id: number;
  title: string;
  price: number;
  category_id: string;
  slug: string;
}

interface CategoryProps {
  products: IProduct[];
}

export default function Category({ products }: CategoryProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Carregando...</p>;
  }

  return (
   <div>
     <h1>Categoria: {router.query.slug}</h1>
     <ul>
        {products.map(product => (
          <li key={product.id}>- {product.title}</li>
        ))}
      </ul>
   </div>
 ) 
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params;

  const response = await fetch(`http://localhost:3333/products?category_id=${slug}`);
  const products = await response.json();

  return {
    props: {
      products,
    },
    revalidate: 60,
  }
}