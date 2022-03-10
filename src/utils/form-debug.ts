export const fillForm = (setValue: Function, values: object) => {
  Object.keys(values).forEach((key) => {
    setValue(key, values[key]);
  });
};
