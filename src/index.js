import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Server from './mock.js';
import './index.css';

function RenderChildren({content}) {
    if (content){
        return(
            <>
            {content.map((element, index) => {
                return (<div key={index}>{element.first_name} {element.last_name}</div>);
            })}
            </>
        );
    } else {
        return;
    }
}

function Expander ({title, children, view}) {
    const [expanded, setExpanded] = React.useState(false);
    const handleHeaderClick = () => {
    	setExpanded(expanded => !expanded);
    };

    if (view){
        return (
        <div className="expanderStyle">
            <div className="headerStyle" onClick={handleHeaderClick}>
            <div className="titleStyle">{title}</div>
            <div className="spacerStyle"/>
            </div>
            <div className={expanded ? "contentExpandedStyle" : "contentCollapsedStyle"}>
                {children}
            </div>
        </div>
        );
    } else {
        return;
    }
};

function InterfaceElement(props) {
    if (props.content){
        return(
            <div className={props.className} style={{ backgroundColor: `${props.avatar_color}` }}>{props.title}{props.content}</div>
        );
    } else {
        return;
    }
}

function RenderGroup(props) {
    return(
        <div key={props.value.id} className="group-interface">
            <InterfaceElement className="list-item" title="" content ={props.value.name}/>
            <InterfaceElement className="list-avatar" avatar_color={props.value.avatar_color ?? 0} title="" content={props.value.avatar_color ?? 0}/>
            <InterfaceElement className="list-item" title="Тип приватности: " content={props.value.closed ? 'Закрытая' : 'Открытая'}/>
            <InterfaceElement className="list-item" title="Количество подписчиков: " content={props.value.members_count}/>
            <Expander view={props.value.friends} title={`Количество друзей: ${props.value.friends ? props.value.friends.length : 0}`} >
                <RenderChildren content={props.value.friends}/>
            </Expander>
        </div> 
    )
}

function Filter({filterFunc, funcParams, title}) {
    let keys = Object.keys(funcParams);

    return (
    <div className='filter'>
        <div>{title}</div>
        <ButtonGroup aria-label="Basic example">
            {keys.map((key) => { 
                return(
                    <Button key={key} variant="secondary" onClick={() =>filterFunc(funcParams[key])}>{key}</Button>
                );
            })}
        </ButtonGroup>
    </div>
    );
}

function GroupList({list}) {
    const [filteredList, setFilteredList] = useState(list);
    const [filters, setFilters]  = useState({
        closed: 'all',
        color: 'all',
        haveFriends: 'all'
      });
    const [uniqueColors, setUniqueColors]  = useState([]);
    
    useEffect( () => {
        setFilteredList(list);
        let uniqueColorsObject = {};
        list.forEach(el => {
            if ((el.avatar_color !== undefined) && ((el.avatar_color in uniqueColorsObject) === false)) {
                uniqueColorsObject[el.avatar_color] = el.avatar_color;
            }
        })
        uniqueColorsObject["all"] = "all";
        console.log("uniqueColors", uniqueColorsObject);
        setUniqueColors(uniqueColorsObject)
    }, [list])

    function privateTypeFilter(status) {
        setFilters({
            ...filters,
            closed: status
        })
    }

    function haveFriendsFilter(status) {
        setFilters({
            ...filters,
            haveFriends: status
        })
    }

    function colorFilter(status) {
        setFilters({
            ...filters,
            color: status
        })
    }

    useEffect( () => {
        setFilteredList(list.filter((el) => ((
            (el.closed === filters.closed) || (filters.closed === 'all')) &&  //проверка приватности
            ((el.avatar_color === filters.color) || (filters.color === 'all')) &&// проверка аватара
            ( (((el.friends ? el.friends.length : -1) > 0) === filters.haveFriends) || 
                ((filters.haveFriends === 'all'))) // проверка друзей
        )));
    }, [filters])

    return(
        <>
            <Filter title="Фильтр по типу приватности" filterFunc={privateTypeFilter} funcParams={{
                "Все": 'all',
                "Открытые": false,
                "Закрытые": true,
            }} />
            <Filter title="Фильтр по цвету аватара" filterFunc={colorFilter} funcParams={uniqueColors} />
            <Filter title="Фильтр по наличию друзей" filterFunc={haveFriendsFilter} funcParams={{
                "Все": 'all',
                "Есть друзья": true,
                "Нет друзей": false,
            }} />
            {filteredList.map((element) => {
                return (<RenderGroup key={element.id} value={element}/>);
            })}
        </>
    )
}

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
            <GroupList list={list}/>
        </div>     
    );
}
 
 ////////////////
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);