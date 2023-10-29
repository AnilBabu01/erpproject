import React from 'react';
import { ShareButton } from 'react-share';

const WhatsAppShareButton = ({ imageUrl, title }) => {
  const shareUrl = imageUrl;

  return (
    <ShareButton
      socialMedia="whatsapp"
      url={shareUrl}
      title={title}
    >
      Share on WhatsApp
    </ShareButton>
  );
};

export default WhatsAppShareButton;