

export interface Profile  {
    login: string,
    repos_url: string
    avatar_url: string;
}

export interface Repo {
    name: string,
    description: string
    language: string;
    stargazers_count:number;
}