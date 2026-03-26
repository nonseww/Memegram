import classes from "./LoginForm.module.scss";
import { Button } from "../../ui/Button";
import type { formData } from "../../types/formData";
import {
  Box,
  Typography,
  TextField,
  Link,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import type { FormErrors } from "../../types/formErrors";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";

export const LoginForm = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    defaultValues: { username: "", name: "", email: "", password: "" },
  });

  const onSubmit = (data: formData) => {
    console.log("Готово", data);
  };

  return (
    <Box className={classes.formWrapper}>
      <div className={`${classes.circle} ${classes.circleCat}`}></div>
      <div className={`${classes.circle} ${classes.circleBigYellow}`}></div>
      <div className={`${classes.circle} ${classes.circleSmallYellow}`}></div>

      <Box
        component="form"
        className={classes.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Typography variant="h4" className={classes.title}>
          {isLogin ? "Регистрация" : "Авторизация"}
        </Typography>

        <Box className={classes.fieldset}>
          <Controller
            control={control}
            rules={{ required: "Введите юзернейм" }}
            name="username"
            render={({ field }) => (
              <TextField
                {...field}
                variant="standard"
                label="Username"
                error={!!errors.username}
                helperText={errors.username?.message}
                fullWidth
              />
            )}
          />
          {isLogin && (
            <>
              <Controller
                name="name"
                control={control}
                rules={{ required: "Введите имя и фамилию" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="standard"
                    label="Имя Фамилия"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    fullWidth
                  />
                )}
              />

              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Введите почту",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Неверный формат",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="standard"
                    label="Почта"
                    type="email"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    fullWidth
                  />
                )}
              />
            </>
          )}
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Введите пароль",
              minLength: {
                value: 6,
                message: "Минимум 6 символов",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                variant="standard"
                label="Пароль"
                type="password"
                error={!!errors.password}
                helperText={errors.password?.message}
                fullWidth
              />
            )}
          />
        </Box>

        <Box className={classes.bottomContainer}>
          <FormControlLabel
            control={<Checkbox size="small" />}
            label={
              <Typography variant="body2">
                Я принимаю{" "}
                <Link className={classes.aSpan} href="#">
                  условия пользования
                </Link>
              </Typography>
            }
            sx={{ ml: 0 }}
          />

          <Typography
            className={classes.changeLogin}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Уже есть аккаунт?" : "Нет аккаунта?"}
          </Typography>

          <Button
            text={isLogin ? "Создать" : "Войти"}
            type="submit"
            className={classes.submitButton}
          />
        </Box>
      </Box>
    </Box>
  );
};
