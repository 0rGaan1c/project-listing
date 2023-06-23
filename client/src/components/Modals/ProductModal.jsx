import React, { useContext, useState } from "react";
import ModalLayout from "../../Layout/ModalLayout";
import Input from "../Input";
import Button from "../Button";
import { toast } from "react-hot-toast";
import { createProduct, updateProduct } from "../../api/product";
import { useCookies } from "react-cookie";
import { ProductContext } from "../../contexts/ProductContext";

const processCategories = (categories) => {
  let cateogryString = "";
  categories.forEach(({ category }) => {
    cateogryString += category + ",";
  });

  return cateogryString.slice(0, -1);
};

const ProductModal = ({
  setIsProductModalOpen,
  type,
  productId,
  productData,
}) => {
  const [cookie] = useCookies(["access_token"]);
  const [companyName, setCompanyName] = useState(
    type === "edit" ? productData.companyName : ""
  );
  const [categories, setCategories] = useState(
    type === "edit" ? processCategories(productData.categories) : ""
  );
  const [logoUrl, setLogoUrl] = useState(
    type === "edit" ? productData.logoUrl : ""
  );
  const [productLink, setProductLink] = useState(
    type === "edit" ? productData.productLink : ""
  );
  const [description, setDescription] = useState(
    type === "edit" ? productData.description : ""
  );
  const [isLoading, setIsLoading] = useState(false);

  const { setIsProductUpdated } = useContext(ProductContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (
      !companyName ||
      !categories ||
      !logoUrl ||
      !productLink ||
      !description
    ) {
      toast.error("All fields are required.");
      return;
    }

    const formData = {
      companyName,
      categories,
      logoUrl,
      productLink,
      description,
      token: cookie.access_token,
    };

    if (type === "add") {
      const result = await createProduct(formData);
      if (result?.status === "ok") {
        toast.success("Product Added.");
        setIsLoading(false);
        setIsProductModalOpen(false);
        setIsProductUpdated(true);
      } else {
        toast.error(result.error || "Error creating product");
        setIsLoading(false);
      }
      return;
    }

    formData.productId = productId;
    if (type === "edit") {
      const result = await updateProduct(formData);
      if (result?.status === "ok") {
        toast.success("Product Updated.");
        setIsLoading(false);
        setIsProductModalOpen(false);
        setIsProductUpdated(true);
      } else {
        toast.error(result.error || "Error updating product");
        setIsLoading(false);
      }
      return;
    }
  };

  return (
    <ModalLayout width={"w-11/12"} isModal={true}>
      <div className="hidden lg:block text-3xl font-bold mb-8">
        {type === "add" ? "Add" : "Edit"} your product
      </div>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Name of the company"
          type="text"
          value={companyName}
          setInputVal={setCompanyName}
        />

        <Input
          placeholder="Category"
          type="text"
          value={categories}
          setInputVal={setCategories}
        />

        <Input
          placeholder="Add logo url"
          type="text"
          value={logoUrl}
          setInputVal={setLogoUrl}
        />

        <Input
          placeholder="Link of product"
          type="text"
          value={productLink}
          setInputVal={setProductLink}
        />

        <Input
          placeholder="Add description"
          type="text"
          value={description}
          setInputVal={setDescription}
        />
        <Button
          text={type === "add" ? "+ Add" : " Edit"}
          isLoading={isLoading}
          isModal={true}
        />
      </form>
    </ModalLayout>
  );
};

export default ProductModal;
