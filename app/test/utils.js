const cookieParser = require('cookieparser');

exports.parseCookie = (cookies, regExp) => {
  return cookies
  .map(e => {
    const cookie = cookieParser.parse(e);
    const sessKey = Object
    .keys(cookie)
    .filter(k => regExp.test(k))[0];
    return `${sessKey}=${cookie[sessKey]}`;
  })
  .join('; ');
};
