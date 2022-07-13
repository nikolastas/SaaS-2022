let jsonArr = `[
    {
        "DateTime": "2021-12-31T22:00:00.000Z",
        "ResolutionCode": "PT60M",
        "ProductionType": "Biomass",
        "ActualGenerationOutput": 223.8,
        "ActualConsumption": null,
        "UpdateTime": "2022-01-04T14:22:16.000Z",
        "MapCode": "BE"
    },
    {
        "DateTime": "2021-12-31T22:00:00.000Z",
        "ResolutionCode": "PT60M",
        "ProductionType": "Fossil Gas",
        "ActualGenerationOutput": 1076.08,
        "ActualConsumption": null,
        "UpdateTime": "2022-01-04T14:22:16.000Z",
        "MapCode": "BE"
    },
    {
        "DateTime": "2021-12-31T22:00:00.000Z",
        "ResolutionCode": "PT60M",
        "ProductionType": "Fossil Oil",
        "ActualGenerationOutput": 0,
        "ActualConsumption": null,
        "UpdateTime": "2022-02-04T06:49:02.000Z",
        "MapCode": "BE"
    },
    {
        "DateTime": "2021-12-31T22:00:00.000Z",
        "ResolutionCode": "PT60M",
        "ProductionType": "Hydro Pumped Storage",
        "ActualGenerationOutput": null,
        "ActualConsumption": 895.08,
        "UpdateTime": "2022-02-22T07:35:08.000Z",
        "MapCode": "BE"
    },
    {
        "DateTime": "2021-12-31T22:00:00.000Z",
        "ResolutionCode": "PT60M",
        "ProductionType": "Hydro Run-of-river and poundage",
        "ActualGenerationOutput": 6.37,
        "ActualConsumption": null,
        "UpdateTime": "2022-02-03T14:28:18.000Z",
        "MapCode": "BE"
    },
    {
        "DateTime": "2021-12-31T22:00:00.000Z",
        "ResolutionCode": "PT60M",
        "ProductionType": "Nuclear",
        "ActualGenerationOutput": 5967.35,
        "ActualConsumption": null,
        "UpdateTime": "2022-01-04T14:22:15.000Z",
        "MapCode": "BE"
    },
    {
        "DateTime": "2021-12-31T22:00:00.000Z",
        "ResolutionCode": "PT60M",
        "ProductionType": "Other",
        "ActualGenerationOutput": 455.77,
        "ActualConsumption": null,
        "UpdateTime": "2022-01-12T06:54:13.000Z",
        "MapCode": "BE"
    },
    {
        "DateTime": "2021-12-31T22:00:00.000Z",
        "ResolutionCode": "PT60M",
        "ProductionType": "Solar",
        "ActualGenerationOutput": 0,
        "ActualConsumption": null,
        "UpdateTime": "2022-01-01T01:03:07.000Z",
        "MapCode": "BE"
    },
    {
        "DateTime": "2021-12-31T22:00:00.000Z",
        "ResolutionCode": "PT60M",
        "ProductionType": "Waste",
        "ActualGenerationOutput": 252.45,
        "ActualConsumption": null,
        "UpdateTime": "2022-01-04T14:22:15.000Z",
        "MapCode": "BE"
    },
    {
        "DateTime": "2021-12-31T22:00:00.000Z",
        "ResolutionCode": "PT60M",
        "ProductionType": "Wind Offshore",
        "ActualGenerationOutput": 1453.92,
        "ActualConsumption": null,
        "UpdateTime": "2022-02-20T02:21:26.000Z",
        "MapCode": "BE"
    },
    {
        "DateTime": "2021-12-31T22:00:00.000Z",
        "ResolutionCode": "PT60M",
        "ProductionType": "Wind Onshore",
        "ActualGenerationOutput": 408.33,
        "ActualConsumption": null,
        "UpdateTime": "2022-02-22T07:35:36.000Z",
        "MapCode": "BE"
    }
]`;

jsonArr = JSON.parse(jsonArr)

//get the type of the chart
value_out = Object.keys(jsonArr[0])[3];

chart = Highcharts.chart('container', {
    xAxis: {
        type: 'datetime'
    },
    title: {
    	text: jsonArr[0]['MapCode'] + ' ' + value_out
    },
    series: [
    {
    		name: value_out,
        data: []
    }]
});

// value_out is one of the three types e.g. ActualGenerationOutput
function DrawChart (value_out) {
	for(let arr of jsonArr) 
  {
    let time = arr['UpdateTime'];
    let value = arr[value_out] == null ? 0 : arr[value_out];

    let point = [time , value];
    chart.series[0].addPoint(point, true, false);
  }
  chart.redraw();
}

function ChangeChart(value_out) {
  chart.setTitle({text: jsonArr[0]['MapCode'] + ' ' + value_out });
  
  //redraw Chart
  chart.series[0].setData([]);
  DrawChart(value_out);
}

DrawChart(value_out);

