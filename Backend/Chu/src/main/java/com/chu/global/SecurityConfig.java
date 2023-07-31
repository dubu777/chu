package com.chu.global;

import com.chu.global.jwt.JwtTokenProvider;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // 추가한 jwt 관련 클래스들
    //private final JwtTokenProvider jwtTokenProvider;


    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception{
        return configuration.getAuthenticationManager();
    }

    @Bean
    public BCryptPasswordEncoder encoder(){
        return new BCryptPasswordEncoder();
    }

    // web security 설정
    @Bean
    public WebSecurityCustomizer webSecurityCustomizer(){
        // 정적 자원들 제외
        return (web)
                -> web
                .ignoring()
                .requestMatchers(PathRequest.toStaticResources().atCommonLocations());
    }

    // http security 설정
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{

            // jwt 사용하므로 request 보내기 어려움
        http.csrf().disable()
            // formLogin 대신 jwt 사용하기 때문에 비활성화
            .formLogin().disable()
            // httpBasic 방식 대신 jwt 사용하기 때문에 비활성화
            .httpBasic().disable()
            // Session 기반의 인증을 사용하지 않고 jwt 사용
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
            // 필터 순서 설정
            //.addFilterBefore(new JwtAuthentiationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class)


        return http.build();
    }

}
