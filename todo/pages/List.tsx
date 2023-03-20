import React from 'react';
import Head from 'next/head';
import TodoListCreate from '@/components/TodoListCreate';
import useSWR from 'swr';

const TodoList = () => {

    const fetcher = (...args:any) => fetch(args).then(res => res.json())
    const { data, error, isLoading } = useSWR(process.env.API_URL, fetcher)

    if (error) {
        return <p>{error}</p>
    }

    let content:any;
    if (data) {
        content = data.map((item:any) => {
            <div className='bg-item mt-4 w-5/6 m-auto rounded-md p-4 text-gray-300 flex justify-between'>
                <p className='text-md overflow-auto ml-2'>
                    {item.name}
                </p>
            </div>
        })
    } else {
        content = isLoading
    }

    return (
        <div className='p-8'>
            <Head>
                <title>ToDo App</title>
                <meta name="description" content="Todo list App" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='bg-background p-2 m-auto w-1/2 h-screenset rounded-lg overscroll-none'>
                <TodoListCreate />
                <div className='overflow-auto h-5/6 scrollbar-thin scrollbar-thumb-primary scrollbar-track-item'>
                    {content}
                </div>
            </div>
        </div>
    );
};

export default TodoList;