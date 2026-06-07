package com.lakeSideHotel.service;

import java.util.List;

import com.lakeSideHotel.model.BookedRoom;

public interface IBookingService {


	void cancelBooking(Long bookingId);

	String saveBooking(Long roomId, BookedRoom bookingRequest);

	BookedRoom findByBookingConfirmationCode(String confirmationCode);

	List<BookedRoom> getAllBookings();

	List<BookedRoom> getBookingsByUserEmail(String email);

}
