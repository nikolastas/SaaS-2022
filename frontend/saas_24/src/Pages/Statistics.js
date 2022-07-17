// import React from 'react'
// // import {useState, useEffect} from "react";
// import Select from "react-select";
// import DatePicker from "react-date-picker";
// import {useState, useEffect, useRef} from 'react';
// import HighchartsReact from 'highcharts-react-official';
// import {FindTypeOfJSON, DrawChartLine, DrawChartArea} from './HighChartPresentation'
// import Highcharts from "highcharts";
//
//
// require("highcharts/modules/exporting")(Highcharts);
// require("highcharts/modules/export-data")(Highcharts);
//
// require("highcharts/modules/exporting")(Highcharts);
// require("highcharts/modules/export-data")(Highcharts);
//
// const Statistics = () => {
//     const login = () => {
//         window.location.href = "/login";
//     }
//
//     let fetchInterval = 2000 // 2 seconds.
//
//     let [prevdata, setPrevData] = useState("")
//
//     let [selval1, setSelval1] = useState({
//         value: -1
//     });
//     let [selval2, setSelval2] = useState({
//         value: -1
//     });
//     let [selval3, setSelval3] = useState({
//         value: -1
//     });
//
//     let [link, setLink] = useState("")
//     let [options, setOptions] = useState({})
//     let [flag, setFlag] = useState(false);
//
//     // let [data, setData] = useState("")
//
//     const disp_options = [
//         {value: 1, label: 'Generation per type'},
//         {value: 0, label: 'Actual total load'},
//         {value: 2, label: 'Cross border flows'}
//     ]
//
//     const Countries = [
//         {value: "AL", label: "Albania"},
//         {value: "AM", label: "Armenia"},
//         {value: "AT", label: "Austria"},
//         {value: "AZ", label: "Azerbaijan"},
//         {value: "BA", label: "Bosnia and Herzegovina"},
//         {value: "BE", label: "Belgium"},
//         {value: "BG", label: "Bulgaria"},
//         {value: "BY", label: "Belarus"},
//         {value: "CH", label: "Switzerland"},
//         {value: "CY", label: "Cyprus"},
//         {value: "CZ", label: "Czechia"},
//         {value: "DE", label: "Germany"},
//         {value: "DK", label: "Denmark"},
//         {value: "EE", label: "Estonia"},
//         {value: "ES", label: "Spain"},
//         {value: "FI", label: "Finland"},
//         {value: "FR", label: "France"},
//         {value: "GB", label: "United Kingdom"},
//         {value: "GE", label: "Georgia"},
//         {value: "GR", label: "Greece"},
//         {value: "HR", label: "Croatia"},
//         {value: "HU", label: "Hungary"},
//         {value: "IE", label: "Ireland"},
//         {value: "IT", label: "Italy"},
//         {value: "LT", label: "Lithuania"},
//         {value: "LU", label: "Luxembourg"},
//         {value: "LV", label: "Latvia"},
//         {value: "MD", label: "Moldova"},
//         {value: "ME", label: "Montenegro"},
//         {value: "MK", label: "North Macedonia"},
//         {value: "MT", label: "Malta"},
//         {value: "NL", label: "Netherlands"},
//         {value: "NO", label: "Norway"},
//         {value: "PL", label: "Poland"},
//         {value: "PT", label: "Portugal"},
//         {value: "RO", label: "Romania"},
//         {value: "RS", label: "Serbia"},
//         {value: "RU", label: "Russia"},
//         {value: "SE", label: "Sweden"},
//         {value: "SI", label: "Slovenia"},
//         {value: "SK", label: "Slovakia"},
//         {value: "TR", label: "Turkey"},
//         {value: "UA", label: "Ukraine"},
//         {value: "XK", label: "Kosovo"}
//     ]
//
//     const ProdTypes = [
//         {value: 'Bi', label: 'Biomass'},
//         {value: 'Fo', label: 'Fossil Brown coal/Lignite'},
//         {value: 'Fo', label: 'Fossil Coal-derived gas'},
//         {value: 'Fo', label: 'Fossil Gas'},
//         {value: 'Fo', label: 'Fossil Hard coal'},
//         {value: 'Fo', label: 'Fossil Oil'},
//         {value: 'Fo', label: 'Fossil Oil shale'},
//         {value: 'Fo', label: 'Fossil Peat'},
//         {value: 'Ge', label: 'Geothermal'},
//         {value: 'Hy', label: 'Hydro Pumped Storage'},
//         {value: 'Hy', label: 'Hydro Run-of-ri{ver and poundage'},
//         {value: 'Hy', label: 'Hydro Water Reser{voir'},
//         {value: 'Ma', label: 'Marine'},
//         {value: 'Nu', label: 'Nuclear'},
//         {value: 'Ot', label: 'Other'},
//         {value: 'Ot', label: 'Other renewable'},
//         {value: 'So', label: 'Solar'},
//         {value: 'Wa', label: 'Waste'},
//         {value: 'Wi', label: 'Wind Offshore'},
//         {value: 'Wi', label: 'Wind Onshore'}
//     ]
//
//     const HandleFirstSel = (e) => {
//         setSelval1(e);
//         setSelval2({
//             value: -1
//         });
//         setSelval3({
//             value: -1
//         });
//         setMsg2(<></>);
//         setMsg3(<></>);
//     }
//     const HandleSecSel = (e) => {
//         setSelval2(e);
//     }
//
//     const HandleThirdSel = (e) => {
//         setSelval3(e);
//     }
//
//     const HandleGeneratedType = (e) => {
//         setSelval3(e);
//     }
//
//
//     let [msg1, setMsg1] = useState(
//         <>
//             <h1>Select an option to display the data</h1>
//             <Select placeholder="Data to display" options={disp_options} onChange={HandleFirstSel}/>
//         </>
//     )
//
//     let [msg2, setMsg2] = useState(<p>Please select above</p>)
//     let [msg3, setMsg3] = useState(<p>Please select above</p>)
//     let [msg4, setMsg4] = useState(true)
//     // let [data, setData] = useState([])
//     let [date, setDate] = useState(new Date())
//
//
//     let token = sessionStorage.getItem('authentication');
//     // console.log(token)
//
//
//     //let type_out = FindTypeOfJSON(jsonArr[0]);
//     let type_out = 'TotalLoadValue';
//     //options for the line chart
//     const [optionsLine, setOptionsLine] = useState({
//         chart: {
//             animation: false,
//             spacingTop: 20,
//             spacingBottom: 20,
//             spacingLeft: 80,
//             spacingRight: 80
//         },
//
//         xAxis: {
//             type: 'datetime'
//         },
//         title: {
//             text: ''
//         },
//         subtitle: {
//             text: ''
//         },
//         credits: {
//             enabled: false
//         },
//         plotOptions: {
//             areaspline: {
//                 fillOpacity: 0.5
//             }
//         },
//         series: [
//             {
//                 name: type_out,
//                 data: []
//             }]
//     });
//
//     //options for the Area chart
//     const [optionsArea, setOptionsArea] = useState({
//         chart: {
//             type: 'areaspline',
//             animation: false,
//             spacingTop: 20,
//             spacingBottom: 20,
//             spacingLeft: 80,
//             spacingRight: 80
//         },
//         xAxis: {
//             type: 'datetime'
//         },
//         title: {
//             text: ''
//         },
//         subtitle: {
//             text: ''
//         },
//         credits: {
//             enabled: false
//         },
//         plotOptions: {
//             areaspline: {
//                 fillOpacity: 0.5
//             },
//         },
//         series: [
//             {
//                 name: type_out,
//                 data: []
//             }]
//     });
//
//     let LastUpdateTime = ''
//     // called when refresh is needed
//     // MUST be called and when visting the page for the first time
//
//
//     const Redraw = (jsonArr) => {
//         let type_out = FindTypeOfJSON(jsonArr[0]);
//         //take the charts from refrenced components
//
//         const chart_line = chartComponent.current?.chart;
//         const chart_area = chartComponent2.current?.chart;
//
//         //remove previous data
//         chart_line.series[0].setData([]);
//         chart_area.series[0].setData([]);
//
//
//         DrawChartLine(jsonArr, type_out, chart_line);
//         DrawChartArea(jsonArr, type_out, chart_area);
//         //returns last update time den kserw na to vazw vreite to
//         LastUpdateTime = jsonArr[jsonArr.length - 1]['UpdateTime'];
//     }
//
//
//     // I love react
//     // makes a refence to an html element and binds it to a variable
//     // from there we take the chart we need to modify
//     const chartComponent = useRef(null);
//     const chartComponent2 = useRef(null);
//
//     useEffect(() => {
//
//
//             if (token === undefined || token === null) {
//                 sessionStorage.removeItem("authentication")
//                 login()
//
//             }
//
//             // let options = {}
//
//             if (selval1.value === 0) {
//                 setMsg2(
//                     <>
//                         <h1>Select Country</h1>
//                         <Select placeholder="Country" options={Countries} onChange={HandleSecSel}/>
//                     </>
//                 )
//                 setMsg3(
//                     <></>
//                 )
//             }
//             if (selval1.value === 1) {
//                 setMsg2(
//                     <>
//                         <h1>Select Country</h1>
//                         <Select placeholder="Country" options={Countries} onChange={HandleSecSel}/>
//                     </>
//                 )
//                 setMsg3(
//                     <>
//                         <h1>Select Generation Type</h1>
//                         <Select placeholder="Generation Type" options={ProdTypes} onChange={HandleGeneratedType}/>
//                     </>
//                 )
//             }
//             if (selval1.value === 2) {
//                 setMsg2(
//                     <>
//                         <h1>Select Country (from)</h1>
//                         <Select placeholder="Country (from)" options={Countries} onChange={HandleSecSel}/>
//                     </>
//                 )
//                 setMsg3(
//                     <>
//                         <h1>Select Country (to)</h1>
//                         <Select placeholder="Country (to)" options={Countries} onChange={HandleThirdSel}/>
//                     </>
//                 )
//             }
//             console.log(selval1.value + " " + selval2.value + " " + selval3.value + " " + date.toISOString().slice(0, 19).replace('T', ' '))
//
//
//             //setLink("")
//
//             if (selval1.value === 0 && selval2.value !== -1) {
//                 console.log(0)
//                 setOptions({
//                     method: "post",
//                     cache: "no-cache",
//                     credentials: "same-origin",
//                     headers: {
//                         'Content-Type': 'application/x-www-form-urlencoded',
//                         'authentication': token
//                     },
//                     body: new URLSearchParams({
//                         'MapCode': selval2.value,
//                         'Date': date.toISOString().slice(0, 19).replace('T', ' ')
//                     })
//                 })
//
//                 setLink('http://localhost:8084/data_fetch/Total')
//
//             } else if (selval1.value === 1 && selval2.value !== -1 && selval3.value !== -1) {
//                 console.log(1)
//                 setOptions({
//                     method: "post",
//                     cache: "no-cache",
//                     credentials: "same-origin",
//                     headers: {
//                         'Content-Type': 'application/x-www-form-urlencoded',
//                         'authentication': token
//                     },
//                     body: new URLSearchParams({
//                         'MapCode': selval2.value,
//                         'Date': date.toISOString().slice(0, 19).replace('T', ' '),
//                         'ProductionType': selval3.label
//                     })
//                 })
//                 setLink('http://localhost:8082/data_fetch/Aggr')
//
//             } else if (selval1.value === 2 && selval2.value !== -1 && selval3.value !== -1) {
//                 console.log(2)
//                 setOptions({
//                     method: "post",
//                     cache: "no-cache",
//                     credentials: "same-origin",
//                     headers: {
//                         'Content-Type': 'application/x-www-form-urlencoded',
//                         'authentication': token
//                     },
//                     body: new URLSearchParams({
//                         'InMapCode': selval2.value,
//                         'Date': date.toISOString().slice(0, 19).replace('T', ' '),
//                         'OutMapCode': selval3.value
//                     })
//                 })
//                 setLink('http://localhost:8083/data_fetch/Physical')
//             }
//             //console.log(options.body.get('MapCode'))
//
//
//             if (link !== "") {
//                 // console.log(options.body.Date)
//                 // setExecuting(true)
//                 fetch(link, options)
//                     .then(r => {
//                         if (!r.ok) setMsg4(true); else setMsg4(false);
//                         return r
//                     })
//                     .then(r => r.json())
//                     .then(d => {
//                         //console.log("mesa :"+ options.body.get('MapCode')
//
//                         if (JSON.stringify(d) !== JSON.stringify(prevdata)) {
//                             Redraw(d)
//                             // setData(d)
//                             setPrevData(d)
//                             //console.log(prevdata[1])
//                         }
//
//                         //console.log("el")
//
//                     })
//                     .catch((e) => {
//                         console.log(e);
//                     })
//                 // setExecuting(false)
//             } else {
//                 setMsg4(true)
//             }
//
//             const interval = setInterval(() => {
//                 setFlag(!flag);
//             }, fetchInterval)
//
//             return () => clearInterval(interval)
//         }, [flag, selval1, selval2, selval3, link, prevdata, date, token]
//     )
//
//     return (
//         <>
//             <div align={"central"}>
//                 <DatePicker selected={date} onChange={(date) => setDate(date)} value={date}/>
//                 {msg1}
//                 {msg2}
//                 {msg3}
//             </div>
//
//             <div hidden={msg4}>
//                 <HighchartsReact ref={chartComponent} highcharts={Highcharts} options={optionsLine}/>
//                 <p>like</p>
//                 <HighchartsReact ref={chartComponent2} highcharts={Highcharts} options={optionsArea}/>
//                 <h1>Last Update Time: {LastUpdateTime}</h1>
//             </div>
//
//         </>
//     )
// }
//
// export default Statistics