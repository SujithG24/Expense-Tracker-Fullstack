package com.sujith.finance.controller;

import com.sujith.finance.dto.UserRequest;
import com.sujith.finance.dto.LoginRequest;
import com.sujith.finance.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public String register(@RequestBody UserRequest request) {
        return userService.registerUser(request);
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody LoginRequest request) {

        String token = userService.loginUser(request);

        Map<String, String> response = new HashMap<>();
        response.put("token", token);

        return response;
    }

    @GetMapping("/test")
    public String test() {
        return "Protected endpoint working";
    }

    @GetMapping("/jwt-test")
    public String testEndpoint() {
        return "JWT Working Successfully";
    }
}