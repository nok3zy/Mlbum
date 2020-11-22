# Mlbum
> This it team 105 database sysyem project. 

## Idea
> 데이터베이스를 이용한 앨범을 제작하는 것이 목표이다.
> 하지만 일반적인 앨범과는 다르게 그룹으로 하나의 앨범을 공유한다.
> 여러 인원이 공유하고 싶은 사진들이 있으면 해당 앨범에 올리면 다 같이 공유를 하면서 사진에 접근을 할 수 있다.

## Method - Usecase
> - 유저마다 아이디를 부여하고 해당 아이디에 그룹에 접근할 수 있는 권한을 부여한다.
> - 유저가 그룹을 만들면 해당 유저에게 그룹원을 초대할 수 있는 권한을 준다.
> - 앨범의 표현은 바둑판형식이 있다.
> - 앨범의 사진을 하나 클릭하면 모달창처럼 올라온다. 그리고 클릭을 하면 비트화도 할 수 있다?

## Progress
> - 모든 페이지는 RESTFUL API로 작성되어야 함.
> - [x] 메인페이지 - 로그인 (only front)  
> - [x] 회원가입 페이지 (only front)
> - [x] 사용자 화면 (user의 그룹 선택) (only front)
> - [ ] 사용자 정보 수정 화면
> - [x] 그룹 화면 - 바둑판 배열 (only front)
> - [ ] 그룹 정보 수정 화면
> - [ ] 사진 추가하기 ( 모달창 ) 
> - [ ] 사진 자세히보기( 모달창 )
> - [x] 사진 비트화 
> - [ ] 프론트, 서버, 데이터베이스 연동 (cookie-parsor)
> - [ ] -추가중-