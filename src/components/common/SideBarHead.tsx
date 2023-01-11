import React from "react";
import { Row, Col, Dropdown } from "react-bootstrap";

const SideBarHead = (props: any) => {
  return (
    <Row className="">
      {props.sideBar && (
        <Col md={3}>
          {/* <h4 className="font-weight-bold mt-0 mb-3">FILTERS</h4> */}
        </Col>
      )}
      <Col md={props.sideBar ? 5 : 8}>
        <h4 className="font-weight-bold mt-0 mb-3">
          VENDORS{" "}
          <small className="h6 mb-0 ml-2">
            Total : {props.listLength + ` `}
          </small>
        </h4>
      </Col>
      <Col md={4}>
        <Dropdown className="float-right">
          <span
            className="applyFilter"
            onClick={() => {
              props.onClose(!props.sideBar);
            }}
          >
            {props.sideBar ? `Hide` : `Show`} Filters
          </span>
          <Dropdown.Toggle variant="outline-info">
            Sort by: <span className="text-theme">Distance</span> &nbsp;&nbsp;
          </Dropdown.Toggle>
          <Dropdown.Menu className="dropdown-menu-right shadow-sm border-0">
            <Dropdown.Item href="#/distance">Distance</Dropdown.Item>
            <Dropdown.Item href="#/no-of-coupons">No Of Offers</Dropdown.Item>
            <Dropdown.Item href="#/rating">Rating</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Col>
    </Row>
  );
};

export default SideBarHead;
