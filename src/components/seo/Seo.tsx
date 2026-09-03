import Head from 'next/head';
import { GITHUB_URL, LINKEDIN_URL, M3_USA_URL, SITE_URL } from '../../lib/links';

const SITE_NAME = 'Trevor Leeman';
const PERSON_NAME = 'Trevor Leeman';
const JOB_TITLE = 'Senior Software Engineer, Team Lead';

const DEFAULT_TITLE = 'Trevor Leeman | Senior Software Engineer at M3 USA';
const DEFAULT_DESCRIPTION =
  'Senior Software Engineer and Team Lead at M3 USA, based in Seattle. I build the products physicians use on MDLinx: games, sponsored campaigns, experiments, and ads.';
const DEFAULT_IMAGE_URL = `${SITE_URL}/og-image.png`;
const DEFAULT_IMAGE_ALT =
  'Dark card with a small green EKG pulse line. The text reads: Trevor Leeman. I build products for physicians, end to end. Senior Software Engineer, Team Lead at M3 USA.';

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const WEBPAGE_ID = `${SITE_URL}/#webpage`;

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
    'Senior Software Engineer and Team Lead at M3 USA, based in Seattle, WA. Builds the interactive products on MDLinx end to end, from content model and API through frontend, tracking, and release.',
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
    'GraphQL',
    'Django',
    'PostgreSQL',
    'Contentful',
    'Google Ad Manager',
    'A/B testing',
    'Google Cloud Platform',
    'AWS',
    'Terraform',
    'Kubernetes',
    'Docker',
    'Application security',
    'Tailwind CSS',
    'UX design',
    'AI-native development workflows',
    'Agentic coding tools',
  ],
  worksFor: { '@type': 'Organization', name: 'M3 USA', url: M3_USA_URL },
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'Central Washington University' },
    { '@type': 'CollegeOrUniversity', name: 'Everett Community College' },
  ],
  subjectOf: { '@id': WEBSITE_ID },
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

const structuredData: JsonLd = {
  '@context': 'https://schema.org',
  '@graph': [personJsonLd, webSiteJsonLd, webPageJsonLd],
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
