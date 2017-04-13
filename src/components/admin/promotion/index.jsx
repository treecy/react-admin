import * as React from 'react';
import DateRangePop, {Position as pos} from 'components/common/DateRangePop';
import {Popover, PopoverInteractionKind, Position} from "@blueprintjs/core";
import Report  from './report';
import "./index.scss";


let moment = require('moment');

class PromotionIndex extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      report_list: [],
      search: {
        create_timestamp_start: moment().subtract(6, 'days').toDate(),
        create_timestamp_end: moment().toDate(),
        target_type: 0,
        event_type: 0
      }
    }
  }

  componentWillMount() {
    var me = this;
    fetch('/test/report.json')
        .then(response=>response.json())
        .then(json=>{
          me.setState({report_list: json.list});
        })
        .catch(error=>error);
  }

  handleDateChange = (start,end,newDates) => {
    this.setState(prevState => {
      let newState = {...prevState.search, [start]: newDates[0], [end]: newDates[1]};
      return {
        search: newState
      }
    });
  }

  renderFilterBoard() {
    let popContent = (
        <div>
          <inpu></inpu>
        </div>
    );

    return (
        <Popover
          content={popContent}
          interactionKind={PopoverInteractionKind.CLICK}
          position={Position.BOTTOM}
        >
          <button type="button" className="pt-button pt-minimal pt-icon-add pt-intent-primary">
            フィルター
          </button>
        </Popover>
    )
  }

  render() {
    let search = this.state.search;
    return (
        <div className="content promotion-page">
          <h2 className="page-title">
            プロモーション効果測定
            <div className="date-wrapper">
              <DateRangePop
                  start={search.create_timestamp_start}
                  end={search.create_timestamp_end}
                  handleChange={this.handleDateChange.bind(this, 'create_timestamp_start', 'create_timestamp_end')}
                  pos={pos.BOTTOM_RIGHT}/>
            </div>
          </h2>

          <div className="filter-wrapper">
            <ul className="selected-filters"></ul>
            {this.renderFilterBoard()}
          </div>

          <Report list={this.state.report_list}/>

        </div>
    );
  }
}

export default PromotionIndex