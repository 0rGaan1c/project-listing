import React, { useContext, useEffect, useState } from "react";
import { getCategories } from "../../api/product";
import { toast } from "react-hot-toast";
import { ProductContext } from "../../contexts/ProductContext";
import "../../styles/pages/Home/Filter.css";

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
    <div className="filter-container">
      <p className="filter-text">Filters:</p>
      <div className="filter-box-lg">
        <p className="feedback">Feedback</p>
        <p className="apply-filter">Apply Filter</p>
      </div>
      <div className="categories-container">
        <div
          className={`category ${
            categoryId === "" ? "cat-active" : "cat-not-active"
          }`}
          onClick={() => {
            setCategoryId("");
          }}
        >
          All
        </div>
        {categories.map(({ category, _id }) => {
          return (
            <div
              className={`category ${
                categoryId === _id ? "cat-active" : "cat-not-active"
              }`}
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
