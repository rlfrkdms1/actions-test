import { useContext, useState } from 'react'
import { TODO_CATEGORY_ICON } from '@/constants/icon'
import { TodoDispatchContext } from '../../contexts/TodoContext';

const TodoForm = ({ todo, onClose, type }) => {

    const [title, setTitle] = useState(type == 'ADD' ? ' ' : todo.title);
    const [summary, setSummary] = useState(type == 'ADD' ? ' ' : todo.summary);
    const [category, setCategory] = useState(type == 'ADD' ? 'TODO' : todo.category);

    const dispatch = useContext(TodoDispatchContext);

    const addTodoHandler = () => {
        const id = self.crypto.randomUUID();
        const newTodo = { id, title, summary, category };
        dispatch({ type: 'ADD', data: newTodo })
        onClose();
    }

    const modifyTodoHandler = () => {
        const id = todo.id;
        const updatedTodo = { id, title, summary, category };
        dispatch({ type: 'UPDATE', data: updatedTodo })
        onClose();
    }

    return (
        <>
            {/* <h3 className="text-3xl text-red-200">{ children }</h3> */}
            <form className='my-2'>
                <div>
                    <label className='block mb-2 text-xl text-white' htmlFor='title'>Title</label>
                    <input className='w-full p-2 border-[1px] border-gray-300 bg-gray-200 text-gray-900 rounded'
                        type='text' id='title' value={title} onChange={event => setTitle(event.target.value)} />
                </div>
                <div>
                    <label className='block mb-2 text-xl text-white' htmlFor='summary'>Summary</label>
                    <textarea className='w-full p-2 border-[1px] border-gray-300 bg-gray-200 text-gray-900 rounded'
                        id='summary' rows='5' value={summary} onChange={event => setSummary(event.target.value)} />
                </div>
                <div>
                    <label className='block mb-2 text-xl text-white' htmlFor='category'>Category</label>
                    <select className='w-full p-2 border-[1px] border-gray-300 bg-gray-200 text-gray-900 rounded'
                        id='category' value={category} onChange={event => setCategory(event.target.value)} >

                        <option value='TODO'>{TODO_CATEGORY_ICON.TODO} To do</option>
                        <option value='PROGRESS'>{TODO_CATEGORY_ICON.PROGRESS} On progress</option>1
                        <option value='DONE'>{TODO_CATEGORY_ICON.DONE} Done</option>
                    </select>
                </div>
                {/* {isFormInValid && <div className='mt-2 text-red-500'>모든 항목을 채워서 작성해주세요</div>} */}
                <div className='flex justify-end gap-4'>
                    <button className='text-xl text-white' type='button' onClick={onClose}>Cancel</button>
                    <button className='px-6 py-3 text-xl text-red-200' type='button' onClick={type == 'ADD' ? addTodoHandler : modifyTodoHandler}>{type == 'ADD' ? 'Add' : 'Update'}</button>
                </div>
            </form>
        </>
    )
}

export default TodoForm