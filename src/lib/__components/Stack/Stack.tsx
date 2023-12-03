import { FC, PropsWithChildren } from 'react'
import { cls } from 'lib/utils'
import { StackProps } from './types'

import s from './styles.module.css'

const Stack: FC<PropsWithChildren<StackProps>> = ({
  children,
  row,
  gap,
  m,
}) => {
  const styleObj = {
    gap: gap || gap === 0 ? `${gap}px` : '16px',
    margin: m ?? 'unset',
  }
  return (
    <div
      style={styleObj}
      className={cls(s.stack, {
        [s['stack-row']]: !!row,
        [s['stack-column']]: !row,
      })}
    >
      {children}
    </div>
  )
}

export { Stack }
