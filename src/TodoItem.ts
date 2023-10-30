import { ITodo } from "./ITodo"
import { jsx } from "./Utils"

export function TodoItem(todo: ITodo): string {
  return jsx`
<div id="todo_item_${todo.id}">
    <input 
        id="todo_${todo.id}"
        hx-post="/todo"
        type="checkbox"
        hx-target="#todo_item_${todo.id}"
        hx-trigger="click"    
        hx-swap="outerHTML"    
        hx-include="[name='todo_${todo.id}']"
        ${todo.isDone && "checked"}
        /> 
        <input type="hidden" name="todo_${todo.id}" value="${
          todo.isDone ? "checked" : "unchecked"
        }"/>
    ${todo.isDone && "<s>"}${todo.content}${todo.isDone && "</s>"}
    &nbsp;<a hx-delete="/todo" hx-include="[name='todo_${todo.id}']">X</a>
</div>`
}
