import styled from "styled-components";

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 50%;
	margin: 100px auto;
	padding: 30px;
	color: white;
`;

export const Wrapper2 = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 50%;
	margin: 100px auto;
	padding: 30px;
	color: white;
	background: rgba(45%, 66%, 92%, 0.8);
	backdrop-filter: blur(16px) saturate(180%);
	-webkit-backdrop-filter: blur(16px) saturate(180%);
	border-radius: 20px;

	@media all and (max-width: 800px) {
		width: 80%;
	}

	@media all and (max-width: 430px) {
		width: 97%;
	}
`;

// export const LoginTg = styled.div`
// 	display: flex;
// 	align-items: center;
// 	& > div {
// 		margin-right: 20px;
// 	}
// 	& > div > img {
// 		object-fit: contain;
// 		height: 150px;
// 	}
// `;

export const Buttons = styled.div`
	width: 300px;
	display: flex;
	flex-direction: column;

	& > button > svg {
		margin-left: 5px;
		font-size: 20px;
	}
	}

	& > button:nth-child(3) {
		width: 300px;
		margin-bottom: 0;
	}

	
`;
