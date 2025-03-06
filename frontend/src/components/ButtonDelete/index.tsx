import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { CircularProgress, Dialog } from '@mui/material'
import { useTasks } from '../../hooks/useTasks';

interface IProps {
  taskId: number;
  taskName?: string
}

export function ButtonDelete({ taskId, taskName }: IProps) {

  const { deleteTask } = useTasks()

  const [loading, setLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const handleDelete = () => {
    setLoading(true)
    deleteTask(taskId)
      .then(() => {
        handleOpenModal()
      })
      .catch(() => {

      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleOpenModal = () => setOpenModal(!openModal)

  return (
    <>
      <button onClick={handleOpenModal}>
        <DeleteIcon />
      </button>
      <Dialog onClose={openModal ? undefined : handleOpenModal} open={openModal}>
        <span>Deseja deletar esta tarefa?</span>

        {taskName ? <span>{taskName}</span> : null}

        <div className='actions-modal'>
          {loading ? <CircularProgress /> :
            <>
              <button onClick={handleOpenModal}>
                Não
              </button>
              <button onClick={handleDelete}>
                Sim
              </button>
            </>
          }
        </div>
      </Dialog>
    </>
  )
}