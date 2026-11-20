// url=https://www.figma.com/design/WEaSEhSmcyrg92sCtIrrbD/Chiron?node-id=238-7223
// source=src/components/Button/Button.tsx
// component=Button
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
const state = instance.getEnum('State', {
  Default: undefined,
  Hover: 'hover',
  Pressed: 'active',
  Focus: 'focus',
})

export default {
  example: figma.code`<Button${state ? figma.code` state="${state}"` : ''}>${label}</Button>`,
  imports: ["import { Button } from './components/Button/Button'"],
  id: 'button-primary',
  metadata: { nestable: true },
}
