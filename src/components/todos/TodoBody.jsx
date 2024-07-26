import { useContext } from 'react'
import TodoItem from './TodoItem'
import { TodoContext, TodoFilterContext } from '../../contexts/TodoContext'

const TodoBody = () => {
  const todos = useContext(TodoContext);
  const [category] = useContext(TodoFilterContext);
  const filteredTodos = todos.filter(todo => category === 'all' ? todos : todo.category === category)
  return (
    <ul className='px-0 my-8'>
        {filteredTodos.map(todo => <TodoItem todo={todo} key={todo.id}/>)}
    </ul>
  )
}

export default TodoBody