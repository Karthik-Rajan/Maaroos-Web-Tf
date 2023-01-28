import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Image,
  Alert,
} from "react-bootstrap";
import DropDownTitle from "./DropDownTitle";
import Icofont from "react-icofont";
import Amplify from "@aws-amplify/core";
import Auth from "@aws-amplify/auth";
import awsConfig from "../../awsConfig";

function Header(props: any) {
  // Amplify.configure(awsConfig);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  useEffect(() => {
    Auth.currentUserInfo().then((res) => {
      setUser(res);
    });
  }, []);

  const onToggleHandler = () => {
    setIsNavExpanded(!isNavExpanded);
  };

  const signOut = () => {
    if (user) {
      Auth.signOut();
      setUser(null);
    }
  };

  const onCloseMenu = () => {
    setIsNavExpanded(false);
  };

  return (
    <>
      <div ref={(node) => node}>
        <Navbar
          onToggle={onToggleHandler}
          expanded={isNavExpanded}
          color="light"
          expand="lg"
          className="navbar-light osahan-nav shadow-sm"
        >
          <Container>
            <Navbar.Brand to="/">
              <Image src="/img/logo.png" alt="Maaroos" className="logoImage" />
            </Navbar.Brand>
            <Navbar.Toggle />
            {/* <SearchBar /> */}
            <Navbar.Collapse id="navbarNavDropdown">
              <Nav activeKey={0} className="ml-auto" onSelect={onCloseMenu}>
                <Nav.Link
                  eventKey={0}
                  as={NavLink}
                  activeclassname="active"
                  to="/"
                >
                  Home <span className="sr-only">(current)</span>
                </Nav.Link>

                <Nav.Link
                  eventKey={1}
                  as={NavLink}
                  activeclassname="active"
                  to="/listing"
                >
                  Listing
                </Nav.Link>

                {!user ? (
                  <>
                    <Nav.Link
                      eventKey={2}
                      as={NavLink}
                      activeclassname="active"
                      to="#"
                      onClick={props.showModal}
                    >
                      <Icofont icon="ui-user" /> Login
                    </Nav.Link>

                    {/* <Nav.Link
                      eventKey={3}
                      as={NavLink}
                      activeclassname="active"
                      to="/register"
                    >
                      Register
                    </Nav.Link> */}
                  </>
                ) : (
                  ""
                )}

                {user ? (
                  <NavDropdown
                    id={`nav-2`}
                    alignRight
                    title={
                      <DropDownTitle
                        className="d-inline-block"
                        image="img/user/4.png"
                        imageAlt="user"
                        imageClass="nav-osahan-pic rounded-pill"
                        title="My Account"
                      />
                    }
                  >
                    <NavDropdown.Item
                      eventKey={4.1}
                      as={NavLink}
                      activeactiveclassname="active"
                      to="/myaccount"
                    >
                      <Icofont icon="ui-user" /> Profile
                    </NavDropdown.Item>
                    {/* <NavDropdown.Item
                    eventKey={4.2}
                    as={NavLink}
                    activeactiveclassname="active"
                    to="/myaccount/orders"
                  >
                    <Icofont icon="food-cart" /> Orders
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    eventKey={4.3}
                    as={NavLink}
                    activeactiveclassname="active"
                    to="/myaccount/offers"
                  >
                    <Icofont icon="sale-discount" /> Offers
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    eventKey={4.4}
                    as={NavLink}
                    activeactiveclassname="active"
                    to="/myaccount/favourites"
                  >
                    <Icofont icon="heart" /> Favourites
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    eventKey={4.5}
                    as={NavLink}
                    activeactiveclassname="active"
                    to="/myaccount/payments"
                  >
                    <Icofont icon="credit-card" /> Payments
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    eventKey={4.6}
                    as={NavLink}
                    activeactiveclassname="active"
                    to="/myaccount/addresses"
                  >
                    <Icofont icon="location-pin" /> Addresses
                  </NavDropdown.Item> */}

                    <NavDropdown.Item
                      eventKey={4.2}
                      as={NavLink}
                      activeactiveclassname="active"
                      to=""
                      onClick={signOut}
                    >
                      <Icofont icon="sign-out" /> Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  ""
                )}

                {/* <Nav.Link
                eventKey={1}
                as={NavLink}
                activeclassname="active"
                to="/offers"
              >
                <Icofont icon="sale-discount" /> Offers{" "}
                <Badge variant="danger">New</Badge>
              </Nav.Link> */}
                {/* <NavDropdown
                id={`nav-0`}
                title="Restaurants"
                alignRight
                className="border-0"
              >
                <NavDropdown.Item
                  eventKey={2.1}
                  as={NavLink}
                  activeclassname="active"
                  to="/listing"
                >
                  Listing
                </NavDropdown.Item>
                <NavDropdown.Item
                  eventKey={2.2}
                  as={NavLink}
                  activeclassname="active"
                  to="/detail"
                >
                  Detail + Cart
                </NavDropdown.Item>
                <NavDropdown.Item
                  eventKey={2.3}
                  as={NavLink}
                  activeclassname="active"
                  to="/checkout"
                >
                  Checkout
                </NavDropdown.Item>
              </NavDropdown> */}
                {/* <NavDropdown id={`nav-1`} title="Pages" alignRight>
                <NavDropdown.Item
                  eventKey={3.1}
                  as={NavLink}
                  activeclassname="active"
                  to="/track-order"
                >
                  Track Order
                </NavDropdown.Item>
                <NavDropdown.Item
                  eventKey={3.2}
                  as={NavLink}
                  activeclassname="active"
                  to="/invoice"
                >
                  Invoice
                </NavDropdown.Item>
                <NavDropdown.Item
                  eventKey={3.3}
                  as={NavLink}
                  activeclassname="active"
                  to="/login"
                >
                  Login
                </NavDropdown.Item>
                <NavDropdown.Item
                  eventKey={3.4}
                  as={NavLink}
                  activeclassname="active"
                  to="/register"
                >
                  Register
                </NavDropdown.Item>
                <NavDropdown.Item
                  eventKey={3.5}
                  as={NavLink}
                  activeclassname="active"
                  to="/404"
                >
                  404
                </NavDropdown.Item>
                <NavDropdown.Item
                  eventKey={3.6}
                  as={NavLink}
                  activeclassname="active"
                  to="/extra"
                >
                  Extra
                </NavDropdown.Item>
              </NavDropdown> */}
                {/* <NavDropdown
                id={`nav-2`}
                alignRight
                title={
                  <DropDownTitle
                    className="d-inline-block"
                    image="img/user/4.png"
                    imageAlt="user"
                    imageClass="nav-osahan-pic rounded-pill"
                    title="My Account"
                  />
                }
              >
                <NavDropdown.Item
                  eventKey={4.1}
                  as={NavLink}
                  activeactiveclassname="active"
                  to="/myaccount/orders"
                >
                  <Icofont icon="food-cart" /> Orders
                </NavDropdown.Item>
                <NavDropdown.Item
                  eventKey={4.2}
                  as={NavLink}
                  activeactiveclassname="active"
                  to="/myaccount/offers"
                >
                  <Icofont icon="sale-discount" /> Offers
                </NavDropdown.Item>
                <NavDropdown.Item
                  eventKey={4.3}
                  as={NavLink}
                  activeactiveclassname="active"
                  to="/myaccount/favourites"
                >
                  <Icofont icon="heart" /> Favourites
                </NavDropdown.Item>
                <NavDropdown.Item
                  eventKey={4.4}
                  as={NavLink}
                  activeactiveclassname="active"
                  to="/myaccount/payments"
                >
                  <Icofont icon="credit-card" /> Payments
                </NavDropdown.Item>
                <NavDropdown.Item
                  eventKey={4.5}
                  as={NavLink}
                  activeactiveclassname="active"
                  to="/myaccount/addresses"
                >
                  <Icofont icon="location-pin" /> Addresses
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                activeactiveclassname="active"
                alignRight
                className="dropdown-cart"
                title={
                  <DropDownTitle
                    className="d-inline-block"
                    faIcon="shopping-basket"
                    iconClass="mr-1"
                    title="Cart"
                    badgeClass="ml-1"
                    badgeVariant="success"
                    badgeValue={5}
                  />
                }
              >
                <div className="dropdown-cart-top shadow-sm">
                  {
                    <CartDropdownHeader
                      className="dropdown-cart-top-header p-4"
                      title="Gus's World Famous Chicken"
                      subTitle="310 S Front St, Memphis, USA"
                      image="img/cart.jpg"
                      imageClass="img-fluid mr-3"
                      imageAlt="osahan"
                      NavLinkUrl="#"
                      NavLinkText="View Full Menu"
                    />
                  }
                  <div className="dropdown-cart-top-body border-top p-4">
                    <CartDropdownItem
                      icoIcon="ui-press"
                      iconClass="text-success food-item"
                      title="Corn & Peas Salad x 1"
                      price="$209"
                    />

                    <CartDropdownItem
                      icoIcon="ui-press"
                      iconClass="text-success food-item"
                      title='Veg Seekh Sub 6" (15 cm) x 1'
                      price="$133"
                    />

                    <CartDropdownItem
                      icoIcon="ui-press"
                      iconClass="text-danger food-item"
                      title='Chicken Tikka Sub 12" (30 cm) x 1'
                      price="$314"
                    />

                    <CartDropdownItem
                      icoIcon="ui-press"
                      iconClass="text-success food-item"
                      title="Corn & Peas Salad x 1 "
                      price="$209"
                    />
                  </div>
                  <div className="dropdown-cart-top-footer border-top p-4">
                    <p className="mb-0 font-weight-bold text-secondary">
                      Sub Total{" "}
                      <span className="float-right text-dark">$499</span>
                    </p>
                    <small className="text-info">Extra charges may apply</small>
                  </div>
                  <div className="dropdown-cart-top-footer border-top p-2">
                    <NavDropdown.Item
                      eventKey={5.1}
                      as={Link}
                      className="btn btn-success btn-block py-3 text-white text-center dropdown-item"
                      to="/checkout"
                    >
                      {" "}
                      Checkout
                    </NavDropdown.Item>
                  </div>
                </div>
              </NavDropdown> */}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      {notification ? (
        <Alert
          variant="warning"
          dismissible
          role="alert"
          className="currentOrderInfo"
          onClose={() => {
            setNotification(false);
          }}
        >
          Track your current order #OR-1783883 here
        </Alert>
      ) : (
        ""
      )}
    </>
  );
}

export default Header;
