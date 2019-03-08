import React from 'react';
import {TimelineMax, TweenLite, TweenMax} from "gsap/TweenMax";
import {Elastic, Back, Power1, Bounce} from "gsap/all";
import $ from "jquery";

import './workouts/workouts.css';

class App extends React.Component{
  state = {signLoaded: "", workoutClass: '', bubble1: false, bubble2: false, bubble3: false, bubble4: false}

  componentDidMount(){
    var tl = new TimelineMax();
    var bgd = $('#background rect');
    var bench = $('#bench');
    var chin = $('#chin');
    var squat = $('#squat');
    var ball = $('#ball');
    var gym = $('#gym');
    var sign =$('#sign');

    tl.from(bgd, 0.1, {opacity:0, scale:0, transformOrigin: 'center center'})
        .staggerFrom(gym, 1, {opacity: 0, scale: 0, transformOrigin: 'center center', ease: Back.easeOut}, 0.2)
        .staggerFrom(bench, .5, {opacity: 0, scale: 0, transformOrigin: 'center center', ease: Bounce.easeOut}, 0.2)
        .staggerFrom(squat, .5, {opacity: 0, scale: 0, transformOrigin: 'center center', ease: Elastic.easeOut}, 0.2)
        .staggerFrom(ball, .5, {opacity: 0, scale: 0, transformOrigin: 'center center', ease: Power1.easeOut}, 0.2)
        .staggerFrom(chin, .5, {opacity: 0, scale: 0, transformOrigin: 'center center', ease: Back.easeOut}, 0.2)
        .staggerFrom(sign, .5, {opacity: 0, scale: 0, transformOrigin: 'center center', ease: Back.easeOut}, 0.2);

  }

  getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  }

  componentWillMount = () => {
    setTimeout(() => { this.setState({signLoaded: 'shadowfilter'}) }, 3000);
  }

  renderInsults = () => {
    let number = 0
    const insults = [
      'How about leg day?',
      'Is today a light day?',
      "Nice bulk phase.",
      'Let me lift narc!',
      'I can lift more than you.',
      "I'm strongly juding you.",
      "Your mom says hi.",
      "How's the all carb diet?",
      'You smell like failure.',
      'I can go all day!',
      'I row more than you squat',
    ]
    number = this.getRandomInt(insults.length)
    return insults[number]
  }

  renderBubble1 = () => {
    if(this.state.bubble1){
      return(
        <React.Fragment>
          <foreignObject x="110" y="320" class="bubble"></foreignObject>
          <foreignObject x="135" y="365" width="100" height="40" class="center">
            <p class="insults">{this.renderInsults()}</p>
          </foreignObject>
        </React.Fragment>
      );
    }
  }

  renderBubble2 = () => {
    if(this.state.bubble2){
      return(
        <React.Fragment>
          <foreignObject x="870" y="260" class="bubble"></foreignObject>
          <foreignObject x="895" y="305" width="100" height="40" class="center">
            <p class="insults">{this.renderInsults()}</p>
          </foreignObject>
        </React.Fragment>
      );
    }
  }

  renderBubble3 = () => {
    if(this.state.bubble3){
      return(
        <React.Fragment>
          <foreignObject x="490" y="360" class="bubble"></foreignObject>
          <foreignObject x="515" y="405" width="100" height="40" class="center">
            <p class="insults">{this.renderInsults()}</p>
          </foreignObject>
        </React.Fragment>
      );
    }
  }

  renderBubble4 = () => {
    if(this.state.bubble4){
      return(
        <React.Fragment>
          <foreignObject x="690" y="440" class="bubbleRev"></foreignObject>
          <foreignObject x="715" y="485" width="100" height="40" class="center">
            <p class="insults">{this.renderInsults()}</p>
          </foreignObject>
        </React.Fragment>
      );
    }
  }

  onHover = (id) => {
    if(id === 'bench'){
      this.setState({bubble1: true})
    } else if(id === 'chin'){
      this.setState({bubble2: true})
    } else if(id === 'squat'){
      this.setState({bubble3: true})
    } else {
      this.setState({bubble4: true})
    }

    var tl = new TimelineMax()
    .to(`#${id}`, .5, { scaleX:1.1, scaleY:1.1});
    this.setState({workoutClass: `${id}hovered`})
  }
  onLeave = (id) => {
    if(id === 'bench'){
      this.setState({bubble1: false})
    } else if(id === 'chin'){
      this.setState({bubble2: false})
    } else if(id === 'squat'){
      this.setState({bubble3: false})
    } else {
      this.setState({bubble4: false})
    }

    var tl = new TimelineMax()
    .to(`#${id}`, .5, { scaleX:1, scaleY:1})
    this.setState({workoutClass: ''})
  }

  render(){
    return(
      <div>
        <svg id="gym" className="body" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"  width="100vw"  viewBox="0 0 1200 900"  xmlSpace="preserve">
          {this.renderBubble1()}
          {this.renderBubble2()}
          {this.renderBubble3()}
          {this.renderBubble4()}
          <g id="bench" onMouseEnter={() => this.onHover('bench')} onMouseLeave={() => this.onLeave('bench')}><foreignObject  x="0" y="400" className={`bench ${this.state.workoutClass}`} ></foreignObject></g>
          <g id="ball" onMouseEnter={() => this.onHover('ball')} onMouseLeave={() => this.onLeave('ball')}><foreignObject  x="800" y="525" className={`ball ${this.state.workoutClass}`} ></foreignObject></g>
          <g id="chin" onMouseEnter={() => this.onHover('chin')} onMouseLeave={() => this.onLeave('chin')}><foreignObject x="795" y="385" className={`chin ${this.state.workoutClass}`} ></foreignObject></g>
          <g id="squat" onMouseEnter={() => this.onHover('squat')} onMouseLeave={() => this.onLeave('squat')}><foreignObject x="400" y="450" className={`squat ${this.state.workoutClass}`} ></foreignObject></g>
          <g id="sign"><foreignObject x="475" class={`sign ${this.state.signLoaded}`}></foreignObject></g>
        </svg>
      </div>
    );
  }
}

export default App;
