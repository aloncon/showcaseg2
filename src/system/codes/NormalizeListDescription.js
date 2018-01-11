import React from 'react'

// class Popover extends React.Component{
//     constructor(props) {
//         super(props);
    
//         this.toggle = this.toggle.bind(this);
//         this.state = {
//             popoverOpen: false
//         };
//         }
    
//         toggle() {
//         this.setState({
//             popoverOpen: !this.state.popoverOpen
//         });
//     }

//     render(){
//         const {popoverOpen} = this.state
//         let display = popoverOpen ? "block" : "none"
//         let buttonTxt = popoverOpen ? "Close" : "Show more >>"
//         return(
//             <div>
//                 <div onClick={this.toggle} style={{color:"blue" , cursor:"pointer"}}>
//                     {buttonTxt}
//                 </div>
                
//                 <div style={{position:"absolute" , width: 250 , borderRadius:5 , padding:10, background:"white" , border:"1px solid black" , top:0, left:250 , display: display , zIndex:1}}>
//                     <div style={{width:50 , height:50 , position:"absolute" , top : -22 , right: -45}} onClick={this.toggle}><i className="zmdi zmdi-close-circle zmdi-hc-2x"/></div>
//                     <div dangerouslySetInnerHTML={{ __html: this.props.text}}/>
//                 </div>
//             </div>
//         )
//     }
// }


export class NormalizeListDescription extends React.Component{

    

    render(){
        const { children , type} = this.props
        // let text = children
        // children && console.log("Children",(<div dangerouslySetInnerHTML={{ __html: text}}/>).length)
        // let paragraph = null
        // if(text && type==="grid") {
        //     paragraph = text.length < 90 ? 
        //     <div dangerouslySetInnerHTML={{ __html: text}}/>: 
        //     <div>
        //         <div dangerouslySetInnerHTML={{ __html: this.props.children.slice(0,90)}} style={{float:"left"}}/>
        //         <Popover text = {text}  style={{float:"right"}}/>
        //     </div>
        // } 
        // else paragraph = <div dangerouslySetInnerHTML={{ __html: text}}/>
        return(
            <span dangerouslySetInnerHTML={{ __html: children}}/>
        )
    }
}

//3225/DNI