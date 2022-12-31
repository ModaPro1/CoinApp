import React from "react"
import { Link } from "react-router-dom"
import "./coin.css"

export default function CoinRow(props) {
  return (
    <div className="coinContainer">
      <div className="coinRow">
        <div className="coinData">
          <div className="coin">
            <img src={props.img}/>
            <h1 className="coinName">{props.name}</h1>
            <p className="coinSymbol">{props.symbol}</p>
            <p className="coinPrice">$ {props.price.toFixed(2)}</p>
            {props.priceChange > 0 ? 
              <p className="priceChange green">{props.priceChange.toFixed(2)}%</p> :
              <p className="priceChange red">{props.priceChange.toFixed(2)}%</p>}
            <p className="coinVolume">$ {props.marketCap.toLocaleString()}</p>
            <Link to={`/${props.id}`}>More Info</Link>
          </div>
        </div>
      </div>
    </div>
  )
}