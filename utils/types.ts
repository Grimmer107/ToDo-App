export interface ResponseFuncs {
    GET?: Function
    POST?: Function
    PUT?: Function
    DELETE?: Function
    PATCH?: Function
}
  
export interface Todo {
    _id?: string
    task: string
    completed: boolean
}

export interface List {
    _id?: string,
    name: string,
    status: string,
    todos: Todo[]
}

export interface User {
    _id: string,
    email: string,
    password: string, 
    lists: List[]
}