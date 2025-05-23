import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';
import { useColorScheme } from 'react-native';

const DarkThemeSvg: React.FC<SvgProps> = (props) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Svg
      width={props.width || 24}
      height={props.height || 24}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-1.5v-17a8.5 8.5 0 110 17z"
        fill={"#fff"}
        fillRule="nonzero"
        stroke="none"
        strokeWidth={1}
      />
    </Svg>
  );
};

export default DarkThemeSvg;
