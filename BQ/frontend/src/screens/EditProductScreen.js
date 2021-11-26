import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { addNewProduct, listProductDetails } from "../actions/productActions";


const EditProductScreen = ({history, match }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [countInStock, setCountInStock] = useState('');


  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const {  user } = userDetails;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading: loadingPr, product } = productDetails;
  
  
  
  
 console.log(product)

  useEffect(() => {
    if(!product){
      console.log(match.params.id)
        dispatch(listProductDetails(match.params.id))
    }
    else{
      setName(product.name);
      setDescription(product.description);
      setImage(product.image);
      setPrice(product.price);
      setCountInStock(product.countInStock);

    }
    
  }, [dispatch, match, history, product ]);

  

 
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(match.params.catename)
    dispatch(addNewProduct(name, image, description, price, countInStock, match.params.pathname, match.params.catename))
    console.log(match.params.pathname)
    history.push(`/admin/product/${match.params.pathname}/${match.params.catename}`)
  };

  return (
    loadingPr ? <></> :
    <FormContainer>
      <h1>Edit Product </h1>
      {error && <Message variant="danger">{error} </Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="text">
          <Form.Label> Product Name </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter brand name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="text">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Description for product"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="Image">
          <Form.Label> Image URL </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter image url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="text">
          <Form.Label> Price </Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="text">
          <Form.Label>Count In Stock </Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Count In Stock"
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Confirm
        </Button>
      </Form>
    </FormContainer>
  );
};

export default EditProductScreen;
