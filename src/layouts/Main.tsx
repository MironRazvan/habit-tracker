import { Outlet, useNavigate } from "react-router-dom"
import useAuthStore from "../stores/authStore"
import { useEffect } from "react"
const Main = () => {
	const { user } = useAuthStore()
	const navigate = useNavigate()

	useEffect(() => {
		console.log("in main.tsx")
		if (!user) {
			navigate("/")
		}
	}, [user, navigate])

	return (
		<main className="main-wrapper">
			<Outlet />
		</main>
	)
}

export default Main
