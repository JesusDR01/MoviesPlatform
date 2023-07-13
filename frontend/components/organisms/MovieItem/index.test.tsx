import { render } from '@testing-library/react'

import { mockGrid } from 'utils/test'

import { MovieItem } from '.'

describe('<MovieItem />', () => {
  it('Rendered well', async () => {
    const { container } = render(
      <MovieItem
        id="40"
        name="This is the movie name."
        director="This is the movie director."
        year={2023}
        meanRating={1}
        handleOpenDeleteModal={() => {}}
        handleOpenUpdateModal={() => {}}
      />,
    )

    const grid = mockGrid.mock.calls[0][0]
    expect(grid.item).toBe(true)
    expect(grid.xs).toBe(12)


    expect(container).toMatchSnapshot()
  })
})
