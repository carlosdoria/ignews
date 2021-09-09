import { signIn, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { render, screen, fireEvent } from '@testing-library/react';
import { mocked } from 'ts-jest/utils'
import { SubscribeButton } from '.';

jest.mock('next-auth/client')
jest.mock('next/router')


describe('SubscribeButton component', () => {
  // const useSessionMocked = mocked(useSession)

  // it('renders correctly when user is not authenticated', () => {
  //   useSessionMocked.mockReturnValueOnce([null, false])

  //   render(<SubscribeButton />)

  //   expect(screen.getByText('Subscribe Now!')).toBeInTheDocument()
  // })

  // it('redirects user to sign in when not authenticated', () => {
  //   const signInMoked = mocked(signIn)
  //   useSessionMocked.mockReturnValueOnce([null, false])

  //   render(<SubscribeButton />)

  //   fireEvent.click(screen.getByText('Subscribe Now!'))

  //   expect(signInMoked).toHaveBeenCalled()
  // })

  it('redirects user to posts when already has a subscription', () => {
    const useRouterMocked = mocked(useRouter)
    const useSessionMocked = mocked(useSession)
    const pushMock = jest.fn()

    useSessionMocked.mockReturnValueOnce([
      {
        user: {
          name: 'Jhon Doe',
          email: 'jhon@email.com'
        },
        activeSubscription: 'fake-active-subscription',
        expires: 'fake-expires'
      },
      false
    ])

    useRouterMocked.mockReturnValueOnce({
      push: pushMock
    } as any)

    render(<SubscribeButton />)

    fireEvent.click(screen.getByText('Subscribe Now!'))

    expect(pushMock).toHaveBeenCalledWith('/posts')
  })
})
