import { Todo } from "../classes"
import { todolist } from '../index'

const divTdodList = document.querySelector('.todo-list')
const txtInput    = document.querySelector('.new-todo')
const btnBorrar   = document.querySelector('.clear-completed')
const ulFiltros   = document.querySelector('.filters')
const filtros     = document.querySelectorAll('.filtro')

export const crearTodoHtml = (todo) => {
  const htmlTodo = `
    <li class="${todo.completado ? 'completed' : ''}" data-id="${ todo.id }">
    <div class="view">
      <input class="toggle" type="checkbox" ${ todo.completado ? 'checked': '' }>
      <label>${todo.tarea}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
  </li> 
  `
  const div = document.createElement('div')
  div.innerHTML = htmlTodo

  divTdodList.append( div.firstElementChild )

  return div.firstElementChild
}

// Eventos

txtInput.addEventListener('keyup', (event)=>{

  if (event.keyCode === 13 && txtInput.value.length > 0){
    const todo = new Todo( txtInput.value )
    todolist.nuevoTodo( todo )
    crearTodoHtml(todo)
    txtInput.value = ''
  }

})

divTdodList.addEventListener('click', (event) => {

  const nombreElemento = event.target.localName // Input label o boton
  const todoElemento   = event.target.parentElement.parentElement
  const todoId         = todoElemento.getAttribute('data-id')
  
  if ( nombreElemento.includes('input') ){
    todolist.marcarCompletado(todoId)
    todoElemento.classList.toggle('completed')
  }else if ( nombreElemento.includes('button') ){
    todolist.eliminarTodo( todoId )
    divTdodList.removeChild(todoElemento)
  }

})

btnBorrar.addEventListener('click', (event)=> {
  todolist.eliminarCompletados()
  for (let i = divTdodList.children.length-1; i >= 0; i-- ){
    const elemento = divTdodList.children[i]
    if (elemento.classList.contains('completed')){
      divTdodList.removeChild(elemento)
    }
  }
})


ulFiltros.addEventListener('click', (event)=>{
  const filtro = event.target.text

  if (!filtro) return

  filtros.forEach(element => {
    element.classList.remove('selected')
  });
  event.target.classList.add('selected')
  

  for (const elemento of divTdodList.children) {
    elemento.classList.remove('hidden')
    const completado = elemento.classList.contains('completed')

    switch (filtro) {
      case 'Pendientes':
          if ( completado ){
            elemento.classList.add('hidden')
          }
        break;
      case 'Completados':
        if ( !completado ){
          elemento.classList.add('hidden')
        }
      break
      default:
        break;
    }

  }

})