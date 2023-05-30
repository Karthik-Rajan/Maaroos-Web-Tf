import React, { useRef, useState } from 'react';
import { InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { Form, Modal, Button, Row, FormControl, Col } from 'react-bootstrap';
import { Types, TypesName } from '../../constants/types';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useParams } from 'react-router-dom';

const AddCalendarModal = (props: any) => {

    const scheduleForm = useRef();
    let { vId } = useParams();
    const {
        register,
        handleSubmit,
    } = useForm();

    const todayFrom = dayjs().startOf('month').format('YYYY-MM-DD 00:00:00');
    const todayTo = dayjs().add(1, 'month').format('YYYY-MM-DD 23:59:59');
    const minDate = dayjs().add(1, 'week').format('YYYY-MM-DD');
    const maxDate = dayjs(minDate).add(2, 'weeks').format('YYYY-MM-DD');

    const [foodTypes, setFoodTypes] = useState<string[]>([]);
    const [fromDate, setFromDate] = useState<any>('');
    const [toDate, setToDate] = useState<any>('');

    const onScheduleSubmit = (data: any) => {
        let { fromDate, toDate } = data;
        if (fromDate && toDate && foodTypes) {
            fromDate = dayjs(fromDate).format('YYYY-MM-DD');
            toDate = dayjs(toDate).format('YYYY-MM-DD');
            props.dispatch({
                type: "ADD_CALENDAR",
                payload: { vId, fromDate, toDate, foodTypes },
            });
        }
    }

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            // size="sm"
            centered
        >
            <Modal.Header closeButton={true}>
                <Modal.Title as='h5' id="add-calendar">Add Calendar</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form ref={scheduleForm} id="scheduleForm" onSubmit={handleSubmit(onScheduleSubmit)}>
                    {/* <Row>
                        <Col sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <MobileDatePicker
                                    minDate={minDate}
                                    maxDate={maxDate}
                                    disablePast
                                    label="From Date"
                                    value={fromDate}
                                    onChange={(newValue) => {
                                        setFromDate(newValue);
                                    }}
                                    renderInput={(params) => <TextField  {...params} />}
                                />
                            </LocalizationProvider>
                        </Col>
                        <Col sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <MobileDatePicker
                                    minDate={minDate}
                                    maxDate={maxDate}
                                    disablePast
                                    label="To Date"
                                    value={toDate}
                                    onChange={(newValue) => {
                                        setToDate(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} {...register("toDate", {
                                        required: `To date is required`,
                                    })} />}
                                />
                            </LocalizationProvider>
                        </Col>
                    </Row> */}
                    <br />
                    {/* <Row>
                        <Col sm={12}>
                            <FormControl className="foodTypeMultiSelector">
                                <InputLabel id="foodTypeLabel">Select Food Types</InputLabel>
                                <Select
                                    multiple={true}
                                    value={foodTypes}
                                    onChange={(event) => {
                                        const { target: { value } } = event;
                                        setFoodTypes(
                                            typeof value === 'string' ? value.split(',') : value,
                                        );
                                    }}
                                >
                                    <MenuItem key={Types.BF} value={Types.BF}>{TypesName.BF}</MenuItem>
                                    <MenuItem key={Types.LN} value={Types.LN}>{TypesName.LN}</MenuItem>
                                    <MenuItem key={Types.DR} value={Types.DR}>{TypesName.DR}</MenuItem>
                                </Select>
                            </FormControl>
                        </Col>
                    </Row> */}
                    {/* <br /> */}
                    {/* <Form.Group className="text-left cancelSchedule">
                        <Button variant="outline-primary" type="button" onClick={() => {
                            setSection(`listing`);
                        }}>
                            {" "}
                            Cancel{" "}
                        </Button>
                    </Form.Group>
                    <Form.Group className="text-right">
                        <Button variant="primary" type="submit">
                            {" "}
                            Add Schedule{" "}
                        </Button>
                    </Form.Group> */}
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button type='button' onClick={props.onHide} variant="outline-primary" className="d-flex text-center justify-content-center">CANCEL</Button>
                <Button type='button' variant="primary" className='d-flex text-center justify-content-center'>UPDTAE</Button>
            </Modal.Footer>
        </Modal>
    );
}
export default AddCalendarModal;