import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Main } from "./pages/Main";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import { MainLayout } from "./layouts/MainLayout";
import { ThemeProvider } from "./services/ThemeProvider";
import "./styles/_fonts.scss";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Main />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
