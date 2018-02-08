const FontsSizes = {
  xsmall: 16,
  small: 20,
  description: 22,
  medium: 30,
  large: 40,
  xlarge: 60,
  xxlarge: 80,
};

const defaultFont = 'AkzidenzGroteskPro-Regular';
const defaultBoldFont = 'AkzidenzGroteskPro-Md';

const Styles = {
  title: {
    fontSize: FontsSizes.large,
    fontFamily: defaultBoldFont,
  },
  smallText: {
    fontSize: FontsSizes.xsmall,
    fontFamily: defaultBoldFont,
  },
  mediumText: {
    fontSize: FontsSizes.medium,
    fontFamily: defaultBoldFont,
  },
  custom: {
    fontSize: FontsSizes.small,
    fontFamily: defaultFont,
  },
  customTwo: {
    fontSize: FontsSizes.description,
    fontFamily: defaultFont,
  },
};

export { FontsSizes, Styles };
