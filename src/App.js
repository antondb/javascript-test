import React, { Component } from 'react';
import './material.min.css';
import {Tabs} from './components/tabs'
import {Card} from './components/card'


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tabs:[],
      content:{},
      filterText:"",
      itemsPerPage: 18,
      currentPage:1
    };
  }

  componentDidMount = () =>{
    fetch("https://titan.asset.tv/api/channel-view-json/2240").then(
      (request)=>{
        request.json().then((data)=>{

          let tabs = [];
          let activeTabId;
          
          Object.keys(data.tabs).map(
            (key) => {
              tabs.push(data.tabs[key])
          })

          activeTabId = tabs[0].tab_id;

          this.setState({
            tabs: tabs, 
            activeTabId: activeTabId,
            cards: data.content
          });

          
        });
    })
  }

  search = (event) =>{    
    this.setState({ filterText: event.target.value,currentPage:1 })
  }

  changeTab = (tabId) => {
    this.setState({ activeTabId: tabId,currentPage:1 })
  }

  changePage = (event) =>{
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  render() {
    
    const activeTabId = this.state.activeTabId
    let content = [];
    let cards = [];
    let row = []

    let renderPageNumbers;
    
    if (this.state.cards && this.state.cards[activeTabId]){
      // SearchFilter for the cards
      cards = this.state.cards[activeTabId].filter(
        (item)=>{
          if (this.state.filterText === ""){
            return item;
          }
          if(typeof item.title === 'undefined'){
            return item;
          }

          if (item.title.search(this.state.filterText) > -1){
            return item;
          }
          return false;
        })


      // Logic for displaying page numbers
      const { currentPage, itemsPerPage } = this.state;

      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(cards.length / itemsPerPage); i++) {
        pageNumbers.push(i);
      }  

      renderPageNumbers = pageNumbers.map(number => {
        return (
           <label className="" className={number === currentPage? "active btn btn-secondary":"btn btn-secondary"}
           key={number}
           id={number}>
            <input 
          onClick={this.changePage} id={number} type="radio" name="paging"/> {number}
           </label>

           
        );
      });

      const indexOfLast = currentPage * itemsPerPage;
      const indexOfFirst = indexOfLast - itemsPerPage;
      cards = cards.slice(indexOfFirst, indexOfLast);
      

      // Split the content into rows  
      let i,j,tempArray,chunk = 3;
      for (i=0,j=cards.length; i<j; i+=chunk) {
        tempArray = cards.slice(i,i+chunk);

          row = tempArray.map((cardData)=>{
            return (
              <Card
              id={cardData.vid}
              key={cardData.vid}
              title={cardData.title}
              image_url={cardData.image_url}
              description={cardData.description.substring(0,100) + "..."}>
              </Card>
              );
          });
         row = (<div className="row">{row}</div>)
         content.push(row);
         row = ""; 
      }      
    }
    return (
      <div className="App">
        <nav className="navbar navbar-dark bg-primary">
          <a className="navbar-brand">Asset.tv</a> 
          <Tabs onClick={this.changeTab} tabs={this.state.tabs}>
          
          </Tabs>
          <form className="form-inline" onChange={this.search}>
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
          </form>
        </nav>
        <main className="container">
        <div class="row">
          <div class="col"></div>
          <div class="col"></div>
          <div class="col">
            <div className="btn-group btn-group-toggle" data-toggle="buttons">              
              {renderPageNumbers}
            </div>
          </div>
        </div>
          {content}
        </main>
      </div>
    );
  }
}

export default App;
