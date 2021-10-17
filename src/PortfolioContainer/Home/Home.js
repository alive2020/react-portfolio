import React from 'react';
import Header from './Header/Header';
import './Home.css';
import Profile from './Profile/Profile';
import Footer from './Footer/Footer';

export default function Home() {
  return (
    <div className='home-container'>
      <Header />
      <Profile />
      <Footer />
    </div>
  );
}
