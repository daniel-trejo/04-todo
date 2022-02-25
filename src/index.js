import './styles.css'

//import { Todo } from './classes/todo.class'
//import { TodoList } from './classes/todo-list.class'

import { TodoList } from './classes'
import { crearTodoHtml } from './js/componentes'



export const todolist = new TodoList()

todolist.todos.forEach( crearTodoHtml );
