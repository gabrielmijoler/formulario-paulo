import { HTMLProps } from 'react'

export interface TextProps extends HTMLProps<HTMLSpanElement> {
  variant?: 'h1' | 'h2' | 'h3' | 'span' | 'p' | 'strong'
  fontFamily?: string
  fontSize?: string
  fontStyle?: 'normal' | 'italic' | 'oblique'
  fontWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
  lineHeight?: string
  letterSpacing?: string
  color?: string
  textAlign?: 'left' | 'center' | 'right'
  textDecoration?: string
  textTransform?: string
  cursor?: string
  m?: string
  mx?: string
  my?: string
  mt?: string
  mr?: string
  mb?: string
  ml?: string
  p?: string
  px?: string
  py?: string
  pt?: string
  pr?: string
  pb?: string
  pl?: string
}
