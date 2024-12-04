/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react'
import { Props as SelectProps } from 'react-select'

/**
 * @description Default Option type. This will be used by TFSelect so that it can have access to custom props.
 * The same type is used inside variants.
 * @see More about in react-select [docs](https://react-select.com/components#replacing-components)
 */
export type Option = {
  label: string
  value: string
  disabled?: boolean
  description?: string
  leftContent?: ReactNode
}

export type OptionVariants =
  | 'default'
  | 'description'
  | 'leftContent'
  | 'descriptionAndLeftContent'

export type ValueContainerVariants = 'default' | 'badge'

export type MultiValueRemoveVariants = 'default' | 'none'

export interface SelectInputProps<T = any>
  extends Omit<SelectProps<Option>, 'onChange'> {
  label?: string
  labelHelper?: React.ReactNode
  helperText?: string | React.ReactNode
  error?: string
  hyperLink?: string
  hyperLinkURL?: string
  /**
   * @description OptionVariants corresponds to all the avilable variants that can be used to replace default Option
   * component from react-select.
   * @see More about in react-select [docs](https://react-select.com/components#replacing-components)
   */
  optionVariant?: OptionVariants
  /**
   * @description ValueContainerVariants corresponds to all the avilable variants that can be used to replace default
   * ValueContainer component from react-select.
   * @see More about in react-select [docs](https://react-select.com/components#replacing-components)
   */
  valueContainerVariant?: ValueContainerVariants
  /**
   * @description MultiValueRemoveVariants corresponds to all the avilable variants that can be used to replace default
   * MultiValueRemove component from react-select.
   * @see More about in react-select [docs](https://react-select.com/components#replacing-components)
   */
  multiValueRemoveVariant?: MultiValueRemoveVariants
  width?: string
  onChange: (newValue: T) => void
}
