import React, { useEffect, useState } from "react";
import "./AppReact3.css";

const bankOne = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

function AppReact3() {
  const [music, setMusic] = useState({
    keyCode: null,
    keyTrigger: null,
    id: null,
    url: null,
  });

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  function handleKeyPress(e) {
    const soundRes = bankOne.find((sound) => sound.keyCode === e.keyCode);
    if (soundRes) {
      setMusic(soundRes);
      const sounds = document.getElementById(soundRes.keyTrigger);
      const myAudio = sounds.childNodes[0];
      myAudio.play();
    }
  }

  function handleClick(e) {
    const soundRes = bankOne.find((sound) => sound.keyTrigger === e.target.id);
    if (soundRes) {
      setMusic(soundRes);
      const sounds = document.getElementById(e.target.id);
      const myAudio = sounds.childNodes[0];
      myAudio.play();
    }
  }

  return (
    <div id="drum-machine">
      <div className="row">
        {bankOne.map((oneMusic) => (
          <div
            key={oneMusic.id}
            onClick={handleClick}
            className="drum-pad"
            id={oneMusic.keyTrigger}
          >
            <audio
              className="clip"
              src={oneMusic.url}
              id={oneMusic.keyTrigger}
            />
            {oneMusic.keyTrigger}
          </div>
        ))}
      </div>
      <div id="display" key={new Date()}>
        {music.id}
      </div>
    </div>
  );
}

export default AppReact3;
