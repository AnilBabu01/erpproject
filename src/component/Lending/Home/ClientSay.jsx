import React from 'react'
import Style from './ClientSay.module.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { TiVendorAndroid } from "react-icons/ti";
import { FaApple } from "react-icons/fa";

const clientMessage = [
    {
      _id: 101,
      clientName: "David Lee",
      message: "I was blown away by how quickly and efficiently webtonative.com was able to convert my website into an app. The process was seamless, and the final product exceeded my expectations. Thank you for your excellent service!",
      userOfAndroid: <TiVendorAndroid />,
      userOfApple: <FaApple />,
    },
    {
      _id: 102,
      clientName: "Jessica Thompson",
      message: "I'm so glad I found w2n! They took care of everything from start to finish, including Playstore and Appstore publishing services. The app they developed for me has been a game-changer for my business, and the added features like Facebook events and Apps Flyer have helped me reach a wider audience. Thank you!",
      userOfAndroid: <TiVendorAndroid />,
      userOfApple: <FaApple />,
    },
    {
      _id: 103,
      clientName: "Jane Doe",
      message: "The team at webtonative.com was fantastic to work with. They took care of everything from publishing to the app stores to ensuring our app was optimized for Facebook events and Apps Flyer. I highly recommend their services.",
      userOfAndroid: <TiVendorAndroid />,
    },
    {
      _id: 104,
      clientName: "John Smith",
      message: "I was amazed at how quickly and seamlessly my website was converted into an android app. The biometric and native contacts features make it easy for my users to access my app quickly and easily. Thank you for the great service!",
      userOfAndroid: <TiVendorAndroid />,
    },
  ];

const ClientSay = () => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 700,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 550,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
  return (
    <>
    <div className={Style.clientContainer}>
        <h2>What our clients say!</h2>
        <div className={Style.clientSlider}>
        <Slider {...settings}
        >
            {clientMessage.map((data,index) => (
          <div key={index}>
              <div className={Style.clientSliderMessage}>
                <div className={Style.commasImages}>
                  <img src="/images/upperComma.jpg" alt="" srcset="" />
                </div>
                  <div>
                    <p>{data.message}</p>
                  </div>
                  <div>
                    <p className={Style.clientNames}>{data.clientName}</p>
                    <div className={Style.userOf}>
                    <p>User of </p>
                    <p style={{fontSize: "20px"}}> {data.userOfAndroid}</p>
                    <p style={{fontSize: "20px"}}> {data.userOfApple}</p>
                    </div>
                  </div>
                </div>
            </div>
            ))}
            </Slider>
        </div>
    </div>
    </>
  )
}

export default ClientSay