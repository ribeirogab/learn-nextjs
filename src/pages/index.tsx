import { GetServerSideProps } from 'next';
import useSWR from 'swr'

import * as S from '../styles/pages/Home'

interface IProduct {
  id: number;
  title: string;
  price: number;
  category_id: string;
  slug: string;
}

interface HomeProps {
  recommendedProducts: IProduct[];
}

export default function Home({ recommendedProducts }: HomeProps) {
  return (
    <>
      <S.Title>
        Produtos Recomendados:
      </S.Title>
      <ul>
        {recommendedProducts.map(recommendedProducts => (
          <li key={recommendedProducts.id}>- {recommendedProducts.title}</li>
        ))}
      </ul>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch('http://localhost:3333/recommended');
  const recommendedProducts = await response.json();

  return {
    props: {
      recommendedProducts
    }
  };
}