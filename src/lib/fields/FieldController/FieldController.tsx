import { FC, memo, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { FieldControllerProps } from './types'
import { Controller } from 'react-hook-form'
import { CrossButton, ErrorMessage, Label, Stack } from 'lib/__components'
import { ValidationRuleType } from 'lib/FormCombine'

const FieldController: FC<FieldControllerProps> = memo(
  ({
    fieldComponent: Component,
    name,
    field: propsField,
    customHelperText,
    customErrorMessage,
    customLabelMessage,
  }) => {
    const { control, setValue } = useFormContext() ?? {}
    const { placeholder, helperText, disabled, label, validation, cross } =
      propsField
    const isRequired = useMemo(
      () =>
        !!validation.find(
          (rule) => rule.type === ValidationRuleType.Requiered
        ),
      [propsField]
    )

    const setFieldValue = (newValue: any) => {
      setValue(name, newValue)
    }

    return (
      <Controller
        control={control}
        name={name}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error, isDirty, isTouched },
        }) => (
          <Stack gap={4}>
            <Label
              isRequired={isRequired}
              text={
                customLabelMessage
                  ? customLabelMessage(label, isRequired)
                  : label
              }
            >
              <Component
                id={name}
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                placeholder={placeholder}
                error={!!error}
                disabled={disabled}
                isDirty={isDirty}
                isTouched={isTouched}
                isRequired={isRequired}
                setFieldValue={setFieldValue}
              />
              {cross && !!value && (
                <CrossButton
                  onClick={() => {
                    setFieldValue('')
                  }}
                />
              )}
            </Label>
            {!!error &&
              error.message &&
              (customErrorMessage ? (
                <>{customErrorMessage(error.message)}</>
              ) : (
                <ErrorMessage>{error.message}</ErrorMessage>
              ))}
            {helperText &&
              (customHelperText ? (
                <>{customHelperText(helperText)}</>
              ) : (
                <span>{helperText}</span>
              ))}
          </Stack>
        )}
      />
    )
  }
)

export { FieldController }
