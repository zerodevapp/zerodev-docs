import React, { useEffect, useMemo, useRef } from 'react';
import { ConnectButton } from "zerokit";
import { ZeroKitProvider } from "zerokit"
import {
  WagmiConfig,
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
  useNetwork,
  useConnect,
  configureChains,
  createClient,
  useDisconnect
} from "wagmi";
import { polygonMumbai } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import {
  getZeroDevSigner,
  getPrivateKeyOwner,
  getRPCProviderOwner,
  getSocialWalletOwner,
  ZeroDevSigner
} from "@zerodevapp/sdk"
import contractAbi from "../../../static/contracts/polygon-mumbai/0x34bE7f35132E97915633BC1fc020364EA5134863.json";
import { ethers } from "ethers";
import { 
  ZeroDevConnector, 
  GoogleSocialWalletConnector, 
  FacebookSocialWalletConnector, 
  GithubSocialWalletConnector,
  DiscordSocialWalletConnector,
  TwitchSocialWalletConnector,
  TwitterSocialWalletConnector,
  AccountParams,
  
} from '@zerodevapp/wagmi'
import { 
  googleWallet,
  facebookWallet,
  githubWallet,
  discordWallet,
  twitchWallet,
  twitterWallet,
} from '@zerodevapp/wagmi/rainbowkit'
import { 
  supportedSocialConnectors
} from '@zerodevapp/wagmi/connectkit'
import { 
  MultiSocialWallet, 
  GoogleSocialWallet, 
  FacebookSocialWallet,
  GithubSocialWallet,
  DiscordSocialWallet,
  TwitchSocialWallet,
  TwitterSocialWallet
} from '@zerodevapp/social-wallet';
import {
  RainbowKitProvider,
  ConnectButton as RainbowKitConnectButton,
  connectorsForWallets
} from '@rainbow-me/rainbowkit';
import { ConnectKitProvider, ConnectKitButton, getDefaultClient, supportedConnectors } from "connectkit";
supportedConnectors.push(...supportedSocialConnectors)


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
  useConnect,
  useDisconnect,
  contractAbi,
  getZeroDevSigner,
  getPrivateKeyOwner,
  getRPCProviderOwner,
  getSocialWalletOwner,
  ZeroDevSigner,
  defaultProjectId: 'b5486fa4-e3d9-450b-8428-646e757c10f6',
  WagmiConfig,
  configureChains,
  createClient,
  polygonMumbai,
  publicProvider,
  ethers,
  useEffect,
  useMemo,
  useRef,
  MultiSocialWallet, 
  GoogleSocialWallet, 
  FacebookSocialWallet,
  GithubSocialWallet,
  DiscordSocialWallet,
  TwitchSocialWallet,
  TwitterSocialWallet,
  ZeroDevConnector, 
  GoogleSocialWalletConnector, 
  FacebookSocialWalletConnector, 
  GithubSocialWalletConnector,
  DiscordSocialWalletConnector,
  TwitchSocialWalletConnector,
  TwitterSocialWalletConnector,
  AccountParams,
  RainbowKitProvider,
  RainbowKitConnectButton,
  ConnectKitProvider,
  ConnectKitButton,
  getDefaultClient,
  connectorsForWallets,
  googleWallet,
  facebookWallet,
  githubWallet,
  discordWallet,
  twitchWallet,
  twitterWallet
};


export default ReactLiveScope;
