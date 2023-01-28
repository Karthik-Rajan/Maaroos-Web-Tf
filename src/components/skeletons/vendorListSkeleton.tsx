import React from "react";
import { Col } from "react-bootstrap";
import Skeleton from "@mui/material/Skeleton";
import CardItem from "../common/CardItem";

const vendorListSkeleton = [0, 1, 2, 3, 4, 5, 6, 7, 9, 10].map(
  (_n: any, i: any) => {
    return (
      <Col md={3} sm={4} key={i} className="mb-4 pb-2">
        <CardItem
          title={<Skeleton width={20} />}
          subTitle={<Skeleton />}
          imageAlt={false}
          image={<Skeleton variant="rectangular" height={135} />}
          imageClass="img-fluid item-img"
          linkUrl="#"
          offerText={false}
          time={false}
          price={false}
          showPromoted={false}
          promotedVariant="dark"
          favIcoIconColor={false}
          rating={false}
        />
      </Col>
    );
  }
);

export { vendorListSkeleton };
