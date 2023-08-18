import { Header } from 'components/Header';
import * as S from './style';
import { NavBar } from 'components/NavBar';
import RightArrow from 'assets/images/rightarrow.svg';
import { useQueryMyInfo } from 'hooks/useMypageQuery';

export const Mypage = () => {
  const { data } = useQueryMyInfo();

  const MenuList2 = [];

  const MenuList = ['프로필 정보 수정', '비밀번호 변경', '로그아웃', '회원탈퇴'];

  if (data) {
    const { nickname, company, imageUrl } = data.data;
    return (
      <S.MyPageWrapper>
        <Header title="마이페이지" />

        <S.ProfileImage src={imageUrl} />

        <S.MenuItemWrapper>
          <S.MenuItem>
            <S.MenuTitle>닉네임</S.MenuTitle>
            <S.MenuContentWrapper>
              <S.MenuContent>{nickname}</S.MenuContent>
              <RightArrow />
            </S.MenuContentWrapper>
          </S.MenuItem>

          <S.MenuItem>
            <S.MenuTitle>회사</S.MenuTitle>
            <S.MenuContentWrapper>
              <S.MenuContent>{company}</S.MenuContent>
              <RightArrow />
            </S.MenuContentWrapper>
          </S.MenuItem>

          {MenuList.map((menu) => {
            return (
              <S.MenuItem key={menu}>
                <S.MenuTitle>{menu}</S.MenuTitle>
                <S.MenuContentWrapper>
                  <S.MenuContent></S.MenuContent>
                  <RightArrow />
                </S.MenuContentWrapper>
              </S.MenuItem>
            );
          })}
        </S.MenuItemWrapper>

        <NavBar defaultActive="mypage" />
      </S.MyPageWrapper>
    );
  }
};
