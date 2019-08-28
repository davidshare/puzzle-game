import './scss/styles.scss'
import todos from './todos'

setTimeout(()=>{
	alert(todos.todo1.title, todos.todo1.description)
}, 3000)
