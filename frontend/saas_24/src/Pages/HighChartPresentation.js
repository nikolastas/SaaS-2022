import React from 'react';
import {useState, useEffect, useRef} from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

require("highcharts/modules/exporting")(Highcharts);
require("highcharts/modules/export-data")(Highcharts);


// Needed functions for running the code (react didnt let me module export)
//#region module

//#region demo JSON
let jsonArr = `[
    {
        "DateTime": "2021-12-31T22:45:00.000Z",
        "ResolutionCode": "PT15M",
        "ProductionType": "Fossil Oil",
        "ActualGenerationOutput": 279.14,
        "ActualConsumption": null,
        "UpdateTime": "2022-01-01T00:50:06.000Z",
        "MapCode": "hgdf"
    },
    {
        "DateTime": "2021-12-31T22:30:00.000Z",
        "ResolutionCode": "PT15M",
        "ProductionType": "Fossil Oil",
        "ActualGenerationOutput": 279.14,
        "ActualConsumption": null,
        "UpdateTime": "2022-01-01T00:33:53.000Z",
        "MapCode": "hgdf"
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
//#endregion demo JSON

/**
 * @name FindTypeOfJSON
 * @description Find the type of the json array e.g Agreggation per type
 * @param {jsonObject} json the json array returned from the SQL query
 */
function FindTypeOfJSON (json) {
    if(json.hasOwnProperty('ActualGenerationOutput'))
        return 'ActualGenerationOutput';

    else if(json.hasOwnProperty('TotalLoadValue'))
        return 'TotalLoadValue';

    else
        return 'FlowValue';
}

/**
 * @name DrawChartLine
 * @description Changes the title of the line chart and add the points based on the type of json
 * @param {jsonObject} jsonArr the json array returned from the SQL query
 * @param {string} type_out the type of the json array given
 * @param {Object} chart_area the chart given to manipulate
 */
function DrawChartLine (jsonArr, type_out, chart_line) {

    //change the series name and the legend title
    chart_line.series[0].name = type_out;
    chart_line.legend.allItems[0].update({name:type_out});

    //Agregation per type
    if(type_out == 'ActualGenerationOutput') {
        chart_line.setTitle({text: 'Generation Per Type ('+jsonArr[0]['ProductionType']+') ' +  jsonArr[0]['MapCode']});
        for(let arr of jsonArr) {
            let time = Date.parse(arr['DateTime']);
            let value = arr[type_out] == null ? 0 : arr[type_out];

            let point = [time ,value];
            chart_line.series[0].addPoint(point, true, false);
        }
    }

    // Actual Total Load
    else if(type_out == 'TotalLoadValue') {
        chart_line.setTitle({text: 'Actual Total Load '+ jsonArr[0]['MapCode']});

        for(let arr of jsonArr) {
            let time = Date.parse(arr['Datetime']);
            let value = arr[type_out] == null ? 0 : arr[type_out];

            let point = [time ,value];
            chart_line.series[0].addPoint(point, true, false);
        }
    }

    // Physical flows
    else {
        chart_line.setTitle({text: 'Cross-Border Flows '+jsonArr[0]['InMapCode'] + '->' + jsonArr[0]['OutMapCode']});

        for(let arr of jsonArr) {
            let time = Date.parse(arr['DateTime']);
            let value = arr[type_out] == null ? 0 : arr[type_out];

            let point = [time ,value];
            chart_line.series[0].addPoint(point, true, false);
        }
    }
    chart_line.redraw();
}

/**
 * @name DrawChartArea
 * @description Changes the title of the accumulated area chart and add the points based on the type of json
 * @param {jsonObject} jsonArr the json array returned from the SQL query
 * @param {string} type_out the type of the json array given
 * @param {Object} chart_area the chart given to manipulate
 */
function DrawChartArea (jsonArr, type_out, chart_area) {

    //change the series name
    chart_area.series[0].name = type_out;
    chart_area.legend.allItems[0].update({name:type_out});
    //Agregation per type
    let temp = 0;
    if(type_out == 'ActualGenerationOutput') {
        chart_area .setTitle({text: 'Generation Per Type Accumulated ('+jsonArr[0]['ProductionType']+') ' +  jsonArr[0]['MapCode']});

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
        chart_area.setTitle({text: 'Actual Total Load Accumulated '+ jsonArr[0]['MapCode']});

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
        chart_area.setTitle({text: 'Cross-Border Flows Accumulated '+jsonArr[0]['InMapCode'] + '->' + jsonArr[0]['OutMapCode']});

        for(let arr of jsonArr) {
            let time = Date.parse(arr['DateTime']);
            let value = arr[type_out] == null ? 0 : arr[type_out];

            let point = [time ,value];
            chart_area.series[0].addPoint(point, true, false);
        }
    }

    chart_area.redraw();
}

//#endregion module
const HighchartTest = () => {
    let type_out = FindTypeOfJSON(jsonArr[0]);

    //options for the line chart
    const [optionsLine, setOptionsLine] = useState({
        xAxis: {
            type: 'datetime'
        },
        title: {
            text: ''
        },
        subtitle: {
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
            }]});

    //options for the Area chart
    const [optionsArea, setOptionsArea] = useState({
        chart: {
            type: 'areaspline'
        },
        xAxis: {
            type: 'datetime'
        },
        title: {
            text: ''
        },
        subtitle: {
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
            }]});

    let LastUpdateTime = ''
    // called when refresh is needed
    // MUST be called and when visting the page for the first time

    const Redraw = () => {

        //take the charts from refrenced components
        const chart_line = chartComponent.current?.chart;
        const chart_area = chartComponent2.current?.chart;


        //remove previous data
        chart_line.series[0].setData([]);
        chart_area.series[0].setData([]);

        DrawChartLine(jsonArr, type_out, chart_line);
        DrawChartArea(jsonArr, type_out, chart_area);
        //returns last update time den kserw na to vazw vreite to
        LastUpdateTime = jsonArr[jsonArr.length-1]['UpdateTime'];
    }


    // I love react
    // makes a refence to an html element and binds it to a variable
    // from there we take the chart we need to modify
    const chartComponent = useRef(null);
    const chartComponent2 = useRef(null);

    return (
        <div>
            <HighchartsReact  ref={chartComponent} highcharts={Highcharts} options={optionsLine}/>
            <p>like</p>
            <HighchartsReact  ref={chartComponent2} highcharts={Highcharts} options={optionsArea}/>
            <button onClick={Redraw}>Refresh</button>
            <h1>Last Update Time: {LastUpdateTime}</h1>
        </div>
    );
}

export default HighchartTest;