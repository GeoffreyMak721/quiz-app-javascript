class Helpers {
  static name = "";
  static email = "";
  static score = 0;

  static validateForm(form) {
    let isValid = true;

    for (const e of form.elements) {
      if (!["name", "email"].includes(e.name)) continue;
      if (!e.value) {
        isValid = false;
        e.parentElement.classList.add("error");
      } else {
        this[e.name] = e.value;
        e.parentElement.classList.remove("error");
      }
    }
    return isValid;
  }

  static goToPage(appContainer, page) {
    const pageData = this.getPageData(page);
    appContainer.innerHTML = Template.getPage(page, pageData);
    this.bindPageEvent(page, appContainer);
  }

  static getPageData(page) {
    switch (page) {
      case Template.QUESTION_PAGE: {
        return {
          question: "Quel est le type d'un fichier javascript ?",
          questionNo: 1,
          responses: [".js", ".ts", ".jsx", "tsx"],
        };
      }
      case Template.SCORE_PAGE: {
        return {
          score: this.score,
          name: this.name,
          email: this.email,
        };
      }
      default:
        return null;
    }
  }

  static bindPageEvent(page, appContainer) {
    switch (page) {
      case Template.QUESTION_PAGE: {
        document.querySelector("#exit").addEventListener("click", (e) => {
          e.preventDefault();
          this.goToPage(appContainer, Template.SCORE_PAGE);
        });
        break;
      }

      case Template.LOGIN_PAGE: {
        document.querySelector("form").addEventListener("submit", (e) => {
          e.preventDefault();
          if (this.validateForm(e.target)) {
            this.goToPage(appContainer, Template.QUESTION_PAGE);
          }
        });
        break;
      }

      case Template.SCORE_PAGE: {
        document.querySelector("#home-btn").addEventListener("click", (e) => {
          e.preventDefault();
          this.goToPage(appContainer, Template.LOGIN_PAGE);
        });
        break;
      }
      default:
        return null;
    }
  }
}
