import * as React from 'react';
import LtvView from 'components/admin/LtvView';

/**
 * 对于这个容器组件，由于该页面只进行数据展示，不进行数据修改，所以暂时不需要使用store
 * 但要保持一个页面对应一个容器组件的结构
 * 将来需要联动 store 的时候再在这里添加
 */
class LtvComponent extends React.Component {

  render() {
    return (
        <LtvView />
    );
  }
}


export default LtvComponent