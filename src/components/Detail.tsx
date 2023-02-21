import React, { useState, useEffect, useRef } from "react";
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
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import ItemsCarousel from "./common/ItemsCarousel";
import GalleryCarousel from "./common/GalleryCarousel";
import BestSeller from "./common/BestSeller";
import QuickBite from "./common/QuickBite";
import StarRating from "./common/StarRating";
import RatingBar from "./common/RatingBar";
import Review from "./common/Review";
import Icofont from "react-icofont";
import { connect } from "react-redux";
import { vendorDetailSkeleton } from "./skeletons";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import NoAccess from "./NoAccess";
import dayjs from 'dayjs';
import { CalendarInput, Types, TypesName } from "../constants/types";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { useForm } from 'react-hook-form';


let reload = 0;

const Detail = (props: any) => {

  const { dispatch, vendorDetail, isAuthenticated } = props;
  let { vId } = useParams();

  const todayFrom = dayjs().startOf('month').format('YYYY-MM-DD 00:00:00');
  const todayTo = dayjs().endOf('month').format('YYYY-MM-DD 23:59:59');
  const minDate = dayjs().add(1, 'week').format('YYYY-MM-DD');
  const maxDate = dayjs(minDate).add(2, 'weeks').format('YYYY-MM-DD');
  const scheduleForm = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [detail, setDetail] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [calendarInput, setCalendarInput] = useState<CalendarInput>({ from: todayFrom, to: todayTo, types: [] });
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [section, setSection] = useState('listing');
  const reviewUser = [];
  const [users] = useState([]);
  const [foodTypes, setFoodTypes] = useState<string[]>([]);
  const [fromDate, setFromDate] = useState<any>('');
  const [toDate, setToDate] = useState<any>('');

  useEffect(() => {
    if (reload === 0) dispatch({ type: "DETAIL", payload: { vId } });

    if (reload === 1) dispatch({ type: "MY_CALENDAR", payload: { ...calendarInput, vId } });

    reload++;
  }, [reload]);

  useEffect(() => {
    vendorDetail.then((res: any) => {
      if (res && res.type === 'DETAIL') {
        setDetail(res.detail);
        if (res && res.detail) {
          reviewUser.push({
            name: res.detail.first_name,
            image: res.detail.profile_img,
            url: "#",
          });
        }

        setIsLoading(false);
      }
    });
  }, [reload]);

  const getQty = ({ id, quantity }: any) => {
  };
  const getStarValue = ({ value }: any) => {
  };

  const renderEventContent = (eventContent: any) => {
    let { title } = eventContent.event;
    const { timeText } = eventContent
    const fullTitle = title === Types.BF ? 'Breakfast' : (title === Types.LN ? 'Lunch' : 'Dinner');
    return (
      <>
        <i className={title + `-title`}>{fullTitle + ` (` + timeText + `m)`}</i>
      </>
    )
  }

  const setFilterInput = (type: Types) => {
    let updatedInputs = calendarInput;
    if (calendarInput.types.includes(type)) {
      delete calendarInput.types[calendarInput.types.indexOf(type)];
      updatedInputs = { ...calendarInput }
    }
    else {
      updatedInputs = { ...calendarInput, types: [...calendarInput.types, type] };
    }
    setCalendarInput({ ...updatedInputs });
    dispatch({
      type: "MY_CALENDAR",
      payload: { ...updatedInputs, vId },
    });
  }

  const onScheduleSubmit = (data: any) => {
    console.log(data);
    console.log(errors)
  }

  return (
    <>
      {isLoading && vendorDetailSkeleton}
      {!isLoading && detail && (
        <div>
          <section className="restaurant-detailed-banner">
            <div className="text-center">
              <Image fluid className="cover" src={detail.logo_url} />
            </div>
            <div className="restaurant-detailed-header">
              <Container>
                <Row className="d-flex align-items-end">
                  <Col md={8}>
                    <div className="restaurant-detailed-header-left">
                      <Image
                        fluid
                        className="mr-3 float-left"
                        alt="osahan"
                        src={detail.logo_url}
                      />
                      <h2 className="text-white">{detail.name}</h2>
                      <p className="text-white mb-1">
                        <Icofont icon="location-pin" /> {detail.address}{" "}
                        <Badge variant="success">OPEN</Badge>
                      </p>
                      <p className="text-white mb-0">
                        <Icofont icon="food-cart" /> North Indian, Chinese, Fast
                        Food, South Indian
                      </p>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="restaurant-detailed-header-right text-right">
                      <Button variant="success" type="button">
                        <Icofont icon="clock-time" /> 25–35 min
                      </Button>
                      <h6 className="text-white mb-0 restaurant-detailed-ratings">
                        <span className="generator-bg rounded text-white">
                          <Icofont icon="star" /> {detail.rating_avg}
                        </span>{" "}
                        {detail.rating_count} Ratings
                        <Icofont icon="speech-comments" className="ml-3" /> 91
                        reviews
                      </h6>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </section>

          <Tab.Container defaultActiveKey="zero">
            <section className="offer-dedicated-nav bg-white border-top-0 shadow-sm">
              <Container>
                <Row>
                  <Col md={12}>
                    <span className="restaurant-detailed-action-btn float-right">
                      <Button
                        variant="light"
                        size="sm"
                        className="border-light-btn mr-1"
                        type="button"
                      >
                        <Icofont icon="heart" className="text-danger" /> Mark as
                        Favourite
                      </Button>
                      <Button
                        variant="light"
                        size="sm"
                        className="border-light-btn mr-1"
                        type="button"
                      >
                        <Icofont icon="cauli-flower" className="text-success" />{" "}
                        {detail.is_veg ? "PURE VEG" : ""}
                      </Button>
                      <Button variant="outline-danger" size="sm" type="button">
                        <Icofont icon="sale-discount" /> OFFERS
                      </Button>
                    </span>
                    <Nav id="pills-tab">
                      <Nav.Item>
                        <Nav.Link eventKey="zero">My Calendar</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="first">Order Online</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">Gallery</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="third">Restaurant Info</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="fourth">Book A Table</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="fifth">Ratings & Reviews</Nav.Link>
                      </Nav.Item>
                    </Nav>
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
                        <Tab.Pane eventKey="zero">
                          {/* <Row> */}
                          {/* {isAuthenticated && ( */}
                          <FullCalendar
                            plugins={[
                              dayGridPlugin,
                              timeGridPlugin,
                              interactionPlugin,
                            ]}
                            eventBackgroundColor={'white'}
                            headerToolbar={{
                              left: "prev,next today",
                              center: "title",
                              right: "dayGridMonth,timeGridWeek,timeGridDay",
                            }}
                            initialView="dayGridMonth"
                            editable={true}
                            lazyFetching={true}
                            selectable={true}
                            selectMirror={true}
                            dayMaxEvents={true}
                            weekends={true}
                            themeSystem={"bootstrap5"}
                            dayHeaders={true}
                            events={() => {
                              return vendorDetail.then((data: any) => {
                                if (data.type === 'MY_CALENDAR') {
                                  return data.detail;
                                }
                                return [];
                              })
                            }}
                            select={() => {
                              setSection('addEvent');
                              setFromDate(minDate);
                              setToDate(minDate);
                            }}
                            eventContent={renderEventContent} // custom render function
                            eventClick={() => {
                              console.log("eventClick");
                            }}
                            eventsSet={() => {

                            }} // called after events are initialized/added/changed/removed
                          /* you can update a remote database when these fire:
      eventAdd={function(){}}
      eventChange={function(){}}
      eventRemove={function(){}}
      */
                          />
                          {/* )} */}
                          {/* {!isAuthenticated && ( */}
                          {/* <NoAccess detailPage={true} showModal={showModal} /> */}
                          {/* )} */}
                        </Tab.Pane>
                        <Tab.Pane eventKey="first">
                          <h5 className="mb-4">Recommended</h5>
                          <Form className="explore-outlets-search mb-4">
                            <InputGroup>
                              <Form.Control
                                type="text"
                                placeholder="Search for dishes..."
                              />
                              <InputGroup.Append>
                                <Button type="button" variant="link">
                                  <Icofont icon="search" />
                                </Button>
                              </InputGroup.Append>
                            </InputGroup>
                          </Form>
                          <h6 className="mb-3">
                            Most Popular{" "}
                            <Badge variant="success">
                              {" "}
                              <Icofont icon="tags" /> 15% Off All Items{" "}
                            </Badge>
                          </h6>
                          <ItemsCarousel />

                          <Row>
                            <h5 className="mb-4 mt-3 col-md-12">
                              Best Sellers
                            </h5>
                            <Col md={4} sm={6} className="mb-4">
                              <BestSeller
                                id={1}
                                title="World Famous"
                                subTitle="North Indian • American • Pure veg"
                                imageAlt="Product"
                                image="img/list/1.png"
                                imageClass="img-fluid item-img"
                                price={250}
                                priceUnit="$"
                                isNew={true}
                                showPromoted={true}
                                promotedVariant="dark"
                                favIcoIconColor="text-danger"
                                rating="3.1 (300+)"
                                getValue={getQty}
                              />
                            </Col>

                            <Col md={4} sm={6} className="mb-4">
                              <BestSeller
                                id={2}
                                title="The osahan Restaurant"
                                subTitle="North Indian • American • Pure veg"
                                imageAlt="Product"
                                image="img/list/6.png"
                                imageClass="img-fluid item-img"
                                price={250}
                                priceUnit="$"
                                qty={1}
                                showPromoted={true}
                                promotedVariant="dark"
                                favIcoIconColor="text-danger"
                                rating="3.1 (300+)"
                                getValue={getQty}
                              />
                            </Col>

                            <Col md={4} sm={6} className="mb-4">
                              <BestSeller
                                id={3}
                                title="Bite Me Sandwiches"
                                subTitle="North Indian • American • Pure veg"
                                imageAlt="Product"
                                image="img/list/3.png"
                                imageClass="img-fluid item-img"
                                price={250}
                                priceUnit="$"
                                showPromoted={true}
                                promotedVariant="dark"
                                favIcoIconColor="text-danger"
                                rating="3.1 (300+)"
                                getValue={getQty}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <h5 className="mb-4 mt-3 col-md-12">
                              Quick Bites{" "}
                              <small className="h6 text-black-50">
                                3 ITEMS
                              </small>
                            </h5>
                            <Col md={12}>
                              <div className="bg-white rounded border shadow-sm mb-4">
                                <QuickBite
                                  id={1}
                                  title="Chicken Tikka Sub"
                                  price={250}
                                  priceUnit="$"
                                  getValue={getQty}
                                />
                                <QuickBite
                                  id={2}
                                  title="Cheese corn Roll"
                                  price={600}
                                  showBadge={true}
                                  badgeText="BEST SELLER"
                                  qty={1}
                                  priceUnit="$"
                                  getValue={getQty}
                                />
                                <QuickBite
                                  id={3}
                                  title="Chicken Tikka Sub"
                                  price={250}
                                  showBadge={true}
                                  badgeText="Pure Veg"
                                  badgeVariant="success"
                                  qty={2}
                                  priceUnit="$"
                                  getValue={getQty}
                                />
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <h5 className="mb-4 mt-3 col-md-12">
                              Starters{" "}
                              <small className="h6 text-black-50">
                                3 ITEMS
                              </small>
                            </h5>
                            <Col md={12}>
                              <div className="bg-white rounded border shadow-sm mb-4">
                                <QuickBite
                                  id={1}
                                  itemClass="menu-list"
                                  image="/img/5.jpg"
                                  title="Chicken Tikka Sub"
                                  price={250}
                                  priceUnit="$"
                                  getValue={getQty}
                                />
                                <QuickBite
                                  id={2}
                                  itemClass="menu-list"
                                  title="Cheese corn Roll"
                                  image="/img/2.jpg"
                                  price={600}
                                  showBadge={true}
                                  badgeText="BEST SELLER"
                                  qty={1}
                                  priceUnit="$"
                                  getValue={getQty}
                                />
                                <QuickBite
                                  id={3}
                                  itemClass="menu-list"
                                  image="/img/3.jpg"
                                  title="Chicken Tikka Sub"
                                  price={250}
                                  showBadge={true}
                                  badgeText="Pure Veg"
                                  badgeVariant="success"
                                  priceUnit="$"
                                  getValue={getQty}
                                />
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <h5 className="mb-4 mt-3 col-md-12">
                              Soups{" "}
                              <small className="h6 text-black-50">
                                8 ITEMS
                              </small>
                            </h5>
                            <Col md={12}>
                              <div className="bg-white rounded border shadow-sm">
                                <QuickBite
                                  id={1}
                                  title="Chicken Tikka Sub"
                                  price={250}
                                  priceUnit="$"
                                  getValue={getQty}
                                />
                                <QuickBite
                                  id={2}
                                  title="Cheese corn Roll"
                                  price={600}
                                  showBadge={true}
                                  badgeText="BEST SELLER"
                                  qty={1}
                                  priceUnit="$"
                                  getValue={getQty}
                                />
                                <QuickBite
                                  id={3}
                                  title="Chicken Tikka Sub"
                                  price={250}
                                  showBadge={true}
                                  badgeText="Pure Veg"
                                  badgeVariant="success"
                                  priceUnit="$"
                                  getValue={getQty}
                                />
                                <QuickBite
                                  id={1}
                                  title="Chicken Tikka Sub"
                                  price={250}
                                  priceUnit="$"
                                  getValue={getQty}
                                />
                                <QuickBite
                                  id={2}
                                  title="Cheese corn Roll"
                                  price={600}
                                  showBadge={true}
                                  badgeText="BEST SELLER"
                                  priceUnit="$"
                                  getValue={getQty}
                                />
                                <QuickBite
                                  id={3}
                                  title="Chicken Tikka Sub"
                                  price={250}
                                  showBadge={true}
                                  badgeText="Pure Veg"
                                  badgeVariant="success"
                                  priceUnit="$"
                                  getValue={getQty}
                                />
                              </div>
                            </Col>
                          </Row>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                          <div className="position-relative">
                            <GalleryCarousel />
                          </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="third">
                          <div
                            id="restaurant-info"
                            className="bg-white rounded shadow-sm p-4 mb-4"
                          >
                            <div className="address-map float-right ml-5">
                              <div className="mapouter">
                                <div className="gmap_canvas">
                                  <iframe
                                    title="addressMap"
                                    width="300"
                                    height="170"
                                    id="gmap_canvas"
                                    src="https://maps.google.com/maps?q=university%20of%20san%20francisco&t=&z=9&ie=UTF8&iwloc=&output=embed"
                                    frameBorder="0"
                                    scrolling="no"
                                  ></iframe>
                                </div>
                              </div>
                            </div>
                            <h5 className="mb-4">Restaurant Info</h5>
                            <p className="mb-3">
                              Jagjit Nagar, Near Railway Crossing,
                              <br /> Near Model Town, Ludhiana, PUNJAB
                            </p>
                            <p className="mb-2 text-black">
                              <Icofont icon="phone-circle text-primary mr-2" />{" "}
                              +91 01234-56789, +91 01234-56789
                            </p>
                            <p className="mb-2 text-black">
                              <Icofont icon="email text-primary mr-2" />{" "}
                              iamosahan@gmail.com, osahaneat@gmail.com
                            </p>
                            <p className="mb-2 text-black">
                              <Icofont icon="clock-time text-primary mr-2" />{" "}
                              Today 11am – 5pm, 6pm – 11pm
                              <Badge variant="success" className="ml-1">
                                {" "}
                                OPEN NOW{" "}
                              </Badge>
                            </p>
                            <hr className="clearfix" />
                            <p className="text-black mb-0">
                              You can also check the 3D view by using our menue
                              map clicking here &nbsp;&nbsp;&nbsp;{" "}
                              <Link
                                className="text-info font-weight-bold"
                                to="#"
                              >
                                Venue Map
                              </Link>
                            </p>
                            <hr className="clearfix" />
                            <h5 className="mt-4 mb-4">More Info</h5>
                            <p className="mb-3">
                              Dal Makhani, Panneer Butter Masala, Kadhai Paneer,
                              Raita, Veg Thali, Laccha Paratha, Butter Naan
                            </p>
                            <div className="border-btn-main mb-4">
                              <Link
                                className="border-btn text-success mr-2"
                                to="#"
                              >
                                <Icofont icon="check-circled" /> Breakfast
                              </Link>
                              <Link
                                className="border-btn text-danger mr-2"
                                to="#"
                              >
                                <Icofont icon="close-circled" /> No Alcohol
                                Available
                              </Link>
                              <Link
                                className="border-btn text-success mr-2"
                                to="#"
                              >
                                <Icofont icon="check-circled" /> Vegetarian Only
                              </Link>
                              <Link
                                className="border-btn text-success mr-2"
                                to="#"
                              >
                                <Icofont icon="check-circled" /> Indoor Seating
                              </Link>
                              <Link
                                className="border-btn text-success mr-2"
                                to="#"
                              >
                                <Icofont icon="check-circled" /> Breakfast
                              </Link>
                              <Link
                                className="border-btn text-danger mr-2"
                                to="#"
                              >
                                <Icofont icon="close-circled" /> No Alcohol
                                Available
                              </Link>
                              <Link
                                className="border-btn text-success mr-2"
                                to="#"
                              >
                                <Icofont icon="check-circled" /> Vegetarian Only
                              </Link>
                            </div>
                          </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="fourth">
                          <div
                            id="book-a-table"
                            className="bg-white rounded shadow-sm p-4 mb-5 rating-review-select-page"
                          >
                            <h5 className="mb-4">Book A Table</h5>
                            <Form>
                              <Row>
                                <Col sm={6}>
                                  <Form.Group>
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Enter Full Name"
                                    />
                                  </Form.Group>
                                </Col>
                                <Col sm={6}>
                                  <Form.Group>
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Enter Email address"
                                    />
                                  </Form.Group>
                                </Col>
                              </Row>
                              <Row>
                                <Col sm={6}>
                                  <Form.Group>
                                    <Form.Label>Mobile number</Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Enter Mobile number"
                                    />
                                  </Form.Group>
                                </Col>
                                <Col sm={6}>
                                  <Form.Group>
                                    <Form.Label>Date And Time</Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Enter Date And Time"
                                    />
                                  </Form.Group>
                                </Col>
                              </Row>
                              <Form.Group className="text-right">
                                <Button variant="primary" type="button">
                                  {" "}
                                  Submit{" "}
                                </Button>
                              </Form.Group>
                            </Form>
                          </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="fifth">
                          <div
                            id="ratings-and-reviews"
                            className="bg-white rounded shadow-sm p-4 mb-4 clearfix restaurant-detailed-star-rating"
                          >
                            <div className="star-rating float-right">
                              <StarRating
                                fontSize={26}
                                star={5}
                                getValue={getStarValue}
                              />
                            </div>
                            <h5 className="mb-0 pt-1">Rate this Place</h5>
                          </div>
                          <div className="bg-white rounded shadow-sm p-4 mb-4 clearfix graph-star-rating">
                            <h5 className="mb-0 mb-4">Ratings and Reviews</h5>
                            <div className="graph-star-rating-header">
                              <div className="star-rating">
                                <StarRating
                                  fontSize={18}
                                  disabled={true}
                                  star={5}
                                  getValue={getStarValue}
                                />
                                <b className="text-black ml-2">334</b>
                              </div>
                              <p className="text-black mb-4 mt-2">
                                Rated 3.5 out of 5
                              </p>
                            </div>
                            <div className="graph-star-rating-body">
                              <RatingBar leftText="5 Star" barValue={56} />
                              <RatingBar leftText="4 Star" barValue={23} />
                              <RatingBar leftText="3 Star" barValue={11} />
                              <RatingBar leftText="2 Star" barValue={6} />
                              <RatingBar leftText="1 Star" barValue={4} />
                            </div>
                            <div className="graph-star-rating-footer text-center mt-3 mb-3">
                              <Button
                                type="button"
                                variant="outline-primary"
                                size="sm"
                              >
                                Rate and Review
                              </Button>
                            </div>
                          </div>
                          <div className="bg-white rounded shadow-sm p-4 mb-4 restaurant-detailed-ratings-and-reviews">
                            <Link
                              to="#"
                              className="btn btn-outline-primary btn-sm float-right"
                            >
                              Top Rated
                            </Link>
                            <h5 className="mb-1">All Ratings and Reviews</h5>
                            <Review
                              image="/img/user/1.png"
                              ImageAlt=""
                              ratingStars={5}
                              Name="Singh Osahan"
                              profileLink="#"
                              reviewDate="Tue, 20 Mar 2020"
                              reviewText="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classNameical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classNameical literature, discovered the undoubtable source. Lorem Ipsum comes from sections"
                              likes="856M"
                              dislikes="158K"
                              otherUsers={users}
                            />
                            <hr />
                            <Review
                              image="/img/user/6.png"
                              ImageAlt=""
                              ratingStars={5}
                              Name="Gurdeep Osahan"
                              profileLink="#"
                              reviewDate="Tue, 20 Mar 2020"
                              reviewText="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."
                              likes="88K"
                              dislikes="1K"
                              otherUsers={users}
                            />
                            <hr />
                            <Link
                              className="text-center w-100 d-block mt-4 font-weight-bold"
                              to="#"
                            >
                              See All Reviews
                            </Link>
                          </div>
                          <div className="bg-white rounded shadow-sm p-4 mb-5 rating-review-select-page">
                            <h5 className="mb-4">Leave Comment</h5>
                            <p className="mb-2">Rate the Place</p>
                            <div className="mb-4">
                              <div className="star-rating">
                                <StarRating
                                  fontSize={26}
                                  star={5}
                                  getValue={getStarValue}
                                />
                              </div>
                            </div>
                            <Form>
                              <Form.Group>
                                <Form.Label>Your Comment</Form.Label>
                                <Form.Control as="textarea" />
                              </Form.Group>
                              <Form.Group>
                                <Button
                                  variant="primary"
                                  size="sm"
                                  type="button"
                                >
                                  {" "}
                                  Submit Comment{" "}
                                </Button>
                              </Form.Group>
                            </Form>
                          </div>
                        </Tab.Pane>
                      </Tab.Content>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="bg-white rounded shadow-sm text-white mb-4 p-4 clearfix restaurant-detailed-earn-pts card-icon-overlap">
                      {section === 'listing' && <div className="border-btn-main mb-4">
                        <h5 className="mb-4">Select Types</h5>
                        <Link className={calendarInput.types.includes(Types.BF) ? `border-btn mr-2 greenFilter` : 'border-btn mr-2 grayFilter'} to="#" onClick={() => {
                          setFilterInput(Types.BF);
                        }}>
                          <Icofont icon={calendarInput.types.includes(Types.BF) ? `check-circled` : `close-circled`} /> Breakfast
                        </Link>
                        <Link className={calendarInput.types.includes(Types.LN) ? `border-btn mr-2 greenFilter` : 'border-btn mr-2 grayFilter'} to="#" onClick={() => {
                          setFilterInput(Types.LN);
                        }}>
                          <Icofont icon={calendarInput.types.includes(Types.LN) ? `check-circled` : `close-circled`} /> Lunch
                        </Link>
                        <Link className={calendarInput.types.includes(Types.DR) ? `border-btn mr-2 greenFilter` : 'border-btn mr-2 grayFilter'} to="#" onClick={() => {
                          setFilterInput(Types.DR);
                        }}>
                          <Icofont icon={calendarInput.types.includes(Types.DR) ? `check-circled` : `close-circled`} /> Dinner
                        </Link>
                      </div>
                      }
                      {section === 'addEvent' && <div>
                        <h5 className="mb-4">Add Schedule</h5>
                        <Form ref={scheduleForm} id="scheduleForm" onSubmit={handleSubmit(onScheduleSubmit)}>
                          <Row>
                            <Col sm={6}>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <MobileDatePicker
                                  minDate={minDate}
                                  maxDate={maxDate}
                                  disablePast
                                  label="From Date"
                                  value={fromDate}
                                  onChange={(newValue) => {
                                    setFromDate(newValue);
                                  }}
                                  renderInput={(params) => <TextField {...params} {...register("fromDate", {
                                    required: `From date is required`,
                                  })} />}
                                />
                              </LocalizationProvider>
                            </Col>
                            <Col sm={6}>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <MobileDatePicker
                                  minDate={minDate}
                                  maxDate={maxDate}
                                  disablePast
                                  label="To Date"
                                  value={toDate}
                                  onChange={(newValue) => {
                                    setToDate(newValue);
                                  }}
                                  renderInput={(params) => <TextField {...params} {...register("toDate", {
                                    required: `To date is required`,
                                  })} />}
                                />
                              </LocalizationProvider>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col sm={12}>
                              <FormControl className="foodTypeMultiSelector">
                                <InputLabel id="foodTypeLabel">Select Food Types</InputLabel>
                                <Select
                                  multiple={true}
                                  value={foodTypes}
                                  onChange={(event) => {
                                    const { target: { value } } = event;
                                    setFoodTypes(
                                      typeof value === 'string' ? value.split(',') : value,
                                    );
                                  }}
                                // {...register("foodTypeMulti", {
                                //   required: `From date is required`,
                                // })}
                                >
                                  <MenuItem key={Types.BF} value={Types.BF}>{TypesName.BF}</MenuItem>
                                  <MenuItem key={Types.LN} value={Types.LN}>{TypesName.LN}</MenuItem>
                                  <MenuItem key={Types.DR} value={Types.DR}>{TypesName.DR}</MenuItem>
                                </Select>
                              </FormControl>
                            </Col>
                          </Row>
                          <br />
                          <Form.Group className="text-left cancelSchedule">
                            <Button variant="outline-primary" type="button" onClick={() => {
                              setSection(`listing`);
                            }}>
                              {" "}
                              Cancel{" "}
                            </Button>
                          </Form.Group>
                          <Form.Group className="text-right">
                            <Button variant="primary" type="submit">
                              {" "}
                              Add Schedule{" "}
                            </Button>
                          </Form.Group>
                          {console.log(errors)}
                        </Form>
                      </div>
                      }
                    </div>
                    {/* <div className="bg-white rounded shadow-sm text-white mb-4 p-4 clearfix restaurant-detailed-earn-pts card-icon-overlap">
                      <Image
                        fluid
                        className="float-left mr-3"
                        src="/img/earn-score-icon.png"
                      />
                      <h6 className="pt-0 text-primary mb-1 font-weight-bold">
                        OFFER
                      </h6>
                      <p className="mb-0">
                        60% off on orders above $99 | Use coupon{" "}
                        <span className="text-danger font-weight-bold">
                          OSAHAN50
                        </span>
                      </p>
                      <div className="icon-overlap">
                        <Icofont icon="sale-discount" />
                      </div>
                    </div>
                    <div className="generator-bg rounded shadow-sm mb-4 p-4 osahan-cart-item">
                      <h5 className="mb-1 text-white">Your Order</h5>
                      <p className="mb-4 text-white">6 Items</p>
                      <div className="bg-white rounded shadow-sm mb-2">
                        <CheckoutItem
                          itemName="Chicken Tikka Sub"
                          price={314}
                          priceUnit="$"
                          id={1}
                          qty={2}
                          show={true}
                          minValue={0}
                          maxValue={7}
                          getValue={getQty}
                        />
                        <CheckoutItem
                          itemName="Cheese corn Roll"
                          price={260}
                          priceUnit="$"
                          id={2}
                          qty={1}
                          show={true}
                          minValue={0}
                          maxValue={7}
                          getValue={getQty}
                        />
                        <CheckoutItem
                          itemName="Mixed Veg"
                          price={122}
                          priceUnit="$"
                          id={3}
                          qty={1}
                          show={true}
                          minValue={0}
                          maxValue={7}
                          getValue={getQty}
                        />
                        <CheckoutItem
                          itemName="Black Dal Makhani"
                          price={652}
                          priceUnit="$"
                          id={1}
                          qty={1}
                          show={true}
                          minValue={0}
                          maxValue={7}
                          getValue={getQty}
                        />
                        <CheckoutItem
                          itemName="Mixed Veg"
                          price={122}
                          priceUnit="$"
                          id={4}
                          qty={1}
                          show={true}
                          minValue={0}
                          maxValue={7}
                          getValue={getQty}
                        />
                      </div>
                      <div className="mb-2 bg-white rounded p-2 clearfix">
                        <Image
                          fluid
                          className="float-left"
                          src="/img/wallet-icon.png"
                        />
                        <h6 className="font-weight-bold text-right mb-2">
                          Subtotal : <span className="text-danger">$456.4</span>
                        </h6>
                        <p className="seven-color mb-1 text-right">
                          Extra charges may apply
                        </p>
                        <p className="text-black mb-0 text-right">
                          You have saved $955 on the bill
                        </p>
                      </div>
                      <Link
                        to="/thanks"
                        className="btn btn-success btn-block btn-lg"
                      >
                        Checkout
                        <Icofont icon="long-arrow-right" />
                      </Link>
                      <div className="pt-2"></div>
                      <div className="alert alert-success" role="alert">
                        You have saved <strong>$1,884</strong> on the bill
                      </div>
                      <div className="pt-2"></div>
                      <div className="text-center pt-2">
                        <Image
                          fluid
                          src="https://dummyimage.com/352x504/ccc/ffffff.png&text=Google+ads"
                        />
                      </div>
                      <div className="text-center pt-2">
                        <Image
                          fluid
                          src="https://dummyimage.com/352x504/ccc/ffffff.png&text=Google+ads"
                        />
                      </div>
                    </div> */}
                  </Col>
                </Row>
              </Container>
            </section>
          </Tab.Container>
        </div>
      )
      }
    </>
  );
};

function mapStateToProps(state: any) {
  console.log(state);
  return {
    vendorDetail: state.vendor,
  };
}
export default connect<any>(mapStateToProps)(Detail);
