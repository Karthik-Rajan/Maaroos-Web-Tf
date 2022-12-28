import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { Link, useParams } from "react-router-dom";
import {
  Row,
  Col,
  Container,
  Form,
  InputGroup,
  Button,
  Tab,
  Nav,
  Image,
  Badge,
} from "react-bootstrap";
import ItemsCarousel from "../common/ItemsCarousel";
import GalleryCarousel from "../common/GalleryCarousel";
import CheckoutItem from "../common/CheckoutItem";
import BestSeller from "../common/BestSeller";
import QuickBite from "../common/QuickBite";
import StarRating from "../common/StarRating";
import RatingBar from "../common/RatingBar";
import Review from "../common/Review";
import Icofont from "react-icofont";
import _ from "lodash";
const imageBannerSkeleton = <Skeleton width={800} height={400} />;
const nameSkeleton = <Skeleton width={80} />;
const descSkeleton = <Skeleton width={150} height={50} />;
const fullDescSkeleton = <Skeleton width={700} height={70} />;
const paragraphSkeleton = <Skeleton width={500} height={100} />;
const smBoxSkeleton = <Skeleton width={300} height={300} />;
const vsmBoxSkeleton = <Skeleton width={150} height={150} />;
const lgVerticalSkeleton = (
  <Skeleton variant="rectangular" width={300} height={350} />
);
const vendorDetailSkeleton = (
  <div>
    <section className="restaurant-detailed-banner">
      <div className="text-center">
        <Skeleton width={100} height={400}>
          <Image fluid className="cover" src="#" />
        </Skeleton>
      </div>
      <div className="restaurant-detailed-header">
        <Container>
          <Row className="d-flex align-items-end">
            <Col md={8}>
              <div className="restaurant-detailed-header-left">
                {vsmBoxSkeleton}
                <p className="text-white mb-1">
                  <Icofont icon="location-pin" /> {nameSkeleton}{" "}
                  <Badge variant="success">{nameSkeleton}</Badge>
                </p>
                <p className="text-white mb-0">
                  <Icofont icon="food-cart" /> {descSkeleton}
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="restaurant-detailed-header-right text-right"></div>
            </Col>
          </Row>
        </Container>
      </div>
    </section>

    <Tab.Container defaultActiveKey="first">
      <section className="offer-dedicated-nav bg-white border-top-0 shadow-sm">
        <Container>
          <Row>
            <Col md={12}>
              <span className="restaurant-detailed-action-btn float-right">
                {descSkeleton}
              </span>
              {descSkeleton}
            </Col>
          </Row>
        </Container>
      </section>
      <section className="offer-dedicated-body pt-2 pb-2 mt-4 mb-4">
        <Container>
          <Row>
            <Col md={8}>
              <div className="offer-dedicated-body-left">
                <Tab.Content className="h-100">
                  <Tab.Pane eventKey="first">
                    <Row>
                      <h5 className="mb-4">{nameSkeleton}</h5>
                      {fullDescSkeleton}
                      {paragraphSkeleton}
                    </Row>

                    <Row>
                      <h5 className="mb-4">{nameSkeleton}</h5>
                      {fullDescSkeleton}
                      {paragraphSkeleton}
                    </Row>
                    <Row>
                      <h5 className="mb-4">{nameSkeleton}</h5>
                      {fullDescSkeleton}
                      {paragraphSkeleton}
                    </Row>
                  </Tab.Pane>
                </Tab.Content>
              </div>
            </Col>
            <Col md={4}>
              {smBoxSkeleton}
              {lgVerticalSkeleton}
            </Col>
          </Row>
        </Container>
      </section>
    </Tab.Container>
  </div>
);

export { vendorDetailSkeleton };
