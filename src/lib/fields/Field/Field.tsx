import { FC, useMemo, memo } from 'react'
import { BaseFieldProps, ElementType } from 'lib/FormCombine'
import { FieldProps } from './types'
import { TextField } from '../TextField'
import { FieldController } from '../FieldController'

const Field: FC<FieldProps> = memo(
  ({
    field,
    customErrorMessage,
    customComponents,
    customHelperText,
    customLabelMessage,
  }) => {
    const { elementType, name } = field

    const fieldComponent = useMemo(() => {
      const customField = customComponents?.[elementType]
      switch (elementType) {
        case ElementType.TextField: {
          return customField ?? (TextField as FC<BaseFieldProps>)
        }
        default: {
          return null
        }
      }
    }, [field])

    return fieldComponent ? (
      <FieldController
        name={name}
        fieldComponent={fieldComponent}
        field={field}
        customHelperText={customHelperText}
        customErrorMessage={customErrorMessage}
        customLabelMessage={customLabelMessage}
      />
    ) : (
      <></>
    )
  }
)

export { Field }
