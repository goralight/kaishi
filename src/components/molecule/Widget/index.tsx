import styled from '@emotion/styled'
import { Enable, ResizeDirection } from 're-resizable'
import React, { useEffect, useState } from 'react'
import { DraggableEvent } from 'react-draggable'
import { DraggableData, Position, ResizableDelta, Rnd } from 'react-rnd'
import Icon from '../../atoms/Icon'
import { useAppDispatch } from '../../../store/store'
import { CommonWidgetProperties, removeWidget, updateWidget } from '../../../store/features/storedWidgetsSlice'

interface WidgetProps extends CommonWidgetProperties {
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

      overflow: auto;

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
      border-radius: ${theme.border.radius}px;
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
  xy,
  minWH,
  zIndex,
  scale,
  editMode,
  children
}) => {

  const dispatch = useAppDispatch()

  const contentContainerRef = React.useRef<HTMLDivElement>(null)

  const [showTools, setShowTools] = useState(false)
  const [lockAspectRatio, setLockAspectRatio] = useState(false)
  const [shouldScale, setShouldScale] = useState(false)
  const [_wh, _setWh] = useState(wh)
  const [_xy, _setXy] = useState(xy)

  const scaleToFit = (): void => {
    if (contentContainerRef.current && shouldScale) {
      const x = _wh.w / contentContainerRef.current.offsetWidth
      const y = _wh.h / contentContainerRef.current.offsetHeight
      dispatch(updateWidget({
        id,
        scale: {
          x,
          y
        }
      }))
    }
  }

  useEffect(() => {
    if (contentContainerRef.current) {
      if (_wh.w === 0 || _wh.h === 0) { // if 0, it needs to figure out what the original size is and set it, 0 should be for first load of widget
        const { offsetWidth, offsetHeight } = contentContainerRef.current
        dispatch(updateWidget({
          id,
          wh: {
            w: offsetWidth,
            h: offsetHeight
          },
          minWH: {
            w: offsetWidth,
            h: offsetHeight
          }
        }))
      }
    }
    scaleToFit()
  }, [contentContainerRef.current])

  useEffect(() => {
    scaleToFit()
    dispatch(updateWidget({
      id,
      wh: {
        w: _wh.w,
        h: _wh.h
      },
      xy: {
        x: _xy.x,
        y: _xy.y
      }
    }))
  }, [_wh, _xy])

  const handleOnResize = (e: MouseEvent | TouchEvent, dir: ResizeDirection, elementRef: HTMLElement, delta: ResizableDelta, position: Position): void => {
    const { x, y } = position
    const { width, height } = elementRef.style

    _setWh({
      w: parseInt(width),
      h: parseInt(height)
    })
    _setXy({
      x,
      y
    })

  }

  const handleOnDragStop = (e: DraggableEvent, data: DraggableData): void => {
    const { x, y } = data

    dispatch(updateWidget({
      id,
      xy: {
        x,
        y
      }
    }))
  }

  const handleOnMouseEnter = (): void => {
    setShowTools(true)
  }

  const handleOnMouseLeave = (): void => {
    setShowTools(false)
  }

  const handleZIndex = (increment: boolean): void => {
    let toStoreIndex: number

    if (increment) {
      toStoreIndex = zIndex + 1
    } else {
      toStoreIndex = zIndex === 0 ? 0 : zIndex - 1
    }

    dispatch(updateWidget({
      id,
      zIndex: toStoreIndex
    }))
  }

  const handleDeleteWidget = (): void => {
    dispatch(removeWidget(id))
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
      minWidth={minWH.w}
      minHeight={minWH.h}
      position={{ x: xy.x, y: xy.y }}
      dragAxis={editMode ? 'both' : 'none'}
      editMode={editMode}
      style={{ zIndex, cursor: editMode ? 'move' : 'inherit' }}
      className='StyledRND'
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
