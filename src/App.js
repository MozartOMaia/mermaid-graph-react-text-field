// import logo from "./logo.svg";
import "./App.css";
import Mermaid from "./Mermaid";
// import example from "./example";
// import mermaidAPI from "mermaid/dist/mermaidAPI";
import mermaid from "mermaid";
// import Mermaid from "react-mermaid2";
import { useState, useEffect } from "react";
// import { __esModule } from "react-mermaid";
// import mermaidAPI from "mermaid/dist/mermaidAPI";

// mermaid.initialize({
//   startOnLoad: true,
//   theme: "default",
//   securityLevel: "loose",
// });

function App() {
  const [text, setText] = useState();
  const [preview, setPreview] = useState();
  const [output, setOutput] = useState("");

  useEffect(() => {
    // mermaid.contentLoaded();
    // handleParse();

    const resultRender = mermaid.render("graph", preview).then((res) => {
      const { svg } = res;
      setOutput(svg);
      // console.log(svg);
    });
    // console.log("resultrender:", resultRender);
  }, [preview]);

  const handleClick = () => {
    setPreview(text);
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
