import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { Link } from 'react-router-dom'
import WcImg from '../WcResource/WcImg'
import ActionLink from '../ActionLink'
import { NormalizeListDescription } from '../NormalizeListDescription'

import '../../style/grid.css'

const placeholderPic = require('../../resources/placeholder.png')
let openPopList = [];

const popOverGridStore = (index) => {
    openPopList.push({ index: index })
    const store = observable({
        open: false,
        get isOpen() {
            return store.open
        },
        setOpen(bool) {
            store.open = bool;
        },
        getIsOpen() {
            return store.open
        }
    })
    return store;
}

class AllPopover {
    constructor() {
        this.map = new Map();
        this.prev = null;
    }
    setNewPop(index) {
        if (!this.map.has(index))
            this.map.set(index, { pop: new popOverGridStore(index), isOpen: false })
    }
    getPop(index) {
        if (!this.map.has(index))
            this.setNewPop(index)
        return this.map.get(index).pop
    }
    openPop(index) {
        if (this.prev !== null && this.prev !== index) {
            this.map.get(this.prev).pop.setOpen(false)
            this.map.get(this.prev).isOpen = false
        }

        if (this.map.has(index)) {
            let temp = this.map.get(index)
            temp.isOpen = !temp.isOpen
            temp.pop.setOpen(temp.isOpen)
        }
        this.prev = index

    }
}

const allPopovers = new AllPopover();

const ObservPopover = observer(({ store, index, title, text, wcpc }) => {
    let isOpen = store && store.isOpen
    let classIsOpen = isOpen ? "wc-open-popover" : "wc-close-popover"
    return store ? 
    <div>
        <button type="button" className="bt-btn bt-btn-primary bt-btn-sm" onClick={() => { allPopovers.openPop(index) }}>See more</button>
        <div className={classIsOpen}>
            <WcImg src={require("../../resources/icons/svg/icon-close_.svg")}
                onClick={() => { allPopovers.openPop(index) }}
                className="wcCloseButtonPopover" />
            <div><h3>{title}</h3></div>

            <p><NormalizeListDescription>{text}</NormalizeListDescription></p>
        </div>
    </div> : null

})



class GridList extends React.Component {


    render() {
        const { caption , data } = this.props;
        
        return (
            <div  className="wcGridList">
                {data.map((item, i) =>
                    <div key={i} className="wc-card">
                            <ActionLink wcpc={item.wcpc} type="p2b" unlink={true}>
                                <div className="wc-card-img-top wc-img-fluid">
                                    {item.listImage === undefined ?
                                        <WcImg src={placeholderPic} alt="" />
                                        : <WcImg src={"/static/" + item.listImage} alt="" />
                                    }
                                </div>
                            </ActionLink> 
                           
                            <div className="wcMosaicGrid">
                                <div className="wcMosaic" data-cpi={item.cpi}/>
                            </div>

                            <div className="wc-card-block">
                                <h4 className="wc-card-title"><ActionLink wcpc={item.wcpc} type="p2b" unlink={true}>{item.vendorProductName}</ActionLink></h4>
                                <div className="wcGridCardFooter">
                                    {item.listDescription && <ObservPopover store={allPopovers.getPop(item.wcpc + caption)}
                                        index={item.wcpc + caption}
                                        wcpc={item.wcpc}
                                        title={item.vendorProductName}
                                        text={item.listDescription} />}

                                    <ActionLink wcpc={item.wcpc} type="p2b">Procced to buy</ActionLink>
                                </div>
                                <div className="wcClear" />
                            </div>
                        </div>
                )}
                <div className="wcClear" />
            </div>
        )
    }
}

export default GridList;