import { Menu } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Header = () => {
	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		// if (!isOpen) return

		const elem = document.querySelector(".main-wrapper")
		if (isOpen) {
			elem?.classList.add("blured")
		} else {
			elem?.classList.remove("blured")
		}
	}, [isOpen])

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
						</ul>
					</nav>
				</div>
			</>
		</div>
	)
}

export default Header
