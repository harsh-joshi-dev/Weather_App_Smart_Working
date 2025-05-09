import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';
import { useColorScheme } from 'react-native';
import { useSelector } from 'react-redux';

const SearchIcon: React.FC<SvgProps> = (props) => {
    const { darkMode } = useSelector((state: any) => state.theme);
    const strokeColor = darkMode === true ? '#FFFFFF' : '#141414';

    return (
        <Svg
            fill="none"
            height={props.height || 24}
            width={props.width || 24}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M19.25 19.25L15.5 15.5M4.75 11a6.25 6.25 0 1112.5 0 6.25 6.25 0 01-12.5 0z"
                stroke={strokeColor}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
        </Svg>
    );
};

export default SearchIcon;
