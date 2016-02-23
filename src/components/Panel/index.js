/**
 * Created by liekkas on 16/2/23.
 */
import React, { PropTypes } from 'react'

class Panel extends React.Component {
  render() {
    const { title, width, height, hgap, vgap } = this.props

    const rootStyle = {
      width,
      height,
      marginBottom: hgap,
      marginRight: vgap,
      boxSizing: 'border-box',
      border: '1px solid rgb(189,189,189)',
    }

    const contentStyle = {
      width,
      height: title !== '' ? '90%' : '100%',
    }

    const titleStyle = {
      width: '100%',
      height: '10%',
      padding: '0.5% 1% 0.5%',
      fontSize: '14px',
      fontWeight: 'bold',
      backgroundColor: 'rgb(224,224,224)',
    }

    return (
      <div style={rootStyle}>
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
  height: PropTypes.string.isRequired,
  hgap: PropTypes.string.isRequired,
  vgap: PropTypes.string.isRequired,
}
Panel.defaultProps = {
  title: '',
  width: '100%',
  height: '100%',
  hgap: '10px',
  vgap: '10px',
}

export default Panel
