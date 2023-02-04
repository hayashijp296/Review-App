import React from 'react';
import { useState } from 'react';
import { createContext } from 'react';

export const NotificationContext = createContext();
let timeoutId;
export default function NotificationProvider({ children }) {
  const [notification, setNotification] = useState('');
  const [classes, setClasses] = useState('');

  const updateNotifications = (type, value) => {
    if (timeoutId) clearTimeout(timeoutId);
    switch (type) {
      case 'error':
        setClasses('bg-red-500');
        break;
      case 'success':
        setClasses('bg-green-500');
        break;
      case 'warning':
        setClasses('bg-orange-500');
        break;
      default:
        setClasses('bg-red-500');
    }
    setNotification(value);
    timeoutId = setTimeout(() => {
      setNotification('');
    }, 3000);
  };
  return (
    <NotificationContext.Provider value={{ updateNotifications }}>
      {children}
      {notification && (
        <div className="fixed left-1/2 -translate-x-1/2 top-20">
          <div className="bounce-custom shadow-md shadow-gray-400 bg-red-400 rounded">
            <p className={classes + ' text-white px-4 py-2 font-semibold'}>
              {notification}
            </p>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
}
