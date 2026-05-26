package com.bank.core_api_customer.web;

import com.bank.core_api_customer.dto.GenericDTO;
import com.bank.core_api_customer.dto.GetCustomerDetailsRequestDTO;
import com.bank.core_api_customer.services.CustomerDetailsService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/core-api-customer")
public class MainResource {

    private final CustomerDetailsService customerDetailsService;

    @GetMapping("/customerDetails")
    public GenericDTO getCustomerDetailService(
            GetCustomerDetailsRequestDTO requestDTO
    ){
        return customerDetailsService.getCustomerDetailsFromClient(requestDTO);
    }
}
