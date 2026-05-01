package com.vacation.vacation_management.util;

import com.vacation.vacation_management.domain.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expiration;

    private Key getKey(){
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    public String generateToken(User user){
        return Jwts.builder()
                .setSubject(user.getId().toString())
                .claim("email", user.getEmail())
                .claim("role", user.getRole())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getKey())
                .compact();
    }

    public String extractEmail(String token){
        return getClaims(token).get("email", String.class);
    }

    public boolean isValid(String token){
        try{
            getClaims(token);
            return true;
        }catch (ExpiredJwtException e){
            throw e;
        }
        catch (JwtException e){
            return false;
        }
    }

    private Claims getClaims(String token){
        return Jwts.parserBuilder()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

}
