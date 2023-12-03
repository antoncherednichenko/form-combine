import { FC, PropsWithChildren } from 'react'

import s from './styles.module.css'

const FieldsetTitle: FC<PropsWithChildren> = ({ children }) => {
  return <legend className={s.fieldsetTitle}>{children}</legend>
}

export { FieldsetTitle }
