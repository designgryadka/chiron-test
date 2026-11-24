import type { Meta, StoryObj } from '@storybook/react-vite';
import { Callout } from './Callout';

const meta = {
  title: 'Components/Callout',
  component: Callout,
  tags: ['autodocs'],
  args: {
    label: 'Запомните',
    children:
      'Главная цель фишинга — не обязательно взломать устройство техническим способом. Часто злоумышленнику достаточно убедить человека добровольно раскрыть пароль, открыть файл или подтвердить вход.',
  },
  decorators: [(Story) => <div style={{ width: 650 }}><Story /></div>],
  parameters: {
    docs: { description: { component: 'Figma: Callout / Important. Фон `bg/info`, иконка на `progress/xp`, метка `text/link`.' } },
  },
} satisfies Meta<typeof Callout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Important: Story = {};
