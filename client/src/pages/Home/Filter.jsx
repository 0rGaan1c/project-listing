import React, { useContext, useEffect, useState } from "react";
import { getCategories } from "../../api/product";
import { toast } from "react-hot-toast";
import { ProductContext } from "../../contexts/ProductContext";

const Filter = ({ categoryId, setCategoryId }) => {
  const [categories, setCategories] = useState([]);
  const { isProductUpdated, setIsProductUpdated } = useContext(ProductContext);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getCategories();
      if (result.status === "ok") {
        setCategories(result.data);
      } else {
        toast.error(result.error || "Something went wrong.");
      }
      if (isProductUpdated) {
        setIsProductUpdated(false);
      }
    };

    fetchData();
  }, [isProductUpdated, setIsProductUpdated]);

  return (
    <div className="mt-4 lg:-mt-16">
      <p className="text-[#8B8B8B] lg:hidden">Filters:</p>
      <div className="hidden lg:block text-white font-medium bg-[#36416A] rounded-xl pt-16 pb-4 px-6">
        <p className="text-2xl">Feedback</p>
        <p className="text-sm mt-2">Apply Filter</p>
      </div>
      <div className="flex flex-wrap gap-2 mt-2 text-sm lg:bg-white lg:p-3 lg:rounded-xl lg:shadow-categorybox">
        <div
          className={`${
            categoryId === ""
              ? "bg-[#36416a] text-white"
              : "bg-[#36416a26] text-black"
          } w-fit h-fit py-2 px-6 flex rounded-full justify-center cursor-pointer`}
          onClick={() => {
            setCategoryId("");
          }}
        >
          All
        </div>
        {categories.map(({ category, _id }) => {
          return (
            <div
              className={`${
                categoryId === _id
                  ? "bg-[#36416a] text-white"
                  : "bg-[#36416a26] text-black"
              } w-fit h-fit py-2 px-6 flex rounded-full justify-center cursor-pointer`}
              key={_id}
              onClick={() => {
                setCategoryId(_id);
              }}
            >
              {category}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Filter;
