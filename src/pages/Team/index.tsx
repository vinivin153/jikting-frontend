import * as S from './style';
import { Button } from 'components/Button';
import { theme } from 'styles/theme';
import { useCallback, useState } from 'react';
import { CreateTeam } from './CreateTeam';
import { useQueryTeamInfo } from 'hooks/useTeamInfoQurey';
import { TeamDetail } from './TeamDetail';
import ModalPortal from 'components/Modal/ModalPortal';
import { ModalBottomSheet } from 'components/Modal';
import { Input } from 'components/Input';
import { EmptyPage } from 'pages/Empty';

export const TeamList = () => {
  const { isSuccess, isError, data } = useQueryTeamInfo();
  const [registerTeam, setRegisterTeam] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [url, setUrl] = useState('');

  const handleRegisterTeamClick = useCallback(() => {
    setRegisterTeam(true);
  }, []);

  const handleRegisterTeamCompleteClick = useCallback(() => {
    setRegisterTeam(false);
  }, []);

  const hanleModalOpenClick = () => {
    setModalOpen(true);
  };

  const handelModalCloseClick = () => {
    setModalOpen(false);
  };

  const handleAttendTeamClick = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = url;
  };

  if (registerTeam) return <CreateTeam handleRegisterTeamCompleteClick={handleRegisterTeamCompleteClick} />;

  if (isError)
    return (
      <EmptyPage title="팀 리스트" message={`소속된 팀이 없습니다\n 팀을 만들어 보세요`} navDefaultActive="team">
        <S.ButtonWrapper>
          <Button
            size="medium"
            title="팀 등록하기"
            background="#FFEEF2"
            color={theme.colors.mainPink}
            onClick={handleRegisterTeamClick}
          ></Button>
          <Button
            size="medium"
            title="팀 참여하기"
            background="#FFEEF2"
            color={theme.colors.mainPink}
            onClick={hanleModalOpenClick}
          ></Button>
        </S.ButtonWrapper>

        {modalOpen ? (
          <ModalPortal>
            <ModalBottomSheet handleMaskClick={handelModalCloseClick}>
              <S.Form onSubmit={handleAttendTeamClick}>
                <Input title="초대 링크를 입력해주세요" value={url} onChange={(e) => setUrl(e.target.value)}></Input>
                <Button type="submit" title="완료" background={theme.colors.mainPink}></Button>
              </S.Form>
            </ModalBottomSheet>
          </ModalPortal>
        ) : null}
      </EmptyPage>
    );

  if (isSuccess && data) return <TeamDetail {...data.data} />;
};
