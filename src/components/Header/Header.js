import React from "react";
import "./Header.scss";
import logo from "../../assets/images/logo.png";

import {
  Container,
  Navbar,
  NavbarBrand,
  Input,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavItem,
  Button
} from "reactstrap";
import { NavLink, useHistory, NavLink as ActiveLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "store/user";
import useFetchCategoryMerchant from "hook/useFetchCategoryMerchant";
import { getUser } from "core/localStore";

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [categories] = useFetchCategoryMerchant();
  const user = getUser();

  const authenticate = JSON.parse(localStorage.getItem("user"));

  const clickLogo = () => {
    history.replace("/");
  };

  const logoutUser = () => dispatch(logout());

  return (
    <header className="header">
      <Navbar color="faded" light>
        <Container className="header-link px-5">
          <Row className="d-flex justify-content-between">
            <Col style={{ flex: "1" }}>
              <NavbarBrand
                className="brand me-auto"
                onClick={clickLogo}
                style={{ textShadow: "1px 1px 8px black" }}
              >
                <img src={logo} alt="" className="logo" />
              </NavbarBrand>
            </Col>
            <Col
              className="d-inline-block "
              style={{ width: "40%", flex: "3" }}
            >
              <Input placeholder="searching..." />
            </Col>
            {user?.role === "ROLE_MERCHANT" ? (
              <Col>
                <Button onClick={() => history.push("/order-management")}>
                  OrderManagement
                </Button>
              </Col>
            ) : (
              <Col>
                <Button onClick={() => history.push("/order-management")}>
                  Cart
                </Button>
              </Col>
            )}
            <Col
              className="d-flex flex-row align-items-baseline justify-content-end inline-block"
              style={{ flex: "2" }}
            >
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav>
                  Categories
                  <span className="fa fa-chevron-down dropdown-caret"></span>
                </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem onClick={function noRefCheck() {}}>
                    Action 1
                  </DropdownItem>
                  <DropdownItem onClick={function noRefCheck() {}}>
                    Action 2
                  </DropdownItem>
                  <DropdownItem onClick={function noRefCheck() {}}>
                    Action 3
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <NavLink
                  tag={ActiveLink}
                  to={`/product-management-merchant/${categories[0]?._id}`}
                  activeClassName="active"
                >
                  My Shop
                </NavLink>
              </NavItem>
              {authenticate ? (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav>
                    {authenticate.lastName || "User"}
                    <span className="fa fa-chevron-down dropdown-caret"></span>
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={logoutUser}>Logout</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              ) : (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav>
                    Welcome!
                    <span className="fa fa-chevron-down dropdown-caret"></span>
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={() => history.push("/login")}>
                      Login
                    </DropdownItem>
                    <DropdownItem onClick={() => history.push("/register")}>
                      Sign Up
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
            </Col>
          </Row>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
