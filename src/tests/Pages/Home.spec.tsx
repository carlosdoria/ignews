import { render, screen } from '@testing-library/react'
import Home from '../../pages'

jest.mock('next/router')
jest.mock('next-auth/client', () => {
  return {
    useSession: () => {
      return [ null, false ]
    }
  }
})

describe('Home page', () => {
  it('render correctly', () => {
    render(<Home product={{ amount:'R$ 10,00', priceId:'fake-pice' }} />)

    expect(screen.getByText('for R$ 10,00 month')).toBeInTheDocument()
  })
})
