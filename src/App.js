import React from 'react';
import './App.css';

// Color Theme
const colors = {
	available: 'lightgray',
	used: 'lightgreen',
	wrong: 'lightcoral',
	candidate: 'deepskyblue',
};

// Math science
const utils = {
	// Sum an array
	sum: arr => arr.reduce((acc, curr) => acc + curr, 0),

	// create an array of numbers between min and max (edges included)
	range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),

	// pick a random number between min and max (edges included)
	random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),

	// Given an array of numbers and a max...
	// Pick a random sum (< max) from the set of all available sums in arr
	randomSumIn: (arr, max) => {
		const sets = [[]];
		const sums = [];
		for (let i = 0; i < arr.length; i++) {
			for (let j = 0, len = sets.length; j < len; j++) {
				const candidateSet = sets[j].concat(arr[i]);
				const candidateSum = utils.sum(candidateSet);
				if (candidateSum <= max) {
					sets.push(candidateSet);
					sums.push(candidateSum);
				}
			}
		}
		return sums[utils.random(0, sums.length - 1)];
	},
};

class StarsDisplay extends React.Component {
	render() {
		return (
			<div className="left">
				{utils.range(1, this.props.starsToDisplay).map(id => <div key={id} className="star" />)}
			</div>
		);
	}
}

class PlayNumbers extends React.Component {
	onButtonClick = (numberClicked) => {
		console.log(numberClicked.generatedNumber);
	}

	render() {
		return (
			<div className="right">
				{
					utils.range(1, 9).map
						(
							generatedNumber => <button onClick={() => this.onButtonClick({ generatedNumber })} key={generatedNumber} className="number">{generatedNumber}</button>
						)
				}
			</div>
		);
	};
}

function App() {
	const startToDisplay = utils.random(1, 9);
	return (
		<div className="game">
			<div className="help">
				Pick 1 or more numbers that sum to the number of stars
			</div>
			<div className="body">
				<StarsDisplay starsToDisplay={startToDisplay} />
				<PlayNumbers />
			</div>
			<div className="timer">Time Remaining: 10</div>
		</div>
	);
}

export default App;
