import { UserProfile } from "@/components/UserProfile";
import { useTypedDispatch, useTypedSelector } from "@/store/hooks";
import { toProfileView } from "@/utils/transformers";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  clearProfile,
  fetchProfileByUsernameThunk,
  toggleFollowThunk,
  updateProfileThunk,
} from "@/store/slices/profileSlice";
import { Loader } from "@/ui/Loader";
import type { UpdateProfileDto } from "@/types/profileDto";

export const Profile = () => {
  const { username } = useParams();
  const dispatch = useTypedDispatch();
  const { user: currentUser } = useTypedSelector((state) => state.auth);
  const { profile, isSubmitLoading, isInitLoading } = useTypedSelector(
    (state) => state.profile,
  );
  const profileUsername = username || currentUser?.username;
  const isOwnProfile = currentUser?.username === profileUsername;

  useEffect(() => {
    if (profileUsername) {
      dispatch(fetchProfileByUsernameThunk(profileUsername));
    }
    return () => {
      dispatch(clearProfile());
    };
  }, [profileUsername, dispatch]);

  if (isInitLoading) {
    return <Loader />;
  }
  if (!profile) return null;

  const userData = toProfileView(profile, isOwnProfile);
  console.log("userData", userData);

  const handleFollow = async () => {
    await dispatch(toggleFollowThunk(profile.id));
  };

  const handleUpdate = async (dto: UpdateProfileDto) => {
    await dispatch(updateProfileThunk(dto));
  };

  return (
    <UserProfile
      userData={userData}
      isSubmitLoading={isSubmitLoading}
      onFollow={handleFollow}
      onUpdate={handleUpdate}
    />
  );
};
