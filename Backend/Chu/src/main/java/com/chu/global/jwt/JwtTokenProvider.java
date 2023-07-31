package com.chu.global.jwt;

import com.chu.global.exception.Exception;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import io.jsonwebtoken.Claims;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

@Component
public class JwtTokenProvider {

    @Value("${jwt.token.access-token-key}")
    private String accessTokenKey;
    @Value("${jwt.token.refresh-token-key}")
    private String refreshTokenKey;
    @Value("${jwt.token.access-token-expire}")
    private Long accessTokenExpire;
    @Value("${jwt.token.refresh-token-expire}")
    private Long refreshTokenExpire;

    @Autowired
    private UserDetailsService userDetailsService;

    /*
    Access Token 생성, 반환
        @param authentication
        @return accessToken
     */
    public String generateAccessToken(Authentication authentication){
        Claims claims = Jwts.claims().setSubject(authentication.getName());

        Date now = new Date();
        Date expiresIn = new Date(now.getTime() + accessTokenExpire);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expiresIn)
                .signWith(SignatureAlgorithm.HS256, refreshTokenKey)
                .compact();
    }


    /*
    Refresh Token 생성, 반환
        @param authentication
        @return refreshToken
     */
    public String generateRefreshToken(Authentication authentication){
        Claims claims = Jwts.claims().setSubject(authentication.getName());

        Date now = new Date();
        Date expiresIn = new Date(now.getTime() + refreshTokenExpire);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expiresIn)
                .signWith(SignatureAlgorithm.HS256, refreshTokenKey)
                .compact();
    }

    /*
    Access Toekn으로부터 Claim 만들고 이를 통해 user 객체 생성하여 Authentication 반환
        @param accessToken
        @return
     */
    public Authentication getAuthenticationByAccessToken(String accessToken) {
        String userPrincipal = Jwts.parser().setSigningKey(accessTokenKey).parseClaimsJws(accessToken).getBody().getSubject();
        UserDetails userDetails = userDetailsService.loadUserByUsername(userPrincipal);

        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    /*
    Refresh Toekn으로부터 Claim 만들고 이를 통해 user 객체 생성하여 Authentication 반환
        @param refreshToken
        @return
     */
    public Authentication getAuthenticationByRefreshToken(String refreshToken) {
        String userPrincipal = Jwts.parser().setSigningKey(refreshTokenKey).parseClaimsJws(refreshToken).getBody().getSubject();
        UserDetails userDetails = userDetailsService.loadUserByUsername(userPrincipal);

        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    /*
    http header 로부터 bearer 토큰 가져옴
        @param req
        @return
     */
    public String resolveToken(HttpServletRequest req) {
        String bearerToken = req.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    /*
    Access token 검증
        @param token
        @return
     */
    public boolean validateAccessToken(String token) {
        try {
            Jwts.parser().setSigningKey(accessTokenKey).parseClaimsJws(token);
            return true;
        } catch (JwtException e) {
            throw new Exception("Error on Access Token", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /*
    Refresh 토큰 검증
        @param token
        @return
     */
    public boolean validateRefreshToken(String token) {
        try {
            Jwts.parser().setSigningKey(refreshTokenKey).parseClaimsJws(token);
            return true;
        } catch (JwtException e) {
            // MalformedJwtException | ExpiredJwtException | IllegalArgumentException
            throw new Exception("Error on Refresh Token", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
