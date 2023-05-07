import React from 'react';
import OfferItem from './OfferItem';
import { Lorem } from './data';

const Offer = () => {
    return (
        <div className="container mx-auto px-5 grid lg:grid-cols-4 sm:grid-cols-2 gap-8">
          <OfferItem
            img="/24-7.png"
            text="24/7 Support"
            imgIcon="/tech-support.gif"
            lorem="We understand the importance of providing uninterrupted support for our products. That's why we offer round-the-clock support, 24 hours a day, 7 days a week. Our dedicated support team is always available to assist you"
          ></OfferItem>
          <OfferItem
            img="/cash-back.png"
            text="Cash Back"
            imgIcon="/cashback.gif"
            lorem="Cash back programs have become increasingly popular among consumers, and at my company, we offer an exciting cash back feature to enhance your shopping experience."
          ></OfferItem>
          <OfferItem
            img="/discount.png"
            text="Monthly Offer"
            imgIcon="/black-friday.gif"
            lorem="Introducing our exciting monthly offer! At our company, we believe in providing our valued customers with exclusive deals and promotions that make their experience even more rewarding."
          ></OfferItem>
          <OfferItem
            img="/premium.png"
            text="Membership"
            imgIcon="/award.gif"
            lorem="Introducing our exclusive membership program! We are delighted to offer our valued customers the opportunity to become a member and unlock a host of benefits and privileges."
          ></OfferItem>
        </div>
    );
};

export default Offer;