import React, { Component } from 'react';
import './App.css';
import data from './data/recent.json';
import ReactTable from 'react-table'    // Add table
import 'react-table/react-table.css'    // Add table css
import { ReactTableDefaults } from 'react-table'
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'


//showPagination

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data:[],
    };
  }

/*
  render() {


      const leaderboard = data.map((item,index)=>
       <tr key={item.username.toString()}>
          <td>{index+1}</td>
          <td><a href={"https://www.freecodecamp.org/"+item.username} target="_blank">
<img border="0" alt="thumbnail" src={item.img} width="30" height="30"/>{item.username}
</a></td>
          <td>{item.alltime}</td>
          <td>{item.recent}</td>
      </tr>
      );

console.log(leaderboard[0]);
//        <ul>{leaderboard}</ul>
    return (
      <div className="App">
            <table id="myTable" className="tablesorter">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Camper Name</th>
                        <th>Points in past 30 days</th>
                        <th>All time points</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard}
                </tbody>
            </table>



      </div>
    );



} */




render() {


  const columns = [{
    Header: 'Name',
    accessor: 'username', // String-based value accessors!
    Cell: cellInfo=> <a href={"https://www.freecodecamp.org/"+cellInfo.original.username} target="_blank">
<img border="0" alt="thumbnail" src={cellInfo.original.img} width="30" height="30"/>{cellInfo.original.username}
</a>
  }, {
    Header: 'Alltime',
    id: "alltime",
    accessor: d=>d.alltime,
    Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
  }, {
    Header: 'Recent',
    id: "recent",
    accessor: 'recent',
    Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
  }];

  let fetchData = {
    method: 'POST',
    body: JSON.stringify(),
    headers: new Headers()
  };

  const data1 = fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent',fetchData).then(function(response){
    console.log(response);
    return response.text();
  });

  console.log(data1);
  localStorage.setItem('myData', JSON.stringify(data1));


  /*fetch(url).then(function(dogBiscuits) {
    dogBiscuits.text().then(function(text) {
      poemDisplay.textContent = text;
    });
  });
*/


 return(
   <div>

       <ReactTable data={data} showPagination={false}   defaultPageSize={100}
       columns={columns}
         getTdProps={(state, rowInfo, column, instance) => {
           return {
             onClick: (e, handleOriginal) => {
               console.log('A Td Element was clicked!')
               console.log('it produced this event:', e)
               console.log('It was in this column:', column)
               console.log('It was in this row:', rowInfo)
               console.log('It was in this table instance:', instance)

               // IMPORTANT! React-Table uses onClick internally to trigger
               // events like expanding SubComponents and pivots.
               // By default a custom 'onClick' handler will override this functionality.
               // If you want to fire the original onClick handler, call the
               // 'handleOriginal' function.
               if (handleOriginal) {
                 handleOriginal()
               }
             }
           }
         }}



       />
     </div>

);


}


}

export default App;

/*
<ReactTable
  getTdProps={(state, rowInfo, column, instance) => {
    return {
      onClick: (e, handleOriginal) => {
        console.log('A Td Element was clicked!')
        console.log('it produced this event:', e)
        console.log('It was in this column:', column)
        console.log('It was in this row:', rowInfo)
        console.log('It was in this table instance:', instance)

        // IMPORTANT! React-Table uses onClick internally to trigger
        // events like expanding SubComponents and pivots.
        // By default a custom 'onClick' handler will override this functionality.
        // If you want to fire the original onClick handler, call the
        // 'handleOriginal' function.
        if (handleOriginal) {
          handleOriginal()
        }
      }
    }
  }}
/>

<ReactTable showPagination={false}   defaultPageSize={100}
  data={data}
  columns={columns}
/>
*/
