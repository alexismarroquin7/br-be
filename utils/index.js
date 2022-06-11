const mapPageListToObj = (list = []) => {
  
  let obj = {};

  list.forEach(item => {
    obj[item.id] = item;
  });

  return obj;
}

module.exports = {
  mapPageListToObj
}