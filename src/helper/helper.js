export const filteredValue = (data, id) => {
  return data.filter((value) => value.parent === id);
};
