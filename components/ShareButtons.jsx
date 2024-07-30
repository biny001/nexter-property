import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  EmailIcon,
} from "react-share";

const ShareButtons = ({ property }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;
  return (
    <>
      <h3 className=" text-xl font-bod text-center pt-2">
        Share this property
      </h3>
      <div className=" flex gap-3 justify-center pb-5">
        <FacebookShareButton
          url={shareUrl}
          qoute={property.name}
          hashtag={`#${property.type}ForRent  `}
        >
          <FacebookIcon
            size={32}
            round={true}
          />
        </FacebookShareButton>
        <TwitterShareButton
          url={shareUrl}
          title={property.name}
          hashtags={[` ${property.type.replace(/\s/g, "")}ForRent`]}
        >
          <TwitterIcon
            size={32}
            round={true}
          />
        </TwitterShareButton>
        <WhatsappShareButton
          url={shareUrl}
          title={property.name}
          separator=":: "
        >
          <img
            src="/whatsapp.svg"
            alt="whatsapp"
            className="w-8 h-8"
          />
        </WhatsappShareButton>
        <EmailShareButton
          url={shareUrl}
          subject={property.name}
          body={`Check out this cabin listing ${shareUrl}`}
        >
          <EmailIcon
            size={32}
            round={true}
          />
        </EmailShareButton>
      </div>
    </>
  );
};

export default ShareButtons;
