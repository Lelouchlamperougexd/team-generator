import React, { createContext, useContext, useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';

interface NetworkStatusContextType {
  isConnected: boolean;
}

const NetworkStatusContext = createContext<NetworkStatusContextType>({ isConnected: true });

export const NetworkStatusProvider = ({ children }: { children: React.ReactNode }) => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(!!state.isConnected);
    });
    NetInfo.fetch().then(state => setIsConnected(!!state.isConnected));
    return () => unsubscribe();
  }, []);

  return (
    <NetworkStatusContext.Provider value={{ isConnected }}>
      {children}
    </NetworkStatusContext.Provider>
  );
};

export const useNetworkStatus = () => useContext(NetworkStatusContext); 