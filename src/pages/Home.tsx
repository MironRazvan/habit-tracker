import { MoonLoader } from "react-spinners"
import useAuthStore from "../stores/authStore"
import { useFetchDefaultHabits } from "../utils/useFetchDefaultHabits"
import { useFetchUserHabits } from "../utils/useFetchUserHabits"
import Carousel from "../components/Carousel"
import UserHabitsHeader from "../components/UserHabitsHeader"

const Home = () => {
	const { user, loading } = useAuthStore()
	const { habits, habitsLoading } = useFetchDefaultHabits()
	const { userHabits } = useFetchUserHabits()
	console.log(user)

	return loading || habitsLoading ? (
		<div className="auth__loading">
			<MoonLoader />
		</div>
	) : (
		<div className="page-container">
			<div className="cards-container">
				<Carousel items={habits} />
			</div>
			{userHabits && (
				<div className="user-habits-container">
					<UserHabitsHeader />
				</div>
			)}
		</div>
	)
}

export default Home
