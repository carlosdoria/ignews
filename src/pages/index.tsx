/* eslint-disable @next/next/no-img-element */
import { SubscribeButton } from '../components/SubscribeButton'
import { GetStaticProps } from 'next'
import { stripe } from '../services/stripe'
import styles from './index.module.scss'

interface HomeProps {
  product : {
    priceId: string
    amount: string
  }
}

export default function Home ({ product }: HomeProps) {
  return (
    <>
      <main className={styles.container}>
        <section className={styles.hero}>
          <span></span>
          <h1>New about the <span>React</span> world.</h1>
          <p>
            Get access to all the publications<br/>
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1JEyGmFidnTgRgnImoSosUPX', {
    // show info products
    expand: [ 'product' ]
  })

  const product = {
    princeId: price.id,
    amount: new Intl.NumberFormat('en-IS', {
      style: 'currency',
      currency: 'USD'
    }).format((price.unit_amount || 0) / 100)
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24 // 24h
  }
}
