/**
 * Created by liekkas on 16/3/7.
 */
import React, { PropTypes } from 'react'
import Panel from '../Panel'
import style from './style.scss'
import { Table, Pagination } from 'antd'
import _ from 'lodash'
import shallowEqual from 'react-pure-render/shallowEqual'

class DataGrid extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pageSize: props.pageSize,
      current: 1,
    }
  }

  //pageSize改变,重新回到第一页
  onShowSizeChange(current, pageSize) {
//    console.log('Current: ', current, '; PageSize: ', pageSize);
    this.setState({ pageSize, current: 1 })
  }

  onChange(current) {
    this.setState({ current })
  }

  componentWillReceiveProps(nextProps) {
//    console.log('>>> DataGrid:componentWillReceiveProps', nextProps)
    if (!shallowEqual(this.props,nextProps)) {
      this.setState({pageSize:10, current:1})
    }
  }

  showTotal(total) {
    return `共 ${total} 条`;
  }

  render() {
    const { columns, datas } = this.props
    const { pageSize, current } = this.state
    const start = (current - 1) * pageSize
    const end = Math.min(current * pageSize, datas.length)
    let renderData = []
    for (let i = start; i < end; i++) {
      renderData.push(datas[i])
    }

    return (
      <div>
        <Panel title={this.props.title + ' - 列表'} height="490">
          <Table dataSource={renderData}
                 useFixedHeader={true} rowKey={item => item.uid}
                 columns={columns} size="middle"
                 className={style.table} pagination={false}/>
        </Panel>
        <div className={style.pagination}>
          <Pagination showSizeChanger showQuickJumper showTotal={(a) => this.showTotal(a)}
                      current={current}
                      onChange={(v) => this.onChange(v)} pageSizeOptions={['10','20','30','40']}
                      onShowSizeChange={(a,b) => this.onShowSizeChange(a,b)} defaultPageSize={this.props.pageSize}
                      defaultCurrent={1} total={datas.length} />
        </div>
      </div>
    )
  }
}

DataGrid.propTypes = {
  columns: PropTypes.array.isRequired,
  datas: PropTypes.array.isRequired,
  pageSize: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
}
DataGrid.defaultProps = {
  columns: [],
  datas: [],
  pageSize: 10
}

export default DataGrid
//  ['7','10','24','30']
// rowKey={item => item.date}
