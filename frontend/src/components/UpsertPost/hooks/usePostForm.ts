import { useLocation, useNavigate } from "react-router-dom";
import type { UpsertPost as UpsertPostInterface } from "@/types/upsertPost";
import { useTypedDispatch } from "@/store/hooks";
import { useState } from "react";
import { createPostThunk, updatePostThunk } from "@/store/slices/postsSlice";

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
  const isEditing = !!postFromState?.id;

  const handleSave = async () => {
    try {
      const dto = { title, description, image_url: meme };
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
  };
};
