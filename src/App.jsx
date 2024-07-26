import { useState, useReducer } from 'react'
import TodoBody from './components/todos/TodoBody'
import TodoHeader from './components/todos/TodoHeader'
import DefaultLayout from './layouts/DefaultLayout'
import { TodoContext, TodoDispatchContext, TodoFilterContext } from './contexts/TodoContext'

const reducer = (todos, action) => {
  switch (action.type) {
    case 'ADD':
      return [...todos, action.data];
    case 'UPDATE':
      return [...todos].map(todo => todo.id == action.data.id ? todo = action.data : todo);
    case 'DELETE':
      return [...todos].filter(todo => todo.id !== action.data.id);
  }
}

  const dummyTodos = [
    {
      id: 1,
      title: 'React 공부',
      summary: 'React를 공부한다.',
      category: 'TODO',
    },
    {
      id: 2,
      title: '점심 먹기',
      summary: '점심을 먹는다.',
      category: 'PROGRESS',
    },
    {
      id: 3,
      title: '커피 마시기',
      summary: '커피를 마신다.',
      category: 'DONE',
    }
  ]

  function App() {

    const [todos, dispatch] = useReducer(reducer, dummyTodos);
    const [category, setCategory] = useState('all');

    return (
      <>
        <DefaultLayout>
          <header>
            <div className="flex justify-center">
              <a to="/" className='flex'>
                <h1 className='py-8 text-red-200 max-w-max text-7xl'>todos
                </h1>
                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Cat%20with%20Wry%20Smile.png" alt="Cat with Wry Smile" width="50" height="50" />
              </a>
            </div>
          </header>
          <section className="max-w-xl m-4 mx-auto">
            {/* onAdd라는 이름으로 addTodoHandler 함수를 props로 내려줌 */}
            <TodoContext.Provider value={todos}>
              <TodoDispatchContext.Provider value={dispatch}>
                <TodoFilterContext.Provider value={[category, setCategory]}>
                <TodoHeader />
                <TodoBody />
                </TodoFilterContext.Provider>
              </TodoDispatchContext.Provider>
            </TodoContext.Provider>
          </section>
        </DefaultLayout >
      </>
    )
  }

  export default App
