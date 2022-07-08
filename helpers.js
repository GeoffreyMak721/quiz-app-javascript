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
    this.bindPageEvents(appContainer, page);
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

  static addElementEvent(
    selectors,
    eventType,
    listener,
    parentElement = document,
    preventDefault = true
  ) {
    parentElement.querySelector(selectors)?.addEventListener(eventType, (e) => {
      if (preventDefault) e.preventDefault();
      listener(e);
    });
  }

  static bindPageEvents(appContainer, page) {
    switch (page) {
      case Template.QUESTION_PAGE: {
        this.addElementEvent(
          "#exit",
          "click",
          (e) => this.goToPage(appContainer, Template.SCORE_PAGE),
          appContainer
        );
        break;
      }

      case Template.LOGIN_PAGE: {
        this.addElementEvent(
          "form",
          "submit",
          (e) => {
            if (this.validateForm(e.target)) {
              this.goToPage(appContainer, Template.QUESTION_PAGE);
            }
          },
          appContainer
        );
        break;
      }

      case Template.SCORE_PAGE: {
        this.addElementEvent(
          "#home-btn",
          "click",
          (e) => this.goToPage(appContainer, Template.LOGIN_PAGE),
          appContainer
        );
        break;
      }
      default:
        return null;
    }
  }
}
