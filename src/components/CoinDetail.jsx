import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const API_KEY = import.meta.env.VITE_APP_API_KEY;


const CoinDetail = () => {
    let params = useParams();
    const [fullDetails, setFullDetails] = useState(null);
    useEffect(() => {
        const getCoinDetail = async () => {
          const details = await fetch(
            `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${params.symbol}&tsyms=USD&api_key=` +
              API_KEY
          );
          const description = await fetch(
            `https://min-api.cryptocompare.com/data/all/coinlist?fsym=${params.symbol}&api_key=` +
              API_KEY
          );
      
          const detailsJson = await details.json();
          const descripJson = await description.json();
      
          setFullDetails({"numbers": detailsJson.DISPLAY, "textData": descripJson.Data});
        };
        
        getCoinDetail().catch(console.error);
      }, [params.symbol]);

      if (!fullDetails || !fullDetails.textData || !fullDetails.numbers) {
        return <div>Loading...</div>;
      }
    return (
        <div>
            <h1>{fullDetails.textData[params.symbol].FullName}</h1>
            <img
            className="images"
            src={`https://www.cryptocompare.com${
                fullDetails.numbers[params.symbol].USD.IMAGEURL
            }`}
            alt={`Small icon for ${params.symbol} crypto coin`}
            />
            <div> {fullDetails.textData[params.symbol].Description}</div>
            <br></br>
            <div>
            This coin was built with the algorithm{" "}
            {fullDetails.textData[params.symbol].Algorithm}{" "}
            </div>
            <table>
            <tbody>
              <tr>
                <th>Launch Date</th>
                <td>{fullDetails.textData[params.symbol].AssetLaunchDate || "N/A"}</td>
              </tr>
              <tr>
                <th>Website</th>
                <td>
                  <a href={fullDetails.textData[params.symbol].WebsiteUrl} target="_blank" rel="noopener noreferrer">
                    {fullDetails.textData[params.symbol].WebsiteUrl || "N/A"}
                  </a>
                </td>
              </tr>
              <tr>
                <th>Whitepaper</th>
                <td>
                  <a href={fullDetails.textData[params.symbol].WhitePaper?.Url} target="_blank" rel="noopener noreferrer">
                    {fullDetails.textData[params.symbol].WhitePaper?.Url || "N/A"}
                  </a>
                </td>
              </tr>
              <tr>
                <th>Monetary Symbol</th>
                <td>{params.symbol}</td>
              </tr>
              <tr>
                <th>Market</th>
                <td>{fullDetails.numbers[params.symbol].USD.MARKET || "N/A"}</td>
              </tr>
              <tr>
                <th>Last Transaction</th>
                <td>{fullDetails.numbers[params.symbol].USD.LASTUPDATE || "N/A"}</td>
              </tr>
              <tr>
                <th>Last Transaction Value</th>
                <td>{fullDetails.numbers[params.symbol].USD.PRICE || "N/A"}</td>
              </tr>
              <tr>
                <th>Volume (24h)</th>
                <td>{fullDetails.numbers[params.symbol].USD.VOLUME24HOUR || "N/A"}</td>
              </tr>
              <tr>
                <th>Today's Open Price</th>
                <td>{fullDetails.numbers[params.symbol].USD.OPEN24HOUR || "N/A"}</td>
              </tr>
              <tr>
                <th>Highest Price during the Day</th>
                <td>{fullDetails.numbers[params.symbol].USD.HIGH24HOUR || "N/A"}</td>
              </tr>
              <tr>
                <th>Lowest Price during the Day</th>
                <td>{fullDetails.numbers[params.symbol].USD.LOW24HOUR || "N/A"}</td>
              </tr>
              <tr>
                <th>Change from Previous Day</th>
                <td>{fullDetails.numbers[params.symbol].USD.CHANGE24HOUR || "N/A"}</td>
              </tr>
              <tr>
                <th>Market Cap</th>
                <td>{fullDetails.numbers[params.symbol].USD.MKTCAP || "N/A"}</td>
              </tr>
            </tbody>
          </table>

        </div>
    );
  };
  
  export default CoinDetail;