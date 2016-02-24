/**
 * Created by liekkas on 16/2/23.
 */
import React, { PropTypes } from 'react'

class Panel extends React.Component {
  render() {
    const { title, width, height } = this.props

    const rootStyle = {
      width,
      height,
      marginBottom: '10px',
      marginRight: '10px',
      boxSizing: 'border-box',
      border: '1px solid rgb(189,189,189)',
    }

    const contentStyle = {
      width,
      height: title !== '' ? (height - 35) + 'px' : height + 'px',
    }

    const titleStyle = {
      width: '100%',
      height: '35px',
      padding: '0.5% 1% 0.5%',
      fontSize: '14px',
      fontWeight: 'bold',
      backgroundColor: 'rgb(224,224,224)',
    }

    return (
      <div style={rootStyle} {...this.props} >
        { title !== '' ? <div style={titleStyle}>{title}</div> : null }
        <div style={contentStyle}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

Panel.propTypes = {
  title: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
}

Panel.defaultProps = {
  title: '',
  width: '100%',
  height: 100,
}

export default Panel
