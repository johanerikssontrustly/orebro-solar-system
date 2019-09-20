const defaultColors = ['black', 'white'];
const defaultPercentage = ['0%', '100%'];

const linearGradient = (colors, percentage) => {
  if (!colors || !Array.isArray(colors) || colors.length === 0)
    colors = defaultColors;

  if (!percentage || !Array.isArray(percentage)) percentage == percentage || [];

  const argumentString = colors.reduce((prev, curr, index) => {
    const currPerc = percentage[index];
    return `${prev}${index == 0 ? '' : ', '}${curr}${
      currPerc === undefined ? '' : '' + currPerc
    }`;
  }, '');

  return `linear-gradient(${argumentString})`;
};
