import React from "react";
import { Tab } from "react-bootstrap";
import GalleryCarousel from "../common/GalleryCarousel";

const Order = () => {
    return <Tab.Pane eventKey="first">
        <div className="position-relative">
            <GalleryCarousel />
        </div>
    </Tab.Pane>
}

export default Order;