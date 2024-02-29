import React, { useEffect, useRef, useState } from "react";
import { NavLink, Route } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import Offers from "./myaccount/Offers";
import Orders from "./myaccount/Orders";
import Favourites from "./myaccount/Favourites";
import Payments from "./myaccount/Payments";
import Addresses from "./myaccount/Addresses";
import EditProfileModal from "./modals/EditProfileModal";
import Auth from "@aws-amplify/auth";
import TrackOrder from "./TrackOrder";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "./common/Calendar";
import { useForm } from "react-hook-form";
import { UPDATED } from "../ErrorConstants";
import Wallet from "./myaccount/Wallet";
import { rz_WalletEntry, userProfile, userProfileUpdate } from "../actions/api";
import { FETCH_PROFILE_REQUEST, FETCH_PROFILE_RESPONSE, WALLET_ENTRY_REQUEST, WALLET_ENTRY_RESPONSE } from "../constants/user";
import AWS from 'aws-sdk';
import { ProfileInfo } from "./myaccount/ProfileInfo";

const MyAccount = () => {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [page, setPage] = useState("orders");
  const profileFormRef = useRef();
  const [info, setInfo] = useState("");
  const [order, setOrder] = useState({})

  const { profile, wallet } = useSelector((state: any) => state.user);
  const users = profile.data;
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const getProfile = async () => {
    dispatch({ type: FETCH_PROFILE_REQUEST, payload: {} });
    userProfile().then((res: any) => dispatch({ type: FETCH_PROFILE_RESPONSE, payload: res }));
  };

  const updateProfile = async (firstName: string, lastName: string, emailId: string) => {
    await userProfileUpdate({ firstName, lastName, emailId }).then(() => {
      Auth.currentAuthenticatedUser()
        .then((user) => {
          Auth.updateUserAttributes(user, { name: firstName, middle_name: lastName }).then(res => console.log("attr", res));
        })
        .catch((err) => {
          console.error(err);
          window.location.href = "/";
        });
    });
  };

  const onProfileUpdate = async (data: any) => {
    let { firstName, lastName, emailId } = data;
    await updateProfile(firstName, lastName, emailId);
    await getProfile();
    setInfo(UPDATED)
  };

  const createWalletEntry = async (amount: number) => {
    await dispatch({ type: WALLET_ENTRY_REQUEST });
    await rz_WalletEntry({ amount }).then(async (res: any) => {
      await dispatch({ type: WALLET_ENTRY_RESPONSE, payload: res });
    })
  }

  const uploadProfilePic = async (file: any) => {
    const ext = file.type.toLowerCase().includes('png') ? '.png' : '.jpg';
    const profileImg = 'https://maaroos-assets.s3.ap-south-1.amazonaws.com/';
    const filePath = 'profile_images/' + btoa(users.mobile) + ext;
    const S3_BUCKET = "maaroos-assets";
    const REGION = "ap-south-1";

    AWS.config.update({
      accessKeyId: "AKIAZCGGSBO7IEGVZGOA",
      secretAccessKey: "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",
    });
    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });

    const params = {
      Bucket: S3_BUCKET,
      Key: filePath,
      Body: file,
    };

    var upload = s3
      .putObject(params)
      .on("httpUploadProgress", (evt) => {

      })
      .promise();

    await upload.then((res: any) => {
      userProfileUpdate({ profileImg: profileImg + filePath }).then(() => {
        getProfile();
      })
    });
  }

  const pathMap: any = {
    '/myaccount/orders': 'orders',
    '/myaccount/offers': 'offers',
    '/myaccount/calendar': 'myCalendar',
    '/myaccount/favourites': 'favourites',
    '/myaccount/payments': 'payments',
    '/myaccount/track-order': 'track-order',
    '/myaccount/wallet': 'wallet',
    '/myaccount': 'wallet'
  }
  useEffect(() => {
    setPage(pathMap[window.location.pathname]);
  }, []);

  return (
    <>
      <EditProfileModal
        show={showEditProfile}
        onHide={() => setShowEditProfile(false)}
        profileForm={profileFormRef}
        onProfileUpdate={onProfileUpdate}
        handleSubmit={handleSubmit}
        register={register}
        errors={errors}
        users={users}
        info={info}
        setInfo={setInfo}
      />
      <section className="section pt-5 pb-5 osahan-account-page">
        <Container>
          <Row>
            <Col md={3}>
              <div className="osahan-account-page-left shadow-sm bg-white h-100">

                <ProfileInfo setShowEditProfile={setShowEditProfile} uploadProfilePic={uploadProfilePic} />

                <ul className="nav flex-column border-0 pt-4 pl-4 pb-4 noPadding">
                  <li className="nav-item">
                    <NavLink
                      className="nav-link active"
                      to="wallet"
                      onClick={() => setPage("wallet")}
                    >
                      <i className="icofont-wallet"></i> Wallet
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="calendar"
                      onClick={() => setPage("myCalendar")}
                    >
                      <i className="icofont-calendar"></i> Calendar
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="orders"
                      onClick={() => setPage("orders")}
                    >
                      <i className="icofont-food-cart"></i> Orders
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="offers"
                      onClick={() => setPage("offers")}
                    >
                      <i className="icofont-sale-discount"></i> Offers
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="favourites"
                      onClick={() => setPage("favourites")}
                    >
                      <i className="icofont-heart"></i> Favourites
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="payments"
                      onClick={() => setPage("payments")}
                    >
                      <i className="icofont-credit-card"></i> Payments
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="addresses"
                      onClick={() => setPage("addresses")}
                    >
                      <i className="icofont-location-pin"></i> Addresses
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="track-order"
                      onClick={() => setPage("track-order")}
                    >
                      <i className="icofont-fast-delivery"></i> Track Order
                    </NavLink>
                  </li>
                </ul>
              </div>
            </Col>
            <Col md={9}>
              {page === "orders" && <Orders />}
              {page === "offers" && <Offers />}
              {page === "favourites" && <Favourites />}
              {page === "payments" && <Payments />}
              {page === "addresses" && <Addresses />}
              {page === "track-order" && <TrackOrder />}
              {page === "wallet" && users && <Wallet getProfile={getProfile} createWalletEntry={createWalletEntry} />}
              {page === "myCalendar" && <div className='p-4 bg-white shadow-sm'>
                <Calendar
                  setSection={false}
                  setFromDate={false}
                  setToDate={false}
                  dispatch={dispatch}
                  vId={`all`}
                /></div>}

              {/* <Switch>
                <Route path="/myaccount/orders"><Orders /></Route>
                <Route path="/myaccount/offers" component={Offers} />
                <Route
                  path="/myaccount/favourites"

                  component={Favourites}
                />
                <Route path="/myaccount/payments" component={Payments} />
                <Route
                  path="/myaccount/addresses"

                  component={Addresses}
                />
              </Switch> */}
            </Col>
          </Row>
        </Container>
      </section >
    </>
  );
};

export default MyAccount
