/**
 * Created by liekkas on 16/2/23.
 */
import React, { PropTypes } from 'react'
import { Panel, ECharts } from '../../../components'
import style from './style.scss'
import Table from 'antd/lib/table'
import DatePicker from 'antd/lib/date-picker'
import Select from 'antd/lib/select'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'
const Option = Select.Option

class ShowsOrderAnalysis extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      foo: 'bar',
    }
  }

  handleChange(value) {
    console.log(`selected ${value}`);
  }

  render() {
    return (
      <div className={style.root}>
        {this.props.children}
      </div>
    )
  }
}

ShowsOrderAnalysis.propTypes = {
  foo: PropTypes.string.isRequired,
}
ShowsOrderAnalysis.defaultProps = {
  foo: 'bar',
}

export default ShowsOrderAnalysis
