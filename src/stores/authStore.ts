import { create } from "zustand"
import {
	auth,
	googleProvider,
	signInWithPopup,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
} from "../firebase/firebase"
import { onAuthStateChanged, User, updateProfile } from "firebase/auth"

type TAuthState = {
	user: User | null
	loading: boolean
	error: string | null
	loginInWithGoogle: () => Promise<void>
	loginInWithEmail: (email: string, password: string) => Promise<void>
	createAccountWithEmail: (email: string, password: string) => Promise<void>
	logout: () => Promise<void>
	setUser: (user: User | null) => void
	updateUser: (newData: Partial<User>) => Promise<void>
	clearError: () => void
}

const useAuthStore = create<TAuthState>((set) => {
	onAuthStateChanged(auth, (user) => {
		set({ user, loading: false })
	})

	return {
		user: null,
		loading: true,
		error: null,

		loginInWithGoogle: async () => {
			set({ loading: true })
			try {
				const result = await signInWithPopup(auth, googleProvider)
				set({ user: result.user, loading: false })
			} catch (error: any) {
				set({ error: error.message, loading: false })
			}
		},

		loginInWithEmail: async (email, password) => {
			set({ loading: true })
			try {
				const result = await signInWithEmailAndPassword(
					auth,
					email,
					password
				)
				set({ user: result.user, loading: false })
			} catch (error: any) {
				set({ error: error.message, loading: false })
			}
		},

		createAccountWithEmail: async (email, password) => {
			set({ loading: true })
			try {
				const result = await createUserWithEmailAndPassword(
					auth,
					email,
					password
				)
				set({ user: result.user, loading: false })
			} catch (error: any) {
				set({ error: error.message, loading: false })
			}
		},

		updateUser: async (newData) => {
			if (!auth.currentUser) return
			set({ loading: true })

			try {
				await updateProfile(auth.currentUser, newData)
				set((state) => ({
					user: { ...state.user, ...newData } as User,
					loading: false,
				}))
			} catch (error: any) {
				set({ error: error.message, loading: false })
			}
		},

		logout: async () => {
			await signOut(auth)
			set({ user: null, loading: false })
		},

		setUser: (user) => set({ user }),

		clearError: () => set({ error: null }),
	}
})

export default useAuthStore
