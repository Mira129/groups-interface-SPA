import React, { useState, useEffect } from 'react';
import Filter from './Filter.js';
import GroupInterface from './GroupInterface.js';

export default function GroupsList({list}) {
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
        uniqueColorsObject["Все"] = "all";
        list.forEach(el => {
            if ((el.avatar_color !== undefined) && ((el.avatar_color in uniqueColorsObject) === false)) {
                uniqueColorsObject[el.avatar_color] = el.avatar_color;
            }
        })
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
                return (<GroupInterface key={element.id} value={element}/>);
            })}
        </>
    )
}