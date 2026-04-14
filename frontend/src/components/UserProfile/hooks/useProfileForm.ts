import type { UpdateProfileDto } from "@/types/profileDto";
import type { UserProfileView } from "@/utils/transformers";
import { useRef, useState } from "react";
import { commonApi } from "@/api/commonApi";

export const useProfileForm = (
  initData: UserProfileView,
  onUpdate: (dto: UpdateProfileDto) => Promise<void>,
) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [name, setName] = useState<string>(initData.name);
  const [about, setAbout] = useState<string>(initData.aboutText);
  const [avatar, setAvatar] = useState<string>(initData.avatarUrl);
  const [cover, setCover] = useState<string>(initData.coverUrl);

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setIsEditing(false);
    setName(initData.name);
    setAbout(initData.aboutText);
    setAvatar(initData.avatarUrl);
    setCover(initData.coverUrl);
  };

  const handleSave = async () => {
    let dto: UpdateProfileDto = {
      name,
      about,
    };

    try {
      if (avatarFile) {
        const avatarUrl = await commonApi.uploadImage(avatarFile);
        dto = { ...dto, avatarUrl };
      }
      if (coverFile) {
        const coverUrl = await commonApi.uploadImage(coverFile);
        dto = { ...dto, coverUrl };
      }

      await onUpdate(dto);
      setIsEditing(false);
    } catch (error: any) {
      console.error("Upload error:", error);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);

      const reader = new FileReader();
      reader.onload = () => setAvatar(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverFile(file);

      const reader = new FileReader();
      reader.onload = () => setCover(reader.result as string);
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
    cover,
    avatarInputRef,
    coverInputRef,
    handleEdit,
    handleCancel,
    handleSave,
    handleAvatarChange,
    handleCoverChange,
  };
};
