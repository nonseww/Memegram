import type { UserProfileView } from "@/utils/transformers";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { InfoList } from "./components/InfoList";
import { useProfileForm } from "./hooks/useProfileForm";
import { ProfileHeader } from "./components/ProfileHeader";
import { ProfileActions } from "./components/ProfileActions";
import { ProfileAbout } from "./components/ProfileAbout";
import type { UpdateProfileDto } from "@/types/profileDto";

interface UserProfileProps {
  userData: UserProfileView;
  isSubmitLoading: boolean;
  onFollow: () => void;
  onUpdate: (dto: UpdateProfileDto) => Promise<void>;
}

export const UserProfile = ({
  userData,
  isSubmitLoading,
  onFollow,
  onUpdate,
}: UserProfileProps) => {
  const {
    isEditing,
    name,
    setName,
    about,
    setAbout,
    avatar,
    cover,
    avatarInputRef,
    coverInputRef,
    handleEdit,
    handleCancel,
    handleSave,
    handleAvatarChange,
    handleCoverChange,
  } = useProfileForm(userData, onUpdate);

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
        ref={coverInputRef}
        accept="image/*"
        onChange={handleCoverChange}
      />

      <Stack sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <ProfileHeader
          coverUrl={cover}
          avatarUrl={avatar}
          name={name}
          username={userData.username}
          isEditing={isEditing}
          isOwnProfile={userData.isOwnProfile ?? false}
          onEdit={handleEdit}
          onNameChange={setName}
          onBgClick={() => coverInputRef.current?.click()}
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
