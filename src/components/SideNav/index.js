/**
 * Created by liekkas on 16/2/23.
 */
import React, { PropTypes } from 'react'
import style from './style.scss'
import { Link, browserHistory, hashHistory } from 'react-router'
import { createHistory, createHashHistory } from 'history'

import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const history = createHashHistory()

class SideNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 'tvOverview',
    }
  }

  handleClick(e) {
//    console.log('click ', e);
    this.setState({
      current: e.key
    });

    browserHistory.push('/' + e.key)
//    hashHistory.push('/#/' + e.key)
//    this.props.onNav(e.key)
    // Dispatch from anywhere like normal.
//    configureStore.dispatch(push('/' + e.key))
  }

  getMenu() {
    switch (this.props.type) {
      case '0':
        return <div className={style.root}>
          <Menu onClick={(e) => this.handleClick(e)} theme='light'
                defaultOpenKeys={['tvOverview']}
                selectedKeys={[this.state.current]}
                mode="inline">
            <Menu.Item key="tvOverview"><span><Icon type="setting"/></span>
              用户概况
            </Menu.Item>
            <Menu.Item key="tvOverview/userBehave"><span><Icon type="setting"/></span>
              用户行为
            </Menu.Item>
            <Menu.Item key="tvOverview/businessOverview"><span><Icon type="setting"/></span>
              全业务概况
            </Menu.Item>
          </Menu>
        </div>
      case '1':
        return <div className={style.root}>
          <Menu onClick={(e) => this.handleClick(e)} theme='light'
                defaultOpenKeys={['lb']}
                selectedKeys={[this.state.current]}
                mode="inline">
            <SubMenu key="lb" title={<span><Icon type="mail" /><span>直播用户分析</span></span>}>
              <Menu.Item key="liveBroadcast"><span><Icon type="setting"/></span>
                用户概况
              </Menu.Item>
              <Menu.Item key="liveBroadcast/userBehave"><span><Icon type="setting"/></span>
                用户行为
              </Menu.Item>
            </SubMenu>
            <SubMenu key="lbGroup" title={<span><Icon type="mail" /><span>直播频道组分析</span></span>}>
              <Menu.Item key="liveBroadcast/channelGroupUserAnalysis"><span><Icon type="setting"/></span>
                用户分析
              </Menu.Item>
              <Menu.Item key="liveBroadcast/channelGroupTimeUseAnalysis"><span><Icon type="setting"/></span>
                使用时长分析
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="liveBroadcast/channelOrder"><span><Icon type="setting"/></span>
              直播频道排名
            </Menu.Item>
            <Menu.Item key="liveBroadcast/channelAnalysis"><span><Icon type="setting"/></span>
              直播频道分析
            </Menu.Item>
            <Menu.Item key="liveBroadcast/showsOrder"><span><Icon type="setting"/></span>
              直播节目排名
            </Menu.Item>
          </Menu>
        </div>
      case '2':
        return <div className={style.root}>
          <Menu onClick={(e) => this.handleClick(e)} theme='light'
                defaultOpenKeys={['db']}
                selectedKeys={[this.state.current]}
                mode="inline">
            <SubMenu key="db" title={<span><Icon type="mail" /><span>点播用户分析</span></span>}>
              <Menu.Item key="demandBroadcast"><span><Icon type="setting"/></span>
                用户概况
              </Menu.Item>
              <Menu.Item key="demandBroadcast/userBehave"><span><Icon type="setting"/></span>
                用户行为
              </Menu.Item>
            </SubMenu>
            <SubMenu key="mz" title={<span><Icon type="mail" /><span>媒资概况分析</span></span>}>
              <Menu.Item key="demandBroadcast/resUtilizationAnalysis"><span><Icon type="setting"/></span>
                资源利用率分析
              </Menu.Item>
              <Menu.Item key="demandBroadcast/showCenterAnalysis"><span><Icon type="setting"/></span>
                节目集中度分析
              </Menu.Item>
            </SubMenu>
            <SubMenu key="lx" title={<span><Icon type="mail" /><span>节目类型分析</span></span>}>
              <Menu.Item key="demandBroadcast/userAnalysis"><span><Icon type="setting"/></span>
                用户分析
              </Menu.Item>
              <Menu.Item key="demandBroadcast/useTimeAnalysis"><span><Icon type="setting"/></span>
                点播时长分析
              </Menu.Item>
            </SubMenu>
            <SubMenu key="pm" title={<span><Icon type="mail" /><span>节目排名分析</span></span>}>
              <Menu.Item key="demandBroadcast/showsOrderAnalysis"><span><Icon type="setting"/></span>
                电影榜单
              </Menu.Item>
              <Menu.Item key="demandBroadcast/showsOrderAnalysis/tvPlayList"><span><Icon type="setting"/></span>
                电视剧榜单
              </Menu.Item>
            </SubMenu>
          </Menu>
        </div>
    }
  }

  render() {
    const { datas, route } = this.props
    return <div>
      { this.getMenu() }
    </div>
  }
}

SideNav.propTypes = {
  type: PropTypes.string.isRequired,
  datas: PropTypes.array,
  route: PropTypes.string.isRequired,
  onNav: PropTypes.func,
}

export default SideNav

//{
//  datas.map(({name, key, subMenus}, index) => {
//    subMenus.length > 0
//      ? <SubMenu key={key} title={<span><Icon type="mail" /><span>{name}</span></span>}>
//      {
//        subMenus.map(({name,key}, index) =>
//          <Menu.Item key={key}>{name}</Menu.Item>
//        )
//      }
//    </SubMenu>
//      : <Menu.Item key={key}>{name}</Menu.Item>
//  })
//}
