const App = () => (
	<div>
		<FirstComponent />
		<NamedComponent name='David' />
	</div>
);

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
// ReactDOM.render(<App />, document.getElementById("root"))
