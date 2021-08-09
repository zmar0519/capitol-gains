import React, { useState } from "react";
import "../Create.css";
import TextField from "@material-ui/core/TextField";


const FollowingForm = (props) => {
    const [comment, setComment] = useState("")
  return (
    <div className="create-form-container">
      <form className="create-form">
        <div className="enter-name-prompt">
          <label>Create a Watchlist</label>
        </div>
        <input required autoComplete="off" placeholder="Watchlist Name" name="name" />
        <div className="border"></div>
        <div className="comment-prompt">
          <label>Comment</label>
        </div>

        <TextField
          value={comment}
          label="Enter your comment"
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        ; 
    
        <div className="border"></div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
  }

export default FollowingForm;
