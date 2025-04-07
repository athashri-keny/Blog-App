import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ThemeToggle = () => {
    const dispatch = useDispatch();
    const darkMode = useSelector((state) => state.theme.DarkMode);

    return (
        <button
            onClick={() => dispatch(changeMode())}
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}
        >
            {darkMode ? '🌙' : '☀️'}
        </button>
    );
};

export default ThemeToggle;