---
sidebar_position: 3
---

# Ethers API

```typescript
import { getZeroDevSigner, getSocialWalletOwner } from '@zerodevapp/sdk'

import { 
  MultiSocialWallet, 
  GoogleSocialWallet, 
  FacebookSocialWallet,
  GithubSocialWallet,
  DiscordSocialWallet,
  TwitchSocialWallet,
  TwitterSocialWallet
} from '@zerodevapp/social-wallet';

const socialWallet = new AnySocialWalletFromAbove()

const signer = await getZeroDevSigner({
  projectId: "<project id>",
  owner: await getSocialWalletOwner("<project id>", socialWallet),
})
```

Example using MultiSocialWallet as an owner:

```jsx live folded
function RpcProviderExample() {
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)

  const socialWallet = useMemo(() => {
    return new MultiSocialWallet()
  }, [])
  
  const createWallet = async () => {
    setLoading(true)
    const signer = await getZeroDevSigner({
      projectId: defaultProjectId,
      owner: await getSocialWalletOwner(defaultProjectId, socialWallet)
    })
    setAddress(await signer.getAddress())
    setLoading(false)
  }

  const disconnect = async () => {
    await socialWallet.disconnect()
    setAddress('')
  }

  const connected = !!address

  return (
    <div>
      {connected && 
        <div>
          <label>Wallet: {address}</label>
        </div>
      }
      <div>
        {!connected && <button onClick={createWallet} disabled={loading}>{ loading ? 'loading...' : 'Create Wallet'}</button>}
        {connected && 
          <button onClick={disconnect} disabled={loading}>Disconnect</button>
        }
      </div>
    </div>
  )
}
```
