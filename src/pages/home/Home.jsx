import React from 'react'
import Slider from './Slider';
import Categories from './Categories';
import TrandingProducts from './TrandingProducts';
import DealsSection from './DealsSection';
import Features from './Features';
import Blogs from './Blogs';

const Home = () => {
  return (
    <main className='pt-20'>
      <Slider/>
      <Categories/>
      <TrandingProducts/>
      <DealsSection/>
      <Features/>
      <Blogs/>
    </main>
  )
}

export default Home;