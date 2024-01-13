import styled from '@emotion/styled'
import { Enable, ResizeDirection } from 're-resizable'
import React, { useEffect, useState } from 'react'
import { DraggableEvent } from 'react-draggable'
import { DraggableData, Position, ResizableDelta, Rnd } from 'react-rnd'
import Icon from '../../atoms/Icon'

interface WidgetProps {
  children: React.ReactNode
}

const StyledRnd = styled(Rnd)(
  ({ theme }): string => {
    return `
      outline: 2px dashed ${theme.palette.colors.primary.main};
    `
  }
)

const WidgetContentContainer = styled.div(
  ({ theme }): string => {
    return `
      position: relative;
      outline: 1px dashed ${theme.palette.colors.success.main};
      height: fit-content;
      width: fit-content;
      transform-origin: 0 0;
    `
  }
)

const Tools = styled.div<{ isVisible: boolean }>(
  ({ theme, isVisible }): string => {
    return `
      position: absolute;
      display: flex;
      top: -33px;
      left: 50%;
      gap: 4px;
      align-items: center;
      transition: opacity 0.2s ease;
      opacity: ${isVisible ? 1 : 0};
      background-color: ${theme.palette.colors.background.main};
      border-radius: ${theme.border.radius.sm}px;
      padding: 8px;
    `
  }
)

const Widget: React.FC<WidgetProps> = ({
  children
}) => {
  const contentContainerRef = React.useRef<HTMLDivElement>(null)

  const [showTools, setShowTools] = useState(false)
  const [originalWh, setOriginalWh] = useState({ w: 0, h: 0 })
  const [wh, setWh] = useState({ w: 0, h: 0 })
  const [xy, setXy] = useState({ x: 0, y: 0 })
  const [scale, setScale] = useState({ x: 1, y: 1 })
  const [zIndex, setZIndex] = useState(0)

  const scaleToFit = (): void => {
    if (contentContainerRef.current) {
      const x = wh.w / contentContainerRef.current.offsetWidth
      const y = wh.h / contentContainerRef.current.offsetHeight
      setScale({ x, y })
    }
  }

  useEffect(() => {
    if (contentContainerRef.current) {
      setWh({
        w: contentContainerRef.current.offsetWidth,
        h: contentContainerRef.current.offsetHeight
      })
      setOriginalWh({
        w: contentContainerRef.current.offsetWidth,
        h: contentContainerRef.current.offsetHeight
      })
    }
  }, [contentContainerRef.current])

  useEffect(() => {
    scaleToFit()
  }, [wh])

  const handleOnResize = (e: MouseEvent | TouchEvent, dir: ResizeDirection, elementRef: HTMLElement, delta: ResizableDelta, position: Position): void => {
    setWh({
      w: parseInt(elementRef.style.width),
      h: parseInt(elementRef.style.height)
    })
    setXy({ x: position.x, y: position.y })
  }

  const handleOnDragStop = (e: DraggableEvent, data: DraggableData): void => {
    setXy({ x: data.x, y: data.y })
  }

  const handleOnMouseEnter = (): void => {
    setShowTools(true)
  }

  const handleOnMouseLeave = (): void => {
    setShowTools(false)
  }

  const resizing: Enable = {
    top: false,
    topRight: true,
    right: false,
    bottomRight: true,
    bottom: false,
    bottomLeft: true,
    left: false,
    topLeft: true
  }

  console.log('showTools', showTools)

  return (
    <StyledRnd
      enableResizing={resizing}
      onResize={handleOnResize}
      onDragStop={handleOnDragStop}
      lockAspectRatio={true}
      // size={{ width: wh.w, height: wh.h }} // not sure if needed
      minWidth={originalWh.w}
      minHeight={originalWh.h}
      position={{ x: xy.x, y: xy.y }}
    >
      <WidgetContentContainer
        ref={contentContainerRef}
        onMouseOver={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        style={{ transform: `scale(${scale.x}, ${scale.y})` }}
      >
        <Tools isVisible={showTools}>
          <Icon icon='chevron-circle-down' prefix='fas' color='tertiary' />
          <span>{zIndex}</span>
          <Icon icon='chevron-circle-up' prefix='fas' color='tertiary' />
          <span>|</span>
          <Icon icon='circle-xmark' color='secondary' />
        </Tools>
        {children}
      </WidgetContentContainer>
    </StyledRnd>
  )
}

export default Widget
