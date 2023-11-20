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
  const [volumeLevels, setVolumeLevels] = useState({}); // State for volume levels
  const audioRefs = useRef({});
  const pageRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isVolumeSliderActive, setIsVolumeSliderActive] = useState(false);

  const togglePageScrolling = (enableScrolling) => {
    const body = document.getElementsByTagName('body')[0];
    body.style.overflow = enableScrolling ? 'auto' : 'hidden';
  };

  const handleVolumeSliderInteraction = (event) => {
    if (event.type === 'mousedown') {
      setIsVolumeSliderActive(true);
      togglePageScrolling(false);
    } else if (event.type === 'mouseup') {
      setIsVolumeSliderActive(false);
      togglePageScrolling(true);
    }
  };

  const scrollToPage = (pageId, pageIndex) => {
    setCurrentPage(pageIndex); // Set the current page index
    const page = document.getElementById(pageId);
    if (pageRef.current && page) {
      pageRef.current.scrollTo({
        left: page.offsetLeft,
        behavior: 'auto', // Change behavior to 'auto'
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
      audioRefs.current[sound].volume = volumeLevels[sound] || 1.0; // Set initial volume
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

  const handleVolumeChange = (event, sound) => {
    const volume = parseFloat(event.target.value);
    setVolumeLevels((prevLevels) => ({
      ...prevLevels,
      [sound]: volume,
    }));

    if (audioRefs.current[sound]) {
      audioRefs.current[sound].volume = volume;
    }
  };

  return (
    <div className="App">
      <div className="page-container" ref={pageRef}>
        <div className="page home" style={{ transform: `translateX(-${currentPage * 100}vw)` }} id="home">
          <h1>Home</h1>
          <div className="sound-tiles">
          <div className="sound-tile">
          <div className={`tile ${activeSounds.includes('Fan') ? 'active' : ''}`} onClick={() => playOrStopSound('Fan')}>Fan</div>
              <input
                type="range"
                className="volume-slider"
                min="0"
                max="1"
                step="0.1"
                value={volumeLevels['Fan'] || 1.0}
                onChange={(event) => handleVolumeChange(event, 'Fan')}
                onMouseDown={handleVolumeSliderInteraction}
                onMouseUp={handleVolumeSliderInteraction}
              />
            </div>
            <div className="sound-tile">
            <div className={`tile ${activeSounds.includes('Cat') ? 'active' : ''}`} onClick={() => playOrStopSound('Cat')}>Cat</div>
              
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volumeLevels['Cat'] || 1.0}
                onChange={(event) => handleVolumeChange(event, 'Cat')}
                onMouseDown={handleVolumeSliderInteraction}
                onMouseUp={handleVolumeSliderInteraction}
              />
            </div>
            <div className="sound-tile">
            <div className={`tile ${activeSounds.includes('Clock') ? 'active' : ''}`} onClick={() => playOrStopSound('Clock')}>Clock</div>
              
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volumeLevels['Clock'] || 1.0}
                onChange={(event) => handleVolumeChange(event, 'Clock')}
                onMouseDown={handleVolumeSliderInteraction}
                onMouseUp={handleVolumeSliderInteraction}
              />
            </div>
            <div className="sound-tile">
            <div className={`tile ${activeSounds.includes('Television') ? 'active' : ''}`} onClick={() => playOrStopSound('Television')}>Television</div>
              
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volumeLevels['Television'] || 1.0}
                onChange={(event) => handleVolumeChange(event, 'Television')}
                onMouseDown={handleVolumeSliderInteraction}
                onMouseUp={handleVolumeSliderInteraction}
              />
            </div>
            <div className="sound-tile">
              <div className={`tile ${activeSounds.includes('AC') ? 'active' : ''}`} onClick={() => playOrStopSound('AC')}>AC</div>
              <input
                type="range"
                className="volume-slider"
                min="0"
                max="1"
                step="0.1"
                value={volumeLevels['AC'] || 1.0}
                onChange={(event) => handleVolumeChange(event, 'AC')}
                onMouseDown={handleVolumeSliderInteraction}
                onMouseUp={handleVolumeSliderInteraction}
              />
            </div>
          </div>
        </div>

        <div className="page forest" style={{ transform: `translateX(-${currentPage * 100}vw)` }} id="forest">
           <h1>Forest</h1>
          <div className="sound-tiles">
          <div className="sound-tile">
              <div className={`tile ${activeSounds.includes('Rain') ? 'active' : ''}`} onClick={() => playOrStopSound('Rain')}>Rain</div>
              <input
                type="range"
                className="volume-slider"
                min="0"
                max="1"
                step="0.1"
                value={volumeLevels['Rain'] || 1.0}
                onChange={(event) => handleVolumeChange(event, 'Rain')}
                onMouseDown={handleVolumeSliderInteraction}
                onMouseUp={handleVolumeSliderInteraction}
              />
            </div>
            <div className="sound-tile">
              <div className={`tile ${activeSounds.includes('Thunder') ? 'active' : ''}`} onClick={() => playOrStopSound('Thunder')}>Thunder</div>
              <input
                type="range"
                className="volume-slider"
                min="0"
                max="1"
                step="0.1"
                value={volumeLevels['Thunder'] || 1.0}
                onChange={(event) => handleVolumeChange(event, 'Thunder')}
                onMouseDown={handleVolumeSliderInteraction}
                onMouseUp={handleVolumeSliderInteraction}
              />
            </div>
            <div className="sound-tile">
              <div className={`tile ${activeSounds.includes('Birds') ? 'active' : ''}`} onClick={() => playOrStopSound('Birds')}>Birds</div>
              <input
                type="range"
                className="volume-slider"
                min="0"
                max="1"
                step="0.1"
                value={volumeLevels['Birds'] || 1.0}
                onChange={(event) => handleVolumeChange(event, 'Birds')}
                onMouseDown={handleVolumeSliderInteraction}
                onMouseUp={handleVolumeSliderInteraction}
              />
            </div>
            <div className="sound-tile">
              <div className={`tile ${activeSounds.includes('River') ? 'active' : ''}`} onClick={() => playOrStopSound('River')}>River</div>
              <input
                type="range"
                className="volume-slider"
                min="0"
                max="1"
                step="0.1"
                value={volumeLevels['River'] || 1.0}
                onChange={(event) => handleVolumeChange(event, 'River')}
                onMouseDown={handleVolumeSliderInteraction}
                onMouseUp={handleVolumeSliderInteraction}
                
              />
            </div>
            <div className="sound-tile">
              <div className={`tile ${activeSounds.includes('Wind') ? 'active' : ''}`} onClick={() => playOrStopSound('Wind')}>Wind</div>
              <input
                type="range"
                className="volume-slider"
                min="0"
                max="1"
                step="0.1"
                value={volumeLevels['Wind'] || 1.0}
                onChange={(event) => handleVolumeChange(event, 'Wind')}
                onMouseDown={handleVolumeSliderInteraction}
                onMouseUp={handleVolumeSliderInteraction}
              />
            </div>
          </div>
        </div>

        <div className="page beach" style={{ transform: `translateX(-${currentPage * 100}vw)` }} id="beach">
          
          <h1>Beach</h1>
          <div className="sound-tiles">
          <div className="sound-tile">
              <div className={`tile ${activeSounds.includes('Waves') ? 'active' : ''}`} onClick={() => playOrStopSound('Waves')}>Waves</div>
              <input
                type="range"
                className="volume-slider"
                min="0"
                max="1"
                step="0.1"
                value={volumeLevels['Waves'] || 1.0}
                onChange={(event) => handleVolumeChange(event, 'Waves')}
                onMouseDown={handleVolumeSliderInteraction}
                onMouseUp={handleVolumeSliderInteraction}
              />
            </div>  
            <div className="sound-tile">
              <div className={`tile ${activeSounds.includes('SeagullsC') ? 'active' : ''}`} onClick={() => playOrStopSound('Seagulls')}>Seagulls</div>
              <input
                type="range"
                className="volume-slider"
                min="0"
                max="1"
                step="0.1"
                value={volumeLevels['Seagulls'] || 1.0}
                onChange={(event) => handleVolumeChange(event, 'Seagulls')}
                onMouseDown={handleVolumeSliderInteraction}
                onMouseUp={handleVolumeSliderInteraction}
              />
            </div>
            <div className="sound-tile">
              <div className={`tile ${activeSounds.includes('Boat') ? 'active' : ''}`} onClick={() => playOrStopSound('Boat')}>Boat</div>
              <input
                type="range"
                className="volume-slider"
                min="0"
                max="1"
                step="0.1"
                value={volumeLevels['Boat'] || 1.0}
                onChange={(event) => handleVolumeChange(event, 'Boat')}
                onMouseDown={handleVolumeSliderInteraction}
                onMouseUp={handleVolumeSliderInteraction}
              />
            </div>
            <div className="sound-tile">
              <div className={`tile ${activeSounds.includes('Campfire') ? 'active' : ''}`} onClick={() => playOrStopSound('Campfire')}>Campfire</div>
              <input
                type="range"
                className="volume-slider"
                min="0"
                max="1"
                step="0.1"
                value={volumeLevels['Campfire'] || 1.0}
                onChange={(event) => handleVolumeChange(event, 'Campfire')}
                onMouseDown={handleVolumeSliderInteraction}
                onMouseUp={handleVolumeSliderInteraction}
              />
            </div>
            <div className="sound-tile">
              <div className={`tile ${activeSounds.includes('Melody') ? 'active' : ''}`} onClick={() => playOrStopSound('Melody')}>Melody</div>
              <input
                type="range"
                className="volume-slider"
                min="0"
                max="1"
                step="0.1"
                value={volumeLevels['Melody'] || 1.0}
                onChange={(event) => handleVolumeChange(event, 'Melody')}
                onMouseDown={handleVolumeSliderInteraction}
                onMouseUp={handleVolumeSliderInteraction}
              />
            </div>
          </div>
        </div>

        <div className="page urban" style={{ transform: `translateX(-${currentPage * 100}vw)` }} id="urban">
          
          <h1>Urban</h1>
          <div className="sound-tiles">
          <div className="sound-tile">
              <div className={`tile ${activeSounds.includes('People') ? 'active' : ''}`} onClick={() => playOrStopSound('People')}>People</div>
              <input
                type="range"
                className="volume-slider"
                min="0"
                max="1"
                step="0.1"
                value={volumeLevels['People'] || 1.0}
                onChange={(event) => handleVolumeChange(event, 'People')}
                onMouseDown={handleVolumeSliderInteraction}
                onMouseUp={handleVolumeSliderInteraction}
              />
            </div>
            <div className="sound-tile">
              <div className={`tile ${activeSounds.includes('Traffic') ? 'active' : ''}`} onClick={() => playOrStopSound('Traffic')}>Traffic</div>
              <input
                type="range"
                className="volume-slider"
                min="0"
                max="1"
                step="0.1"
                value={volumeLevels['Traffic'] || 1.0}
                onChange={(event) => handleVolumeChange(event, 'Traffic')}
                onMouseDown={handleVolumeSliderInteraction}
                onMouseUp={handleVolumeSliderInteraction}
              />
            </div>
            <div className="sound-tile">
              <div className={`tile ${activeSounds.includes('Pigeons') ? 'active' : ''}`} onClick={() => playOrStopSound('Pigeons')}>Pigeons</div>
              <input
                type="range"
                className="volume-slider"
                min="0"
                max="1"
                step="0.1"
                value={volumeLevels['Pigeons'] || 1.0}
                onChange={(event) => handleVolumeChange(event, 'Pigeons')}
                onMouseDown={handleVolumeSliderInteraction}
                onMouseUp={handleVolumeSliderInteraction}
              />
            </div>
            <div className="sound-tile">
              <div className={`tile ${activeSounds.includes('Truck') ? 'active' : ''}`} onClick={() => playOrStopSound('Truck')}>Truck</div>
              <input
                type="range"
                className="volume-slider"
                min="0"
                max="1"
                step="0.1"
                value={volumeLevels['Truck'] || 1.0}
                onChange={(event) => handleVolumeChange(event, 'Truck')}
                onMouseDown={handleVolumeSliderInteraction}
                onMouseUp={handleVolumeSliderInteraction}
              />
            </div>
            <div className="sound-tile">
              <div className={`tile ${activeSounds.includes('Train') ? 'active' : ''}`} onClick={() => playOrStopSound('Train')}>Train</div>
              <input
                type="range"
                className="volume-slider"
                min="0"
                max="1"
                step="0.1"
                value={volumeLevels['Train'] || 1.0}
                onChange={(event) => handleVolumeChange(event, 'Train')}
                onMouseDown={handleVolumeSliderInteraction}
                onMouseUp={handleVolumeSliderInteraction}
              />
            </div>
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