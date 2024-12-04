export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
  display?: 'flex' | 'inline-flex' | 'block' | 'inline-block'
  direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse'
  justifyContent?:
    | 'normal'
    | 'start'
    | 'center'
    | 'end'
    | 'between'
    | 'around'
    | 'stretch'
  alignItems?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
  alignContent?: 'start' | 'center' | 'end' | 'between' | 'around' | 'stretch'
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
  flexGrow?: number
  flexShrink?: number
  maxH?: string
  height?: string
  maxW?: string
  width?: string
  gap?: string
  children: React.ReactNode
}
