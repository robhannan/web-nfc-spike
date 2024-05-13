import React from "react";
import logo from "./logo.svg";
import "./App.css";

interface NDEFReadingEvent extends Event {
  message: any;
  serialNumber: string;
}

const WriteUrl = async (setMessage: Function) => {
  try {
    const ndef = new NDEFReader();
    await ndef.write("https://selfridges.com");
    console.log("> Message written");
    setMessage("Message written");
  } catch (error) {
    console.log("Argh! " + error);
    setMessage("Argh! Write error:" + error);
  }
};

const ReadTag = async (setMessage: Function) => {
  try {
    const ndef = new NDEFReader();
    await ndef.scan();
    console.log("> Scan started");
    setMessage("> Scan started");

    ndef.addEventListener("readingerror", () => {
      console.log("Argh! Cannot read data from the NFC tag. Try another one?");
      setMessage("Argh! Cannot read data from the NFC tag. Try another one?");
    });

    ndef.addEventListener("reading", (event: Event) => {
      const { message, serialNumber } = event as unknown as NDEFReadingEvent;
      console.log(`> Serial Number: ${serialNumber}`);
      console.log(`> Records: (${message.records.length})`);
      setMessage(`Serial Number: ${serialNumber} + Records: ${message.records.length}`);
    });
  } catch (error) {
    console.log("Argh! " + error);
    setMessage("Argh! Read error:" + error);
  }
};

const App = () => {
  const [message, setMessage] = React.useState("Write or Scan");

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button
          className="Write-Button"
          onClick={() => {
            console.log("User clicked write button");
            setMessage("User clicked write button");
            WriteUrl(setMessage);
          }}
        >
          Write tag
        </button>
        <button
          className="Write-Button"
          onClick={() => {
            console.log("User clicked read button");
            setMessage("User clicked read button");
            ReadTag(setMessage);
          }}
        >
          Read tag
        </button>
        <div>{message}</div>
      </header>
    </div>
  );
};

export default App;
