import React, { useState } from "react";
import { Link } from "react-router-dom";
import Upvote from "./Upvote";
import Comment1 from "../../assets/comment1.svg";
import Comment2 from "../../assets/comment2.svg";
import CommentSection from "./CommentSection";
import { getComments } from "../../api/comments";
import { toast } from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import ProductModal from "../../components/Modals/ProductModal";

const Product = ({ product }) => {
  const {
    companyName,
    categories,
    description,
    logoUrl,
    productLink,
    upvotes,
    comments,
    _id,
  } = product;
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [commentList, setCommentList] = useState(comments);
  const isLoggedIn = useAuth();
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const fetchComments = async () => {
    const result = await getComments(_id);
    if (result.status === "ok") {
      console.log("comments fetched", result);
      setCommentList(result.data);
    } else {
      toast.error(result.error || "Something went wrong");
    }
  };

  return (
    <>
      {isProductModalOpen && (
        <div className="blackScreen-overlay">
          <ProductModal
            setIsProductModalOpen={setIsProductModalOpen}
            type="edit"
            productId={_id}
            productData={product}
          />
        </div>
      )}
      <div className="my-6">
        <div
          key={_id}
          className="bg-[#36416a26] my-3 p-3 rounded-md min-h-36 h-auto"
        >
          <div className="flex gap-2 justify-between w-full">
            <div className="w-[20%]">
              <img
                src={logoUrl}
                alt={companyName}
                className="w-12 h-12 object-cover rounded-full"
              />
            </div>
            <div className="w-[100%]">
              <div className="flex gap-2 justify-between">
                <div className="">
                  <Link
                    to={productLink}
                    className="text-[#36416A] font-medium text-lg"
                  >
                    {companyName}
                  </Link>
                  <p className="text-sm">{description}</p>
                </div>
                <Upvote productId={_id} upvotes={upvotes} />
              </div>
              <div className="mt-2 flex gap-2 justify-between items-center text-sm">
                <div className="flex flex-wrap gap-1 w-[70%]">
                  {categories.map(({ category, _id }) => {
                    return (
                      <div
                        className="bg-[#C0CEFF] text-black w-fit h-fit py-1 px-4 flex rounded-full justify-center cursor-pointer"
                        key={_id}
                      >
                        {category}
                      </div>
                    );
                  })}
                </div>
                <div
                  className={`${
                    isLoggedIn ? "w-[10%]" : "w-[30%]"
                  } cursor-pointer`}
                  onClick={() => {
                    setIsCommentOpen(!isCommentOpen);
                  }}
                >
                  <img src={Comment1} alt="" />
                </div>
                {isLoggedIn && (
                  <button
                    className="bg-[#36416A] text-white rounded-full w-fit h-fit px-3 py-1"
                    onClick={() => {
                      setIsProductModalOpen(true);
                    }}
                  >
                    Edit
                  </button>
                )}
                <div
                  className="w-14 grid grid-cols-2 gap-px items-center cursor-pointer"
                  onClick={() => {
                    setIsCommentOpen(!isCommentOpen);
                  }}
                >
                  <span className="font-medium">{commentList.length}</span>
                  <img src={Comment2} alt="" />
                </div>
              </div>
            </div>
          </div>
          <CommentSection
            productId={_id}
            commentList={commentList}
            isCommentOpen={isCommentOpen}
            fetchComments={fetchComments}
          />
        </div>
      </div>
    </>
  );
};

export default Product;
