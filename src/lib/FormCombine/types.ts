import { FC, PropsWithChildren, ReactNode } from "react";
import { FieldErrors, FieldValues, SubmitHandler, UseFormGetValues, UseFormSetError, UseFormSetFocus, UseFormSetValue } from "react-hook-form";

export enum ElementType {
    TextField = 'textField',
    Password = 'password',
    TextArea = 'textArea',
    Select = 'select', //<optgroup label="label"></otpgroup>
    Checkbox = 'checkbox',
    Radio = 'radio',
    Fieldset = 'fieldset',
    Datalist = 'datalist',
    Range = 'range',
    Search = 'search',
    //
    DatePicker = 'datePicker',
    ColorPicker = 'colorPicker',
    FileUpload = 'fileUpload'
}

export enum ValidationRuleType {
    Requiered = 'required',
    String = 'string',
    Number = 'number',
    Email = 'email',
    Boolean = 'boolean',
    Regex = 'regex',
    MinLength = 'minLength',
    MaxLength = 'maxLength'
}
export interface ValidationRule {
    type: ValidationRuleType
    message?: string
    value?: number | string

}

export interface Field {
    name: string
    elementType: ElementType
    label?: string
    placeholder?: string
    helperText?: string
    value: FieldValues
    validation: ValidationRule[]
    mask?: string
    disabled?: boolean
    cross?: boolean;
}

export interface Fieldset {
    elementType: ElementType.Fieldset
    name: string
    title?: string
    subTitle?: string
    fields: Field[]
}

export interface FormData {
    form: Fieldset[]
    title?: string
    fieldsGap?: number
    fieldsetsGap?: number
}

export interface FormActions {
    getValues: UseFormGetValues<FieldValues>
    setValue: UseFormSetValue<FieldValues>
    setError: UseFormSetError<FieldValues>
    setFocus: UseFormSetFocus<FieldValues>
    getErrors: () => FieldErrors<FieldValues>
    checkIsValid: () => boolean
}

export type GetFormActions = (actions: FormActions) => ReactNode

export interface BaseFieldProps {
    id?: string
    onChange: () => void
    onBlur: () => void
    setFieldValue: (newValue: any) => void
    name?: string
    disabled?: boolean
    isDirty: boolean
    isTouched: boolean
    isRequired: boolean
    placeholder?: string
    error?: boolean
    value?: any
}

export type CustomComponents = {
    [key in ElementType]?: FC<BaseFieldProps>
}

export interface FormCombineProps {
    data?: unknown
    onSubmit: (values: FieldValues, actions?: FormActions) => void
    children?: ReactNode | GetFormActions
    scrollToError?: boolean;
    customComponents?: CustomComponents
    customHelperText?: (text: string) => ReactNode
    customErrorMessage?: (errorMessage: string) => ReactNode;
    customLabelMessage?: (label?: string, isRequired?: boolean) => ReactNode;
    customFormTitle?: (title: string) => ReactNode
    customFieldsetTitle?: (title: string) => ReactNode
    customFieldsetSubTitle?: (subTitle: string) => ReactNode
}