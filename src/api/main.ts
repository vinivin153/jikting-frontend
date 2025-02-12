import { AxiosResponse } from 'axios';
import { authenticated } from './axiosInstance';

interface Image {
  memberId: number;
  sequence: string;
  url: string;
}

export interface Member {
  nickname: string;
  age: number;
  mbti: string;
  address: string;
  company: string;
  drinkStatus: string;
  height: number;
  description: string;
  personalities: string[];
  hobbies: string[];
  college: string;
  smokeStatus: string;
  images: Image[];
}

interface Recommend {
  recommendId: number;
  members: Member[];
  name: string;
  description: string;
  personalities: string[];
}

export type RecommendTeam = Recommend[];

export const fetchRecommendTeam = async () => {
  const response: AxiosResponse<RecommendTeam> = await authenticated.get('/recommends');
  return response;
};

export const fetchSendLike = async (recommendId: number) => {
  await authenticated.post(`/recommends/${recommendId}/like`);
};

export const fetchSendPass = async (recommendId: number) => {
  await authenticated.post(`/recommends/${recommendId}/pass`);
};
