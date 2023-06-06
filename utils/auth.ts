import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';

export const PublicRoute = (ctx: GetServerSidePropsContext) => {
  const cookies = nookies.get(ctx);

  if (cookies._token) {
    return {
      redirect: {
        permanent: false,
        destination: '/portfolio',
      },
      props: {},
    };
  }

  return {
    props: {},
  };
};

export const PrivateRoute = (ctx: GetServerSidePropsContext) => {
  const cookies = nookies.get(ctx);

  if (!cookies._token) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
      props: {},
    };
  }

  return {
    props: {},
  };
};
