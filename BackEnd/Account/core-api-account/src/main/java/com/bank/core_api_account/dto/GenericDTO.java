package com.bank.core_api_account.dto;

import lombok.Data;

import java.util.List;

@Data
//@JsonInclude(JsonInclude.Include.NON_NULL)
public class GenericDTO {
    private List<?> data;
    private String message;
    private Boolean mboolean;
}
