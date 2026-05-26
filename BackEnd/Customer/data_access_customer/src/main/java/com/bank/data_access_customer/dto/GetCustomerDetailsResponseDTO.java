package com.bank.data_access_customer.dto;

import lombok.Data;

@Data
public class GetCustomerDetailsResponseDTO {

    private Long customerId;
    private String customerName;
    private Integer customerAge;
    private String customerPhone;
    private String customerNic;

}
