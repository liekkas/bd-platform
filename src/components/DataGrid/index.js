/**
 * Created by liekkas on 16/3/7.
 */
import React, { PropTypes } from 'react'
import Panel from '../Panel'
import style from './style.scss'
import { Table, Pagination } from 'antd';

class DataGrid extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      foo: 'bar',
    }
  }

  render() {
    const { columns, datas } = this.props
    const pagination = {
      total: datas.length,
      size: "",
      current: 1,
//      pageSize: 8,
      showSizeChanger: true,
      showQuickJumper: true,
      onShowSizeChange(current, pageSize) {
        console.log('Current: ', current, '; PageSize: ', pageSize);
      },
      onChange(current) {
        console.log('Current: ', current);
      }
    }
    return (
      <div>
        <Panel title="用户概况 - 列表" height="460">
          <Table dataSource={datas}
                 rowKey={item => item.date} useFixedHeader
                 columns={columns} size="middle"
                 className={style.table} pagination={false}/>
        </Panel>
        <div className={style.pagination}>
          <Pagination showSizeChanger showQuickJumper
                      onShowSizeChange={(a,b) => this.onShowSizeChange(a,b)}
                      defaultCurrent={1} total={datas.length} />
        </div>
      </div>
    )
  }
}

DataGrid.propTypes = {
  columns: PropTypes.array.isRequired,
  datas: PropTypes.array.isRequired,
}
DataGrid.defaultProps = {
  columns: [],
  datas: [],
}

export default DataGrid
