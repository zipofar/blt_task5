const pages = [
  {
    title: 'Title 1',
    greeting: 'Greeting 1',
    content: 'Content 1',
    user_id: 1,
  },
  {
    title: 'Title 2',
    greeting: 'Greeting 2',
    content: 'Content 2',
    user_id: 1,
  },
  {
    title: 'Title 3',
    greeting: 'Greeting 3',
    content: 'Content 3',
    user_id: 1,
  },
];

exports.seed = knex => (
  knex('pages')
    .del()
    .then(() => (knex('pages').insert(pages)))
);
