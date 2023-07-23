const uniqueArr = require("./unique");

class FilterData {
  forShort(data, queries) {
    if (queries.hex)
      data = data.filter((item) => item.hex.includes(queries.hex));
    if (queries.tag) {
      let result = [];
      data.map((item) => {
        item.tags.map((tag) => {
          if (tag.includes(queries.tag)) result.push(item);
        });
      });

      data = result;
    }
    if (queries.idOwner)
      data = data.filter((item) => item.idOwner == queries.idOwner);
    if (queries.sort) {
      switch (queries.sort) {
        case "1":
          data = data.sort((a, b) => b.views - a.views);
          break;
        default:
          data = data.sort((a, b) => b.likes.length - a.likes.length);
          break;
      }
    }
    if (queries.lover)
      data = data.filter((item) => item.likes.includes(queries.lover));
    return data;
  }
  forCollection(data, queries) {
    if (queries.idOwner)
      data = data.filter((item) => item.idOwner == queries.idOwner);
    return data;
  }
  forJobs(data, queries) {
    if (queries.type) {
      let type =
        Number(queries.type) == 1 ? "Toàn thời gian" : "Làm nghề tự do";
      data = data.filter((item) => item.jobType.includes(type));
    }
    if (queries.city)
      data = data.filter((item) => item.city._id == queries.city);
    if (queries.creativeField)
      data = data.filter(
        (item) => item.creativeField._id == queries.creativeField
      );
    return data;
  }
  forHire(data, queries) {
    if (queries.availability)
      data = data.filter((item) => item.availability == queries.availability);
    if (queries.address && queries.address.length > 0)
      data = data.filter((item) => item.address._id == queries.address);
    if (queries.creative && queries.creative.length > 0) {
      let result = [];
      queries.creative.map((cre) => {
        data.map((item) => {
          item.creativeField.map((skill) => {
            if (skill._id == cre) result.push(item);
          });
        });
      });
      
      data = uniqueArr(result);
    }

    return data;
  }
}

module.exports = new FilterData();
