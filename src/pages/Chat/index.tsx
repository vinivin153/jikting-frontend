import { Header } from 'components/Header';
import * as S from './style';
import { NavBar } from 'components/NavBar';
import { useChatListQuery } from 'hooks/useChatQuery';
import { useState } from 'react';
import { ChatRoom } from './ChatRoom';
import { EmptyPage } from 'pages/Empty';

interface ITeam {
  chattingRoomId: number;
  opposingTeamName: string;
  lastMessage: string;
  images: string[];
}

export const ChatList = () => {
  const { data } = useChatListQuery();
  const [enterChatRoomId, setEnterChatRoomId] = useState(0);
  const hanldeTeamButtonClick = (chattingRoomId: number) => {
    setEnterChatRoomId(chattingRoomId);
  };

  const previousHandleClick = () => {
    setEnterChatRoomId(0);
  };

  if (!data) {
    return <EmptyPage title="채팅" message={'소속된 팀이 없습니다\n 팀을 만들어 보세요'} navDefaultActive="chat" />;
  }

  if (data) {
    const chatList = data.data;
    return (
      <S.ChatWrapper>
        <Header title="채팅" />
        {chatList.map((team: ITeam) => {
          const { chattingRoomId, opposingTeamName, lastMessage, images } = team;
          return (
            <S.TeamWrapper onClick={() => hanldeTeamButtonClick(chattingRoomId)} key={chattingRoomId}>
              <S.ImagesWrapper>
                {images.map((image) => (
                  <S.Image src={image} key={image} />
                ))}
              </S.ImagesWrapper>
              <S.FlexColumnGrow>
                <S.TeamName>{opposingTeamName}</S.TeamName>
                <S.RecentMessage>{lastMessage}</S.RecentMessage>
              </S.FlexColumnGrow>
            </S.TeamWrapper>
          );
        })}
        <NavBar defaultActive="chat" />
        {enterChatRoomId ? (
          <ChatRoom chattingRoomId={enterChatRoomId} previousHandleClick={previousHandleClick} />
        ) : null}
      </S.ChatWrapper>
    );
  }
};
