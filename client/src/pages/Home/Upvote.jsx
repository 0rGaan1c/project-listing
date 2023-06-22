import React, { useEffect, useState } from "react";
import UpvoteIcon from "../../assets/upvote.svg";
import { toast } from "react-hot-toast";
import { updateUpvote } from "../../api/upvotes";

const Upvote = ({ productId, upvotes }) => {
  const [totalUpvotes, setTotalUpvotes] = useState(upvotes?.count || 0);
  const [isUpvoting, setIsUpvoting] = useState(false);

  const upvoteProduct = async () => {
    if (isUpvoting) return;
    setIsUpvoting(true);
    const result = await updateUpvote(productId);
    if (result.status === "ok") {
      setTotalUpvotes(result.data.count);
      setIsUpvoting(false);
    } else {
      toast.error(result.error || "Something went wrong.");
      setIsUpvoting(false);
    }
  };

  return (
    <div
      className="bg-[#C7CBD6] w-[10%] h-14 rounded-full flex justify-evenly items-center flex-col cursor-pointer px-2"
      onClick={upvoteProduct}
    >
      {isUpvoting ? (
        <p>...</p>
      ) : (
        <>
          <img src={UpvoteIcon} alt="" />
          <p className="text-sm font-medium">{totalUpvotes}</p>
        </>
      )}
    </div>
  );
};

export default Upvote;
