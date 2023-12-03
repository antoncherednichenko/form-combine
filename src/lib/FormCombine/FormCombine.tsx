import { FC, useEffect, useMemo } from 'react'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Field } from 'lib/fields'
import {
  FieldsetSubTitle,
  FieldsetTitle,
  FormTitle,
  Stack,
} from 'lib/__components'
import { FormActions, FormCombineProps, FormData } from './types'
import {
  getAllFields,
  getDefaultValues,
  getValidationSchema,
  isFunction,
} from './utils'

const FormCombine: FC<FormCombineProps> = ({
  data,
  onSubmit,
  children,
  scrollToError,
  customComponents,
  customHelperText,
  customErrorMessage,
  customLabelMessage,
  customFormTitle,
  customFieldsetTitle,
  customFieldsetSubTitle,
}) => {
  const { title, form } = data as FormData

  const allFields = useMemo(() => getAllFields(form), [data])
  const defaultValues = useMemo(() => getDefaultValues(allFields), [data])
  const validationSchema = useMemo(
    () => getValidationSchema(allFields),
    [data]
  )

  const formMethods = useForm({
    defaultValues,
    resolver: zodResolver(validationSchema),
  })
  const {
    handleSubmit,
    getValues,
    setValue,
    setError,
    setFocus,
    formState: { errors, isValid },
  } = formMethods

  const getErrors = () => errors
  const checkIsValid = () => isValid

  const formActions: FormActions = {
    getValues,
    setValue,
    setError,
    setFocus,
    getErrors,
    checkIsValid,
  }

  const submitHandler = (values: FieldValues) => {
    onSubmit(values, formActions)
  }

  useEffect(() => {
    if (scrollToError) {
      const fieldId = Object.keys(errors)[0]
      if (fieldId) {
        const targetField = document.getElementById(fieldId)
        targetField?.scrollIntoView({
          block: 'center',
          behavior: 'smooth',
        })
      }
    }
  }, [errors])

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(submitHandler)}>
        {title &&
          (customFormTitle ? (
            <>{customFormTitle(title)}</>
          ) : (
            <FormTitle>{title}</FormTitle>
          ))}

        <Stack gap={24}>
          {form.map(({ fields, title, subTitle, name }) => (
            <fieldset key={name}>
              {(title || subTitle) && (
                <Stack m="0 0 20px 0" gap={8}>
                  {title &&
                    (customFieldsetTitle ? (
                      <>{customFieldsetTitle(title)}</>
                    ) : (
                      <FieldsetTitle>{title}</FieldsetTitle>
                    ))}
                  {subTitle &&
                    (customFieldsetSubTitle ? (
                      <>{customFieldsetSubTitle(subTitle)}</>
                    ) : (
                      <FieldsetSubTitle>{subTitle}</FieldsetSubTitle>
                    ))}
                </Stack>
              )}
              <Stack>
                {fields.map((field) => (
                  <Field
                    key={field.name}
                    field={field}
                    customComponents={customComponents}
                    customHelperText={customHelperText}
                    customErrorMessage={customErrorMessage}
                    customLabelMessage={customLabelMessage}
                  />
                ))}
              </Stack>
            </fieldset>
          ))}
        </Stack>

        <>{isFunction(children) ? children(formActions) : children}</>
      </form>
    </FormProvider>
  )
}

export { FormCombine }
