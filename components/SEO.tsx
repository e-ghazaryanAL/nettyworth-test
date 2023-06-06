import Head from 'next/head';

export type SEOProps = {
  title: string;
  description: string;
  image: string;
};
const SEO: React.FC<SEOProps> = ({ title, description, image }) => {
  return (
    <Head>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />

      <title>{title}</title>
      <meta name='title' content={title} />
      <meta name='description' content={description} />

      <meta name='robots' content='index, follow' />

      <meta property='og:type' content='website' />
      <meta property='og:locale' content='en_US' />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={image} />
      <meta property='og:image:width' content='1200' />
      <meta property='og:image:height' content='628' />

      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={image} />
    </Head>
  );
};
export default SEO;
