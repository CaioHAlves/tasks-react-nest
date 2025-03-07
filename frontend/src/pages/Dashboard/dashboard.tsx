import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { CircularProgress } from '@mui/material'
import './styles.css'
import { ButtonDelete } from '../../components/ButtonDelete';
import { FieldNewTask } from '../../components/FieldNewTask';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRedux } from '../../hooks/useRedux';
import { setTask } from '../../redux/modules/tasks';
import { ButtonEdit } from '../../components/ButtonEdit';

export const Dashboard = () => {

  const navigate = useNavigate();
  const { dispatch, reduxState: { tasks, user },  } = useRedux()

  const [loading, setLoading] = useState(true);

  console.log(user)

  useEffect(() => {
    axios.get('http://localhost:3001/tasks', {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then(res => {
        dispatch(setTask(res.data))
      })
      .catch(() => {
        console.log('Erro ao obter tarefas para usuário.');
      }).finally(() => setLoading(false))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.token])

  const logout = () => {
    localStorage.clear();
    navigate("/")
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="user-logout">
          <span>{user?.email}</span>
          <button onClick={logout}><PowerSettingsNewIcon /></button>
        </div>
      </header>
      <div className='content'>
        <FieldNewTask />
        <ol>
          {loading ? <CircularProgress /> : tasks.items.map((item) => (
            <li key={item.id} className='itens-tasks'>
              {item.title}
              <div className='list-actions'>
                <ButtonDelete taskId={item.id} taskName={item.title} />
                <ButtonEdit completed={item.completed} taskId={item.id} taskName={item.title} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
