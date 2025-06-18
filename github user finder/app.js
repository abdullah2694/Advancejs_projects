    function getUser() {
      const username = document.getElementById('usernameInput').value.trim();
      const userCard = document.getElementById('userCard');
      userCard.innerHTML = '';

      if (username === '') {
        alert('Please enter a username!');
        return;
      }

      fetch(`https://api.github.com/users/${username}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('User not found!');
          }
          return response.json();
        })
        .then(data => {
          userCard.innerHTML = `
            <div class="col-md-6">
              <div class="card text-center p-3">
                <img src="${data.avatar_url}" class="card-img-top" alt="${data.login}" />
                <div class="card-body">
                  <h5 class="card-title">${data.name || 'No Name Provided'}</h5>
                  <p class="card-text">@${data.login}</p>
                  <p class="card-text">${data.bio || 'No bio available'}</p>
                  <p class="card-text">📍 ${data.location || 'Location not provided'}</p>
                  <p class="card-text">💼 ${data.company || 'Company not mentioned'}</p>
                  <div class="d-flex justify-content-around mt-3">
                    <span>👥 Followers: ${data.followers}</span>
                    <span>🔁 Following: ${data.following}</span>
                    <span>📁 Repos: ${data.public_repos}</span>
                  </div>
                  <a href="${data.html_url}" target="_blank" class="btn btn-dark mt-3">View Profile</a>
                </div>
              </div>
            </div>
          `;
        })
        .catch(error => {
          userCard.innerHTML = `
            <div class="col-md-6">
              <div class="alert alert-danger text-center" role="alert">
                ${error.message}
              </div>
            </div>
          `;
        });
    }