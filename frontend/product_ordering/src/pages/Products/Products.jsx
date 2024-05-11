import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getProducts } from "../../api/ProductApiSlice";
import "./Products.css";

import { placeOrderReq } from "../../api/PlaceOrderApiSlice";

/**
 * Component for managing product ordering.
 * @returns {JSX.Element} The Products component.
 */
function Products() {
    // State for selected products and packages
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [packages, setPackages] = useState([]);

    // Query to fetch products
  const { isPending, data: products } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });

   // Mutation for placing order
  const placeOrderMutation = useMutation({
    mutationFn: () => placeOrderReq(selectedProducts),
    onSuccess: (data) => {
      setPackages(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

   /**
   * Handle checkbox change event.
   * @param {Object} product - The product object.
   */
  const handleCheckboxChange = (product) => {
    const index = selectedProducts.findIndex((p) => p.id === product.id);
    if (index === -1) {
      setSelectedProducts([...selectedProducts, product]);
    } else {
      const newSelectedProducts = [...selectedProducts];

      newSelectedProducts.splice(index, 1);
      setSelectedProducts(newSelectedProducts);
    }
  };

  // Function to place order on click of button
  const placeOrder = () => {
    placeOrderMutation.mutate();
  };

  return (
    <div className="App">
      <div className="heading">
        <h1 className="product__heading">Product Ordering System</h1>
        <h2>Select Products</h2>
      </div>
      <div className="product__list">
        {isPending ? (
          <div className="loading">
            <p className="loading__para">Loading...</p>
          </div>
        ) : (
          products?.map((product) => (
            <div className="product__content" key={product.id}>
              <div className="product__inputs">
                <input
                  type="checkbox"
                  checked={selectedProducts.some((p) => p.id === product.id)}
                  onChange={() => handleCheckboxChange(product)}
                />
                <p> {product.name}</p>
              </div>
              <p className="product__details">
                <span>Price:</span> ${product.price}
              </p>
              <p className="product__details">
                <span>Weight:</span> {product.weight}g
              </p>
            </div>
          ))
        )}
      </div>
      <div className="button__div">
        <button
          disabled={selectedProducts.length < 1}
          className={selectedProducts.length < 1 ? "disabled button" : "button"}
          onClick={placeOrder}
        >
          Place Order
        </button>
      </div>
      <div className="package">
        <h2 className="package__heading">Packages</h2>
        <div className="package__details">
          {packages?.map((pkg, index) => (
            <div className="package__content" key={index}>
              <h3 className="package__content--heading">Package {index + 1}</h3>
              <p className="package__para">
                <span>Items: </span>
                {pkg.items.map((item) => item.name).join(", ")}
              </p>
              <p className="package__para">
                <span>Total weight: </span> {pkg.totalWeight}g
              </p>
              <p className="package__para">
                <span>Total price: </span> ${pkg.totalPrice}
              </p>
              <p className="package__para">
                <span>Courier price:</span> ${pkg.courierPrice}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
