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
  smallBoldText: {
    fontSize: FontsSizes.xsmall,
    fontFamily: defaultBoldFont,
  },
  mediumBoldText: {
    fontSize: FontsSizes.medium,
    fontFamily: defaultBoldFont,
  },
  smallText: {
    fontSize: FontsSizes.small,
    fontFamily: defaultFont,
  },
  descriptionText: {
    fontSize: FontsSizes.description,
    fontFamily: defaultFont,
  },
};

export { FontsSizes, Styles };
