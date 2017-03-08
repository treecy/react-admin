import * as React from 'react';
import {RadioGroup, Radio, Collapse, Checkbox} from '@blueprintjs/core';
import {Popover, PopoverInteractionKind, Position} from "@blueprintjs/core";
import {DateRangePicker} from "@blueprintjs/datetime";
var moment = require('moment');

const dateFormat = 'YYYY-MM-DD'

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
            {moment(this.props.start).format(dateFormat)} ~ {moment(this.props.end).format(dateFormat)}
            <span className="pt-icon-standard pt-icon-caret-down pt-align-right"></span>
          </button>
        </Popover>
    );
  }
}


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

  renderRankDetail() {
    const views = {
      cpm: ['現役', '休眠', '離脱'],
      cpmItem: ['初回購入', 'よちよち', 'こつこつ', '流行', '優良']
    };
    const search = this.state.search;
    return (
        <table>

          {search.customer_rank == 1 ?
              <tbody>
              {views.cpm.map((item, i)=>
                  <tr key={i}>
                    <td>{item}</td>
                    <td>{views.cpmItem.map((it, j)=> <Checkbox className="pt-inline" label={it} key={j} value={i*5+j}/>)}</td>
                  </tr>
              )}
              </tbody>
              :
              <tbody>
                <tr>
                  <td>最終購入日</td>
                  <td>
                    <DateRangePop
                        start={search.lastBuyDayStart}
                        end={search.lastBuyDayEnd}
                        handleChange={this.handleDateChange.bind(this, 'lastBuyDayStart', 'lastBuyDayEnd')} />
                  </td>
                </tr>
                <tr>
                  <td>購入回数</td>
                  <td></td>
                </tr>
                <tr>
                  <td>累計購買金額</td>
                  <td></td>
                </tr>
                <tr>
                  <td>経過期間</td>
                  <td></td>
                </tr>
              </tbody>
          }

        </table>
    )
  }

  render() {
    const views = {
      rank: ['全件', 'CPM', '個別'],

    };
    const search = this.state.search;
    return (
        <div className="content">
          <h2 className="page-title">LTV分析レポート</h2>
          <div className="form-area">
            <table>
              <tbody>
              <tr>
                <th className="name">顧客ランク</th>
                <td className="input-area">
                  <RadioGroup onChange={this.handleChange.bind(this,'customer_rank')} selectedValue={search.customer_rank}>

                    {views.rank.map((item, i) =>
                        <Radio className="pt-inline" label={item} value={`${i}`} key={i}/>)
                    }
                  </RadioGroup>
                  <Collapse isOpen={search.customer_rank > 0}>
                    {this.renderRankDetail()}
                  </Collapse>
                </td>
              </tr>

              <tr>
                <th className="name">初回購入日</th>
                <td className="input-area">
                  <DateRangePop
                      start={search.BuyDayStart}
                      end={search.BuyDayEnd}
                      handleChange={this.handleDateChange.bind(this, 'BuyDayStart', 'BuyDayEnd')} />
                </td>
              </tr>
              </tbody>


            </table>
          </div>

        </div>

    );
  }
}

export default LtvView