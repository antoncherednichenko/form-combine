import { FC, PropsWithChildren } from 'react'
import s from './styles.module.css'

const ErrorMessage: FC<PropsWithChildren> = ({ children }) => {
  return <span className={s.errorMessage}>{children}</span>
}

export { ErrorMessage }
