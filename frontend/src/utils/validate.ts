export const validateNationalID = (nationalID: string): boolean => {
  if(!nationalID) return false;
  if(nationalID.length !== 13) return false;

  const digitString = nationalID.split('');
  const digitInt = digitString.map(digit => parseInt(digit));
  let sum = 0;

  for(let i = 0; i <= 11; i++) {
    sum += (digitInt[i] * (13 - i));
  }

  const mod11 = sum % 11;
  const checkDigit = 11 - mod11 >= 10 ? (11 - mod11) % 10 : (11 - mod11);
  const lastDigit = digitInt[digitInt.length - 1];

  return checkDigit === lastDigit;
};

export const validatePhoneNumber = (phone: string): boolean => {
  if(!phone) return false;
  if(phone.length !== 10) return false;

  const phonePattern = /^(08|09)\d{8}/g;
  return phonePattern.test(phone);
};