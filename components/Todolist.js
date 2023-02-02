import { db } from "@/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useState } from "react";

import styled from "styled-components";

const Title = styled.h1`
  color: #6b0a7f;
`;

function Todolist() {
  const [todoTitle, setTodoTitle] = useState("");

  const submitHandler = async () => {
    await addDoc(collection(db, "todo"), {
      title: todoTitle,
    });
    setTodoTitle("");
  };

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
    </div>
  );
}

export default Todolist;
