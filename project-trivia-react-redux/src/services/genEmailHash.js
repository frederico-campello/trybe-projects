import CryptoJs from 'crypto-js';

const emailHash = (email) =>
  CryptoJs.MD5(email.trim().toLowerCase()).toString();

export default emailHash;
