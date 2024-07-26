
import IconButton from '@/components/ui/IconButton'
import { TODO_CATEGORY_ICON } from '@/constants/icon'
import Modal from "@/components/ui/Modal";
import { createPortal } from "react-dom";
import TodoForm from './TodoForm';
import { useContext, useState } from "react";
import { TodoDispatchContext } from '../../contexts/TodoContext';

const TodoItem = ({ todo }) => {
  const [openModal, open] = useState(false);
  const closeModal = () => open(false);
  const dispatch = useContext(TodoDispatchContext);
  
  return (
    <li className="flex gap-4 justify-between my-4 py-4 px-4 border-[1px] bg-gray-700 rounded-md shadow-xl">
      <div>
        <span className="text-lg font-medium text-gray-300">{TODO_CATEGORY_ICON[todo.category]}</span>
        <div>
          <h2 data-test="title" className="mb-0 text-lg font-bold text-gray-100 uppercase">{todo.title}</h2>
          <p className="mt-2 text-base text-gray-200">{todo.summary}</p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <IconButton onClick={() => open(true)} icon={'✏️'} />
        <IconButton onClick={() => dispatch({type: 'DELETE', data: todo})} icon={'🗑'} />
      </div>
      {/* Modal 호출 부분 */}
      {openModal && createPortal(
        <Modal onClose={closeModal}>
          <TodoForm type={'UPDATE'} todo={todo} onClose={closeModal} />
        </Modal>, document.body)}

    </li>
  )
}

export default TodoItem