import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from 'react-router-bootstrap'
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { listMyOrders, updateOrder } from "../actions/orderActions";

const ProfileScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  const updateOrderStatus = useSelector((state) => state.updateOrderStatus);
  const { success: successUpdateOrder } = updateOrderStatus

  console.log(user)
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user?.name) {
        dispatch(getUserDetails('profile'));
        dispatch(listMyOrders())

      } else {
        setName(user.name);
        setEmail(user.email);
        setUserName(user.userName);
        setGender(user.gender);
        setPhoneNumber(user.phoneNumber);
        setdateOfBirth(user.dateOfBirth);
      }
      if (successUpdateOrder) {
        dispatch(listMyOrders())
      }
    }
  }, [dispatch, history, userInfo, user, successUpdateOrder]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("M???T KH???U KH??NG KH???P");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password, userName, phoneNumber, gender, dateOfBirth }));
    }
  };

  const confirmHandler = (id) => {
    console.log("cf")
    dispatch(updateOrder(id, "???? giao h??ng"))
  };

  return (
    <Row style={{ marginTop: "100px" }}>
      <Col md={3}>
        <div className="prof-overlay">
          <div className="prof-in4">
            <div className="prof-user">
              <h6>USER PROFILE</h6>
              {message && <Message variant="danger">{message}</Message>}
              {error && <Message variant="danger">{error}</Message>}
              {success && (
                <Message variant="success">

                  C???p nh???t thay ?????i th??nh c??ng</Message>
              )}
              {loading && <Loader />}
              <img src="images/avt.png" alt="avt" />

            </div>
            <Form onSubmit={submitHandler}>

              <Form.Group controlId="userName">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="userName"
                  placeholder="user Name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="name">
                <Form.Label>T??n ng?????i d??ng</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Nh???p t??n ng?????i d??ng"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <label for="gender">Sex</label>
              <select name="Gender" id="gender" defaultValue={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="None" selected={gender == 'None' ? true : false}>None</option>
                <option value="Female" selected={gender == 'Female' ? true : false}>Female</option>
                <option value="Male" selected={gender == 'Male' ? true : false}>Male</option>
              </select>

              <Form.Group controlId="phoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="phoneNumber"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="dateOfBirth">
                <Form.Label>Date Of Birth </Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Date Of Birth"
                  value={dateOfBirth.split('T')[0]}
                  onChange={(e) => setdateOfBirth(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>?????a ch??? Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Nh???p email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Nh???p m???t kh???u m???i</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Nh???p m???t kh???u"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="confirmPassword">
                <Form.Label>X??c nh???n m???t kh???u</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="X??c nh???n m???t kh???u"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button type="submit" variant="primary">
                C???p nh???t
              </Button>
            </Form>
          </div>
        </div>
      </Col>
      <Col md={9}>
        <div className="bill-overlay">
          <div className="bill-list">
            <h2>????n h??ng ???? ?????t</h2>
            {loadingOrders ? <Loader /> : errorOrders ? <Message variant='danger'>{errorOrders}</Message> : (
              <Table striped bordered hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.totalPrice}</td>
                      <td>{order.isPaid ? <i className='fas fa-check' style={{ color: 'green' }}></i> : (
                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                      )}</td>
                      <td>{order.status == "???? giao h??ng" ? <i className='fas fa-check' style={{ color: 'green' }}></i> : (
                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                      )}</td>
                      <td>
                        <LinkContainer to={`/order/${order._id}`}>
                          <Button type='button' variant='light' style={{ color: 'gray' }, { width: '50%' }}>Details</Button>
                        </LinkContainer>
                      </td>
                      <td>
                        {!order.isPaid ?
                          <Button type='button' variant='light' style={{ color: 'gray' }, { width: '100%' }}>Ch??a thanh to??n</Button> :
                          order.status === "Ch??a x??c nh???n" ?
                            <Button type='button' style={{ color: 'green' }, { width: '100%' }} >Ch??a ???????c x??c nh???n</Button> :
                            !(order.status === "???? giao h??ng") ?
                              <Button type='button' style={{ color: 'green' }, { width: '100%' }} onClick={() => confirmHandler(order._id)}>???? nh???n h??ng</Button> :
                              <Button type='button' variant='light' style={{ color: 'blue' }, { width: '100%' }} >???? nh???n h??ng</Button>
                        }

                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        </div>
      </Col>
    </Row>
  )
}

export default ProfileScreen;
