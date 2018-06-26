
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main1'));   
    alert("1111");
    option = {
            title: {      //标题组件
                text: '集群下JOB通过率',
                textBaseline :"top",
                x:'center'
            },
            grid: {       //直角坐标系内绘图网格
            	top:'10%',
                left: '3%',
                right: '4%',
                bottom: '30px',
                containLabel: true
            },
    	    legend: {
    	        bottom: '5px',
    	        data: ['qa-visual-test-arch','qa-visual-test-arch2']
    	    },
            toolbox: {     //工具栏
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {       //直角坐标系 grid 中的 x 轴
                type: 'category',
                boundaryGap: false,
                data: []
            },
            yAxis: {       //直角坐标系 grid 中的 y 轴
                type: 'value',
                axisLabel: {
                    formatter: '{value} %'
                }
            },
            series: []

        };
    myChart.setOption(option);
     
