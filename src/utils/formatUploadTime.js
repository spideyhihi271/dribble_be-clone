const formatUploadTime = (uploadTime) => {
  const ONE_MINUTE = 60 * 1000; // số mili giây trong 1 phút
  const ONE_HOUR = 60 * ONE_MINUTE; // số mili giây trong 1 giờ
  const ONE_DAY = 24 * ONE_HOUR; // số mili giây trong 1 ngày
  const ONE_WEEK = 7 * ONE_DAY; // số mili giây trong 1 tuần
  const elapsed = Date.now() - uploadTime.getTime(); // số mili giây đã trôi qua
  if (elapsed < ONE_MINUTE) {
    return "Vừa xong";
  } else if (elapsed < ONE_HOUR) {
    const minutes = Math.floor(elapsed / ONE_MINUTE);
    return `${minutes} phút trước`;
  } else if (elapsed < ONE_DAY) {
    const hours = Math.floor(elapsed / ONE_HOUR);
    return `${hours} giờ trước`;
  } else if (elapsed < ONE_WEEK) {
    const days = Math.floor(elapsed / ONE_DAY);
    return `${days} ngày trước`;
  } else {
    const weeks = Math.floor(elapsed / ONE_WEEK);
    return `${weeks} tuần trước`;
  }
};

module.exports = formatUploadTime;
