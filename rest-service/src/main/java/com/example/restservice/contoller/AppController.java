package com.example.restservice.contoller;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.jdbc.core.JdbcTemplate;

@CrossOrigin
@RestController
public class AppController {
    
    @Autowired JdbcTemplate jdbcTemplate;

    /**
     * inserts card number into db
     * @param cardNumber
     * @return 
     */
    
    @GetMapping("/submitCard")
    public String submitCard(@RequestParam(value="cardNumber")String cardNumber){
        String sql = "INSERT INTO CARD_NUMBERS(CARD_NUMBER) VALUES(?)";
        
        jdbcTemplate.update(sql,cardNumber);
        return "card inserted";
    }
    
    @GetMapping("/")
    public String main(){
        return "Main server";
    }

    /*
     * Returns all cards in database
     */
   
    @GetMapping("/getCards")
    public List<Map<String, Object>> getCards(){

        String sql = "SELECT * FROM CARD_NUMBERS ";
       
        return jdbcTemplate.queryForList(sql);
    }
}
