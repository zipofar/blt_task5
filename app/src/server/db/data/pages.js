const fs = require('fs');

const calcUserId = (currentId, countIds) => (
  currentId > countIds ? calcUserId(currentId - countIds, countIds) : currentId
);

const contentPrimaryPage = fs.readFileSync('./primaryPage.html', 'utf-8');

const primaryPage = {
  title: 'Primary page',
  greeting: 'Greeting from primary',
  content: contentPrimaryPage,
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
