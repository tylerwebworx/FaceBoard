import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { modeChange, toggleDiv } from '../actions/action';
import { configFirebase, fetchFirepad, deleteFirepad } from '../actions/firebaseConfig';
import { fetchWhiteboard } from '../actions/whiteboardConfig';

class MainSession extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    const { mode } = this.props;
    this.props.dispatch(fetchFirepad(this.props.mode));
    this.props.dispatch(fetchWhiteboard());
  }

  toggleEditor (e) {
    if (e.target.id === 'codeshareTab') {
      this.props.dispatch(toggleDiv(false));
    } else {
      this.props.dispatch(toggleDiv(true));
    }
  }

  changeMode (e) {
    // this is terrible and should not be done, but there's something fundamental missing in
    // this logic and this is the easiest workaround in the short term
    // god have mercy on my soul for mixing direct and virtual dom manipulations
    document.getElementById('firepad').innerHTML = '';
    this.props.dispatch(fetchFirepad(e.target.value));
  }

  render () {
    return (
      <div id="mainSession">
        <div className="tab-group">
          <div className={ this.props.hidden ? 'tab-item active' : 'tab-item' } id="codeshareTab" onClick={this.toggleEditor.bind(this)}>
            Codeshare
          </div>
          <div className={ !this.props.hidden ? 'tab-item active' : 'tab-item' } id="whiteboardTab" onClick={this.toggleEditor.bind(this)}>
            Whiteboard
          </div>
        </div>
        <div id="firepadContainer" className={!this.props.hidden ? 'hidden' : 'open'}>
          <select id="cmMode" className="form-control" onChange={this.changeMode.bind(this)}>
            <option value="javascript">javascript</option>
            <option value="jsx">jsx</option>
            <option value="css">css</option>
            <option value="htmlmixed">html - mixed</option>
            <option value="php">php</option>
            <option value="ruby">ruby</option>
            <option value="python">python</option>
            <option value="markdown">markdown</option>
            <option value="sass">sass</option>
            <option value="sql">sql</option>
          </select>
          <div id="firepad"></div>
        </div>
          <iframe id="whiteboard"
                  className={this.props.hidden ? 'hidden' : 'open'}
                  src="https://www.twiddla.com/api/start.aspx?sessionid=2796834&hide=chat,bottomtray,url,invite,profile,voice,welcome,etherpad,documents,images,email,math,roomsettings,logo&autostart=true"></iframe>
        </div>
    );
  }
}

const mapStateToProps = state => state.firepadReducer;
export default connect(mapStateToProps)(withRouter(MainSession));
