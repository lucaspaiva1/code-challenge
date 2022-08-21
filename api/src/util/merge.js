export const merge = (obj1, obj2) => {
  let result = {
    ...obj1,
  };
  for (let key in obj1) {
    if (obj2[key] === undefined || obj2[key] === null) {
      result[key] = obj1[key];
    } else {
      result[key] = obj2[key];
    }
  }
  for (let key in obj2) {
    if (result[key] === undefined || result[key] === null) {
      result[key] = obj2[key];
    }
  }
  return result;
};
