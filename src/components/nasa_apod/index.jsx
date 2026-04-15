import React, {useState, useEffect} from "react";
import { List } from "react-window";

// const API_KEY = "DEMO_KEY"
const API_KEY = "3ZYQBBHsjH0EatjexV9qnvn4D86HFfEnmPvrgdA6"

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
        fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${input_date}`)// fetch(`https://api.nasa.gov/planetary/apod?api_key=3ZYQBBHsjH0EatjexV9qnvn4D86HFfEnmPvrgdA6&start_date=2017-07-08&end_date=2017-07-10`)
        .then(response => response.json())
        // .then(response1 => setData(response1))
        .then(response1 => save_to_json(response1))
        .catch(console.error);
        // if(!data) return;
        // const {title, date} = data;
        // saveJSON(`date:${input_date}`, {
        //     title,
        //     date
        // });
        // setData(loadJSON(`date:${input_date}`));
    }, [input_date]);

    const Row = ({ index, style, data }) => {
    const item = data[index];

    return (
    <div style={{ ...style, display: "flex" }}>
        <p>
            {item.title} - {item.date}
        </p>
    </div>
    );
};

    console.log("PREPARING TO READ");
    if(data)
    {
        return (<div><p>test</p><pre>{JSON.stringify(data,null,2)}</pre></div>);
        // return (
        //     // <List
        //     //     height={600}
        //     //     width={780}
        //     //     rowCount={data.length}     
        //     //     rowHeight={50}                
        //     //     rowComponent={Row}            
        //     //     rowProps={{ data: data }}  
        //     // />
        //     <ul>
        //         {data.map(item => (
        //             <li key={item.title}>{item.title}{item.date}</li>
        //         ))}
        //     </ul>
        // );
        }

}


