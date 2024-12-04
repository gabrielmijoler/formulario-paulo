import { TextProps } from './types'

export function Text({ variant = 'span', ...props }: TextProps) {
  const Component = variant as React.ElementType

  return (
    <Component
      className={`
        ${props.fontSize ? `text-${props.fontSize}` : 'text-base'}
        ${props.fontStyle ? `italic` : 'not-italic'}
        ${props.fontWeight ? `font-${props.fontWeight}` : 'font-normal'}
        ${props.lineHeight ?? `leading-${props.lineHeight}`}
        ${props.letterSpacing ? `tracking-${props.letterSpacing}` : 'tracking-normal'}
        ${props.color ? `text-${props.color}` : 'text-inherit'}
        ${props.textAlign ? `text-${props.textAlign}` : 'text-left'}
        ${props.textDecoration ? `${props.textDecoration}` : 'no-underline'}
        ${props.textTransform ? `${props.textTransform}` : 'normal-case'}
        ${props.cursor ? `cursor-${props.cursor}` : 'cursor-auto'}
      `}
      {...props}
    />
  )
}
