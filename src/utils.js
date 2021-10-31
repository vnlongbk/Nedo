import { connect, Contract, keyStores, WalletConnection } from 'near-api-js'
import getConfig from './config'

const nearConfig = getConfig('development')

// Initialize contract & set global variables
export async function initContract() {
  // Initialize connection to the NEAR testnet
  const near = await connect(
    Object.assign(
      { deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } },
      nearConfig
    )
  )

  window.walletConnection = new WalletConnection(near)

  window.accountId = window.walletConnection.getAccountId()

  window.contract = await new Contract(
    window.walletConnection.account(),
    nearConfig.contractName,
    {
      // viewMethods: ['getGreeting'],
      changeMethods: ['sendNear'],
    }
  )
}

export function logout() {
  window.walletConnection.signOut()
  window.location.replace(window.location.origin + window.location.pathname)
}

export function login() {
  window.walletConnection.requestSignIn(nearConfig.contractName)
}
