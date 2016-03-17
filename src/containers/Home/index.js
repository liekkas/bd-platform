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
//
//湖南省
//长沙：有线电视用户57万户
//湘潭：有线电视用户21万户
//浏阳：有线电视用户20万户
//岳阳：有线电视用户19万户
//益阳：有线电视用户18万户
//---------------------------
//  河北省
//唐山：有线电视用户26万户
//承德：有线电视用户13万户
//沧州：有线电视用户15万户
//秦皇岛：有线电视用户34万户
//---------------------------
//  山东省
//威海：有线电视用户83万户
//---------------------------
//  河南省
//周口：有线电视用户8万户

const details = {
  湖南: [
    {name: '长沙', value: '57'},
    {name: '湘潭', value: '21'},
    {name: '浏阳', value: '20'},
    {name: '岳阳', value: '19'},
    {name: '益阳', value: '18'},
  ],
  河北: [
    {name: '唐山', value: '26'},
    {name: '承德', value: '13'},
    {name: '沧州', value: '15'},
    {name: '秦皇岛', value: '34'},
  ],
  山东: [
    {name: '威海', value: '83'},
  ],
  河南: [
    {name: '周口', value: '8'},
  ]
}

const v1 = ['1885','870','447','135','88','83','8']
_.forEach(provinces, function (province, index) {
  data.push({name: province, value: v1[index]})
})

var geoCoordMap = {
  '河北':[114.48,38.03],
  '河南':[113.65,34.76],
  '安徽':[117.27,31.86],
  '江苏':[119.88,34.04],
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

function getDetail(name) {
  if (!details.hasOwnProperty(name)) return ''

  const cities = details[name]
  let result = '<br />----------------<br />'
  for (let i = 0; i < cities.length; i++) {
    result += cities[i].name + ': ' + cities[i].value + '万户<br />'
  }
  return result
}
const baseMapOption = {
  color: ['#2f4554', '#c23531',],
  series : [
    {
      name: '中国',
      type: 'map',
      mapType: 'china',
      nameMap: {
        '江苏' : ' ',
        '湖北' : ' ',
        '湖南' : ' ',
        '河北' : ' ',
        '山东' : ' ',
        '河南' : ' ',
        '安徽' : ' ',
      },
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
            color: '#B8E6FE',
//            fontWeight: 'bold',
//            color: '#000'
          }
        },
      },
      itemStyle: {
        normal: {
          areaColor: '#6cA9EB',
          borderColor: '#447cca',
          borderWidth: 1,
        },
        emphasis: {
          areaColor: '#6cA9EB',
          borderColor: '#447cca',
          borderWidth: 1,
        },
      },
      data:[]
    },
  ]
}

const mapOption = {
//  color: ['#2f4554', '#c23531',],
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
//    color: ['#e94f26','#ffb74d'],
    inRange: {
//      color: ['#ffb74d', '#ffa726', '#ff9800', '#e94f26'],
      color: ['#ffb74d','#e94f26'],
      symbolSize: [30, 100]
    },
//    outOfRange: {
//      color: ['#121122', 'rgba(3,4,5,0.4)', 'red'],
//      symbolSize: [30, 100]
//    },
    min: 0,
    max: 2000,
    formatter: '{value}万户',
//    left: 'right',
//    top: 'bottom',
    bottom: 30,
    right: 30,
    text:['高','低'],           // 文本，默认为数值文本
    calculable : true,
    textStyle: {
      color: '#c0d5ff',
//      fontSize: 26
    }
  },
  tooltip : {
    padding: 10,
    trigger: 'item',
    formatter: (item) => (isNaN(item.value)
      ? null
//      : item.seriesName + '<br />' + item.name + ': - ' + item.value + '万户'),
      : '有线电视用户数<br />' + item.name + '省: ' + item.value + '万户' + getDetail(item.name)),
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
      name: '有线电视用户数',
      type: 'map',
      top: '355',
      left: '1026',
//      right: '20%',
      bottom: '256',
      mapType: 'myMap',
      z: 3,
      zlevel: 3,
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
            color: '#B8E6FE',
            fontWeight: 'bold',
//            color: '#000'
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
          //LightGreen
//          areaColor: '#9ccc65',
//          shadowColor: '#8bc34a',
          //LightBlue
          areaColor: '#03a9f4',
          shadowColor: '#039be5',
          //Green
//          areaColor: '#42bd41',
//          shadowColor: '#2bafab',
          //Lime
//          areaColor: '#d4e157',
//          shadowColor: '#cddc39',
          borderColor: '#FFF',
          shadowBlur: 10,
          shadowOffsetX: 10,
          shadowOffsetY: 10,
          opacity: 0.8,
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
const types = ['数字电视用户数(万户)','有线电视用户数(万户)']
for (let j = 0; j < types.length; j++) {
  let d = []
  for (let k = 0; k < reProvinces.length; k++) {
    d.push(j === 0 ? d1[k] : d2[k])
  }

  barData.push({
    name: types[j],
    type:'bar',
    stack: '总量',
//    itemStyle : { normal: {label : {show: true, position: j === 0 ? 'insideLeft' : 'insideLeft'}} },
    itemStyle : {
      normal: {
        label : {
          show: true,
          position: j === 0 ? 'insideRight' : 'right',
          textStyle: {
            color: '#FFF',
          }
        }
      }
    },
//    barWidth: 20,
//    barGap: '40%',
//    barCategoryGap: '40%',
    data:d
  })
}

const barOption = {
//  backgroundColor: '#fff',
//  color: ['#c23531','#40c4ff'],
  color: ['#396cbd','#c94638'],

//  tooltip : {
//    show: false,
////    trigger: 'axis',
//////    formatter: "{a} <br/>{b} : {c} ({d}万)",
////    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
////      type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
////    }
//  },
  legend: {
    show: false,
    data:['数字电视用户数(万户)','有线电视用户数(万户)'],
//    y: 'top',
//    x: 'center',
//    itemHeight: 20,
//    itemWidth: 25,
    selectedMode: false,
    textStyle: {
      color: '#5fa4d9',
      fontSize: 14,
    },
  },
  grid: {
    left: 50,
//    right: '4%',
    bottom: '4%',
    top: 40,
//    containLabel: true
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

    if (provinces.indexOf(e.name) > -1) {
      browserHistory.push('/tvOverview');
    }
  }
//<img src={robot} className={style.robot}/>

  render() {
    const { foo } = this.props
    return (
      <div className={style.root}>
        <ECharts option={baseMapOption}/>

        <div className={style.map}>
          <ECharts showCloseLine={false} config={{eventType: 'click', eventHandler: this.onMapClick}} option={mapOption}/>
        </div>

        <div className={style.legend1}>
          <svg width="25" height="18">
            <rect width="25" height="18" fill='#396cbd'/>
          </svg>
          &nbsp;&nbsp;
          <label>数字电视用户数(万户)</label>
        </div>
        <div className={style.legend2}>
          <svg width="25" height="18">
            <rect width="25" height="18" fill='#c94638'/>
          </svg>
          &nbsp;&nbsp;
          <label>有线电视用户数(万户)</label>
        </div>
        <div className={style.bar}>
          <ECharts option={barOption} showCloseLine={false}/>
        </div>
        <div className={style.coverBar}/>
        <label className={style.footLabel}>© 2016 All Rights Reserved 中信国安广视网络有限公司 版权所有</label>
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
