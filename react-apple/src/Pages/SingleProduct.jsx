import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.log(err));
  }, [id]);

 
  if (!product) {
    return (
      <div className="container text-center" style={{ paddingTop: "100px" }}>
        <h3>Loading product...</h3>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: "50px" }}>
      <div className="mb-4">
        <Link to="/iphone" className="text-decoration-none fs-5">
          ← Back to iPhone
        </Link>
      </div>

      <div className="row align-items-center">
        <div className="col-md-6 text-center mb-4 mb-md-0">
          <img
            src={product.product_img}
            alt={product.product_name}
            className="img-fluid rounded"
          />
        </div>

        <div className="col-md-6">
          <h1 className="display-5 fw-bold">{product.product_name}</h1>
          <p className="lead text-muted mt-3">
            {product.product_brief_description}
          </p>
          <h3 className="my-4">{product.starting_price}</h3>
          <p className="text-muted">{product.price_range}</p>

          <div className="bg-light p-4 rounded-3 my-4">
            <h5>Description</h5>
            <p className="mb-0">{product.product_description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
