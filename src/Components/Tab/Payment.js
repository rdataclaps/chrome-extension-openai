import React from "react";
import InputField from "../InputField/InputField";
import Gpay from "../assets/Icons/Gpay.svg";
import MastarCard from "../assets/Icons/MastarCard.svg";
import paypal from "../assets/Icons/paypal.svg";
import stripe from "../assets/Icons/stripe.svg";
import Visa from "../assets/Icons/visa.svg";

function Payment() {
  return (
    <>
      <div className="row mt-4">
        <div className="col-lg-6">
          <div className="buy_card">
            <h3>Add Payment Method</h3>
            <div className="payer_list">
              <img src={Visa} alt="" />
              <img src={stripe} alt="" />
              <img src={paypal} alt="" />
              <img src={MastarCard} alt="" />
              <img src={Gpay} alt="" />
            </div>
            <form action="" className="mt-5">
              <div className="input_group">
                <InputField label="Card holder name" placeholder="Full Name" />
                <InputField
                  label="Card number"
                  placeholder="Enter your Card number..."
                />
              </div>
              <div className="input_group mt-3">
                <InputField label="CVV" placeholder="Full Name" />
                <InputField label="Expiration Date" placeholder="MM/DD/YY" />
              </div>
            </form>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="buy_card payment_status_tab">
            <h3>Payment Status</h3>
            <div className="status_list">
              <div className="item">
                <p>Credits Will be</p>
                <p>100</p>
              </div>
              <div className="item">
                <p>Charge Will be</p>
                <h3>$5</h3>
              </div>
            </div>
            <button className="btn">Payment Now</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;
