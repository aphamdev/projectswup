import React from 'react';
import { NavLink } from 'react-router-dom';
import './Card.css';

const Card = (props) => {

    const { id, url, active, title, button, nav} = props.data;

    return (
        <>
        <div key={id} className={`card1 ${active && 'active'}`}
            style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.36), rgba(0, 0, 0, 0.4)), url(${url})`}}
            onClick={() => props.onCardClick(id)}>
                <h2>{title}</h2>
                <button>
                    {active ? (
                        <NavLink to={nav} style={{ color: 'white', filter: "brightness(100%) !important", textDecoration: 'none' }}>
                            {button}
                        </NavLink>
                    ) : (
                    <span style={{ color: 'white' }}>
                        {button}
                    </span>
                )}
            </button>
        </div>
        </>
    )
}

export default Card;
