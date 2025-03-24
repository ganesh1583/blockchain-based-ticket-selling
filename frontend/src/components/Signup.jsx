import React, { useEffect, useState } from "react";
import { ethers, BrowserProvider } from "ethers";

const Signup = () => {
  const [name, setName] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const getSignerInfo = async () => {
    if (!window.ethereum) {
      alert("Metamask not installed. Please install it!");
      return;
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    // await provider.send("eth_requestAccounts", []);
    return provider.getSigner();
  };
  const connectWallet = async () => {
    // e.prevenDefault();
    try {
      const signer = await getSignerInfo();
      const accounts = await signer.getAddress();
      // const accounts = await provider.send("eth_requestAccounts", []);
      console.log(accounts);
      setWalletAddress(accounts);
      // console.log(name,wallerAddress)
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
    const signer = await getSignerInfo();

    const nonceResponse = await fetch("http://localhost:5000/api/users/nonce", {
      method: "post",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({ wallet_address: walletAddress }),
    });
    const { nonce } = await nonceResponse.json();
    console.log(nonce);

    const signature = await signer.signMessage(nonce);
    const response = await fetch("http://localhost:5000/api/users/signup", {
      method: "post",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({ name: name, walletAddress: walletAddress, signature: signature }),
    });

    const data = await response.json();
    console.log(data);
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

export default Signup;
