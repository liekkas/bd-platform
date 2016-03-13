/**
 * Created by liekkas on 16/2/19.
 */
import React, { PropTypes } from 'react'
import { ECharts, Panel, Footer } from '../../components'
import style from './style.scss'
//import echarts from 'echarts'
import _ from 'lodash'
import {browserHistory} from 'react-router';

let data = []
let data2 = []
const provinces = ['江苏','湖北','安徽','湖南','河北','山东','河南']
const v1 = ['3250','1670','852','161','175','165','12']
_.forEach(provinces, function (province, index) {
  data.push({name: province, value: v1[index]})
})

var geoCoordMap = {
  '河北':[114.48,38.03],
  '河南':[113.65,34.76],
  '安徽':[117.27,31.86],
  '江苏':[118.88,33.04],
  '山东':[117,36.65],
  '湖北':[114.31,30.52],
  '湖南':[113,28.21],
};

var convertData = function (data) {
  var res = [];
  for (var i = 0; i < data.length; i++) {
    var geoCoord = geoCoordMap[data[i].name];
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value)
      });
    }
  }
  return res;
};

const mapOption = {
  textStyle: {
    color: '#fff',
  },
  title: {
    text: '中信国安广视全国电视用户数据资产情况',
//    text: '中国电信全国4G用户数据资产情况',
//    subtext: 'data from PM25.in',
    left: 'center',
    top: 50,
    textStyle: {
      color: '#c0d5ff',
      fontSize: 26
    }
  },
  visualMap: {
    show: true,
    color: ['#e94f26','#F39e33'],
    min: 0,
    max: 3500,
//    left: 'right',
//    top: 'bottom',
    bottom: 20,
    right: 20,
    text:['高','低'],           // 文本，默认为数值文本
    calculable : true,
    textStyle: {
      color: '#c0d5ff',
//      fontSize: 26
    }
  },
  tooltip : {
    trigger: 'item',
    formatter: (item) => item.seriesName + '<br />' + item.name + ':'
      + (isNaN(item.value) ? '无数据' : item.value + '万'),
  },
  legend: {
    show: false,
    orient: 'vertical',
    y: 'top',
    x:'right',
    data:['pm2.5'],
    textStyle: {
      color: '#fff'
    }
  },
  series : [
    {
      name: '用户覆盖',
      type: 'map',
      top: 96,
      mapType: 'china',
      label: {
        normal: {
          show: true,
          textStyle: {
            color: '#B8E6FE'
          }
        },
        emphasis: {
          show: true,
          textStyle: {
            color: '#B8E6FE'
          }
        },

      },
      roam: false,
      itemStyle: {
        normal: {
          areaColor: '#6cA9EB',
          borderColor: '#447cca',
          borderWidth: 1,
        },
        emphasis: {
          areaColor: '#ffab00',
        }
      },

      data,
    },
//
  ]
}

let barData = []
const reProvinces = provinces
//const d1 = [1885,870,447,135,88,83,8]
const d2 = [1885,870,447,135,88,83,8].reverse()
//const d2 = [1365,800,405,126,87,82,4]
const d1 = [1365,800,405,126,87,82,4].reverse()
const types = ['数字用户数(万户)','有线电视用户数(万户)']
for (let j = 0; j < types.length; j++) {
  let d = []
  for (let k = 0; k < reProvinces.length; k++) {
    d.push(j === 0 ? d1[k] : d2[k])
  }

  barData.push({
    name: types[j],
    type:'bar',
    stack: '总量',
    itemStyle : { normal: {label : {show: true, position: j === 0 ? 'insideLeft' : 'insideRight'}} },
    barWidth: 18,
    barGap: '5%',
    barCategoryGap: '5%',
    data:d
  })
}

const barOption = {
//  color: ['#c23531','#40c4ff'],
  color: ['#c94638','#396cbd'],

  tooltip : {
    show: false,
    trigger: 'item',
//    formatter: "{a} <br/>{b} : {c} ({d}万)",
    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
      type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  legend: {
    data:['有线电视用户数(万户)','数字用户数(万户)'],
    y: 'top',
    textStyle: {
      color: '#5fa4d9'
    },
    top: 50,
  },
  grid: {
    left: '4%',
    right: '4%',
    bottom: '4%',
    top: 80,
    containLabel: true
  },
  xAxis : [
    {
//      type : 'value',
      type : 'log',
      axisLine: {
        show: false,
        lineStyle: {
          color: 'rgba(255,255,255,0.8)',
        }
      },
      axisTick: {
        show: false,
        lineStyle: {
          color: 'rgba(255,255,255,0.8)',
        }
      },
      axisLabel: {
        show: false,
        textStyle: {
          color: '#314656',
        }
      },
      splitLine: {
        show: false,
      },
    }
  ],
  yAxis : [
    {
      type : 'category',
//      data : provinces,
      data : provinces.reverse(),
      axisLine: {
        show: false,
        lineStyle: {
          color: 'rgba(255,255,255,0.8)',
        }
      },
      axisTick: {
        show: false,
        lineStyle: {
          color: 'rgba(255,255,255,0.8)',
        }
      },
      axisLabel: {
        right: 20,
        textStyle: {
          color: '#5fa4d9',
        }
      },
      splitLine: {
        show: false,
      },
    }
  ],
  series : barData
};

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mapType: 'china',
    }
  }

  onMapClick(e) {
    console.log('>>> 我靠',e)
//    this.props.history.replaceState(null, '/tvOverview');

    browserHistory.push('/tvOverview');
  }
//<img src={robot} className={style.robot}/>

  render() {
    const { foo } = this.props
    return (
      <div className={style.root}>
        <ECharts config={{eventType: 'click', eventHandler: this.onMapClick}} option={mapOption}/>

        <div className={style.bar}>
          <ECharts option={barOption}/>
        </div>
        <label>© 2016 All Rights Reserved 中信国安广视网络有限公司 版权所有</label>
      </div>
    )
  }
}

Home.propTypes = {
  foo: PropTypes.string.isRequired,
}
Home.defaultProps = {
  foo: 'Home',
}

export default Home
