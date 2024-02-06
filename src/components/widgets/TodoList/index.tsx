import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import dayjs, { ManipulateType } from 'dayjs';
import { CommonWidgetProperties, updateWidget } from '../../../store/features/storedWidgetsSlice'
import Widget from '../../molecule/Widget'
import Icon from '../../atoms/Icon'
import Checkbox from '../../atoms/Checkbox'
import { useAppDispatch } from '../../../store/store'

export interface TodoItem {
  id: string
  text: string
  completed: boolean
  shouldResetAfterScheduledTime: boolean
  shouldDeleteAfterScheduledTime: boolean
  shouldDeleteOnComplete: boolean
  interval: '24 h' // '12h' | '24h' | '48h' | '1w'
  scheduledTime: Date
}

export interface TodoListProperties {
  todoList: TodoItem[]
}

interface TodoListProps extends CommonWidgetProperties, TodoListProperties { }

const TodoList = ({
  id,
  name,
  type = 'TodoList',
  editMode,
  zIndex,
  xy,
  wh,
  minWH,
  scale,
  todoList
}: TodoListProps): JSX.Element => {
  const dispatch = useAppDispatch()
  const [todos, setTodos] = useState(todoList)

  useEffect(() => {

    todos.forEach((todo: TodoItem) => {
      const splitInterval = todo.interval.split(' ')
      const duration = parseInt(splitInterval[0])
      const type = splitInterval[1] as ManipulateType
      const time = dayjs(todo.scheduledTime)
      if (todo.shouldResetAfterScheduledTime) {
        if (time.add(duration, type).isBefore(dayjs())) {
          setTodos(todos.map((t: TodoItem) => {
            if (t.id === todo.id) {
              return { ...t, completed: false }
            }
            return t
          }))
        }
      }
      if (todo.shouldDeleteAfterScheduledTime) {
        if (time.add(duration, type).isBefore(dayjs())) {
          setTodos(todos.filter((t: TodoItem) => t.id !== todo.id))
        }
      }
      if (todo.completed && todo.shouldDeleteOnComplete) {
        setTodos(todos.filter((t: TodoItem) => t.id !== todo.id))
      }
    })
  }, [])

  useEffect(() => {
    dispatch(updateWidget({
      id,
      widgetValues: {
        todoList: todos
      }
    }))
  }, [todos])

  const handleAddTodo = (): void => {
    setTodos([...todos, {
      id: uuidv4(),
      text: 'New Todo',
      completed: false,
      shouldResetAfterScheduledTime: false,
      shouldDeleteAfterScheduledTime: true,
      shouldDeleteOnComplete: false,
      interval: '24 h',
      scheduledTime: dayjs().hour(8).minute(0).second(0).toDate()
    }])
  }

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
      {todos.length === 0 ? (
        <h1>
          No Todos!
        </h1>
      ) : (<div>
        {todos.map((todo: TodoItem) => (
          <div key={todo.id}>
            {todo.text}
            <Checkbox checked={todo.completed} onChange={(): void => {
              setTodos(todos.map((t: TodoItem) => {
                if (t.id === todo.id) {
                  return { ...t, completed: !t.completed }
                }
                return t
              })
              )
            }}
            />

          </div>
        ))}
      </div>)}
      <Icon prefix='fas' color='success' icon='plus-circle' onClick={handleAddTodo} />
    </Widget>
  )
}

export default TodoList
