import type { ComponentMeta, ComponentStory } from '@storybook/react'

import { MovieItem } from '.'

export default {
  title: 'Organisms/MovieItem',
  component: MovieItem,
} as ComponentMeta<typeof MovieItem>

const Template: ComponentStory<typeof MovieItem> = (args) => (
  <MovieItem {...args} />
)

export const Default = Template.bind({})
Default.args = {
  director: 'This is the movie director.',
}
