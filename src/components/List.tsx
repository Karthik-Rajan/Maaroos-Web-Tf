import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import CategoriesCarousel from "./common/CategoriesCarousel";
import ProductItems from "./common/ProductItems";
import SideBarHead from "./common/SideBarHead";
import SideBarFilter from "./common/SideBarFilter";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

let input = {};

let location = {};
let reload = 0;

function List(props: any) {
  let [list, setList] = useState([]);
  let [sideBar, setSideBar] = useState(true);
  let [loading, setLoading] = useState(true);
  let [search, setSearch] = useState(input);

  const loc = useLocation();

  const callVendorList = async () => {
    setLoading(true);

    input = { ...input, ...search };
    let payload = { location, search: input };

    props.dispatch({
      type: "LOCATION",
      payload,
    });
  };
  const q: any = new URLSearchParams(loc.search).get("q");

  useEffect(() => {
    props.vendor
      .then((res: any) => {
        console.log(`VENDOR res`, res);
        setList(res.list);
        setLoading(false);
        location = res.location;
        // if (input) {
        //   console.log("setting", q);
        //   setSearch({ ...input });
        // }
        input = res.search;
      })
      .catch((err: any) => {
        console.log("Error on Listing Page", err);
        setList([]);
        setLoading(false);
      });

    console.log(q);
    const coOrds = q ? q.split(",") : null;
    if (coOrds) {
      input = {
        ...input,
        lat: parseFloat(coOrds[0]),
        lng: parseFloat(coOrds[1]),
      };
      setSearch(input);
      callVendorList();
    }
    if (reload === 0) {
      reload++;
    }
  }, [reload]);

  const onApplyFilter = async () => {
    console.log("Filters", search);
    callVendorList();
    reload++;
  };

  const onFilter = (params: any) => {
    setSearch({ ...search, ...params });
  };

  const toggleSideBar = (value: boolean) => {
    if (!sideBar === value) {
      setSideBar(value);
    }
  };

  const resetFilters = () => {
    setSearch({ ...search });
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
            listLength={list.length}
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

function mapStateToProps(state: any) {
  return {
    vendor: state.vendor,
  };
}
export default connect(mapStateToProps)(List);
