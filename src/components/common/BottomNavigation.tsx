import React, { useState } from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Icofont from 'react-icofont';
import { Nav } from 'react-bootstrap';



const BottomNavigation = ({ myCalendarRef, ratingRef, menuRef, contactRef, galleryRef }: any) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleClick = (tab: any) => {
        console.log(tab);
        tab.current.click();
        handleClose()
    }

    const actions = [
        { icon: <Icofont icon="calendar" />, name: "CALENDAR", tab: myCalendarRef, },
        { icon: <Icofont icon="restaurant-menu" />, name: "MENU", tab: menuRef },
        { icon: <Icofont icon="info" />, name: "INFO", tab: contactRef },
        { icon: <Icofont icon="image" />, name: "GALLERY", tab: galleryRef },
        { icon: <Icofont icon="ui-rating" />, name: "RATING", tab: ratingRef },
    ];

    return (
        <>
            <SpeedDial
                ariaLabel="Detail Page Menu"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
                icon={<Icofont icon="navigation-menu" />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
                className="speedDialMenu"
            >
                {actions.map((action, index) => (
                    <SpeedDialAction
                        key={index}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        tooltipOpen
                        onClick={() => handleClick(action.tab)}
                    />
                ))}
            </SpeedDial>
        </>
    );
}
export default BottomNavigation;