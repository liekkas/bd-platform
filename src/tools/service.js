/**
 * Created by liekkas on 16/3/3.
 */
import _ from 'lodash'
import echarts from 'echarts'

export function getSingleOption(labels,datas,unit,kpi) {
  return {
//    backgroundColor: 'rgba(0,57,100,0.6)',
    title: {
      show: false,
      x: 'right',
      text: kpi,
      subtext: unit,
    },
    tooltip : {
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          color: '#7C8088'
        }
      },
      formatter: '{b}' + '<br />' + '{a}:{c}' + unit,
    },
    grid: {
      top: 70,
      bottom: 50,
    },
    legend: {
      top: 'bottom',
      data: ['意向']
    },
    toolbox: {
      show: true,
      feature: {
        mark: {show: false},
        dataView: {show: false, readOnly: false},
        magicType: {show: false, type: ['line', 'bar']},
        restore: {show: false},
        saveAsImage: {show: true}
      },
      iconStyle: {
        normal: {
//          color: '#ffffff',
//          borderColor: '#7c8088',
        },
        emphasis: {
//          borderColor: '#FFAA00',
        }
      }
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: labels,
        axisLine: {
          lineStyle: {
            color: '#7c8088',
          }
        },
        axisTick: {
          lineStyle: {
            color: '#7c8088',
          }
        },
        axisLabel: {
          textStyle: {
            color: '#7c8088',
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
//        max: 500,
        axisLine: {
          lineStyle: {
            color: '#7c8088',
          }
        },
        axisTick: {
          lineStyle: {
            color: '#7c8088',
          }
        },
        axisLabel: {
          textStyle: {
            color: '#7c8088',
          },
//          formatter: getFormat(kpi) + unit
          formatter: function (value, index) {
            switch (kpi) {
              case '使用时长':
                return value / 10000 + '万' + unit
              default:
                return value + unit;
            }
          }
        },
        splitLine: {
          lineStyle: {
            color: '#7c8088',
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
        name: kpi,
        type: 'line',
        areaStyle: {
          normal: {
//            color: 'rgba(128, 128, 128, 0.2)',
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
//              color: 'rgb(255, 158, 68)'
              color: 'rgb(128, 30, 34)'
            }, {
              offset: 1,
//              color: 'rgb(255, 70, 131)'
//              color: 'rgba(33, 33, 33, 0.1)'
              color: 'rgba(255, 200, 68, 0.1)'
            }])
          }
        },
        smooth: true,
        data: datas,
//        markPoint : {
//          data : [
//            {type : 'max', name: '最大值'},
//            {type : 'min', name: '最小值'}
//          ]
//        },
        markLine : {
          data : [
            {
              type : 'average',
              name: '平均值',
              label: {
                normal: {
//                  color: '#00ff00'
                }
              },
            }
          ],
          lineStyle: {
            normal: {
//              color: '#00ff00'
            }
          },
          label: {
            normal: {
              formatter: '{c}' + unit
            }
          },

        },
      }
    ]
  }
}

export function getSingleBigDataOption(labels,datas,unit,kpi) {
  return {
//    backgroundColor: 'rgba(0,57,100,0.6)',
    title: {
      show: false,
      x: 'right',
      text: kpi,
      subtext: unit,
    },
    tooltip : {
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          color: '#7C8088'
        }
      },
      formatter: '{b}' + '<br />' + '{a}:{c}' + unit,
    },
    grid: {
      top: 70,
      bottom: 50,
    },
    legend: {
      top: 'bottom',
      data: ['意向']
    },
    toolbox: {
      show: true,
      feature: {
        mark: {show: false},
        dataView: {show: false, readOnly: false},
        magicType: {show: false, type: ['line', 'bar']},
        restore: {show: false},
        saveAsImage: {show: true}
      },
      iconStyle: {
        normal: {
//          color: '#ffffff',
//          borderColor: '#7c8088',
        },
        emphasis: {
//          borderColor: '#FFAA00',
        }
      }
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: labels,
        axisLine: {
          lineStyle: {
            color: '#7c8088',
          }
        },
        axisTick: {
          lineStyle: {
            color: '#7c8088',
          }
        },
        axisLabel: {
          textStyle: {
            color: '#7c8088',
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
//        max: 500,
        axisLine: {
          lineStyle: {
            color: '#7c8088',
          }
        },
        axisTick: {
          lineStyle: {
            color: '#7c8088',
          }
        },
        axisLabel: {
          textStyle: {
            color: '#7c8088',
          },
//          formatter: getFormat(kpi) + unit
          formatter: function (value, index) {
            switch (kpi) {
              case '使用时长':
                return value / 10000 + '万' + unit
              default:
                return value + unit;
            }
          }
        },
        splitLine: {
          lineStyle: {
            color: '#7c8088',
          }
        },
      }
    ],
//    dataZoom: {
//      type: 'inside',
//      start: 60,
//      end: 80
//    },
    dataZoom: [{
      type: 'inside',
      start: 0,
      end: 10
    }, {
      start: 0,
      end: 10
    }],
    series: [
      {
        name: kpi,
        type: 'line',
        areaStyle: {
          normal: {
            color: 'rgba(128, 128, 128, 0.2)'
          }
        },
        smooth: true,
        data: datas,
//        markPoint : {
//          data : [
//            {type : 'max', name: '最大值'},
//            {type : 'min', name: '最小值'}
//          ]
//        },
        markLine : {
          data : [
            {
              type : 'average',
              name: '平均值',
              label: {
                normal: {
//                  color: '#00ff00'
                }
              },
            }
          ],
          lineStyle: {
            normal: {
//              color: '#00ff00'
            }
          },
          label: {
            normal: {
              formatter: '{c}' + unit
            }
          },

        },
      }
    ]
  }
}

export function getMultiOption(labels,datas,legends,unit,kpi) {
  let series = []
  for (let i = 0; i < legends.length; i++) {
    series.push({
      name: legends[i],
      type: 'bar',
      data: datas[i],
    })
  }

  return {
//    backgroundColor: 'rgba(0,57,100,0.6)',
    color: ['#c94638','#396cbd'],
    title: {
      show: false,
      x: 'right',
      text: kpi,
      subtext: unit,
    },
    tooltip : {
      trigger: 'axis',
      axisPointer: {
        type : 'shadow',
//        lineStyle: {
//          color: '#7c8088'
//        }
      },
      formatter: '{b}' + '<br />' + '{a}:{c}' + unit + '<br />' + '{a1}:{c1}' + unit,
    },
    grid: {
      top: 70,
      bottom: 55,
    },
    legend: {
      left: 'center',
      bottom: 8,
      textStyle: {
        color: '#7c8088'
      },
      data: legends
    },
    toolbox: {
      show: true,
      feature: {
        mark: {show: false},
        dataView: {show: false, readOnly: false},
        magicType: {show: false, type: ['line', 'bar']},
        restore: {show: false},
        saveAsImage: {show: true}
      },
      iconStyle: {
        normal: {
//          color: '#ffffff',
//          borderColor: '#7c8088',
        },
        emphasis: {
//          borderColor: '#FFAA00',
        }
      }
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: true,
        data: labels,
        axisLine: {
          lineStyle: {
            color: '#7c8088',
          }
        },
        axisTick: {
          lineStyle: {
            color: '#7c8088',
          }
        },
        axisLabel: {
          textStyle: {
            color: '#7c8088',
          }
        },
        splitLine: {
          show: true
        },
      }
    ],
    yAxis: [
      {
        type: 'value',
//        max: 500,
        axisLine: {
          lineStyle: {
            color: '#7c8088',
          }
        },
        axisTick: {
          lineStyle: {
            color: '#7c8088',
          }
        },
        axisLabel: {
          textStyle: {
            color: '#7c8088',
          },
//          formatter: getFormat(kpi) + unit
          formatter: function (value, index) {
            switch (kpi) {
              case '使用时长':
                return value / 10000 + '万' + unit
              default:
                return value + unit;
            }
          }
        },
      }
    ],
//    dataZoom: {
//      type: 'inside',
//      start: 60,
//      end: 80
//    },
    series
  }
}

export function getOrderOption(labels,datas,unit,kpi) {
  return {
//    backgroundColor: 'rgba(0,57,100,0.6)',
    title: {
      show: false,
      x: 'right',
      text: kpi,
      subtext: unit,
    },
    tooltip : {
      trigger: 'axis',
      axisPointer: {
        type : 'shadow',
        lineStyle: {
          color: '#7c8088'
        }
      },
      formatter: '{b}' + '<br />' + '{a}:{c}' + unit,
    },
    grid: {
      top: 70,
      bottom: 50,
    },
    legend: {
      top: 'bottom',
      data: ['意向']
    },
    toolbox: {
      show: true,
      feature: {
        mark: {show: false},
        dataView: {show: false, readOnly: false},
        magicType: {show: false, type: ['line', 'bar']},
        restore: {show: false},
        saveAsImage: {show: true}
      },
      iconStyle: {
        normal: {
//          color: '#ffffff',
//          borderColor: '#7c8088',
        },
        emphasis: {
//          borderColor: '#FFAA00',
        }
      }
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: true,
        data: labels,
        axisLine: {
          lineStyle: {
//            color: 'rgba(255,255,255,0.8)',
          }
        },
        axisTick: {
          lineStyle: {
//            color: 'rgba(255,255,255,0.8)',
          }
        },
        axisLabel: {
          textStyle: {
            color: '#7c8088',
          }
        },
        splitLine: {
          show: true
        },
      }
    ],
    yAxis: [
      {
        type: 'value',
//        max: 500,
        axisLine: {
          lineStyle: {
//            color: 'rgba(255,255,255,0.8)',
          }
        },
        axisTick: {
          lineStyle: {
//            color: 'rgba(255,255,255,0.8)',
          }
        },
        axisLabel: {
          textStyle: {
            color: '#7c8088',
          },
//          formatter: getFormat(kpi) + unit
          formatter: function (value, index) {
            switch (kpi) {
              case '使用时长':
                return value / 10000 + '万' + unit
              default:
                return value + unit;
            }
          }
        },
        splitLine: {
          show: true
        },
      }
    ],
    dataZoom: [{
      type: 'inside',
      start: 0,
      end: 10
    }, {
      start: 0,
      end: 10
    }],
//    dataZoom: {
//      type: 'inside',
//      start: 60,
//      end: 80
//    },
    series: [
      {
        name: kpi,
        type: 'bar',
        data: datas,
        itemStyle : { normal: {label : {show: false, position: 'insideRight'}} },
      }
    ]
  }
}

var lineStyle = {
  normal: {
    width: 1,
    opacity: 0.5
  }
};

export function getRadarOption(labels,datas) {
  let inds = []
  for (let i = 0; i < labels.length; i++) {
    inds.push({
      name: labels[i],
      max: _.max(datas)
    })
  }

  return {
//    backgroundColor: '#161627',
    tooltip : {
      trigger: 'item'
    },
    radar: {
      indicator: inds,
      shape: 'circle',
      splitNumber: 5,
      name: {
        textStyle: {
          color: 'rgb(238, 197, 102)'
        }
      },
      splitLine: {
        lineStyle: {
          color: [
            'rgba(238, 197, 102, 0.1)', 'rgba(238, 197, 102, 0.2)',
            'rgba(238, 197, 102, 0.4)', 'rgba(238, 197, 102, 0.6)',
            'rgba(238, 197, 102, 0.8)', 'rgba(238, 197, 102, 1)'
          ].reverse()
        }
      },
      splitArea: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(238, 197, 102, 0.5)'
        }
      }
    },
    series: [
      {
        name: '市占率',
        type: 'radar',
        lineStyle: lineStyle,
        data: [datas],
        symbol: 'none',
        itemStyle: {
          normal: {
            color: '#F9713C'
          }
        },
        areaStyle: {
          normal: {
            opacity: 0.1
          }
        }
      }
    ]
  }
}
export function getPieOption(labels,datas) {
  let values = []
  for (let i = 0; i < labels.length; i++) {
    values.push({
      name: labels[i],
      value: datas[i]
    })
  }

  return {
    color: ['#c23531', '#61a0a8'],
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
//      x: 'right',
      right: 20,
      top: 20,
      textStyle: {
        color: '#7c8088'
      },
      data: labels
    },
    series: [
      {
        name: '市占率',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: true,
//            position: 'center'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '30',
              fontWeight: 'bold'
            }
          }
        },
        labelLine: {
          normal: {
            show: true
          }
        },
        data: values
      }
    ]
  }
}
