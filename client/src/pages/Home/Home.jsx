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
      console.log(result);
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

  useEffect(() => {}, []);

  return (
    <div>
      <Navbar />
      <div className="w-11/12 mx-auto">
        <Hero />
        <MenuBox totalProducts={products.length} setSortBy={setSortBy} />
        <div>
          <Filter setCategoryId={setCategoryId} categoryId={categoryId} />
          {loading ? (
            <p className="my-6">Loading...</p>
          ) : (
            products.map((product) => {
              return <Product product={product} key={product._id} />;
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
