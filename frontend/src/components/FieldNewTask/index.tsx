import axios from "axios"
import { ChangeEvent, useState } from "react"
import { useTasks } from "../../hooks/useTasks";

export function FieldNewTask() {

  const token = localStorage.getItem("token");

  const { loadingTasks } = useTasks()

  const [value, setValue] = useState("")

  const changeInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setValue(event.target.value)
  }

  const addTask = () => {
    axios.post("http://localhost:3001/tasks", {
      title: value,
      completed: false
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    )
    .then(() => {
      setValue("")
      loadingTasks()
    })
    .catch(() => {
      console.log("Erro ao criar tarefa!")
    })
  }

  return (
    <div>
      <input placeholder="Nova tarefa" value={value} onChange={changeInput}/>
      <button onClick={addTask}>
        Adicionar
      </button>
    </div>
  )
}