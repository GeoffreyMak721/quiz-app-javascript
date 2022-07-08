class Template {
  static QUESTION_PAGE = "question_page";
  static LOGIN_PAGE = "login_page";
  static SCORE_PAGE = "score_page";
  static MAX_QUESTION = 20;

  static getPage(page = this.LOGIN_PAGE, pageParams) {
    switch (page) {
      case this.LOGIN_PAGE: {
        return this._showLoginPage(pageParams);
      }
      case this.QUESTION_PAGE: {
        return this._showQuestionPage(pageParams);
      }
      case this.SCORE_PAGE: {
        return this._showScorePage(pageParams);
      }
      default:
        return this._showLoginPage(pageParams);
    }
  }

  static _showScorePage({ score, name, email }) {
    return ` 
    <div class="score-container content-wrapper">
      <div class="content">
        <div class="info-content${
          score < this.MAX_QUESTION / 2 ? " error" : ""
        }">
          <h2 class="name">${name}</h2>
          <div><p class="email">${email}</p></div>
          <div class="icon"></div>
          <p class="score">${score}/${this.MAX_QUESTION}</p>
          <div class="btn-container">
            <button id="home-btn">Accueil</button>
          </div>
        </div>
      </div>
    </div>`;
  }

  static _showLoginPage() {
    return ` 
    <div class="login-container content-wrapper">
      <div class="content">
        <div class="info-content">
          <div class="msg-container">
            <h2>JavaScript Quiz</h2>
            <p>
              Évaluez vos connaissances en JavaScript en<br />
              répondant aux questions que nous avons spécialement sélectionnées
              pour vous.<br />
              C'est fun et c'est gratuit.
            </p>
          </div>
          <form class="form-content" action="">
            <div class="form-row">
              <label for="name">Nom</label>
              <input type="text" name="name" id="name" />
              <span
                >N’oubliez pas de renseigner votre nom avant de commencer le
                Quiz.</span
              >
            </div>
            <div class="form-row">
              <label for="email">Email</label>
              <input type="email" name="email" id="email" />
              <span
                >N’oubliez pas de renseigner votre email avant de commencer le
                Quiz.</span
              >
            </div>
            <div class="form-btn">
              <button type="submit">Commencer</button>
            </div>
          </form>
        </div>
      </div>
    </div>`;
  }

  static _showQuestionPage({ question, responses, questionNo }) {
    return ` 
    <div class="question-container content-wrapper">
      <div class="content">
        <div class="info-content">
          <p class="question">${question}</p>
          <div class="progress-container">
            <div class="info">
              <span class="q">Question ${questionNo}/15</span>
              <span class="time">30</span>
            </div>
            <div class="progress-bar">
              <div class="progress-bar-fill" style="width: 50%"></div>
            </div>
          </div>
          <div class="response-container">
          ${responses
            .map(
              (r) => `
                <div class="response-item">
                  <div class="radio"></div>
                  <p class="response">${r}</p>
                </div>
              `
            )
            .join("")}
          </div>
          <div class="btn-container">
            <button id="exit">Quitter</button>
            <button id="next" class="enable">Suivant</button>
          </div>
        </div>
      </div>
    </div>`;
  }
}
