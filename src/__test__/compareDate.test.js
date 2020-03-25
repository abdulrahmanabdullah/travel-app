import { compareDate } from '../client/js/compareDate';

test('should greater than current date', () => {
  const currentDate = new Date();
  const testDate = new Date('Mar 24,2020');
  expect(compareDate(testDate, currentDate)).toBe(false);
});
