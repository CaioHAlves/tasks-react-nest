import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

type User = {
  id: number;
  email: string;
};

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      try {
        
        const decodedToken = jwtDecode<User>(token);
        if (decodedToken) {
          setUser({
            id: decodedToken.id,
            email: decodedToken.email,
          });
        }
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [token]);

  return { user };
};

export default useAuth;
