import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';

import HistoryItem from './historyitem';
import Icon from './icon';
import { setDisplayHeight } from '../utility/resize_functions';
import { updateCode } from '../actions/index';

class HistoryScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    const { history } = this.props;
    const node = findDOMNode(this);
    node.scrollLeft = history.length * 175;
  }

  componentDidUpdate() {
    const { history } = this.props;
    const node = document.getElementById('item-list-container');
    node.scrollLeft = history.length * 175;
  }

  render() {
    const { height, history, updateCode } = this.props;
    setDisplayHeight('#historyscreen', height - 35);
    const children = history.map((item, index) => (
      <HistoryItem item={item} key={index} height={height} click={() => updateCode(item)} />
    ));

    return (
      <div id="historyscreen">
        <Icon name="arrow" content="<" click={() => console.log('test icon!')} />
        <div id="item-list-container" style={{ height: `${height - 35}px` }}>
          {children}
        </div>
        <Icon name="arrow" content=">" click={() => console.log('test icon!')} />
      </div>
    );
  }
}

function mapStateToProps({ history }) {
  return { history };
}

export default connect(mapStateToProps, { updateCode })(HistoryScreen);
