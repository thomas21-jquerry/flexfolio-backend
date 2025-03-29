export interface UserProfile {
    user_id: string;
    name: string;
    company: string;
    role: string;
    experience: number;
    url_link?: string;
    linkedin_id?: string;
    github_id?: string;
    discord_id?: string;
    profile_photo?: string;
    created_at: Date;
    updated_at: Date;
  }
  
  export type ProfileResponse = UserProfile;
  