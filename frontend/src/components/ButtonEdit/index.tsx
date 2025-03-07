import { useState } from "react";
import { useRedux } from "../../hooks/useRedux";
import { CircularProgress, Dialog } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useForm } from "react-hook-form";
import axios from "axios";
import { updateTask } from "../../redux/modules/tasks";
import './styles.css';

interface IProps {
  taskId: number;
  taskName: string;
  completed: boolean;
}

export function ButtonEdit({ taskId, completed, taskName }: IProps) {
  const { dispatch, reduxState: { user } } = useRedux();
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<{ taskName: string; completed: boolean }>({
    defaultValues: { taskName, completed },
  });

  const handleOpenModal = () => {
    setOpenModal(!openModal);
    setValue("taskName", taskName);
    setValue("completed", completed);
  };

  const onSubmit = (data: { taskName: string; completed: boolean }) => {
    setLoading(true)
    axios.patch(`http://localhost:3001/tasks/${taskId}`, {
      title: data.taskName,
      completed: data.completed
    }, {
      headers: { Authorization: `Bearer ${user.token}` }
    })
      .then(() => {
        dispatch(updateTask({ completed: data.completed, id: taskId, title: data.taskName }));
        setOpenModal(!openModal);
      })
      .catch(() => {
        console.log('erro ao deletar tarefa')
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <button onClick={handleOpenModal} className="button-edit">
        <EditIcon />
      </button>
      <Dialog onClose={loading ? undefined : handleOpenModal} open={openModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="field">
            <label>Nome</label>
            <input {...register("taskName", { required: "Informe um nome para continuar" })} className="name" type="text"/>
            {errors.taskName && <span>{errors.taskName.message}</span>}
          </div>
          
          <div className="field">
            <label>Completa</label>
            <input type="checkbox" {...register("completed")} />
          </div>

          <div className="actions-modal">
            {loading ? (
              <CircularProgress />
            ) : (
              <>
                <button type="button" onClick={handleOpenModal}>
                  Cancelar
                </button>
                <button type="submit">
                  Confirmar
                </button>
              </>
            )}
          </div>
        </form>
      </Dialog>
    </>
  );
}
