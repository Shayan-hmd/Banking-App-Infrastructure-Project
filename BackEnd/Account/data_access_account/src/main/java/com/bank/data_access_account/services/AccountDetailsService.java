package com.bank.data_access_account.services;

import com.bank.data_access_account.dto.GetAccountDetailsRequestDTO;
import com.bank.data_access_account.dto.GetAccountDetailsResponseDTO;
import com.bank.data_access_account.querystore.AccountDetailsQueryStore;
import com.bank.data_access_customer.dto.GenericDTO;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AccountDetailsService {

    private final AccountDetailsQueryStore accountDetailsQueryStore;
    private final DataSource dataSource;

    AccountDetailsService(AccountDetailsQueryStore accountDetailsQueryStore, DataSource dataSource) {
        this.accountDetailsQueryStore = accountDetailsQueryStore;
        this.dataSource = dataSource;
    }

    public GenericDTO getAccountDetailsService(GetAccountDetailsRequestDTO requestDTO)
    {
        return getAccountFromDB(requestDTO);
    }
    private GenericDTO getAccountFromDB(GetAccountDetailsRequestDTO requestDTO){
        StringBuilder query = new StringBuilder(accountDetailsQueryStore.getAccountDetailQuery());
        System.out.println("initial query : "+query);
        List<Object> params = new ArrayList<>();
        Map<String,Object> filter = new HashMap<>();
        filter.put("customer_id",requestDTO.getCustomerId());
        for(Map.Entry<String,Object> entry: filter.entrySet()){
            if(entry.getValue()!=null){
                query.append(" AND ").append(entry.getKey()).append(" = ?");
                params.add(entry.getValue());
            }
        }
        System.out.println("final query : "+query);
        GenericDTO resultdto = new GenericDTO();
        List<GetAccountDetailsResponseDTO> dto = new ArrayList<>();
        try(
                Connection connection = dataSource.getConnection();
                PreparedStatement ps = connection.prepareStatement(query.toString())
        ){
            for(int i=0; i< params.size(); i++){
                ps.setObject(i+1, params.get(i));
            }
            System.out.println("query after params : "+ps);
            ResultSet rs = ps.executeQuery();
            while(rs.next()){
                dto.add(utilityMapper(rs,requestDTO));
            }

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        resultdto.setData(dto);
        resultdto.setMboolean(false);
        resultdto.setMessage("Success");
        return resultdto;
    }

    //Utility Method
    public GetAccountDetailsResponseDTO utilityMapper(ResultSet rs, GetAccountDetailsRequestDTO requestDTO) throws SQLException {
        GetAccountDetailsResponseDTO dto = new GetAccountDetailsResponseDTO();
        String response = requestDTO.getResponse();
        if("All".equals(response)){
            dto.setAccountId(rs.getLong("account_id"));
            dto.setCustomerId(rs.getLong("customer_id"));
            dto.setBranchCode(rs.getLong("branch_code"));
            dto.setAccountType(rs.getLong("account_type"));
            dto.setCustomerNumber(rs.getLong("customer_number"));
            dto.setRunNumber(rs.getLong("run_number"));
            dto.setCheckDigit(rs.getLong("check_digit"));
        }
        return dto;
    }
}
