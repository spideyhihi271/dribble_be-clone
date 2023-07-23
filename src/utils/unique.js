const uniqueArr = (arr) => {
  const unique = arr.reduce((accumulator, currentValue) => {
    const isExistIndex = accumulator.findIndex(
      (item) => item._id === currentValue._id
    );
    if (isExistIndex === -1) {
      accumulator.push(currentValue);
    }
    return accumulator;
  }, []);
  return unique;
};

module.exports = uniqueArr;
