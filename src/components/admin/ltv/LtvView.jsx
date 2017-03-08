import * as React from 'react';
var moment = require('moment');

import Step1 from './Step1';


class LtvView extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange.bind(this);
    this.handleDateChange.bind(this);
    this.state = {
      search: {
        customer_rank: "0",
        BuyDayStart: moment().subtract(6, 'days').toDate(),
        BuyDayEnd: moment().toDate(),
        lastBuyDayStart: moment().subtract(6, 'days').toDate(),
        lastBuyDayEnd: moment().toDate(),
      }
    }
  }

  //可通用的 普通表单 change 的回调
  handleChange(name, event) {
    let newValue = event.target.value;
    this.setState(prevState => {
      let newState = {...prevState.search, [name]: newValue};
      return {
        search: newState
      }
    });
  }

  handleDateChange(start,end,newDates){
    this.setState(prevState => {
      let newState = {...prevState.search, [start]: newDates[0], [end]: newDates[1]};
      return {
        search: newState
      }
    });
  }



  render() {

    const search = this.state.search;
    return (
        <div className="content">
          <h2 className="page-title">LTV分析レポート</h2>
          <div className="form-area">
            <Step1 search={search} handleDateChange={this.handleDateChange.bind(this)} handleChange={this.handleChange.bind(this)}/>
          </div>

        </div>

    );
  }
}

export default LtvView