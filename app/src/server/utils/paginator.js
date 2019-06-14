function page(num) {
  this.numPage = num;
  this.offset = (num - 1) * this.limit;
  return { ...this };
}

function perpage(num) {
  this.limit = num;
  this.page(this.numPage);
  return { ...this };
}

const paginator = () => (
  {
    limit: 10,
    offset: 0,
    numPage: 1,
    page,
    perpage,
  }
);

module.exports = paginator;
