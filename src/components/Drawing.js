import React from "react";
import Paper from "paper";

import Selectors from "./Selectors";

class Drawing extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			key: new Date(),
			properties: {
				//Add properties here
				//value: input value
				//type: input type
				//name: input name
				//label: input label
				divisions: {
					value: 7,
					type: "number",
					name: "divisions",
					label: "Divisions"
				},
				maxRange: {
					value: 50,
					type: "number",
					name: "maxRange",
					label: "Max Range"
				},
				size: {
					value: 20,
					type: "range",
					name: "size",
					label: "Size"
				},
				color: {
					value: "#000000",
					type: "color",
					name: "color",
					label: "Color"
				},
				bgColor: {
					value: "#ffffff",
					type: "color",
					name: "bgColor",
					label: "Background Color"
				}
			}
		};
		this.handleChange = this.handleChange.bind(this);
		this.drawing = this.drawing.bind(this);
	}
	componentDidMount() {
		Paper.setup(this.canvas);
		Paper.project.clear();
		this.drawing(this.state.properties);
		Paper.project.view.scale(0.8);
	}
	componentDidUpdate() {
		Paper.setup(this.canvas);
		Paper.project.clear();
		this.drawing(this.state.properties);
		Paper.project.view.scale(0.8);
	}
	handleChange(e) {
		let property = e.target.name;
		if (e.target.type === "checkbox") {
			this.setState({
				key: new Date(),
				properties: {
					...this.state.properties,
					[property]: {
						...this.state.properties[property],
						value: e.target.checked
					}
				}
			});
		} else {
			this.setState({
				key: new Date(),
				properties: {
					...this.state.properties,
					[property]: {
						...this.state.properties[property],
						value: parseInt(e.target.value)
					}
				}
			});
		}
	}
	drawing(props) {
		console.log(props.divisions.value);
	}
	render() {
		return (
			<div
				style={{
					padding: "10px",
					margin: "10px",
					height: "100%",
					width: "100%",
					display: "flex",
					justifyContent: "space-evenly",
					flexDirection: "row",
					alignItems: "center"
				}}
			>
				<Selectors
					mainState={this.state}
					handleChange={e => this.handleChange(e)}
				/>
				<canvas
					onClick={() => this.setState({ key: new Date() })}
					style={{ backgroundColor: this.state.properties.bgColor }}
					ref={ref => (this.canvas = ref)}
					key={this.state.key}
					width={window.innerWidth < 500 ? window.innerWidth - 50 : 500}
					height={window.innerWidth < 500 ? window.innerWidth - 50 : 500}
					id="myCanvas"
					className="backgroundCanvas"
				/>
			</div>
		);
	}
}

export default Drawing;
