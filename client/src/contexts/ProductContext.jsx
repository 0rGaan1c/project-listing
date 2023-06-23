import React, { createContext, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [isProductUpdated, setIsProductUpdated] = useState(false);

  return (
    <ProductContext.Provider
      value={{
        isProductUpdated,
        setIsProductUpdated,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
