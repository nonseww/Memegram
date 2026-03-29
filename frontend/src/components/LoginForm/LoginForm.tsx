import classes from "./LoginForm.module.scss";
import { Button } from "@/ui/Button";
import type { formData } from "@/types/formData";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";

export const LoginForm = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: "",
      agreement: false,
    },
  });
  const handleClickShowPassword = () => setShowPassword((show) => !show);

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
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">@</InputAdornment>
                    ),
                  },
                }}
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
                type={showPassword ? "text" : "password"}
                error={!!errors.password}
                helperText={errors.password?.message}
                fullWidth
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            )}
          />
        </Box>

        <Box className={classes.bottomContainer}>
          {isLogin && (
            <Controller
              name="agreement"
              control={control}
              rules={{ required: "Необходимо принять условия" }}
              render={({ field }) => (
                <FormControlLabel
                  {...field}
                  control={
                    <Checkbox
                      size="small"
                      checked={!!field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  }
                  label={
                    <Typography
                      variant="body2"
                      color={errors.agreement ? "error" : "textPlain"}
                    >
                      Я принимаю{" "}
                      <Link className={classes.aSpan} href="#">
                        условия пользования
                      </Link>
                    </Typography>
                  }
                  sx={{ ml: 0 }}
                />
              )}
            />
          )}

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
