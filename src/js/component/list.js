import React from "react";
import { Button } from "bootstrap/dist/js/bootstrap";

//create your first component
export class List extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			chores: []
		};
	}
	componentDidMount() {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/jmontes")
			.then(response => response.json())
			.then(data => {
				this.setState({ chores: data });
			});
		//
	}

	render() {
		const addItem = e => {
			let newObj = this.state.chores.concat({ label: e, done: false });

			fetch("https://assets.breatheco.de/apis/fake/todos/user/jmontes", {
				method: "PUT",
				body: JSON.stringify(newObj),
				headers: {
					"Content-Type": "application/json"
				}
			}).then(
				fetch(
					"https://assets.breatheco.de/apis/fake/todos/user/jmontes"
				)
					.then(response => response.json())
					.then(data => {
						this.setState({ chores: data });
					})
			);
		};
		const removeItem = todo => {
			if (this.state.chores.length > 1) {
				let newObj = this.state.chores.filter(
					item => item.label !== todo
				);
				console.log(newObj);

				fetch(
					"https://assets.breatheco.de/apis/fake/todos/user/jmontes",
					{
						method: "PUT",
						body: JSON.stringify(newObj),
						headers: {
							"Content-Type": "application/json"
						}
					}
				).then(
					fetch(
						"https://assets.breatheco.de/apis/fake/todos/user/jmontes"
					)
						.then(response => response.json())
						.then(data => {
							this.setState({ chores: data });
						})
				);
			} else {
				alert("You need at least 1 todo");
			}

			// this.setState(state => {
			// 	const chores = state.chores.filter(
			// 		(item, label) => label !== index
			// 	);

			// 	return {
			// 		chores
			// 	};
			// });
			// console.log("Index Item :" + index);
		};

		return (
			<div className="todoListMain">
				<div className="header"> Todos </div>
				<div className="inputList">
					<input
						onKeyUp={e =>
							e.keyCode == 13 && addItem(e.target.value)
						}
					/>
				</div>
				<div>
					<ul className="list-group">
						{this.state.chores.map((item, index) => {
							return (
								<li className="list-group-item" key={index}>
									{item.label}
									<span>
										<button
											onClick={() =>
												removeItem(item.label)
											}
											className="btn btn-link">
											x
										</button>
									</span>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		);
	}
}
// this.setState({
// 										chores: this.state.chores.concat({
// 											label: e.target.value
// 										})
