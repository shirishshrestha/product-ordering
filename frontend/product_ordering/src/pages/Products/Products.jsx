import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getProducts } from "../../api/ProductApiSlice";

import { placeOrderReq } from "../../api/PlaceOrderApiSlice";

function Products() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [packages, setPackages] = useState([]);

  const { isPending, data: products } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });

  const placeOrderMutation = useMutation({
    mutationFn: () => placeOrderReq(selectedProducts),
    onSuccess: (data) => {
      setPackages(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

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

  const placeOrder = () => {
    placeOrderMutation.mutate();
  };

  return (
    <div className="App">
      <h1>Product Ordering System</h1>
      <h2>Select Products</h2>
      <ul>
        {isPending ? (
          <p>Loading...</p>
        ) : (
          products?.map((product) => (
            <li key={product.id}>
              <input
                type="checkbox"
                checked={selectedProducts.some((p) => p.id === product.id)}
                onChange={() => handleCheckboxChange(product)}
              />
              {product.name} - ${product.price} - {product.weight}g
            </li>
          ))
        )}
      </ul>
      <button onClick={placeOrder}>Place Order</button>
      <h2>Packages</h2>
      <ul>
        {packages?.map((pkg, index) => (
          <li key={index}>
            <h3>Package {index + 1}</h3>
            <p>Items: {pkg.items.map((item) => item.name).join(", ")}</p>
            <p>Total weight: {pkg.totalWeight}g</p>
            <p>Total price: ${pkg.totalPrice}</p>
            <p>Courier price: ${pkg.courierPrice}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;
