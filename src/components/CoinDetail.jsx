import { Component, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import CoinChart from "./CoinChart"
const API_KEY = import.meta.env.VITE_APP_API_KEY

function CoinDetail() {
    const [fullDetails, setFullDetails] = useState(null)
    // we use destructuring here! so we don't have to do params.symbol over and over again
    // without destructuring: const params = useParams()
    const { symbol } = useParams()

    useEffect(() => {
        const getCoinDetail = async () => {
            const details = await fetch(
                `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol}&tsyms=USD&api_key=${API_KEY}`
            )
            const description = await fetch(
                `https://min-api.cryptocompare.com/data/all/coinlist?fsym=${symbol}&api_key=${API_KEY}`
            )

            const detailsJson = await details.json()
            const descripJson = await description.json()

            setFullDetails({
                numbers: detailsJson.DISPLAY,
                textData: descripJson.Data
            })
            console.log("deet", detailsJson)
            console.log("desc", descripJson)
        }

        getCoinDetail().catch(console.error)
    }, [symbol])

    return (
        <>
        {fullDetails &&
        <div>
            <h1>{fullDetails.textData[symbol].FullName}</h1>
            <img
            className="images"
            src={`https://www.cryptocompare.com${
                fullDetails.numbers[symbol].USD.IMAGEURL
            }`}
            alt={`Small icon for ${symbol} crypto coin`}
            />
            <div> {fullDetails.textData[symbol].Description}</div>
            <br></br>
            <div>
            This coin was built with the algorithm{" "}
            {fullDetails.textData[symbol].Algorithm}{" "}
            </div>
            <table>
                <tbody> 
                    <tr>
                    <th>Launch Date </th>
                    <td>{fullDetails.textData[symbol].ContentCreatedOn}</td>
                    </tr>
                    <tr>
                    <th>Website </th>
                    <td>{fullDetails.textData[symbol].Url}</td>
                    </tr>
                    <tr>
                    <th>Monetary Symbol </th>
                    <td>{fullDetails.textData[symbol].Symbol}</td>
                    </tr>
                    <tr>
                    <th>Today's Open Price </th>
                    <td>{fullDetails.numbers[symbol].USD.PRICE}</td>
                    </tr>
                </tbody>
                </table>
                <CoinChart
                    symbol={symbol}
                    market={fullDetails.numbers[symbol].USD.MARKET}
                />
        </div>}
        </>
    )
}

export default CoinDetail