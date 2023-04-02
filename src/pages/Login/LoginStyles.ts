import styled from "styled-components";

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
  margin: 100px auto
	color: white;
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
