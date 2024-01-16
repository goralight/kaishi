import styled from '@emotion/styled'
import { Enable, ResizeDirection } from 're-resizable'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { DraggableEvent } from 'react-draggable'
import { DraggableData, Position, ResizableDelta, Rnd } from 'react-rnd'
import Icon from '../../atoms/Icon'

export interface CommonWidgetProps {
  id: string
  name: string
  editMode: boolean
  wh: { w: number, h: number }
  setWh: (wh: { w: number, h: number }) => void
  xy: { x: number, y: number }
  setXy: (xy: { x: number, y: number }) => void
  originalWh: { w: number, h: number }
  setOriginalWh: (wh: { w: number, h: number }) => void
  zIndex: number
  setZIndex: (zIndex: number) => void
  scale: { x: number, y: number }
  setScale: (scale: { x: number, y: number }) => void
}

interface WidgetProps extends CommonWidgetProps {
  children: React.ReactNode
}

const StyledRnd = styled(Rnd)<{ editMode: boolean }>(
  ({ theme, editMode }): string => {
    return `
      ${editMode ? `outline: 2px dashed ${theme.palette.colors.primary.main};` : ''}
    `
  }
)

const WidgetContentContainer = styled.div<{ editMode: boolean }>(
  ({ theme, editMode }): string => {
    return `
      position: relative;
      height: fit-content;
      width: fit-content;
      transform-origin: 0 0;

      & > * {
        pointer-events: ${editMode ? 'none' : 'all'};
      }
    `
  }
)

const Tools = styled.div<{ isVisible: boolean }>(
  ({ theme, isVisible }): string => {
    return `
      position: absolute;
      display: flex;
      top: -37px;
      left: 50%;
      transform: translateX(-50%);
      width: fit-content;
      align-items: center;
      justify-content: space-between;
      transition: opacity 0.2s ease;
      opacity: ${isVisible ? 1 : 0};
      background-color: ${theme.palette.colors.background.main};
      border-radius: ${theme.border.radius.sm}px;
      padding: 8px;
      gap: 4px;
    `
  }
)

const ZIndexContainer = styled.div(
  ({ theme }): string => {
    return `
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      flex: 1;
    `
  }
)

const ZIndexSpan = styled.span(
  ({ theme }): string => {
    return `
      text-align: center;
      width: 15px;
    `
  }
)

const Pipe = styled.span(
  ({ theme }): string => {
    return `
      color: ${theme.palette.colors.foreground.main};
    `
  }
)

const Widget: React.FC<WidgetProps> = ({
  id,
  name,
  wh,
  setWh,
  xy,
  setXy,
  originalWh,
  setOriginalWh,
  zIndex,
  setZIndex,
  scale,
  setScale,
  editMode,
  children
}) => {
  const contentContainerRef = React.useRef<HTMLDivElement>(null)

  const [showTools, setShowTools] = useState(false)
  const [lockAspectRatio, setLockAspectRatio] = useState(true)
  const [shouldScale, setShouldScale] = useState(true)
  // const [originalWh, setOriginalWh] = useState({ w: 0, h: 0 })
  // const [wh, setWh] = useState({ w: 0, h: 0 })
  // const [xy, setXy] = useState({ x: 0, y: 0 })
  // const [zIndex, setZIndex] = useState(5)
  // const [scale, setScale] = useState({ x: 1, y: 1 })

  const scaleToFit = (): void => {
    if (contentContainerRef.current && shouldScale) {
      const x = wh.w / contentContainerRef.current.offsetWidth
      const y = wh.h / contentContainerRef.current.offsetHeight
      setScale({ x, y })
    }
  }

  useEffect(() => {
    if (contentContainerRef.current) {
      if (wh.w === 0 || wh.h === 0) { // if 0, it needs to figure out what the original size is and set it, 0 should be for first load of widget
        setWh({
          w: contentContainerRef.current.offsetWidth,
          h: contentContainerRef.current.offsetHeight
        })
        setOriginalWh({
          w: contentContainerRef.current.offsetWidth,
          h: contentContainerRef.current.offsetHeight
        })
      }
    }
    scaleToFit()
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

  const handleZIndex = (increment: boolean): void => {
    if (increment) {
      setZIndex(zIndex + 1)
    } else {
      setZIndex(zIndex === 0 ? 0 : zIndex - 1)
    }
  }

  const handleDeleteWidget = (): void => {
    console.log('delete comp id:', id)
  }

  const resizing: Enable = {
    top: false,
    topRight: editMode,
    right: false,
    bottomRight: editMode,
    bottom: false,
    bottomLeft: editMode,
    left: false,
    topLeft: editMode
  }

  return (
    <StyledRnd
      enableResizing={resizing}
      onResize={handleOnResize}
      onDragStop={handleOnDragStop}
      lockAspectRatio={lockAspectRatio}
      size={{ width: wh.w, height: wh.h }} // not sure if needed
      minWidth={originalWh.w}
      minHeight={originalWh.h}
      position={{ x: xy.x, y: xy.y }}
      dragAxis={editMode ? 'both' : 'none'}
      editMode={editMode}
      style={{ zIndex, cursor: editMode ? 'move' : 'inherit' }}
    >
      {editMode ? (
        <Tools
          isVisible={showTools}
          onMouseOver={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}>
          <ZIndexContainer>
            <Icon icon='chevron-circle-down' prefix='fas' color='primary' onClick={(): void => { handleZIndex(false) }} />
            <ZIndexSpan>{zIndex}</ZIndexSpan>
            <Icon icon='chevron-circle-up' prefix='fas' color='primary' onClick={(): void => { handleZIndex(true) }} />
          </ZIndexContainer>
          <Pipe>|</Pipe>
          <Icon icon={lockAspectRatio ? 'lock' : 'lock-open'} prefix='fas' color={lockAspectRatio ? 'primary' : 'foreground'} onClick={(): void => { setLockAspectRatio(!lockAspectRatio) }} />
          <Icon icon='up-right-and-down-left-from-center' prefix='fas' color={shouldScale ? 'primary' : 'foreground'} onClick={(): void => { setShouldScale(!shouldScale) }} />
          <Pipe>|</Pipe>
          <Icon icon='info-circle' prefix='fas' color='foreground' title={`name:${name}\nid:${id}`} />
          <Pipe>|</Pipe>
          <Icon icon='circle-xmark' color='error' onClick={handleDeleteWidget} />
        </Tools>
      ) : null}
      <WidgetContentContainer
        ref={contentContainerRef}
        editMode={editMode}
        onMouseOver={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        style={{ transform: `scale(${scale.x}, ${scale.y})` }}
      >
        {children}
      </WidgetContentContainer>
    </StyledRnd>
  )
}

export default Widget
