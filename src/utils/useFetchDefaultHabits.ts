import { useEffect, useState } from "react"
import { collection, query, orderBy, getDocs, limit } from "firebase/firestore"
import { db } from "../firebase/firebase"

export type THabit = {
	id: string
	title: string
	xp: number
	duration: string
	category: string
	description: string
	difficulty: string
	streak_goal: number
	total_uses: number
}

export function useFetchDefaultHabits() {
	const [habits, setHabits] = useState<THabit[]>([])
	const [habitsLoading, setHabitsLoading] = useState(true)

	useEffect(() => {
		const fetchMostUsed = async () => {
			try {
				const dbRef = collection(db, "predefined_habits")

				const q = query(dbRef, orderBy("total_uses", "desc"), limit(6))

				const querySnapshot = await getDocs(q)

				const refractoredData = querySnapshot.docs.map((doc) => {
					// console.log(doc.id, "=>", doc.data())
					return { id: doc.id, ...doc.data() } as THabit
				})

				setHabits(refractoredData)
			} catch (error) {
				console.error("Error fetching habits:", error)
			} finally {
				setHabitsLoading(false)
			}
		}

		fetchMostUsed()
	}, [])

	return { habits, habitsLoading }
}
