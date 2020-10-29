import useSWR from 'swr'

import * as S from '../styles/pages/Home'

interface IProduct {
  id: number;
  title: string;
  price: number;
  category_id: string;
  slug: string;
}

export default function Home() {
  const  { data: products, error } = useSWR<IProduct[]>('http://localhost:3333/recommended');

  console.log(products);

  return (
    <>
      <S.Title>
        {error && 'failed to load'}
        {!products ? 'loading...' : 'Produtos Recomendados:'}
      </S.Title>
      <ul>
        {products?.map(product => (
          <li>- {product.title}</li>
        ))}
      </ul>
    </>
  )
}
