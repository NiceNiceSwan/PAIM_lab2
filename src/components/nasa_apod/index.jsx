import {useState, useEffect} from "react";

const API_KEY = "DEMO_KEY"

const loadJSON = key =>
    key && JSON.parse(localStorage.getItem(key));

const saveJSON = (key, data) =>
    localStorage.setItem(key, JSON.stringify(data));

export function ApodData({input_date}) {
    const [data,setData] = useState(
        loadJSON(`date:${input_date}`)
    );

    useEffect(() => {
        if(!data) return;
        const {title, date} = data;
        saveJSON(`date:${input_date}`, {
            title,
            date
        });
    }, [data]);

    function save_to_json(json_data)
    {
        const {title, date} = json_data;
        saveJSON(`date:${input_date}`, {
            title,
            date
        });
        setData({title, date});
    }

    useEffect(() => {
        if(!input_date) return;
        if(data && data.date === input_date) return;
        fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${input_date}`)
        .then(response => response.json())
        .then(response1 => save_to_json(response1))
        .catch(console.error);
    }, [input_date]);

    if(data)
    {
        return(
        <ul>
        <li>{data.title} - {data.date}</li>
        </ul>
        );
    }

}


