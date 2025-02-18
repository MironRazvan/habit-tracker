import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useAuthStore from "../stores/authStore"
import { MoonLoader } from "react-spinners"

const Auth = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [passwordCheck, setPasswordCheck] = useState("")

	const [isRegistering, setIsRegistering] = useState(false)

	const [step, setStep] = useState(0)
	const [isForward, setIsForward] = useState(true)
	const [showAlternateContent, setShowAlternateContent] = useState(false)

	const navigate = useNavigate()

	const {
		user,
		loading,
		error,
		loginInWithEmail,
		loginInWithGoogle,
		createAccountWithEmail,
		clearError,
	} = useAuthStore()

	const ANIMATION_DURATION = 300 // milliseconds

	useEffect(() => {
		if (user) {
			navigate("/finalize-auth")
		}
	}, [user])

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		clearError()
		isRegistering
			? createAccountWithEmail(email, password)
			: loginInWithEmail(email, password)
	}

	const handleGoogleLogin = () => {
		loginInWithGoogle()
	}

	const handleAnimation = () => {
		setIsRegistering(!isRegistering)
		clearError()

		if (isForward && step === 0) {
			setStep(1)
			setTimeout(() => {
				setShowAlternateContent(true)
				setStep(2)
			}, ANIMATION_DURATION)
			setTimeout(() => setStep(3), ANIMATION_DURATION * 2)
		} else if (step === 3) {
			setIsForward(false)
			setStep(2)
			setTimeout(() => {
				setStep(1)
				setShowAlternateContent(false)
			}, ANIMATION_DURATION)
			setTimeout(() => {
				setStep(0)
				setIsForward(true)
			}, ANIMATION_DURATION * 2)
		}
	}

	const getTopPanelClasses = (): string => {
		const classes = ["panel", "panel-top", "auth__box", "auth__info"]
		if (step === 1 || step === 2) classes.push("panel-expanded")
		if (step === 3) classes.push("panel-final")
		return classes.join(" ")
	}

	const getBottomPanelClasses = (): string => {
		const classes = [
			"panel",
			"panel-bottom",
			"auth__box",
			"auth__form__container",
		]
		if (step >= 2) classes.push("panel-swapped")
		return classes.join(" ")
	}

	return loading ? (
		<div className="auth__loading">
			<MoonLoader />
		</div>
	) : (
		<div className="auth__container">
			<div className="panels-wrapper">
				<div className={getTopPanelClasses()}>
					<h2>{isRegistering ? "Register" : "Login"}</h2>
				</div>

				<div className={getBottomPanelClasses()}>
					{/* Content switches when panel is covered */}
					{showAlternateContent ? (
						<form className="auth__form" onSubmit={handleSubmit}>
							<input
								type="email"
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
							<input
								type="password"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
							<input
								type="password"
								placeholder="Password check"
								value={passwordCheck}
								onChange={(e) =>
									setPasswordCheck(e.target.value)
								}
								required
							/>

							<button type="submit">Register</button>
						</form>
					) : (
						<form className="auth__form" onSubmit={handleSubmit}>
							<input
								type="email"
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
							<input
								type="password"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
							<button type="submit">Login</button>
							<button
								type="submit"
								onClick={() => handleGoogleLogin()}
							>
								Login with Google
							</button>
						</form>
					)}
				</div>
			</div>
			<div className="auth__button">
				<h3>
					{isRegistering
						? "Already have an account?"
						: "Don't have an account?"}
				</h3>
				<button
					className="auth__toggleBtn"
					onClick={handleAnimation}
					disabled={step !== 0 && step !== 3}
				>
					{step === 0
						? "Register"
						: step === 3
						? "Login"
						: "Loading..."}
				</button>
			</div>
			{error && <p className="auth__error">{error}</p>}
		</div>
	)
}

export default Auth
