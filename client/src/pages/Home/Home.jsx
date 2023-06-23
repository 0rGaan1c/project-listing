import { useContext, useEffect, useState } from "react";
import Hero from "./Hero";
import MenuBox from "./MenuBox";
import Navbar from "./Navbar";
import { getProducts } from "../../api/product";
import { toast } from "react-hot-toast";
import Filter from "./Filter";
import Product from "./Product";
import { ProductContext } from "../../contexts/ProductContext";

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
      const result = await getProducts(categoryId);

      if (sortBy === "upvote") {
        const sortedByUpvotes = [...result.data].sort(
          (a, b) => b.upvotes.count - a.upvotes.count
        );
        setProducts(sortedByUpvotes);
      } else if (sortBy === "comment") {
        const sortedByComments = [...result.data].sort(
          (a, b) => b.comments.length - a.comments.length
        );
        setProducts(sortedByComments);
      }

      setSortBy("");
    };

    fetchProductData();
  }, [sortBy, categoryId]);

  return (
    <div>
      <Navbar />
      <div className="w-11/12 mx-auto">
        <Hero />
        <div className="lg:grid lg:grid-cols-5">
          <div className="lg:col-span-1"></div>
          <div className="lg:col-span-4">
            <MenuBox totalProducts={products.length} setSortBy={setSortBy} />
          </div>
        </div>
        <div className="lg:grid lg:grid-cols-5 lg:gap-4">
          <Filter setCategoryId={setCategoryId} categoryId={categoryId} />
          <div className="lg:col-span-4">
            {loading ? (
              <p className="my-6">Loading...</p>
            ) : products.length === 0 ? (
              <p className="my-6">
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
