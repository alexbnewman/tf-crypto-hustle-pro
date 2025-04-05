import React, { useEffect, useState } from 'react'
const API_KEY = import.meta.env.VITE_APP_API_KEY;
import { Link } from "react-router-dom";

const CoinInfo = ({ image, name, symbol }) => {
    const [price, setPrice] = useState(null)
    useEffect(() =>  {
        console.log(image, name, symbol)
        const getCoinPrice = async () => {
            const response = await fetch(
                `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD,JPY,EUR&api_key=${API_KEY}`
            )
            const result = await response.json();
            setPrice(result);
        }
        getCoinPrice().catch(console.error);
    }, [symbol])

    return (
        <div>
            {price ? (
                <li className='main-list' key={symbol}>
                    <img 
                        className='icons' 
                        src={`https://www.cryptocompare.com${image}`} 
                        alt={`Small icon for ${name} crypto coin`}
                    />
                    <Link
                    style={{ color: "White" }}
                    to={`/coin/${symbol}`}
                    key={symbol}
                    >
                    {name} <span className="tab"></span> ${price.USD} USD
                    </Link>
                </li>
            ):
            null
            }
        </div>
    )
}

export default CoinInfo