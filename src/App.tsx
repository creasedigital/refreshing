// import { ChangeEvent, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Axios from "axios";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Settings from "./Settings";
import Form from "./Form";

/* type AppTypes = {
  handleSubmit: (event: SubmitEvent<any>) => void;
} */

/* interface ITodo {
	taskName: string;
	desc: string;
	isCompleted: boolean;
} */

function App() {
	/* const [todos, setTodos] = useState<ITodo[]>([
		{
			taskName: "",
			desc: "",
			isCompleted: false,
		},
	]); */

	const [catFact, setCatFact] = useState<string>("");
	const [age, setAge] = useState<string>("");
	const [name, setName] = useState<string>("");

	const handleFetch = () => {
		fetch("https://catfact.ninja/fact")
			.then((response) => {
				if (!response.ok) {
					throw new Error(
						"Sorry, there was an error fetching your cat fact.",
					);
				}
				return response.json();
			})
			.then((data) => {
				setCatFact(data.fact);
			})
			.catch((error) => {
				console.error(error.message);
			});
	};

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		const res: any = await Axios.get(`https://api.agify.io/?name=${name}`);
		setAge(res?.data.age);
	};

	const handleReset = () => {
		setAge("");
		setName("");
	};

	const client = new QueryClient();

	return (
		<QueryClientProvider client={client}>
			<>
				<div>
					<Router>
						<Routes>
							<Route path="/" element={<h1>Home</h1>} />
							<Route path="/settings" element={<Settings />} />
							<Route path="/form" element={<Form />} />
						</Routes>
					</Router>

					<button onClick={handleFetch}>Generate Cat Fact</button>
					{<div>{catFact}</div>}
				</div>
				<div>
					<form onSubmit={handleSubmit}>
						<input
							name="name"
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="example jonah"
						/>
						<button>Predict Age</button>
					</form>
					<h1>{age && `${name}'s age is ${age}`}</h1>
					<button type="reset" onClick={handleReset}>
						Reset Age
					</button>
				</div>
			</>
		</QueryClientProvider>
	);
}

export default App;
