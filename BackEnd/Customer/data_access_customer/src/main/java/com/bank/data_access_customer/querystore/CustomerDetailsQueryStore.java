package com.bank.data_access_customer.querystore;

import org.springframework.stereotype.Component;

@Component
public class CustomerDetailsQueryStore {
    public String getCustomerDetailQuery(){
        return """
                select
                     customer_id,
                     customer_name,
                     customer_age,
                     customer_phone,
                     customer_nic
                     from customer_details
                     where 1=1
                """;
    }
}
