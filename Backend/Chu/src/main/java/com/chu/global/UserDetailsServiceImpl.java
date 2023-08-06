package com.chu.global;

import com.chu.customer.domain.Customer;
import com.chu.customer.repository.CustomerRepository;
import com.chu.designer.domain.Designer;
import com.chu.designer.repository.DesignerRepository;
import com.chu.global.exception.Exception;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.HashSet;
import java.util.Set;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{

    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private DesignerRepository designerRepository;

    @Override
    public UserDetails loadUserByUsername(String id) throws Exception {
        Customer customer = customerRepository.findById(id);
        Designer designer = designerRepository.findById(id);

        Set<GrantedAuthority> grantedAuthorities = new HashSet<>();

        // customer 객체가 존재하는 경우
        if(customer != null){
            return new org
                    .springframework.security.core.userdetails.User(customer.getId(), customer.getPwd(), grantedAuthorities);
        }
        // customer 객체가 존재하지 않는 경우
        else{
            return new org
                    .springframework.security.core.userdetails.User(designer.getId(), designer.getPwd(), grantedAuthorities);
        }
    }
}
