import { FC, PropsWithChildren } from 'react'
import s from './styles.module.css'

const FormTitle: FC<PropsWithChildren> = ({ children }) => {
  return <h3 className={s.formTitle}>{children}</h3>
}

export { FormTitle }
