import { Header } from 'components/Header';
import { useState } from 'react';
import * as S from './style';
import { SignUpIdPassword } from './SignUpIdPassword';
import { SignUpNickName } from './SignUpNickName';
import { SignUpAuthPhoneNumber } from './SignUpAuthPhoneNumber';
import { useNavigate } from 'react-router-dom';
import { TermsOfService } from './TermsOfService';
import { useFunnel } from 'hooks/useFunnel';

export interface UserInfo {
  userId: string;
  userPassword: string;
  userNickName: string;
  userName: string;
  userPhoneNumber: string;
  userGender: string;
}

export const SignUp = () => {
  const { Funnel, step, setStep } = useFunnel();
  const [userInfo, setUserInfo] = useState<UserInfo>({
    userId: '',
    userPassword: '',
    userNickName: '',
    userName: '',
    userPhoneNumber: '',
    userGender: '',
  });
  const navigate = useNavigate();

  const moveNextStep = () => {
    setStep((step) => step + 1);
  };

  const handlePreviousClick = () => {
    if (step === 0) {
      navigate(-1);
      return;
    }

    setStep((step) => step - 1);
  };

  const updateUserInfo = (data: { [userData: string]: string }) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      ...data,
    }));
    moveNextStep();
  };

  return (
    <S.FlexColumn>
      <Header previous previousFunction={handlePreviousClick} title="회원가입" />
      <S.Content>
        <Funnel>
          <Funnel.step step={0}>
            <TermsOfService moveNextStep={moveNextStep} />
          </Funnel.step>
          <Funnel.step step={1}>
            <SignUpIdPassword updateUserInfo={updateUserInfo} />
          </Funnel.step>
          <Funnel.step step={2}>
            <SignUpNickName updateUserInfo={updateUserInfo} />
          </Funnel.step>
          <Funnel.step step={3}>
            <SignUpAuthPhoneNumber userInfo={userInfo} updateUserInfo={updateUserInfo} />
          </Funnel.step>
        </Funnel>
      </S.Content>
    </S.FlexColumn>
  );
};
