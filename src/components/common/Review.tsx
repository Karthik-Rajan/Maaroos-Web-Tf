import React from "react";
import { Link } from "react-router-dom";
import { Media, Image, OverlayTrigger, Tooltip } from "react-bootstrap";
import PropTypes from "prop-types";
import StarRating from "./StarRating";
import Icofont from "react-icofont";

const Review = (props: any) => {
  let renObjData = props.otherUsers.map((data: any, idx: any) => {
    return (
      <OverlayTrigger
        key={idx}
        placement="top"
        overlay={<Tooltip id={"tooltip-top" + idx}>{data.name}</Tooltip>}
      >
        <Link to={data.url}>
          <Image src={data.image} className="total-like-user rounded-pill" />
        </Link>
      </OverlayTrigger>
    );
  });

  return (
    <div className="reviews-members pt-4 pb-4">
      <Media>
        <Link to="#">
          <Image
            alt={props.imageAlt}
            src={props.image}
            className="mr-3 rounded-pill"
          />
        </Link>
        <Media.Body>
          <div className="reviews-members-header">
            <div className="star-rating float-right">
              <StarRating
                fontSize={14}
                disabled={true}
                star={props.ratingStars}
                getValue={() => { }}
              />
            </div>
            <h6 className="mb-1">
              <Link className="text-black" to={props.profileLink}>
                {props.name}
              </Link>
            </h6>
            <p className="text-gray">{props.reviewDate}</p>
          </div>
          <div className="reviews-members-body">
            <p>{props.reviewText}</p>
          </div>
          <div className="reviews-members-footer">
            <Link className="total-like" to="#">
              <Icofont icon="thumbs-up" /> {props.likes}
            </Link>{" "}
            <Link className="total-like" to="#">
              <Icofont icon="thumbs-down" /> {props.dislikes}
            </Link>
            <span className="total-like-user-main ml-2" dir="rtl">
              {renObjData}
            </span>
          </div>
        </Media.Body>
      </Media>
    </div>
  );
};

Review.propTypes = {
  image: PropTypes.string.isRequired,
  ImageAlt: PropTypes.string,
  ratingStars: PropTypes.number.isRequired,
  Name: PropTypes.string.isRequired,
  profileLink: PropTypes.string.isRequired,
  reviewDate: PropTypes.string.isRequired,
  reviewText: PropTypes.string.isRequired,
  likes: PropTypes.string,
  dislikes: PropTypes.string,
  otherUsers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string,
      url: PropTypes.string,
    })
  ),
};

export default Review;
