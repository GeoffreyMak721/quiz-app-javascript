class Template {
  QUESTION_PAGE = "question_page";
  LOGIN_PAGE = "login_page";
  SCORE_PAGE = "score_page";

  getPageTemplate(page = this.LOGIN_PAGE, pageParams) {
    switch (page) {
      case this.LOGIN_PAGE: {
        return this.loginPageTemplate(pageParams);
      }
      case this.QUESTION_PAGE: {
        return this.questionPageTemplate(pageParams);
      }
      case this.SCORE_PAGE: {
        return this.scorePageTemplate(pageParams);
      }
      default:
        return this.loginPageTemplate(pageParams);
    }
  }

  scorePageTemplate({ score, name, email }) {
    return ` 
    <div class="score-container content-wrapper">
      <div class="content">
        <div class="info-content${
          score < Constants.MAX_QUESTIONS / 2 ? " error" : ""
        }">
          <h2 class="name">${name}</h2>
          <div><p class="email">${email}</p></div>
          <div class="icon">
            <i class="fa-solid fa-check ch"></i>
            <i class="fa-solid fa-xmark xm"></i>
          </div>
          <p class="score">${score}/${Constants.MAX_QUESTIONS}</p>
          <div class="btn-container">
            <button id="home-btn">Accueil</button>
          </div>
        </div>
      </div>
    </div>`;
  }

  loginPageTemplate() {
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

  questionPageTemplate({ question, responses, questionNo }) {
    return ` 
    <div class="question-container content-wrapper">
      <div class="content">
        <div class="info-content">
          <p class="question">${question}</p>
          <div class="progress-container">
            <div class="info">
              <span class="q">
                Question ${questionNo}/${Constants.MAX_QUESTIONS}
              </span>
              <span class="time">${Constants.MAX_SECONDS}</span>
            </div>
            <div class="progress-bar">
              <div class="progress-bar-fill" style="width: 100%" id="100"></div>
            </div>
          </div>
          <div class="response-container">
            ${responses
              .map(
                (r, idx) => `
                <div class="response-item" id="${idx}">
                  <div class="radio"></div>
                  <p class="response">${r}</p>
                </div>
              `
              )
              .join("")}
          </div>
          <div class="btn-container">
            <button id="exit">Quitter</button>
            <button id="next" class="">Suivant</button>
          </div>
        </div>
      </div>
    </div>`;
  }
}
