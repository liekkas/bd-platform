/**
 * Created by liekkas on 16/2/23.
 */
import React, { PropTypes } from 'react'
import style from './style.scss'
import { Link } from 'react-router'
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class SideNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 1,
    }
  }

  handleClick(e) {
    console.log('click ', e);
    this.setState({
      current: e.key
    });
  }

  render() {
    const { datas, route } = this.props
    console.log('>>> route', route)

    const arr = [
      { key: 'haha', name: 'HAHA', subMenus: [] },
      { key: 'hehe', name: 'HEHE', subMenus: [] },
    ]

    return (
      <div className={style.root}>
        <Menu onClick={(e) => this.handleClick(e)} theme='light'
              defaultOpenKeys={['haha']}
              selectedKeys={[this.state.current]}
              mode="inline">
          <SubMenu key="sub4" title={<span><Icon type="setting" /><span>导航三导航三导航三</span></span>}>
            <Menu.Item key="9">选项9</Menu.Item>
            <Menu.Item key="10">媒介利用率分析</Menu.Item>
            <Menu.Item key="12">选项12</Menu.Item>
          </SubMenu>
          <Menu.Item key="11"><span><Icon type="setting" /></span>
            <Link to={'/tvOverview/businessOverview'}>全业务概况</Link>
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}

SideNav.propTypes = {
  datas: PropTypes.array.isRequired,
  route: PropTypes.string.isRequired,
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
