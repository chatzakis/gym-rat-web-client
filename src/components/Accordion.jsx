import React from 'react';
import "../styles/Accordion.css"

function Accordion(props) { 

    return (
        <>
            <div className="accordion my-4" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header justify-content-center" id="headingOne">
                        <button className="accordion-button p-1" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            <strong>{props.title}</strong>
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div className="container">
                            <div className="accordion-body row p-1 align-items-center">
                                {props.image.length !== 0 &&
                                <div className='acc-body-img col-lg-3 p-0'>
                                    <img className='mt-2' src={props.image} alt='exercise image'></img>
                                </div>}
                                {props.image.length !== 0 &&
                                <div className='acc-body-text col-lg-9 p-0'>
                                    {props.text}
                                </div>}
                                {props.image.length === 0 &&
                                <div className='acc-body-text col p-0'>
                                    {props.text}
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Accordion;
