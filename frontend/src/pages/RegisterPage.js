import React, { useEffect, useState } from "react";
import { ethers, BrowserProvider } from "ethers";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [signer, setSigner] = useState(null);

  const connectWallet = async () => {
    // e.prevenDefault();
    try {
      if (!window.ethereum) {
        alert("Metamask not installed. Please install it!");
        return;
      }
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setSigner(signer);
      setWalletAddress(address);

    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        setWalletAddress(accounts[0] || null);
      });
    }
  }, []);

  const onSubmitHandller = async (e) => {
    e.preventDefault();
    
    try {
      // Initialize the provider and signer
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
  
      // Fetch the nonce from the server
      const nonceResponse = await fetch("http://localhost:5000/api/users/nonce", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wallet_address: address }),
      });
      console.log(nonceResponse)
      // Check if the nonce response is successful
      // if (!nonceResponse.ok) {
      //   throw new Error("Failed to fetch nonce");
      // }
  
      const { nonce } = await nonceResponse.json();
      console.log("Nonce received:", nonce);
  
      // Ensure nonce is valid
      // if (!nonce) {
      //   throw new Error("Invalid nonce received");
      // }
  
      // Sign the message with the nonce
      const signature = await signer.signMessage(nonce.toString());
  
      // Send the signup request with the signature
      const response = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: name,
          walletAddress: address,
          signature: signature,
        }),
      });
  
      // Handle the signup response
      if (!response.ok) {
        throw new Error("Signup failed");
      }
  
      const data = await response.json();
      console.log(data);
      window.location.href = '/';
    } catch (error) {
      console.error("Error in onSubmitHandler:", error);
      alert("An error occurred: " + error.message);
    }
  };
  return (
    <>
      <form onSubmit={onSubmitHandller}>
        <p>Enter your name: </p>
        <input
          type="text"
          placeholder="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        {!walletAddress ? (
          <button onClick={connectWallet}>Connect Wallet</button>
        ) : (
          <button disabled>{walletAddress.slice(0, 7)}...</button>
        )}
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default RegisterPage;