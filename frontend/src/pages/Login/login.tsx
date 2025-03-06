import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import './login.css'

type FormData = {
  email: string;
  password: string;
}

export const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const location = useLocation();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const isLogin = location.pathname == "/"
  
  const onSubmit = async (data: FormData) => {
    const url = isLogin ? "/auth/login" : "/auth/register"

    axios.post(`http://localhost:3001${url}`, data)
      .then(response => {
        if (isLogin) {
          localStorage.setItem("token", response.data.accessToken);
        }
        navigate(isLogin ? '/dashboard' : '/');
      })
      .catch(err => {
        console.log(err);
        setErrorMessage("Usuário ou senha inválidos");
      })
  };

  return (
    <div className="container">
      <h2 className="title-page">{isLogin ? "Login" : "Register"}</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="form">
        {/* E-mail */}
        <div className="form-control">
          <label>E-mail</label>
          <input
            type="email"
            {...register("email", { required: "E-mail é obrigatório" })}
          />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>

        {/* Senha */}
        <div className="form-control">
          <label>Senha</label>
          <input
            type="password"
            {...register("password", { required: "Senha é obrigatória" })}
          />
          {errors.password && <p className="error-message">{errors.password.message}</p>}
        </div>

        {/* Botão de Login */}
        <button
          type="submit"
          className="submit-button"
        >
          {isLogin ? "Entrar" : "Criar"}
        </button>
      </form>

      {/* Link para Cadastro ou Login*/}
      {isLogin ? <p className="info">
        Não tem uma conta? <a href="/register" className="text-blue-500">Cadastre-se</a>
      </p> : 
      <p className="info">
        Já tem uma conta? <a href="/" className="text-blue-500">Login</a>
      </p>}
    </div>
  );
}
