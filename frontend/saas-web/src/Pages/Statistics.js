import {memo, React, useState} from "react";
import { Navigate } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Select from "react-select";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Statistics = () =>{
    const [operator,setOperator] = useState('')
    const [station, setStation] = useState(0)
    const [datefrom, setDatefrom] = useState('')
    const [dateto, setDateto] = useState('')
    const [dropdownop,setDropdownop] = useState([])
    const [disp_style,setDispstyle] = useState(0);
    const [display,setDisplay] =  useState({
        Providers: [],
        Debts: [],
        Passes: [],
        Colors:[]
    })
    
    if(sessionStorage.getItem('auth') != 'true' || sessionStorage.getItem('level') < '2')
        return <Navigate to = "/home"/>


    
    const CHART_COLORS = {
        red: 'rgb(255, 99, 132)',
        orange: 'rgb(255, 159, 64)',
        yellow: 'rgb(255, 205, 86)',
        green: 'rgb(75, 192, 192)',
        blue: 'rgb(54, 162, 235)',
        purple: 'rgb(153, 102, 255)',
        grey: 'rgb(201, 203, 207)'
      };

    
    
    

    const providers = ['AO','GF' ,'EG', 'KO', 'MR', 'NE','OO']
    const stations = {
        'AO':20,
        'GF':1,
        'EG':13,
        'KO':10,
        'MR':9,
        'NE':17,
        'OO':14
    }

    function DropdownProviders(){
        var rows = [];
        for(var i=0; i<providers.length; i++){
            rows.push({value : providers[i], label:providers[i]})
        }
        return rows
    } 

    function DropDownStation(prov){
        var rows = []
        for(var i=0; i<stations[prov]; i++){
            if(i < 10) rows.push({value : '0'+i, label:'0'+i})
            else rows.push({value : i, label: i})
        }
        return rows
    }

    const HandleOperatorChange = (e)=>{
        setOperator(e);
        setDropdownop(DropDownStation(e.value))
    }

    const HandleStationChange = (e)=>{
        setStation(e);
    }

    const HandleDatefromChange = (e)=>{
        setDatefrom(e.target.value.replace("-","").replace("-",""));
    }
    

    const HandleDatetoChange = (e)=>{
        setDateto(e.target.value.replace("-","").replace("-",""));
    }

    const requestOptions = {
        method: 'GET',
        mode: 'cors',
        credentials : "include",
    };

    const handleStats = () =>{
        fetch(`https://localhost:9103/interoperability/api/statsperstation/${operator.value+station.value}/${datefrom}/${dateto}/`,requestOptions)
        .then(data => { 
            return data.json();
        })
        .then(data => {
            let tempprov = []
            let tempdebts = []
            let temppass = []
            let tempcolor = []
            for(var key = 0; key<data.PPOList.length; key++){
                tempprov.push(data.PPOList[key].TagProvider)
                tempdebts.push(data.PPOList[key].ProviderDebt)
                temppass.push(data.PPOList[key].ProviderPasses)
                const colorIndex = key % Object.keys(CHART_COLORS).length;
                tempcolor.push(Object.values(CHART_COLORS)[colorIndex]);
            }
            setDisplay ({
                Providers: tempprov,
                Debts: tempdebts,
                Passes: temppass,
                Colors: tempcolor
            })
        })
    }

    const HandleDispStyleChange = (e)=>{
        setDispstyle(e);
    }

    const data_debts = {
        labels: display.Providers,
        datasets: [
          {
            label: "Cost of Debt",
            data: display.Debts,
            
            backgroundColor: display.Colors,
            borderWidth: 1
          }
        ]
      };

    const data_passes = {
        labels: display.Providers,
        datasets: [
          {
            label: "# of Passes",
            data: display.Passes,
            
            backgroundColor: display.Colors,
            borderWidth: 1
          }
        ]
    };


    const disp_options = [
        {value: 0, label: 'Doughnut'},
        {value: 1, label: 'Table'}
    ]

    const selected_opr = DropdownProviders();

    const TableRow = (props)=>{
        return (
            <tr>
                <td>{props.row[0]}</td>
                <td>{props.row[1]}</td>
                <td>{props.row[2]}</td>
            </tr>
        )
    }


    function Disp(props){
        if(display.Providers.length==0)
            return null

        if(disp_style.value == 0){
            return (
                <div className="container">
                    <div className="item">
                        <h3 style ={{textAlign:'center', textDecoration:'underline'}}>Debts</h3>
                        <Doughnut data={props.debts}/>
                    </div>
                    <div className="item">
                        <h3 style ={{textAlign:'center', textDecoration:'underline'}}>Passes</h3>
                        <Doughnut data={props.passes}/>
                    </div>
                </div>
            );
        }

        if(disp_style.value==1){
            let rows = []
            for(var i = 0; i<display.Providers.length; i++){
                rows.push([display.Providers[i],display.Debts[i],display.Passes[i]])
            }
            return(
                <>
                <h3 style ={{textAlign:'center', textDecoration:'underline'}}>Statistics</h3>
                <table>
                    <tbody>
                        <tr key = 'vaggelis'>
                            <th>Operator</th>
                            <th>Debt</th>
                            <th>Passes</th>
                        </tr>
                        {rows.map(row => <TableRow row={row}/>)}
                    </tbody>
                </table>                
                </>
            )
        }
    }

    return (
        <>
            <div className="center">
                <Select placeholder = "Operator" options={selected_opr} onChange={HandleOperatorChange} value={operator}/>
                <Select placeholder="Station" options={dropdownop} onChange={HandleStationChange} value={station}/>
                <Select placeholder="Display type" options={disp_options} onChange={HandleDispStyleChange} value = {disp_style}/>
                <label>Pick Starting Date</label><br/>
                <input type="date" name = "fromDate" onChange={HandleDatefromChange}/><br/><br/>
                <label>Pick Ending Date</label><br/>
                <input type="date" name = "toDate" onChange={HandleDatetoChange}/><br/><br/>
                <button className="button button2" onClick={handleStats}>Submit Request</button>
            </div>
            <Disp passes={data_passes} debts={data_debts} />
            <div className="space"></div>
        </>
    )   
    
}

export default Statistics;