import { Component } from 'react';


export default function Sound({ size = '50px', on = false, click }) {


    return (
        <div onClick={click} style={{ cursor: 'pointer' }}>
            {on === true &&
            <><img height={size} src='static/images/muted.png'></img>&nbsp;&nbsp;</>}
            {on === false &&
                <><img height={size} src='static/images/unmuted.png'></img></>
        }
        </div>

    )

};