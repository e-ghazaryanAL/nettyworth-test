import { useAppDispatch, useAppSelector } from './redux';
import { toggleTheme } from '../redux/dark-mode/themeSlice';
import { removeCookie, setCookie } from '../utils/cookies';

const useTheme = () => {
  const { mode } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();
  const handleSetTheme = (theme: string) => {
    dispatch(toggleTheme(theme));
    if (theme === 'dark') {
      setCookie('theme', theme);
      // document.documentElement.classList.add('dark');
    } else {
      removeCookie('theme');
      // document.documentElement.classList.remove('dark');
    }
  };

  return { mode, handleSetTheme };
};

export { useTheme };
