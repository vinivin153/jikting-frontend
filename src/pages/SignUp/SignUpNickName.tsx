import { Input } from 'components/Input';
import { Button } from 'components/Button';
import * as S from './style';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { validNickNameCheck } from 'validation';
import { fetchNickNameCheck } from 'api/signup';

interface Props {
  updateUserInfo(data: { [userData: string]: string }): void;
}
const genderList = ['남', '여'];

export const SignUpNickName = ({ updateUserInfo }: Props) => {
  const [selectedGender, setSelectedGender] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedGender(e.currentTarget.innerText);
  };

  const onSubmit = (data: { [key: string]: string }) => {
    data['userGender'] = selectedGender;
    updateUserInfo(data);
  };
  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        title="닉네임"
        error={errors.userNickName}
        {...register('userNickName', {
          required: '닉네임 입력은 필수 입니다.',
          validate: { validNickNameCheck, fetchNickNameCheck },
        })}
      />

      <S.FlexColumn>
        <span>성별</span>
        <S.ButtonWrapper>
          {genderList.map((gender) => (
            <Button
              type="button"
              key={gender}
              title={gender}
              size="medium"
              color={selectedGender === gender ? '#FF5680' : '#999'}
              background={selectedGender === gender ? 'rgba(255, 86, 128, 0.10)' : '#F2F2F2'}
              onClick={handleButtonClick}
            ></Button>
          ))}
        </S.ButtonWrapper>
      </S.FlexColumn>

      <Button type="submit" title="다음" background="#FF5680"></Button>
    </S.Form>
  );
};
