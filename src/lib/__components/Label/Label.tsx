import { FC, PropsWithChildren } from 'react'
import { LabelProps } from './types'

import s from './styles.module.css'

const Label: FC<PropsWithChildren<LabelProps>> = ({
  children,
  text,
  isRequired,
}) => {
  return (
    <label className={s.label}>
      {typeof text === 'string' ? (
        <span
          data-required={String(isRequired)}
          className={s.labelMessage}
        >
          {text}
        </span>
      ) : (
        <>{text}</>
      )}
      {children}
    </label>
  )
}

export { Label }
