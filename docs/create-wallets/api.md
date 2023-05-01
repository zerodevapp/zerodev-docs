---
sidebar_position: 6
---

# ZeroDev Wallet API (Beta)

The most flexible way to create AA wallets is through our API.  In this case, the AA wallets are essentially custodial.  Behind the scenes, we use [Turnkey](https://www.turnkey.io/) to safeguard the keys.

Unlike most custodial wallet providers, ZeroDev's wallet API is ultra-simple.  There are only two endpoints:

- `/create-wallet`: creates a custodial AA wallet
- `/create-session`: create a session key that can be used to send transactions from the AA wallet

What is a session key?  A session key is like a private key, except that when transactions are signed by the session key, only certain transactions are allowed, and only for a limited period of time.

For example, if you are building an NFT game, you might create a session key that can only send transactions related to the game.  You can then send this session key to the client (e.g. browser), where the user can use the key to send game-related transactions, but nothing else.  This makes it safe to use the key in an unsecure environment such as the browser, since even if the key is leaked, the hacker cannot do much with it (such as draining the user's funds).

## API

The wallet API is currently in beta.  Please contact hello@zerodev.app or [join our Discord](https://discord.gg/KS9MRaTSjx) to get access to the beta.