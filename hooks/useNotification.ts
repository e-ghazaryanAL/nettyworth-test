import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from './redux';
import { setNotifications } from '../api/api';
import { fetchUserNotification } from '../redux/alerts/alertSlice';
import { AlertCategory } from '../redux/alerts/model';

const useNotification = () => {
  const { notification, loading } = useAppSelector((state) => state.alert);
  const dispatch = useAppDispatch();
  const [toggleSwitch, setToggleSwitch] = useState({ CryptoSales: true, NFTSales: true, News: true, Upcoming: true });
  useEffect(() => {
    dispatch(fetchUserNotification());
  }, [dispatch]);

  useEffect(() => {
    if (notification?.settings) {
      const { CryptoSales, NFTSales, News, Upcoming } = notification.settings;
      setToggleSwitch({
        CryptoSales: !!CryptoSales,
        NFTSales: !!NFTSales,
        News: !!News,
        Upcoming: !!Upcoming,
      });
    }
  }, [notification]);

  const handleSwitchToggle = (alertType: AlertCategory) => {
    const toggleNotification = async () => {
      const res = await setNotifications({ category: alertType, value: !toggleSwitch[alertType] });
      return res;
    };
    toggleNotification();
    setToggleSwitch((prev) => {
      return {
        ...prev,
        [alertType]: !prev[alertType],
      };
    });
  };
  return { notification, handleSwitchToggle, loading, toggleSwitch };
};

export default useNotification;
