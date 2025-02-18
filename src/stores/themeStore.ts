import { create } from "zustand"

type TTheme = {
	currentTheme: "light" | "dark"
	toggleTheme: () => void
}

const useThemeStore = create<TTheme>((set) => ({
	currentTheme:
		(localStorage.getItem("habit-tracker-theme") as "light" | "dark") ||
		"light",
	toggleTheme: () => {
		set((state) => {
			const newTheme = state.currentTheme === "light" ? "dark" : "light"
			localStorage.setItem("habit-tracker-theme", newTheme)
			return {
				currentTheme: state.currentTheme === "light" ? "dark" : "light",
			}
		})
	},
}))

export default useThemeStore
