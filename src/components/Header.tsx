import { LogOut, Menu, Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import useThemeStore from "../stores/themeStore"
import useAuthStore from "../stores/authStore"

const Header = () => {
	const { currentTheme, toggleTheme } = useThemeStore()
	const [isOpen, setIsOpen] = useState(false)
	const { logout } = useAuthStore()

	useEffect(() => {
		const root = document.documentElement
		root.setAttribute("data-theme", currentTheme)
	}, [currentTheme])

	useEffect(() => {
		// if (!isOpen) return

		const elem = document.querySelector(".main-wrapper")
		if (isOpen) {
			elem?.classList.add("blured")
		} else {
			elem?.classList.remove("blured")
		}
	}, [isOpen])

	const handleLogout = () => {
		// toggleThemeBtn("on")
		logout()
		setIsOpen(false)
	}

	return (
		<div className="header-container">
			<h1 className="header-title">Hello</h1>
			<>
				<div className="menu-btn" onClick={() => setIsOpen(true)}>
					<Menu />
				</div>
				<div
					className={`nav-container overlay ${isOpen ? "open" : ""}`}
				>
					<button
						className="menu-close-btn"
						onClick={() => setIsOpen(false)}
					>
						✖
					</button>
					<nav>
						<ul>
							<li>
								<Link to="/" onClick={() => setIsOpen(false)}>
									Home
								</Link>
							</li>
							<li>
								<Link
									to="about"
									onClick={() => setIsOpen(false)}
								>
									About
								</Link>
							</li>
							<li>
								<Link
									to="contact"
									onClick={() => setIsOpen(false)}
								>
									Contact
								</Link>
							</li>
							<li>
								<button className="logout__btn">
									<LogOut onClick={handleLogout} />
								</button>
							</li>
							<li>
								<button
									id="theme__btn"
									className="theme__btn"
									onClick={() => toggleTheme()}
								>
									{currentTheme === "light" ? (
										<Moon />
									) : (
										<Sun />
									)}
								</button>
							</li>
						</ul>
					</nav>
				</div>
			</>
		</div>
	)
}

export default Header
