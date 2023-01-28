import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import Select2 from "react-select2-wrapper";
import { Form } from "react-bootstrap";
import Icofont from "react-icofont";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { usePlacesWidget } from "react-google-autocomplete";
import Geocode from "react-geocode";

const SearchBar = (props: any) => {
  Geocode.setLanguage("en");

  Geocode.setApiKey("AIzaSyBhVIXKdp4FXoHLxNqKoPHpjZQk7sc0-pI");

  //ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE
  Geocode.setLocationType("GEOMETRIC_CENTER");

  const [locationTemp, setLocationTemp] = useState("");
  const [location, setLocation] = useState("");
  const [coordinatesTemp, setCoordinatesTemp] = useState({ lat: 0, lng: 0 });
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  // const [pageUrl, setPageUrl] = useState("/listing");
  const [quickSearch, setQuickSearch] = useState(true);
  const searchForm = useRef();
  const { handleSubmit } = useForm();
  const navigate = useNavigate();

  let input = {};

  const { ref }: any = usePlacesWidget({
    apiKey: `AIzaSyBhVIXKdp4FXoHLxNqKoPHpjZQk7sc0-pI`,
    onPlaceSelected: (place) => {
      fetchAddress(place, true);
    },
    options: {
      // types: ["(cities)"], //REGIONS
      componentRestrictions: { country: "in" },
    },
  });

  const onSubmit = (data: any) => {
    onSearch();
  };

  useEffect(() => {
    if (
      window.location.pathname === "/listing" ||
      window.location.pathname === "/"
    ) {
      setQuickSearch(false);
    }
    props.vendor.then((res: any) => {
      input = res.search;
    });
  }, []);

  const fetchAddress = (response: any, isPlaceApi = false) => {
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
    setLocationTemp(
      (locality ? locality + "," : "") +
        (city ? city + "," : "") +
        state +
        ", " +
        country
    );

    if (isPlaceApi) {
      const qLat = addr.geometry.location.lat();
      const qLng = addr.geometry.location.lng();
      setCoordinatesTemp({
        lat: qLat,
        lng: qLng,
      });
      if (props.changeLocation) props.changeLocation(qLat, qLng);
    } else {
      const geoMet = addr.geometry.location;
      setCoordinatesTemp(geoMet);
      if (props.changeLocation) props.changeLocation(geoMet.lat, geoMet.lng);
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
    if (!ref.current.value || !coordinatesTemp.lat || !coordinatesTemp.lng) {
      ref.current.focus();
      return false;
    }

    setCoordinates(coordinatesTemp);
    setLocation(locationTemp);

    window.location.href =
      `/listing?q=` + coordinatesTemp.lat + `,` + coordinatesTemp.lng;
  };

  return (
    <div className="homepage-search-form">
      <Form
        ref={searchForm}
        id="searchForm"
        className="form-noborder"
        onSubmit={handleSubmit(onSubmit)}
      >
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
          <Form.Group
            className={
              props.filterSearch
                ? `col-lg-12 col-md-12 col-sm-12`
                : `col-lg-7 col-md-7 col-sm-12`
            }
          >
            <Form.Control
              type="text"
              placeholder="Enter your delivery location"
              size="lg"
              ref={ref}
              value={locationTemp}
              onChange={(event: any) => {
                setLocationTemp(event.target.value);
              }}
            />
            <Link className="locate-me" to="#" onClick={onLocateHandler}>
              <Icofont icon="ui-pointer" /> Locate Me
            </Link>
          </Form.Group>
          {!props.filterSearch && (
            <Form.Group className="col-lg-2 col-md-2 col-sm-12">
              <Link
                to={""}
                className="btn btn-primary btn-block btn-lg btn-gradient"
                onClick={onSearch}
              >
                Search
              </Link>
            </Form.Group>
          )}
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
