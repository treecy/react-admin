import * as React from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'

class Report extends React.Component {

  render() {
    var list = this.props.list;
    const columns = [{
      header: 'プロモーション',
      columns: [{
          header: 'ID',
          accessor: 'promotion_id'
        },{
          header: '名',
          accessor: 'promotion_name'
        }]
    },{
      header: 'クリック率（最終的にコンバージョン有り）',
      columns: [{
        header: 'PV',
        accessor: 'pv_conversion'
      },{
        header: 'クリック',
        accessor: 'click_conversion'
      },{
        header: '%',
        accessor: 'click_conversion_percent'
      }]
    },{
      header: 'クリック率（最終的にコンバージョン無し）',
      columns: [{
        header: 'PV',
        accessor: 'pv_not_conversion'
      },{
        header: 'クリック',
        accessor: 'click_not_conversion'
      },{
        header: '%',
        accessor: 'click_not_conversion_percent'
      }]
    }];
    return (
        <div className="report-wrapper">
          <ReactTable data={list} columns={columns} defaultPageSize={20}/>
        </div>
    );
  }
}

export default Report