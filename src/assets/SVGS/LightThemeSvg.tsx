import React from 'react';
import Svg, { G, Path, Defs, ClipPath, SvgProps } from 'react-native-svg';
import { useColorScheme } from 'react-native';

const LightThemeSvg: React.FC<SvgProps> = (props) => {
  const colorScheme = useColorScheme();
  
  const isLight = colorScheme === 'light';

  if (!isLight) return null; // Hide icon in dark mode

  return (
    <Svg
      width={props.width || 24}
      height={props.height || 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G
        clipPath="url(#clip0)"
        stroke="#000"
        strokeWidth={1.5}
        strokeMiterlimit={10}
      >
        <Path
          d="M5 12H1m22 0h-4M7.05 7.05L4.222 4.222m15.556 15.556L16.95 16.95m-9.9 0l-2.828 2.828M19.778 4.222L16.95 7.05"
          strokeLinecap="round"
        />
        <Path
          d="M12 16a4 4 0 100-8 4 4 0 000 8z"
          fill="#000"
          fillOpacity={0.16}
        />
        <Path d="M12 19v4m0-22v4" strokeLinecap="round" />
      </G>
      <Defs>
        <ClipPath id="clip0">
          <Path fill="#fff" d="M0 0h24v24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default LightThemeSvg;
