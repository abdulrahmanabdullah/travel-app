export const compareDate = (d1, d2) => {
  const currentDate = new Date();
  const departingDate = new Date(d1);
  const arriveDate = new Date(d2);
  if (
    departingDate.getTime() === arriveDate.getTime() ||
    currentDate.getTime() > departingDate.getTime() ||
    currentDate.getTime() > arriveDate.getTime()
  ) {
    return false;
  }
  return true;
};
