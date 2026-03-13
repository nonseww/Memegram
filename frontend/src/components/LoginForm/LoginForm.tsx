import classes from "./LoginForm.module.scss";
import { useState } from "react";

export const LoginForm = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  return (
    <div>
      <form>
        <h2>{isLogin ? " Регистрация" : "Авторизация"}</h2>
        <fieldset>
          <input type="text" placeholder="Username" />
          {!isLogin && <input type="text" placeholder="Имя Фамилия" />}
          {!isLogin && <input type="email" placeholder="Почта" />}
          <input type="password" placeholder="Пароль" />

          <div>
            <span></span>
            <span>
              Я принимаю <a>условия пользования</a>
            </span>
          </div>

          <span onClick={() => setIsLogin((prev) => !prev)}>
            {isLogin ? "Уже есть аккаунт?" : "Нет аккаунта?"}
          </span>
          <button type="submit">Войти</button>
        </fieldset>
      </form>
    </div>
  );
};
