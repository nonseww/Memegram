interface FormData {
  username: string;
  name?: string;
  email?: string;
  password: string;
}

interface FormErrors {
  username: string;
  name: string;
  email: string;
  password: string;
}

interface ValidateProps {
  data: FormData;
  setErrors: (errors: FormErrors) => void;
  isLogin: boolean;
}

export const validate = ({ data, setErrors, isLogin }: ValidateProps) => {
  let tempErrors = { username: "", name: "", email: "", password: "" };

  if (!data.username.trim()) tempErrors.username = "Введите юзернейм";

  if (!isLogin && !data.name?.trim()) tempErrors.name = "Введите имя и фамилию";

  if (!isLogin) {
    if (!data.email?.trim()) tempErrors.email = "Введите почту";
    else if (!/\S+@\S+\.\S+/.test(data.email))
      tempErrors.email = "Некорректная почта";
  }

  if (!data.password) tempErrors.password = "Введите пароль";
  else if (data.password.length < 6) {
    tempErrors.password = "Минимум 6 символов";
  }

  setErrors(tempErrors);
  return Object.values(tempErrors).every((x) => x == "");
};
