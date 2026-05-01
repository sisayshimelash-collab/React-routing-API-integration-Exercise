import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Iphone() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3001/products");
        if (!res.ok) throw new Error("failed to fetch phone information");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log("error: unable to fetch", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container" style={{ paddingTop: "50px" }}>
      <h1 className="text-center font-bold">Iphone</h1>
      <h3 className="text-center">The best for the brightest</h3>
      {products.map((product, index) => (
        <div
          key={product.product_id}
          className={`row align-items-center my-5 ${
            index % 2 === 1 ? "flex-row-reverse" : ""
          }`}
        >
          <div className="col-md-6">
            <h2>{product.product_name}</h2>
            <p>{product.product_brief_description}</p>
            <p>{product.product_description}</p>
            <p>
              <strong>{product.starting_price}</strong>
            </p>
            <Link to={`/iphone/${product.product_id}`}>Learn more</Link>
          </div>

          <div className="col-md-6 text-center">
            <img
              src={product.product_img}
              alt={product.product_name}
              className="img-fluid"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Iphone;
