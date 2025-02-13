import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Main from "./layouts/Main"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"

import "./styles/App.css"

function App() {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path="/" element={<Main />}>
					<Route index element={<Home />} />
					<Route path="about" element={<About />} />
					<Route path="contact" element={<Contact />} />
				</Route>
			</Routes>
			<Footer />
		</Router>
	)
}

export default App
