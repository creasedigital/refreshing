import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function Form() {
	const navigate = useNavigate();
	const SignUpSchema = yup.object().shape({
		fullName: yup.string().required("Full name is required"),
		email: yup.string().email().required(),
		age: yup.number().positive().integer().min(18).required(),
		password: yup.string().min(8).max(32).required(),
		confirmPassword: yup.string().oneOf([yup.ref("password")]),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(SignUpSchema),
	});

	const onSubmit = (data: object) => {
		console.log("Form submitted!", data);
		navigate("/settings");
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "start",
				textAlign: "left",
			}}
		>
			<div>
				<label htmlFor="full-name">Full Name:</label>
				<input
					type="text"
					id="full-name"
					{...register("fullName", { required: true })}
					placeholder="Enter your full name"
				/>
				{errors.fullName && (
					<p style={{ color: "red" }}>This field is required</p>
				)}
			</div>

			<div>
				<label htmlFor="email">Email:</label>
				<input
					type="email"
					id="email"
					{...register("email", { required: true })}
				/>
			</div>

			<div>
				<label htmlFor="age">Age:</label>
				<input
					type="number"
					id="age"
					{...register("age", { required: true })}
				/>
			</div>

			<div>
				<label htmlFor="password">Password:</label>
				<input
					type="password"
					id="password"
					{...register("password", { required: true })}
				/>
			</div>

			<div>
				<label htmlFor="confirm-password">Confirm Password:</label>
				<input
					type="password"
					id="confirm-password"
					{...register("confirmPassword", { required: true })}
				/>
			</div>

			<div>
				<label htmlFor="checkbox">Checkbox:</label>
				<input
					type="checkbox"
					id="checkbox"
					{...register("checkbox", { required: true })}
				/>
			</div>

			<button type="submit">Submit</button>
		</form>
	);
}

export default Form;
