import React, {useRef, useState} from 'react';
import { Todo } from '@/utils/types';
import TodoItem from './todoItem';

interface Props {
    data: Array<Todo>,
    error: String,
    isLoading: boolean, 
    filter: String, 
    search: String
}

const TodoList:React.FC<Props> = ({data, error, isLoading, filter, search}) => {

    if (error) {
        return <p>{error}</p>
    }

    let content:any;
    if (data) {

        if (filter !== "None") {
            console.log("Filter", filter)
            let filtertype = filter == "Completed" ? true : false;
            console.log(filtertype)
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

export default TodoList;