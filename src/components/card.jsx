import React from 'react';


export class Card extends React.Component{

openWindow = () => {
    window.open('https://www.asset.tv/site/ms592fcd270cfe7/'+this.props.id+'?chid=2240', '_blank', 'nodeIntegration=no')

}

    render(){
        return (
        <div className=" col" style={{padding:'1em'}}>
           
            <div className="card" > 
            <div className="card-body" style={{"minHeight":"250px", display:"flex",justifyContent:"space-between",flexDirection:"column"}}>
            <h5 className="card-title" style={{"fontSize":"1.5em"}}>{this.props.title}</h5>
            <p className="card-text" style={{"minHeight":"100px"}}>{this.props.description}</p>
            <button type="button" class="btn btn-primary" onClick={this.openWindow}>Watch</button>
            </div>
        </div>
      </div>) 

    }
}