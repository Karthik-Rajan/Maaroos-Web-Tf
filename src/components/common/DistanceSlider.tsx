import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import {
  Typography,
  Box,
  Divider,
  Switch,
  FormControlLabel,
  Slider,
  Rating,
} from "@mui/material";

const DistanceSlider = (props: any) => {
  let input = {};
  useEffect(() => {
    props.vendor.then((res: any) => {
      input = res.search;
    });
  }, [props.vendor]);

  /* Type Switch */

  /* Distance Slider */
  const kms = [5, 10, 20, 30, 40, 50];

  const distRange: any = [];

  kms.forEach((km) => {
    distRange.push({ value: km, label: km });
  });

  function valuetext(value: number) {
    return `${value} km`;
  }

  function valueLabelFormat(value: number) {
    return `${value} kms`;
  }

  const defaultFilterValues = {
    is_veg: "NO",
    distance: 5,
    rating_avg: 0,
  };

  const [filterValues, setFilterValues] = useState<any>(defaultFilterValues);

  const handleDistanceChange = (event: Event, newValue: number | number[]) => {
    let distance = {
      ...filterValues,
      ...{ ...input, distance: newValue },
    };
    if (typeof newValue === "number") {
      setFilterValues(distance);
    }
    props.onFilter({ distance: newValue });
  };

  const onTypeChangeHandler = (event: any) => {
    let is_veg = event.target.checked ? "YES" : "NO";
    let type = { ...filterValues, ...{ ...input, is_veg } };
    setFilterValues(type);
    props.onFilter({ is_veg: is_veg });
  };

  const handleRatingChange = (event: any, newValue: any) => {
    let rating = { ...filterValues, ...{ ...input, rating_avg: newValue } };
    setFilterValues(rating);
    props.onFilter({ rating_avg: newValue });
  };

  return (
    <>
      <FormControlLabel
        value="VEG"
        control={<Switch color="secondary" />}
        label="Veg Only"
        labelPlacement="start"
        onChange={onTypeChangeHandler}
      />
      <Divider className="verticalDivider" />
      <br />
      <Box className="distSelection">
        <Typography id="non-linear-slider" className="alignCenter">
          Distance : {valueLabelFormat(filterValues.distance)}
        </Typography>
        <Slider
          value={filterValues.distance}
          onChange={handleDistanceChange}
          color="secondary"
          aria-label="Distance within"
          defaultValue={5}
          getAriaValueText={valuetext}
          step={5}
          valueLabelDisplay="auto"
          valueLabelFormat={valueLabelFormat}
          marks={distRange}
          min={5}
          max={50}
        />
      </Box>
      <Divider className="verticalDivider" />
      <br />
      <Box className="distSelection alignCenter">
        <Typography>By Rating</Typography>
        <Rating
          name="simple-controlled"
          defaultValue={defaultFilterValues.rating_avg}
          value={filterValues.rating_avg}
          onChange={handleRatingChange}
        />
      </Box>
    </>
  );
};
const mapStateToProps = (state: any) => {
  return {
    vendor: state.vendor,
  };
};
export default connect(mapStateToProps)(DistanceSlider);
