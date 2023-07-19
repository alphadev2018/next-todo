import { render, screen, waitFor } from '@testing-library/react'
import { enableFetchMocks } from 'jest-fetch-mock'
import Home from '@/app/page'
import { Providers } from '@/lib/providers'

enableFetchMocks()

describe('Todo List', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: () => {
        return {
          matches: false,
          addListener: () => {},
          removeListener: () => {}
        };
      }
    });
  })

  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it('renders logout button', async () => {
    fetchMock.mockOnce(JSON.stringify({ data: [], hasMore: false }))
    render(<Home />, { wrapper: Providers })

    const logoutBtn = await waitFor(() => screen.getByText('Logout'))
    expect(logoutBtn).toBeInTheDocument()
  })

  it('renders create todo form', async () => {
    fetchMock.mockOnce(JSON.stringify({ data: [], hasMore: false }))
    render(<Home />, { wrapper: Providers })

    const addBtn = await waitFor(() => screen.getByText('Add'))
    expect(addBtn).toBeInTheDocument()
  })

  it('renders empty list', async () => {
    fetchMock.mockOnce(JSON.stringify({ data: [], hasMore: false }))
    render(<Home />, { wrapper: Providers })

    const addBtn = await waitFor(() => screen.getByText('No data'))
    expect(addBtn).toBeInTheDocument()
  })

  it('renders list with load more button', async () => {
    fetchMock.mockOnce(
      JSON.stringify({
        data: new Array(10).fill({
          id: 'test-id',
          label: 'test-todo-label',
          isCompleted: false
        }),
        hasMore: true
      })
    )
    const { container } = render(<Home />, { wrapper: Providers })

    const items = await waitFor(() => container.getElementsByClassName('ant-list-item'))
    expect(items.length).toBe(10)

    const loadMoreBtn = await waitFor(() => screen.getByText('Load more'))
    expect(loadMoreBtn).toBeInTheDocument()
  })

  it('renders list without load more button', async () => {
    fetchMock.mockOnce(
      JSON.stringify({
        data: new Array(8).fill({
          id: 'test-id',
          label: 'test-todo-label',
          isCompleted: false
        }),
        hasMore: false
      })
    )
    render(<Home />, { wrapper: Providers })

    const loadMoreBtn = await waitFor(() => screen.queryByText(/Load more/i))
    expect(loadMoreBtn).not.toBeInTheDocument()
  })

  it('renders edit/changeStatus/delete buttons', async () => {
    fetchMock.mockOnce(JSON.stringify({ data: [], hasMore: false }))
    const { container } = render(<Home />, { wrapper: Providers })

    const editBtn = await waitFor(() => container.getElementsByClassName('anticon-edit')[0])
    expect(editBtn).toBeInTheDocument()

    const changeStatusBtn = await waitFor(() => container.getElementsByClassName('anticon-check')[0])
    expect(changeStatusBtn).toBeInTheDocument()

    const deleteBtn = await waitFor(() => container.getElementsByClassName('anticon-delete')[0])
    expect(deleteBtn).toBeInTheDocument()
  })
})