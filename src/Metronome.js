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
  
    handleBpmChange = ({ target }) => {
      const bpm = target.value;
      if (this.state.playing) {
          // Stop the old timer and start a new one
          clearInterval(this.timer);
          this.timer = setInterval(this.playClick, (60000 / bpm));
          // Set the new BPM
          this.setState({ bpm });
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
        this.timer = setInterval(this.playClick, (100 / this.state.bpm) * 1000);
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