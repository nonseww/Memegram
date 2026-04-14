import { useLocation, useNavigate } from "react-router-dom";
import type { UpsertPost as UpsertPostInterface } from "@/types/upsertPost";
import { useTypedDispatch } from "@/store/hooks";
import { useState } from "react";
import { createPostThunk, updatePostThunk } from "@/store/slices/postsSlice";
import { postsApi } from "@/api/postsApi";
import { commonApi } from "@/api/commonApi";

export const usePostForm = () => {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const location = useLocation();
  const postFromState: UpsertPostInterface = location.state?.post;
  const [title, setTitle] = useState<string>(postFromState?.title || "");
  const [description, setDescription] = useState<string>(
    postFromState?.description || "",
  );
  const [meme, setMeme] = useState<string>(postFromState?.meme || "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const isEditing = !!postFromState?.id;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);

      const reader = new FileReader();
      reader.onload = () => setMeme(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      let imageUrl = meme;

      if (imageFile) {
        imageUrl = await commonApi.uploadImage(imageFile);
      }

      const dto = { title, description, image_url: imageUrl };
      if (isEditing) {
        await dispatch(
          updatePostThunk({ dto, id: postFromState.id! }),
        ).unwrap();
      } else {
        await dispatch(createPostThunk(dto)).unwrap();
      }
      navigate(-1);
    } catch (error: any) {
      console.error("Save error:", error);
    }
  };

  return {
    navigate,
    title,
    setTitle,
    description,
    setDescription,
    meme,
    setMeme,
    handleSave,
    isEditing,
    handleFileChange,
  };
};
