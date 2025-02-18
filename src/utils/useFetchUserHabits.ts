import { useEffect, useState } from "react"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "../firebase/firebase"
import useAuthStore from "../stores/authStore"

type UserHabit = {
	id: string
	title: string
	start_date: string
	streak_goal: number
}

export function useFetchUserHabits() {
	const { user } = useAuthStore()
	const [userHabits, setUserHabits] = useState<UserHabit[]>([])
	const [userHabitsLoading, setUserHabitsLoading] = useState(true)

	useEffect(() => {
		if (!user) return

		const docRef = doc(db, "user_habits", user.uid)

		const unsubscribe = onSnapshot(docRef, (docSnap) => {
			if (docSnap.exists()) {
				setUserHabits(docSnap.data().habits as UserHabit[])
				setUserHabitsLoading(false)
			}
		})

		return () => unsubscribe()
	}, [])

	return { userHabits, userHabitsLoading }
}
