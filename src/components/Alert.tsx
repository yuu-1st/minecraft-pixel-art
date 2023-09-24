import React from 'react'
import { Alert as BootstrapAlert } from 'react-bootstrap'

function Alert ({
  variant,
  dismissible,
  children,
  ...otherProps
}: {
  variant: string
  dismissible: boolean
  children: React.ReactNode
}): JSX.Element | false {
  const [show, setShow] = React.useState(true)

  return (
    show && (
      <BootstrapAlert
        variant={variant}
        dismissible={dismissible}
        onClose={() => setShow(false)}
        {...otherProps}
      >
        {children}
      </BootstrapAlert>
    )
  )
}

export default Alert
