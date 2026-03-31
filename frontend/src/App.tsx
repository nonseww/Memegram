import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { MainLayout } from "./layouts/MainLayout";
import { ThemeProvider } from "./services/ThemeProvider";
import { Loader } from "./ui/Loader";
import "./styles/_fonts.scss";
import { UpsertPost } from "./components/UpsertPost";

const Main = lazy(() =>
  import("./pages/Main").then((module) => ({ default: module.Main })),
);
const Profile = lazy(() =>
  import("./pages/Profile").then((module) => ({ default: module.Profile })),
);
const ProfileEditPage = lazy(() =>
  import("./pages/ProfileEditPage").then((module) => ({
    default: module.ProfileEditPage,
  })),
);
const Login = lazy(() =>
  import("./pages/Login").then((module) => ({ default: module.Login })),
);
const Posts = lazy(() =>
  import("./pages/Posts").then((module) => ({ default: module.Posts })),
);
const NotFound = lazy(() =>
  import("./pages/NotFound").then((module) => ({ default: module.NotFound })),
);
const NewPost = lazy(() =>
  import("./pages/NewPost").then((module) => ({ default: module.NewPost })),
);

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Main />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile-edit" element={<ProfileEditPage />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/new-post" element={<NewPost />} />
              <Route path="/edit-post/:id" element={<UpsertPost />} />
              <Route path="/profile/:username" element={<Profile />} />
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
