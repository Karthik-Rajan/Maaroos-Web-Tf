import React, { useRef, useState } from 'react';
import { Box, Chip, FormControl, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { Form, Modal, Button, Row, Col } from 'react-bootstrap';
import { Types, TypesName } from '../../constants/types';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

const AddCalendarModal = (props: any) => {
    const navigate = useNavigate();
    const scheduleForm = useRef();
    let { vId } = useParams();
    const {
        register,
        handleSubmit,
    } = useForm();
    
    const possibleMinDate = dayjs().add(1, 'week').format('YYYY-MM-DD');
    const maxDate = dayjs(possibleMinDate).add(2, 'months').format('YYYY-MM-DD');
    const pickedFrom = props.fromDate ? dayjs(props.fromDate).format('YYYY-MM-DD') : possibleMinDate;
    const [foodTypes, setFoodTypes] = useState<string[]>([Types.BF, Types.LN, Types.DR]);
    const [minDate, setMinDate] = useState<any>(pickedFrom);
    const [toDate, setToDate] = useState<any>(pickedFrom);

    const MenuProps = {
        PaperProps: {
          style: {
            maxHeight: 48 * 4.5 + 8,
            width: 250,
          },
        },
      };

    const onScheduleSubmit = (data: any) => {
        if (minDate && toDate && foodTypes) {
            props.onScheduleSubmit(minDate, toDate, foodTypes);
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
                <Modal.Title as='h5' id="add-calendar">Add New Subscription</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form ref={scheduleForm} id="scheduleForm" onSubmit={handleSubmit(onScheduleSubmit)}>
                    <Row>
                        <Col sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <MobileDatePicker
                                    minDate={possibleMinDate}
                                    maxDate={maxDate}
                                    disablePast
                                    label="From Date"
                                    value={minDate}
                                    onChange={(newValue) => {
                                        setMinDate(newValue);
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
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col sm={12}>
                            <FormControl className="foodTypeMultiSelector">
                                <Select
                                    name="foodTypes"
                                    multiple
                                    labelId="foodTypes"
                                    label="Select Food Types"
                                    value={foodTypes}
                                    defaultValue={foodTypes}
                                    input={<OutlinedInput fullWidth id="foodTypesInput" label="Select Food Types" />}
                                    MenuProps={MenuProps}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                          {selected.map((value) => {
                                            let foodLabel = value === Types.BF ? TypesName.BF : (value === Types.LN ? TypesName.LN  : TypesName.DR);  
                                            return <Chip key={value} label={foodLabel} />
                                          }
                                          )}
                                        </Box>
                                      )}
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
                    </Row>
                    <br />
                    {/* <Form.Group className="text-left cancelSchedule">
                        <Button variant="outline-primary" type="button" onClick={() => {
                            // setSection(`listing`);
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
                <Button type='submit' form={`scheduleForm`} variant="primary" className='d-flex text-center justify-content-center'>ADD NEW</Button>
            </Modal.Footer>
        </Modal>
    );
}
// function mapStateToProps(state: any) {
//     return {
//       ...state,
//     };
//   }
//   export default connect<any>(mapStateToProps)(AddCalendarModal);
export default AddCalendarModal;