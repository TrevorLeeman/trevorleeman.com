import { ReactElement } from 'react';
import Head from 'next/head';
import { Socials } from '../components/homepage/socials/Socials';
import IntroMessage from '../components/homepage/introMessage/IntroMessage';
import Header from '../components/header/Header';
import HomepageLayout from '../components/layout/HomepageLayout';
import ProjectCard from '../components/homepage/projectCard/ProjectCard';
import ProjectCardImage from '../components/homepage/projectCard/Image';
import ProjectCardInfo from '../components/homepage/projectCard/Info';
import ProjectCardTechIcon from '../components/homepage/projectCard/TechIcon';
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
      <div className="flex min-h-full flex-col items-center">
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
        className="z-10 flex flex-col items-center justify-center bg-theme-featured-personal-projects-light px-3 pb-12 dark:bg-theme-featured-personal-projects-dark 4xs:px-5  3xs:px-6 md:pb-20"
        // style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.16)) drop-shadow(0 3px 6px rgba(0,0,0,0.23))' }}
      >
        <h2 className="py-8 text-center font-default text-4xl font-extrabold tracking-wide text-theme-white drop-shadow-lg 4xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
          Featured Personal Projects
        </h2>
        <div className="grid w-full gap-3 4xs:gap-5 3xs:gap-6 lg:grid-cols-2 xl:max-w-screen-lg xl:px-0">
          <ProjectCard>
            <ProjectCardImage src="https://i.imgur.com/cC2ggwV.png" alt="OSRS Exchange site preview" />
            <ProjectCardInfo
              purpose="MMORPG Trading Tool"
              title="OSRS Exchange"
              description="Market analysis utility for the game Old School Runescape. Leverages the OSRS wiki Real-Time Prices API to suggest the most profitable items to flip in real time."
              liveLink="https://www.osrs.exchange"
              codeLink="https://github.com/TrevorLeeman/osrs-prices"
              techIcons={[
                <ProjectCardTechIcon src="/icons/typescript.svg" title="TypeScript" key="TypeScript" />,
                <ProjectCardTechIcon src="/icons/react.svg" title="React" key="React" />,
                <ProjectCardTechIcon src="/icons/nextjs.svg" title="NextJS" key="NextJS" />,
                <ProjectCardTechIcon src="/icons/tailwind.svg" title="Tailwind CSS" key="Tailwind CSS" />,
                <ProjectCardTechIcon src="/icons/postgres.svg" title="Postgres" key="Postgres" />,
                <ProjectCardTechIcon src="/icons/docker.svg" title="Docker" key="Docker" />,
                <ProjectCardTechIcon src="/icons/vercel.svg" title="Vercel" key="Vercel" />,
                <ProjectCardTechIcon src="/icons/railway.svg" title="Railway" key="Railway" />,
              ]}
            />
          </ProjectCard>
          <ProjectCard>
            <ProjectCardImage src="https://i.imgur.com/FwHcrj6.png" alt="Tic Tac Toe site preview" />
            <ProjectCardInfo
              purpose="Progressive Web App"
              title="Tic Tac Toe"
              description="A delve into browser based game development and PWAs. Game board expandable to sizes bigger than 3x3. Try all 3 game modes!"
              liveLink="https://tic-tac-toe.trevorleeman.com"
              codeLink="https://github.com/TrevorLeeman/react-tic-tac-toe"
              techIcons={[
                <ProjectCardTechIcon src="/icons/javascript.svg" title="JavaScript" key="JavaScript" />,
                <ProjectCardTechIcon src="/icons/react.svg" title="React" key="React" />,
                <ProjectCardTechIcon
                  src="/icons/styled-components.svg"
                  title="Styled Components"
                  key="Styled Components"
                />,
                <ProjectCardTechIcon src="/icons/scss.svg" title="SCSS" key="SCSS" />,
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
