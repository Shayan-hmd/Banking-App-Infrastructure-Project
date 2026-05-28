package com.bank.data_access_account.web;

import com.bank.data_access_account.dto.GetAccountDetailsRequestDTO;
import com.bank.data_access_account.services.AccountDetailsService;
import com.bank.data_access_customer.dto.GenericDTO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/data-access-account")
public class MainResource {

    private final AccountDetailsService accountDetailsService;

    MainResource(AccountDetailsService accountDetailsService) {
        this.accountDetailsService =  accountDetailsService;
    }

    @GetMapping("/accountDetails")
    public GenericDTO getAccountDetails(GetAccountDetailsRequestDTO requestDTO){
        return accountDetailsService.getAccountDetailsService(requestDTO);
    }
}
