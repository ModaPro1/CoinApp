import React, { useState, useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';
import "./CoinPage.css"

export default function CoinPage(props) {
  const [coin, setCoin] = useState([])
  const [showCoin, setShowCoin] = useState(false)
  const {coinId} = useParams()

  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`)
    .then(res => res.json())
    .then(data => {
      setShowCoin(true)
      setCoin(data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

return (
    <>
      {showCoin ?
      <div className="coinPage">
        <div className="Coinbox">
        <h2>{coin.name}</h2>
        <img src={coin.image.large} alt="" />
        <div className="infos">
          <div className="info">
            <h3 className="title">Symbol:</h3>
            <div className="text">{coin.symbol}</div>
          </div>
          <div className="info">
            <h3 className="title">Current Price:</h3>
            <div className="text">$ {coin.market_data.current_price.usd.toLocaleString()}</div>
          </div>
          <div className="info">
            <h3 className="title">Market Cap:</h3>
            <div className="text">$ {coin.market_data.market_cap.usd.toLocaleString()}</div>
          </div>
          <div className="info">
            <h3 className="title">Total Volume:</h3>
            <div className="text">$ {coin.market_data.total_volume.usd.toLocaleString()}</div>
          </div>
          <div className="info">
            <h3 className="title">24hr High:</h3>
            <div className="text green">$ {coin.market_data.high_24h.usd.toLocaleString()}</div>
          </div>
          <div className="info">
            <h3 className="title">24hr Low:</h3>
            <div className="text red">$ {coin.market_data.low_24h.usd.toLocaleString()}</div>
          </div>
        </div>
        <Link to='/' onClick={() => props.setFilteredCoins(props.coins)}>Back To Coins</Link>
        </div>
      </div> :
      <div className="coinPage"><div className="Coinbox"><h2>Loading Data</h2></div></div>
      }
    </>
  )

}