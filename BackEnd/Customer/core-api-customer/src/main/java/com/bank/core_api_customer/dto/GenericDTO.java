package com.bank.core_api_customer.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
//@JsonInclude(JsonInclude.Include.NON_NULL)
public class GenericDTO {
    private List<?> data;
    private String message;
    private Boolean mboolean;
}
