import heroImg from './assets/hero.png';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import { useMemo, useState } from 'react';
import { useStatistics } from './useStatistics';
import { Chart } from './Chart';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const statistics = useStatistics(50);

  const cpuUsages = useMemo(() => statistics.map((stats) => stats.cpuUsage), [statistics]);

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started!</h1>
          <p>Edit <code>src/App.tsx</code> and save to test <code>HMR</code></p>
        </div>
        <button type="button" className="counter"onClick={() => setCount((count) => count + 1)}>
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="statistics">
        <div style={{ height: 120 }}>
          <Chart data={cpuUsages} maxDataPoints={50} />
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App;
