package com.lakeSideHotel.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class HomeController {
	   @GetMapping("/")
	    public String home() {
	        return "LakeSide Hotel Backend is running successfully on port 9192!";
	    }

}
