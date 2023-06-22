import { useEffect, useState } from "react";
import Hero from "./Hero";
import MenuBox from "./MenuBox";
import Navbar from "./Navbar";
import { getProducts } from "../../api/product";
import { toast } from "react-hot-toast";
import Filter from "./Filter";
import Product from "./Product";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [loading, setLoading] = useState(true);

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
    };

    fetchData();
  }, [categoryId]);

  return (
    <div>
      <Navbar />
      <div className="w-11/12 mx-auto">
        <Hero />
        <MenuBox totalProducts={products.length} />
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
