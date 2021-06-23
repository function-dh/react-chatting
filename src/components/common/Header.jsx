import { useState } from 'react';
import styled, {css} from "styled-components";
import { Link } from 'react-router-dom';
import dayjs from "dayjs";

// 전체 레이아웃
const GnbIconDefault = css`
	width: 24px;
	height: 24px;
`
const GnbWrap = styled.div`
	overflow : hidden;
	position: relative;
	display : flex;
	align-items : center;
	justify-content: space-between;
	height : 44px;
	padding : 0 12px;
	color : ${({ theme }) => theme.color.white};
	background : ${({ theme }) => theme.color.purple};
`

// header 스타일
const PageTitle = styled.h1`
	overflow : hidden;
	position : absolute;
	top : 50%;
	left : 50%;
	transform : translate(-50%, -50%);
	width : calc(100% - 170px);
	margin-top : 2px;
	font-size : 17px;
	font-weight : 500;
	text-align:center;
	text-overflow : ellipsis;
	white-space : nowrap;
`
const GnbMenu = styled.button`
	${GnbIconDefault}
	flex : 0 0 24px;
	background: url('/images/icon-menu-white.svg') no-repeat 0 0 / 100%;
`

// button 스타일
const BtnWrap = styled.div`
	display : flex;
`
const BtnPhoto = styled.button`
	${GnbIconDefault}
	flex : 0 0 24px;
	background: url('/images/img-upload.svg') no-repeat 0 0 / 100%;
`
const BtnSearch = styled.button`
	${GnbIconDefault}
	flex : 0 0 24px;
	margin-left : 17px;
	background: url('/images/img-search.svg') no-repeat 0 0 / 100%;
`
const BtnBack = styled(Link)`
	${GnbIconDefault}
	flex : 0 0 24px;
	text-indent : -9999px;
	background: url('/images/img-back.svg') no-repeat 0 0 / 100%;
`
const BtnMyPage = styled(Link)`
	${GnbIconDefault}
	flex : 0 0 24px;
	text-indent : -9999px;
	background: url('/images/icon-person-white.svg') no-repeat 0 0 / 100%;
`

// 사진 리스트
const PhotoWrap = styled.div`
	overflow: hidden;
	background : ${({ theme }) => theme.color.purple};
`
const PhotoList = styled.ul`
	overflow-x : auto;
	overflow-y : hidden;
	display: flex;
	flex-wrap : nowrap;
	padding: 11px 16px;
`
const Photo = styled.li`
	flex : 0 0 46px;
	height : 46px;
	margin-right : 10px;
	&:last-child{
		margin-right : 0;
		padding-right : 16px;
		box-sizing : content-box;
	}
	> a{
		overflow: hidden;
		display: block;
		border-radius : 5px;
		img{
			width: 100%;
		}
	}
`

function Header({ roomInfo = null, photoList, setText }) {
	// path로 현재 room인지 체크
	const pathChk = () => {
		var param = []
		function inputPath(key){
			param.push(key)
		}
		window.location.pathname.replace(/[^/]+[^/]*/g, inputPath)
		return param
	}
	const path = pathChk()
	const roomChk = path[0]

	// photo 관련
	const [isPhoto, setIsPhoto] = useState(false)

	function showPhotoList(){
		setIsPhoto(!isPhoto)
	}

	function sendPhoto(e){
		e.preventDefault();
		setText({
			message : [
				...roomInfo.message,
				{
					txt : '',
					sendTime : dayjs(new Date()),
					checked : false,
					selfChk : true,
					imageLink : e.target.src
				}
			]
		})
	}

	return(
		<div id="header">
			<GnbWrap>
				{
					roomChk === 'room'
						? <BtnBack href="#" to="/list">뒤로가기</BtnBack>
						: <GnbMenu type="button" aria-label="메뉴 버튼"></GnbMenu>
				}
				{
					roomInfo !== null
						?	<PageTitle>{roomInfo.name ? roomInfo.name : '채팅'}</PageTitle>
						: <PageTitle>채팅</PageTitle>
				}
				{
					roomChk === 'room'
						? <BtnWrap>
								<BtnPhoto type="button" onClick={showPhotoList} aria-label="사진 추가 버튼" />
								<BtnSearch type="button" aria-label="검색 버튼" />
							</BtnWrap>
						:	<BtnWrap>
								<BtnMyPage href="#" to="/list">마이페이지</BtnMyPage>
							</BtnWrap>
				}
			</GnbWrap>
			{isPhoto &&
				<PhotoWrap>
					<PhotoList>
						{photoList.map((photo, i) => {
							return(
								<Photo key={i}>
									<a href="#" onClick={sendPhoto}>
										<img src={photo.thumb} alt={'사진' + i}/>
									</a>
								</Photo>
							)
						})}
					</PhotoList>
				</PhotoWrap>
			}
		</div>
	)
}

export default Header