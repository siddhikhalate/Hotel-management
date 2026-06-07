// import React,{useState, useEffect } from "react"
// import {getAllBookings , cancelBooking} from "../utils/ApiFuntions"
// import Header from "../common/Header"
// import BookingsTable from "./BookingsTable"

// const Bookings = () => {
// 	const [bookingInfo, setBookingInfo] = useState([])
// 	const [isLoading, setIsLoading] = useState(true)
// 	const [error, setError] = useState("")

// 	useEffect(() => {
// 		setTimeout(() => {
// 			getAllBookings()
// 				.then((data) => {
// 					setBookingInfo(data)
// 					setIsLoading(false)
// 				})
// 				.catch((error) => {
// 					setError(error.message)
// 					setIsLoading(false)
// 				})
// 		}, 1000)
// 	}, [])

// 	const handleBookingCancellation = async (bookingId) => {
// 		try {
// 			await cancelBooking(bookingId)
// 			const data = await getAllBookings()
// 			setBookingInfo(data)
// 		} catch (error) {
// 			setError(error.message)
// 		}
// 	}

// 	return (
// 		<section style={{ backgroundColor: "whitesmoke" }}>
// 			<Header title={"Existing Bookings"} />
// 			{error && <div className="text-danger">{error}</div>}
// 			{isLoading ? (
// 				<div>Loading existing bookings</div>
// 			) : (
// 				<BookingsTable
// 					bookingInfo={bookingInfo}
// 					handleBookingCancellation={handleBookingCancellation}
// 				/>
// 			)}
// 		</section>
// 	)
// }

// export default Bookings/

import React, { useState, useEffect } from "react"
import { getAllBookings, cancelBooking } from "../utils/ApiFuntions"
import Header from "../common/Header"
import BookingsTable from "./BookingsTable"

const Bookings = () => {
	const [bookingInfo, setBookingInfo] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState("")

	useEffect(() => {
		const timer = setTimeout(() => {
			getAllBookings()
				.then((data) => {
					setBookingInfo(Array.isArray(data) ? data : [])
					setIsLoading(false)
				})
				.catch((error) => {
					setError(error.message)
					setBookingInfo([])
					setIsLoading(false)
				})
		}, 1000)

		return () => clearTimeout(timer) // Cleanup timeout on unmount
	}, [])

	const handleBookingCancellation = async (bookingId) => {
		try {
			setIsLoading(true)
			await cancelBooking(bookingId)
			const data = await getAllBookings()
			setBookingInfo(Array.isArray(data) ? data : [])
			setIsLoading(false)
		} catch (error) {
			setError(error.message)
			setBookingInfo([])
			setIsLoading(false)
		}
	}

	return (
		<section style={{ backgroundColor: "whitesmoke" }}>
			<Header title={"Existing Bookings"} />
			{error && <div className="alert alert-danger mx-5 mt-3">{error}</div>}
			{isLoading ? (
				<div className="text-center p-5">Loading existing bookings...</div>
			) : (
				<BookingsTable
					bookingInfo={bookingInfo}
					handleBookingCancellation={handleBookingCancellation}
				/>
			)}
		</section>
	)
}

export default Bookings
