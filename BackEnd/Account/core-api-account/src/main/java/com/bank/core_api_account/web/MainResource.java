package com.bank.core_api_account.web;

import com.bank.core_api_account.dto.GenericDTO;
import com.bank.core_api_account.dto.GetAccountDetailsRequestDTO;
import com.bank.core_api_account.services.AccountDetailsService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/core-api-account")
public class MainResource {

    private final AccountDetailsService accountDetailsService;

    @GetMapping("/accountDetails")
    public GenericDTO getAccountDetailService(
            @Valid GetAccountDetailsRequestDTO requestDTO
    ){
        return accountDetailsService.getCustomerDetailsFromClient(requestDTO);
    }
}
