import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Upvote from "./Upvote";
import Comment1 from "../../assets/comment1.svg";
import Comment2 from "../../assets/comment2.svg";
import CommentSection from "./CommentSection";
import { getComments } from "../../api/comments";
import { toast } from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import ProductModal from "../../components/Modals/ProductModal";
import "../../styles/pages/Home/Product.css";

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

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".modal-layout")) {
        setIsProductModalOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsProductModalOpen(false);
      }
    };

    if (isProductModalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isProductModalOpen]);

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
      <div className="product-container">
        <div key={_id} className="product">
          <div className="product-content">
            <div className="product-img-div">
              <img src={logoUrl} alt={companyName} />
            </div>
            <div className="product-info">
              <div className="product-info-basic">
                <div>
                  <Link to={productLink}>{companyName}</Link>
                  <p>{description}</p>
                </div>
                <Upvote productId={_id} upvotes={upvotes} />
              </div>
              <div className="product-info-advanced">
                <div className="product-info-categories">
                  {categories.map(({ category, _id }) => {
                    return (
                      <div className="product-info-category" key={_id}>
                        {category}
                      </div>
                    );
                  })}
                </div>
                <div
                  className={`product-info-commenticon ${
                    isLoggedIn ? "w-10" : "w-30"
                  } cursor-pointer`}
                  onClick={() => {
                    setIsCommentOpen(!isCommentOpen);
                  }}
                >
                  <div className="comment-icon-container1">
                    <img src={Comment1} alt="" />
                    <p>Comment</p>
                  </div>
                </div>
                <div className="product-edit">
                  {isLoggedIn && (
                    <button
                      className="edit-product-btn"
                      onClick={() => {
                        setIsProductModalOpen(true);
                      }}
                    >
                      Edit
                    </button>
                  )}
                  <div
                    className="comment-icon-container2"
                    onClick={() => {
                      setIsCommentOpen(!isCommentOpen);
                    }}
                  >
                    <span>{commentList.length}</span>
                    <img src={Comment2} alt="" className="" />
                  </div>
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
