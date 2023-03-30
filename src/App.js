import "./App.css";
import Mermaid from "./Mermaid";
import mermaid from "mermaid";
import { useState, useEffect } from "react";
import CreateState from "./components/CreateState";
const listMarkov = [];
const setupMermaid = `stateDiagram-v2 \n`;

function App() {
  const [text, setText] = useState(`stateDiagram-v2 \n`);
  const [preview, setPreview] = useState();
  const [output, setOutput] = useState("");
  const [inputIn, setInputIn] = useState("");
  const [inputFin, setInputFin] = useState("");
  const [inputProb, setInputProb] = useState("");

  useEffect(() => {
    const resultRender = mermaid.render("graph", preview).then((res) => {
      const { svg } = res;
      setOutput(svg);
    });
  }, [preview]);

  const handleClick = () => {
    setPreview(text);
  };

  const createStateInput = () => {
    listMarkov.push([inputIn, inputFin, inputProb]);
    const newLinha = `\t ${inputIn} --> ${inputFin} : ${inputProb} \n`;
    console.log(listMarkov);
    console.log(newLinha);
    setText(text + newLinha);
    console.log(text);
  };

  return (
    <div className="App">
      <h1>React Mermaid</h1>
      <div>
        <textarea
          name=""
          id="input"
          cols="41"
          rows="15"
          onChange={(e) => setText(e.target.value)}
        >
          {text}
        </textarea>
        <CreateState
          onClick={createStateInput}
          onChangeIn={(e) => setInputIn(e.target.value)}
          onChangeFin={(e) => setInputFin(e.target.value)}
          onChangeProb={(e) => setInputProb(e.target.value)}
        />
      </div>
      <div>
        Your code (for debugging):{" "}
        <pre className="mermaid" id="preview">
          {preview}
        </pre>
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
