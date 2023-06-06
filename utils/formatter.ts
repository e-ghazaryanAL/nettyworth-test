export function numberWithCommas(x: string | number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
export const truncateAddress = (address: any) => {
  if (!address) return 'No Account';
  const match = address.match(/^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/);
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};
export const kFormatter = (num: number) => {
  return num && Math.sign(num) * +(Math.abs(num) / 1000).toFixed(1);
};
export const hexToETh = (num: any) => {
  return parseInt(num, 10) / Math.pow(10, 18);
};
export function youtubeParser(url: string) {
  const youtubeLinkRegex = /https:\/\/www\.youtube\.com\/watch\?v=[A-z0-9_-]+/g;
  const shortLink = /https:\/\/youtu\.be\/[A-Za-z0-9_-]+/g;
  const youtubeLink = url?.match(youtubeLinkRegex) || url?.match(shortLink);
  return youtubeLink ? youtubeLink[0] : '';
}

export const formatCash = (n: number) => {
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e6) return `${(n / 1e3).toFixed(1)}K`;
  if (n >= 1e6 && n < 1e9) return `${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e9 && n < 1e12) return `${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e12) return `${(n / 1e12).toFixed(1)}T`;
  return 0;
};

export const convertIpfsLink = (ipfsLink: string) => {
  const hash = ipfsLink.replace('ipfs://', '');
  return `https://ipfs.io/ipfs/${hash}`;
};

export const USDDollarFormatter = (value: number, sign: string = 'USD') => {
  const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: sign,
  });
  return USDollar.format(value);
};

export const buildParams = <T extends Record<string, any>>(data: T) => {
  const params = new URLSearchParams();

  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((val) => params.append(key, val.toString()));
    } else {
      params.append(key, value.toString());
    }
  });

  return params;
};
