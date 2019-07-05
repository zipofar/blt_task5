export default (err) => {
  const { response } = err;
  if (typeof response === 'undefined') {
    const msg = 'No server connetion';
    console.log(msg);
    return msg;
  }
  if (response.status >= 400 && response.status < 500) {
    const msg = response.data.message;
    console.log(response);
    return msg;
  }
  const msg = 'Server Error';
  console.log(msg);
  return msg;
};
