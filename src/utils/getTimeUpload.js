const getTimeUpload = (uploadTime) => {
  const tranformHour = 86400000;
    const elapsed = Date.now() - uploadTime.getTime(); // số mili giây đã trôi qua
    return elapsed / tranformHour;
  };
  
  module.exports = getTimeUpload;
  