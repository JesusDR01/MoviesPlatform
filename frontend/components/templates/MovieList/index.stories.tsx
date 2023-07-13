import type { ComponentMeta, ComponentStory } from '@storybook/react'

import { MovieList } from '.'

export default {
  title: 'Templates/MovieList',
  component: MovieList,
} as ComponentMeta<typeof MovieList>

const Template: ComponentStory<typeof MovieList> = () => <MovieList />

export const Default = Template.bind({})

export const WithData = Template.bind({})

