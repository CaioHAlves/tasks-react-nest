import axios from "axios"
import { ChangeEvent, useState } from "react"
import { useRedux } from "../../hooks/useRedux";
import { addTask } from "../../redux/modules/tasks";
import './styles.css';

export function FieldNewTask() {

  const { dispatch, reduxState: { user } } = useRedux()

  const [value, setValue] = useState("")

  const changeInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setValue(event.target.value)
  }

  const clickAddTask = () => {
    axios.post("http://localhost:3001/tasks", {
      title: value,
      completed: false
    },
    {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    }
    )
    .then((res) => {
      setValue("")
      dispatch(addTask(res.data))
    })
    .catch(() => {
      console.log("Erro ao criar tarefa!")
    })
  }

  return (
    <div className="field-new-task">
      <input placeholder="Nova tarefa" value={value} onChange={changeInput}/>
      <button onClick={clickAddTask}>
        Adicionar
      </button>
    </div>
  )
}