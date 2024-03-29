import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'

function Product({product}) {
  return (
      <div>
          <Card className="my-3 p-2 rounded">
              <Link to={`/product/${product._id}`}>
                  <Card.Img src={product.image} />
              </Link>
              <Card.Body>
                  <Link to={`/product/${product._id}`}>
                      <Card.Title as="div">{product.name}</Card.Title>
                  </Link>

                  <Card.Text as="div">
                      <div className="my-3">
                          <Rating
                              value={product.rating}
                              num={product.numReviews}
                          />
                      </div>
                  </Card.Text>

                  <Card.Text as="h3">${product.price}</Card.Text>
              </Card.Body>
          </Card>
      </div>
  );
}

export default Product