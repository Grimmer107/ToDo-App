import React, {useState} from 'react';
import { useRouter } from 'next/router'

import { List } from '@/utils/types';
import TodoListDelete from './TodoListDelete';
import TodoListShare from './TodoListShare';

interface Props {
    props: List
}

const TodoItemList:React.FC<Props> = ({props}) => {

    const [todoDelete, setTodoDelete] = useState(false)
    const router = useRouter()
    const [status, setStatus] = useState(props.status)
    
    const onClickHandle = () => {
        localStorage.setItem("listname", props.name)
        localStorage.setItem("listID", props._id as string)
        router.push("http://localhost:3000/Todos")
    }

    return (
        !todoDelete ? <div className='bg-item mt-4 w-5/6 m-auto rounded-md p-4 text-gray-300 flex justify-between'>
            <p onClick={onClickHandle} className='text-md overflow-auto ml-2 cursor-pointer'>
                {props.name}
            </p>
            <div className='flex'>
                <TodoListShare status={status} setStatus={setStatus} _id={props._id as String}/>
                <TodoListDelete setTodoDelete={setTodoDelete} id={props._id}/>
            </div>
        </div> : null
    );
};

export default TodoItemList;