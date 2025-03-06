import { useTasks } from '../../hooks/useTasks';
import useAuth from '../../hooks/useAuth';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { CircularProgress } from '@mui/material'
import './styles.css'
import { ButtonDelete } from '../../components/ButtonDelete';
import { FieldNewTask } from '../../components/FieldNewTask';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {

  const navigate = useNavigate();
  const { tasks, loading } = useTasks();
  const { user } = useAuth();

  const logout = () => {
    localStorage.clear();
    navigate("/")
  }

  console.log(loading)

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
          {loading ? <CircularProgress /> : tasks.map((item) => (
            <li key={item.id} className='itens-tasks'>
              {item.title}
              <div className='list-actions'>
                <ButtonDelete taskId={item.id} taskName={item.title}/>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
