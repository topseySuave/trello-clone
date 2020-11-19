import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addBoard } from "../actions";
import BoardThumbnail from "./BoardThumbnail";

const Thumbnails = styled.div`
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  & > * {
    margin-right: 10px;
    margin-bottom: 10px;
  }
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 50%;
  margin: 10px auto;
`;

export const Header = styled.header`
  width: 100%;
  padding: 10px;
  overflow: hidden;
  color: white;
  background-color: steelblue;
  text-align: center;
`;

const CreateBoardTile = styled.div`
  background-color: rgba(9,30,66,.04);
  box-shadow: none;
  border: none;
  color: #172b4d;
  display: table-cell;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  width: 250px;
  padding: 40px;
  border-radius: 5px;
  transition-property: background-color,border-color,box-shadow;
  transition-duration: 85ms;
  transition-timing-function: ease;
  &:hover {
    background-color: rgba(9,30,66,.08);
    box-shadow: none;
    border: none;
    color: #172b4d;
  }
`;

const CreateTitle = styled.h3`
  font-size: 14px;
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
`;

const CreateInput = styled.input`
  width: 400px;
  height: 50px;
  font-size: 20px;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 3px;
  border: none;
  outline-color: blue;
  box-shadow: 0 2px 4px grey;
  align-self: center;
  margin-top: 10px;
`;

const Divider = styled.span`
  height: 1px;
  width: 100%;
  border-radius: 25px;
  background-color: #CCC;
  margin: 10px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: ${props => props.wrap ? 'wrap' : 'nowrap'};
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

const Overlay = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, .5);
  top: 0;
  left:  0;
  bottom: 0;
  right: 0;
  z-index: 1;
`;

const Button = styled.button`
  flex-basis: 40px;
  margin-top: 10px;
  align-self: flex-start;
  width: 100px;
  background-color: mediumseagreen;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: larger;
`;

const Home = ({ boards, boardOrder, dispatch }) => {
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [overlayOpened, setOverlayOpened] = useState(false);

  const handleChange = e => {
    setNewBoardTitle(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addBoard(newBoardTitle));
    setOverlayOpened(false);
  };

  const renderBoards = () => {
    return boardOrder.map(boardID => {
      const board = boards[boardID];
      return (
        <Link
          key={boardID}
          to={`/${board.id}`}
          style={{ textDecoration: "none" }}
        >
          <BoardThumbnail {...board} />
        </Link>
      );
    });
  };

  const renderCreateBoard = () => {
    return (
      <>
        <CreateBoardTile onClick={() => setOverlayOpened(true)}>
          <CreateTitle>Create new board</CreateTitle>
        </CreateBoardTile>
        {overlayOpened && <form onSubmit={handleSubmit} style={{
          zIndex: '2',
          display: 'flex',
          flexDirection: 'column',
          alignSelf: 'flex-start'
        }}>
          <CreateInput
            onChange={handleChange}
            value={newBoardTitle}
            placeholder="Your boards title..."
            type="text"
          />
          <Button>Save</Button>
        </form>}
      </>
    );
  };

  return (
    <>
      {overlayOpened && <Overlay onClick={() => setOverlayOpened(false)} />}
      <Header>
        <h3><i>ARC Trello</i></h3>
      </Header>

      <HomeContainer>
        <Row>
          <Thumbnails>{renderBoards()}</Thumbnails>
        </Row>
        <Divider />
        {renderCreateBoard()}
      </HomeContainer>
    </>
  );
};

const mapStateToProps = state => ({
  boards: state.boards,
  boardOrder: state.boardOrder
});

export default connect(mapStateToProps)(Home);
