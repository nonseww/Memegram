import { ProfileEdit } from "@/components/ProfileEdit";
import type { UserProfileView } from "@/utils/transformers";

const mockUserData: UserProfileView = {
  id: 1,
  name: "Инна Политучая",
  username: "sus_nonseww",
  postsCount: 42,
  followersCount: 1250,
  followingsCount: 380,
  imageUrl: "/src/assets/photo_5258499396356215005_y.jpg",
  avatarUrl: "/src/assets/photo_5337133057770722354_y.jpg",
  aboutText: "I’m trying to do interesting posts and funny memes, okay?",
  isFollowing: false,
  isOwnProfile: true,
};

export const ProfileEditPage = () => {
  return (
    <>
      <ProfileEdit userData={mockUserData} />
    </>
  );
};
