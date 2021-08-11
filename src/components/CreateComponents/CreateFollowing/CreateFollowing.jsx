import React, { useState } from "react"
import "../Create.css"

// Components
import FollowingForm from "./FollowingForm"
import CreateFollowingHeader from "./CreateFollowingHeader"

const CreateFollowing = (props) => {
	const [toggleComment, setToggleComment] = useState(false)
	const [name, setName] = useState("")
	const [commentBlock, setCommentBlock] = useState("")

	const handleSubmit = (e) => {
		e.preventDefault()
		const formData = {
			question: name, // question input
			commentBlock: commentBlock, // codeblock input
			added_by: props.currentUser._id, // who created the post
		}
		props.handleCreatePost(formData) // pass the formData up to Home.jsx
	}

	return (
		<>
			<CreateFollowingHeader></CreateFollowingHeader>
			<FollowingForm
				commentBlock={commentBlock}
				setCommentBlock={setCommentBlock}
				toggleComment={toggleComment}
				setToggleComment={setToggleComment}
				setName={setName}
				handleSubmit={handleSubmit}
			/>
		</>
	)
}

export default CreateFollowing
