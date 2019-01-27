import React from 'react';

export class Tabs extends React.Component{

    render(){
      let tabs;

      if (this.props.tabs){
        tabs = this.props.tabs.map(
          (tabData) => {
            let tab_id = tabData.tab_id;
            return (
              <li key={tabData.tab_id} className="nav-item active">
                <a className="nav-link" href="#" onClick={()=>{this.props.onClick(tab_id)}}>{tabData.tab_name} <span className="sr-only">(current)</span></a>
              </li>
            )
          })
        }
      return (          
        <ul className="navbar-nav mr-auto">
        {tabs}
      </ul>)
    }

}