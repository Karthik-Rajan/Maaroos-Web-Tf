import React from 'react';
import { Alert } from 'react-bootstrap';
import { Form, Modal, Button } from 'react-bootstrap';

const EditProfileModal = (props: any) => {
	const { users, info, setInfo } = props;
	let errorMsg: any = [];
	return (
		<Modal
			show={props.show}
			onHide={props.onHide}
			// size="sm"
			centered
		>
			<Modal.Header closeButton={true}>
				<Modal.Title as='h5' id="edit-profile">Edit profile</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<Form id="profileForm" ref={props.profileForm} onSubmit={props.handleSubmit(props.onProfileUpdate)}>
					<div className="form-row">
						<Form.Group className="col-md-6">
							<Form.Label>First Name</Form.Label>
							<Form.Control type="text" defaultValue={ users ? users.first_name : ''} placeholder="Enter First name"
								{...props.register("firstName", {
									required: `First name field is required`,
								})} />
						</Form.Group>
						<Form.Group className="col-md-6">
							<Form.Label>Last Name</Form.Label>
							<Form.Control type="text" defaultValue={ users ? users.second_name : ''} placeholder="Enter Last name"
								{...props.register("lastName", {
									required: `Last name field is required`,
								})} />
						</Form.Group>
						<Form.Group className="col-md-12">
							<Form.Label>Email id</Form.Label>
							<Form.Control type="text" defaultValue={ users ? users.email : ''} placeholder="Enter Email id"
								{...props.register("emailId", {
									required: `Email id field is required`,
								})} />
						</Form.Group>
						{/* <Form.Group className="col-md-12 mb-0">
								<Form.Label>Password</Form.Label>
								<Form.Control type="password" defaultValue="**********" placeholder="Enter password" />
							</Form.Group> */}
					</div>
				</Form>
			</Modal.Body>
			{Object.values(props.errors).forEach((err: any, index: any) => {
				if (typeof err !== "undefined")
					errorMsg.push(<li key={index}>{err.message}</li>);
			})}

			{errorMsg.length != 0 ? (
				<Alert
					variant="danger"
					dismissible
					role="alert"
					className=""
					onClose={() => {
						errorMsg = [];
					}}
				>
					Errors:
					<ul>{errorMsg}</ul>
				</Alert>
			) : ("")}
			      {info && (
					<Alert
					variant="success"
					dismissible
					role="alert"
					className="currentOrderInfo"
					onClose={() => {
						setInfo("");
					}}
					>
					{info}
					</Alert>
				)}
			<Modal.Footer>
				<Button type='button' onClick={props.onHide} variant="outline-primary" className="d-flex text-center justify-content-center">CANCEL</Button>
				<Button type="submit"
					variant="primary"
					className="d-flex text-center justify-content-center"
					form="profileForm">UPDTAE</Button>
			</Modal.Footer>
		</Modal>
	);
}
export default EditProfileModal;