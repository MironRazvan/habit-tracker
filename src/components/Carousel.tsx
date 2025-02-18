import { useEffect, useState } from "react"
import Card from "./Card"
import { THabit } from "../utils/useFetchDefaultHabits"

type CarouselProps = {
	items: THabit[]
}

const cardTypes = ["previous", "current", "next"]

const Carousel: React.FC<CarouselProps> = (list) => {
	const [carouselItems, setCarouselItems] = useState<HTMLDivElement[]>()
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		// add initial classes to cards
		const parent = document.getElementById("carousel")
		if (parent) {
			const children = Array.from(parent.children) as HTMLDivElement[]
			setCarouselItems(Array.from(children))
			setIsLoaded(true)

			Array.from(children).map((item, index) => {
				item.classList.add(cardTypes[index + 1] || "next")
			})
		}
	}, [])

	useEffect(() => {
		// if carouselItems finished loading
		// set the initial z-index
		if (carouselItems) {
			calculateZIndexes(carouselItems, carouselItems[0])
		}
	}, [isLoaded])

	const calculateZIndexes = (
		list: HTMLDivElement[],
		focusElement: HTMLDivElement
	) => {
		if (carouselItems) {
			const focusElementIndex = carouselItems.indexOf(focusElement) || 0
			list.forEach((item, index) => {
				item.style.zIndex =
					index < carouselItems.indexOf(focusElement)
						? String(list.length - (focusElementIndex - index))
						: String(list.length + (focusElementIndex - index))
			})
		}
	}

	const toggleCardClassNames = (
		item: HTMLDivElement,
		to: string,
		onTop?: boolean
	) => {
		item.className = `carousel-item ${to}`
		if (onTop && carouselItems) {
			item.style.zIndex = String(carouselItems.length + 1)
			calculateZIndexes(carouselItems, item)
		}
		return item
	}

	const handleHightlight = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		// remove current positioning class of the target element
		// change the element that has the "current" positioning class to have the class oposite to target element
		// add "current" class to target element

		if (!carouselItems) return

		const clickedCard = e.currentTarget

		// check if it has the "next" class
		if (clickedCard.classList.contains("next")) {
			// set the card that has "current" to "next"
			carouselItems.forEach((item) =>
				item.classList.contains("current")
					? toggleCardClassNames(item, "previous")
					: item
			)
			// set the current clicked card to the "current" card
			toggleCardClassNames(clickedCard, "current", true)
			// else, check if the card has the "previous" class
		} else if (clickedCard.classList.contains("previous")) {
			carouselItems.forEach((item) =>
				item.classList.contains("current")
					? toggleCardClassNames(item, "next")
					: item
			)
			// set the current clicked card to the "current" card
			toggleCardClassNames(clickedCard, "current", true)
		}
	}

	return (
		<div className="cards-carousel" id="carousel">
			{list.items.map((item, index) => (
				<Card
					key={index}
					item={item}
					handleHighlight={handleHightlight}
				/>
			))}
		</div>
	)
}

export default Carousel
