import { useEffect, useState } from 'react';

const UseTheme = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const setThemeModify = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    console.log(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };
  useEffect(() => {
    setThemeModify(theme);
  }, []);
  // useLayoutEffect(() => {
  //   document.documentElement.setAttribute('data-theme', theme);
  // }, [theme]);
  return { theme, setTheme: setThemeModify };
};

export default UseTheme;
