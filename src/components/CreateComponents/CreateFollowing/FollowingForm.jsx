import React, { useState } from "react";
import "../Create.css";
import TextField from "@material-ui/core/TextField";

// import CommentEditor from "../../Code/CommentEditor";

const FollowingForm = (props) => {
    const [comment, setComment] = useState("")
  return (
    <div className="create-form-container">
      <form className="create-form">
        <div className="enter-name-prompt">
          <label>Enter A Senator/ Representative</label>
        </div>
        <input required autoComplete="off" placeholder="Name" name="name" />
        value={props.name}
        onChange={(e) => props.setName(e.target.value)}
        <div className="border"></div>
        <div className="comment-prompt">
          <label>Comment</label>
          <button
            type="button"
            id="plus-button"
            onClick={() => props.setToggleComment(!props.toggleComment)}
          >
            +
          </button>
        </div>

        <TextField
          value={comment}
          label="Enter your comment"
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        ); 
    
        <div className="border"></div>
        <button type="submit">Submit</button>
      </form>
    </div>
  }

export default FollowingForm;
