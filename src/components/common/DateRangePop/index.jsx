import * as React from 'react';
import {DateRangePicker} from "@blueprintjs/datetime";
import {Popover, PopoverInteractionKind, Position} from "@blueprintjs/core";

var moment = require('moment');

const dateFormat = 'YYYY-MM-DD';

DateRangePop.propTypes = {
  start: React.PropTypes.instanceOf(Date),
  end: React.PropTypes.instanceOf(Date),
  handleChange: React.PropTypes.func,
  dateFormat: React.PropTypes.string,
};

DateRangePop.defaultProps = {
  dateFormat: 'YYYY-MM-DD'
};

class DateRangePop extends React.Component {

  render() {
    let popoverContent = (
        <DateRangePicker
            value={[this.props.start, this.props.end]}
            onChange={this.props.handleChange}
            shortcuts={false}
        />);

    return (
        <Popover content={popoverContent}
                 interactionKind={PopoverInteractionKind.CLICK}
                 popoverClassName=""
                 position={Position.BOTTOM_LEFT}
                 useSmartPositioning={false}>
          <button type="button" className="pt-button">
            {moment(this.props.start).format(this.props.dateFormat)} ~ {moment(this.props.end).format(dateFormat)}
            <span className="pt-icon-standard pt-icon-caret-down pt-align-right"></span>
          </button>
        </Popover>
    );
  }
}



export default DateRangePop