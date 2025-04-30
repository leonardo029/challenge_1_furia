export interface SocialLink {
  name: string;
  icon: string;
  url: string;
}

export interface TeamMember {
  name: string;
  nickname: string;
  role: string;
}

export interface MatchInfo {
  opponent: string;
  date: string;
  event: string;
  result?: string;
  upcoming: boolean;
}