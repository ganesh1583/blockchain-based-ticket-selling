import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrowserProvider, JsonRpcProvider } from 'ethers';

const AuthContext = createContext();

// Add the RPC URL definition here
const rpcUrl = "https://ethereum.publicnode.com"; // Using a public Ethereum node

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    try {
      // fetch(`http://localhost:5000/api/users/${setUser.walletAddress}`)
      if (window.ethereum) {
        const provider = new BrowserProvider(window.ethereum);
        const accounts = await provider.listAccounts();
        
        if (accounts.length > 0) {
          // Make sure we have a valid address and convert it to string
          const address = accounts[0] ? accounts[0].address : null;
          if (address) {
            setUser({
              walletAddress: address,
              provider: provider
            });
          }
        }
      }
    } catch (err) {
      console.error('Error checking wallet connection:', err);
      setError('Failed to check wallet connection');
    } finally {
      setLoading(false);
    }
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        throw new Error('Please install MetaMask to use this application');
      }

      const provider = new BrowserProvider(window.ethereum);
      
      // Request accounts access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await provider.listAccounts();
      
      if (accounts.length > 0) {
        // Make sure we have a valid address and convert it to string
        const address = accounts[0] ? accounts[0].address : null;


        fetch(`http://localhost:5000/api/users/${address}`)
        .then((response) => response.json()) // Convert response to JSON
        .then((data) => {
          if (data === null) {
            alert("Go for registration.");
            window.location.href = '/register';
          } else {
            if (address) {
              setUser({
                walletAddress: address,
                provider: provider
              });
              return address; // Return the address for convenience
            }
          }
        })
        .catch((error) => {
          // Handle any errors
          console.error("Error occurred while fetching:", error);
        });

      }
      throw new Error('No accounts found');
    } catch (err) {
      console.error('Error connecting wallet:', err);
      setError('Failed to connect wallet');
      throw err;
    }
  };

  const disconnectWallet = async () => {
    try {
      setUser(null);
    } catch (err) {
      console.error('Error disconnecting wallet:', err);
      setError('Failed to disconnect wallet');
      throw err;
    }
  };

  const value = {
    user,
    loading,
    error,
    connectWallet,
    disconnectWallet
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};