import { jsx } from "./Utils"

export function Index() {
  return jsx`
<html lang="en" data-theme="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://unpkg.com/htmx.org@1.9.5"></script>
    <script src="https://unpkg.com/hyperscript.org@0.9.11"></script>
    <script src="https://unpkg.com/htmx.org/dist/ext/json-enc.js"></script>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.min.css"
    />
    <title>Bun Todo</title>
  </head>

  <body>
    <header class="container">
        <h1>ToDo in Bun 1.0</h1>
    </header>

    <main class="container">
      <form
        hx-post="/todos"
        hx-target="#todos"
        hx-ext="json-enc"
        _="on submit target.reset()"
        
      >
        <input
          id="todo"
          name="todo"
          type="text"
          aria-label="Create Bun Todo"
          placeholder="Enter ToDo"
          autofocus
          
          _="on keyup 
             if (value of me) != '' 
                remove @disabled from #submit-button 
             else add @disabled to #submit-button
             "          
        />
        <button id="submit-button" type="submit" disabled>Add</button>
      </form>
      <div>
        <span id="todo-count" hx-trigger="load,newTodoCount from:body" hx-get="/todo-count"></span>
      </div>
      <hr />
      <section id="todos" hx-get="/todos" hx-trigger="load, refreshList from:body"></section>
    </main>
  </body>
</html>
    `
}
