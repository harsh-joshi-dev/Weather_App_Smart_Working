import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';
import { useColorScheme } from 'react-native';
import { useAppSelector } from '../../redux/hooks';

const WindIcon: React.FC<SvgProps> = (props) => {
    const { darkMode } = useAppSelector(state => state.theme);
    const strokeColor = darkMode === true ? '#FFFFFF' : '#000000';

    return (
        <Svg
            width={props.width || 24}
            height={props.height || 24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M15.764 7A3 3 0 1118 12H3m5.51-7.333A2 2 0 1110 8H3m8.51 11.333A2 2 0 1013 16H3"
                stroke={strokeColor}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
};

export default WindIcon;
