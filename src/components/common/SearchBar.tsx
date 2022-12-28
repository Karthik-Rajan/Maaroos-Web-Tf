import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Select2 from "react-select2-wrapper";
import { Form } from "react-bootstrap";
import Icofont from "react-icofont";
import { Link } from "react-router-dom";
import { usePlacesWidget } from "react-google-autocomplete";
import Geocode from "react-geocode";

const SearchBar = (props: any) => {
  Geocode.setLanguage("en");

  Geocode.setApiKey("AIzaSyBhVIXKdp4FXoHLxNqKoPHpjZQk7sc0-pI");

  //ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE
  Geocode.setLocationType("GEOMETRIC_CENTER");

  const [location, setLocation] = useState(props?.location?.name || "");
  const [coordinates, setCoordinates] = useState({});
  const [pageUrl, setPageUrl] = useState("listing");
  const [quickSearch, setQuickSearch] = useState(true);

  let input = {};

  const { ref } = usePlacesWidget({
    apiKey: `AIzaSyBhVIXKdp4FXoHLxNqKoPHpjZQk7sc0-pI`,
    onPlaceSelected: (place) => {
      fetchAddress(place, true);
    },
    options: {
      // types: ["(cities)"], //REGIONS
      componentRestrictions: { country: "in" },
    },
  });

  useEffect(() => {
    if (window.location.pathname == "/listing") {
      setPageUrl("");
    }
    if (window.location.pathname == "/") {
      setQuickSearch(false);
    }
    props.vendor.then((res: any) => {
      input = res.search;
    });
  });

  const fetchAddress = (response: any, isPlaceApi = false) => {
    console.log("MAP", response);
    let city = "",
      state = "",
      locality = "",
      country = "";
    let addr = response;
    if (typeof response.results != "undefined") {
      addr = response.results[0];
    }
    for (let i = 0; i < addr.address_components.length; i++) {
      for (let j = 0; j < addr.address_components[i].types.length; j++) {
        switch (addr.address_components[i].types[j]) {
          case "sublocality_level_1":
            locality = addr.address_components[i].long_name || "";
            break;
          case "locality":
            city = addr.address_components[i].long_name || "";
            break;
          case "administrative_area_level_1":
            state = addr.address_components[i].long_name || "";
            break;
          case "country":
            country = addr.address_components[i].long_name || "";
            break;
        }
      }
    }
    setLocation(
      (locality ? locality + "," : "") +
        (city ? city + "," : "") +
        state +
        ", " +
        country
    );

    if (isPlaceApi) {
      setCoordinates({
        lat: addr.geometry.location.lat(),
        lng: addr.geometry.location.lng(),
      });
    } else {
      setCoordinates(addr.geometry.location);
    }
  };

  const onLocateHandler = async () => {
    await navigator.geolocation.getCurrentPosition(
      function (position) {
        Geocode.fromLatLng(
          position.coords.latitude.toString(),
          position.coords.longitude.toString()
        ).then(
          (response: any) => {
            fetchAddress(response);
          },
          (error: any) => {
            console.error(error);
          }
        );
      },
      function (error) {
        alert("Error Code = " + error.code + " - " + error.message);
      }
    );
  };

  const onSearch = () => {
    props.dispatch({
      type: "LOCATION",
      payload: {
        search: { ...input, ...coordinates },
        location: { coordinates, name: location },
      },
    });
  };

  return (
    <div className="homepage-search-form">
      <Form className="form-noborder">
        <div className="form-row">
          {quickSearch && (
            <Form.Group className="col-lg-3 col-md-3 col-sm-12">
              <div className="location-dropdown">
                <Icofont icon="location-arrow" />
                <Select2
                  className="custom-select"
                  data={[
                    { text: "Breakfast", id: 1 },
                    { text: "Lunch", id: 2 },
                    { text: "Dinner", id: 3 },
                    { text: "Cafés", id: 4 },
                    { text: "Delivery", id: 5 },
                  ]}
                  options={{
                    placeholder: "Quick Searches",
                  }}
                />
              </div>
            </Form.Group>
          )}
          <Form.Group className="col-lg-7 col-md-7 col-sm-12">
            <Form.Control
              type="text"
              placeholder="Enter your delivery location"
              size="lg"
              ref={ref}
              value={location}
              onChange={(event: any) => {
                setLocation(event.target.value);
              }}
            />
            <Link className="locate-me" to="#" onClick={onLocateHandler}>
              <Icofont icon="ui-pointer" /> Locate Me
            </Link>
          </Form.Group>
          <Form.Group className="col-lg-2 col-md-2 col-sm-12">
            <Link
              to={pageUrl}
              className="btn btn-primary btn-block btn-lg btn-gradient"
              onClick={onSearch}
            >
              Search
            </Link>
          </Form.Group>
        </div>
      </Form>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    vendor: state.vendor,
  };
};
export default connect(mapStateToProps)(SearchBar);
