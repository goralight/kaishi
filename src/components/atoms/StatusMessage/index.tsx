import React from 'react'

import Styled from '@emotion/styled'

type Status = 'error' | 'success' | 'warning'

interface StatusMessageProps {
  children: React.ReactNode
  type?: Status
  style?: React.CSSProperties
  onClick?: () => void
}

const Status = Styled.span<{ type: Status, clickable: boolean }>(
  ({ theme, type, clickable }): string => {

    const color = theme.palette.colors[type].main

    return `
      display: flex;
      flex: 1;
      justify-content: flex-start;
      border: solid 1px ${color};
      border-radius: ${theme.border.radius.md}px;
      padding: ${theme.spacing.xxs}px;
      color: ${color};

      ${clickable ? `
        cursor: pointer;

        &:hover {
          border: solid 1px ${theme.palette.colors[type].dark};
          color: ${theme.palette.colors[type].dark};
        }
      ` : null}
    `
  }
)

const StatusMessage = ({
  children,
  type = 'error',
  style = {},
  onClick
}: StatusMessageProps): JSX.Element => {
  return (
    <Status style={style} type={type} onClick={onClick} clickable={!!onClick}>{children}</Status>
  )
}

export default StatusMessage
