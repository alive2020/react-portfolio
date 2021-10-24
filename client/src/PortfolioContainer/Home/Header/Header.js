import React, { useState, useEffect } from 'react';
import { TOTAL_SCREENS, GET_SCREEN_INDEX } from '../../../utils/commonUtils';
import ScrollService from '../../../utils/ScrollService';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Header.css';

import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

export default function Header() {
  const { t, i18n } = useTranslation();

  // function handleClick(lang) {
  //   i18next.changeLanguage(lang);
  // }

  const [count, setCount] = useState(0);
  const onChange = (event) => {
    i18next.changeLanguage(event.target.value);
    setCount((previousCount) => previousCount + 1);
  };

  const [selectedScreen, setSelectedScreen] = useState(0);
  const [showHeaderOptions, setShowHeaderOptions] = useState(false);

  const updateCurrentScreen = (currentScreen) => {
    if (!currentScreen || !currentScreen.screenInView) return;
    let screenIndex = GET_SCREEN_INDEX(currentScreen.screenInView);
    if (screenIndex < 0) return;
  };

  let currentScreenSubscription =
    ScrollService.currentScreenBroadCaster.subscribe(updateCurrentScreen);

  const getHeaderOptions = () => {
    return TOTAL_SCREENS.map((Screen, i) => (
      <div
        key={Screen.screen_name}
        className={getHeaderOptionsClasses(i)}
        onClick={() => switchScreen(i, Screen)}
      >
        <span>{Screen.screen_name}</span>
      </div>
    ));
  };

  const getHeaderOptionsClasses = (index) => {
    let classes = 'header-option ';
    if (index < TOTAL_SCREENS.length - 1) classes += 'header-option-seperator ';

    if (selectedScreen === index) classes += 'selected-header-option ';

    return classes;
  };

  const switchScreen = (index, screen) => {
    let screenComponent = document.getElementById(screen.screen_name);
    if (!screenComponent) return;

    screenComponent.scrollIntoView({ behavior: 'smooth' });
    setSelectedScreen(index);
    setShowHeaderOptions(false);
  };

  useEffect(() => {
    return () => {
      currentScreenSubscription.unsubscribe();
    };
  }, [currentScreenSubscription]);

  return (
    <div
      className='header-container'
      onClick={() => setShowHeaderOptions(!showHeaderOptions)}
    >
      <div className='header-parent'>
        <div
          className='header-hamburger'
          onClick={() => setShowHeaderOptions(!showHeaderOptions)}
        >
          <FontAwesomeIcon className='header-hamburger-bars' icon={faBars} />
        </div>
        <div className='header-logo'>
          <span>Ice Calee</span>
        </div>
        <div
          className={
            showHeaderOptions
              ? 'header-options show-hamburger-options'
              : 'header-options'
          }
        >
          {getHeaderOptions()}
          {/* <nav className='langNav'>
            <button onClick={() => handleClick('en')}>En</button>
            <button onClick={() => handleClick('ko')}>Ko</button>
            <button onClick={() => handleClick('ru')}>Ru</button>
          </nav> */}
          <select name='language' onChange={onChange}>
            <option value='en'>En</option>
            <option value='ko'>Ko</option>
            <option value='ru'>Ru</option>
          </select>
        </div>
      </div>
    </div>
  );
}
