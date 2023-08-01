package com.chu.global.jwt;

import com.chu.global.exception.Exception;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/*
사용자 요청이 들어오면 Servlet Req, Res 객체가 생성되어 넘어온다

Req 객체에서 JWT token을 추출하고, token을 통해 정상 토큰인지 확인한 후,
토큰을 통해 생성한 Authentication 객체를 SecurityContext에 저장해주는 역할 수행


* */

public class JwtTokenFilter extends OncePerRequestFilter {
    private JwtTokenProvider jwtTokenProvider;

    public JwtTokenFilter(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }


    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        String token = jwtTokenProvider.resolveToken(request);
        try {
            if (token != null && jwtTokenProvider.validateAccessToken(token)) {
                Authentication auth = jwtTokenProvider.getAuthenticationByAccessToken(token);
                SecurityContextHolder.getContext().setAuthentication(auth); // 정상 토큰이면 SecurityContext에 저장
            }
        } catch (Exception e) {
            SecurityContextHolder.clearContext();
            response.sendError(e.getHttpStatus().value(), e.getMessage());
            return;
        }

        filterChain.doFilter(request, response);
    }
}