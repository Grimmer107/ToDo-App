import React, {useState} from 'react';
import Head from 'next/head';
import useSWR from 'swr';
import TodoList from '@/components/todoList';
import TodoCreate from '@/components/TodoCreate';
import TodoFilter from '@/components/TodoFilter';
import TodoSearch from '@/components/TodoSearch';
import getTodosValidate from '@/Schema/getTodos';

export default function Home() {

  const fetcher = (...args:any) => fetch(args).then(res => res.json())
  const { data, error, isLoading } = useSWR(process.env.API_URL, fetcher)
  const [ filter, setFilter ] = useState("None")
  const [ search, setSearch ] = useState("")

  const valid = getTodosValidate(data)
  if (!valid) {
      console.log("GetTodosValidateError", getTodosValidate.errors)
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
        <TodoCreate />
        <div className='w-5/6 px-3 flex justify-between m-auto mt-2'>
          <TodoSearch search={search} setSearch={setSearch}/>
          <TodoFilter filter={filter} setFilter={setFilter}/>
        </div>
        <div className='mt-2 h-5/6'>
          <TodoList data={data} error={error} isLoading={isLoading} filter={filter} search={search}/>
        </div>
      </div>
    </div>
  )
}
