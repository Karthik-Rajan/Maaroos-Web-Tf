import React from 'react';
import {Container} from 'react-bootstrap';
import PageTitle from './common/PageTitle';
import { Row , Col} from 'react-bootstrap';

export default () => {
    	return (
    		<>
	    		<PageTitle 
	    			title="Contact Us"
	    		/>
	    		<section className="section pt-5 pb-5">
			         <Container>
                     <Row>
			               <Col md={12}>
			                  <h4 className="font-weight-bold mt-0 mb-3">You may contact us using the information below:</h4>
			               </Col>
			               <Col md={12} style={{"font-size" : "17px"}}>
                            Merchant Legal entity name: <b>MAAROOS</b><br/>
                            Registered Address: <b>FNo: T2, Sai Triambakkam Flats, Lakshmi Nagar Main Road, Plot No: 11, Madipakkam. Kanchipuram TAMIL NADU 600091</b><br/>
                            E-Mail ID: <b>support@maaroos.com</b><br/>
                           </Col>
                     </Row>
			         </Container>
			    </section>
	    	</>
    	);
}