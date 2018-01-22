import React from 'react'

export class NormalizeListDescription extends React.Component{
    render(){
        const { children , type} = this.props
        return(
            <span dangerouslySetInnerHTML={{ __html: children}}/>
        )
    }
}

//3225/DNI