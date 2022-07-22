package com.example.restservice.contoller;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.jdbc.core.JdbcTemplate;

@RestController
public class AppController {
    
    @Autowired JdbcTemplate jdbcTemplate;

    @GetMapping("/submitCard")
    public String submitCard(@RequestParam(value="cardNumber")String cardNumber){
        String sql = String.format("INSERT INTO CREDIT_CARDS VALUES (%s)",cardNumber);
        
        return "Your credit card is"+cardNumber;
    }
    @GetMapping("/")
    public String main(){
        return "Main server";
    }

    @GetMapping("/getCards")
    public List<Map<String, Object>> getCards(){

        String sql = "SELECT * FROM CARD_NUMBERS ";
       
        return jdbcTemplate.queryForList(sql);
    }
}
