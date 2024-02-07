import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import TabPane from "react-bootstrap/TabPane";
// import { BsCheckLg } from "react-icons/bs";
// import InputField from "../Components/InputField/InputField";
// import Gpay from "../Components/assets/Icons/Gpay.svg";
// import MastarCard from "../Components/assets/Icons/MastarCard.svg";
// import paypal from "../Components/assets/Icons/paypal.svg";
// import stripe from "../Components/assets/Icons/stripe.svg";
// import Visa from "../Components/assets/Icons/visa.svg";

import { GoCheckCircleFill, GoXCircleFill } from "react-icons/go";
import Payment from "../Components/StripeForm/Payment";
import { useSelector } from "react-redux";

function Billing() {
  const [activeTab, setActiveTab] = useState("first");
  const [paymentDetails, setPaymentDetails] = useState({
    paymentMethodType: 'card',
    amount: 500
  });
  const receiptData = useSelector(state => state.receipt.receiptData);
  const userAttributes = useSelector(state => state.user?.user);

  const handleTabClick = (eventKey) => {
    // setActiveTab(eventKey);

  };

  const handleBuyClick = (amount) => {
    setActiveTab("second");
    setPaymentDetails({
      ...paymentDetails,
      amount: amount
    });
  };

  useEffect(() => {
    if (receiptData && receiptData?.step) {
      setActiveTab('third');
    }
  }, [receiptData]);

  return (
    <>
      <div className="section_title mb-5">
        <h2>Billing</h2>
      </div>
      <Tab.Container activeKey={activeTab}>
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link eventKey="first" onClick={() => handleTabClick("first")}>
              Select Plan
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="second"
              onClick={() => handleTabClick("second")}
            >
              Payment
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="third" onClick={() => handleTabClick("third")}>
              Receipt
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <div className="buy_credits_page">
            {activeTab === "first" && (
              <TabPane eventKey="first">
                <div className="row mt-2">
                  <div className="col-lg-4 col-md-6 col-sm-12 mt-4">
                    <div className="buy_card">
                      <div className="header">
                        <h1>100 Credits</h1>
                        <h1>$5</h1>
                      </div>
                      <div className="btn_area">
                        <button className="btn" onClick={() => handleBuyClick(500)}>
                          Buy
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12 mt-4">
                    <div className="buy_card">
                      <div className="header">
                        <h1>200 Credits</h1>
                        <h1>$10</h1>
                      </div>
                      <div className="btn_area">
                        <button className="btn" onClick={() => handleBuyClick(1000)}>
                          Buy
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12 mt-4">
                    <div className="buy_card">
                      <div className="header">
                        <h1>300 Credits</h1>
                        <h1>$15</h1>
                      </div>
                      <div className="btn_area">
                        <button className="btn" onClick={() => handleBuyClick(1500)}>
                          Buy
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPane>
            )}
            {activeTab === "second" && (
              <TabPane eventKey="second">
                <div className="row mt-2">
                  <div className="col-lg-6 col-md-12 mt-4">
                    <div className="buy_card">
                      <h3>Add Payment Method</h3>
                      <Payment paymentDetails={paymentDetails}/>
                      {/* <div className="payer_list">
                        <img src={Visa} alt="" />
                        <img src={stripe} alt="" />
                        <img src={paypal} alt="" />
                        <img src={MastarCard} alt="" />
                        <img src={Gpay} alt="" />
                      </div>
                      <form action="" className="mt-5">
                        <div className="input_group">
                          <InputField
                            label="Card holder name"
                            placeholder="Full Name"
                          />
                          <InputField
                            label="Card number"
                            placeholder="Enter your Card number..."
                          />
                        </div>
                        <div className="input_group mt-3">
                          <InputField label="CVV" placeholder="Full Name" />
                          <InputField
                            label="Expiration Date"
                            placeholder="MM/DD/YY"
                          />
                        </div>
                      </form> */}
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12 mt-4">
                    <div className="buy_card payment_status_tab">
                      <h3>Payment Status</h3>
                      <div className="status_list">
                        <div className="item">
                          <p>Credits Will be</p>
                          <p>{paymentDetails?.amount * 20 / 100}</p>
                        </div>
                        <div className="item">
                          <p>Charge Will be</p>
                          <h3>${paymentDetails?.amount / 100}</h3>
                        </div>
                      </div>
                      {/* <button className="btn" onClick={handlerecepitClick}>
                        Payment Now
                      </button> */}
                    </div>
                  </div>
                </div>
              </TabPane>
            )}
            {receiptData && receiptData.status === 'success' ? (
              <TabPane eventKey="third">
                <div className="receipt_tab">
                  <div className="receipt_area">
                    <div className="hader_c_name">
                      <p>
                        <b>ASKMAIL</b>
                      </p>
                    </div>
                    <hr />
                    <div className="tnx_are">
                      <GoCheckCircleFill className="icons" />
                      <h2>Thank you for your order</h2>
                    </div>
                    <hr />
                    <div className="info_area">
                      <p className="item_title">Invoice #334</p>
                      <div className="item">
                        <p>Customer:</p>
                        <p>
                          <span className="name">{userAttributes?.name}</span>
                          <span className="email">({userAttributes?.email})</span>
                        </p>
                      </div>
                      <div className="item">
                        <p>Payment method:</p>
                        <p>
                          <span className="name">Credit Card</span>
                        </p>
                      </div>
                      <div className="item">
                        <p>Date of payment:</p>
                        <p>
                          <span className="name">{receiptData?.paymentDate}</span>
                        </p>
                      </div>
                      <hr />
                      <div className="item value">
                        <p className="name">{paymentDetails?.amount * 20 / 100} Credits</p>
                        <p>${paymentDetails?.amount / 100}</p>
                      </div>
                      <div className="item value">
                        <h3>Total Amount Paid</h3>
                        <h3>${paymentDetails?.amount / 100}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPane>
            ) : (
              <TabPane eventKey="third">
                <div className="receipt_tab">
                  <div className="receipt_area">
                    <div className="hader_c_name">
                      <p>
                        <b>ASKMAIL</b>
                      </p>
                    </div>
                    <hr />
                    <div className="tnx_are">
                      <GoXCircleFill className="icons" color="orangered" />
                      <h2>Transaction hasn't been successful</h2>
                    </div>
                    <hr />
                    <div className="info_area">
                      <p className="item_title" style={{color: 'orangered'}}>Payment Failed</p>
                      <div className="item">
                        <p>Customer:</p>
                        <p>
                          <span className="name">{userAttributes?.name}</span>
                          <span className="email">({userAttributes?.email})</span>
                        </p>
                      </div>
                      <div className="item">
                        <p>Payment method:</p>
                        <p>
                          <span className="name">Credit Card</span>
                        </p>
                      </div>
                      <div className="item">
                        <p>Date of payment:</p>
                        <p>
                          <span className="name">{receiptData?.paymentDate}</span>
                        </p>
                      </div>
                      <hr />
                      <div className="item value">
                        <p className="name">{paymentDetails?.amount * 20 / 100} Credits</p>
                        <p>${paymentDetails?.amount / 100}</p>
                      </div>
                      <div className="item value">
                        <h3>Total Amount Paid</h3>
                        <h3>${paymentDetails?.amount / 100}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPane>
            )}
          </div>
        </Tab.Content>
      </Tab.Container>
    </>
  );
}

export default Billing;
