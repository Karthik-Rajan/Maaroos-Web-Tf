import React from 'react';
import {Container} from 'react-bootstrap';
import PageTitle from './common/PageTitle';
import { Row , Col} from 'react-bootstrap';

export default () => {
    	return (
    		<>
	    		<PageTitle 
	    			title="Privacy Policy"
	    		/>
	    		<section className="section pt-5 pb-5">
			         <Container>
                     <Row>
			               <Col md={12} style={{"font-size" : "17px"}}>
                            This privacy policy sets out how <span className="brand-title">MAAROOS</span> uses and protects any information that you give <span className="brand-title">MAAROOS</span> when you use this website. <br/>
                            <span className="brand-title">MAAROOS</span> is committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this website, and then you can be assured that it will only be used in accordance with this privacy statement.<br/>
                            <span className="brand-title">MAAROOS</span> may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with any changes.<br/><br/>

                            <b>We may collect the following information:</b><br/>
                            Name and job title<br/>
                            Contact information including email address<br/>
                            Demographic information such as postcode, preferences and interests<br/><br/>

                            <b>Other information relevant to customer surveys and/or offers</b><br/>
                            What we do with the information we gather<br/>
                            We require this information to understand your needs and provide you with a better service, and in particular for the following reasons:<br/>
                            -- Internal record keeping.<br/>
                            -- We may use the information to improve our products and services.<br/>
                            -- We may periodically send promotional emails about new products, special offers or other information which we think you may find interesting using the email address which you have provided.<br/>
                            -- From time to time, we may also use your information to contact you for market research purposes. <br/>
                            -- We may contact you by email, phone, fax or mail. We may use the information to customise the website according to your interests.<br/>
                            -- We are committed to ensuring that your information is secure. In order to prevent unauthorised access or disclosure we have put in suitable measures.<br/><br/>

                            <b>How we use cookies</b><br/>
                            A cookie is a small file which asks permission to be placed on your computer's hard drive. Once you agree, the file is added and the cookie helps analyses web traffic or lets you know when you visit a particular site. Cookies allow web applications to respond to you as an individual. The web application can tailor its operations to your needs, likes and dislikes by gathering and remembering information about your preferences.<br/>
                            We use traffic log cookies to identify which pages are being used. This helps us analyses data about webpage traffic and improve our website in order to tailor it to customer needs. We only use this information for statistical analysis purposes and then the data is removed from the system.<br/>
                            Overall, cookies help us provide you with a better website, by enabling us to monitor which pages you find useful and which you do not. A cookie in no way gives us access to your computer or any information about you, other than the data you choose to share with us.<br/>
                            You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. This may prevent you from taking full advantage of the website.<br/><br/>

                            <b>Controlling your personal information</b><br/>
                            You may choose to restrict the collection or use of your personal information in the following ways:<br/>
                            -- whenever you are asked to fill in a form on the website, look for the box that you can click to indicate that you do not want the information to be used by anybody for direct marketing purposes<br/>
                            -- if you have previously agreed to us using your personal information for direct marketing purposes, you may change your mind at any time by writing to or emailing us at <i>support@maaroos.com</i><br/>
                            -- We will not sell, distribute or lease your personal information to third parties unless we have your permission or are required by law to do so. We may use your personal information to send you promotional information about third parties which we think you may find interesting if you tell us that you wish this to happen.<br/><br/>
                            
                            If you believe that any information we are holding on you is incorrect or incomplete, please write to or email us as soon as possible, at the above address. We will promptly correct any information found to be incorrect.<br/>
                           </Col>
                     </Row>
			         </Container>
			    </section>
	    	</>
    	);
}