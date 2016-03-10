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
        splitLine: {
          show: true
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
        type: 'bar',
        data: datas,
        itemStyle : { normal: {label : {show: false, position: 'insideRight'}} },
      }
    ]
  }
}

export function getRadarOption(labels,datas,unit,kpi) {
  return {
    tooltip: {},
    legend: {
      data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
    },
    radar: {
      // shape: 'circle',
      indicator: [
        { text: '销售（sales）', max: 6500 },
        { text: '管理（Administration）', max: 16000 },
        { text: '信息技术（Information Techology）', max: 30000 },
        { text: '客服（Customer Support）', max: 38000 },
        { text: '研发（Development）', max: 52000 },
        { text: '市场（Marketing）', max: 25000 }
      ]
    },
    series: [{
      name: '预算 vs 开销（Budget vs spending）',
      type: 'radar',
      // areaStyle: {normal: {}},
      data : [
        {
          value : [4300, 10000, 28000, 35000, 50000, 19000],
          name : '预算分配（Allocated Budget）'
        },
        {
          value : [5000, 14000, 28000, 31000, 42000, 21000],
          name : '实际开销（Actual Spending）'
        }
      ]
    }]
  }
}
