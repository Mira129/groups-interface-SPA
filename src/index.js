import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import GroupsList from './components/GroupsList.js';
import Server from './components/mock.js';
import './index.css';

function App() {
    const [list, setList] = useState([]);

    useEffect (() => {
        setList(list)
    }, [list])

    let promise = Server()
    .then((res) => {
        if ((res.data === 0) || (res.data === undefined) || (res.data === null) || (res.result === 0)){
            throw new Error("Ошибка передачи данных");
        } else {
            console.log("Запрос на сервер");
            setList(res.data);
        }
    })
    .catch((err) => {
        console.log(`Ошибка передачи данных: ${err}`);
    })
    
    return (
        <div className="groupList">
            <GroupsList list={list}/>
        </div>     
    );
}
 
 ////////////////
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);