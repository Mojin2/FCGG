import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MatchBox from "./MatchBox";

export default function Search() {
  const [matchDataList, setMatchDataList] = useState([]);
  const [isError, setIsError] = useState(false);
  const APIKEY = process.env.REACT_APP_API_KEY;
  const params = useParams();
  const navigate = useNavigate();

  // matchdata fetch
  async function fetchMatchDataList(ouid, matchtype, offset, limit) {
    try {
      const response = await axios.get(
        `https://open.api.nexon.com/fconline/v1/user/match?ouid=${ouid}&matchtype=${matchtype}&offset=${offset}&limit=${limit}`,
        {
          headers: {
            "x-nxopen-api-key": APIKEY,
          },
        }
      );
      setMatchDataList(response.data);
    } catch (error) {
      console.error(error);
      setIsError(true);
    }
  }
  useEffect(() => {
    // fetchMatchDataList(params.ouid, 40, 0, 100);
  });
  return (
    <div>
      {isError ? (
        <div>존재하지않는 플레이어 이름입니다.</div>
      ) : (
        <div>
          <div>{params.ouid}의 페이지</div>
          {/* {matchDataList.map((matchid, index) => (
            <MatchBox matchid={matchid} key={index} />
          ))} */}
        </div>
      )}
    </div>
  );
}
