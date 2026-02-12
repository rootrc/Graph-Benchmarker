import { useEffect, useState } from 'react';
import axios from "axios";

export function useServerConnectionStatus(interval: number = 5000) {
  const API_URL = import.meta.env.VITE_API_URL;
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    let timerId: number;

    const checkConnection = async () => {
      try {
        await axios.get(`${API_URL}/health`);
        setIsConnected(true);
      } catch (error) {
        setIsConnected(false);
      }
    };

    checkConnection();
    timerId = setInterval(checkConnection, interval);

    return () => clearInterval(timerId);
  }, [API_URL, interval]);

  return isConnected;
}
