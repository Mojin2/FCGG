import { useState } from "react";
import axios from "axios";

export default function MatchBox(props) {
  const { matchid } = props;
  const [clicked, setClicked] = useState(false);
  const [isError, setIsError] = useState(false);
  const [info, setInfo] = useState({});
  const handleClick = () => {
    setClicked(!clicked);
    fetchMatchDetails(matchid);
  };
  const APIKEY = process.env.REACT_APP_API_KEY;
  async function fetchMatchDetails(matchid) {
    try {
      const response = await axios.get(
        `https://open.api.nexon.com/fconline/v1/match-detail?matchid=${matchid}`,
        {
          headers: {
            "x-nxopen-api-key": APIKEY,
          },
        }
      );
      setInfo(response.data);
      console.log(info);
    } catch (error) {
      console.error(error);
      setIsError(true);
    }
  }
  return (
    <div>
      <div className="bg-red-500 w-full h-[100px] flex justify-between">
        {matchid}
        <button className="bg-yellow-500" onClick={handleClick}>
          열기
        </button>
      </div>
      <div
        className={`bg-blue-500 w-full h-[300px] ${clicked ? "" : "hidden"}`}
      >
        {info.matchInfo}
      </div>
    </div>
  );
}
