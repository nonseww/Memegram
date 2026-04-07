import classes from "./LoginForm.module.scss";
import { Button } from "@/ui/Button";
import type { FormData } from "@/types/formData";
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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTypedDispatch, useTypedSelector } from "@/store/hooks";
import {
  clearError,
  loginThunk,
  registerThunk,
} from "@/store/slices/authSlice";

export const LoginForm = () => {
  const [isRegister, setIsRegister] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useTypedDispatch();
  const { isSubmitLoading, error } = useTypedSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: "",
      agreement: false,
    },
  });

  useEffect(() => {
    dispatch(clearError());
    reset();
  }, [isRegister, dispatch]);

  useEffect(() => {
    console.log("LoginForm MOUNTED");
    return () => console.log("LoginForm UNMOUNTED");
  }, []);

  useEffect(() => {
    console.log("isRegister changed:", isRegister);
  }, [isRegister]);

  const onSubmit = async (data: FormData) => {
    try {
      if (isRegister) {
        await dispatch(
          registerThunk({
            username: data.username || "",
            name: data.name || "",
            email: data.email,
            password: data.password,
          }),
        ).unwrap();
      } else {
        await dispatch(
          loginThunk({
            email: data.email,
            password: data.password,
          }),
        ).unwrap();

        navigate("/");
      }
    } catch (error) {
      console.error("Auth error: ", error);
    }
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
          {isRegister ? "Регистрация" : "Авторизация"}
        </Typography>

        <Box className={classes.fieldset}>
          {isRegister && (
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
          )}
          {isRegister && (
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
          )}
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
          {isRegister && (
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
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "Уже есть аккаунт?" : "Нет аккаунта?"}
          </Typography>

          {error && (
            <Typography color="error" maxWidth="60vw" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <Button
            text={isRegister ? "Создать" : "Войти"}
            type="submit"
            className={classes.submitButton}
            disabled={isSubmitLoading}
          />
        </Box>
      </Box>
    </Box>
  );
};
