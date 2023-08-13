import { useEffect, useRef, useState } from "react"
import { vwToPixels, vhToPixels } from "../functions/viewportToPixels"

const randomIntegers = Array.from({ length: 30 }, () => parseInt(Math.random() * 20 - 12));


const ellipseToPath = (props) => {
  const cx = vwToPixels(50);
  const cy = vhToPixels(50);

  const rx = vwToPixels(10 + props.id*6);
  const ry = vhToPixels(10 + props.id*6);
  return `M${cx - rx},${cy} A${rx},${ry} 0 1,0 ${cx + rx},${cy} A${rx},${ry} 0 1,0 ${cx - rx},${cy}`;
}

const Planet = (props) => {
  return (
    <g transform={`rotate(${props.rotation} ${0.75*window.innerWidth} ${0.75*window.innerHeight})`}>
      <path id={"motion-path" + props.id} d={ellipseToPath(props)} fill="transparent" stroke="transparent" strokeWidth="8" />
      <circle cx="0" cy="0" r={10 + 3 * Math.abs(randomIntegers[props.id])} fill={props.color}>
        <animateMotion dur={Math.floor(Math.random() * (100 - 70 + 1)) + 30 + "s"} repeatCount="indefinite" begin={Math.floor(Math.random() * (-85 - (-1) + 1)) + (-1)}>
          <mpath href={"#motion-path" + props.id} />
        </animateMotion>
      </circle>
    </g>
  )
}

const Orbit = (props) => {
  return (
    <>
      <g transform={`rotate(${props.rotation} ${0.75*window.innerWidth} ${0.75*window.innerHeight})`}>
        <path  d={ellipseToPath(props)} fill="transparent" stroke={"black"} strokeWidth="0.4" />
      </g>
    </>
  )
}
const orbitRotation = () => {
  return parseInt(Math.random()*20-12)
  // return {parseInt(Math.random()* 20 - 12)};
}

const System = (props) => {
  const orbitData = props.planetsData
  const scrollRef = useRef("#orbit-window")


  return (
    <div id="orbit-window" ref={scrollRef}  style={{width: "100vw", height: "100vh", overflow: "hidden"}}>
      <div style={{position: "relative", display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", width: "100vw"}}>
        <svg width="100vw" height="100vh">
          {orbitData.map((data, index) => ( <Orbit key={index} id={index+1} color={data} rotation={randomIntegers[index]/2.5}/> ))}
          {orbitData.map((data, index) => ( <Planet key={index} id={index+1} color={data} rotation={randomIntegers[index]/2.5}/> ))}
        </svg>
        <div style={{position: 'absolute', width: 'clamp(30px, 20vw, 100px)', height: 'clamp(30px, 20vw, 100px)', backgroundColor: '#FF9FAF', borderRadius: '50%'}}></div>
      </div>
    </div>
  )
}

const Homepage = () => {
  const [planetsData, setPlanetsData] = useState(["#AEF1EF", "#E4EDC0", "#EDC0C0", "#E4C0ED"]);
  const colors = ["#AEF1EF", "#E4EDC0", "#EDC0C0", "#E4C0ED"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const handleDecrement = () => {
    setPlanetsData(planetsData.slice(0, planetsData.length-1))
  }
  const handleIncrement = () => {
    setPlanetsData([...planetsData, randomColor])
  }
  return (
    <div>
      <System planetsData={planetsData}/>
      <div
        style={{
          position: 'fixed',
          bottom: '0px',
          height: '2em',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          textAlign: 'center',
          fontSize: '1.2em',
          backgroundColor: 'white',
          boxShadow: 'rgb(255 255 255) 0px -20px 20px 18px',
        }}
      >
    <div>
      <button onClick={handleDecrement}>-</button>
      <button onClick={handleIncrement}>+</button>
    </div>

    </div>
    </div>

  );
};


export default Homepage;
