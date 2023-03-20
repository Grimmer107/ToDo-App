import React from 'react';

interface Props {
    search: String | any,
    setSearch: Function
}

const TodoSearch:React.FC<Props> = ({search, setSearch}) => {
    return (
        <div className='flex align-middle w-4/6'>
            <p className='text-sm text-gray-400 h-10 w-1/5 text-centre px-5 py-2.5'>Search</p>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={"Enter search string..."} className='bg-primary w-4/5 px-4 py-2 text-white text-xs rounded-full ml-2 outline-none'/>
        </div>
    );
};

export default TodoSearch;