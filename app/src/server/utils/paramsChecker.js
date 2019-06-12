const constructor = params => (
  {
    permit: fields => (
      Object
        .keys(params)
        .filter(k => fields.includes(k))
        .reduce((a, e) => ({ ...a, [e]: params[e] }), {})
    ),
  }
);

module.exports = constructor;
