import { FC } from "react";
import { BaseFieldProps, Field, FormCombineProps } from "lib/FormCombine";

export interface FieldControllerProps extends Pick<Field, 'name'> {
    fieldComponent: FC<BaseFieldProps>
    field: Field
    customHelperText: FormCombineProps["customHelperText"]
    customErrorMessage: FormCombineProps["customErrorMessage"]
    customLabelMessage: FormCombineProps["customLabelMessage"]
}