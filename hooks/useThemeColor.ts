/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useColorScheme } from 'react-native';

import ColorConstants  from '@/constants/images/ColorConstants';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof ColorConstants.light & keyof typeof ColorConstants.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return ColorConstants[theme][colorName];
  }
}
