package com.lakeSideHotel.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lakeSideHotel.exception.UserAlreadyExistsException;
import com.lakeSideHotel.model.User;
import com.lakeSideHotel.request.LoginRequest;
import com.lakeSideHotel.response.JwtResponse;
import com.lakeSideHotel.security.jwt.JwtUtils;
import com.lakeSideHotel.security.user.HotelUserDetails;
import com.lakeSideHotel.service.IUserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
	 private final IUserService userService;
	 private final AuthenticationManager authenticationManager;
	    private final JwtUtils jwtUtils;
	 
	  @PostMapping("/register-user")
	    public ResponseEntity<?> registerUser(@RequestBody User user){
	        try{
	            userService.registerUser(user);
	            return ResponseEntity.ok("Registration successful!");

	        }catch (UserAlreadyExistsException e){
	            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
	        }
	    }
	  
	  @PostMapping("/login")
	    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest request){
	        Authentication authentication =
	                authenticationManager
	                        .authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
	        SecurityContextHolder.getContext().setAuthentication(authentication);
	        String jwt = jwtUtils.generateJwtTokenForUser(authentication);
	        HotelUserDetails userDetails = (HotelUserDetails) authentication.getPrincipal();
	        List<String> roles = userDetails.getAuthorities()
	                .stream()
	                .map(GrantedAuthority::getAuthority).toList();
	        return ResponseEntity.ok(new JwtResponse(
	                userDetails.getId(),
	                userDetails.getEmail(),
	                jwt,
	                roles));
	    }

}
