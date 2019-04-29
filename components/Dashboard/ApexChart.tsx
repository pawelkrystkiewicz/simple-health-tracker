import React from 'react';
import Chart from 'react-apexcharts';

// const ApexLineChart = (props) => {
// 		// 		options: {
// 		// 			chart: {
// 		// 				id: 'basic-bar'
// 		// 			},
// 		// 			xaxis: {
// 		// 				series: [ 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999 ]
// 		// 			}
// 		// 		},
// 		// 		series: [
// 		// 			{
// 		// 				name: 'series-1',
// 		// 				data: [ 30, 40, 45, 50, 49, 60, 70, 91 ]
// 		// 			}
// 		// 		]
// 		// 	};
// 		// }
// 		return ( < Chart options = {props.options}	series = {props.series}	type = {props.type}	width = {props.width} />);
// 		}

class ApexLineChart extends React.Component {

      constructor(props) {
        super(props);
        this.state = {
          selection: 'one_year',
          options: {
            annotations: {
            yaxis: [{
              y: 30,
              borderColor: '#999',
              label: {
                show: true,
                text: 'Support',
                style: {
                  color: "#fff",
                  background: '#00E396'
                }
              }
            }],
            xaxis: [{
              x: new Date('01/01/2019').getTime(),
              borderColor: '#999',
              yAxisIndex: 0,
              label: {
                show: true,
                text: 'Rally',
                style: {
                  color: "#fff",
                  background: '#775DD0'
                }
              }
            }]
          },
          dataLabels: {
            enabled: false
          },
          markers: {
            size: 0,
            style: 'hollow',
          },
          xaxis: {
            type: 'datetime',
            min: new Date('01 Mar 2019').getTime(),
            tickAmount: 6,
          },
          tooltip: {
            x: {
              format: 'dd MMM yyyy'
            }
          },
          fill: {
            type: 'gradient',
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.9,
              stops: [0, 100]
            }
          }
          },
          series: [{data: this.props.chartData}],
        }
      }
      updateData (timeline) {
        this.setState({
          selection: timeline
        })
        
        switch (timeline) {
          case 'one_month':
            this.setState({
              options: {
                xaxis: {
                  min: new Date('28 Jan 2013').getTime(),
                  max: new Date('27 Feb 2013').getTime(),
                }
              }
            })
            break;
          case 'six_months':
            this.setState({
              options: {
                xaxis: {
                  min: new Date('27 Sep 2012').getTime(),
                  max: new Date('27 Feb 2013').getTime(),
                }
              }
            })
            break;
          case 'one_year':
            this.setState({
              options: {
                xaxis: {
                  min: new Date('27 Feb 2012').getTime(),
                  max: new Date('27 Feb 2013').getTime(),
                }
              }
            })
            break;
          case 'ytd':
            this.setState({
              options: {
                xaxis: {
                  min: new Date('01 Jan 2013').getTime(),
                  max: new Date('27 Feb 2013').getTime(),
                }
              }
            })
            break;
          case 'all':
            this.setState({
              options: {
                xaxis: {
                  min: undefined,
                  max: undefined,
                }
              }
            })
            break;
          default:
        }
      }
      render() {
        return (
          <div>
            <div id="chart">
              <div className="toolbar">
                <button onClick={()=>this.updateData('one_month')} id="one_month" className={ (this.state.selection==='one_month' ? 'active' : '')}>1M</button>
                <button onClick={()=>this.updateData('six_months')} id="six_months" className={ (this.state.selection==='six_months' ? 'active' : '')}>6M</button>
                <button onClick={()=>this.updateData('one_year')} id="one_year" className={ (this.state.selection==='one_year' ? 'active' : '')}>1Y</button>
                <button onClick={()=>this.updateData('ytd')} id="ytd" className={ (this.state.selection==='ytd' ? 'active' : '')}>YTD</button>
                <button onClick={()=>this.updateData('all')} id="all" className={ (this.state.selection==='all' ? 'active' : '')}>ALL</button>
              </div>
			  {console.log(this.props.chartData)}
              <Chart options={this.state.options} series={this.state.series} type="area" height="350" />
            </div>
            <div id="html-dist"> 
            </div>
          </div>
        );
      }
    }

		export default ApexLineChart;