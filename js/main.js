function getRandomNumber(min, max) {
  min = Math.abs(min);
  max = Math.abs(max);

  let tempMin = Math.min(min, max);
  let tempMax = Math.max(min, max);

  let num = Math.random() * (tempMax - tempMin) + tempMin;

  return Math.round(num)
}

function getRandomFloatNumber(min, max, precision) {
  min = Math.abs(min);
  max = Math.abs(max);

  let tempMin = Math.min(min, max);
  let tempMax = Math.max(min, max);

  let num = Math.random() * (tempMax - tempMin) + tempMin;

  return num.toFixed(precision);
}
