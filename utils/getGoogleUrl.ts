import axios from 'axios';

import { setCookie } from './cookies';

export const redirectToGoogleSSO = async (handler: () => void) => {
  let timer: NodeJS.Timeout | null = null;
  const googleLoginURL = 'https://app-api.nettyworth.io/api/users/login/google';
  const newWindow = window.open(googleLoginURL, '_blank', 'width=500,height=600');

  const fetchAuthUser = async () => {
    const response = await axios.get('https://app-api.nettyworth.io/api/users/google/login', { withCredentials: true });

    if (response && response.data) {
      setCookie('_token', response.data.accessToken);
    }
  };

  if (newWindow) {
    timer = setInterval(async () => {
      try {
        if (newWindow.closed) {
          await fetchAuthUser();

          handler();
          if (timer) clearInterval(timer);
        }
      } catch (e) {
        if (timer) clearInterval(timer);
        Promise.reject(e);
      }
    }, 500);
  }
};
