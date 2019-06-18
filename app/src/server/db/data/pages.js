const calcUserId = (currentId, countIds) => (
  currentId > countIds ? calcUserId(currentId - countIds, countIds) : currentId
);

const build = (countUsers, countPages) => (
  Array(countPages).fill(0).map((_e, i) => (
    {
      title: `Title ${i}`,
      greeting: `Greeting ${i}`,
      content: `Content ${i}`,
      user_id: calcUserId(i + 1, countUsers),
    }
  ))
);

module.exports = build;
