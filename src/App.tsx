import "./App.css";

import mermaid from "mermaid";
import React from "react";
import { useState, useEffect, useRef } from "react";

function App() {
  const [text, setText] = useState(`stateDiagram-v2 \n`);
  const [preview, setPreview] = useState<string | undefined>("");
  const [output, setOutput] = useState("");
  const [inputIn, setInputIn] = useState("");
  const [inputFin, setInputFin] = useState("");
  const [inputProb, setInputProb] = useState("");
  const listMarkov = useRef<any>([]);

  useEffect(() => {
    mermaid.render("graph", preview).then((res) => {
      const { svg } = res;
      setOutput(svg);
    });
  }, [preview]);

  const handleClick = () => {
    setPreview(text);
  };

  const createText = () => {
    const result = listMarkov.current.reduce(
      (acc, curr) => acc + `${curr[0]} --> ${curr[1]} : ${curr[2]} \n`,
      `stateDiagram-v2 \n`
    );
    return result;
  };

  const changeState = (first, second, prob: any | never) => {
    for (let i = 0; i < listMarkov.current.length; i++) {
      if (
        listMarkov.current[i][0] === first &&
        listMarkov.current[i][1] === second
      ) {
        listMarkov.current[i][2] = prob;
        return;
      }
    }
    listMarkov.current.push([first, second, prob]);
  };

  const createStateInput = () => {
    changeState(inputIn, inputFin, inputProb);
    const creatingText = createText();

    setText(creatingText);
  };

  return (
    <div className="App">
      <h1>React Mermaid</h1>
      <div>
        <div>
          <input onChange={(e) => setInputIn(e.target.value)} value={inputIn} />
          <input
            onChange={(e) => setInputFin(e.target.value)}
            value={inputFin}
          />
          <input
            type={"number"}
            onChange={(e) => setInputProb(e.target.value)}
            value={inputProb}
          />
          <button onClick={createStateInput}>Adicionar</button>
        </div>
      </div>
      <div>
        Your code (for debugging):{" "}
        {/* <pre className="mermaid" id="preview">
          {text}
        </pre> */}
        <ol>
          {listMarkov.current.map((el) => (
            <li>
              {el[0]} --{">"} {el[1]} : {el[2]}
            </li>
          ))}
        </ol>
      </div>
      <div>
        <button type="button" id="render" onClick={handleClick}>
          Render
        </button>
      </div>
      <div dangerouslySetInnerHTML={{ __html: output }} />
    </div>
  );
}

export default App;
