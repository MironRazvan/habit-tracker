import { useNavigate } from "react-router-dom"
import { auth } from "../firebase/firebase"
import { useEffect, useState } from "react"
import useAuthStore from "../stores/authStore"

const LoginRedirect = () => {
	const navigate = useNavigate()
	const [displayName, setDisplayName] = useState("")
	const { user, loading, error, logout, updateUser } = useAuthStore()

	const handleLogout = async () => {
		await logout()
		navigate("/")
	}

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		await updateUser({
			displayName: displayName,
		})
	}

	useEffect(() => {
		if (!user) {
			navigate("/")
		} else if (user.displayName) {
			navigate("/home")
		}
	}, [auth, user])

	loading && <p>Loading</p>

	error && <p>{error}</p>

	return (
		<div className="finish__container">
			<h2>Almost there!</h2>
			<h3>Let's finish filling in your details!</h3>
			<form
				className="finish__form"
				onSubmit={(e) => handleFormSubmit(e)}
			>
				<input
					type="text"
					value={displayName}
					id="displayName"
					placeholder="e.g. John"
					onChange={(e) => setDisplayName(e.target.value)}
				/>
				<button type="submit">Finish</button>
			</form>
			<button type="button" onClick={handleLogout}>
				Logout
			</button>
		</div>
	)
}

export default LoginRedirect
