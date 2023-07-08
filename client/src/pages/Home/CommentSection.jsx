import React, { useState } from "react";
import SubmitArrow from "../../assets/submitarrow.svg";
import { createComment } from "../../api/comments";
import { toast } from "react-hot-toast";
import Circle from "../../assets/circle.svg";
import "../../styles/pages/Home/CommentSection.css";

const CommentSection = ({
  isCommentOpen,
  commentList,
  productId,
  fetchComments,
}) => {
  const [commentVal, setCommentVal] = useState("");

  const handleComment = async () => {
    if (!commentVal) {
      toast.error("Please write a comment.");
      return;
    }
    const result = await createComment(productId, commentVal);
    if (result.status === "ok") {
      toast.success("Comment Added.");
      setCommentVal("");
      fetchComments();
    } else {
      toast.error(result.error || "Something went wrong");
    }
  };

  return (
    <>
      {isCommentOpen && (
        <div className="comment">
          <div className="comment-input">
            <input
              type="text"
              placeholder="Add a comment..."
              onChange={(e) => {
                setCommentVal(e.target.value);
              }}
              value={commentVal}
            />
            <img src={SubmitArrow} alt="" onClick={handleComment} />
          </div>

          <div className="comment-list">
            {commentList.map(({ commentText, _id }) => {
              return (
                <div key={_id} className="single-comment">
                  <img src={Circle} alt="" />
                  <p>{commentText}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default CommentSection;
