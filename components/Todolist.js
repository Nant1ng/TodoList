import { db } from "@/firebase";
import { addDoc, collection, getDocs, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

import styled from "styled-components";

const Title = styled.h1`
  color: #6b0a7f;
`;

const TodoTitle = styled.h3`
  color: #6b0a7f;
`;

function Todolist() {
  const [todoTitle, setTodoTitle] = useState("");
  const [todos, setTodos] = useState([]);

  const submitHandler = async () => {
    await addDoc(collection(db, "todo"), {
      title: todoTitle,
    });
    setTodoTitle("");
  };

  useEffect(() => {
    async function getTodos() {
      const todos = (await getDocs(collection(db, "todo"))).docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });
      setTodos(todos);
    }
    getTodos();
  }, [db]);

  return (
    <div>
      <Title>Todo List</Title>
      <div>
        <input
          placeholder="Todo"
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
        />
        <button onClick={submitHandler}>Submit</button>
      </div>
      <div>
        {todos.map((todo) => {
          return (
            <div key={todo.id}>
              <TodoTitle>{todo.title}</TodoTitle>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Todolist;
