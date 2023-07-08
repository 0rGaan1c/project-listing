import { useContext, useEffect, useState } from "react";
import Hero from "./Hero";
import MenuBox from "./MenuBox";
import Navbar from "./Navbar";
import { getProducts } from "../../api/product";
import { toast } from "react-hot-toast";
import Filter from "./Filter";
import Product from "./Product";
import { ProductContext } from "../../contexts/ProductContext";
import "../../styles/pages/Home/Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("");
  const { isProductUpdated, setIsProductUpdated } = useContext(ProductContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getProducts(categoryId);
      if (result.status === "ok") {
        setProducts(result.data);
        setLoading(false);
      } else {
        toast.error(result.error || "Something went wrong.");
        setLoading(false);
      }

      if (isProductUpdated) {
        setIsProductUpdated(false);
      }
    };

    fetchData();
  }, [categoryId, isProductUpdated, setIsProductUpdated]);

  useEffect(() => {
    if (!sortBy) return;

    const fetchProductData = async () => {
      setLoading(true);
      const result = await getProducts(categoryId);

      if (sortBy === "upvote") {
        const sortedByUpvotes = [...result.data].sort(
          (a, b) => b.upvotes.count - a.upvotes.count
        );
        setProducts(sortedByUpvotes);
        setLoading(false);
      } else if (sortBy === "comment") {
        const sortedByComments = [...result.data].sort(
          (a, b) => b.comments.length - a.comments.length
        );
        setProducts(sortedByComments);
        setLoading(false);
      }

      setLoading(false);
    };

    fetchProductData();
  }, [sortBy, categoryId]);

  return (
    <div>
      <Navbar />
      <div className="home">
        <Hero />
        <div className="menu-box-container">
          <div className="one"></div>
          <div className="two">
            <MenuBox
              totalProducts={products.length}
              setSortBy={setSortBy}
              sortBy={sortBy}
            />
          </div>
        </div>
        <div className="filter-product-container">
          <Filter setCategoryId={setCategoryId} categoryId={categoryId} />
          <div className="products-container">
            {loading ? (
              <p className="product-loading">Loading...</p>
            ) : products.length === 0 ? (
              <p className="product-loading">
                No products found, you can add a product by clicking on the Add
                Product button.
              </p>
            ) : (
              products.map((product) => {
                return <Product product={product} key={product._id} />;
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
