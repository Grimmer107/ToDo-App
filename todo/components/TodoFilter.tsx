import React from 'react';

interface Props {
    filter?: string | number | readonly string[],
    setFilter: Function,
    options: Array<any>
}

const TodoFilter:React.FC<Props> = ({filter, setFilter, options}) => {

    const onChangeHandler = (e:React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(e.target.value)
    }

    let content = options.map(option => {
        return (<option key={option} className='hover:bg-item' value={option} >{option}</option>)
    })

    return (
        <div className='flex relative'>
            <select defaultValue={filter} onChange={(e) => onChangeHandler(e)} className='bg-primary outline-none text-gray-400 border-none text-sm py-2 px-4 mt-0.5 ml-2 rounded-lg'>
                {content}
            </select>
        </div>
    );
};

export default TodoFilter;