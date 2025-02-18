// // 
// import { ethers } from "ethers";
// import Web3Modal from "web3modal";

// import { ChatAppAddress, ChatAppABI } from "../Context/constants";

// export const ChechIfWalletConnected = async () => {
//   try {
//     if (!window.ethereum) return alert("Install MateMask");

//     const accounts = await window.ethereum.request({
//       method: "eth_accounts",
//     });

//     const firstAccount = accounts[0];
//     return firstAccount;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const connectWallet = async () => {
//   try {
//     if (!window.ethereum) return console.log("Install MetaMask");

//     const accounts = await window.ethereum.request({
//       method: "eth_requestAccounts",
//     });
//     const firstAccount = accounts[0];
//     //alert(firstAccount);
//     return firstAccount;
//   } catch (error) {
//     console.log(error);
//   }
// };

// const fetchContract = (signerOrProvider) =>{
//   //console.log(ChatAppAddress, ChatAppABI, signerOrProvider);
//   new ethers.Contract(ChatAppAddress, ChatAppABI, signerOrProvider);
// }


// export const connectingWithContract = async () => {
//   try {
    
//     const web3modal = new Web3Modal();
//     const connection = await web3modal.connect();
//     const provider = new ethers.providers.Web3Provider(connection);
//     //console.log(provider);
//     const signer = provider.getSigner();
//     const contract = fetchContract(signer);
//     return contract;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

// export const converTime = (time) => {
//   const newTime = new Date(time.toNumber()*1000);

//   const realTime =
//     newTime.getHours() +
//     ":" +
//     newTime.getMinutes() +
//     ":" +
//     newTime.getSeconds() +
//     "  Date:" +
//     newTime.getDate() +
//     "/" +
//     (newTime.getMonth() + 1) +
//     "/" +
//     newTime.getFullYear();
//   console.log(time)
//   return realTime;
// };

// // export const converTime = (time) => {
// //   const newTime = new Date(time.toNumber());

// //   const realTime = newTime.toLocaleString('vi-VN', {
// //     hour: '2-digit',
// //     minute: '2-digit',
// //     second: '2-digit',
// //     day: '2-digit',
// //     month: '2-digit',
// //     year: 'numeric'
// //   });

// //   return realTime;
// // };
// 
import { ethers } from "ethers";
import Web3Modal from "web3modal";

import { ChatAppAddress, ChatAppABI } from "../Context/constants";

export const ChechIfWalletConnected = async () => {
  try {
    if (!window.ethereum) return alert("Install MateMask");

    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    const firstAccount = accounts[0];
    return firstAccount;
  } catch (error) {
    console.log(error);
  }
};

export const connectWallet = async () => {
  try {
    if (!window.ethereum) return console.log("Install MetaMask");

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const firstAccount = accounts[0];
    //alert(firstAccount);
    return firstAccount;
  } catch (error) {
    console.log(error);
  }
};

const fetchContract = (signerOrProvider) =>
  new ethers.Contract(ChatAppAddress, ChatAppABI, signerOrProvider);

export const connectingWithContract = async () => {
  try {
    
    //const web3modal = new Web3Modal();
    //const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);
    return contract;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const converTime = (time) => {
  const newTime = new Date(time.toNumber()*1000);

  const realTime =
    newTime.getHours() +
    ":" +
    newTime.getMinutes() +
    ":" +
    newTime.getSeconds() +
    "  Date:" +
    newTime.getDate() +
    "/" +
    (newTime.getMonth() + 1) +
    "/" +
    newTime.getFullYear();
  console.log(time)
  return realTime;
};

// export const converTime = (time) => {
//   const newTime = new Date(time.toNumber());

//   const realTime = newTime.toLocaleString('vi-VN', {
//     hour: '2-digit',
//     minute: '2-digit',
//     second: '2-digit',
//     day: '2-digit',
//     month: '2-digit',
//     year: 'numeric'
//   });

//   return realTime;
// };

