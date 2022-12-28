import React from "react";
import { Row, Col, Button, Spinner } from "react-bootstrap";
import CardItem from "./CardItem";
import { vendorListSkeleton } from "../skeletons";
import { Image } from "react-bootstrap";

const ProductItems = (props: any) => {
  const products: any = [];
  {
    props.products.length &&
      props.products?.forEach((product: any) => {
        products.push(
          <Col md={3} sm={4} key={product.id} className="mb-4 pb-2">
            <CardItem
              title={product.name}
              subTitle={product.is_veg === "YES" ? "VEG" : "ALL"}
              imageAlt={product.name}
              image={product.logo_url || ""}
              imageClass="img-fluid item-img"
              linkUrl={product.id + `/detail`}
              offerText="65% off | Use Coupon OSAHAN50"
              time={"0.00"}
              price={"0.0"}
              showPromoted={product.is_promoted === "YES"}
              promotedVariant="dark"
              favIcoIconColor="text-danger"
              rating={product.rating_avg + " (" + product.rating_count + "+)"}
            />
          </Col>
        );
      });

    !props.products.length &&
      products.push(
        <React.Fragment key={1}>
          <Col md={4} sm={6} className="mb-12 pb-2"></Col>
          <Col md={4} sm={6} className="mb-12 pb-2 centerPadList">
            <h5>No results found</h5>
            <Image src="" />
          </Col>
          <Col md={4} sm={6} className="mb-12 pb-2"></Col>
        </React.Fragment>
      );
  }

  return (
    <Row>
      {!props.loading && products}
      {props.loading && vendorListSkeleton}

      {/* <Col md={12} className="text-center load-more">
        <Button variant="primary" type="button" disabled="">
          <Spinner animation="grow" size="sm" className="mr-1" />
          Loading...
        </Button>
      </Col> */}
    </Row>
  );
};

export default ProductItems;
