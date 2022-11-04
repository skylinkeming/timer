import { useEffect, useState } from "react";
import styled from "styled-components";
import { getTimeStr} from './util/time';

function Timer(props) {
  const [timer, setTimer] = useState(null);
  const [startTime, setStartTime] = useState(0);

  useEffect(() => {

  }, []);

  const startTimer = () => {
    let currentSeconds = 0;
    if(timer){
        clearInterval(timer);
    }
    let stopNum = setInterval(() => {
      if (sessionStorage.getItem("startTime")) {
        currentSeconds = parseInt(sessionStorage.getItem("startTime"));
      }
      currentSeconds++;
      sessionStorage.setItem("startTime", currentSeconds);
      setStartTime(currentSeconds);
    }, 1000);
    setTimer(stopNum);
  };

  const saveTime = () => {
    let results = sessionStorage.getItem("results")
      ? sessionStorage.getItem("results").split(",")
      : [];

    if (results) {
      results.push(sessionStorage.getItem("startTime"));
      sessionStorage.setItem("results", results.join(","));
    } else {
      sessionStorage.setItem("results", sessionStorage.getItem("startTime"));
    }
  };

  const stopTimer = () => {
    if (timer) {
      clearInterval(timer);
    }
  };

  const clearTime = () => {
    sessionStorage.removeItem("startTime");
    setStartTime(0);
  };

  const endTimer = () => {
    let results = sessionStorage.getItem("results");
    if (results) {
      results.push();
    }
    sessionStorage.setItem("results");
  };

  const clickResult = () => {
    if (props.handleClickResult) {
      props.handleClickResult();
    }
  };

//   const getTimeStr = () => {
//     let minutes = parseInt(startTime / 60);
//     let seconds = startTime % 60;
//     let minuteStr = "00";
//     let secondStr = "00";

//     if (minutes < 10) {
//       minuteStr = "0" + minutes;
//     } else if (minutes >= 10) {
//       minuteStr = minutes;
//     }
//     if (seconds < 10) {
//       secondStr = "0" + seconds;
//     } else if (seconds >= 10) {
//       secondStr = seconds;
//     }
//     return minuteStr + ":" + secondStr;
//   };

  return (
    <TimerWrap>
      <div className="mainPanel">
        <div className="timerValue">{getTimeStr(startTime)}</div>
        <div className="btnArea">
          <button onClick={startTimer}>開始</button>
          <button onClick={saveTime}>暫存</button>
          <button onClick={stopTimer}>暫停</button>
          <button onClick={endTimer}>結束</button>
          <button onClick={clearTime}>歸零</button>
          <button onClick={clickResult}>結果</button>
        </div>
      </div>
    </TimerWrap>
  );
}

const TimerWrap = styled.div`
  position:absolute;
  transform:translateX(-50%);
  left:50%;
  top:20px;
  .mainPanel {
    border: 1px solid gray;
    display: inline-block;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    .timerValue {
      font-family: helvetica;
      font-weight: bold;
      font-size: 30px;
      margin-bottom: 10px;
    }
  }
`;

export default Timer;
