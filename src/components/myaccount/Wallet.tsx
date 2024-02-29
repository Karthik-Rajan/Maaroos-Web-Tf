import React, { useEffect } from 'react';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import useRazorpay from "react-razorpay";
import { Chip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { rechargeWallet, walletStatements } from '../../actions/api';
import { CurrencyRupee } from '@mui/icons-material';
import { PAYMENT_CALLBACK, WALLET_STATEMENT_RESPONSE } from '../../constants/user';
import { Transaction } from '../common/Transaction';
import { BASE_URL } from '../../constants/apis';

const Wallet = (props: any) => {
  let { profile, wallet, statements } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  let { mobile, email, first_name, second_name, id, wallet_balance } = profile.data;

  useEffect(() => {
    fetchStatements();
  }, []);
  const name = first_name + ' ' + second_name;
  const getQty = () => { }
  const [Razorpay] = useRazorpay();
  const handlePayment = async (amount: number) => {
    let options: any = {};
    // await props.createWalletEntry(amount * 100);

    options = await {
      key: "rzp_test_JLOs2SaWEERrUz",
      amount: amount * 100,
      currency: "INR",
      name: "MAAROOS",
      description: "Wallet Recharge",
      image: "https://web.maaroos.com/img/logo.png",
      order_id: undefined,
      handler: (res: any) => {
        console.log(res)
        rechargeWallet({
          amount,
          medium_payment_id: res.razorpay_payment_id,
          mode: 'CREDIT',
          medium: 'RAZOR',
          customer_email: email,
          customer_mobile: mobile,
          customer_id: id
        })
          .then(async () => {
            setTimeout(() => {
              props.getProfile();
              fetchStatements()
            }, 2500)
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
    const rzpay = await new Razorpay(options);
    await rzpay.open();
  }

  const fetchStatements = async () => {
    await walletStatements()
      .then((data: any) => {
        dispatch({ type: WALLET_STATEMENT_RESPONSE, payload: { statements: data } });
      })
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
                  Closing Balance : <span className="moneyFont"><CurrencyRupee />{wallet_balance | 0.0}</span>
                </h6>
                <p className="text-white mb-0 text-right">
                  On-Hold Amount : <span className=""><CurrencyRupee />0.0</span>
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
            <br />
            <Transaction statements={statements} />
          </div>
        </Col>
      </Row>
    </Container>
  </>
}

export default Wallet;