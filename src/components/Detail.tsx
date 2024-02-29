import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Row,
  Col,
  Container,
  Button,
  Tab,
  Nav,
  Image,
  Badge,
} from "react-bootstrap";
import { Alert, Snackbar } from '@mui/material';
import GalleryCarousel from "./common/GalleryCarousel";
import StarRating from "./common/StarRating";
import RatingBar from "./common/RatingBar";
import Icofont from "react-icofont";
import { useDispatch, useSelector } from "react-redux";
import { vendorDetailSkeleton } from "./skeletons";
import dayjs from 'dayjs';
import { CalendarInput, Types } from "../constants/types";
import { useForm } from 'react-hook-form';
import Calendar from "./common/Calendar";
import BottomNavigation from "./common/BottomNavigation";
import AddCalendarModal from "./common/AddCalendarModal";
import CheckoutItem from "./common/CheckoutItem";
import { VendorReviews } from "./common/VendorReviews";
import { ADD_CALENDAR_REQUEST, ADD_CALENDAR_RESPONSE, ADD_REVIEW_REQUEST, FETCH_DETAIL_REQUEST, FETCH_DETAIL_RESPONSE, FETCH_MY_CALENDAR_RESPONSE, FETCH_REVIEW_RESPONSE } from "../constants/vendor";
import { addReview, addSchedule, fetchMySchedule, fetchReview, vendorDetail } from "../actions/api";
import { VendorInfo } from "./common/VendorInfo";
import VendorMenu from "./common/VendorMenu";
import { FavoriteBorderOutlined, FavoriteOutlined } from '@mui/icons-material';

const Detail = () => {
  let { vId } = useParams();
  const possibleMinDate = dayjs().add(1, 'week').format('YYYY-MM-DD');
  const possibleMaxDate = dayjs(possibleMinDate).add(2, 'months').format('YYYY-MM-DD');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const todayFrom = dayjs().startOf('month').format('YYYY-MM-DD 00:00:00');
  const todayTo = dayjs().add(1, 'month').format('YYYY-MM-DD 23:59:59');
  const [calendarInput, setCalendarInput] = useState<CalendarInput>({ from: todayFrom, to: todayTo, types: [Types.BF, Types.DR, Types.LN] });
  const [section, setSection] = useState('myCalendar');
  const [fromDate, setFromDate] = useState<any>('');
  const [toDate, setToDate] = useState<any>('');
  const [showAddCalendar, setShowAddCalendar] = useState(false);
  const [rating, setRating] = useState<any>(1);
  const myCalendarRef = useRef();
  const ratingRef = useRef()
  const menuRef = useRef()
  const galleryRef = useRef()
  const contactRef = useRef();
  const ratingFormRef = useRef();
  const { detail, loading, error } = useSelector((state: any) => state.vendor);
  const { profile } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: FETCH_DETAIL_REQUEST });
    vendorDetail({ vId, userId: profile?.id })
      .then(res => {
        dispatch({ type: FETCH_DETAIL_RESPONSE, payload: { detail: res } })
        fetchReviews(vId)
        fetchMyCalendar(calendarInput);
      })
      .catch(err => dispatch({ type: FETCH_DETAIL_RESPONSE, payload: { loading: true } }));
  }, []);

  const getQty = ({ id, quantity }: any) => {
  };

  const getStarValue = ({ value }: any) => {
    return 3.5
  };

  const fetchReviews = (vId: any) => {
    fetchReview({ vId })
      .then((res: any) => dispatch({ type: FETCH_REVIEW_RESPONSE, payload: { reviews: res } }))
      .catch((err: any) => dispatch({ type: FETCH_REVIEW_RESPONSE, payload: { reviews: [] } }));
  }

  const fetchMyCalendar = (calendarInput: any) => {
    fetchMySchedule({ ...calendarInput, vId })
      .then((res: any) => dispatch({ type: FETCH_MY_CALENDAR_RESPONSE, payload: { myCalendar: res } })
      ).catch((err: any) => dispatch({
        type: FETCH_MY_CALENDAR_RESPONSE, payload: { error: "Sorry! Couldn't add your subscription, Kindly try again!!" }
      }))
  }

  const setFilterInput = (type: Types) => {
    let updatedInputs = calendarInput;
    if (calendarInput.types.includes(type!)) {
      delete calendarInput.types[calendarInput.types.indexOf(type!)];
      updatedInputs = { ...calendarInput }
    }
    else {
      updatedInputs = { ...calendarInput, types: [...calendarInput.types, type] };
    }
    setCalendarInput({ ...updatedInputs });
    fetchMyCalendar(updatedInputs);
  }

  const onScheduleSubmit = async (minDate: any, toDate: any, foodTypes: any) => {
    let fromDate = dayjs(minDate).format('YYYY-MM-DD');
    let tillDate = dayjs(toDate).format('YYYY-MM-DD');
    dispatch({
      type: ADD_CALENDAR_REQUEST
    });
    await addSchedule({ vId, fromDate, toDate: tillDate, foodTypes })
      .then((res: any) => {
        dispatch({
          type: ADD_CALENDAR_RESPONSE,
          payload: { myCalendar: res, loading: false },
        });
      })
      .catch(() => {
        dispatch({
          type: ADD_CALENDAR_REQUEST,
          payload: { error: "Sorry! Couldn't add your subscription, Kindly try again!!", loading: false }
        });
      })

    await fetchMyCalendar(calendarInput);
  }

  const reviewSubmit = (data: any) => {
    const { comment } = data;
    addReview({ vId, rating, comment })
      .then((res: any) => {
        dispatch({
          type: ADD_REVIEW_REQUEST
        })
        fetchReviews(vId)
      })
      .catch((err: any) => {
        dispatch({
          type: ADD_REVIEW_REQUEST,
          payload: { error: "Sorry! Couldn't add your review, Kindly try again!!" }
        })
      })
  }

  const toggleOpen = () => {
    dispatch({
      type: ADD_REVIEW_REQUEST,
      payload: { error: null }
    })
  }

  return (
    <>
      <AddCalendarModal
        show={showAddCalendar}
        onHide={() => setShowAddCalendar(false)}
        fromDate={fromDate}
        onScheduleSubmit={onScheduleSubmit}
      />
      {loading && vendorDetailSkeleton}
      {error &&
        <Snackbar open={true} autoHideDuration={5000} onClose={() => toggleOpen()}>
          <Alert onClose={() => toggleOpen()} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar >
      }
      {
        !loading && detail && (
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
                          <Icofont icon="food-cart" /> {detail.tags}
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
                          {/* <Icofont icon="heart-outlined" className="text-danger" style={{ fontSize: '18px' }} /> */}
                          {false ? <FavoriteBorderOutlined className="brand-title" /> : <FavoriteOutlined className="brand-title" />}
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
                      <Nav id="pills-tab" className="detailPageTabMenuDesK">
                        <Nav.Item >
                          <Nav.Link ref={myCalendarRef} eventKey="zero" onClick={() => setSection('myCalendar')}>My Calendar</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link ref={menuRef} eventKey="first" onClick={() => setSection('menu')}>Food Menu</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link ref={galleryRef} eventKey="second" onClick={() => setSection('gallery')}>Gallery</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link ref={contactRef} eventKey="third" onClick={() => setSection('contact')}>Restaurant Info</Nav.Link>
                        </Nav.Item>
                        {/* <Nav.Item>
                        <Nav.Link eventKey="fourth">Book A Table</Nav.Link>
                      </Nav.Item> */}
                        <Nav.Item>
                          <Nav.Link ref={ratingRef} eventKey="fifth" onClick={() => setSection('rating')}>Ratings & Reviews</Nav.Link>
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
                            <Calendar
                              setSection={setSection}
                              setFromDate={setFromDate}
                              setToDate={setToDate}
                              vId={vId}
                              setShowAddCalendar={setShowAddCalendar}
                              possibleMinDate={possibleMinDate}
                              possibleMaxDate={possibleMaxDate}
                              fetchMyCalendar={fetchMyCalendar}
                            />
                          </Tab.Pane>
                          <Tab.Pane eventKey="first"></Tab.Pane>
                          <Tab.Pane eventKey="second">
                            <div className="position-relative">
                              <GalleryCarousel />
                            </div>
                          </Tab.Pane>
                          <Tab.Pane eventKey="third">
                            <VendorInfo />
                          </Tab.Pane>
                          <Tab.Pane eventKey="fifth">
                            <VendorReviews
                              ratingFormRef={ratingFormRef}
                              handleSubmit={handleSubmit}
                              reviewSubmit={reviewSubmit}
                              rating={rating}
                              register={register}
                              setRating={setRating}
                            />
                          </Tab.Pane>
                        </Tab.Content>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="bg-white rounded shadow-sm text-white mb-4 p-4 clearfix restaurant-detailed-earn-pts card-icon-overlap">
                        {section === 'listing' &&
                          <>
                            <div className="border-btn-main mb-4">

                              <Button type="button" className="btn btn-primary btn-block btn-lg" onClick={() => {
                                setShowAddCalendar(true);
                              }}>
                                {" "}
                                Subscribe Now{" "}
                              </Button>
                              <hr />
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
                          </>
                        }
                        {section === 'rating' &&
                          <>
                            <h5 className="mb-0 mb-4">Ratings and Reviews</h5>
                            <div className="graph-star-rating-header">
                              <div className="star-rating">
                                <StarRating
                                  fontSize={18}
                                  disabled={true}
                                  star={3.5}
                                  getValue={getStarValue}
                                />
                                <b className="text-black ml-2">334 Reviews</b>
                              </div>
                              <p className="text-black mb-4 mt-2">
                                Rated 3.5 out of 5
                              </p>
                            </div>
                            <div className="graph-star-rating-body">
                              <RatingBar leftText="5" barValue={56} />
                              <RatingBar leftText="4" barValue={23} />
                              <RatingBar leftText="3" barValue={11} />
                              <RatingBar leftText="2" barValue={6} />
                              <RatingBar leftText="1" barValue={4} />
                            </div>
                          </>
                        }
                      </div>
                      {section === 'myCalendar' &&
                        <div className="bg-white rounded shadow-sm text-white mb-4 p-4 clearfix restaurant-detailed-earn-pts card-icon-overlap">
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
                      }
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
                      </div>
                    </Col>
                  </Row>
                </Container>
              </section>
            </Tab.Container>
            <BottomNavigation myCalendarRef={myCalendarRef} ratingRef={ratingRef} galleryRef={galleryRef} contactRef={contactRef} menuRef={menuRef} />
          </div >
        )
      }
    </>
  );
};

export default Detail
