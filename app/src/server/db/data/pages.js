const _ = require('lodash');

const build = (countUsers, countPages) => (
  Array(countPages).fill(0).map((_e, i) => (
    {
      title: `Title ${i}`,
      greeting: `Greeting ${i}`,
      content: `Content ${i}`,
      user_id: _.random(1, countUsers),
    }
  ))
);

module.exports = build;
