import { validateInput } from '../client/js/validateInput';

test('should be not empty', () => {
  const value = '';
  expect(validateInput(value)).toBe(false);
});
