import React from "react";
import { Badge } from "react-bootstrap";
import Icofont from 'react-icofont';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const VendorInfo = () => {
    const { detail } = useSelector((s: any) => s.vendor);
    const mapUrl = `https://maps.google.com/maps?q=` + detail.lat + `,` + detail.lng + `&t=&z=9&ie=UTF8&iwloc=&output=embed`
    const tags = detail.tags ? detail.tags.split(',') : []
    return <>
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
                            src={mapUrl}
                            frameBorder="0"
                            scrolling="no"
                        ></iframe>
                    </div>
                </div>
            </div>
            <h5 className="mb-4">Restaurant Info</h5>
            <p className="mb-3">
                {detail.address} - {detail.postcode}
            </p>
            <p className="mb-2 text-black">
                <Icofont icon="phone-circle text-primary mr-2" />{" "}
                {detail.mobile}
            </p>
            <p className="mb-2 text-black">
                <Icofont icon="email text-primary mr-2" />{" "}
                {detail.email}
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
            {/* <p className="mb-3">
            Dal Makhani, Panneer Butter Masala, Kadhai Paneer,
            Raita, Veg Thali, Laccha Paratha, Butter Naan
        </p> */}
            <div className="border-btn-main mb-4">
                {
                    tags && tags.map((tag: any, index: any) => <Link
                        key={`TAG_` + index}
                        className="border-btn text-success mr-2"
                        to="#"
                    >
                        <Icofont icon="check-circled" />{" "} {tag}
                    </Link>
                    )
                }
            </div>
        </div >
    </>
}