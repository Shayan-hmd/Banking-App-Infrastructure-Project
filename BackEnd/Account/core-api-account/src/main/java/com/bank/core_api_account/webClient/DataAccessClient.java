package com.bank.core_api_account.webClient;

import com.bank.core_api_account.dto.GenericDTO;
import com.bank.core_api_account.dto.GetAccountDetailsRequestDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.cloud.openfeign.SpringQueryMap;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(
        name="dataaccess-account",
        url="${dataaccess.ms.url}"
)
public interface DataAccessClient {

    @GetMapping("/data-access-account/accountDetails")
    GenericDTO getAccountDetailResponseClient(
            @SpringQueryMap GetAccountDetailsRequestDTO requestDTO);
}
