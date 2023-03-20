import React, {useRef} from 'react';

const TodoListCreate = () => {
    const inputRef = useRef<HTMLInputElement>(null)

    const onClickHandle = async () => {
        if (inputRef.current != null) {
            await fetch(process.env.API_URL as string, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task: inputRef.current.value, completed: false })
            })
            inputRef.current.value = ""
        }
    }

    return (
        <div className='w-5/6 h-12 py-4 px-8 mt-8 bg-primary m-auto rounded-full flex align-middle justify-between relative'>
            <input ref={inputRef} type="text" name='newTodo' placeholder="Create new list" className=' w-5/6 bg-transparent text-gray-300 font-semibold border-none outline-none text-md'/>
            <button onClick={onClickHandle} className='bg-secondary w-8 h-8 m-0 rounded-full p-0 text-center font-bold text-white text-xl absolute top-2 right-3'>+</button>
        </div>
    );
};

export default TodoListCreate;