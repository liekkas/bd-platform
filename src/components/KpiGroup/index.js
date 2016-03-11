/**
 * Created by liekkas on 16/3/7.
 */
import React, { PropTypes } from 'react'
import style from './style.scss'
import Radio from 'antd/lib/radio'
const RadioGroup = Radio.Group
const RadioButton = Radio.Button

class KpiGroup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      foo: 'bar',
    }
  }

  render() {
    const { kpis, onKpiChange } = this.props
    return (
      <div className={style.root}>
        <RadioGroup onChange={(e) => onKpiChange(e)} theme="dark"
                    defaultValue={kpis[0].value}>
          {
            kpis.map(({value, label}, index) =>
              <RadioButton key={index} value={value}>{label}</RadioButton>)
          }
        </RadioGroup>
      </div>
    )
  }
}

KpiGroup.propTypes = {
  kpis: PropTypes.array.isRequired,
  onKpiChange: PropTypes.func.isRequired,
}
KpiGroup.defaultProps = {
  kpis: [],
}

export default KpiGroup
