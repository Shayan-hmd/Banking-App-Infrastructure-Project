package com.bank.core_api_customer.webClient;

import com.bank.core_api_customer.dto.GenericDTO;
import com.bank.core_api_customer.dto.GetCustomerDetailsRequestDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.cloud.openfeign.SpringQueryMap;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(
        name="dataaccess-customer",
        url="${dataaccess.ms.url}"
)
public interface DataAccessClient {

    @GetMapping("/data-access-customer/customerDetails")
    GenericDTO getCustomerDetailResponseClient(
            @SpringQueryMap GetCustomerDetailsRequestDTO requestDTO);
}