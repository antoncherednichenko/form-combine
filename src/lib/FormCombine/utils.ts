import { FieldValues } from "react-hook-form"
import { z } from "zod"
import { ElementType, Field, ValidationRule, Fieldset, FormData, ValidationRuleType } from "./types"

export const isFunction = (item: unknown): item is () => void => {
    return (item && {}.toString.call(item)) === '[object Function]'
}

export const isFieldset = (fieldForCheck: Field | Fieldset): fieldForCheck is Fieldset => {
    return fieldForCheck.elementType === ElementType.Fieldset
}

export const isField = (fieldForCheck: Field | Fieldset): fieldForCheck is Field =>
    !isFieldset(fieldForCheck)

export const getAllFields = (form: Fieldset[]): Field[] => {
    return form.reduce((fields, fieldset) => ([
        ...fields,
        ...fieldset.fields,
    ]), [] as Field[])
}

export const getDefaultValues = (form: Field[]): FieldValues => {
    return form.reduce((initValues, field) => {
        return {
            [field.name]: field.value,
            ...initValues
        }
    }, {} as FieldValues)
}

export const getFieldValidationRule = (
    zObj: any,
    validationList?: ValidationRule[],
    index: number = 0
): any => {

    if (!validationList?.length) {
        return zObj
    }

    const { type, message, value } = validationList[index] ?? {}

    switch (type) {
        case ValidationRuleType.String: {
            return getFieldValidationRule(zObj.string(), validationList, index + 1)
        }
        case ValidationRuleType.MaxLength: {
            return getFieldValidationRule(
                zObj.max(Number(value), { message }),
                validationList,
                index + 1
            )
        }
        case ValidationRuleType.MinLength: {
            return getFieldValidationRule(
                zObj.min(Number(value), { message }),
                validationList,
                index + 1
            )
        }
        case ValidationRuleType.Boolean: {
            return getFieldValidationRule(
                zObj.boolean({ message }),
                validationList,
                index + 1
            )
        }
        case ValidationRuleType.Requiered: {
            return getFieldValidationRule(
                zObj.nonempty({ message }),
                validationList,
                index + 1
            )
        }
        default: {
            return zObj
        }
    }
}


export const getValidationSchema = (form: Field[]): any => {
    const schema: any = {}

    for (let i = 0; i < form.length; i++) {
        const currentField = form[i]
        if (isField(currentField)) {
            if (currentField.validation) {
                schema[currentField.name] =
                    getFieldValidationRule(z, currentField.validation)
            }
        }
    }
    return z.object(schema)
}