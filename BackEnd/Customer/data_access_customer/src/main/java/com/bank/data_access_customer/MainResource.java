package com.bank.data_access_customer;

import com.bank.data_access_customer.dto.GenericDTO;
import com.bank.data_access_customer.dto.GetCustomerDetailsRequestDTO;
import com.bank.data_access_customer.services.CustomerDetailsService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/data-access-customer")
public class MainResource {

    private final CustomerDetailsService customerDetailsService;

    MainResource(CustomerDetailsService customerDetailsService){
        this.customerDetailsService = customerDetailsService;
    }

    @GetMapping("/customerDetails")
    public GenericDTO hello(@Valid GetCustomerDetailsRequestDTO requestDTO){
        return customerDetailsService.getCustomerDetailsService(requestDTO);
    }
}
