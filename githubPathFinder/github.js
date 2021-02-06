class Github {
    constructor() {
        this.client_id = '79a9a4c6745e5d405528 ';
        this.client_secret = '1350646aa3ee6508a4d5f1da01cfb2cf01ddcb24';
        this.repos_count = 5;
        this.repos_sort = 'created: asc';
    }

    async getUser(user){
        const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);
        const profile = await profileResponse.json();

        const repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);
        const repos = await repoResponse.json();

        return {
            profile, //in es6 its same as
            repos

        };

    }

}