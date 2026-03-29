import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { MainLayout } from "./layouts/MainLayout";
import { ThemeProvider } from "./services/ThemeProvider";
import "./styles/_fonts.scss";

const Main = lazy(() =>
  import("./pages/Main").then((module) => ({ default: module.Main })),
);
const Profile = lazy(() =>
  import("./pages/Profile").then((module) => ({ default: module.Profile })),
);
const Login = lazy(() =>
  import("./pages/Login").then((module) => ({ default: module.Login })),
);
const NotFound = lazy(() =>
  import("./pages/NotFound").then((module) => ({ default: module.NotFound })),
);

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Suspense fallback={<div>Грузим...</div>}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Main />} />
              <Route path="/profile" element={<Profile />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
