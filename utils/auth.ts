import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';

import authOptions from '../pages/api/auth/[...nextauth]';

interface ISession {
  user: {
    accessToken: string;
    jwt: string;
  };
}
export const PublicRoute = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerSession<{}, ISession>(ctx.req, ctx.res, authOptions);

  if (session?.user) {
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

export const PrivateRoute = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerSession<{}, ISession>(ctx.req, ctx.res, authOptions);

  if (!session?.user) {
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
