import React, {useEffect} from 'react';

import './index.scss';

function Keyboard(props){

    const {
        onClick,
        clickedKeys
    } = props;

    const handleClickedKey = () => {
        const elements = document.getElementsByClassName('key');
        Object.entries(clickedKeys).map(([key, value] )=> {
            [...elements].forEach(element =>{
                const elementKey = element.getAttribute('data-key');
                if(elementKey === key){
                    if(!value){
                        element.classList.add('failed');
                    }else{
                        element.classList.add('success');
                    }
                }
                
                
            })
        });
    }

    const handleClick = (e) => {
        onClick(e);
        handleClickedKey();
    }
    return(
        <div className="keyboard-wrapper">
            <div className="row">
                <button className={"key "} onKeyDown={(e) => handleClick(e)} data-key='Q' onClick={(e) => handleClick(e)}>Q</button>
                <button className={"key "} onKeyDown={(e) => handleClick(e)} data-key='W' onClick={(e) => handleClick(e)}>W</button>
                <button className={"key "} onKeyDown={(e) => handleClick(e)} data-key='E' onClick={(e) => handleClick(e)}>E</button>
                <button className={"key "} onKeyDown={(e) => handleClick(e)} data-key='R' onClick={(e) => handleClick(e)}>R</button>
                <button className={"key "} onKeyDown={(e) => handleClick(e)} data-key='T' onClick={(e) => handleClick(e)}>T</button>
                <button className={"key "} onKeyDown={(e) => handleClick(e)} data-key='Y' onClick={(e) => handleClick(e)}>Y</button>
                <button className={"key "} onKeyDown={(e) => handleClick(e)} data-key='U' onClick={(e) => handleClick(e)}>U</button>
                <button className={"key "} onKeyDown={(e) => handleClick(e)} data-key='I' onClick={(e) => handleClick(e)}>I</button>
                <button className={"key "} onKeyDown={(e) => handleClick(e)} data-key='O' onClick={(e) => handleClick(e)}>O</button>
                <button className={"key "} onKeyDown={(e) => handleClick(e)} data-key='P' onClick={(e) => handleClick(e)}>P</button>
            </div>
            <div className="space"></div> 
            <div className="row">
                <button className={"key "} data-key='A' onKeyDown={(e) => handleClick(e)} onClick={(e) => handleClick(e)}>A</button>
                <button className={"key "} data-key='S' onKeyDown={(e) => handleClick(e)} onClick={(e) => handleClick(e)}>S</button>
                <button className={"key "} data-key='D' onKeyDown={(e) => handleClick(e)} onClick={(e) => handleClick(e)}>D</button>
                <button className={"key "} data-key='F' onKeyDown={(e) => handleClick(e)} onClick={(e) => handleClick(e)}>F</button>
                <button className={"key "} data-key='G' onKeyDown={(e) => handleClick(e)} onClick={(e) => handleClick(e)}>G</button>
                <button className={"key "} data-key='H' onKeyDown={(e) => handleClick(e)} onClick={(e) => handleClick(e)}>H</button>
                <button className={"key "} data-key='J' onKeyDown={(e) => handleClick(e)} onClick={(e) => handleClick(e)}>J</button>
                <button className={"key "} data-key='K' onKeyDown={(e) => handleClick(e)} onClick={(e) => handleClick(e)}>K</button>
                <button className={"key "} data-key='L' onKeyDown={(e) => handleClick(e)} onClick={(e) => handleClick(e)}>L</button>
            </div>
            <div className="space"></div>
            <div className="row"> 
                <button className={"key "} data-key='Z' onKeyDown={(e) => handleClick(e)} onClick={(e) => handleClick(e)}>Z</button>
                <button className={"key "} data-key='X' onKeyDown={(e) => handleClick(e)} onClick={(e) => handleClick(e)}>X</button>
                <button className={"key "} data-key='C' onKeyDown={(e) => handleClick(e)} onClick={(e) => handleClick(e)}>C</button>
                <button className={"key "} data-key='V' onKeyDown={(e) => handleClick(e)} onClick={(e) => handleClick(e)}>V</button>
                <button className={"key "} data-key='B' onKeyDown={(e) => handleClick(e)} onClick={(e) => handleClick(e)}>B</button>
                <button className={"key "} data-key='N' onKeyDown={(e) => handleClick(e)} onClick={(e) => handleClick(e)}>N</button>
                <button className={"key "} data-key='M' onKeyDown={(e) => handleClick(e)} onClick={(e) => handleClick(e)}>M</button>
            </div>

        </div>
    );
}

export default Keyboard;