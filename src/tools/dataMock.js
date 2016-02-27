/**
 * Created by liekkas on 16/2/27.
 */
import _ from 'lodash'
import dateFormat from 'dateFormat'
import style from './style.scss'

export function mockData(type, unit, num = 10) {
  var base = +new Date(2015, 10, 20);
  var oneDay = 24 * 3600 * 1000;
  var date = [];

  var data = [_.random(150)];

  for (var i = 1; i < num; i++) {
    var now = new Date(base += oneDay);
    date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-'));
    data.push((_.random(1) - 0.4) * 20 + data[i - 1]);
  }

  const labels = [];
  const datas = [];
  for (var ii = 1; ii <= num; ii++) {
    labels.push('2015年' + ii + '月');
    datas.push(_.random(100));
  }

  return {
//    backgroundColor: 'rgba(0,0,0,0.5)',
//    textStyle: {
//      color: '#fff',
//    },
    title: {
      show: false,
      x: 'center',
      text: '用户数',
    },
    tooltip : {
      trigger: 'axis',
      axisPointer: {
        animation: false
      }
    },
    legend: {
      top: 'bottom',
      data: ['意向']
    },
    toolbox: {
      show: true,
      feature: {
        mark: {show: true},
        dataView: {show: false, readOnly: false},
        magicType: {show: true, type: ['line', 'bar']},
        restore: {show: true},
        saveAsImage: {show: true}
      },
      iconStyle: {
        normal: {
//          color: '#ffffff',
          borderColor: '#fff',
        },
        emphasis: {
          borderColor: '#FFAA00',
        }
      }
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: date,
        axisLine: {
          lineStyle: {
            color: 'rgba(255,255,255,0.8)',
          }
        },
        axisTick: {
          lineStyle: {
            color: 'rgba(255,255,255,0.8)',
          }
        },
        axisLabel: {
          textStyle: {
            color: '#314656',
          }
        },
        splitLine: {
          show: false
        },
      }
    ],
    yAxis: [
      {
        type: 'value',
        max: 500,
        axisLine: {
          lineStyle: {
            color: 'rgba(255,255,255,0.8)',
          }
        },
        axisTick: {
          lineStyle: {
            color: 'rgba(255,255,255,0.8)',
          }
        },
        axisLabel: {
          textStyle: {
            color: '#314656',
          }
        },
      }
    ],
//    dataZoom: {
//      type: 'inside',
//      start: 60,
//      end: 80
//    },
    series: [
      {
        name: '用户数',
        type: 'line',
//        smooth: true,
//        symbol: 'none',
        stack: 'a',
//        areaStyle: {
//          normal: {}
//        },
        data: data,
        markPoint : {
          data : [
            {type : 'max', name: '最大值'},
            {type : 'min', name: '最小值'}
          ]
        },
        markLine : {
          itemStyle:{
            normal:{
              textStyle:{
                type: 'solid',
                color: '#00ff00',
                width: 10
              }
            }
          },
          data : [
            {type : 'average', name: '平均值'}
          ]
        },
        /*
        markLine : {
          itemStyle:{
            normal:{
              lineStyle:{
                type: 'dashed'
              }
            }
          },
          data : [
            [{type : 'min'}, {type : 'max'}]
          ]
        }*/
      }
    ]
  }
}

export function mockTableHeader(kpis) {
  let result = [{
    title: '日期',
    dataIndex: 'date',
    key: 'date',
//    className: style.header
  }]
  for (let i = 0; i < kpis.length; i++) {
    result.push({
      title: kpis[i].label,
      dataIndex: kpis[i].value,
      key: kpis[i].value,
    })
  }
  return result
}

export function mockTable(kpis, num = 100) {
  let result = []
  for (let i = 0; i < num; i++) {
    let item = {date: '2016-02-27'}
    _.forEach(kpis, function (kpi) {
      if (kpi.label.indexOf('率') > -1) {
        item[kpi.value] = _.random(100) + '%'
      } else {
        item[kpi.value] = _.random(500)
      }
    })
    result.push(item)
  }
  return result
}
