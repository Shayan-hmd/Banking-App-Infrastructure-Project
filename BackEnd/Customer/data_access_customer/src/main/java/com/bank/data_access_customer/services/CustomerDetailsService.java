package com.bank.data_access_customer.services;

import com.bank.data_access_customer.dto.GenericDTO;
import com.bank.data_access_customer.dto.GetCustomerDetailsRequestDTO;
import com.bank.data_access_customer.dto.GetCustomerDetailsResponseDTO;
import com.bank.data_access_customer.querystore.CustomerDetailsQueryStore;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;

@Service
public class CustomerDetailsService {

    private final CustomerDetailsQueryStore customerDetailsQueryStore;
    private final DataSource dataSource;

    public CustomerDetailsService(CustomerDetailsQueryStore customerDetailsQueryStore
    , DataSource dataSource) {
        this.customerDetailsQueryStore = customerDetailsQueryStore;
        this.dataSource = dataSource;
    }

    public GenericDTO getCustomerDetailsService(GetCustomerDetailsRequestDTO requestDTO)
    {
        return getCustomerFromDB(requestDTO);
    }
    private GenericDTO getCustomerFromDB(GetCustomerDetailsRequestDTO requestDTO){
        StringBuilder query = new StringBuilder(customerDetailsQueryStore.getCustomerDetailQuery());
        System.out.println("initial query : "+query);
        List<Object> params = new ArrayList<>();
        Map<String,Object> filter = new HashMap<>();
        filter.put("customer_name",requestDTO.getCustomerName());
        filter.put("customer_nic",requestDTO.getCustomerNic());
        for(Map.Entry<String,Object> entry: filter.entrySet()){
            if(entry.getValue()!=null){
                query.append(" AND ").append(entry.getKey()).append(" = ?");
                params.add(entry.getValue());
            }
        }
        System.out.println("final query : "+query);
        GenericDTO resultdto = new GenericDTO();
        List<GetCustomerDetailsResponseDTO> dto = new ArrayList<>();
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
                System.out.println("Result :"+rs.getString("customer_name"));
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
    public GetCustomerDetailsResponseDTO utilityMapper(ResultSet rs, GetCustomerDetailsRequestDTO requestDTO) throws SQLException {
        GetCustomerDetailsResponseDTO dto = new GetCustomerDetailsResponseDTO();
        String response = requestDTO.getResponse();
        if("All".equals(response)){
            dto.setCustomerId(rs.getLong("customer_id"));
            dto.setCustomerName(rs.getString("customer_name"));
            dto.setCustomerAge(rs.getInt("customer_age"));
            dto.setCustomerNic(rs.getString("customer_nic"));
            dto.setCustomerPhone(rs.getString("customer_phone"));
        }
        return dto;
    }
}
