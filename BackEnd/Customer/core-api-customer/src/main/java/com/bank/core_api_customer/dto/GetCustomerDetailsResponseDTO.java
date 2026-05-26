package com.bank.core_api_customer.dto;

import lombok.Data;

@Data
public class GetCustomerDetailsResponseDTO {

    private Long customerId;
    private String customerName;
    private Integer customerAge;
    private String customerPhone;
    private String customerNic;

}
