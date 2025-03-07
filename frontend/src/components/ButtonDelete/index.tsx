import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { CircularProgress, Dialog } from '@mui/material'
import axios from 'axios';
import { useRedux } from '../../hooks/useRedux';
import { removeTask } from '../../redux/modules/tasks';
import './styles.css'

interface IProps {
  taskId: number;
  taskName?: string
}

export function ButtonDelete({ taskId, taskName }: IProps) {

  const { reduxState: { user }, dispatch } = useRedux()

  const [loading, setLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const handleDelete = () => {
    setLoading(true)
    axios.delete(`http://localhost:3001/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    })
      .then(() => {
        dispatch(removeTask(taskId))
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
      <button onClick={handleOpenModal} className='button-delete'>
        <DeleteIcon />
      </button>
      <Dialog onClose={openModal ? undefined : handleOpenModal} open={openModal}>
        <span className='info-modal-delete'>Deseja deletar esta tarefa?</span>

        {taskName ? <span>{taskName}</span> : null}

        <div className='actions-modal'>
          {loading ? <CircularProgress /> :
            <>
              <button onClick={handleOpenModal} className='cancel'>
                Não
              </button>
              <button onClick={handleDelete} className='confirm'>
                Sim
              </button>
            </>
          }
        </div>
      </Dialog>
    </>
  )
}