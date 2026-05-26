package com.bank.core_api_customer.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class GetCustomerDetailsRequestDTO {

    private String customerName;

    private String customerNic;

    @NotBlank(message = "Response cannot be null or empty")
    private String response;

}
