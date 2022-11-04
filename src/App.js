import { useEffect, useState } from "react";
import styled from "styled-components";
import Timer from "./Timer";

function App() {
  const [showTimer, setShowTimer] = useState(false);

  useEffect(()=>{
    return () => {
      sessionStorage.removeItem("startTime");
      sessionStorage.removeItem("results")
    };
  },[])
  return (
    <AppWrap>
      <div className="mainApp">
        {showTimer && <Timer />}
        <div className="result">
          <button
            onClick={() => {
              setShowTimer(!showTimer);
            }}
          >
            計時器
          </button>
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
    text-align:center;
    .result {
      display: inline-block;
      border: 1px solid;
      width: 400px;
      min-height: 300px;
      margin-top: 150px;
      border-radius:10px;
      padding:10px;
    }
  }
`;

export default App;
