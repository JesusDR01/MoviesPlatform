import { render } from '@testing-library/react'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import { act } from 'react-dom/test-utils'

import { getMockRouter, mockGrid, mockTextField, mockToolbar } from 'utils/test'

import type { NextRouter } from 'next/router'

import { CreateMovie } from '.'

describe('<CreateMovie />', () => {
  let mockRouter: NextRouter

  beforeEach(() => {
    mockRouter = getMockRouter() as unknown as NextRouter
  })

  it('Form is rendered well', async () => {
    const { container } = render(
      <RouterContext.Provider value={mockRouter}>
        <CreateMovie />
      </RouterContext.Provider>,
    )

    expect(mockToolbar.mock.calls.length).toBe(2)

    const grid = mockGrid.mock.calls[0][0]
    expect(grid.container).toBe(true)

    const createMovie = grid.children
    expect(createMovie.type.render.displayName).toBe('Styled(Grid)')
    expect(createMovie.props.item).toBe(true)
    expect(createMovie.props.xs).toBe(12)

    expect(container).toMatchSnapshot()
  })



  it('The create button is disabled when isCreating is true', async () => {
    render(
      <RouterContext.Provider value={mockRouter}>
        <CreateMovie isCreating={true} />
      </RouterContext.Provider>,
    )

  })

  it('onCreateMovie is called when creating is succeed', async () => {
    let titleData = ''
    let descriptionData = ''

    render(
      <RouterContext.Provider value={mockRouter}>
        <CreateMovie
          onCreateMovie={(title, description) => {
            titleData = title
            descriptionData = description
          }}
        />
      </RouterContext.Provider>,
    )

    act(() => {
      mockTextField.mock.calls[0][0].onChange({
        target: { value: 'test title' },
      })
      mockTextField.mock.calls[1][0].onChange({
        target: { value: 'test description' },
      })
    })

    expect(titleData).toBe('')
    expect(descriptionData).toBe('')

    // Click the create button
    mockGrid.mockClear()

  })
})
