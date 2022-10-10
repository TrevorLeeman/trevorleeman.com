import { ReactElement } from 'react';
import Head from 'next/head';
import Socials from '../components/homepage/socials/Socials';
import IntroMessage from '../components/homepage/introMessage/IntroMessage';
import Header from '../components/header/Header';
import HomepageLayout from '../components/layout/HomepageLayout';
import ProjectCard from '../components/projectCard/ProjectCard';
import ProjectCardImage from '../components/projectCard/Image';
import ProjectCardInfo from '../components/projectCard/Info';
import ProjectCardTechIcon from '../components/projectCard/TechIcon';
import { v4 as uuid } from 'uuid';
import FeaturedPersonalProjectsWaveTop from '../components/homepage/waves/FeaturedPersonalProjectsTop';
import FeaturedPersonalProjectsWaveBottom from '../components/homepage/waves/FeaturePersonalProjectsBottom';

const CANONICAL_URL = 'https://www.trevorleeman.com';

const Homepage = () => {
  return (
    <>
      <Head>
        <title>Trevor Leeman</title>
        <meta property="og:title" content="Trevor Leeman" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={CANONICAL_URL} />
        <link rel="canonical" href={CANONICAL_URL} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex h-full flex-col items-center sm:h-auto">
        <div className="flex w-full flex-grow flex-col xl:max-w-screen-lg">
          <Header />
          <div className="mb-14 flex flex-grow flex-col items-center justify-center sm:mb-0 xl:mt-16">
            <IntroMessage />
            <Socials />
          </div>
        </div>
        <FeaturedPersonalProjectsWaveTop />
      </div>
      <section
        id="projects"
        className="z-10 flex flex-col items-center justify-center bg-theme-featured-personal-projects-light pb-32 dark:bg-theme-featured-personal-projects-dark"
        // style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.16)) drop-shadow(0 3px 6px rgba(0,0,0,0.23))' }}
      >
        <h2 className="py-8 px-4 text-center font-default text-4xl font-extrabold tracking-wide text-theme-white sm:text-6xl lg:text-8xl">
          Featured Personal Projects
        </h2>
        <div className="grid w-full gap-8 px-8 lg:grid-cols-2 xl:max-w-screen-lg xl:px-0">
          <ProjectCard>
            <ProjectCardImage src="/coming_soon.png" alt="Coming Soon" />
            <ProjectCardInfo
              purpose="MMORPG Trading Tool"
              title="OSRS Prices (WIP)"
              description="Item flipping utility for the game Old School Runescape. Leverages the OSRS wiki Real-Time Prices API to suggest the most profitable items to flip in real time."
              codeLink="https://github.com/TrevorLeeman/osrs-prices"
              techIcons={[
                <ProjectCardTechIcon src="/icons/typescript.svg" title="TypeScript" key={uuid()} />,
                <ProjectCardTechIcon src="/icons/react.svg" title="React" key={uuid()} />,
                <ProjectCardTechIcon src="/icons/nextjs.svg" title="NextJS" key={uuid()} />,
                <ProjectCardTechIcon src="/icons/scss.svg" title="SCSS" key={uuid()} />,
                <ProjectCardTechIcon src="/icons/postgres.svg" title="Postgres" key={uuid()} />,
                <ProjectCardTechIcon src="/icons/docker.svg" title="Docker" key={uuid()} />,
                <ProjectCardTechIcon src="/icons/vercel.svg" title="Vercel" key={uuid()} />,
              ]}
            />
          </ProjectCard>
          <ProjectCard>
            <ProjectCardImage src="https://i.imgur.com/FwHcrj6.png" alt="Tic Tac Toe" />
            <ProjectCardInfo
              purpose="Progressive Web App"
              title="Tic Tac Toe"
              description="A delve into browser based game development and PWAs. Game board expandable to sizes bigger than 3x3. Try all 3 game modes!"
              liveLink="https://tic-tac-toe.trevorleeman.com"
              codeLink="https://github.com/TrevorLeeman/react-tic-tac-toe"
              techIcons={[
                <ProjectCardTechIcon src="/icons/javascript.svg" title="JavaScript" key={uuid()} />,
                <ProjectCardTechIcon src="/icons/react.svg" title="React" key={uuid()} />,
                <ProjectCardTechIcon src="/icons/styled-components.svg" title="Styled Components" key={uuid()} />,
                <ProjectCardTechIcon src="/icons/scss.svg" title="SCSS" key={uuid()} />,
              ]}
            />
          </ProjectCard>
        </div>
      </section>
      {/* <FeaturedPersonalProjectsWaveBottom /> */}
    </>
  );
};

Homepage.getLayout = (page: ReactElement) => {
  return <HomepageLayout>{page}</HomepageLayout>;
};

export default Homepage;
