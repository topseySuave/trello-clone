import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	progress[value] {
		width: ${props => props.width};
		appearance: none;

		::-webkit-progress-bar {
			height: 10px;
			border-radius: 20px;
			background-color: #EEE;
		}

		::-webkit-progress-value {
			height: 10px;
			border-radius: 20px;
			background-color: ${props => props.color};
		}
	}
`;

const ProgressBar = ({ value, max, color, width }) => {
	return <Container color={color} width={width}>
		<progress value={value} max={max} />
		<span style={{ fontSize: '50px', fontWeight: 'bold' }}>{(value / max) * 100}%</span>
	</Container>
};

export default ProgressBar;
