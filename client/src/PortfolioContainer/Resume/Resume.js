import React, { useState, useEffect } from 'react';
import ScreenHeading from '../../utils/ScreenHeading/ScreenHeading';
import ScrollService from '../../utils/ScrollService';
import Animations from '../../utils/Animations';
import './Resume.css';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

// export default function Resume(props)
const Resume = (props) => {
  const { t, i18n } = useTranslation();

  const [selectedBulletIndex, setSelectedBulletIndex] = useState(0);
  const [carousalOffSetStyle, setCarousalOffSetStyle] = useState({});

  let fadeInScreenHandler = (screen) => {
    if (screen.fadeInScreen !== props.id) return;
    Animations.animations.fadeInScreen(props.id);
  };
  const fadeInSubscription =
    ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler);

  const ResumeHeading = (props) => {
    return (
      <div className='resume-heading'>
        <div className='resume-main-heading'>
          <div className='heading-bullet'></div>
          <span>{props.heading ? props.heading : ''}</span>
          {props.fromDate && props.toDate ? (
            <div className='heading-date'>
              {props.fromDate + ' - ' + props.toDate}
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
    );
  };

  const resumeBullets = [
    { label: t('Resume.1'), logoSrc: 'work-history.svg' },
    { label: t('Resume.2'), logoSrc: 'projects.svg' },
    { label: t('Resume.3'), logoSrc: 'programming-skills.svg' },
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

  const projectsDetails = [
    {
      title: 'UPKAIT website',
      duration: { fromDate: '2021.01', toDate: '2021.03' },
      description: t('Projects.1'),
      subHeading: 'Technologies used: Next.js, Node.js, CSS, Prismic',
    },
    {
      title: 'Personal Portfolio Website',
      duration: { fromDate: '2020.12', toDate: '2021.01' },
      description: t('Projects.2'),
      subHeading: 'Technologies used: Javascript, CSS, HTML.',
    },
  ];

  const resumeDetails = [
    /* WORK EXPERIENCE */
    <div className='resume-screen-container' key='work-experience'>
      <div className='experience-container'>
        <ResumeHeading
          heading={'Amond Inc.'}
          subHeading={'Junior front-end developer intern'}
          fromDate={'2021.04'}
          toDate={'2021.09'}
        />
        <div className='experience-description'>
          <span className='resume-description-text'>{t('Frontend.1')}</span>
        </div>
        <div className='experience-description'>
          <span className='resume-description-text'>{t('Frontend.2')}</span>
          <br />
          <span className='resume-description-text'>{t('Frontend.3')}</span>
          <br />
          <span className='resume-description-text'>{t('Frontend.3')}</span>
          <br />
        </div>
      </div>
    </div>,

    /* PROJECTS */
    <div className='resume-screen-container' key='projects'>
      <div className='projects-container'>
        {projectsDetails.map((projectsDetails, index) => (
          <ResumeHeading
            key={index}
            heading={projectsDetails.title}
            subHeading={projectsDetails.subHeading}
            description={projectsDetails.description}
            fromDate={projectsDetails.duration.fromDate}
            toDate={projectsDetails.duration.toDate}
          />
        ))}
      </div>
    </div>,

    /* PROGRAMMING SKILLS */
    <div
      className='resume-screen-container programming-skills-container'
      key='programming-skills'
    >
      <div className='skills-container'>
        {programmingSkillsDetails.map((skill, index) => (
          <div className='skill-parent' key={index}>
            <div className='heading-bullet'></div>
            <span>{skill.skill}</span>
            {/* <div className='skill-percentage'>
            <div
              style={{ width: skill.ratingPercentage + '%' }}
              className='active-percentage-bar'
            ></div>
          </div> */}
          </div>
        ))}
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
        <span className='bullet-label'>{bullet.label}</span>
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
};

export default Resume;
