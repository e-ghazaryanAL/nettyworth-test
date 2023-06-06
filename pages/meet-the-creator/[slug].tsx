import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { getNewsDetail } from '../../api/api';
import { NewsDetail } from '../../components/dashboard/news/NewsDetail';
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

const EducationDetails = ({ newsDetail }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div>
      <SEO description={newsDetail.yoast_head_json.og_description} image={newsDetail.featured_image_src} title={newsDetail.yoast_head_json.og_title} />
      <NewsDetail detail={newsDetail} categoryId={32} />;
    </div>
  );
};

export default EducationDetails;
