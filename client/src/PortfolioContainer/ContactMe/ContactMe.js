import React, { useState } from 'react';
import Typical from 'react-typical';
import axios from 'axios';
import { toast } from 'react-toastify';
import imgBack from '../../images/email.png';
import load1 from '../../images/load2.gif';
import ScreenHeading from '../../utils/ScreenHeading/ScreenHeading';
import ScrollService from '../../utils/ScrollService';
import Animations from '../../utils/Animations';
import './ContactMe.css';
import Footer from '../../PortfolioContainer/Footer/Footer';

export default function ContactMe(props) {
  let fadeInScreenHandler = (screen) => {
    if (screen.fadeInScreen !== props.id) return;
    Animations.animations.fadeInScreen(props.id);
  };
  const fadeInSubscription =
    ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [banner, setBanner] = useState('');
  const [bool, setBool] = useState(false);

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      let data = {
        name,
        email,
        message,
      };
      setBool(true);
      const res = await axios.post(`/contact`, data);
      if (name.length === 0 || email.length === 0 || message.length === 0) {
        setBanner(res.data.msg);
        toast.error(res.data.msg);
        setBool(false);
      } else if (res.status === 200) {
        setBanner(res.data.msg);
        toast.success(res.data.msg);
        setBool(false);

        setName('');
        setEmail('');
        setMessage('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='main-container' id={props.id || ''}>
      <ScreenHeading subHeading={"let's keep in touch"} title={'Contact Me'} />
      <div className='central-form'>
        <div className='col'>
          <h2 className='title'>
            <Typical loop={Infinity} steps={['Get in Touch', 1000]} />
          </h2>{' '}
          <a
            href='https://www.linkedin.com/in/aisulu-k-73b91797/'
            target='_blank'
          >
            <i className='fa fa-linkedin'></i>
          </a>
          <a href='https://github.com/alive2020' target='_blank'>
            <i className='fa fa-github'></i>
          </a>
          <a href='https://twitter.com/icecalee' target='_blank'>
            <i className='fa fa-twitter'></i>
          </a>
          <a href='https://www.instagram.com/allabout_ice/' target='_blank'>
            <i className='fa fa-instagram'></i>
          </a>
        </div>
        <div className='back-form'>
          <div className='img-back'>
            {/* <h4>Send Your Email Here!</h4> */}
            <img src={imgBack} alt='image not found' />
          </div>
          <form onSubmit={submitForm}>
            <p>{banner}</p>
            <label htmlFor='name'>Name</label>
            <input type='text' onChange={handleName} value={name} />
            <label htmlFor='email'>Email</label>
            <input type='email' onChange={handleEmail} value={email} />
            <label htmlFor='message'>Message</label>
            <textarea type='text' onChange={handleMessage} value={message} />
            <div className='send-btn'>
              <button type='submit'>
                Send
                <i className='fa fa-paper-plane' />
                {bool ? (
                  <b className='load'>
                    <img src={load1} alt='image not responding' />
                  </b>
                ) : (
                  ''
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* <Footer /> */}
      <p className='copyRight'>All rights reserved &copy; Ice Calee 2021</p>
    </div>
  );
}
