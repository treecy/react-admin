import * as React from 'react';
var moment = require('moment');

import Step1 from './Step1';


class LtvView extends React.Component {
  constructor(props) {
    super(props);
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
  handleChange = (name, event) => {
    let newValue = event.target.value;
    this.setState(prevState => {
      let newState = {...prevState.search, [name]: newValue};
      return {
        search: newState
      }
    });
  }

  handleDateChange = (start,end,newDates) => {
    this.setState(prevState => {
      let newState = {...prevState.search, [start]: newDates[0], [end]: newDates[1]};
      return {
        search: newState
      }
    });
  }

  handleSubmit = () => {
    console.log(this.state.search);
  }

  render() {
    let {search, handleDateChange,handleChange} = {...this.state, ...this};
    let subCompProps = { search, handleDateChange, handleChange};
    return (
        <div className="content">
          <h2 className="page-title">LTV分析レポート</h2>
          <div className="form-area">
            <Step1 {...subCompProps}/>
          </div>
          <button type="button" className="pt-button" onClick={this.handleSubmit}>提交</button>
        </div>

    );
  }
}

export default LtvView