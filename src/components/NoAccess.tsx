import React from "react";
import { Row, Col, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const NoAccess = (props: any) => {
  return (
    <section className="section pt-5 pb-5 osahan-not-found-page">
      <Container>
        <Row>
          <Col md={12} className="text-center pt-5 pb-5">
            <Image
              className="unauthorized-img"
              src="/img/unauthorized.png"
              alt="unauthorized access"
            />
            <h1 className="mt-2 mb-2">You`re Unauthorized</h1>
            <p>
              Uh-oh! Looks like the page you are trying to access, needs <br />
              authentication. Please{" "}
              <Link to="#" onClick={props.showModal}>
                LOGIN
              </Link>{" "}
              and try again.
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default NoAccess;
