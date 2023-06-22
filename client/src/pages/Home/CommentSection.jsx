import React, { useState } from "react";
import SubmitArrow from "../../assets/submitarrow.svg";
import { createComment } from "../../api/comments";
import { toast } from "react-hot-toast";
import Circle from "../../assets/circle.svg";

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
        <div className="mt-6">
          <div className="rounded-full bg-white relative p-2">
            <input
              type="text"
              placeholder="Add a comment..."
              className="outline-none placeholder-[#ABABAB] text-sm pl-2 w-[90%]"
              onChange={(e) => {
                setCommentVal(e.target.value);
              }}
              value={commentVal}
            />
            <img
              src={SubmitArrow}
              alt=""
              className="absolute right-3 top-3 cursor-pointer"
              onClick={handleComment}
            />
          </div>

          <div className="mt-4 max-h-56 overflow-y-auto">
            {commentList.map(({ commentText, _id }) => {
              return (
                <div
                  key={_id}
                  className="flex gap-2 mb-4 items-baseline w-[96%]"
                >
                  <img src={Circle} alt="" />
                  <p className="font-sm text-[#999999]">{commentText}</p>
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
