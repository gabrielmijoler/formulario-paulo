interface ContentProps {
  children?: React.ReactNode
  isSidebarOpen: boolean
}

export default function Content({ children }: Readonly<ContentProps>) {
  return (
    <div
      className={`
        flex flex-col mt-7
        dark:text-gray-200
        transition-all duration-300
        w-full
      `}
    >
      {children}
    </div>
  )
}
