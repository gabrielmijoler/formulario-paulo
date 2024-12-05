// Pra mais Icons acessar... https://heroicons.com/

export interface IconProps {
  className?: string
}

interface IconChevronProps {
  tamanho?: number
  className?: string
}

export const IconCasa = (tamanho = 6) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-${tamanho} w-${tamanho}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
)

export const IconAjustes = (tamanho = 6) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-${tamanho} w-${tamanho}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
    />
  </svg>
)

export const IconBar = (tamanho = 6) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={`h-${tamanho} w-${tamanho}`}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
    />
  </svg>
)

export const IconChevrondown = ({
  tamanho = 4,
  className,
}: IconChevronProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    width={`${tamanho}em`}
    height={`${tamanho}em`}
    className={`${className}`}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
    />
  </svg>
)
export const IconChevronUp = ({ tamanho = 4, className }: IconChevronProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    width={`${tamanho}em`}
    height={`${tamanho}em`}
    className={`${className}`}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m4.5 15.75 7.5-7.5 7.5 7.5"
    />
  </svg>
)

export const IconSino = (tamanho = 6) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-${tamanho} w-${tamanho}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
    />
  </svg>
)

export const IconSettingHorizontal = (tamanho = 6) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={`h-${tamanho} w-${tamanho}`}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
    />
  </svg>
)

export const IconSair = (tamanho = 6) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-${tamanho} w-${tamanho}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    />
  </svg>
)

export const IconSol = (tamanho = 6) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-${tamanho} w-${tamanho}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
)

export const IconLua = (tamanho = 6) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-${tamanho} w-${tamanho}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
  </svg>
)

export const IconAtencao = (tamanho = 6) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-${tamanho} w-${tamanho}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    />
  </svg>
)

export const CloseIcon = (props: IconProps) => {
  return (
    <svg
      {...props}
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  )
}

export const FileIcon = (props: IconProps) => {
  return (
    <svg
      {...props}
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
      <polyline points="13 2 13 9 20 9"></polyline>
    </svg>
  )
}

export const UploadIcon = (props: IconProps) => {
  return (
    <svg
      {...props}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
      ></path>
    </svg>
  )
}
export const Reload = (tamanho = 6) => {
  return (
    <svg
      className={`h-${tamanho} w-${tamanho}`}
      viewBox="0 0 13 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0.500003 1C0.776145 1 1 1.22386 1 1.5V4H3.5C3.77615 4 4 4.22386 4 4.5C4 4.77614 3.77615 5 3.5 5H0.500003C0.22386 5 2.85485e-06 4.77614 2.85485e-06 4.5V1.5C2.85485e-06 1.22386 0.22386 1 0.500003 1Z"
        fill="#794FED"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.80802 0.119528C6.96381 -0.114626 8.16298 -0.00299236 9.2557 0.440481C10.3484 0.883954 11.2862 1.6396 11.9519 2.61301C12.6176 3.58641 12.9817 4.73441 12.9987 5.91356C13.0157 7.09272 12.6849 8.25074 12.0475 9.24293C11.4101 10.2351 10.4945 11.0175 9.41504 11.4923C8.33557 11.9671 7.14012 12.1132 5.97805 11.9125C4.81599 11.7118 3.73884 11.173 2.8812 10.3636C2.68037 10.1741 2.67121 9.85765 2.86075 9.65682C3.05028 9.45599 3.36673 9.44684 3.56756 9.63637C4.28226 10.3109 5.17988 10.7598 6.14827 10.9271C7.11666 11.0944 8.11287 10.9726 9.01243 10.5769C9.91199 10.1813 10.675 9.52928 11.2062 8.70245C11.7373 7.87562 12.013 6.91061 11.9988 5.92798C11.9847 4.94535 11.6813 3.98869 11.1265 3.17752C10.5717 2.36635 9.79024 1.73664 8.87964 1.36708C7.96905 0.997517 6.96974 0.904489 6.00658 1.09962C5.04341 1.29475 4.15911 1.76938 3.46415 2.46421C3.45895 2.46941 3.45363 2.4745 3.44821 2.47946L0.837582 4.86884C0.633878 5.05528 0.317605 5.04128 0.131166 4.83758C-0.0552735 4.63387 -0.0412784 4.3176 0.162425 4.13116L2.76509 1.74907C3.59782 0.919613 4.65591 0.352936 5.80802 0.119528Z"
        fill="#794FED"
      />
    </svg>
  )
}
export const DashBoard = (tamanho = 6) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={`h-${tamanho} w-${tamanho}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
      />
    </svg>
  )
}
