import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MatchBox from "./MatchBox";

export default function Search() {
  const [isError, setIsError] = useState(false);
  const APIKEY = process.env.REACT_APP_API_KEY;
  const params = useParams();
  const navigate = useNavigate();
  const [matchList, setMatchList] = useState([]);

  // matchdata fetch
  async function fetchMatchList(ouid, matchtype, offset, limit) {
    const storedMatchList = localStorage.getItem(ouid);
    // 로컬 스토리지에 저장되어 있는 경우
    if (storedMatchList) {
      const parsedData = JSON.parse(storedMatchList);
      setMatchList(parsedData);
      console.log("cached match list");
      return;
    }

    // 로컬 스토리지에 저장되어 있지 않는 경우 API호출
    try {
      await axios
        .get(
          `https://open.api.nexon.com/fconline/v1/user/match?ouid=${ouid}&matchtype=${matchtype}&offset=${offset}&limit=${limit}`,
          {
            headers: {
              "x-nxopen-api-key": APIKEY,
            },
          }
        )
        .then((response) => {
          const matchIdList = response.data;
          console.log(matchIdList);
          const fetchMatchDetails = matchIdList.map(
            async (matchId) =>
              await axios
                .get(
                  `https://open.api.nexon.com/fconline/v1/match-detail?matchid=${matchId}`,
                  {
                    headers: {
                      "x-nxopen-api-key": APIKEY,
                    },
                  }
                )
                .then((response) => response.data)
          );
          Promise.all(fetchMatchDetails)
            .then((matchDetails) => {
              setMatchList(matchDetails);
            })
            .catch((error) => {
              console.error(error);
            });
        });
      localStorage.setItem(ouid, JSON.stringify(matchList));
      console.log("save to localstorage");
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchMatchList(params.ouid, 40, 0, 100);
  }, []);

  return (
    <div>
      {isError ? (
        <div>존재하지않는 플레이어 이름입니다.</div>
      ) : (
        <div>
          <div>{params.ouid}의 페이지</div>
          {matchList.map((match, index) => (
            <MatchBox match={match} key={index} />
          ))}
        </div>
      )}
    </div>
  );
}
