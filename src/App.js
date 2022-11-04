import { useEffect, useState } from "react";
import styled from "styled-components";
import Timer from "./Timer";
import {getTimeStr} from "./util/time";

function App() {
  const [showTimer, setShowTimer] = useState(false);
  const [resultList, setResultList] = useState([]);

  useEffect(() => {
    return () => {
      sessionStorage.removeItem("startTime");
      sessionStorage.removeItem("results");
    };
  }, []);
  return (
    <AppWrap>
      <div className="mainApp">
        {showTimer && (
          <Timer
            handleEndTime={(saveTime, totalTime) => {
              let list = resultList.slice();
              list.push({ saveTime: getTimeStr(saveTime), totalTime: getTimeStr(totalTime) });
              setResultList(list);
            }}
          />
        )}
        <div className="mainPane">
          <button
            onClick={() => {
              setShowTimer(!showTimer);
            }}
          >
            計時器
          </button>
          <div className="results">
            <div className="row header">
              <div className="saveTime">[秒數]</div>
              <div className="totalTime">[累積秒數]</div>
            </div>
            {resultList.length!==0 &&
              resultList.map((result) => {
                return (
                  <div className="row">
                    <div className="saveTime">{result.saveTime}</div>
                    <div className="totalTime">{result.totalTime}</div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </AppWrap>
  );
}

const AppWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .mainApp {
    text-align: center;
    .mainPane {
      display: inline-block;
      border: 1px solid;
      width: 400px;
      min-height: 300px;
      margin-top: 150px;
      border-radius: 10px;
      padding: 10px;
    }
    .results {
      .row {
        display: flex;
        justify-content: space-evenly;
        .totalTime,.saveTime {
          text-align:center;
          width: 120px;
        }
      }
      .row.header {
        margin-top: 20px;
        font-weight: bold;
      }
    }
  }
`;

export default App;
