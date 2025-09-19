package kr.co.iei.util;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import java.util.Date;
import java.util.Calendar;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;


@Component
public class JwtUtils {
	@Value("${jwt.secret-key}")
	private String secretKey;
	@Value("${jwt.expire-hour}")
	private int expireHour;
	@Value("${jwt.expire-hour-refresh}")
	private int expireHourRefresh;
	
	public String createAccessToken(String memberId, int memberType) {
		SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());
		Calendar c = Calendar.getInstance();
		Date startTime = c.getTime(); // 토큰생성시간 > 현재시간
		c.add(Calendar.HOUR,expireHour); // 캘린더 객체의 시간을 현재시간부터 만료시간을 연장
		Date expireTime = c.getTime(); // 토근만료시간 - > 현재시간 + 1시간
		
		//토큰생성 
		String token = Jwts.builder()
				.issuedAt(startTime) //토큰 발행시간
				.expiration(expireTime) //토큰만료시간
				.signWith(key) //암호화 서명
				.claim("memberId", memberId) //토큰에 포함될 회원정보 세팅
				.claim("memberType", memberType) //토큰에 포함될 회원정보 세팅
				.compact();//생성
		return token;
	}
	
	//1년짜리 토큰 생성
	public String createRefreshToken(String memberId, int memberType) {
		SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());
		Calendar c = Calendar.getInstance();
		Date startTime = c.getTime(); // 토큰생성시간 > 현재시간
		c.add(Calendar.HOUR,expireHour); // 캘린더 객체의 시간을 현재시간부터 만료시간을 연장
		Date expireTime = c.getTime(); // 토근만료시간 - > 현재시간 + 1시간
		
		//토큰생성 
		String token = Jwts.builder()
				.issuedAt(startTime) //토큰 발행시간
				.expiration(expireTime) //토큰만료시간
				.signWith(key) //암호화 서명
				.claim("memberId", memberId) //토큰에 포함될 회원정보 세팅
				.claim("memberType", memberType) //토큰에 포함될 회원정보 세팅
				.compact();//생성
		return token;
	}
}
