import Head from 'next/head';

const SITE_URL = 'https://www.trevorleeman.com';
const SITE_NAME = 'Trevor Leeman';
const PERSON_NAME = 'Trevor Leeman';
const JOB_TITLE = 'Full-Stack Software Engineer';
const LINKEDIN_URL = 'https://www.linkedin.com/in/trevor-leeman/';
const GITHUB_URL = 'https://github.com/TrevorLeeman';
const OSRS_EXCHANGE_URL = 'https://www.osrs.exchange';

const DEFAULT_TITLE = 'Trevor Leeman | Full-Stack Engineer & Founder of OSRS Exchange';
const DEFAULT_DESCRIPTION =
  'Full-stack software engineer in Seattle building OSRS Exchange, a real-time trading platform used by 40,000+ players monthly. React, Next.js, TypeScript, and UX obsession.';
const DEFAULT_IMAGE_URL = `${SITE_URL}/og-image.png`;
const DEFAULT_IMAGE_ALT =
  'Dark dashboard-styled card with a rising market sparkline. The text reads: Trevor Leeman. I build market intelligence platforms, end to end. Founder of OSRS Exchange.';

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const WEBPAGE_ID = `${SITE_URL}/#webpage`;
const ORGANIZATION_ID = `${OSRS_EXCHANGE_URL}/#organization`;
const APPLICATION_ID = `${OSRS_EXCHANGE_URL}/#application`;

const OSRS_EXCHANGE_DESCRIPTION =
  'OSRS Exchange is a real-time Grand Exchange trading platform for Old School RuneScape, used by 40,000+ players every month. It turns live data from the OSRS Wiki Real-Time Prices API into actionable signals: real-time price tracking, high-margin flip finding, price alerts, recipe profit calculations, and Death’s Coffer valuations across 4,600+ tradeable items.';

type JsonLd = Record<string, unknown>;

type SeoProps = {
  title?: string;
  description?: string;
  path?: string;
  imageUrl?: string;
  imageAlt?: string;
  ogType?: string;
  noindex?: boolean;
};

const buildCanonicalUrl = (path: string) => {
  if (!path || path === '/') return SITE_URL;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
};

const personJsonLd: JsonLd = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: PERSON_NAME,
  jobTitle: JOB_TITLE,
  url: SITE_URL,
  description:
    'Full-stack software engineer in Seattle, WA. Founder and sole engineer of OSRS Exchange, a real-time market data trading platform.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Seattle',
    addressRegion: 'WA',
    addressCountry: 'US',
  },
  sameAs: [LINKEDIN_URL, GITHUB_URL],
  knowsAbout: [
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'NestJS',
    'Tailwind CSS',
    'PostgreSQL',
    'Docker',
    'UX design',
    'Real-time market data',
    'AI-native development workflows',
    'Agentic coding tools',
  ],
  worksFor: [{ '@id': ORGANIZATION_ID }, { '@type': 'Organization', name: 'M3 USA' }],
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'Central Washington University' },
    { '@type': 'CollegeOrUniversity', name: 'Everett Community College' },
  ],
  subjectOf: { '@id': WEBSITE_ID },
};

const organizationJsonLd: JsonLd = {
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: 'OSRS Exchange',
  url: OSRS_EXCHANGE_URL,
  description: OSRS_EXCHANGE_DESCRIPTION,
  founder: { '@id': PERSON_ID },
};

const webSiteJsonLd: JsonLd = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: SITE_NAME,
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
  inLanguage: 'en-US',
  author: { '@id': PERSON_ID },
  publisher: { '@id': PERSON_ID },
};

const webPageJsonLd: JsonLd = {
  '@type': 'WebPage',
  '@id': WEBPAGE_ID,
  url: SITE_URL,
  name: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  inLanguage: 'en-US',
  isPartOf: { '@id': WEBSITE_ID },
  about: { '@id': PERSON_ID },
};

const webApplicationJsonLd: JsonLd = {
  '@type': 'WebApplication',
  '@id': APPLICATION_ID,
  name: 'OSRS Exchange',
  url: OSRS_EXCHANGE_URL,
  applicationCategory: 'FinanceApplication',
  applicationSubCategory: 'Game market analysis',
  browserRequirements: 'Requires a modern web browser.',
  description: OSRS_EXCHANGE_DESCRIPTION,
  featureList: [
    'GE Tracker: real-time Grand Exchange price tracking and high-margin flip finder',
    'Price Alerts: notifications when an item crosses a target price',
    'Recipe Profit: live profitability calculator for crafting recipes',
    'Death’s Coffer: value calculator for Death’s Coffer item sacrifices',
  ],
  author: { '@id': PERSON_ID },
  creator: { '@id': PERSON_ID },
  publisher: { '@id': ORGANIZATION_ID },
};

const structuredData: JsonLd = {
  '@context': 'https://schema.org',
  '@graph': [personJsonLd, organizationJsonLd, webSiteJsonLd, webPageJsonLd, webApplicationJsonLd],
};

const Seo = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  imageUrl = DEFAULT_IMAGE_URL,
  imageAlt = DEFAULT_IMAGE_ALT,
  ogType = 'website',
  noindex = false,
}: SeoProps) => {
  const canonicalUrl = buildCanonicalUrl(path);

  return (
    <Head>
      <title key="title">{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" key="viewport" />
      <meta name="description" content={description} key="description" />
      <meta name="author" content={PERSON_NAME} key="author" />
      <link rel="canonical" href={canonicalUrl} key="canonical" />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" key="robots" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" key="robots" />
      )}

      <meta property="og:type" content={ogType} key="og:type" />
      <meta property="og:url" content={canonicalUrl} key="og:url" />
      <meta property="og:title" content={title} key="og:title" />
      <meta property="og:description" content={description} key="og:description" />
      <meta property="og:image" content={imageUrl} key="og:image" />
      <meta property="og:image:type" content="image/png" key="og:image:type" />
      <meta property="og:image:width" content="1200" key="og:image:width" />
      <meta property="og:image:height" content="630" key="og:image:height" />
      <meta property="og:image:alt" content={imageAlt} key="og:image:alt" />
      <meta property="og:site_name" content={SITE_NAME} key="og:site_name" />
      <meta property="og:locale" content="en_US" key="og:locale" />

      <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
      <meta name="twitter:title" content={title} key="twitter:title" />
      <meta name="twitter:description" content={description} key="twitter:description" />
      <meta name="twitter:image" content={imageUrl} key="twitter:image" />
      <meta name="twitter:image:alt" content={imageAlt} key="twitter:image:alt" />

      <script
        type="application/ld+json"
        key="structured-data"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </Head>
  );
};

export default Seo;
