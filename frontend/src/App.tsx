import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Main } from "./pages/Main";
import { Login } from "./pages/Login";
import { MainLayout } from "./layouts/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Main />} />
        </Route>

        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
