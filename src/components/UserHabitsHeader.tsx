import { useEffect } from "react"
import useAuthStore from "../stores/authStore"
import { useFetchUserHabits } from "../utils/useFetchUserHabits"
import { useNavigate } from "react-router-dom"
import { removeHabitFromUser } from "../firebase/habitService"

const UserHabitsHeader = () => {
	const navigate = useNavigate()
	const { user } = useAuthStore()
	const { userHabits, userHabitsLoading } = useFetchUserHabits()

	useEffect(() => {
		if (!user) {
			navigate("/")
		}
	}, [user, userHabits])

	console.log(userHabits)

	const handleStreakCalculations = (startDate: string) => {
		const startDateFormated = new Date(startDate)
		const now = new Date()

		const diff = Math.abs(now.getTime() - startDateFormated.getTime())
		const diffInDays = Math.floor(diff / (1000 * 3600 * 24))
		console.log("diff in days", diffInDays)

		return diffInDays ? diffInDays : 0
	}

	return (
		!userHabitsLoading &&
		user && (
			<section className="user-habits">
				{userHabits?.map((item) => (
					<div key={item.id} className="short-habit">
						<h3>{item.title}</h3>
						<span>
							<p>Streak goal:</p> <p>{item.streak_goal}</p>
						</span>
						<span>
							<p>Progress:</p>
							<p>
								{handleStreakCalculations(item.start_date)}
								{" days"}
							</p>
						</span>
						<span>
							<p>Starting date:</p> <p>{item.start_date}</p>
						</span>
						<button
							onClick={() =>
								removeHabitFromUser(user.uid, item.id)
							}
						>
							Delete
						</button>
					</div>
				))}
			</section>
		)
	)
}

export default UserHabitsHeader
