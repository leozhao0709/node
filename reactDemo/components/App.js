import React, { Component } from "react";

class App extends Component {

	constructor() {
		super();
		this.name = "lzhao";
	}

	render() {
		return (
            <div>
                React 欢迎 {this.name} 222
            </div>
		);
	}
}

export default App;