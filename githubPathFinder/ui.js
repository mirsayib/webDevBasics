class UI {
    constructor(){
        this.profile = document.getElementById('profile');
    }

    //display profile
    showProfile(user){
        this.profile.innerHTML = `
            <div class="card card-body mb-3">
                <div class="row">
                    <div class="col-md-3">
                        <img class="img-fluid mb-2" src="${user.avatar_url}">
                        <a href="${user.html_url} target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
                    </div>
                    <div class="col-md-9">
                        <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
                        <span class="badge badge-secondary">Public Gists: ${user.public_gists}</span>
                        <span class="badge badge-success">Followers ${user.followers}</span>
                        <span class="badge badge-info">Following: ${user.following}</span>
                        <br><br>
                        <ul class="list-group">
                            <li class="list-group-item">Company: ${user.company}</li>
                            <li class="list-group-item">Website/Blog: ${user.blog}</li>
                            <li class="list-group-item">Location: ${user.location}</li>
                            <li class="list-group-item">Member Since: ${user.created_at}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <h3 class="page-heading mb-3">Latest Repositories</h3>
            <div id="repos"></div>
        `;
    }
    
    //Show user repos
    showRepos(repos) {
        let output = '';

        repos.forEach(repo => {
            output += `
            <div class="card card-body mb-2">
                <div class="row">
                    <div class="col-md-6">
                        <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                    </div>
                    <div class="col-md-6">
                        <span class="badge badge-primary">Stars: ${repo.stargazers_count}</span>
                        <span class="badge badge-secondary">Public Gists: ${repo.watchers_count}</span>
                        <span class="badge badge-success">Followers ${repo.forks_count}</span>                        
                    </div>
                </div>
            </div>
            `;
        });

        //Output repos
        document.getElementById('repos').innerHTML = output;
    }

    //show alert message

    showAlert(message, className){
        //Clear pre-existing alert
        this.clearAlert();
        // Create a div
        const div = document.createElement('div');
        div.className = className;
        // Add Text to div
        div.appendChild(document.createTextNode(message));

        //Get parent
        const container = document.querySelector('.searchContainer');
        // get Search Box
        const search = document.querySelector('.search');
        //Insert the alert
        container.insertBefore(div, search);

        // Timeout after 3 sec
        setTimeout(() => {
            this.clearAlert();
        }, 2000);
    }

    //clear alert message
    clearAlert() {
        const currentAlert = document.querySelector('.alert');

        if(currentAlert) {
            currentAlert.remove();
        }
    }

    //clear profile
    clearProfile() {
        this.profile.innerHTML = '';
    }
}