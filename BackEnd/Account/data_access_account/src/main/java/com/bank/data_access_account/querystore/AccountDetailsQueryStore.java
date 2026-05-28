package com.bank.data_access_account.querystore;

import org.springframework.stereotype.Component;

@Component
public class AccountDetailsQueryStore {

    public String getAccountDetailQuery(){
        return """
                select
                     account_id,
                     customer_id,
                     branch_code,
                     account_type,
                     customer_number,
                     run_number,
                     check_digit
                     from account_details
                     where 1=1
                """;
    }
}
