import React, { useCallback, useEffect } from 'react';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import useRazorpay from "react-razorpay";
import { Chip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { rechargeWallet } from '../../actions/api';

const Wallet = (props: any) => {
  const { profile, wallet } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const { mobile, email, first_name, second_name, id } = profile.data;
  const name = first_name + ' ' + second_name;
  const getQty = () => { }

  const [Razorpay] = useRazorpay();


  const handlePayment = async (amount: number) => {
    let options: any = {};
    // await props.createWalletEntry(amount * 100);
    console.log('handlePayment', wallet);

    console.log('wallet', wallet);
    options = await {
      key: "rzp_test_JLOs2SaWEERrUz",
      amount: amount * 100,
      currency: "INR",
      name: "MAAROOS",
      description: "Wallet Recharge",
      image: "https://web.maaroos.com/img/logo.png",
      order_id: undefined,
      handler: (res: any) => {
        rechargeWallet({
          amount,
          medium_payment_id: res.razorpay_payment_id,
          mode: 'CREDIT',
          medium: 'RAZOR',
          customer_email: email,
          customer_mobile: mobile,
          customer_id: id
        })
      },
      prefill: {
        name,
        email,
        contact: mobile
      },
      notes: {
        address: "Maaroos Corporate Office",
      },
      theme: {
        color: "#d82926",
      },
    };
    console.log(options);
    const rzpay = await new Razorpay(options);
    await rzpay.open();
  }

  return <>
    <Container>
      <Row>
        <Col md={12}>
          <div className='p-4 bg-white shadow-sm'>
            <div className="generator-bg shadow-sm mb-4 p-4 osahan-cart-item ">
              <h5 className="mb-1 text-white">Wallet & Transactions</h5>
              {/* <p className="mb-4 text-white">6 Items</p> */}

              <div className="bg-white rounded shadow-sm mb-2"></div>
              <div className="mb-2 rounded p-2 clearfix text-white">
                <Image
                  fluid
                  className="float-left"
                  src="/img/wallet_icon.png"
                />
                <h6 className="text-white font-weight-bold text-right mb-2">
                  Closing Balance : <span className="moneyFont">$456.42</span>
                </h6>
                <p className="text-white mb-0 text-right">
                  On-Hold Amount : <span className="">$50.00</span>
                </p>

                {/* <div className="float-right"> */}
                {/* <Button variant="outlined text-white float-right">Recharge</Button> */}
                {/* <Button variant="outlined text-white float-right">Statement</Button> */}
                Recharge with&nbsp;&nbsp;
                <Chip label="₹500" variant="outlined" className="text-white" onClick={(event) => { handlePayment(500); }} />&nbsp;
                <Chip label="₹1000" variant="outlined" className="text-white" onClick={(event) => { handlePayment(1000); }} />&nbsp;
                <Chip label="₹1500" variant="outlined" className="text-white" onClick={(event) => { handlePayment(1500); }} />&nbsp;
                <Chip label="₹2000" variant="outlined" className="text-white" onClick={(event) => { handlePayment(2000); }} />&nbsp;
                <Chip label="₹2500" variant="outlined" className="text-white" onClick={(event) => { handlePayment(2500); }} />&nbsp;
                <Chip label="Other amount" variant="outlined" className="text-white" onClick={(event) => { handlePayment(0); }} />&nbsp;
              </div>
            </div>
            <h6 className="font-weight-bold text-left mb-2">Recent Transactions</h6>
          </div>
        </Col>
      </Row>
    </Container>
  </>
}

export default Wallet;