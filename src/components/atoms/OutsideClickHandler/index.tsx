import React, { useEffect, useRef } from 'react'

interface OutsideClickHandlerProps {
  children: React.ReactNode
  onOutsideClick: () => void
}

const OutsideClickHandler: React.FC<OutsideClickHandlerProps> = ({
  children,
  onOutsideClick
}) => {
  const ref = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: MouseEvent): void => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      onOutsideClick()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return (): void => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <div ref={ref}>
      {children}
    </div>
  )
}

export default OutsideClickHandler
