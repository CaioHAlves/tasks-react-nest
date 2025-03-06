/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Task {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
}

export const useTasks = () => {
  const token = localStorage.getItem("token");

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadingTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:3001/tasks', {
        headers: {
          Authorization: `Bearer ${token}`,
        }, 
      });
      setTasks(res.data);
    } catch {
      setError('Erro ao obter tarefas para usuário.');
    } finally {
      setTimeout(() => setLoading(false), 100);
    }
  };

  useEffect(() => {
    loadingTasks()
  }, [])

  const deleteTask = async (id: number) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:3001/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      loadingTasks();
    } catch {
      console.error('Erro ao excluir tarefa.');
    }
  };

  return { tasks, loading, error, deleteTask, loadingTasks };
};
