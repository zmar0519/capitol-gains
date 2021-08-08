import React, { useState } from "react";
import "../Create.css";

// Components
import FollowingForm from "./FollowingForm";
import CreateFollowingHeader from "./CreatePostHeader";

const CreateFollowing = (props) => {
  return (
    <>
      <CreateFollowingHeader></CreateFollowingHeader>
      <FollowingForm></FollowingForm>
    </>
  );
};

export default CreateFollowing;
