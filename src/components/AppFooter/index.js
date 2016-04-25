/**
 * Created by liekkas on 16/2/26.
 */
import React, { PropTypes } from 'react'

const styles = {
  root: {
    color: 'white',
    paddingTop: '1vh',
    width: '100%',
    textAlign: 'center',
    height: '5vh',
  }
}

class AppFooter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: 'bar',
    }
  }

  render() {
    const { text, showBG } = this.props
    styles.root.backgroundColor = showBG ? '#1F222A' : 'rgba(0,0,0,0)'
    return (
      <div style={styles.root}>
        {text}
      </div>
    )
  }
}

AppFooter.propTypes = {
  text: PropTypes.string.isRequired,
  showBG: PropTypes.bool.isRequired,
}
AppFooter.defaultProps = {
  text: 'bar',
  showBG: true
}

export default AppFooter
