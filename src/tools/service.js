/**
 * Created by liekkas on 16/3/3.
 */

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
          color: '#000'
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
//          borderColor: '#000',
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
            color: '#000',
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
            color: '#000',
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

export function getMultiOption(labels,datas1,datas2,unit,kpi) {
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
//        lineStyle: {
//          color: '#000'
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
      data: ['直播','点播']
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
//          borderColor: '#000',
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
            color: '#000',
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
            color: '#000',
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
    series: [
      {
        name: '直播',
        type: 'bar',
        areaStyle: {
          normal: {
            color: 'rgba(128, 128, 128, 0.2)'
          }
        },
        smooth: true,
        data: datas1,
//        markPoint : {
//          data : [
//            {type : 'max', name: '最大值'},
//            {type : 'min', name: '最小值'}
//          ]
//        },
//        markLine : {
//          data : [
//            {
//              type : 'average',
//              name: '平均值',
//              label: {
//                normal: {
////                  color: '#00ff00'
//                }
//              },
//            }
//          ],
//          lineStyle: {
//            normal: {
////              color: '#00ff00'
//            }
//          },
//          label: {
//            normal: {
//              formatter: '{c}' + unit
//            }
//          },
//
//        },
      },
      {
        name: '点播',
        type: 'bar',
        areaStyle: {
          normal: {
            color: 'rgba(128, 128, 128, 0.2)'
          }
        },
        smooth: true,
        data: datas2,
//        markPoint : {
//          data : [
//            {type : 'max', name: '最大值'},
//            {type : 'min', name: '最小值'}
//          ]
//        },
//        markLine : {
//          data : [
//            {
//              type : 'average',
//              name: '平均值',
//              label: {
//                normal: {
////                  color: '#00ff00'
//                }
//              },
//            }
//          ],
//          lineStyle: {
//            normal: {
////              color: '#00ff00'
//            }
//          },
//          label: {
//            normal: {
//              formatter: '{c}' + unit
//            }
//          },
//
//        },
      }
    ]
  }
}
