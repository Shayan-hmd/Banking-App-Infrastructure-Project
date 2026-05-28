package com.bank.core_api_account.services;

import com.bank.core_api_account.dto.GenericDTO;
import com.bank.core_api_account.dto.GetAccountDetailsRequestDTO;
import com.bank.core_api_account.webClient.DataAccessClient;
import org.springframework.stereotype.Service;

@Service
public class AccountDetailsService {

    private final DataAccessClient dataAccessClient;

    AccountDetailsService(DataAccessClient dataAccessClient) {
        this.dataAccessClient = dataAccessClient;
    }

    public GenericDTO getCustomerDetailsFromClient(
            GetAccountDetailsRequestDTO requestDTO){
        return dataAccessClient.getAccountDetailResponseClient(requestDTO);
    }
}
