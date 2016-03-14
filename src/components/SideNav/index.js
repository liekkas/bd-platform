/**
 * Created by liekkas on 16/2/23.
 */
import React, { PropTypes } from 'react'
import style from './style.scss'
import { Link, browserHistory, hashHistory } from 'react-router'
import { createHistory, createHashHistory } from 'history'
import userOverview1 from './icons/userOverview1.png'
import userOverview2 from './icons/userOverview2.png'
import userBehave1 from './icons/userBehave1.png'
import userBehave2 from './icons/userBehave2.png'
import allBiz1 from './icons/allBiz1.png'
import allBiz2 from './icons/allBiz2.png'
import liveUserAnalysis1 from './icons/liveUserAnalysis1.png'
import liveUserAnalysis2 from './icons/liveUserAnalysis2.png'
import channelGroupAnalysis1 from './icons/channelGroupAnalysis1.png'
import channelGroupAnalysis2 from './icons/channelGroupAnalysis2.png'
import channelOrder1 from './icons/channelOrder1.png'
import channelOrder2 from './icons/channelOrder2.png'
import channelAnalysis1 from './icons/channelAnalysis1.png'
import channelAnalysis2 from './icons/channelAnalysis2.png'
import showOrder1 from './icons/showOrder1.png'
import showOrder2 from './icons/showOrder2.png'
import demandUser1 from './icons/demandUser1.png'
import demandUser2 from './icons/demandUser2.png'
import mediaAsset1 from './icons/mediaAsset1.png'
import mediaAsset2 from './icons/mediaAsset2.png'
import showType1 from './icons/showType1.png'
import showType2 from './icons/showType2.png'
import { Menu, Icon } from 'antd';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);
const leftClassName = cx('subMenuIcon', 'zmdi', 'zmdi-chevron-right', 'zmdi-hc-lg');
const rightClassName = cx('menuIcon', 'zmdi', 'zmdi-chevron-right', 'zmdi-hc-lg');

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const history = createHashHistory()

class SideNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current: props.type === '0' ? 'tvOverview' : props.type === '1' ? 'liveBroadcast' : 'demandBroadcast'
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
//    console.log('>>> Router',this.props.route)
    switch (this.props.type) {
      case '0':
        return <div className={style.root}>
          <Menu onClick={(e) => this.handleClick(e)} theme='dark'
                defaultOpenKeys={['tvOverview']}
                selectedKeys={[this.props.route]}
                mode="inline">
            <Menu.Item key="tvOverview">
              <img src={ this.props.route === 'tvOverview' ? userOverview2 : userOverview1} />
              <span className={style.menuName}>用户概况</span>
              <span className={rightClassName} />
            </Menu.Item>
            <Menu.Item key="tvOverview/userBehave">
              <img src={ this.props.route === 'tvOverview/userBehave' ? userBehave2 : userBehave1} />
              <span className={style.menuName}>使用时长</span>
              <span className={rightClassName} />
            </Menu.Item>
            <Menu.Item key="tvOverview/businessOverview">
              <img src={ this.props.route === 'tvOverview/businessOverview' ? allBiz2 : allBiz1} />
              <span style={{marginRight: '25%'}}>全业务概况</span>
              <span className={rightClassName} />
            </Menu.Item>
          </Menu>
        </div>
      case '1':
        return <div className={style.root}>
          <Menu onClick={(e) => this.handleClick(e)} theme='dark'
                defaultOpenKeys={['lb']}
                selectedKeys={[this.props.route]}
                mode="inline">
            <SubMenu key="lb"
                     title={<span><img
                     src={ this.props.route === 'liveBroadcast'
                            || this.props.route === 'liveBroadcast/userBehave'
                            ? liveUserAnalysis2 : liveUserAnalysis1 } /><span>直播用户分析</span></span>}>
              <Menu.Item key="liveBroadcast">
                <span className={leftClassName} />
                <span className={style.menuName2Sub}>用户概况</span>
              </Menu.Item>
              <Menu.Item key="liveBroadcast/userBehave">
                <span className={leftClassName} />
                <span className={style.menuName2Sub}>使用时长</span>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="lbGroup" title={<span><img
                src={ this.props.route === 'liveBroadcast/channelGroupUserAnalysis'
                        || this.props.route === 'liveBroadcast/channelGroupTimeUseAnalysis'
                        ? channelGroupAnalysis2 : channelGroupAnalysis1 } /><span>直播频道组分析</span></span>}>
              <Menu.Item key="liveBroadcast/channelGroupUserAnalysis">
                <span className={leftClassName} />
                <span className={style.menuName2Sub}>用户分析</span>
              </Menu.Item>
              <Menu.Item key="liveBroadcast/channelGroupTimeUseAnalysis">
                <span className={leftClassName} />
                <span className={style.menuName2Sub}>使用时长分析</span>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="liveBroadcast/channelOrder">
              <img src={ this.props.route === 'liveBroadcast/channelOrder' ? channelOrder2 : channelOrder1} />
              <span className={style.menuName2}>直播频道排名</span>
              <span className={rightClassName} />
            </Menu.Item>
            <Menu.Item key="liveBroadcast/channelAnalysis">
              <img src={ this.props.route === 'liveBroadcast/channelAnalysis' ? channelAnalysis2 : channelAnalysis1} />
              <span className={style.menuName2}>直播频道分析</span>
              <span className={rightClassName} />
            </Menu.Item>
            <Menu.Item key="liveBroadcast/showsOrder">
              <img src={ this.props.route === 'liveBroadcast/showsOrder' ? showOrder2 : showOrder1} />
              <span className={style.menuName2}>直播节目排名</span>
              <span className={rightClassName} />
            </Menu.Item>
          </Menu>
        </div>
      case '2':
        return <div className={style.root}>
          <Menu onClick={(e) => this.handleClick(e)} theme='dark'
                defaultOpenKeys={['db']}
                selectedKeys={[this.props.route]}
                mode="inline">
            <SubMenu key="db" title={<span><img src={
                      this.props.route === 'demandBroadcast'
                        || this.props.route === 'demandBroadcast/userBehave'
                        ? demandUser2 : demandUser1 } /><span>点播用户分析</span></span>}>
              <Menu.Item key="demandBroadcast">
                <span className={leftClassName} />
                <span className={style.menuName2Sub}>用户概况</span>
              </Menu.Item>
              <Menu.Item key="demandBroadcast/userBehave">
                <span className={leftClassName} />
                <span className={style.menuName2Sub}>使用时长</span>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="mz" title={<span><img src={
                      this.props.route === 'demandBroadcast/mediaAssetsOverview'
                        || this.props.route === 'demandBroadcast/mediaAssetsOverview/showCenterAnalysis'
                        ? mediaAsset2 : mediaAsset1 } /><span>媒资概况分析</span></span>}>
              <Menu.Item key="demandBroadcast/mediaAssetsOverview">
                <span className={leftClassName} />
                <span className={style.menuName2Sub}>资源利用率分析</span>
              </Menu.Item>
              <Menu.Item key="demandBroadcast/mediaAssetsOverview/showCenterAnalysis">
                <span className={leftClassName} />
                <span className={style.menuName2Sub}>节目集中度分析</span>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="lx" title={<span><img src={
                      this.props.route === 'demandBroadcast/showsUserAnalysis'
                        || this.props.route === 'demandBroadcast/showsUseTimeAnalysis'
                        ? showType2 : showType1 } /><span>节目类型分析</span></span>}>
              <Menu.Item key="demandBroadcast/showsUserAnalysis">
                <span className={leftClassName} />
                <span className={style.menuName2Sub}>用户分析</span>
              </Menu.Item>
              <Menu.Item key="demandBroadcast/showsUseTimeAnalysis">
                <span className={leftClassName} />
                <span className={style.menuName2Sub}>点播时长分析</span>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="pm" title={<span><img src={
                      this.props.route === 'demandBroadcast/showsOrderAnalysis'
                        || this.props.route === 'demandBroadcast/showsOrderAnalysis/tvPlayList'
                        ? showOrder2 : showOrder1 } /><span>节目排名分析</span></span>}>
              <Menu.Item key="demandBroadcast/showsOrderAnalysis">
                <span className={leftClassName} />
                <span className={style.menuName2Sub}>电影榜单</span>
              </Menu.Item>
              <Menu.Item key="demandBroadcast/showsOrderAnalysis/tvPlayList">
                <span className={leftClassName} />
                <span className={style.menuName2Sub}>电视剧榜单</span>
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

