import React, { useEffect, useMemo, useCallback, useRef } from 'react';
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
import { polygonMumbai, goerli } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { infuraProvider } from 'wagmi/providers/infura'
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
  Auth0WalletConnector,
  JWTWalletConnector,
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
import {
  ZeroDevWeb3AuthWithModal,
  ZeroDevWeb3Auth
} from '@zerodevapp/web3auth'
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
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";

import { Web3Modal, Web3Button } from "@web3modal/react";
import { SponsoredMintExample } from '@site/src/components/SponsoredMintExample';
const defaultWalletConenctProjectId = 'df7cda28d80ccef14260ff3e2bfb1388'
const infuraApiKey = 'f36f7f706a58477884ce6fe89165666c'

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
  goerliProjectId: '68bc6515-8a0e-4346-b3c4-8f4aa3f780a5',
  WagmiConfig,
  configureChains,
  createClient,
  polygonMumbai,
  goerli,
  publicProvider,
  infuraProvider,
  infuraApiKey,
  ethers,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  ZeroDevWeb3Auth,
  ZeroDevWeb3AuthWithModal,
  ZeroDevConnector, 
  Auth0WalletConnector,
  JWTWalletConnector,
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
  w3mConnectors,
  w3mProvider,
  Web3Modal,
  Web3Button,
  defaultWalletConenctProjectId,
  web3ModalConfig,
  usePrepareContractBatchWrite, 
  useContractBatchWrite, 
  useWaitForAATransaction,
  SponsoredMintExample
};


export default ReactLiveScope;
