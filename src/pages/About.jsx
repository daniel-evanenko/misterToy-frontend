import React, { useRef, useState } from "react";  
import { Outlet, NavLink } from 'react-router-dom';
import { utilService } from '../services/util.service.js';
import { AboutTeam } from '../cmps/AboutTeam.jsx';
import { AboutVision } from '../cmps/AboutVision.jsx';

export function About() {
    const titleRef = useRef(null);
    const count = 1000001;

    function onViewMore() {
        alert('Curiosity killed the cat');
    }

    function handleAnimation() {
        if (titleRef.current) {
            utilService.animateCSS(titleRef.current);
        }
    }

    return (
        <section className="about">
            <h1 ref={titleRef}>About todos and us...</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit...</p>
            
            <button onClick={handleAnimation}>Animate</button>

            <nav>
                <NavLink to="/about/team">Team</NavLink> |
                <NavLink to="/about/vision">Vision</NavLink>
            </nav>

            <section>
                <Outlet />
            </section>

            <hr />
            <ul>
                {['Ja', 'Ka', 'La'].map(name => (
                    <React.Fragment key={name}>
                        <li>{name}</li>
                        <li className="divider">---</li>
                    </React.Fragment>
                ))}
            </ul>

            <hr />
            <FancyBox title="Hola!" onClose={() => console.log('ok, closing')}>
                <h3>{count.toLocaleString()} Followers</h3>
                <button onClick={onViewMore}>Tell me More</button>
            </FancyBox>

            <hr />
            <h3>Click to resize:</h3>
            <SplitPane left={<AboutTeam />} right={<AboutVision />} />
        </section>
    );
}

function FancyBox({ title = 'Hello', onClose, children }) {
    return (
        <div className="fancy-box">
            <button style={{ float: 'right' }} onClick={onClose}>x</button>
            <h3>{title}</h3>
            {children}
        </div>
    );
}

function SplitPane({ left, right }) {
    const [width, setWidth] = useState(30);

    return (
        <div className="split-pane" style={{ display: 'flex' }}>
            <div style={{ width: width + '%' }} onClick={() => setWidth(prev => Math.min(prev + 10, 100))}>
                {left}
            </div>
            <div style={{ flex: 1 }} onClick={() => setWidth(prev => Math.max(prev - 10, 10))}>
                {right}
            </div>
        </div>
    );
}

const Title = (props) => <h1>Title: {props.txt}</h1>;

Title.propTypes = {
    txt(props, propName) {
        if (!(propName in props)) {
            throw new Error(`Missing ${propName}`);
        }
        if (props[propName].length < 6) {
            throw new Error(`${propName} was too short`);
        }
    }
};
