import React from 'react';
import { ConnectButton } from "@zerodevapp/zerokit";
import { ZeroKitProvider } from "@zerodevapp/zerokit"
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
  useNetwork,
} from "wagmi";
import contractAbi from "../../../static/contracts/polygon-mumbai/0x34bE7f35132E97915633BC1fc020364EA5134863.json";

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  ConnectButton,
  ZeroKitProvider,
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
  useNetwork,
  contractAbi
};
export default ReactLiveScope;
