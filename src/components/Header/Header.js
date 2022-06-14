import React, { useEffect } from "react";
import "./Header.scss";
import logo from "../../assets/images/brand-logo.svg";
import Cart from "../../assets/images/cart-icon.webp";

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
import useFetchMenu from "hook/useFetchMenu";

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [categories, getProducts] = useFetchCategoryMerchant();
  const user = getUser();
  const [menu] = useFetchMenu();

  const renderMenu = menu?.map((item, index) => {
    return (
      <span key={index}>
        <RenderMenuItem
          propClassName="menu-item"
          slug={item?.slug}
          itemInfo={item}
        />
        {item?.subcategories.map((sub, subindex) => {
          return (
            <RenderMenuItem
              propClassName="menu-item-sub"
              itemInfo={sub}
              key={subindex}
              slug={sub?.slug}
            />
          );
        })}
      </span>
    );
  });

  const authenticate = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user?.role === "ROLE_MERCHANT") {
      getProducts();
    }
  }, []);

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
              className="d-inline-block mt-2"
              style={{ width: "40%", flex: "3" }}
            >
              <Input placeholder="searching..." />
            </Col>

            <Col
              className="d-flex flex-row align-items-baseline justify-content-end inline-block"
              style={{ flex: "2" }}
            >
              <Button
                className="cart-btn"
                onClick={() => history.push("/user/cart")}
              >
                <img className="cart-img " src={Cart} alt="" />
              </Button>
              {user?.role === "ROLE_MERCHANT" && (
                <>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle className="text-white" nav>
                      Categories
                      <span className="fa fa-chevron-down dropdown-caret"></span>
                    </DropdownToggle>
                    <DropdownMenu end>
                      <ul className="menu-items">{renderMenu}</ul>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <NavItem>
                    <NavLink
                      tag={ActiveLink}
                      to={`/product-management-merchant/${categories[0]?._id}`}
                      activeClassName="active"
                      style={{ color: "#fff" }}
                    >
                      My Shop
                    </NavLink>
                  </NavItem>
                </>
              )}
              {authenticate ? (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav style={{ color: "#fff" }}>
                    {authenticate.lastName || "User"}
                    <span
                      className="fa fa-chevron-down dropdown-caret"
                      style={{ marginLeft: "10px" }}
                    ></span>
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={logoutUser}>Logout</DropdownItem>
                    <DropdownItem onClick={() => history.push("/user/history")}>
                      History
                    </DropdownItem>
                    {user?.role === "ROLE_MERCHANT" && (
                      <DropdownItem
                        onClick={() => history.push("/user/order-management")}
                      >
                        Order Merchant
                      </DropdownItem>
                    )}
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

const RenderMenuItem = (props) => {
  const history = useHistory();
  const onClick = () => {
    history.push(`/${props?.slug}`);
  };

  return (
    <li onClick={onClick} className={` menu-hover ${props.propClassName}`}>
      {props.itemInfo?.name}
    </li>
  );
};

export { Header, RenderMenuItem };
