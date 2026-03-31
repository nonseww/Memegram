import { UserProfile } from "@/components/UserProfile";
import type { UserProfile as UserProfileInterface } from "@/types/userData";
import { MOCK_POSTS } from "@/utils/mockPosts";
import { useParams } from "react-router-dom";

const mockUserData: UserProfileInterface = {
  id: 1,
  name: "Инна Политучая",
  username: "sus_nonseww",
  postsCount: 42,
  followersCount: 1250,
  followingsCount: 380,
  imageUrl: "/src/assets/photo_5258499396356215005_y.jpg",
  avatarUrl: "/src/assets/photo_5337133057770722354_y.jpg",
  aboutText: "I’m trying to do interesting posts and funny memes, okay?",
  isOwnProfile: true,
};

export const Profile = () => {
  const { id } = useParams();
  const isMe = !id || +id === 1;

  return (
    <>
      <UserProfile userData={mockUserData} />
    </>
  );
};
