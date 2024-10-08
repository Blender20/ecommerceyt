import { payment } from '../assets'
import Container from './Container'
import FooterTop from './FooterTop'

const Footer = () => {
  return (
    <div className='mt-10'>
      <FooterTop />
      <Container className='flex flex-col md:flex-row items-center gap-4 justify-between'>
        <p>Hippo LLC @2024 All rights reserved.</p>
        <img src={payment} alt='payment-img' />
      </Container>
    </div>
  )
}

export default Footer
