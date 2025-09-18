package kr.co.iei.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.member.model.dto.LoginMemberDTO;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.member.model.service.MemberService;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/member")

public class MemberController {
	@Autowired
	private MemberService memberService;
	
	@PostMapping
	public ResponseEntity<Integer> joinMember(@RequestBody MemberDTO member){ //RequestBody역할이 데이터를 가져오는것
		int result = memberService.insertMember(member);		
		return ResponseEntity.ok(result);
	}
	
	@GetMapping(value="/exists")
	public ResponseEntity<Integer> exists(@RequestParam String memberId){
		int result = memberService.exists(memberId);

		return ResponseEntity.ok(result);
	}
	
	@PostMapping(value="/login")
	public ResponseEntity<LoginMemberDTO> login(@RequestBody MemberDTO member){
		LoginMemberDTO m = memberService.login(member);
		if(m != null) {
			return ResponseEntity.ok(m);			
		}else {
			return ResponseEntity.status(404).build();
		}
	}
}
