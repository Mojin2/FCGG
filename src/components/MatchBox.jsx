import { useEffect, useState } from "react";
import axios from "axios";

export default function MatchBox(props) {
  const { match } = props;
  const [clicked, setClicked] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };
  const APIKEY = process.env.REACT_APP_API_KEY;

  return (
    <div>
      <div className="bg-red-500 w-full h-[100px] flex justify-between">
        {match.matchId}
        <button className="bg-yellow-500" onClick={handleClick}>
          열기
        </button>
      </div>
      <div
        className={`bg-blue-500 w-full h-[400px] flex justify-between px-10 ${
          clicked ? "" : "hidden"
        }`}
      >
        {/* {Array.isArray(info) ? (
          info.map((inf, index) => (
            <div key={index}>{inf.matchDetail.matchResult}</div>
          ))
        ) : (
          <div>Loading...</div>
        )} */}
      </div>
    </div>
  );
}
