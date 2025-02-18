import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Main from "./layouts/Main"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Auth from "./pages/Auth"
import LoginRedirect from "./pages/LoginRedirect"

import "./styles/App.css"

function App() {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path="/" element={<Main />}>
					<Route index element={<Auth />} />
					<Route path="/finalize-auth" element={<LoginRedirect />} />
					<Route path="home" element={<Home />} />
					<Route path="about" element={<About />} />
					<Route path="contact" element={<Contact />} />
					<Route path="*" element={<Navigate to="/" replace />} />
				</Route>
			</Routes>
			<Footer />
		</Router>
	)
}

export default App
