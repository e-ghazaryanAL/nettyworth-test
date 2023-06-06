import { useRouter } from 'next/router';

import { breadcrumbs } from '../constant';

const useNewsCategory = () => {
  const router = useRouter();
  const breadcrumb = breadcrumbs[router.pathname];
  return `${breadcrumb?.blue} ${breadcrumb?.text}`;
};

export default useNewsCategory;
