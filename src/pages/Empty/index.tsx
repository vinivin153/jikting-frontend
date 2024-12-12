import { Header } from 'components/Header';
import * as S from './style';
import { EmptyData } from 'components/EmptyData';
import { NavBar } from 'components/NavBar';

interface EmptyPageProps {
  title: string;
  message: string;
  navDefaultActive: 'main' | 'team' | 'like' | 'chat';
  children?: React.ReactNode;
}

export const EmptyPage = ({ title, message, navDefaultActive, children }: EmptyPageProps) => {
  return (
    <S.EmptyWrapper>
      <Header title={title} />
      <EmptyData>
        <S.Message>{message}</S.Message>
      </EmptyData>
      <NavBar defaultActive={navDefaultActive} />
      {children}
    </S.EmptyWrapper>
  );
};
