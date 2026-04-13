import type { UserProfileView } from "@/utils/transformers";
import { useRef, useState } from "react";

export const useProfileForm = (initData: UserProfileView) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [name, setName] = useState<string>(initData.name);
  const [about, setAbout] = useState<string>(initData.aboutText);
  const [avatar, setAvatar] = useState<string>(initData.avatarUrl);
  const [bg, setBg] = useState<string>(initData.imageUrl);

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bgInputRef = useRef<HTMLInputElement>(null);

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false);
  const handleCancel = () => {
    setIsEditing(false);
    setName(initData.name);
    setAbout(initData.aboutText);
    setAvatar(initData.avatarUrl);
    setBg(initData.imageUrl);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setAvatar(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleBgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setBg(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return {
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
  };
};
