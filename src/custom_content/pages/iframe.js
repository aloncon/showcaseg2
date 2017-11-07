import React from 'react';
import EntryPoint from '../../system/codes/entryPoint';
import '../../system/style/App.css';
import WcpcContent from '../../system/codes/WcpcContent';
import FromProviderCenter from '../../system/data/module-profiles/fromProviderCenter.json'

const providerCenterAssortment = FromProviderCenter.adobe.mailto.value
const entryPointAssortment = {
    title: "Adobe Creative Cloud showcase Customization",
    section:
    {
        title: "Include Call Sales Representative at 'Adobe Echo Sign' page",
        description: "Turns ON/OFF Call Sales Representative Sectionat 'Creative Cloud' page",
        defaultValue: true,


        field1_custom:
        {
            "title"       :   "Email Software Questions field 3#",
            "description" :   "Change Email Software Questions field 3#",
            "defaultValue":   "mailto:adobeSupperEmailAddress@adobeSupperEmailAddress.com",
            "value"       :   "angelika.yakushin@webcollage.com"
        }
    }
}

class Iframe extends React.Component {
    render() {
        return <div id="iframeContainer" style={{width:'98%' ,margin:'0px auto'}}>
                    <EntryPoint
                        id={"entryPoint"}
                        //src={'http://www.ynet.co.il/home/0,7340,L-8,00.html'}
                        src={'./siteadditions/adobe-creative-cloud-for-teams/index.html'}
                        title="adobe-creative-cloud-for-teams"
                        config = {entryPointAssortment}/>
                </div>
    }
}

export default Iframe;