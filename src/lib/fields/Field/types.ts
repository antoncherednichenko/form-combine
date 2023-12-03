import { FC, PropsWithChildren } from "react";
import { CustomComponents, Field, FormCombineProps } from "lib/FormCombine";

export interface FieldProps extends Pick<
    FormCombineProps,
    'customComponents'
    | 'customErrorMessage'
    | 'customLabelMessage'
    | 'customHelperText'
> {
    field: Field
}

