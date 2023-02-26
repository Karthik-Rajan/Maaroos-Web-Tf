import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel3";
import TopSearch from "./home/TopSearch";
import ProductBox from "./home/ProductBox";
import CardItem from "./common/CardItem";
import SectionHeading from "./common/SectionHeading";
import FontAwesome from "./common/FontAwesome";
import { Image } from "react-bootstrap";

function Index() {
  return (
    <>
      <TopSearch />
      <section className="section pt-5 pb-5 bg-white homepage-add-section">
        <Container>
          <SectionHeading
            heading="Enjoy Food in Simple Steps"
            subHeading=""
          />
          <Row>
            <Col md={4} xs={12}>
              <Image
                fluid
                alt="Recharge Wallet"
                src="img/steps/eWallet.jpg"
              />
              <h5 className="text-center stepTitle">Recharge Wallet</h5>
            </Col>
            <Col md={4} xs={12}>
              <Image
                fluid
                alt="Schedule & Subscribe"
                src="img/steps/schedule.jpg"
              />
              <h5 className="text-center stepTitle">Schedule & Subscribe</h5>
            </Col>
            <Col md={4} xs={12}>
              <Image
                fluid
                alt="Delivery at Door"
                src="img/steps/deliver.jpg"
              />
              <h5 className="text-center stepTitle">Doorstep Delivery</h5>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section pt-5 pb-5 products-section">
        <Container>
          <SectionHeading
            heading="Popular Brands"
            subHeading="Top restaurants, cafes, pubs, and bars in Ludhiana, based on trends"
          />
          <Row>
            <Col md={12}>
              <OwlCarousel
                // nav
                // loop
                {...options}
                className="owl-carousel-four owl-theme"
              >
                <div className="item">
                  <CardItem
                    title="World Famous"
                    subTitle="North Indian • American • Pure veg"
                    imageAlt="Product"
                    image="img/list/1.png"
                    imageClass="img-fluid item-img"
                    linkUrl="detail"
                    offerText="65% off | Use Coupon OSAHAN50"
                    time="20–25 min"
                    price="$250 FOR TWO"
                    showPromoted={true}
                    promotedVariant="dark"
                    favIcoIconColor="text-danger"
                    rating="3.1 (300+)"
                  />
                </div>
                <div className="item">
                  <CardItem
                    title="Bite Me Sandwiches"
                    subTitle="North Indian • American • Pure veg"
                    imageAlt="Product"
                    image="img/list/3.png"
                    imageClass="img-fluid item-img"
                    linkUrl="detail"
                    offerText="65% off | Use Coupon OSAHAN50"
                    time="15–25 min"
                    price="$100 FOR TWO"
                    showPromoted={true}
                    promotedVariant="dark"
                    favIcoIconColor="text-danger"
                    rating="3.1 (300+)"
                  />
                </div>
                <div className="item">
                  <CardItem
                    title="The osahan Restaurant"
                    subTitle="North Indian • American • Pure veg"
                    imageAlt="Product"
                    image="img/list/6.png"
                    imageClass="img-fluid item-img"
                    linkUrl="detail"
                    offerText="65% off | Use Coupon OSAHAN50"
                    time="20–25 min"
                    price="$500 FOR TWO"
                    showPromoted={true}
                    promotedVariant="danger"
                    favIcoIconColor="text-dark"
                    rating="3.1 (300+)"
                  />
                </div>
                <div className="item">
                  <CardItem
                    title="Polo Lounge"
                    subTitle="North Indian • American • Pure veg"
                    imageAlt="Product"
                    image="img/list/9.png"
                    imageClass="img-fluid item-img"
                    linkUrl="detail"
                    offerText="65% off | Use Coupon OSAHAN50"
                    time="20–25 min"
                    price="$250 FOR TWO"
                    showPromoted={true}
                    promotedVariant="dark"
                    favIcoIconColor="text-danger"
                    rating="3.1 (300+)"
                  />
                </div>
              </OwlCarousel>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="section pt-5 pb-5 bg-white becomemember-section border-bottom">
        <Container>
          <SectionHeading
            heading="Become a Member"
            subHeading="Lorem Ipsum is simply dummy text of"
          />
          <Row>
            <Col sm={12} className="text-center">
              <Link to="register" className="btn btn-success btn-lg">
                Create an Account <FontAwesome icon="chevron-circle-right" />
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

const options = {
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 2,
    },
    1000: {
      items: 4,
    },
    1200: {
      items: 4,
    },
  },

  lazyLoad: true,
  pagination: false.toString(),
  loop: true,
  dots: false,
  autoPlay: 2000,
  nav: true,
  navText: [
    "<i class='fa fa-chevron-left'></i>",
    "<i class='fa fa-chevron-right'></i>",
  ],
};

export default Index;
