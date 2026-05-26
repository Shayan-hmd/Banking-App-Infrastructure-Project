package com.bank.core_api_customer.services;

import com.bank.core_api_customer.dto.GenericDTO;
import com.bank.core_api_customer.dto.GetCustomerDetailsRequestDTO;
import com.bank.core_api_customer.webClient.DataAccessClient;
import org.springframework.stereotype.Service;

@Service
public class CustomerDetailsService {

    private final DataAccessClient dataAccessClient;

    CustomerDetailsService(DataAccessClient dataAccessClient) {
        this.dataAccessClient = dataAccessClient;
    }

    public GenericDTO getCustomerDetailsFromClient(
            GetCustomerDetailsRequestDTO requestDTO){
        return dataAccessClient.getCustomerDetailResponseClient(requestDTO);
    }
}