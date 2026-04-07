import type { UserProfile as UserProfileInterface } from "@/types/userData";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { InfoList } from "./components/InfoList";
import { useProfileForm } from "./hooks/useProfileForm";
import { ProfileHeader } from "./components/ProfileHeader";
import { ProfileActions } from "./components/ProfileActions";
import { ProfileAbout } from "./components/ProfileAbout";

interface UserProfileProps {
  userData: UserProfileInterface;
}

export const UserProfile = ({ userData }: UserProfileProps) => {
  const {
    isEditing,
    name,
    setName,
    about,
    setAbout,
    avatar,
    bg,
    avatarInputRef,
    bgInputRef,
    handleEdit,
    handleCancel,
    handleSave,
    handleAvatarChange,
    handleBgChange,
  } = useProfileForm(userData);

  return (
    <Paper
      elevation={3}
      sx={{
        p: 1,
        borderRadius: 4,
        position: "relative",
        width: { lg: "70dvw" },
        maxWidth: "1100px",
        mx: { lg: "auto" },
      }}
    >
      <input
        type="file"
        hidden
        ref={avatarInputRef}
        accept="image/*"
        onChange={handleAvatarChange}
      />
      <input
        type="file"
        hidden
        ref={bgInputRef}
        accept="image/*"
        onChange={handleBgChange}
      />

      <Stack sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <ProfileHeader
          bgUrl={bg}
          avatarUrl={avatar}
          name={name}
          username={userData.username}
          isEditing={isEditing}
          isOwnProfile={userData.isOwnProfile ?? false}
          onEdit={handleEdit}
          onNameChange={setName}
          onBgClick={() => bgInputRef.current?.click()}
          onAvatarClick={() => avatarInputRef.current?.click()}
        />

        <ProfileAbout
          about={about}
          isEditing={isEditing}
          onAboutChange={setAbout}
        />
      </Stack>

      <Stack>
        <InfoList
          labels={{
            posts: `${userData.postsCount} постов`,
            followers: `${userData.followersCount} подписчиков`,
            followings: `${userData.followingsCount} подписок`,
          }}
        />

        {isEditing && (
          <ProfileActions onCancel={handleCancel} onSave={handleSave} />
        )}
      </Stack>
    </Paper>
  );
};
