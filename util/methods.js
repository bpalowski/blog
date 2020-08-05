const axios = require('axios')

module.exports.filterObj = async function (a) {
  if (a.length < 0) {
    return null
  }

  let arr = [];
  let tagArr = a.split(",");

  if (tagArr.length < 0) {
    return null
  }

  for (let i = 0; i < tagArr.length; i++) {
    let res = await axios.get(`https://hatchways.io/api/assessment/blog/posts?tag=${tagArr[i]}`);
    let index = res.data.posts;
    for (let j in index) {
      arr.push(index[j])
    }
  }
  const finalMethod = ar => [...new Set(ar.map((obj) => JSON.stringify(obj)))].map(str => JSON.parse(str));

  const finalArr = finalMethod(arr);
  return finalArr
};


module.exports.sortByChecker = (sb) => {
  const values = ["id", "reads", "likes", "popularity"];
  if (sb) {
    return values.includes(sb) ? true : false
  }
}

module.exports.directionChecker = (dr) => {
  const values = ["desc", "asc"];
  if (dr) {
    return values.includes(dr) ? true : false
  }
}


module.exports.query = (ar, sb, dr) => {
  if (ar.length < 0) {
    return null
  }
  let getQuery = sortByQuery(sb);
  let arr = ar.sort((a, b) => {
    return a[getQuery] - b[getQuery];
  });
  return dr === "desc" ? arr.reverse() : arr
}

const sortByQuery = (str) => {
  let stringField;
  switch (str) {
    case "id":
    case "reads":
    case "likes":
    case "popularity":
      stringField = str;
      break;
    default:
      stringField = "id";
  }
  return stringField
}