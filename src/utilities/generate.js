const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const getRandomNumber = (numberOfDigits) => {
  if (numberOfDigits === 1) return randomNumber(0, 9);
  else if (numberOfDigits === 2) return randomNumber(10, 99);
  else if (numberOfDigits === 3) return randomNumber(100, 999);
  else if (numberOfDigits === 4) return randomNumber(1000, 9999);
  else return 0;
};

const shuffle = (array) => {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

export { getRandomNumber, randomNumber, shuffle };
