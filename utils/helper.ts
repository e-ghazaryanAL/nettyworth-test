import { postRequest } from '../api/api';

async function regSw() {
  if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
    const url = `${window.location.origin}/sw.js`;
    const reg = await navigator.serviceWorker.register(url, { scope: '/' });
    return reg;
  }
  throw Error('serviceworker not supported');
}

async function subscribe(serviceWorkerReg: ServiceWorkerRegistration) {
  let subscription = await serviceWorkerReg.pushManager.getSubscription();
  if (subscription === null) {
    subscription = await serviceWorkerReg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: 'BKMygktGIH09sJ2rCnhmKe5w4f3x8Gg2H0QTOrIz60yuPNujHLuW6KaAHSLA7YbYO5QMLvOYjZsUl58v7NoyQrg',
    });
  }

  await postRequest('/subscribe', { ...subscription.toJSON() }, undefined, false, true);
}

async function unsubscribe() {
  try {
    if (typeof navigator !== 'undefined') {
      const reg = await navigator.serviceWorker.ready;
      const subscription = await reg.pushManager.getSubscription();
      if (!subscription) return;
      await subscription.unsubscribe();

      await postRequest('/unsubscribe', { endpoint: subscription.endpoint }, undefined, false, true);
    }
  } catch (e) {
    Promise.reject(e);
  }
}

const validatePassword = (password: string) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

function validateEmail(email: string) {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
}

const validateImage = (file: File) => {
  const allowedTypes = ['image/png', 'image/jpeg', 'image/gif'];
  const maxSize = 2 * 1024 * 1024;

  if (!allowedTypes.includes(file.type)) {
    return 'Only PNG, JPEG, and GIF images are allowed.';
  }

  if (file.size > maxSize) {
    return 'The selected image is too large. Please select an image that is smaller than 5MB.';
  }

  return null;
};

const throttleIteration = <T, U>(items: T[], processItem: (item: T) => Promise<U>, finishedFunction: (promises: Promise<U>[]) => void, throttleTime: number) => {
  let i = 0;
  const newPromises: Promise<any>[] = [];
  const interval = setInterval(() => {
    if (i >= items.length) {
      finishedFunction(newPromises);
      clearInterval(interval);
      return;
    }
    newPromises.push(processItem(items[i]));
    i++;
  }, throttleTime);
};

export { regSw, subscribe, unsubscribe, validatePassword, validateEmail, validateImage, throttleIteration };
