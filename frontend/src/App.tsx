import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Main } from "./pages/Main";
import { Header } from "./components/Header";
import { MainLayout } from "./layouts/MainLayout";

function App() {
  return (
    <>
      <Header />
      <MainLayout>
        <Main />
      </MainLayout>
    </>
    // <BrowserRouter>
    //   <nav>
    //     <Link to="/">Главная</Link>
    //   </nav>

    //   <Routes>
    //     <Route path="/" element={<Main />} />
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
