import React from 'react';
import { Todo } from '@/utils/types';
import TodoItem from './TodoItem';

interface Props {
    data: Array<Todo>,
    error: String,
    isLoading: boolean, 
    filter: String, 
    search: String
}

const TodosList:React.FC<Props> = ({data, error, isLoading, filter, search}) => {

    if (error) {
        return <p>{error}</p>
    }

    let content
    if (data) {

        if (filter !== "None") {
            let filtertype = filter == "Completed" ? true : false;
            content = data.filter((item:Todo) => {
                return item.completed === filtertype
            })
        } else {
            content = [...data]
        }

        if (search !== "") {
            content = content.filter((item:Todo) => {
                return item.task === search
            })
        }

        content = content.map((item:Todo) => {
            return (<TodoItem key={item._id} {...item} />) 
        })

    } else {
        content = isLoading
    }

    return (
        <div className='overflow-auto h-5/6 scrollbar-thin scrollbar-thumb-primary scrollbar-track-item'>
          {content}
        </div>
    );
};

export default TodosList;