//npm install it plz
import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official'; //hopium to not be needed


//demo json array
let jsonArr = `[
    {
        "DateTime": "2021-12-31T22:45:00.000Z",
        "ResolutionCode": "PT15M",
        "ProductionType": "Fossil Oil",
        "ActualGenerationOutput": 279.14,
        "ActualConsumption": null,
        "UpdateTime": "2022-01-01T00:50:06.000Z",
        "MapCode": "DE"
    },
    {
        "DateTime": "2021-12-31T22:30:00.000Z",
        "ResolutionCode": "PT15M",
        "ProductionType": "Fossil Oil",
        "ActualGenerationOutput": 279.14,
        "ActualConsumption": null,
        "UpdateTime": "2022-01-01T00:33:53.000Z",
        "MapCode": "DE"
    },
    {
        "DateTime": "2021-12-31T22:15:00.000Z",
        "ResolutionCode": "PT15M",
        "ProductionType": "Fossil Oil",
        "ActualGenerationOutput": 279.14,
        "ActualConsumption": null,
        "UpdateTime": "2022-01-01T00:19:29.000Z",
        "MapCode": "DE"
    },
    {
        "DateTime": "2021-12-31T22:00:00.000Z",
        "ResolutionCode": "PT15M",
        "ProductionType": "Fossil Oil",
        "ActualGenerationOutput": 279.14,
        "ActualConsumption": null,
        "UpdateTime": "2022-01-01T00:13:06.000Z",
        "MapCode": "DE"
    }
]`;

jsonArr = JSON.parse(jsonArr)


//returns the type of the json (used in Draw functions)
function FindTypeOfJSON (json) {
    if(json.hasOwnProperty('ActualGenerationOutput'))
        return 'ActualGenerationOutput';
    
    else if(json.hasOwnProperty('TotalLoadValue'))
        return 'TotalLoadValue';
    
    else
        return 'FlowValue';
}

// the type of the value rendered e.g Aggregation per type
type_out = FindTypeOfJSON(jsonArr[0])

// basic chart implementation
let chart_line = new Highcharts.chart('chart_line', {
    xAxis: {
        type: 'datetime'
    },
    title: {
    	text: ''
    },
    series: [
    {
    	name: type_out,
        data: []
    }]
});

//area chart implementation
let chart_area = new Highcharts.chart('chart_area', {
    chart: {
        type: 'areaspline'
    },
    xAxis: {
        type: 'datetime'
    },
    title: {
    	text: ''
    },
    credits: {
        enabled: false
    },
    plotOptions: {
        areaspline: {
            fillOpacity: 0.5
        }
    },
    series: [
    {
    	name: type_out,
        data: []
    }]
});

/*
* input: jsonArr == our sql generated json
*        type_out == same as explained above
*/
function DrawChartLine (jsonArr, type_out) {
	//Agregation per type
    if(type_out == 'ActualGenerationOutput') {
        chart_line.setTitle({text: 'Actual Generation Output  from ' +  jsonArr[0]['MapCode']});
        
        for(let arr of jsonArr) {
            let time = Date.parse(arr['DateTime']);
            let value = arr[type_out] == null ? 0 : arr[type_out];
    
            let point = [time ,value];
            chart_line.series[0].addPoint(point, true, false);
        }
    }

    // Actual Total Load
    else if(type_out == 'TotalLoadValue') {
        chart_line.setTitle({text: 'Actual Total Load  from ' +jsonArr[0]['InMapCode'] + ' to ' + jsonArr[0]['OutMapCode']});

        for(let arr of jsonArr) {
            let time = Date.parse(arr['Datetime']);
            let value = arr[type_out] == null ? 0 : arr[type_out];
    
            let point = [time ,value];
            chart_line.series[0].addPoint(point, true, false);
        }
    }

    // Physical flows
    else {
       	chart_line.setTitle({text: 'Physical Flows of'});
        
        for(let arr of jsonArr) {
            let time = Date.parse(arr['DateTime']);
            let value = arr[type_out] == null ? 0 : arr[type_out];
    
            let point = [time ,value];
            chart_line.series[0].addPoint(point, true, false);
        }
    }
  chart_line.redraw();
}

function DrawChartArea (jsonArr, type_out) {
	//Agregation per type
    let temp = 0;
    if(type_out == 'ActualGenerationOutput') {
        chart_area.setTitle({text: 'Actual Generation Output accumulated from ' +  jsonArr[0]['MapCode']});
        
        for(let arr of jsonArr) {
            let time = Date.parse(arr['DateTime']);
            let value = (arr[type_out] == null ? 0 : arr[type_out]);
    				temp += value;
    
            let point = [time ,temp];
            chart_area.series[0].addPoint(point, true, false);
        }
    }

    // Actual Total Load
    else if(type_out == 'TotalLoadValue') {
        chart_area.setTitle({text: 'Actual Total Load  accumulated from ' +jsonArr[0]['InMapCode'] + ' to ' + jsonArr[0]['OutMapCode']});
        
        for(let arr of jsonArr) {
            let time = Date.parse(arr['Datetime']);
            let value = (arr[type_out] == null ? 0 : arr[type_out]);
    				temp += value;
    
            let point = [time ,temp];
            chart_area.series[0].addPoint(point, true, false);
        }
    }

    // Physical flows
    else {
       	chart_area.setTitle({text: 'Physical Flows  accumulated'});
        
        for(let arr of jsonArr) {
            let time = Date.parse(arr['DateTime']);
            let value = arr[type_out] == null ? 0 : arr[type_out];
    
            let point = [time ,value];
            chart_area.series[0].addPoint(point, true, false);
        }
    }
  chart_area.redraw();
}


// the type of the search e.g Agregation per type
// // TODO: use it in search
// type_out = FindTypeOfJSON(jsonArr[0])
// DrawChartLine(jsonArr, type_out);
// DrawChartArea(jsonArr, type_out);

module.exports = {DrawChartArea, DrawChartLine, chart_line, chart_area};