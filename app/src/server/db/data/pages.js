const calcUserId = (currentId, countIds) => (
  currentId > countIds ? calcUserId(currentId - countIds, countIds) : currentId
);

const primaryPage = {
  title: 'Primary page',
  greeting: 'Greeting from primary',
  content: '<h1>Hello</h1>',
  isprimary: 'true',
  user_id: 1,
};

const build = (countUsers, countPages) => {
  const pages = Array(countPages).fill(0).map((_e, i) => (
    {
      title: `Title ${i}`,
      greeting: `Greeting ${i}`,
      content: `Content ${i}`,
      isprimary: 'false',
      user_id: calcUserId(i + 1, countUsers),
    }
  ));
  return pages.concat([primaryPage]);
};

module.exports = build;
