import React, { useState } from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Icofont from 'react-icofont';
import { Nav } from 'react-bootstrap';



const BottomNavigation = ({ myCalendarRef, ratingRef }: any) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleClick = (tab: any) => {
        console.log(tab);
        tab.current.click();
        handleClose()
    }

    const actions = [
        { icon: <Icofont icon="calendar" />, name: 'Calendar', tab: myCalendarRef },
        { icon: <Icofont icon="ui-rating" />, name: 'Rating', tab: ratingRef },
    ];

    return (
        <>
            <SpeedDial
                ariaLabel="Detail Page Menu"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
                icon={<Icofont icon="navigation-menu" />}
                onClose={handleClose}
                onOpen={handleOpen}
                className="speedDialMenu"
                open={open}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
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