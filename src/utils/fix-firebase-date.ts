export const fixFirebaseDate = (obj: object): any => {
  for (const key in obj) {
    if (obj[key].constructor.name === "Timestamp") {
      obj[key] = obj[key].toDate().toISOString();
    }
  }
  return obj;
};
