// AddressEditWrapper.jsx
import { useParams } from "react-router-dom";
import ProductsDeatils from "./ProductDeatils";

export default function ProductDetailsWrapper() {
  const { id } = useParams();
  return <ProductsDeatils key={id} />;
}