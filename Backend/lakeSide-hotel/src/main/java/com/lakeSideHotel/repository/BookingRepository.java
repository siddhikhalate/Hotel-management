package com.lakeSideHotel.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lakeSideHotel.model.BookedRoom;

public interface BookingRepository  extends JpaRepository<BookedRoom, Long>{

	void deleteById(Long bookingId);
	
	
	 Optional<BookedRoom> findByBookingConfirmationCode(String confirmationCode);


	List<BookedRoom> findAll();

	List<BookedRoom> findByRoomId(Long roomId);


	List<BookedRoom> findByGuestEmail(String email);

}
