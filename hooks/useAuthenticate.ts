import jwtDecode from 'jwt-decode';

import { getCookie } from '../utils/cookies';

type DecodedToken = {
  exp: number;
  iat: number;
  UserInfo: {
    email: string;
    roles: string[];
  };
};

export default function useAuthenticate() {
  const token = getCookie('_token');
  if (!token) return false;
  const decoded: DecodedToken = jwtDecode(token);

  return decoded.exp * 1000 > new Date().getTime();
}
