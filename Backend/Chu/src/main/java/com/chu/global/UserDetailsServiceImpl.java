package com.chu.global;

import com.chu.customer.domain.Customer;
import com.chu.customer.repository.TestRepository;
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
    private TestRepository testRepository;

    @Override
    public UserDetails loadUserByUsername(String id) throws Exception {
        Customer customer = testRepository.findById(id);
        Set<GrantedAuthority> grantedAuthorities = new HashSet<>();

        return new org
                .springframework.security.core.userdetails.User(customer.getId(), customer.getPwd(), grantedAuthorities);
    }
}
