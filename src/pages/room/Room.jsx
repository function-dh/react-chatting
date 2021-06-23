import { useState, useRef, Fragment } from 'react';
import styled from "styled-components";
import axios from "axios";
import dayjs from "dayjs";
import 'dayjs/locale/ko'
import Header from '../../components/common/Header'

// 전체 레이아웃
const RoomCont = styled.div`
	position : relative;
`

// 채팅창 메시지 부분
const MessageList = styled.ul`
	padding : 20px 16px 146px;
	padding: 20px 16px calc(constant(safe-area-inset-bottom) + 146px);
	padding: 20px 16px calc(env(safe-area-inset-bottom) + 146px);
`
const Message = styled.li`
	position: relative;
	margin-top : 10px;
	&:first-child{
		margin-top : 0;
	}
	&.user{
		text-align : right;
		.bubble{
			text-align : left;
			color : ${({ theme }) => theme.color.white};
			background : ${({ theme }) => theme.color.purple};
		}
		.time{
			margin : 0 0 0 -35px;
		}
	}
`
const Bubble = styled.span`
	display: inline-block;
	max-width : calc(100% - 36px);
	padding : 12px;
	border-radius: 12px;
	font-size: 14px;
	color : ${({ theme }) => theme.color.greyTwo};
  box-shadow: 0 2px 4px 0 ${({ theme }) => theme.color.black10};
`
const Time = styled.span`
	position : absolute;
	bottom : 3px;
	margin-left : 4px;
  font-size: 12px;
  font-weight: 500;
	color : ${({ theme }) => theme.color.greyTwoOp};
`
const PhotoWrap = styled.li`
	position: relative;
	margin-top : 10px;
	&.user{
		text-align : right;
	}
	> .photoInner {
		display: inline-block;
		width : 200px
	}
`
const Photo = styled.span`
	overflow : hidden;
	position: relative;
	display: inline-block;
	width: 200px;
	height : 200px;
	border-radius: 12px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
	> img{
		width: 100%;
	}
	.btn-close{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: url('/images/img-close.svg') no-repeat 50% / 16px rgba(0,0,0,0.8);
	}
`

const PhotoUpload = styled.div`
	overflow : hidden;
	position: relative;
	display: inline-block;
	width: 200px;
	height: 6px;
	border-radius: 3px;
	background : #e5e5e7;
	&:before{
		content: '';
		position: absolute;
		left : 0;
		top : 0;
		display: block;
		width : 65%;
		height : 6px;
		border-radius: 3px;
		background : ${({ theme }) => theme.color.purple};
	}
`
const DateLine = styled.li`
	position: relative;
	margin-top : 10px;
	text-align : center;
	span{
		position: relative;
		padding : 0 10px;
		font-size: 12px;
		font-weight: 500;
		color : ${({ theme }) => theme.color.greyTwoOp};
		background : ${({ theme }) => theme.color.white};
		z-index : 10;
	}

	&:before{
		content : '';
		position: absolute;
		top: 43%;
		display: block;
		width : 100%;
		height : 1px;
		background-color: #e6e6eb;
		z-index : 1;
	}
`

// 메시지 입력
const ChatInputCont = styled.div`
	position : fixed;
	bottom : 0;
	left : 0;
	display : flex;
	width : 100%;
	padding : 20px 16px;
	padding: 20px 16px calc(constant(safe-area-inset-bottom) + 20px);
	padding: 20px 16px calc(env(safe-area-inset-bottom) + 20px);
	background : ${({ theme }) => theme.color.white};
	z-index : 10;
`
const ChatInput = styled.input`
	width : 100%;
	padding : 17px 16px 16px;
	border : 0;
	border-radius : 25px;
	box-shadow: 0 2px 4px 0 ${({ theme }) => theme.color.black10};
	color : ${({ theme }) => theme.color.black};
	&::placeholder{
		color : #74747e;
	}
`
const ChatBtnSend = styled.button`
	flex : 0 0 50px;
	width : 50px;
	height : 50px;
	margin-left : 12px;
	border-radius : 50%50%;
	background: url("/images/img-send.svg") no-repeat 50% 50% / 26px 18px ${({ theme }) => theme.color.purple};
`

dayjs.locale('ko')

function Room(props) {
	const {roomInfo, photoInfo} = props.location.state
	const RoomWrap = useRef(null)

	// 요일 표현 + 오늘날짜
	const todayDate = dayjs(new Date()).format('YYYY-MM-DD')

	// 메시지 전송 관련
	const [text, setText] = useState(roomInfo)
	const chatMessageInput = useRef(null)
	let userSendMessage = ''

	const changeMessage = (e) => {
		userSendMessage = e.target.value
	}

	function sendMessage() {
		if (userSendMessage !== '') {
			setText({
				message : [
					...text.message,
					{
						txt : userSendMessage,
						sendTime : dayjs(new Date()),
						checked : false,
						selfChk : true,
						imageLink : ''
					}
				]
			})
			chatMessageInput.current.value = ''
			chatMessageInput.current.focus()

			// userSendMessage DB에 post하여 채팅 구현 예시
			axios.post('/url', {
				txt : userSendMessage,
				sendTime : dayjs(new Date()),
				checked : false,
				selfChk : true,
				imageLink : ''
			})
			.then(response => {
				console.log(response + 'DB 전송 완료');
			})
			.catch(error => {
				console.log(error);
			})

			RoomWrap.current.scrollIntoView({ behavior: 'smooth', block: 'end'})
		}
	}

	function keySendMessage(e) {
		e.key === 'Enter' && sendMessage()
	}

	// 시간 표시 렌더링
	function timeShow(date){
		return <Time className="time">{date.format('HH') + ':' + date.format('mm')}</Time>
	}

	// 날짜 변경 시 날짜 표현
	function dateShow(i, allMs){
		const currentDay = dayjs(allMs[i].sendTime).format('YYYY년 M월 D일')

		if(i !== allMs.length-1){
			const nextDay = dayjs(allMs[i+1].sendTime).format('YYYY년 M월 D일')

			if(currentDay !== nextDay){
				return <DateLine><span>{nextDay}</span></DateLine>
			}
		} else{
			if(currentDay < todayDate){
				return <DateLine><span>{todayDate}</span></DateLine>
			}
		}
	}

	// 사진 전송
	const [photoList, setPhotoList] = useState(photoInfo);

	return(
		<Fragment>
			<Header roomInfo={roomInfo} photoList={photoList} setText={setText} />
			<RoomCont id="container">
				<MessageList ref={RoomWrap}>
					{text.message.map((ms, i, allMs) => {
						// 1분 동안 연속해서 메시지 보낼 시, 마지막 메시지만 시간 표현
						const date = dayjs(ms.sendTime)
						const currentMs = dayjs(allMs[i].sendTime).format('mm')
						const nextMs = i !== allMs.length-1
														? dayjs(allMs[i+1].sendTime).format('mm')
														: null

						// 메시지 본인 체크 + 사용자와 1분 시간 체크 구별
						const nextSelf = i !== allMs.length-1
																	? allMs[i+1].selfChk
																	: null
						const nextSelfChk = ms.selfChk === nextSelf

						return(
							<Fragment>
								{
									!ms.imageLink
										? <Message key={i} className={ms.selfChk ? 'user' : ''}>
												{ ms.selfChk && currentMs !== nextMs
													? timeShow(date)
													: !nextSelfChk && ms.selfChk
														&& timeShow(date)
												}
												<Bubble className="bubble">{ms.txt}</Bubble>
												{ !ms.selfChk && currentMs !== nextMs
													? timeShow(date)
													: !nextSelfChk && !ms.selfChk
														&& timeShow(date)
												}
											</Message>
										: <PhotoWrap key={i} className={ms.selfChk ? 'user' : ''}>
												<div className="photoInner">
													<Photo>
														<img src={ms.imageLink} alt="사진 전송 이미지" />
														<button type="button" className="btn-close" aria-label="이미지 전송 취소 버튼" />
													</Photo>
													<PhotoUpload />
												</div>
											</PhotoWrap>
								}
								{dateShow(i,allMs)}
							</Fragment>
						)
					})}
				</MessageList>
				<ChatInputCont>
					<ChatInput type="text" onChange={changeMessage} onKeyPress={keySendMessage} ref={chatMessageInput} placeholder="메시지를 입력하세요." />
					<ChatBtnSend type="submit" onClick={sendMessage} aria-label="메시지 전송" />
				</ChatInputCont>
			</RoomCont>
		</Fragment>
	)
}

export default Room

