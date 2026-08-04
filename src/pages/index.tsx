import { ReactElement } from 'react';
import Seo from '../components/seo/Seo';
import Layout from '../components/layout/Layout';
import Hero from '../components/homepage/Hero';
import Flagship from '../components/homepage/Flagship';
import TicTacToe from '../components/homepage/TicTacToe';
import Approach from '../components/homepage/Approach';
import About from '../components/homepage/About';
import Contact from '../components/homepage/Contact';

const Homepage = () => (
  <>
    <Seo />
    <Hero />
    <Flagship />
    <Approach />
    <About />
    <TicTacToe />
    <Contact />
  </>
);

Homepage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Homepage;
