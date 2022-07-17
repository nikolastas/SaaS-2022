import React from 'react';
// import {useState, useEffect, useRef} from 'react';
// import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

require("highcharts/modules/exporting")(Highcharts);
require("highcharts/modules/export-data")(Highcharts);

require("highcharts/modules/exporting")(Highcharts);
require("highcharts/modules/export-data")(Highcharts);


// Needed functions for running the code (react didnt let me module export)
//#region module


/**
 * @name FindTypeOfJSON
 * @description Find the type of the json array e.g Agreggation per type
 * @param {jsonObject} json the json array returned from the SQL query
 */
export function FindTypeOfJSON(json) {
    if (json.hasOwnProperty('ActualGenerationOutput'))
        return 'ActualGenerationOutput';

    else if (json.hasOwnProperty('TotalLoadValue'))
        return 'TotalLoadValue';

    else
        return 'FlowValue';
}

/**
 * @name DrawChartLine
 * @description Changes the title of the line chart and add the points based on the type of json
 * @param {jsonObject} jsonArr the json array returned from the SQL query
 * @param {string} type_out the type of the json array given
 * @param {Object} chart_line the chart given to manipulate
 */
export function DrawChartLine(jsonArr, type_out, chart_line) {

    //change the series name and the legend title
    chart_line.series[0].name = type_out;
    chart_line.legend.allItems[0].update({name: type_out});

    //Agregation per type
    if (type_out === 'ActualGenerationOutput') {
        chart_line.setTitle({text: 'Generation Per Type (' + jsonArr[0]['ProductionType'] + ') ' + jsonArr[0]['MapCode']});
        for (let arr of jsonArr) {
            let time = Date.parse(arr['DateTime']);
            let value = arr[type_out] == null ? 0 : arr[type_out];

            let point = [time, value];
            chart_line.series[0].addPoint(point, true, false);
        }
    }

    // Actual Total Load
    else if (type_out === 'TotalLoadValue') {
        chart_line.setTitle({text: 'Actual Total Load ' + jsonArr[0]['MapCode']});

        for (let arr of jsonArr) {
            let time = Date.parse(arr['Datetime']);
            let value = arr[type_out] == null ? 0 : arr[type_out];

            let point = [time, value];
            chart_line.series[0].addPoint(point, true, false);
        }
    }

    // Physical flows
    else {
        chart_line.setTitle({text: 'Cross-Border Flows ' + jsonArr[0]['InMapCode'] + '->' + jsonArr[0]['OutMapCode']});

        for (let arr of jsonArr) {
            let time = Date.parse(arr['DateTime']);
            let value = arr[type_out] == null ? 0 : arr[type_out];

            let point = [time, value];
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
export function DrawChartArea(jsonArr, type_out, chart_area) {

    //change the series name
    chart_area.series[0].name = type_out;
    chart_area.legend.allItems[0].update({name: type_out});
    //Agregation per type
    let temp = 0;
    if (type_out === 'ActualGenerationOutput') {
        chart_area.setTitle({text: 'Generation Per Type Accumulated (' + jsonArr[0]['ProductionType'] + ') ' + jsonArr[0]['MapCode']});

        for (let arr of jsonArr) {
            let time = Date.parse(arr['DateTime']);
            let value = (arr[type_out] == null ? 0 : arr[type_out]);
            temp += value;

            let point = [time, temp];
            chart_area.series[0].addPoint(point, true, false);
        }
    }

    // Actual Total Load
    else if (type_out === 'TotalLoadValue') {
        chart_area.setTitle({text: 'Actual Total Load Accumulated ' + jsonArr[0]['MapCode']});

        for (let arr of jsonArr) {
            let time = Date.parse(arr['Datetime']);
            let value = (arr[type_out] == null ? 0 : arr[type_out]);
            temp += value;

            let point = [time, temp];
            chart_area.series[0].addPoint(point, true, false);
        }
    }

    // Physical flows
    else {
        chart_area.setTitle({text: 'Cross-Border Flows Accumulated ' + jsonArr[0]['InMapCode'] + '->' + jsonArr[0]['OutMapCode']});

        for (let arr of jsonArr) {
            let time = Date.parse(arr['DateTime']);
            let value = arr[type_out] == null ? 0 : arr[type_out];

            let point = [time, value];
            chart_area.series[0].addPoint(point, true, false);
        }
    }

    chart_area.redraw();
}

//#endregion module

export default ()=>{};
// module.exports = {
//     DrawChartLine : DrawChartLine,
//     DrawChartArea : DrawChartArea
// }