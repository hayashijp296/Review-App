import { useContext } from 'react';
import { AuthContext } from '../components/context/AuthProvider';
import { NotificationContext } from '../components/context/NotificationProvider';
import { ThemeContext } from '../components/context/ThemeProvider';

export const useTheme = () => {
  return useContext(ThemeContext);
};
export const useNotification = () => {
  return useContext(NotificationContext);
};
export const useAuth = () => {
  return useContext(AuthContext);
};
