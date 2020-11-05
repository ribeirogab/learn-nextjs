import { useCallback } from 'react';
import { GetServerSideProps } from 'next';

import SEO from '~/components/SEO';
import * as S from '~/styles/pages/Home';

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
  const handleSum = useCallback(async () => {
    const math = (await import('../lib/math')).default;
    alert(math.sum(2, 5));
  }, []);

  return (
    <>
      <SEO 
        title="DevCommerce, your best e-commerce!"
        description="uma descrição qualquer"
        image="tobruxo.png"
        shouldExcludeTitleSuffix
      />

      <S.Title>
        Produtos Recomendados:
      </S.Title>
      <ul>
        {recommendedProducts.map(recommendedProducts => (
          <li key={recommendedProducts.id}>- {recommendedProducts.title}</li>
        ))}
      </ul>
      
      <button onClick={handleSum}>Sum!</button>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch(`${process.env.API_URL}/recommended`);
  const recommendedProducts = await response.json();

  return {
    props: {
      recommendedProducts,
    }
  };
}