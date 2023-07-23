const tranformData = require("./mongooseToObject");
const formatUploadTime = require("./formatUploadTime");
class FormatData {
  sigleUser(user, address, creativeFields) {
    user = tranformData.forObject(user);
    address = tranformData.forArray(address);
    creativeFields = tranformData.forArray(creativeFields);
    // Math with add
    let addressTarget = address.find(item => item._id == user.address);
    user.address = addressTarget;
    // Math with creative
    user.creativeField.map((creative, idx) => {
      let target = creativeFields.find(item => item._id == creative);
      user.creativeField[idx] = target;
    })
    return user;
  }
  mutipleShort(shorts, users) {
    shorts = tranformData.forArray(shorts);
    users = tranformData.forArray(users);
    shorts.forEach((short) => {
      users.map((user) => {
        if (short.idOwner == user._id) {
          short.nameOwner = user.name;
          short.avtOwner = user.urlAvt;
          short.public = formatUploadTime(short.createdAt);
        }
      });
    });
    return shorts;
  }
  singleShort(short, users) {
    short = tranformData.forObject(short);
    users = tranformData.forArray(users);
    users.map((user) => {
      if (short.idOwner == user._id) {
        short.nameOwner = user.name;
        short.avtOwner = user.urlAvt;
        short.public = formatUploadTime(short.createdAt);
      }
    });
    return short;
  }
  mutipleComment(comments, users) {
    comments = tranformData.forArray(comments);
    users = tranformData.forArray(users);
    comments.forEach((comment) => {
      users.map((user) => {
        if (user._id == comment.idOwner) {
          comment.avtOwner = user.urlAvt;
          comment.nameOwner = user.name;
          comment.public = formatUploadTime(comment.updatedAt);
        }
      });
    });
    return comments;
  }
  mutipleCollection(collections, shorts, users) {
    collections = tranformData.forArray(collections);
    shorts = tranformData.forArray(shorts);
    users = tranformData.forArray(users);
    collections.map((collection, idx) => {
      collection.shorts.map((shortCol, idxShort) => {
        shorts.map((short) => {
          if (shortCol == short._id) {
            shortCol = {
              _id: shortCol,
              image: short.contents[0].contents,
            };
            collections[idx].shorts[idxShort] = shortCol;
          }
        });
      });
    });
    collections.map((collection, idxCol) => {
      users.map((user, idxUser) => {
        if (collection.idOwner == user._id) {
          collections[idxCol].nameOwner = user.name;
          collections[idxCol].avtOwner = user.urlAvt;
          collections[idxCol].updatedAt = formatUploadTime(
            collection.updatedAt
          );
        }
      });
    });
    return collections;
  }
  singleCollection(collection, shorts, users) {
    collection = tranformData.forObject(collection);
    shorts = tranformData.forArray(shorts);
    users = tranformData.forArray(users);
    // Mapping with short
    collection.shorts.map((shortCollect, idxShortInCollect) => {
      shorts.map((short, idxShort) => {
        if (shortCollect == short._id) {
          collection.shorts[idxShortInCollect] = {
            _id: short._id,
            idOwner: short.idOwner,
            name: short.name,
            contents: short.contents,
            likes: short.likes,
            views: short.views,
          };
        }
      });
    });
    // Mapping short with user
    collection.shorts.map((shortCollect, idxShortInCollect) => {
      users.map((user) => {
        if (shortCollect.idOwner == user._id) {
          collection.shorts[idxShortInCollect] = {
            ...shortCollect,
            nameOwner: user.name,
            avtOwner: user.urlAvt,
          };
        }
      });
    });
    // Mapping with ownrer
    let user = users.find((user) => user._id == collection.idOwner);
    collection.nameOwner = user.name;
    collection.avtOwner = user.urlAvt;
    collection.updated = formatUploadTime(collection.updatedAt);
    return collection;
  }
  mutilpleJob(jobs, address, creativeFields) {
    jobs = tranformData.forArray(jobs);
    address = tranformData.forArray(address);
    creativeFields = tranformData.forArray(creativeFields);
    // Format
    jobs.forEach((job, idx) => {
      job.jobType = job.jobType ? "Toàn thời gian" : "Làm nghề tự do";
      job.onSiteRequired = job.onSiteRequired
        ? "Bắt buộc"
        : "Không bắt buộc - Có thể làm từ xa";
      job.public = formatUploadTime(job.createdAt);
    });
    // Mapping with provices
    jobs.forEach((job, idx) => {
      address.map((add) => {
        if (job.city == add._id) {
          job.city = add;
        }
      });
    });
    // Mapping with creative Field
    jobs.forEach((job, idx) => {
      creativeFields.map((field) => {
        if (job.creativeField == field._id) job.creativeField = field;
      });
    });
    return jobs;
  }
  hire(users, shorts, address, creativeFields) {
    users = tranformData.forArray(users);
    shorts = tranformData.forArray(shorts);
    // Mapping with short
    users.map((user, idx) => {
      let shortsOfUser = shorts.filter((short) => short.idOwner == user._id);
      let result = [];
      for (let index = 0; index < 3; index++) {
        let item = shortsOfUser[index]
          ? shortsOfUser[index].contents[0].contents
          : "";
        result.push(item);
      }
      users[idx].shorts = result;
    });
    // Maping with address
    users.map((user, idx) => {
      let target = address.find(item => item._id == user.address);
      users[idx].address = target;
    })
    // Mapping with creative Field
    users.map((user, idx) => {
      user.creativeField.map((creative, idxCre) => {
        let target = creativeFields.find(item => item._id == creative);
        users[idx].creativeField[idxCre] = target;
      })
    })
    return users;
  }
}

module.exports = new FormatData();
