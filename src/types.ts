export interface User {
	accent_color: string;
	avatar: string;
	banner: string;
	banner_color: string;
	discriminator: string;
	email: string;
	flags: number;
	id: string;
	isAdmin: boolean;
	isModerator: boolean;
	locale: string;
	mfa_enabled: boolean;
	premium_type: number;
	public_flags: number;
	token: string;
	username: string;
	verified: boolean;
}

export interface UserData {
	id: string;
	name: string;
	discriminator: string;
	avatar: string;
	banner?: string;
	developer: boolean;
	moderator: boolean;
	botModerator: boolean;
	honorable: boolean;
}


export interface PageProps {
	user?: User;
}

