// url=https://www.figma.com/design/WEaSEhSmcyrg92sCtIrrbD/Chiron?node-id=237-7204
// source=src/components/Header/Header.tsx
// component=NavItem
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
const state = instance.getEnum('State', {
  Default: 'default',
  Hover: 'hover',
  Active: 'active',
})

export default {
  example: figma.code`<NavItem${state === 'active' ? ' active' : ''}${state === 'hover' ? ' state="hover"' : ''}>${label}</NavItem>`,
  imports: ["import { NavItem } from './components/Header/Header'"],
  id: 'nav-item',
  metadata: { nestable: true },
}
