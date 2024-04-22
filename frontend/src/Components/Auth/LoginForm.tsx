import { useState } from "react";
import { authUser } from "util/api";
import { User } from "types/user";
import { useLocation, useNavigate } from "react-router";

import googleIcon from "../../images/googlelogo.svg";
import warningIcon from "../../images/warningicon.png";
import { XClose } from "util/common_styles";
import { baseURL, clientUrl } from "util/util";
import styled from "styled-components";

interface LoginFormProps {
	cancelHandler: () => void;
	from: String;
	children?: React.ReactNode;
}

const fields = {
	password: {
		val: "",
		valid: true,
		errorMessage: "Please enter valid password.",
	},
	email: {
		val: "",
		valid: true,
		errorMessage: "Please enter valid email address.",
	},
};

const LoginForm: React.FC<LoginFormProps> = ({ cancelHandler, from }) => {
	const navigate = useNavigate();
	const location = useLocation().pathname;

	const [formInputs, setFormInputs] = useState(fields);
	const [errorMessage, setErrorMessage] = useState("");

	const validateInputsForSubmit = () => {
		let isInvalid = false;
		Object.keys(formInputs).forEach((key: any) => {
			const input = formInputs[key];
			if (
				input.val === "" ||
				(key === "email" &&
					!/[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(input.val))
			) {
				isInvalid = true;
				setErrorMessage(input.errorMessage);
				setFormInputs((prev) => ({
					...prev,
					[key]: { ...input, valid: false },
				}));
			}
		});
		return isInvalid;
	};

	const sendAuthRequest = async (mode: string, data: any) => {
		const formData: User | any = Object.fromEntries(data.entries());
		const res = await authUser(mode, formData);
		if (res.status === 201) {
			location.includes("signup") ? navigate(-1) : window.location.reload();
		}
		res.status === 300 && setErrorMessage("A user is already logged in!");
		res.status === 401 &&
			setErrorMessage("Either email or password is invalid!");
		res.status === 500 && setErrorMessage("An error occured.");
	};

	const submitLoginForm = async (event: any) => {
		event.preventDefault();
		const data = new FormData(event.target as HTMLFormElement);
		const isInvalid = validateInputsForSubmit();
		!isInvalid && sendAuthRequest("login", data);
	};

	const inputOnChange = ({
		type,
		value,
	}: {
		type: "email" | "password";
		value: string;
	}) => {
		setFormInputs({
			...formInputs,
			[type]: {
				...formInputs[type],
				val: value,
				valid:
					type === "email"
						? /[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(value) ||
						  value === ""
							? true
							: false
						: true,
			},
		});
		setErrorMessage("");
	};

	return (
		<Login method="post" onSubmit={submitLoginForm}>
			<LoginHeader>Log in</LoginHeader>
			<XClose type="button" onClick={cancelHandler} />
			<LoginContents>
				{errorMessage !== "" && (
					<Error>
						<Img src={warningIcon} alt="warning icon" />
						{errorMessage}
					</Error>
				)}
				{process.env.NODE_ENV === "production" && (
					<Info>
						<Img src={warningIcon} alt="warning icon" />
						We're currently still in development, logging in is disabled, check
						us out later ^^
					</Info>
				)}
				<InputSection $isInvalid={!formInputs["email"].valid}>
					<label htmlFor="email" />
					<input
						type="email"
						name="email"
						id="email"
						placeholder="Email"
						onChange={(e) =>
							inputOnChange({ type: "email", value: e.target.value })
						}
					/>
				</InputSection>
				<InputSection $isInvalid={!formInputs["password"].valid}>
					<label htmlFor="password" />
					<input
						type="password"
						name="password"
						id="password"
						placeholder="Password"
						onChange={(e) =>
							inputOnChange({ type: "password", value: e.target.value })
						}
					/>
				</InputSection>
				<LoginOptionsSection>
					<div>
						<input type="checkbox" name="remember_me" id="remember_me" />
						<label htmlFor="remember_me">Remember me</label>
					</div>
					<a href="#">Forgot password?</a>
				</LoginOptionsSection>
				<LoginActions>
					<LoginBtn
						type="submit"
						disabled={process.env.NODE_ENV === "production" ? true : false}
					>
						Log in
					</LoginBtn>
					<span>or</span>
					<GoogleLogin
						href={
							process.env.NODE_ENV === "production"
								? "#"
								: baseURL + "/auth/google?redirect_url=" + clientUrl + from
						}
					>
						<Img src={googleIcon} alt="Google logo" />
						<p>Continue with Google</p>
					</GoogleLogin>
					<div>
						<span>Not a member yet?</span>
						<Join href={process.env.NODE_ENV === "production" ? "#" : "signup"}>
							Join
						</Join>
					</div>
				</LoginActions>
			</LoginContents>
		</Login>
	);
};

export default LoginForm;

const Login = styled.form`
	display: flex;
	flex-direction: column;
	max-width: 40rem;
	margin: 30px auto;
`;

const LoginHeader = styled.header`
	font-size: 23px;
	font-weight: 550;
	color: black;
	margin: 0;
	text-align: center;
	padding-bottom: 30px;
	&:after {
		content: "______";
		display: block;
		color: #868080;
	}
`;

const LoginContents = styled.div`
	padding: 5px 40px;
`;

const InputSection = styled.section<{ $isInvalid: boolean }>`
	padding: 5px 0px;
	> input {
		width: 100%;
		background-color: white;
		border: 1.5px solid #d8d0d0;
		border-radius: 15px;
		padding: 12px 8px;
		font-size: 15px;
		${(p) => p.$isInvalid && "border-color: rgba(255, 0, 0, 0.296);"}
		&:focus,
		&:hover {
			outline: none;
			border: 1.5px solid grey;
		}
	}
`;

const LoginOptionsSection = styled.section`
	display: flex;
	justify-content: space-between;
	margin-bottom: 30px;
	> div > label {
		cursor: pointer;
		color: black;
		font-size: 12px;
	}
	> a {
		color: black;
		text-decoration: none;
		font-size: 12px;
		&:hover {
			color: grey;
		}
	}
`;

const Img = styled.img`
	height: 18px;
	width: 18px;
	min-height: 18px;
	min-width: 18px;
	margin-right: 8px;
	text-indent: 0px;
`;

const LoginActions = styled.div`
	display: flex;
	flex-direction: column;
	> span,
	> div > span {
		padding: 20px 10px;
		text-align: center;
		font-size: 15px;
		font-weight: 500;
		line-height: 0.7;
		color: grey;
	}
	> div {
		display: flex;
		flex-direction: column;
		margin-top: 20px;
	}
`;

const LoginBtn = styled.button`
	width: 100%;
	font-size: 15px;
	line-height: 1.6;
	cursor: pointer;
	padding: 8px 12px;
	border-radius: 15px;
	background-color: #2c3333;
	color: white;
	border: none;
	&:hover {
		background-color: #1c2727;
	}
`;

const GoogleLogin = styled.a`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	cursor: pointer;
	padding: 8px 12px;
	border-radius: 15px;
	background-color: white;
	border: 1px solid black;
	text-decoration: none;
	&:hover {
		background-color: rgb(244, 244, 243);
	}
	> p {
		margin: 0;
		font-size: 15px;
		line-height: 1.6;
		color: black;
	}
`;

const Join = styled.a`
	width: 25%;
	margin: 10px auto;
	padding: 8px 12px;
	font-size: 15px;
	font-weight: 500;
	line-height: 1.6;
	text-align: center;
	text-decoration: none;
	border-radius: 15px;
	background-color: #2c3333;
	color: white;
	&:hover {
		background-color: #1c2727;
	}
`;

const Info = styled.p`
	border: 1px solid #9cae9c;
	background-color: #9cae9c;
	width: 100%;
	font-size: 14px;
	color: #152515;
	padding: 10px;
	margin-top: 10px;
	margin-bottom: 10px;
	border-radius: 15px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Error = styled.p`
	border: 1px solid #eac8c8;
	background-color: #eac8c8;
	width: 100%;
	height: 40px;
	font-size: 14px;
	color: #6c2f2f;
	margin-top: 10px;
	margin-bottom: 10px;
	border-radius: 15px;
	display: flex;
	justify-content: center;
	align-items: center;
`;
