import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import QuickBite from './QuickBite';

const getQty = () => { }

function TabPanel(props: any) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function VendorMenu() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{ flexGrow: 1, bgcolor: '', display: 'flex', height: 500 }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Food Menu"
                sx={{ borderRight: 1, borderColor: 'divider' }}
            >
                <Tab label="Breakfast" {...a11yProps(0)} />
                <Tab label="Lunch" {...a11yProps(1)} />
                <Tab label="Dinner" {...a11yProps(2)} />
                <Tab label="Snacks" {...a11yProps(3)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                {/* <Row> */}
                {/* <h5 className="mb-4 mt-3 col-md-12">
                        Soups{" "}
                        <small className="h6 text-black-50">
                            8 ITEMS
                        </small>
                    </h5> */}
                {/* <Col md={12}> */}
                {/* <div className="bg-white rounded border shadow-sm"> */}
                <QuickBite
                    id={1}
                    title="Chicken Tikka Sub"
                    price={250}
                    priceUnit="$"
                    getValue={getQty}
                />
                <QuickBite
                    id={2}
                    title="Cheese corn Roll"
                    price={600}
                    showBadge={true}
                    badgeText=""
                    qty={1}
                    priceUnit="$"
                    getValue={getQty}
                />
                <QuickBite
                    id={3}
                    title="Chicken Tikka Sub"
                    price={250}
                    showBadge={true}
                    badgeText="Veg"
                    badgeVariant="success"
                    priceUnit="$"
                    getValue={getQty}
                />
                <QuickBite
                    id={1}
                    title="Chicken Tikka Sub"
                    price={250}
                    priceUnit="$"
                    getValue={getQty}
                />
                <QuickBite
                    id={2}
                    title="Cheese corn Roll"
                    price={600}
                    showBadge={true}
                    badgeText=""
                    priceUnit="$"
                    getValue={getQty}
                />
                <QuickBite
                    id={3}
                    title="Chicken Tikka Sub"
                    price={250}
                    showBadge={true}
                    badgeText="Veg"
                    badgeVariant="success"
                    priceUnit="$"
                    getValue={getQty}
                />
                {/* </div> */}
                {/* </Col> */}
                {/* </Row> */}
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>
            <TabPanel value={value} index={3}>
                Item Four
            </TabPanel>
            <TabPanel value={value} index={4}>
                Item Five
            </TabPanel>
            <TabPanel value={value} index={5}>
                Item Six
            </TabPanel>
            <TabPanel value={value} index={6}>
                Item Seven
            </TabPanel>
        </Box>
    );
}