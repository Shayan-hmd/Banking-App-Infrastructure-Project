package com.bank.data_access_account.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class GetAccountDetailsRequestDTO {

    private Long customerId;

    @NotBlank(message = "Response cannot be null or empty")
    private String response;
}
