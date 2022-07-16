import React from 'react'
import {useState, useEffect} from "react";
import Select from "react-select";
import DatePicker from "react-date-picker";

const Statistics = () => {

    let [selval1, setSelval1] = useState({
        value: -1
    });
    let [selval2, setSelval2] = useState({
        value: -1
    });
    let [selval3, setSelval3] = useState({
        value: -1
    });

    const disp_options = [
        {value: 1, label: 'Generation per type'},
        {value: 0, label: 'Actual total load'},
        {value: 2, label: 'Cross border flows'}
    ]

    const Countries = [
        {value: 'AL', label: 'Albania'},
        {value: 'GR', label: 'Greece'},
        {value: 'DE', label: 'Germany'}
    ]

    const ProdTypes = [
        {value: 'Bi', label: 'Biomass'},
        {value: 'Fo', label: 'Fossil Brown coal/Lignite'},
        {value: 'Fo', label: 'Fossil Coal-deri{ved gas'},
        {value: 'Fo', label: 'Fossil Gas'},
        {value: 'Fo', label: 'Fossil Hard coal'},
        {value: 'Fo', label: 'Fossil Oil'},
        {value: 'Fo', label: 'Fossil Oil shale'},
        {value: 'Fo', label: 'Fossil Peat'},
        {value: 'Ge', label: 'Geothermal'},
        {value: 'Hy', label: 'Hydro Pumped Storage'},
        {value: 'Hy', label: 'Hydro Run-of-ri{ver and poundage'},
        {value: 'Hy', label: 'Hydro Water Reser{voir'},
        {value: 'Ma', label: 'Marine'},
        {value: 'Nu', label: 'Nuclear'},
        {value: 'Ot', label: 'Other'},
        {value: 'Ot', label: 'Other renewable'},
        {value: 'So', label: 'Solar'},
        {value: 'Wa', label: 'Waste'},
        {value: 'Wi', label: 'Wind Offshore'},
        {value: 'Wi', label: 'Wind Onshore'}
    ]

    const HandleFirstSel = (e) => {
        setSelval1(e);
        setSelval2({
            value: -1
        });
        setSelval3({
            value: -1
        });
        setMsg2(<></>);
        setMsg3(<></>);
    }
    const HandleSecSel = (e) => {
        setSelval2(e);
    }

    const HandleThirdSel = (e) => {
        setSelval3(e);
    }

    const HandleGeneratedType = (e) => {
        setSelval3(e);
    }


    let [msg1, setMsg1] = useState(
        <>
            <h1>Select an option to display the data</h1>
            <Select placeholder="Data to display" options={disp_options} onChange={HandleFirstSel}/>
        </>
    )

    let [msg2, setMsg2] = useState(<p>Please select above</p>)
    let [msg3, setMsg3] = useState(<p>Please select above</p>)
    let [date, setDate] = useState(new Date())


    let token = sessionStorage.getItem('authentication');
    // console.log(token)
    const login = () => {
        window.location.href = "/login";
    }

    useEffect(() => {
        if (selval1.value === 0) {
            setMsg2(
                <>
                    <h1>Select Country</h1>
                    <Select placeholder="Country" options={Countries} onChange={HandleSecSel}/>
                </>
            )
            setMsg3(
                <></>
            )
        }
        if (selval1.value === 1) {
            setMsg2(
                <>
                    <h1>Select Country</h1>
                    <Select placeholder="Country" options={Countries} onChange={HandleSecSel}/>
                </>
            )
            setMsg3(
                <>
                    <h1>Select Generation Type</h1>
                    <Select placeholder="Generation Type" options={ProdTypes} onChange={HandleGeneratedType}/>
                </>
            )
        }
        if (selval1.value === 2) {
            setMsg2(
                <>
                    <h1>Select Country (from)</h1>
                    <Select placeholder="Country (from)" options={Countries} onChange={HandleSecSel}/>
                </>
            )
            setMsg3(
                <>
                    <h1>Select Country (to)</h1>
                    <Select placeholder="Country (to)" options={Countries} onChange={HandleThirdSel}/>
                </>
            )
        }
        console.log(selval1.value + " " + selval2.value + " " + selval3.value + " " + date.toISOString().slice(0, 19).replace('T', ' '))

        let link = ""
        let options = {}

        if (selval1.value === 0 && selval2.value !== -1) {
            options = {
                method: "post",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'authentication': token
                },
                body: new URLSearchParams({
                    'MapCode': selval2.value,
                    'Date': date.toISOString().slice(0, 19).replace('T', ' ')
                })
            }

            link = 'http://localhost:8084/data_fetch/Total'

        } else if (selval1.value === 1 && selval2.value !== -1 && selval3.value !== -1) {
            options = {
                method: "post",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'authentication': token
                },
                body: new URLSearchParams({
                    'MapCode': selval2.value,
                    'Date': date.toISOString().slice(0, 19).replace('T', ' '),
                    'ProductionType': selval3.label
                })
            }
            link = 'http://localhost:8082/data_fetch/Aggr'

        } else if (selval1.value === 2 && selval2.value !== -1 && selval3.value !== -1) {

            options = {
                method: "post",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'authentication': token
                },
                body: new URLSearchParams({
                    'InMapCode': selval2.value,
                    'Date': date.toISOString().slice(0, 19).replace('T', ' '),
                    'OutMapCode': selval3.value
                })
            }
            link = 'http://localhost:8083/data_fetch/Physical'
        }

        if (link !== "") {
            fetch(link, options).then(r => r.json())
                .then(d => {
                    console.log(d)
                })
        }


    }, [selval1, selval2, selval3, date])

    return (
        <>
            <div>
                <DatePicker selected={date} onChange={(date) => setDate(date)} value={date}/>
            </div>
            {msg1}
            {msg2}
            {msg3}
        </>
    )
}

export default Statistics