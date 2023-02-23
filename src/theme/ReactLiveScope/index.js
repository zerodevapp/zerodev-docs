import React from 'react';
import { ConnectButton } from "zerokit";
import { ZeroKitProvider } from "zerokit"
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
  useNetwork,
} from "wagmi";
import {
  getZeroDevSigner,
  getPrivateKeyOwner,
  getRPCProviderOwner,
} from "@zerodevapp/sdk"
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
  contractAbi,
  getZeroDevSigner,
  getPrivateKeyOwner,
  getRPCProviderOwner,
  defaultProjectId: 'b5486fa4-e3d9-450b-8428-646e757c10f6',
};
export default ReactLiveScope;
