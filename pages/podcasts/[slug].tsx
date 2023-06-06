import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { getNewsDetail } from '../../api/api';
import NftPodcasts from '../../components/dashboard/nft-podcasts-details/NftPodcasts';
import SEO from '../../components/SEO';
import { INettyNews } from '../../redux/news/model';

export const getServerSideProps: GetServerSideProps<{
  newsDetail: INettyNews;
}> = async (context) => {
  const slug = context.params?.slug;
  const res = await getNewsDetail(slug as string);
  const [detail] = res;
  return {
    props: {
      newsDetail: detail,
    },
  };
};

const PodcastDetail = ({ newsDetail }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div>
      <SEO description={newsDetail.yoast_head_json.og_description} image={newsDetail.featured_image_src} title={newsDetail.yoast_head_json.og_title} />
      <NftPodcasts detail={newsDetail} />;
    </div>
  );
};

export default PodcastDetail;
