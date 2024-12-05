interface ContentProps {
  children?: React.ReactNode
  isSidebarOpen: boolean
}

export default function Content({ children, isSidebarOpen }: ContentProps) {
  return (
    <div
      className={`
            flex flex-col mt-7 ${isSidebarOpen ? 'ml-60' : 'ml-10'}
            dark:text-gray-200
        `}
    >
      {children}
    </div>
  )
}
