import { color } from 'react-native-reanimated';

const colors = {
  white: '#ffffff',
  black: '#000000',
  gray_0: '#d5d5d5',
  gray_1: '#a6a6a6',
  red: '#e84118',
  blue: '#3679fe',
  orange: '#FF8C00',
};

export const theme = {
  background: colors.white,
  text: colors.black,
  errorText: colors.red,
  imageBackground: colors.gray_0,
  imageButtonBackground: colors.black,
  imageButtonIcon: colors.white,
  label: colors.gray_1,
  inputPlaceholder: colors.gray_1,
  inputBorder: colors.gray_1,
  inputDisabledBackground: colors.gray_0,
  headerTintColor: colors.black,
  buttonBackground: colors.blue,
  buttonTitle: colors.white,
  buttonUnfilledTitle: colors.blue,
  buttonLogout: colors.orange,
  spinnerBackground: colors.black,
  spinnerIndicator: colors.white,
  tabActiveColor: colors.blue,
  tabInactiveColor: colors.gray_1,
  listBorder: colors.gray_0,
  listTime: colors.gray_1,
  listDescription: colors.gray_1,
  listIcon: colors.black,
  sendButtonActivate: colors.blue,
  sendButtonInactivate: colors.gray_1,
};
