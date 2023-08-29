import { Rating } from "@mui/material";
import React from "react";
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
import { Link } from "react-router-dom";
import Review from "./Review";

export const VendorReviews = ({ review, ratingFormRef, handleSubmit, reviewSubmit, rating, register, setRating, reviews }: any) => {
 console.log(reviews);
  return (
    <>
      {/* <div
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
                          </div> */}
      {!review &&
        <div className="bg-white rounded shadow-sm p-4 mb-5 rating-review-select-page">
          <Form id="ratingForm" ref={ratingFormRef} onSubmit={handleSubmit(reviewSubmit)}>
            <h5 className="mb-4">Leave Comment</h5>
            <p className="mb-2">Rate the cook & food</p>
            <div className="mb-4">
              <div className="star-rating">
                <Rating
                  defaultValue={1}
                  value={rating}
                  {...register("rating", {
                    onChange(event: any) {
                      setRating(parseInt(event.target.value))
                    },
                  })}
                  max={5}
                />
              </div>
            </div>

            <Form.Group>
              <Form.Label>Your Comment</Form.Label>
              <Form.Control as="textarea"
                {...register("comment", {})} />
            </Form.Group>
            <Form.Group>
              <Button
                variant="primary"
                size="sm"
                type="submit"
                form="ratingForm"
              >
                Submit Comment{" "}
              </Button>
            </Form.Group>
          </Form>
        </div>
      }
      <div className="bg-white rounded shadow-sm p-4 mb-4 restaurant-detailed-ratings-and-reviews">
        <Link
          to="#"
          className="btn btn-outline-primary btn-sm float-right"
        >
          Top Rated
        </Link>
        <h5 className="mb-1">All Ratings and Reviews</h5>
        {reviews && reviews.map((review: any) =>
          <>
            <Review
              image={review.profile_img}
              ImageAlt={review.first_name + ' ' + review.last_name}
              ratingStars={5}
              Name={review.first_name + ' ' + review.last_name}
              profileLink="#"
              reviewDate={review.created_at}
              reviewText={review.comment}
            // likes="856M"
            // dislikes="158K"
            // otherUsers={users}
            />
            <hr />
          </>
        )}
        <Link
          className="text-center w-100 d-block mt-4 font-weight-bold"
          to="#"
        >
          See All Reviews
        </Link>
      </div>
    </>
  )
};