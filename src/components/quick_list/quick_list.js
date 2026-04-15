import './App.css';
import React from "react";
import { faker } from "@faker-js/faker";
import { List } from "react-window";

const bigList = [...Array(5000)].map(() => ({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  avatar: faker.image.avatar()
}));


const Row = ({ index, style, data }) => {
  const item = data[index];

  return (
    <div style={{ ...style, display: "flex" }}>
      <img src={item.avatar} alt={item.name} width={50} />
      <p>
        {item.name} - {item.email}
      </p>
    </div>
  );
};

function App() {
  return (
    <List
      height={600}
      width={780}
      rowCount={bigList.length}     
      rowHeight={50}                
      rowComponent={Row}            
      rowProps={{ data: bigList }}  
    />
  );
}

export default App;