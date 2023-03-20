export interface ResponseFuncs {
    GET?: Function
    POST?: Function
    PUT?: Function
    DELETE?: Function
    PATCH?: Function
}
  
export interface Todo {
    _id?: number
    task: string
    completed: boolean
}

export interface List {
    id?: number,
    todos: Todo[]
}

export interface User {
    _id: number,
    email: string,
    password: string, 
    lists: List[]
}