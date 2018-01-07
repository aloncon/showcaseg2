import React from 'react'


export class NormalizeListDescription extends React.Component{


    render(){
        return(
            <div dangerouslySetInnerHTML={{ __html: this.props.children}}/>
        )
    }
}