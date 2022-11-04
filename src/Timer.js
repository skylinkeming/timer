import { useEffect, useState } from "react";
import styled from "styled-components";
import { getTimeStr } from "./util/time";

function Timer(props) {
  const [timer, setTimer] = useState(
    sessionStorage.getItem("timer")
      ? parseInt(sessionStorage.getItem("timer"))
      : null
  );
  const [startTime, setStartTime] = useState(
    sessionStorage.getItem("startTime")
      ? parseInt(sessionStorage.getItem("startTime"))
      : 0
  );

  useEffect(() => {
    return () => {
      if (sessionStorage.getItem("timer"))
        clearInterval(parseInt(sessionStorage.getItem("timer")));
    };
  }, []);

  const startTimer = () => {
    let currentSeconds = 0;
    if (timer) {
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
    sessionStorage.setItem("timer", stopNum);
  };

  const saveTime = () => {
    // let results = sessionStorage.getItem("results")
    //   ? sessionStorage.getItem("results").split(",")
    //   : [];

    // if (results) {
    //   results.push(sessionStorage.getItem("startTime"));
    //   sessionStorage.setItem("results", results.join(","));
    // } else {
    sessionStorage.setItem("saveTime", sessionStorage.getItem("startTime"));
    // }
  };

  const stopTimer = () => {
    if (timer) {
      clearInterval(timer);
    }
  };

  const clearTime = () => {
    stopTimer();
    sessionStorage.removeItem("startTime");
    setStartTime(0);
  };

  const endTimer = () => {
    // let results = sessionStorage.getItem("results");
    props.handleEndTime(sessionStorage.getItem("saveTime"), sessionStorage.getItem("startTime"));
    sessionStorage.removeItem("saveTime");
    clearTime();
  };

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
        </div>
      </div>
    </TimerWrap>
  );
}

const TimerWrap = styled.div`
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  top: 20px;
  .mainPanel {
    border: 1px solid gray;
    display: inline-block;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    width: 422px;
    box-sizing: border-box;
    .timerValue {
      font-family: helvetica;
      font-weight: bold;
      font-size: 30px;
      margin-bottom: 10px;
    }
  }
  .btnArea {
    button {
      margin: 0 5px;
    }
  }
`;

export default Timer;
