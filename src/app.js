import React, {useState, useEffect} from "react"
// React-Router
import {BrowserRouter, Routes, Route} from 'react-router-dom'
// Image
import refreshImg from "./images/refresh.png"
// Components
import CoinPage from "./routes/CoinPage"
import CoinRow from "./components/CoinRow"
// CSS File
import './style.css';

export default function App() {
  const [showCoins, setShowCoins] = useState(false)
  const [showNotFound, setShowNotFound] = useState(false)
  const [coins, setCoins] = useState([])
  const [searchedText, setSearchedText] = useState()
  const [filteredCoins, setFilteredCoins] = useState()

  // Trigger the function
  useEffect(() => {
    refresh()
  }, [])

  // Search Function
  function search(e) {
    setSearchedText(e.target.value)
    if (!e.target.value.length == ""){ // Not Empty (Filter the Text)
      let filteredCoins = coins.filter((coin) => {
        // Filtering the coins to find the coin name that inclued any word from the searched text
        return coin.name.toLowerCase().includes(e.target.value.toLowerCase())
      })
      setFilteredCoins(filteredCoins)
      if(filteredCoins.length == 0) { // if not found
        setShowNotFound(true)
      }else {
        setShowNotFound(false)
      }
    }else { // Empty (Return coins)
      setFilteredCoins(coins)
    }
  }

  // Refresh Function to Call Api Again
  const refresh = () => {
    setShowCoins(false)
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
    .then(res => res.json())
    .then(data => {
      setShowCoins(true)
      setCoins(data)
      setFilteredCoins(data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={
          <div className="app">
            <h1 className="header">Welcome To <span>CryptoChecker</span></h1>
            <div className="input-box">
              <input type="text" placeholder="SEARCH FOR A COIN" onChange={search}/>
              <img src={refreshImg} alt="" onClick={refresh}/>
            </div>
            {
              showCoins ?
              filteredCoins.map(coin => {
                return (
                  <CoinRow
                    key={coin.id}
                    id={coin.id}
                    img={coin.image}
                    name={coin.name}
                    symbol={coin.symbol.toUpperCase()}
                    price={coin.current_price}
                    priceChange={coin.price_change_percentage_24h}
                    marketCap={coin.market_cap}
                  />
                )
              })
              :
              <div className="coinContainer"><h2>Loading Data</h2></div>
            }
            {
              showNotFound && <h2>Not Found</h2>
            }
          </div>
        }></Route>
      <Route path="/:coinId" element={<CoinPage setFilteredCoins={setFilteredCoins} coins={coins}/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}