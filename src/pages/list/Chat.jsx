import { useState, useEffect, Fragment } from 'react';
import styled from "styled-components";
import axios from "axios";
import userData from '../../data/user';
import Header from '../../components/common/Header'
import ChatItem from './ChatItem';

const ChatCont = styled.div``
const ChatList = styled.ul`
	padding-top : 10px;
	padding: 10px 0 calc(constant(safe-area-inset-bottom));
	padding: 10px 0 calc(env(safe-area-inset-bottom));
`

function List() {
	const [userInfo, setUserInfo] = useState([]);

	const getData = () => {
		// 임시 url 주소
		axios.get("url")
			.then(response => {
				setUserInfo([...userInfo, response])
			}).catch(e => {
				console.log(e)
			}).then(() => {
				// local json 파일 할당
				setUserInfo([...userInfo, userData.user, userData.photo])
			});
	}

	useEffect(() => {
		getData()
	}, []);

	return(
		<Fragment>
			<Header />
			<ChatCont id="container">
				<ChatList>
					<ChatItem userInfo={userInfo} />
				</ChatList>
			</ChatCont>
		</Fragment>
	)
}

export default List