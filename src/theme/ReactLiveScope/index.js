import React, { useEffect, useMemo, useRef } from 'react';
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
  useDisconnect,
} from "wagmi";
import { polygonMumbai } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import {
  getZeroDevSigner,
  getPrivateKeyOwner,
  getRPCProviderOwner,
  getSocialWalletOwner,
  ZeroDevSigner,
  initiateProject
} from "@zerodevapp/sdk"
import contractAbi from "../../../static/contracts/polygon-mumbai/0x34bE7f35132E97915633BC1fc020364EA5134863.json";
import { ethers } from "ethers";
import { 
  ZeroDevConnector, 
  SocialWalletConnector,
  GoogleSocialWalletConnector, 
  FacebookSocialWalletConnector, 
  GithubSocialWalletConnector,
  DiscordSocialWalletConnector,
  TwitchSocialWalletConnector,
  TwitterSocialWalletConnector,
  enhanceConnectorWithAA,
  AccountParams,
  usePrepareContractBatchWrite, 
  useContractBatchWrite, 
  useWaitForAATransaction
} from '@zerodevapp/wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { 
  googleWallet,
  facebookWallet,
  githubWallet,
  discordWallet,
  twitchWallet,
  twitterWallet,
  enhanceWalletWithAAConnector
} from '@zerodevapp/wagmi/rainbowkit'
import { 
  supportedSocialConnectors
} from '@zerodevapp/wagmi/connectkit'
import { web3ModalConfig } from '@zerodevapp/wagmi/web3modal'
import { 
  SocialWallet, 
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
import {
  injectedWallet,
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { ConnectKitProvider, ConnectKitButton, getDefaultClient, supportedConnectors } from "connectkit";
supportedConnectors.push(...supportedSocialConnectors)
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";

import { Web3Modal, Web3Button } from "@web3modal/react";
const defaultWalletConenctProjectId = 'df7cda28d80ccef14260ff3e2bfb1388'

initiateProject('b5486fa4-e3d9-450b-8428-646e757c10f6')


// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
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
  SocialWallet, 
  GoogleSocialWallet, 
  FacebookSocialWallet,
  GithubSocialWallet,
  DiscordSocialWallet,
  TwitchSocialWallet,
  TwitterSocialWallet,
  ZeroDevConnector, 
  SocialWalletConnector,
  GoogleSocialWalletConnector, 
  FacebookSocialWalletConnector, 
  GithubSocialWalletConnector,
  DiscordSocialWalletConnector,
  TwitchSocialWalletConnector,
  TwitterSocialWalletConnector,
  AccountParams,
  enhanceConnectorWithAA,
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
  twitterWallet,
  enhanceWalletWithAAConnector,
  injectedWallet,
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
  MetaMaskConnector,
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
  Web3Modal,
  Web3Button,
  defaultWalletConenctProjectId,
  web3ModalConfig,
  usePrepareContractBatchWrite, 
  useContractBatchWrite, 
  useWaitForAATransaction
};


export default ReactLiveScope;
