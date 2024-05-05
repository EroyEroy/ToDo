import React, { useEffect, useState } from "react";
import Todo, { TodoProps } from "./components/todo.tsx";

function App() {
  const [todos, setTodos] = useState<TodoProps[]>(() => {
    const todos = localStorage.getItem("todos");
    return todos ? JSON.parse(todos) : [];
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const todo = formData.get("todo") as string;

    if (!todo || todo.trim() === "") return;
    setTodos([...todos, { id: new Date().valueOf(), status: false, text: todo }]);
    e.currentTarget.reset();
  }; // отправка формы

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  }; // удалить задачу

  const changeStatus = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, status: !todo.status };
        }
        return todo;
      })
    );
  }; // изменить статус задачи

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <main className="main">
        <section className="todos">
          <div className="container">
            <div className="todos__inner">
              <h1 className="title">ToDo App!</h1>
              <form className="todos__form" method="post" noValidate autoComplete="off" onSubmit={onSubmit}>
                <div className="myInput todos__input">
                  <input type="text" placeholder="What needs to be done? :)" name="todo" />
                </div>
                <button className="button" type="submit">ОК</button>
              </form>
              {todos.map((todo, index) =>
                <Todo
                  key={index}
                  removeTodo={() => removeTodo(todo.id)}
                  changeStatus={() => changeStatus(todo.id)}
                  {...todo}
                />
              ).reverse()}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default App;