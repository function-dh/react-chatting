import { Fragment } from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import dayjs from "dayjs";
import 'dayjs/locale/ko'

// 전체 레이아웃
const Chat = styled.li``
const InnerLink = styled(Link)`
	display : flex;
	justify-content : space-between;
	padding : 9px 16px;
`

// 채팅방 목록
// 프로필
const ProfileWrap = styled.div`
	flex : 0 0 56px;
	width: 56px;
	height: 56px;
	margin-right:15px;
`
const Profile = styled.span`
	display: block;
	height:0;
	padding-bottom: 100%;
	border-radius: 50%;
	text-indent : -9999px;
	background: url(${(props) => props.thumb || "/react-chatting/images/img-profile-default.jpeg"}) no-repeat 50% 50% / 100%;
`
// 유저 정보 + 메시지
const UserInfo = styled.div`
	max-width : calc(100% - 103px);
	width : 100%;
`
const UserName = styled.strong`
	overflow: hidden;
	display: block;
	margin-top: 9px;
	font-size: 16px;
	font-weight: 600;
	color : ${({ theme }) => theme.color.grey};
	text-overflow : ellipsis;
	white-space: nowrap;

`
const Message = styled.p`
	overflow: hidden;
	margin-top: 3px;
	font-size:13px;
	font-weight: 500;
	color : ${({ theme }) => theme.color.greyCool};
	text-overflow : ellipsis;
	white-space: nowrap;
`
const MessageInfo = styled.div`
	flex : 0 0 32px;
	margin-top : 7px;
	text-align : right;
`
// 메시지 시간 + 갯수
const MessageTime = styled.em`
	display: block;
	font-size : 11px;
	font-style: normal;
	color : ${({ theme }) => theme.color.greyTwoOp};
`
const MessageNum = styled.em`
	display: inline-block;
	width: 18px;
	height : 18px;
	margin-top : 6px;
	padding : 3px 6px 5px;
	border-radius:50%;
	font-size : 11px;
	font-style: normal;
	text-align :center;
	color : ${({ theme }) => theme.color.white};
	background-color : ${({ theme }) => theme.color.purple};
`

dayjs.locale('ko')

function ChatItem({ userInfo }) {
	const [user, photo] = userInfo
	const todayDate = dayjs(new Date())
	const todayYMD = todayDate.format('YYYY-MM-DD')

	return(
		<Fragment>
			{user && user.length > 0
				? user.map((item, index) => {
					// alert 갯수
					let alertNum = 0;
					item.message.map(ms => {
						if(!ms.checked){
							alertNum += 1
						}
					})

					// 유저별 마지막 메세지
					const lastMessage = item.message[item.message.length-1]

					// 날짜 처리 관련
					const date = dayjs(lastMessage.sendTime)
					const dateYMD = date.format('YYYY-MM-DD')
					const DayWeek = date.format('ddd')+'요일'

					return(
						<Chat key={index}>
							<InnerLink href="#" to={{ pathname: `room/${item.id}`, state: { roomInfo: item, photoInfo: photo }}}>
								<ProfileWrap>
									<Profile thumb={item.thumb}>{item.name} 프로필 사진</Profile>
								</ProfileWrap>

								<UserInfo>
									<UserName>{item.name}</UserName>
									<Message>{lastMessage.txt}</Message>
								</UserInfo>

								<MessageInfo>
									<MessageTime>
										{
											// 현재 날짜 기준 하루가 지나면 요일 표시
											todayYMD === dateYMD
												? date.format('HH') + ':' + date.format('mm')
												: DayWeek
										}
									</MessageTime>
									{
										// 메시지 확인 갯수 표시
										alertNum ? <MessageNum>{alertNum}</MessageNum> : ''
									}
								</MessageInfo>
							</InnerLink>
						</Chat>
					)
				})
				: '채팅방 목록 불러오는 중...'}
		</Fragment>
	)
}

export default ChatItem