import React , {Component} from 'react';
import './ScrollComponent.css';


const Scroll = (props) => {

			return (
				<div class = "style-border">
					{props.children}
				</div>
	        );
};

export default Scroll;