import {  render } from '@testing-library/react'
import { RouterContext } from 'next/dist/shared/lib/router-context'

import { getMockRouter, mockAppBar } from 'utils/test'

import type { NextRouter } from 'next/router'

import { Header } from '.'

describe('<Header />', () => {
  it('Rendered well', async () => {
    const routerPush = jest.fn()
    const mockRouter = getMockRouter()
    mockRouter.push = routerPush

    const { container } =  render(
      <RouterContext.Provider value={mockRouter as unknown as NextRouter}>
        <Header />
      </RouterContext.Provider>,
    )


    const appBar = mockAppBar.mock.calls[0][0]
    expect(appBar.position).toBe('fixed')
    expect(appBar.elevation).toBe(4)
    expect(appBar.style).toEqual({
      backgroundColor: '#FFF',
    })

    const toolbar = appBar.children
    expect(toolbar.type.name).toBe('Toolbar')

    expect(container).toMatchSnapshot()
  })

  it('Go to the root page when the app title is clicked', async () => {
    const routerPush = jest.fn()
    const mockRouter = getMockRouter()
    mockRouter.push = routerPush

    render(
      <RouterContext.Provider value={mockRouter as unknown as NextRouter}>
        <Header />
      </RouterContext.Provider>,
    )

    expect(routerPush).not.toBeCalled()
  })
})
