import React, { useEffect, useState } from "react";
import TrelloList from "./TrelloList";
import { connect } from "react-redux";
import TrelloCreate from "./TrelloCreate";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { sort, setActiveBoard } from "../actions";
import { Link } from "react-router-dom";
import { Header, Row } from '../components/Home';
import TrelloButton from "./TrelloButton";
import ProgressBar from './Progressbar';
import Bg from '../assets/bg.jpg';

const ListsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const PageStyle = styled.div`
  Padding: 40px 20px;
  background-image: url(${Bg});
  background-repeat: no-repeat;
  background-size: cover;
  box-sizing: border-box;
  background-color: rgba(9,30,66,.04);
  min-height: 100vh;
`;

const BoardTitle = styled.h2`
  color: white;
`;

const Back = styled(Link)`
  color: white;
`;

const DashboardView = styled.div`
  width: 50%;
  background-color: rgba(0, 0, 0, .45);
  padding: 20px;
  position: absolute;
  right: 0;
  z-index: 1;
  margin-right: ${props => props.open ? '0%' : '-70%'};
  transition: all 200ms ease-in;
  color: white;
  display: flex;
  justify-content: center;
`;

const ChartCard = styled.div`
  padding: 10px 40px;
  height: fit-content;
  & h1 {
    color: white;
    font-size: 60px;
    margin: 0;
  }
`;

const Dashboard = ({ viewDash, data: { cards, lists } }) => {
  return (
    <DashboardView open={viewDash}>
      <Row wrap>
        {Object.values(lists).map((element, index) => {
          return <ChartCard key={index}>
            <h3>Number of cards for {element.title}</h3>
            <h1>{element.cards.length}</h1>
          </ChartCard>
        })}
        <ChartCard>
          <h3>Percentage Complete</h3>
          <ProgressBar value="10" max="100" color="#5aac44" width="100%" />
        </ChartCard>
        <ChartCard>
          <h3>Cards assigned</h3>
          <h1>0</h1>
        </ChartCard>
      </Row>
    </DashboardView>
  );
};

const TrelloBoard = (props) => {
  const [viewDash, setViewDash] = useState(false);
  useEffect(() => {
    // set active trello board here
    const { boardID } = props.match.params;

    props.dispatch(setActiveBoard(boardID));
    return () => { }
  }, []);

  const onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      )
    );
  };

  const { lists, cards, match, boards } = props;
  const { boardID } = match.params;
  const board = boards[boardID];
  if (!board) return <p>Board not found</p>;
  const listOrder = board.lists;

  return (
    <>
      <Header>
        <h3><i>ARC Trello</i></h3>
      </Header>
      <PageStyle>
        <DragDropContext onDragEnd={onDragEnd}>
          <Row>
            <Back to="/" style={{ marginRight: '20px', alignSelf: 'center' }}>{`< `} Go Back</Back>
            <TrelloButton onClick={() => setViewDash(!viewDash)}>{viewDash ? 'Close Dashboard' : 'View Dashboard'}</TrelloButton>
          </Row>
          <BoardTitle>{board.title}</BoardTitle>
          <div style={{ height: '100vh', position: 'relative', overflowX: 'scroll' }}>
            <Dashboard viewDash={viewDash} data={{ cards, lists }} />
            <Droppable droppableId="all-lists" direction="horizontal" type="list">
              {provided => (
                <ListsContainer
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {listOrder.map((listID, index) => {
                    const list = lists[listID];
                    if (list) {
                      const listCards = list.cards.map(cardID => cards[cardID]);

                      return (
                        <TrelloList
                          listID={list.id}
                          key={list.id}
                          title={list.title}
                          cards={listCards}
                          index={index}
                        />
                      );
                    }
                    return null;
                  })}
                  {provided.placeholder}
                  <TrelloCreate list />
                </ListsContainer>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      </PageStyle>
    </>
  );
}

const mapStateToProps = state => ({
  lists: state.lists,
  cards: state.cards,
  boards: state.boards
});

export default connect(mapStateToProps)(TrelloBoard);
