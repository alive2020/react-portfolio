import React from 'react';
import Typical from 'react-typical';
import './Profile.css';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

export default function Profile() {
  const { t, i18n } = useTranslation();

  return (
    <div className='profile-container'>
      <div className='profile-parent'>
        <div className='profile-details'>
          <div className='colz'>
            <div className='colz-icon'>
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
          </div>
          <div className='profile-details-name'>
            <span className='primary-text'>
              {' '}
              Hello, I'm <span className='highlighted-text'>Ice Calee</span>
            </span>
          </div>
          <div className='profile-details-role'>
            <span className='primary-text'>
              {' '}
              <h1>
                {' '}
                <Typical
                  loop={Infinity}
                  steps={[
                    'Junior Frontend Developer 💻',
                    1000,
                    'Self-taught in 6 months 🤓',
                    1000,
                    'Passionate to Learn 📚',
                    1000,
                    'Former Marketing Specialist 🟣',
                    1000,
                  ]}
                />
              </h1>
              <span className='profile-role-tagline'>
                Open to work in an enthusiastic and flexible environment.
              </span>
            </span>
          </div>
          <div className='profile-options'>
            <button className='btn primary-btn'>
              {''}
              Hire Me{' '}
            </button>
            <a href='AisuluK_Resume.pdf' download='AisuluK_Resume.pdf'>
              <button className='btn highlighted-btn'>Get Resume</button>
            </a>
          </div>
        </div>
        <div className='profile-picture'>
          <div className='profile-picture-background'></div>
        </div>
      </div>
    </div>
  );
}
