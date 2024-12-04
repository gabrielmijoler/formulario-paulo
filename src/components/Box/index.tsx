import { BoxProps } from './types'

export function Box({
  children,
  display,
  direction,
  justifyContent,
  alignItems,
  alignContent,
  flexWrap,
  flexGrow,
  flexShrink,
  maxH,
  height,
  maxW,
  width,
  gap,
  as: Component = 'div',
  hidden,
  className,
  ...rest
}: BoxProps) {
  if (hidden) return null

  return (
    <Component
      className={`
        ${className}
        ${display ? `${display}` : 'flex'} 
        ${direction ? `flex-${direction}` : 'flex-col'} 
        ${justifyContent ? `justify-items-${justifyContent}` : 'justify-items-start'} 
        ${alignItems ? `items-${alignItems}` : 'items-start'} 
        ${alignContent ? `content-${alignContent}` : 'content-stretch'} 
        ${flexWrap ? `flex-${flexWrap}` : 'flex-nowrap'} 
        ${flexGrow ? `${flexGrow}` : 'grow-0'} 
        ${flexShrink ? `${flexShrink}` : 'shrink'} 
        ${maxH ? `max-h-${maxH}` : 'max-h-none'} 
        ${maxW ? `max-w-${maxW}` : 'max-w-none'} 
        ${width ? `w-${width}` : 'w-full'} 
        ${height ? `h-${height}` : 'h-auto'} 
        ${gap ? `gap-${gap}` : 'gap-0'} 
      `}
      {...rest}
    >
      {children}
    </Component>
  )
}
