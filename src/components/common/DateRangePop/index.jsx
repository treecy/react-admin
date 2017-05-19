import * as React from 'react';
import {DateRangePicker} from "@blueprintjs/datetime";
import {Popover, PopoverInteractionKind, Position} from "@blueprintjs/core";

import "./index.scss";

var moment = require('moment');

export default class DateRangePop extends React.Component {

  static propTypes = {
    start: React.PropTypes.instanceOf(Date).isRequired,
    end: React.PropTypes.instanceOf(Date).isRequired,
    handleChange: React.PropTypes.func,
    dateFormat: React.PropTypes.string,
    pos: React.PropTypes.number
  }

  static defaultProps= {
    dateFormat: 'YYYY-MM-DD',
    pos: Position.BOTTOM_LEFT
  }

  constructor(props) {
    super(props);
    this._dateFormat = this.props.dateFormat;
    this.ranges = [{
      'type': '今日',
      'range': [new Date(), new Date()]
    },{
      'type': '昨日',
      'range': [
        moment().subtract(1, 'days').toDate(), 
        moment().subtract(1, 'days').toDate()
      ]
    },{
      'type': '前週',
      'range': [
        moment().subtract(1, 'weeks').startOf('isoWeek').toDate(), 
        moment().subtract(1, 'weeks').endOf('isoWeek').toDate()
      ]
    },{
      'type': '今月',
      'range': [
        moment().startOf('month').toDate(),
        moment().toDate()
      ]
    },{
      'type': '先月',
      'range': [
        moment().subtract(1, 'month').startOf('month').toDate(),
        moment().subtract(1, 'month').endOf('month').toDate()
      ]
    }]
  }

  handleRangeChange = (index) => {
    let range = this.ranges[index].range;
    this.props.handleChange(range);
  }

  render() {
    let popoverContent = (
      <div className="date-range-wrapper">
        <ul className="range-shortcuts pt-popover-dismiss">
          {this.ranges.map((item,i) =>
              <li key={i}>
                <a onClick={()=>this.handleRangeChange(i)} className="pt-button pt-minimal pt-intent-primary">{item.type}</a>
              </li>
          )}
        </ul>
        <DateRangePicker
            value={[this.props.start, this.props.end]}
            onChange={this.props.handleChange}
            shortcuts={false}
        />
      </div>);

    return (
        <Popover content={popoverContent}
                 interactionKind={PopoverInteractionKind.CLICK}
                 popoverClassName=""
                 position={this.props.pos}
                 useSmartPositioning={false}>
          <button type="button" className="pt-button">
            {moment(this.props.start).format(this._dateFormat)} ~ {moment(this.props.end).format(this._dateFormat)}
            <span className="pt-icon-standard pt-icon-caret-down pt-align-right"></span>
          </button>
        </Popover>
    );
  }
}

let Pos = {...Position}
export {Pos as Position}