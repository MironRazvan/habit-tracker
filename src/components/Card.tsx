import { useState } from "react"
import { THabit } from "../utils/useFetchDefaultHabits"
import { addHabitToUser } from "../firebase/habitService"
import useAuthStore from "../stores/authStore"

type CardProps = {
	item: THabit
	handleHighlight: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const Card: React.FC<CardProps> = ({ item, handleHighlight }) => {
	const { user } = useAuthStore()
	const [flipped, setFlipped] = useState(false)

	const toCamelCase = (text: string) => {
		return text.charAt(0).toUpperCase() + text.slice(1, text.length)
	}

	const handleAddHabit = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.stopPropagation()
		addNewHabit(e)
	}

	const addNewHabit = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.stopPropagation()
		if (user) {
			await addHabitToUser(user.uid, {
				id: item.id,
				title: item.title,
				start_date: new Date()
					.toLocaleDateString("en-GB", {
						weekday: "short",
						year: "2-digit",
						month: "short",
						day: "2-digit",
					})
					.split(", ")[1],
				streak_goal: item.streak_goal,
			})
		}
	}

	return (
		<div className="carousel-item" onClick={(e) => handleHighlight(e)}>
			<div className="carousel-inner-wrapper">
				<div className={`card-container ${flipped ? "flipped" : ""}`}>
					{/* Front Side (Default View) */}
					<div className="card-front">
						<div className="card-header">
							<h1 className="card-title">{item.title}</h1>
							<span className="card-xp">{item.xp}</span>
						</div>

						{/* Category Label */}
						<span className="card-category">{item.category}</span>

						<div className="card-description">
							<p>{item.description}</p>
							<button
								className="flip-card"
								onClick={() => setFlipped(!flipped)}
							>
								More
							</button>
						</div>

						<div className="card-bottom-section">
							<span className="card-duration">
								⏳&nbsp;{toCamelCase(item.duration)}
							</span>
							<span className="card-streak">
								🔥&nbsp;{item.streak_goal}
							</span>
						</div>
					</div>

					{/* Back Side (Flipped View) */}
					<div className="card-back">
						<h2 className="card-title">{item.title}</h2>
						<div className="card-details">
							<span>
								<strong>Duration</strong>
								<p>{toCamelCase(item.duration)}</p>
							</span>
							<span>
								<strong>Difficulty</strong>
								<p>{toCamelCase(item.difficulty)}</p>
							</span>
							<span>
								<strong>Streak Goal</strong>
								<p>{item.streak_goal} days</p>
							</span>
							<span>
								<strong>XP</strong>
								<p>{item.xp}</p>
							</span>
						</div>
						<div className="card-buttons">
							<button
								className="flip-card"
								onClick={() => setFlipped(!flipped)}
							>
								Less
							</button>
							<button
								className="card-add-btn"
								onClick={(e) => handleAddHabit(e)}
							>
								Add
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Card
