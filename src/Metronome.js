import React, { Component } from 'react';
import './Metronome.css';
import click1 from "./Sounds/click1.wav";

class Metronome extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        playing: false,
        count: 0,
        bpm: 100,
        beatsPerMeasure: 3
        
      };
      this.click1 = new Audio(click1);
    }
  
    handleBpmChange = event => {
      const bpm = event.target.value;
       if(this.state.playing) {
        clearInterval(this.timer);
        this.timer = setInterval(this.playClick, (100 / bpm) * 1000);
        // Set the new BPM, and reset the beat counter
        this.setState({
          count: 0,
          bpm
        });
      } else {
        // Otherwise just update the BPM
        this.setState({ bpm });
      }
    }
       playClick = () => {
      const { count, beatsPerMeasure } = this.state;
      if(count % beatsPerMeasure === 0) {
        this.click1.play();
      }
      this.setState(state => ({
        count: (state.count + 1) % state.beatsPerMeasure
      }));
    }
    startStop = () => {
      if(this.state.playing) {
        clearInterval(this.timer);
        this.setState({
          playing: false
        });
      } else {
        // Start a timer with the current BPM
        this.timer = setInterval(this.playClick, (60 / this.state.bpm) * 1000);
        this.setState({
          count: 0,
          playing: true
        }, this.playClick);
      }
    }
    
      render() {
        const { playing, bpm } = this.state;
    
        return (
          <div className="metronome">
            <div className="bpm-slider">
              <div>{bpm} BPM</div>
              <input
                type="range"
                min="40"
                max="200"
                value={bpm}
                onChange={this.handleBpmChange} />
            </div>
            <button onClick={this.startStop}>
        {playing ? 'Stop' : 'Start'}
      </button>
          </div>
        );
      }
    }

export default Metronome;