import React, { useContext, useState } from 'react';
import { TokenContext, UsernameContext } from './Contexte/Context';
import Navigation from './Navigation/Navigation';

export default function App () {
  const [token, setToken] = useState(null)
  const [username, setUsername] = useState(null)

  console.log('token', token)
  return (
    <UsernameContext.Provider value={[username,setUsername]}>
      <TokenContext.Provider value={[token, setToken]}>
        <Navigation />
      </TokenContext.Provider>
    </UsernameContext.Provider>
  )
}
