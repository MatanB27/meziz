import React, { Component  } from 'react'

class GoogleAd extends Component {

    componentDidMount() {
     (window.adsbygoogle = window.adsbygoogle || []).push({})
    }

   render () {
    return(
        <div>
        <ins className = "adsbygoogle"
                style = { {display:"inline-block",width:"728px",height:"90px"} }
                data-ad-client = "pub-8617671779212304"
                data-ad-slot = "7568630987"></ins>
        </div>)
    }
}

export default GoogleAd