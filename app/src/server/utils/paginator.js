const page = function (num) {
  
}

const paginator = () => {
  return {
    limit: 10,
    offset: 0,
    page,
    perpage,
  };
};

module.exports = paginator
