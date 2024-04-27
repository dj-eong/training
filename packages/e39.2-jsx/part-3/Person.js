const Person = ({ name, age, hobbies }) => {
	const intro = (
		<h3>Learn some information about this person.</h3>
	);
	const voteAge = age > 18 ? <h3>please go vote!</h3> : <h3>you must be 18.</h3>;
	const nameDisplay = name.length > 8 ? name.slice(0, 6) : name;


	return (
		<div>
			{intro}
			<ul>
				<li>Name: {nameDisplay}</li>
				<li>Age: {age}</li>
			</ul>
			<ul>
				Hobbies:
				{hobbies.map(h => <li>{h}</li>)}
			</ul>
			{voteAge}
		</div>);
};