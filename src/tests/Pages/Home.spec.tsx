import { render, screen } from '@testing-library/react'
import { stripe } from '../../services/stripe'
import { mocked } from 'ts-jest/utils'
import Home, { getStaticProps } from '../../pages'

jest.mock('next/router')
jest.mock('next-auth/client', () => {
  return {
    useSession: () => {
      return [ null, false ]
    }
  }
})
jest.mock('../../services/stripe')

describe('Home page', () => {
  it('render correctly', () => {
    render(<Home product={{ amount:'R$ 10,00', priceId:'fake-pice' }} />)

    expect(screen.getByText('for R$ 10,00 month')).toBeInTheDocument()
  })

  it('render correctly', async () => {
    const retrieveStripePricesMocked = mocked(stripe.prices.retrieve)

    retrieveStripePricesMocked.mockResolvedValueOnce({
      id: 'fake-id',
      unit_amount: 1000
    } as any)

    const response = await getStaticProps({})

    expect(response).toEqual({
      props: {
        product: {
          princeId: 'fake-id',
          amount: '$10.00'
        }
      },
      revalidate: 86400
    })

    // Valida se o objeto contém esses valores
    // expect(response).toEqual(
    //   expect.objectContaining({
    //     props: {
    //       product: {
    //         princeId: 'fake-id',
    //         amount: '$10.00'
    //       }
    //     }
    //   })
    // )
  })
})
