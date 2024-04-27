const App = () => (
	<div>
		<Person
			name='David'
			age={28}
			hobbies={['climbing', 'music', 'screenwriting']}
		/>
		<Person
			name='Groundhog'
			age={2}
			hobbies={['eating', 'sleeping']}
		/>
		<Person
			name='Penguin'
			age={18}
			hobbies={['making music', 'busking', 'touring']}
		/>
	</div>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
