import { ITodo } from "./ITodo"
import { jsx } from "./Utils"
import { TodoItem } from "./TodoItem"

export function DoneTodoList(doneTodos: ITodo[]): string {
  const doneCount = doneTodos.length
  return jsx`
    <section id="done-list">
        <details>
            <summary>
                ${doneCount} Done :-)
            </summary>
            <section>
                ${doneTodos.filter((t) => t.isDone).map((t) => TodoItem(t))}
            </section>
            <section>
                <button hx-post="/clear-all-done" hx-target="#done-list">Clear All Done</button>
            </section>                   
        </details>
    <section>`
}
