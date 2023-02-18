import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Row,
  Col,
  ListGroup,
  Button,
  Image,
  Card,
  FormControl,
} from "react-bootstrap";

import Loader from "../components/Loader";
import Message from "../components/Message";
import Rating from "../components/Rating";
import { listProductDetails } from "../actions/productActions";

function ProductScreen() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;

  const [qty, setQty] = useState(1);

  /*The commented part was before we started using the global state using redux */
  // const [product, setProduct] = useState([]);

  useEffect(() => {
    // async function fetchProduct() {
    //   const {data} = await axios.get(`/api/product/${params.id}`);
    //   console.log("Received the data : ");
    //   console.log(data);
    //   setProduct(data);
    // }
    // fetchProduct();
    dispatch(listProductDetails(params.id));
  }, [dispatch, params.id]);

  const addToCartHandler = () => {
    navigate(`/cart/${params.id}?qty=${qty}`);
  };

  return (
    <div>
      <Link
        to="/"
        className="btn btn-light my-3"
        style={{ backgroundColor: "#fcad03" }}
      >
        Go back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h4>{product.name}</h4>
              </ListGroup.Item>

              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  num={product.numReviews}
                ></Rating>
              </ListGroup.Item>

              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>

              <ListGroup.Item>
                Description: ${product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock !== 0 ? "In stock" : "Out of stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <FormControl
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </FormControl>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Button
                    className="col-12 btn btn-primary"
                    size="lg"
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default ProductScreen;
