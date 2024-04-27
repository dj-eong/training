const App = () => (
	<div>
		<Tweet
			username='dj-eong'
			name='David'
			message='Hello World!'
			date={new Date().toDateString()}
		/>
		<Tweet
			username='groundhog'
			name='Groundhog'
			message="When's Groundhog Day?"
			date={new Date().toDateString()}
		/>
		<Tweet
			username='penguin'
			message="I'm in Tokyo!"
			date={new Date().toDateString()}
		/>
	</div>
);

const root = ReactDOM.createRoot(document.getElementById('root')); // createRoot(container!) if you use TypeScript
root.render(<App />);
// ReactDOM.render(<App />, document.getElementById("root"))
