import React, { useRef, useState, useEffect } from 'react';
import './App.css';

function App() {
  const [soundPlaying, setSoundPlaying] = useState({
    Fan: false,
    Cat: false,
    Clock: false,
    Television: false,
    AC: false,
    Rain: false,
    Thunder: false,
    Birds: false,
    River: false,
    Wind: false,
    Waves: false,
    Seagulls: false,
    Boat: false,
    Campfire: false,
    Melody: false,
    People: false,
    Traffic: false,
    Pigeons: false,
    Truck: false,
    Train: false,
    // Add other sound states similarly for each sound
  });

  const [activeSounds, setActiveSounds] = useState([]);
  const audioRefs = useRef({});
  const pageRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);

  const scrollToPage = (pageId, pageIndex) => {
    setCurrentPage(pageIndex); // Set the current page index
    const page = document.getElementById(pageId);
    if (pageRef.current && page) {
      pageRef.current.scrollTo({
        left: page.offsetLeft,
        behavior: 'smooth',
      });
    }
  };

  const stopAllSounds = () => {
    Object.keys(audioRefs.current).forEach((sound) => {
      audioRefs.current[sound].pause();
      audioRefs.current[sound].currentTime = 0;
    });
  };

  const playOrStopSound = (sound) => {
    const audioPath = `${process.env.PUBLIC_URL}/sounds/${sound}.mp3`;

    if (soundPlaying[sound]) {
      audioRefs.current[sound].pause();
      audioRefs.current[sound].currentTime = 0;
      setSoundPlaying((prevState) => ({ ...prevState, [sound]: false }));
      setActiveSounds((prevSounds) => prevSounds.filter((activeSound) => activeSound !== sound));
    } else {
      audioRefs.current[sound] = new Audio(audioPath);
      audioRefs.current[sound].play().catch((error) => {
        console.error('Failed to play audio:', error);
      });
      setSoundPlaying((prevState) => ({ ...prevState, [sound]: true }));
      setActiveSounds((prevSounds) => [...prevSounds, sound]);
    }
  };

  useEffect(() => {
    return () => {
      stopAllSounds();
    };
  }, []);
  

  return (
    <div className="App">
      <div className="page-container" ref={pageRef}>
        <div className="page home" style={{ transform: `translateX(-${currentPage * 100}vw)` }} id="home">
          <h1>Home Page</h1>
          <div className="sound-tiles">
            <div className={`tile ${activeSounds.includes('Fan') ? 'active' : ''}`} onClick={() => playOrStopSound('Fan')}>Fan</div>
            <div className={`tile ${activeSounds.includes('Cat') ? 'active' : ''}`} onClick={() => playOrStopSound('Cat')}>Cat</div>
            <div className={`tile ${activeSounds.includes('Clock') ? 'active' : ''}`} onClick={() => playOrStopSound('Clock')}>Clock</div>  
            <div className={`tile ${activeSounds.includes('Television') ? 'active' : ''}`} onClick={() => playOrStopSound('Television')}>Television</div>  
            <div className={`tile ${activeSounds.includes('AC') ? 'active' : ''}`} onClick={() => playOrStopSound('AC')}>AC</div>
          </div>
        </div>

        <div className="page forest" style={{ transform: `translateX(-${currentPage * 100}vw)` }} id="forest">
           <h1>Forest Page</h1>
          <div className="sound-tiles">
            <div className={`tile ${activeSounds.includes('Rain') ? 'active' : ''}`} onClick={() => playOrStopSound('Rain')}>Rain</div>  
            <div className={`tile ${activeSounds.includes('Thunder') ? 'active' : ''}`} onClick={() => playOrStopSound('Thunder')}>Thunder</div>
            <div className={`tile ${activeSounds.includes('Birds') ? 'active' : ''}`} onClick={() => playOrStopSound('Birds')}>Birds</div>  
            <div className={`tile ${activeSounds.includes('River') ? 'active' : ''}`} onClick={() => playOrStopSound('River')}>River</div>
            <div className={`tile ${activeSounds.includes('Wind') ? 'active' : ''}`} onClick={() => playOrStopSound('Wind')}>Wind</div>
          </div>
        </div>

        <div className="page beach" style={{ transform: `translateX(-${currentPage * 100}vw)` }} id="beach">
          
          <h1>Beach Page</h1>
          <div className="sound-tiles">
            <div className={`tile ${activeSounds.includes('Waves') ? 'active' : ''}`} onClick={() => playOrStopSound('Waves')}>Waves</div>  
            <div className={`tile ${activeSounds.includes('Seagulls') ? 'active' : ''}`} onClick={() => playOrStopSound('Seagulls')}>Seagulls</div>
            <div className={`tile ${activeSounds.includes('Boat') ? 'active' : ''}`} onClick={() => playOrStopSound('Boat')}>Boat</div>
            <div className={`tile ${activeSounds.includes('Campfire') ? 'active' : ''}`} onClick={() => playOrStopSound('Campfire')}>Campfire</div>
            <div className={`tile ${activeSounds.includes('Melody') ? 'active' : ''}`} onClick={() => playOrStopSound('Melody')}>Melody</div>
          </div>
        </div>

        <div className="page urban" style={{ transform: `translateX(-${currentPage * 100}vw)` }} id="urban">
          
          <h1>Urban Page</h1>
          <div className="sound-tiles">
            <div className={`tile ${activeSounds.includes('People') ? 'active' : ''}`} onClick={() => playOrStopSound('People')}>People</div>
            <div className={`tile ${activeSounds.includes('Traffic') ? 'active' : ''}`} onClick={() => playOrStopSound('Traffic')}>Traffic</div>
            <div className={`tile ${activeSounds.includes('Pigeons') ? 'active' : ''}`} onClick={() => playOrStopSound('Pigeons')}>Pigeons</div>
            <div className={`tile ${activeSounds.includes('Truck') ? 'active' : ''}`} onClick={() => playOrStopSound('Truck')}>Truck</div>
            <div className={`tile ${activeSounds.includes('Train') ? 'active' : ''}`} onClick={() => playOrStopSound('Train')}>Train</div>
          </div>
        </div>
      </div>

      <div className="nav-links bottom">
      <button onClick={() => scrollToPage('home', 0)}>
          Home
        </button>
        <button onClick={() => scrollToPage('forest', 0)}>
          Forest
        </button>
        <button onClick={() => scrollToPage('beach', 0)}>
          Beach
        </button>
        <button onClick={() => scrollToPage('urban', 0)}>
          Urban
        </button>
      </div>
    </div>
  );
}

export default App;