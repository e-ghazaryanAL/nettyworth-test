import Cookies from 'universal-cookie';

export const setCookie = (key: string, val: string) => {
  const cookie = new Cookies();

  cookie.set(key, val, { path: '/' });
};

export const getCookie = (key: string) => {
  const cookie = new Cookies();

  return cookie.get(key);
};

export const removeCookie = (key: string) => {
  const cookie = new Cookies();

  cookie.remove(key, {
    path: '/',
  });
};

export const clearCookies = () => {
  const cookies = new Cookies();

  Object.keys(cookies.getAll()).forEach((cook) => {
    cookies.remove(cook, {
      path: '/',
    });
  });
  cookies.remove('connect.sid');
  cookies.remove('SID');
  cookies.remove('HSID');
  cookies.remove('guest_id');
};
