import React from "react";
import { BsArrowDown, BsArrowUp, BsInfoCircleFill } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper/modules";

import Swap from "../assets/Icons/ArrowSwap.svg";
import Document from "../assets/Icons/Document.svg";
import ISquare from "../assets/Icons/InformationSquare.svg";
import Refresh from "../assets/Icons/Refresh.svg";
import CSend from "../assets/Icons/card-send.svg";
import Money from "../assets/Icons/money.svg";
import Net from "../assets/Icons/net.svg";
import Shop from "../assets/Icons/shop.svg";
import Card from "./Card";

const DashboardCard = () => {
  const cardData = [
    {
      icon: Shop,
      title: (
        <div className="card_sm_title">
          <p>Total Sales</p>
          <BsInfoCircleFill />
        </div>
      ),
      valu: "$128k",
      status: (
        <div className="card_status_text">
          <p>
            <span className="up">
              <BsArrowUp />
              35.00%
            </span>
            This week
          </p>
        </div>
      ),
      cName: "d_card_1",
    },
    {
      icon: Net,
      title: (
        <div className="card_sm_title">
          <p>Net</p>
          <BsInfoCircleFill />
        </div>
      ),
      valu: "$321k",
      status: (
        <div className="card_status_text">
          <p>
            <span className="down">
              <BsArrowDown />
              35.00%
            </span>
            This week
          </p>
        </div>
      ),
      cName: "d_card_2",
    },
    {
      icon: Document,
      title: (
        <div className="card_sm_title">
          <p>Invoice Due</p>
          <BsInfoCircleFill />
        </div>
      ),
      valu: "$64k",
      status: (
        <div className="card_status_text">
          <p>
            <span className="up">
              <BsArrowUp />
              35.00%
            </span>
            This week
          </p>
        </div>
      ),
      cName: "d_card_3",
    },
    {
      icon: Swap,
      title: (
        <div className="card_sm_title">
          <p>Total Sell Return</p>
          <BsInfoCircleFill />
        </div>
      ),
      valu: "$512k",
      status: (
        <div className="card_status_text">
          <p>
            <span className="down">
              <BsArrowUp />
              35.00%
            </span>
            This week
          </p>
        </div>
      ),
      cName: "d_card_4",
    },
    {
      icon: Money,
      title: (
        <div className="card_sm_title">
          <p>Total Purchase</p>
          <BsInfoCircleFill />
        </div>
      ),
      valu: "$128k",
      status: (
        <div className="card_status_text">
          <p>
            <span className="up">
              <BsArrowUp />
              35.00%
            </span>
            This week
          </p>
        </div>
      ),
      cName: "d_card_5",
    },
    {
      icon: ISquare,
      title: (
        <div className="card_sm_title">
          <p>Purchase Due</p>
          <BsInfoCircleFill />
        </div>
      ),
      valu: "$512k",
      status: (
        <div className="card_status_text">
          <p>
            <span className="down">
              <BsArrowUp />
              35.00%
            </span>
            This week
          </p>
        </div>
      ),
      cName: "d_card_6",
    },
    {
      icon: Refresh,
      title: (
        <div className="card_sm_title">
          <p>Toral Purchase Return</p>
          <BsInfoCircleFill />
        </div>
      ),
      valu: "$64k",
      status: (
        <div className="card_status_text">
          <p>
            <span className="up">
              <BsArrowUp />
              35.00%
            </span>
            This week
          </p>
        </div>
      ),
      cName: "d_card_7",
    },
    {
      icon: CSend,
      title: (
        <div className="card_sm_title">
          <p>Expense</p>
          <BsInfoCircleFill />
        </div>
      ),
      valu: "$452k",
      status: (
        <div className="card_status_text">
          <p>
            <span className="down">
              <BsArrowUp />
              35.00%
            </span>
            This week
          </p>
        </div>
      ),
      cName: "d_card_8",
    },
  ];

  return (
    <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
      <SwiperSlide>
        <div className="row">
          {cardData.map((card, index) => (
            <div className="col-lg-3 col-md-6 col-sm-12" key={index}>
              <Card
                icon={card.icon}
                title={card.title}
                valu={card.valu}
                status={card.status}
                cName={card.cName}
              />
            </div>
          ))}
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="row">
          {cardData.map((card, index) => (
            <div className="col-lg-3 col-md-6 col-sm-12" key={index}>
              <Card
                icon={card.icon}
                title={card.title}
                valu={card.valu}
                status={card.status}
                cName={card.cName}
              />
            </div>
          ))}
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default DashboardCard;
