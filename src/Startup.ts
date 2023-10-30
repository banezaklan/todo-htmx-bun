import { Elysia } from "elysia"
import { html } from "@elysiajs/html"
import { TodoList } from "./TodoList"
import { ITodo } from "./ITodo"
import { Index } from "./Index"
import { TodoItem } from "./TodoItem"
import { jsx } from "./Utils"

let todos: ITodo[] = []
let doneListOpen: boolean = false
// const httpsServeConfig = {
//   serve: {
//     tls: {
//       key: Bun.file("/etc/ssl/private/bane-selfsigned.key"),
//       cert: Bun.file("/etc/ssl/certs/bane-selfsigned.crt")
//     }
//   }
// }
//const app = new Elysia(httpsServeConfig)
const app = new Elysia()
  .use(html())
  .get("/", () => {
    return Index()
  })
  .get("/todos", () => {
    todos.sort(function (x, y) {
      return Number(x.isDone) - Number(y.isDone)
    })
    return TodoList(todos)
  })
  .get("todo-count", () => {
    const doneCount = todos.filter((t) => !t.isDone).length
    return jsx`${doneCount > 0 && `${doneCount} To do`}`
  })
  .get("done-count", () => {
    return jsx`${todos.filter((t) => t.isDone).length}`
  })
  .post("/todos", ({ body, set }) => {
    const { todo } = body
    if (todo) {
      todos.push({
        id: todos.length + 1,
        content: todo,
        isDone: false
      })
      set.headers["HX-Trigger"] = JSON.stringify({
        newTodoCount: true
      })
    }
    return TodoList(todos)
  })
  .post("/todo", ({ body, set }) => {
    let todo: ITodo = { id: 0, content: "", isDone: false }
    Object.entries(body).forEach(([key, value]) => {
      let todoId = key.split("_")[1] as unknown as number
      todo = todos.find((t) => t.id == todoId) as ITodo
      if (todo !== undefined) {
        todo.isDone = value == "unchecked"
      }
    })
    set.headers["HX-Trigger"] = JSON.stringify({
      newTodoCount: true,
      refreshList: true
    })

    return TodoItem(todo)
  })
  .delete("/todo", ({ body, set }) => {
    let todo: ITodo = { id: 0, content: "", isDone: false }
    Object.entries(body).forEach(([key, value]) => {
      let todoId = key.split("_")[1] as unknown as number
      todos = todos.filter((t, index) => t.id != todoId)
    })
    set.headers["HX-Trigger"] = JSON.stringify({
      newTodoCount: true,
      refreshList: true
    })
  })
  .post("/clear-all-done", ({ body, set }) => {
    todos = todos.filter((t) => !t.isDone)
    return ""
  })
  .listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
