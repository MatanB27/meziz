import React, {useEffect} from 'react';

import './index.scss';

function Keyboard(props){

    const {
        onClick,
        clickedKeys
    } = props;

    const handleClickedKey = () => {
        console.log();
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
                <button className={"key "} data-key='Q' onClick={(e) => handleClick(e)}>Q</button>
                <button className={"key "} data-key='W' onClick={(e) => handleClick(e)}>W</button>
                <button className={"key "} data-key='E' onClick={(e) => handleClick(e)}>E</button>
                <button className={"key "} data-key='R' onClick={(e) => handleClick(e)}>R</button>
                <button className={"key "} data-key='T' onClick={(e) => handleClick(e)}>T</button>
                <button className={"key "} data-key='Y' onClick={(e) => handleClick(e)}>Y</button>
                <button className={"key "} data-key='U' onClick={(e) => handleClick(e)}>U</button>
                <button className={"key "} data-key='I' onClick={(e) => handleClick(e)}>I</button>
                <button className={"key "} data-key='O' onClick={(e) => handleClick(e)}>O</button>
                <button className={"key "} data-key='P' onClick={(e) => handleClick(e)}>P</button>
            </div>
            <div className="space"></div> 
            <div className="row">
                <button className={"key "} data-key='A' onClick={(e) => handleClick(e)}>A</button>
                <button className={"key "} data-key='S' onClick={(e) => handleClick(e)}>S</button>
                <button className={"key "} data-key='D' onClick={(e) => handleClick(e)}>D</button>
                <button className={"key "} data-key='F' onClick={(e) => handleClick(e)}>F</button>
                <button className={"key "} data-key='G' onClick={(e) => handleClick(e)}>G</button>
                <button className={"key "} data-key='H' onClick={(e) => handleClick(e)}>H</button>
                <button className={"key "} data-key='J' onClick={(e) => handleClick(e)}>J</button>
                <button className={"key "} data-key='K' onClick={(e) => handleClick(e)}>K</button>
                <button className={"key "} data-key='L' onClick={(e) => handleClick(e)}>L</button>
            </div>
            <div className="space"></div>
            <div className="row"> 
                <button className={"key "} data-key='Z' onClick={(e) => handleClick(e)}>Z</button>
                <button className={"key "} data-key='X' onClick={(e) => handleClick(e)}>X</button>
                <button className={"key "} data-key='C' onClick={(e) => handleClick(e)}>C</button>
                <button className={"key "} data-key='V' onClick={(e) => handleClick(e)}>V</button>
                <button className={"key "} data-key='B' onClick={(e) => handleClick(e)}>B</button>
                <button className={"key "} data-key='N' onClick={(e) => handleClick(e)}>N</button>
                <button className={"key "} data-key='M' onClick={(e) => handleClick(e)}>M</button>
            </div>

        </div>
    );
}

export default Keyboard;