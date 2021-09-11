import { render, screen } from '@testing-library/react'
import { getPrismicClient } from '../../services/prismic'
import { mocked } from 'ts-jest/utils'
import { useSession } from 'next-auth/client'
import PostPreview, { getStaticProps } from '../../pages/posts/preview/[slug]'
import { useRouter } from 'next/router'

jest.mock('../../services/prismic')
jest.mock('next-auth/client')
jest.mock('next/router')

const post = {
    slug: 'my-new-post',
    title: 'My new post',
    content: '<p>Post content</p>',
    updateAt: '10 de abril'
}

describe('Post preview page', () => {
  const useSessionMocked = mocked(useSession)

  it('render correctly', () => {
    useSessionMocked.mockReturnValueOnce([ null, false ])
    render(<PostPreview post={post} />)

    expect(screen.getByText('My new post')).toBeInTheDocument()
    expect(screen.getByText('Post content')).toBeInTheDocument()
    expect(screen.getByText('Wanna continue reading?')).toBeInTheDocument()
  })

  it('redirects user to full post when user is subscribed', async () => {
    const useRouterMocked = mocked(useRouter)
    const pushMock = jest.fn()

    useSessionMocked.mockReturnValueOnce([
      { activeSubscription: 'fake-active-subscription' },
      false
    ])

    useRouterMocked.mockReturnValueOnce({
      push: pushMock
    } as any)

    render(<PostPreview post={post} />)

    expect(pushMock).toHaveBeenCalledWith('/posts/my-new-post')
  })

  it('loads initial data', async () => {
    const getPrismicClientMocked = mocked(getPrismicClient)

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [
            { type: 'heading', text: 'My new post' }
          ],
          content: [
            { type: 'paragraph', text: 'Post content' }
          ]
        },
        last_publication_date: '04-09-2021'
      })
    } as any)


    const response = await getStaticProps({
      params: {slug: 'my-new-post'}
    } as any)

    expect(response).toEqual({
      props: {
        post: {
          slug: 'my-new-post',
          title: 'My new post',
          content: '<p>Post content</p>',
          updateAt: '09 de abril de 2021'
        }
      },
      revalidate: 60 * 60 * 24
    })
  })
})
