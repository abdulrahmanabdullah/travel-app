import { validateInput } from './validateInput';

export const checkerInput = () => {
  const inputs = document.querySelectorAll('.input-info');
  let arrInputs = []; // Check input value with every
  let inputObject = {}; // Send key and value to request body inside searchFlight func.
  inputs.forEach(input => {
    arrInputs.push(input.value);
    inputObject[input.id] = input.value;
  });
  return arrInputs.every(validateInput) ? inputObject : null;
};
