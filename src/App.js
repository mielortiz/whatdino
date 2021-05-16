import React, { useState } from 'react';

import questions from './que_ans.js'


export default function App() {
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
	const [quecount, setQuecount] = useState(1);
	const queItems = [];

	const refreshPage = ()=>{
		window.location.reload();  
	}

	if ( queItems.length === 0 ) {
		for (var i=0; i < questions.length; i++) {
			queItems.push(i);
		} 
	}

	const [items, setItems] = useState(queItems);

	//const randomInit = Math.floor(Math.random() * items.length);

	items.sort(()=> 0.5 - Math.random());
	const randomItem = items[0];

	const [currentQuestion, setCurrentQuestion] = useState(0);
	console.log(currentQuestion);

	const handleAnswerButtonClick = (isCorrect) => {
		if (isCorrect) {
			alert ("That is correct. Good job!");
			setScore(score + 1);
		} else {
			alert ("That is wrong. Nice try!")
		}

		console.log("randominside " + randomItem);
		for( var y = 0; y < items.length; y++){ 
    
			if ( items[y] === currentQuestion) { 
				items.splice(y, 1); 
				y--;
				setItems(items);
			}
		}

		setQuecount(quecount + 1);
		if(quecount < 10) {
			setCurrentQuestion(items[0]);
		} else {
			setShowScore(true);
		}
	}

	//Sorting Answer Set
	const sortAnswers = questions[currentQuestion].answerOptions;
	sortAnswers.sort(()=> 0.5 - Math.random());

	return (
		<div className='app'>
			{showScore ? (
				<div className='score-section'>You scored {score} out of 10
					<br></br><button onClick={refreshPage}>Another game?</button>
				</div>
				
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>What dinousaur is this?</span>
						</div>
						<img className='img-dino' src={questions[currentQuestion].image} alt="" />
					</div>
					<div className='answer-section'>
						{sortAnswers.map((answerOptions, index) => (
							<button key={index} onClick={() => handleAnswerButtonClick(answerOptions.isCorrect)}>{answerOptions.answerText}</button>
						))}
					</div>
				</>
			)}
		</div>
	);
}