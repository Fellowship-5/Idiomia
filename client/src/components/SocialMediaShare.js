import React from 'react'
import {
  EmailShareButton,
  FacebookShareButton,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  TelegramShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TumblrShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  WhatsappIcon
} from 'react-share'
function SocialMediaShare () {
  return (
    <div>
      <FacebookShareButton>
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>
      <FacebookMessengerShareButton url={''} appId=''>
        <FacebookMessengerIcon size={32} round />
      </FacebookMessengerShareButton>
      <TwitterShareButton>
        <TwitterIcon size={32} round={true} />
      </TwitterShareButton>
      <LinkedinShareButton url={'shareUrl'}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
      <EmailShareButton>
        <EmailIcon size={32} round={true} />
      </EmailShareButton>
      <TelegramShareButton>
        <TelegramIcon size={32} round={true} />
      </TelegramShareButton>
      <TumblrShareButton>
        <TumblrIcon size={32} round={true} />
      </TumblrShareButton>
      <WhatsappShareButton>
        <WhatsappIcon size={32} round={true} />
      </WhatsappShareButton>
    </div>
  )
}

export default SocialMediaShare
