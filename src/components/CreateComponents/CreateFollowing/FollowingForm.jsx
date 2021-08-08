import React from "react";
import "../Create.css";

const FollowingForm = (props) => {
  return (
    <div className="create-form-container">
      <form className="create-form">
        <div className="enter-name-prompt">
          <label>Enter A Senator/ Representative</label>
        </div>
        <input
          required
          autoComplete="off"
          placeholder="Name"
          name="name"
        />

        <div className="border"></div>

        <div className="comment-prompt">
          <label>Comment</label>
          <button type="button" id="plus-button">
            +
          </button>
        </div>

        <div className="border"></div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FollowingForm;
