import React, { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import MDEditor from '@uiw/react-md-editor'
import { CommonWidgetProperties, updateWidget } from '../../../store/features/storedWidgetsSlice'
import Widget from '../../molecule/Widget'
import { useAppDispatch } from '../../../store/store'
import Button from '../../atoms/Button'

export interface MDNotepadProperties {
  markdown: string
}

interface MDNotepadProps extends CommonWidgetProperties, MDNotepadProperties { }

const MDNotepad = ({
  id,
  name,
  type = 'MDNotepad',
  editMode,
  zIndex,
  xy,
  wh,
  minWH,
  scale,
  markdown
}: MDNotepadProps): JSX.Element => {
  const dispatch = useAppDispatch()

  const [editMarkdown, setEditMarkdown] = useState(false)
  const [value, setValue] = useState<string | undefined>(markdown)

  useEffect(() => {
    dispatch(updateWidget({
      id,
      widgetValues: {
        markdown: value || ''
      }
    }))
  }, [value])

  console.log('wh', wh)
  return (
    <Widget
      id={id}
      name={name}
      type={type}
      editMode={editMode}
      wh={wh}
      xy={xy}
      minWH={minWH}
      zIndex={zIndex}
      scale={scale}
    >
      <Button onClick={(): void => setEditMarkdown(!editMarkdown)}>Toggle edit mode</Button>
      {editMarkdown ? (
        <MDEditor height={wh.h} style={{ width: wh.w }} value={value} onChange={setValue} />
      ) : (
        <div style={{ height: wh.h, width: wh.w }}>
          <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
        </div>
      )}
    </Widget>
  )
}

export default MDNotepad
