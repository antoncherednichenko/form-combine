import { forwardRef, ForwardedRef } from 'react'

import s from './styles.module.css'
import { BaseFieldProps } from 'lib/FormCombine'

const TextField = forwardRef(function TextField(
  props: BaseFieldProps,
  forwaredRef: ForwardedRef<HTMLInputElement>
) {
  return (
    <input
      data-error={String(!!props.error)}
      className={s.textField}
      ref={forwaredRef}
      {...props}
    />
  )
})

export { TextField }
