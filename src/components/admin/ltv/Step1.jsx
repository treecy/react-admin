import * as React from 'react';
import {RadioGroup, Radio, Collapse, Checkbox} from '@blueprintjs/core';
import DateRangePop from 'components/common/DateRangePop';

const dateFormat = 'YYYY-MM-DD';

class Step1 extends React.Component {

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
                      handleChange={this.handleDateChange.bind(this, 'lastBuyDayStart', 'lastBuyDayEnd')}
                      dateFormat={dateFormat}/>
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
    return (
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
    );
  }
}

export default Step1