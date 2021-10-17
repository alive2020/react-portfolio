import React, { useState, useEffect } from 'react';
import ScreenHeading from '../../utils/ScreenHeading/ScreenHeading';
import ScrollService from '../../utils/ScrollService';
import Animations from '../../utils/Animations';
import './Resume.css';

export default function Resume(props) {
  const [selectedBulletIndex, setSelectedBulletIndex] = useState(0);
  const [carousalOffSetStyle, setCarousalOffSetStyle] = useState({});

  let fadeInScreenHandler = (screen) => {
    if (screen.fadeScreen !== props.id) return;
    Animations.animations.fadeInScreen(props.id);
  };
  const fadeInSubscription =
    ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler);

  const ResumeHeading = (props) => {
    return (
      <div className='resume-heading'>
        <div className='resume-main-heading'>
          <div className='heading-bullet'>
            <span>{props.heading ? props.heading : ''}</span>
            {props.fromDate && props.toDate ? (
              <div className='heading-date'>
                {props.fromDate + '_' + props.toDate}
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div className='resume-sub-heading'>
            <span>{props.subHeading ? props.subHeading : ''}</span>
          </div>
          <div className='resume-heading-description'>
            <span>{props.description ? props.description : ''}</span>
          </div>
        </div>
      </div>
    );
  };

  const resumeBullets = [
    { label: 'Frontend Work Experience', logoSrc: 'work-history.svg' },
    { label: 'Side Projects', logoSrc: 'projects.svg' },
    { label: 'Skills', logoSrc: 'programming-skills.svg' },
  ];

  const programmingSkillsDetails = [
    { skill: 'HTML' },
    { skill: 'CSS/Sass' },
    { skill: 'JavaScript' },
    { skill: 'Typescript' },
    { skill: 'React' },
    { skill: 'Vue' },
    { skill: 'Webpack/Babel' },
    { skill: 'MongoDB' },
    { skill: 'Node.js' },
  ];

  const projectDetails = [
    {
      title: 'UPKAIT website',
      duration: { fromDate: '2021.01', toDate: '2021.03' },
      description:
        'Website of Wholesale Food Distributing Company located in Busan UPKAIT , which supplies korean food products across the territory of the Far East, Siberia, Kazakhstan, Uzbekistan. Developed a multilingual website from scratch in a team of 2 people. I was responsible for the design, style, content of a website, and content on Prismic CMS. Learned more about styling a website according to requirements of a client and using headless CMS as Prismic.',

      subHeading: 'Technologies used: Next.js, Node.js, CSS, Prismic',
    },
    {
      title: 'Personal Portfolio Website',
      duration: { fromDate: '2020.12', toDate: '2021.01' },
      description: 'My first portfolio using pure Javascript, CSS, HTML',
      subHeading: 'Technologies used: Javascript, CSS, HTML',
    },
  ];

  const resumeDetails = [
    <div className='resume-screen-container' key='work-experience'>
      <ResumeHeading
        heading={'Amond Inc.'}
        subHeading={'Junior front-end developer intern'}
        fromDate={'2021.04'}
        toDate={'2021.09'}
      />
      <div className='experience-description'>
        <span className='resume-description-text'>
          Responsible for hellolive.tv back office development and enhancement
        </span>
      </div>
      <div className='experience-description'>
        <span className='resume-description-text'>
          - Used Vue.js and Vuetify to develop the back-office
        </span>
        <br />
        <span className='resume-description-text'>
          - Worked with backend developer to implement functionality that
          Hellolive platform needed
        </span>
        <span className='resume-description-text'>
          - Enhanced UI of the backoffice according to the CS workers' demands
        </span>
      </div>
      ,
      <div
        className='resume-screen-container programming-skills-container'
        key='programming-skills'
      >
        {programmingSkillsDetails.map((skill, index) => {
          <div className='skill-parent' key={index}>
            <div className='heading-bullet'></div>
            <span>{skill.skill}</span>
          </div>;
        })}
      </div>
      ,
      <div className='resume-screen-container' key='projects'>
        {projectDetails.map((projectDetails, index) => {
          <ResumeHeading
            key={index}
            heading={projectDetails.title}
            subHeading={projectDetails.subHeading}
            description={projectDetails.description}
            fromDate={projectDetails.duration.fromDate}
            toDate={projectDetails.duration.toDate}
          />;
        })}
      </div>
    </div>,
  ];

  const handleCarousel = (index) => {
    let offsetHeight = 360;
    let newCarouselOffset = {
      style: { transform: 'translateY(' + index * offsetHeight * -1 + 'px)' },
    };
    setCarousalOffSetStyle(newCarouselOffset);
    setSelectedBulletIndex(index);
  };

  const getBullets = () => {
    return resumeBullets.map((bullet, index) => (
      <div
        onClick={() => handleCarousel(index)}
        className={
          index === selectedBulletIndex ? 'bullet selected-bullet' : 'bullet'
        }
        key={index}
      >
        <img
          className='bullet-logo'
          src={require(`../../assets/Resume/${bullet.logoSrc}`).default}
          alt='B'
        />
      </div>
    ));
  };

  const getResumeScreen = () => {
    return (
      <div
        style={carousalOffSetStyle.style}
        className='resume-details-carousal'
      >
        {resumeDetails.map((ResumeDetail) => ResumeDetail)}
      </div>
    );
  };

  return (
    <div className='resume-container screen-container' id={props.id || ''}>
      <div className='resume-content'>
        <ScreenHeading title={'Resume'} subHeading={'My Formal Bio Details'} />
        <div className='resume-card'>
          <div className='resume-bullets'>
            <div className='bullet-container'>
              <div className='bullet-icons'></div>
              <div className='bullets'>{getBullets()}</div>
            </div>
          </div>
          <div className='resume-bullet-details'>{getResumeScreen()}</div>
        </div>
      </div>
    </div>
  );
}
