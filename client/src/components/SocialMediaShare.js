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
import './SocialMediaShare.css'

function SocialMediaShare ({ item }) {
  console.log('SocialMediaShare -> item', item)
  const { proverb, translation, explanation } = item
  // const shareUrl = `${process.env.APP_BASE_URL}/proverbs/get-proverb/item._id`
  const shareUrl = 'www.facebook.com'
  const quote = `I found this awesome proverb 
  It says "${proverb}" which means literary "${translation}" and figuratively "${explanation}"`

  return (
    <div className='social_media_share'>
      <FacebookShareButton url={shareUrl} quote={quote}>
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>
      <FacebookMessengerShareButton
        url={shareUrl}
        appId={process.env.REACT_APP_FACEBOOK_KEY}
      >
        <FacebookMessengerIcon size={32} round />
      </FacebookMessengerShareButton>
      <TwitterShareButton url={shareUrl} title={quote}>
        <TwitterIcon size={32} round={true} />
      </TwitterShareButton>
      <LinkedinShareButton url={shareUrl}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
      <EmailShareButton url={shareUrl} subject={proverb} body={quote}>
        <EmailIcon size={32} round={true} />
      </EmailShareButton>
      <TelegramShareButton url={shareUrl} title={quote}>
        <TelegramIcon size={32} round={true} />
      </TelegramShareButton>
      <TumblrShareButton url={shareUrl} title={quote}>
        <TumblrIcon size={32} round={true} />
      </TumblrShareButton>
      <WhatsappShareButton url={shareUrl} title={quote}>
        <WhatsappIcon size={32} round={true} />
      </WhatsappShareButton>
    </div>
  )
}

export default SocialMediaShare
