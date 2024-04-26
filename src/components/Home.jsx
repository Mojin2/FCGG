import { useEffect, useState } from "react";
import axios from "axios";
import MatchBox from "./MatchBox";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [text, setText] = useState("");
  const [ouid, setOuid] = useState("");
  const [isError, setIsError] = useState(false);
  const APIKEY = process.env.REACT_APP_API_KEY;
  const navigate = useNavigate();
  // ouid fetch with local storage
  async function fetchOuid(characterName) {
    const storedouid = localStorage.getItem(characterName);
    if (storedouid) {
      const parsedData = JSON.parse(storedouid);
      setOuid(parsedData.ouid);
      navigate(`/${ouid}`);
      console.log("cached ouid");
      return;
    }

    try {
      const response = await axios.get(
        `https://open.api.nexon.com/fconline/v1/id?nickname=${characterName}`,
        {
          headers: {
            "x-nxopen-api-key": APIKEY,
          },
        }
      );
      localStorage.setItem(characterName, JSON.stringify(response.data));
      setOuid(response.data.ouid);
      console.log("save ouid to localstorage");
    } catch (error) {
      console.error(error);
      setIsError(true);
    }
  }
  useEffect(() => {
    if (ouid) {
      navigate(`/${ouid}`);
    }
  }, [ouid]);
  const handleTextChange = (event) => {
    setText(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchOuid(text);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          placeholder="Typing Nickname"
        />
        <input type="submit" value="검색" />
      </form>
    </div>
  );
}
