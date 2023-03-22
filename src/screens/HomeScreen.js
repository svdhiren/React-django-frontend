//import axios from 'axios'
import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);

  const { loading, products, error } = productList;

  /*The commented part was before we started using the global state using redux */
  //const [products, setProducts] = useState([]);

  useEffect(() => {
      // async function fetchProducts() {
      //   const {data} = await axios.get('/api/products/');
      //   console.log("Received the data : ");
      //   console.log(data);
      //   setProducts(data);
      // }
      // fetchProducts();
      dispatch(listProducts());
  }, [dispatch]);
  return (
    <div>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products &&
            products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
        </Row>
      )}
    </div>
  );
}

export default HomeScreen;
