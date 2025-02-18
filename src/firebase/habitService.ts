import { db } from "./firebase" // Import Firebase config
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore"

// ✅ Add a new habit to the user's list
export const addHabitToUser = async (
	userId: string,
	habit: {
		id: string
		title: string
		start_date: string
		streak_goal: number
	}
) => {
	try {
		const userDocRef = doc(db, "user_habits", userId)
		const userDocSnap = await getDoc(userDocRef)

		if (userDocSnap.exists()) {
			await updateDoc(userDocRef, { habits: arrayUnion(habit) })
		} else {
			await setDoc(userDocRef, { habits: [habit] })
		}

		console.log("Habit added successfully!")
	} catch (error) {
		console.error("Error adding habit:", error)
	}
}

// ✅ Remove a habit from the user's list
export const removeHabitFromUser = async (userId: string, habitId: string) => {
	try {
		const userDocRef = doc(db, "user_habits", userId)
		const userDocSnap = await getDoc(userDocRef)

		if (userDocSnap.exists()) {
			const updatedHabits = userDocSnap
				.data()
				.habits.filter((habit: any) => habit.id !== habitId)
			await updateDoc(userDocRef, { habits: updatedHabits })

			console.log("Habit removed successfully!")
		}
	} catch (error) {
		console.error("Error removing habit:", error)
	}
}
