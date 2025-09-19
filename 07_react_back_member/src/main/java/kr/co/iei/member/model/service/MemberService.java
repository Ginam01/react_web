package kr.co.iei.member.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.member.model.dao.MemberDao;
import kr.co.iei.member.model.dto.LoginMemberDTO;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.util.JwtUtils;

@Service
public class MemberService {
	@Autowired
	private MemberDao memberDao;
	@Autowired
	private BCryptPasswordEncoder encoder;
	@Autowired
	private JwtUtils jwtUtil;
	
	@Transactional
	public int insertMember(MemberDTO member) {
		String memberPw = member.getMemberPw();
		String encPw = encoder.encode(memberPw);
		member.setMemberPw(encPw);
		int result= memberDao.insertMember(member);
		return result;
	}
	public int exists(String memberId) {
		int result = memberDao.exists(memberId);
		return result;
	}
	public LoginMemberDTO login(MemberDTO member) {
		MemberDTO m = memberDao.selectOneMember(member.getMemberId());
		if(m != null) {//아이디 조회했는데 안되면 null
			if(encoder.matches(member.getMemberPw(), m.getMemberPw())){ //조건이 원본 pw를 암호화를 풀어서 새로운거랑 비교 앞이 원본 뒤가 암호화
				String accessToken = jwtUtil.createAccessToken(m.getMemberId(), m.getMemberType());
				String refreshToken = jwtUtil.createRefreshToken(m.getMemberId(), m.getMemberType());
				LoginMemberDTO loginMember = new LoginMemberDTO(accessToken, refreshToken, m.getMemberId(),m.getMemberType());
				return loginMember;
			}else {
				return null;
			}
		}
		return null;
	}
	public MemberDTO selectOneMember(String memberId) {
		MemberDTO member = memberDao.selectOneMember(memberId);
		return member;
	}
}
