import './App.css';
import React from 'react';
// demo 01 函数组件
/* function App() {
	const click = (params) => {
		console.log('点击了', params);
	};
	return (
		<div className="App">
			<button onClick={() => click('传递参数')}>点击了</button>
		</div>
	);
} */

/* // demo class组件和setState
class App extends React.Component {
	state = {
		cont: 0,
		list: [1, 2, 3],
		person: {
			name: 'jack',
			age: 18,
		},
	};
	change = () => {
		this.setState({
			cont: this.state.cont + 1,
			list: [...this.state.list, 4, 5],
			person: { ...this.state.person, name: 'jae' },
		});
	};
	render() {
		return (
			<>
				<ul>
					{this.state.list.map((item) => (
						<li key={item}>{item}</li>
					))}
				</ul>
				<p>{this.state.cont}</p>
				{/* <p>{this.state.person}</p> */}

				<button onClick={this.change}>change</button>
			</>
		);
	}
}
 */
export default App;
