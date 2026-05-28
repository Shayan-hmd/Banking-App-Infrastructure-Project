package com.bank.data_access_account.dto;

import lombok.Data;

@Data
public class GetAccountDetailsResponseDTO {

    private Long accountId;
    private Long customerId;
    private Long branchCode;
    private Long accountType;
    private Long customerNumber;
    private Long runNumber;
    private Long checkDigit;

}
