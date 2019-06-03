export default promise => {
  return promise
    .then(data => {
      return [null, data];
    })
    .catch(err => {
      return [err];
    });
};
