import { Provider } from "react-redux";
import { ThemeProvider } from "./ThemeProvider";
import { store } from "@/store/store";
import { BrowserRouter } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};
