import React, { useEffect, useState } from "react";
import marked from "marked";

import "./AppReact2.css";
const data = `
# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

function AppReact2() {
  const [textArea, setTextArea] = useState(data);

  useEffect(() => {
    document.getElementById("preview").innerHTML = marked(textArea, true);
  }, [textArea]);

  return (
    <div className="container">
      <div id="text-editor">
        <textarea
          onChange={(e) => setTextArea(e.target.value)}
          id="editor"
          value={textArea}
          rows="5"
          style={{ width: "100%" }}
        />
      </div>
      <div id="preview"></div>
    </div>
  );
}

export default AppReact2;
