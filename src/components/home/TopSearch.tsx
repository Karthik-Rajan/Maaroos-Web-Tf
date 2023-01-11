import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import SearchBar from "../common/SearchBar";
import CategoriesCarousel from "../common/CategoriesCarousel";

function TopSearch() {
  return (
    <section className="pt-5 pb-5 homepage-search-block position-relative">
      <div className="banner-overlay"></div>
      <Container className="searchBanner">
        <Row className="d-flex align-items-center">
          <Col md={12}>
            <div className="homepage-search-title">
              <h1 className="mb-2 font-weight-normal">
                <span className="font-weight-bold">
                  Find Best Food Provider
                </span>{" "}
                in Your Local
              </h1>
              <h5 className="mb-5 text-secondary font-weight-normal">
                Lists of home food vendors, hotels, restaurants, cloud kitchens
                based on trends
              </h5>
            </div>
            <SearchBar />
            <h6 className="mt-4 text-shadow font-weight-normal">
              E.g. Curry, Egg, Sambar, Vada,...
            </h6>
            <CategoriesCarousel />
          </Col>
          {/* <Col md={4}>
            <div className="osahan-slider pl-4 pt-3">
              <OwlCarousel
                // nav
                // loop
                {...options2}
                className="homepage-ad owl-theme"
              >
                <div className="item">
                  <ProductBox
                    image="img/slider.png"
                    imageClass="img-fluid rounded"
                    imageAlt="carousel"
                    linkUrl="listing"
                  />
                </div>
                <div className="item">
                  <ProductBox
                    image="img/slider1.png"
                    imageClass="img-fluid rounded"
                    imageAlt="carousel"
                    linkUrl="listing"
                  />
                </div>
                <div className="item">
                  <ProductBox
                    image="img/slider.png"
                    imageClass="img-fluid rounded"
                    imageAlt="carousel"
                    linkUrl="listing"
                  />
                </div>
              </OwlCarousel>
            </div>
          </Col> */}
        </Row>
      </Container>
    </section>
  );
}

// const options2 = {
//   responsive: {
//     0: {
//       items: 2,
//     },
//     764: {
//       items: 2,
//     },
//     765: {
//       items: 1,
//     },
//     1200: {
//       items: 1,
//     },
//   },
//   lazyLoad: true,
//   loop: true,
//   autoplay: true,
//   autoplaySpeed: 1000,
//   dots: false,
//   autoplayTimeout: 2000,
//   nav: true,
//   navText: [
//     "<i class='fa fa-chevron-left'></i>",
//     "<i class='fa fa-chevron-right'></i>",
//   ],
//   autoplayHoverPause: true,
// };

export default TopSearch;
