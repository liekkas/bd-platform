/**
 * Created by liekkas on 16/3/10.
 */
import React, { PropTypes } from 'react'
import style from './style.scss'

class SVGComp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      foo: 'bar',
    }
  }

  render() {
    const { stroke, fill, r, data } = this.props
    const leftRatio = data.left / (data.left + data.right)
    const rightRatio = data.right / (data.left + data.right)
    console.log('>>> SVGComp:',data,leftRatio,rightRatio)
    return (
      <div className={style.root}>
        <svg width="100%" height="100%">
          <circle cx="30%" cy="150" r={leftRatio * 100} strokeOpacity="0.5"
                  stroke={stroke} fillOpacity="0.3"
                  strokeWidth="1" fill={fill} />
        </svg>
        <label>uivj</label>

        <svg width="100%" height="100%">
          <circle cx="60%" cy="150" r={rightRatio * 100} strokeOpacity="0.5"
                  stroke={stroke} fillOpacity="0.3"
                  strokeWidth="1" fill={fill} />
        </svg>
      </div>
    )
  }
}

SVGComp.propTypes = {
  stroke: PropTypes.string.isRequired,
  fill: PropTypes.string.isRequired,
  r: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
}
SVGComp.defaultProps = {
  stroke: 'black',
  fill: 'blue',
  r: 50,
  data: {}
}

export default SVGComp
