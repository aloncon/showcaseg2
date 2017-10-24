import React from 'react';
import ReactDOM from 'react-dom';
import JsonInput from './siteadditions/inputProviderCenter.json';

const output = {}








class MyApp extends React.Component {
	constructor(props) {
		super(props);
        this.state = {

        }
    }
    
    componentDidMount() {
        console.log("json:::" + JsonInput.adobe.mailto);

    }

  render() {

    return (
	   	<form>
	   		
	   	</form>
    );
  }
};

export default MyApp;