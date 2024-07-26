import "./App.css";

import { useState } from "react";

import Reactsvg from "./assets/react.svg";
import H1Component from "./components/h1.component";
import ImgComponent from "./components/img.component";
import DiceRoll from "./components/dice.component";
import Display from "./components/display.component";

function App() {
  const [number, setNumber] = useState(1);

  return (
    <>
      <H1Component fontSize={"90px"} color={"blue"} decoration={"underline"} />
      <H1Component fontSize={"120px"} color={"red"} decoration={"underline"} />
      <H1Component fontSize={"15px"} color={"green"} />
      <ImgComponent src={Reactsvg} size={200} border={5} />
      <ImgComponent src={Reactsvg} size={500} border={20} />
      <ImgComponent src={Reactsvg} size={200} border={20} />
      <Display number={number} />
      <DiceRoll callback={setNumber} />
    </>
  );
}

export default App;
