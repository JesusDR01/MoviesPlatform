import type { ComponentMeta, ComponentStory } from '@storybook/react'

import { CreateMovie } from '.'

export default {
  title: 'Templates/CreateMovie',
  component: CreateMovie,
} as ComponentMeta<typeof CreateMovie>

const Template: ComponentStory<typeof CreateMovie> = (args) => (
  <CreateMovie {...args} />
)

export const Default = Template.bind({})
