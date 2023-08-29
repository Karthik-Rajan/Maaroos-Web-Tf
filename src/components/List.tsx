import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import CategoriesCarousel from "./common/CategoriesCarousel";
import ProductItems from "./common/ProductItems";
import SideBarHead from "./common/SideBarHead";
import SideBarFilter from "./common/SideBarFilter";
import { connect, useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { FETCH_VENDOR_REQUEST, LOCATION, SET_LOCATION } from "../constants/vendor";
import { vendorList } from "../actions/api";

let input = {};

let location = {};
let reload = 0;

function List(props: any) {
  // let [list, setList] = useState([]);
  let [sideBar, setSideBar] = useState(true);
  // let [loading, setLoading] = useState(true);
  // let [search, setSearch] = useState(input);

  const dispatch = useDispatch();
  const { detail, list, location, myCalendar, reviews, search, loading } = useSelector((state: any) => state.vendor);
  console.log({ detail, list, location, myCalendar, reviews, search, loading });

  const loc = useLocation();

  const callVendorList = async () => {
    dispatch({ type: FETCH_VENDOR_REQUEST })
    vendorList(search).then((res) => {
      console.log(res);
      dispatch({ type: LOCATION, payload: { list: res, loading: false } }
      )
    }
    ).catch(() => dispatch({ type: LOCATION, payload: { list: [], loading: false } }));
    dispatch({
      type: "LOCATION",
      payload: search
    });
  };

  useEffect(() => {
    callVendorList();
  }, [])

  useEffect(() => {
  }, [])

  const onApplyFilter = async () => {
    callVendorList();
  };

  const onFilter = (params: any) => {
    dispatch({ type: SET_LOCATION, payload: { ...search, ...params } })
  };

  const toggleSideBar = (value: boolean) => {
    if (!sideBar === value) {
      setSideBar(value);
    }
  };

  const resetFilters = () => {
    // setSearch({ ...search });
  };

  return (
    <>
      {sideBar && (
        <SideBarFilter
          onClose={toggleSideBar}
          filterList={list}
          onFilter={onFilter}
          onApply={onApplyFilter}
          resetFilters={resetFilters}
          className="mob-sideFilterBar"
        />
      )}

      <section className="section pt-1 pb-1">
        <Container fluid className="productListingContainer">
          <SideBarHead
            onClose={toggleSideBar}
            listLength={list ? list.length : 0}
            sideBar={sideBar}
            search={search}
          />
          <Row>
            <Col md={3}>
              <SideBarFilter
                onClose={false}
                filterList={list}
                onFilter={onFilter}
                onApply={onApplyFilter}
                resetFilters={resetFilters}
                className="desk-sideFilterBar"
              />
            </Col>
            <Col md={9}>
              <CategoriesCarousel />
              <ProductItems products={list} loading={loading} />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default List
