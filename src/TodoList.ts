import { ITodo } from "./ITodo"
import { jsx } from "./Utils"
import { TodoItem } from "./TodoItem"
import { DoneTodoList } from "./DoneTodoList"

export function TodoList(todos: ITodo[]): string {
  const doneTodos: ITodo[] = todos.filter((t) => t.isDone)
  const doneCount = doneTodos.length
  return jsx`
    <section>
        ${todos.filter((t) => !t.isDone).map((t) => TodoItem(t))}
    </section>
    ${doneCount > 0 && DoneTodoList(doneTodos)}
    `
}
