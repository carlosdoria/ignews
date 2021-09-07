import { render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils'
import { useSession } from 'next-auth/client'
import { SignInButton } from '.';

jest.mock('next-auth/client')

describe('Header component', () => {
  const useSessionMocked = mocked(useSession)

  it('renders correctly when user is not authenticated', () => {
    useSessionMocked.mockReturnValueOnce([null, false])

    render(<SignInButton />)

    expect(screen.getByText('Sign with Github')).toBeInTheDocument()
  })

  it('renders correctly when user is authenticated', () => {
    useSessionMocked.mockReturnValueOnce([
      { user: {
        name: 'Jhon Doe',
        email: 'jhon@email.com'
      }, expires: 'fake-expires'},
      false
    ])

    render(<SignInButton />)

    expect(screen.getByText('Jhon Doe')).toBeInTheDocument()
  })
})
