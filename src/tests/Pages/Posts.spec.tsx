import { render, screen } from '@testing-library/react'
import { getPrismicClient } from '../../services/prismic'
import { mocked } from 'ts-jest/utils'
import Posts, { getStaticProps } from '../../pages/posts'

jest.mock('../../services/prismic')

const posts = [{
    slug: 'string',
    title: 'My new post',
    excerpt: 'string',
    updateAt: 'string'
}]

describe('Posts page', () => {
  it('render correctly', () => {
    render(<Posts posts={posts} />)

    expect(screen.getByText('My new post')).toBeInTheDocument()
  })

  it('render correctly', async () => {
    const getPrismicClientMocked = mocked(getPrismicClient)

    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid:'my-new-post',
            data: {
              title: [
                { type: 'heading', text: 'My new post' }
              ],
              content: [
                { type: 'paragraph', text: 'Post excerpt' }
              ]
            },
            last_publication_date: '04-09-2021'
          }
        ]
      })
    } as any)

    const response = await getStaticProps({})

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [{
            slug: 'my-new-post',
            title: 'My new post',
            excerpt: 'Post excerpt',
            updateAt: '09 de abril de 2021'
          }]
        }
      })
    )
  })
})
