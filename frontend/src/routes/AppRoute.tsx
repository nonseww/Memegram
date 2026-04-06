import { Loader } from "@/ui/Loader";
import { AuthWrapper } from "@/wrappers/AuthWrapper";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { UnprotectedRoute } from "./UnprotectedRoute";
import { MainLayout } from "@/layouts/MainLayout";
import { ProtectedRoute } from "./ProtectedRoute";

import { Login } from "@/pages/Login";
import { Main } from "@/pages/Main";

const Profile = lazy(() =>
  import("@/pages/Profile").then((m) => ({ default: m.Profile })),
);
const ProfileEditPage = lazy(() =>
  import("@/pages/ProfileEditPage").then((m) => ({
    default: m.ProfileEditPage,
  })),
);
const Posts = lazy(() =>
  import("@/pages/Posts").then((m) => ({ default: m.Posts })),
);
const NotFound = lazy(() =>
  import("@/pages/NotFound").then((m) => ({ default: m.NotFound })),
);
const NewPost = lazy(() =>
  import("@/pages/NewPost").then((m) => ({ default: m.NewPost })),
);
const UpsertPost = lazy(() =>
  import("@/components/UpsertPost").then((m) => ({ default: m.UpsertPost })),
);

export const AppRoute = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<AuthWrapper />}>
          <Route element={<UnprotectedRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>

          <Route element={<MainLayout />}>
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Main />} />
              <Route path="/post/:postId" element={<Main />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile-edit" element={<ProfileEditPage />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/new-post" element={<NewPost />} />
              <Route path="/edit-post/:id" element={<UpsertPost />} />
              <Route path="/profile/:username" element={<Profile />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
