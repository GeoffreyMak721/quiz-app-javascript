class App extends Template {
  name = "";
  email = "";

  currentQuestionIdx = 0;
  selectedResponses = [];
  hasSelectedResponse = false; // allow to know if a response is choose in current session
  remainSeconds = Constants.MAX_SECONDS;
  intervalSecondId = null;
  sessionQuestions = null;

  appContainer;

  /**
   * @param {HTMLElement} appContainer the main HTML element to inject new contents
   */
  constructor(appContainer) {
    super();
    this.appContainer = appContainer;
    this.goToPage(this.LOGIN_PAGE);
  }

  /**
   * This method reset app state
   */
  resetState() {
    this.currentQuestionIdx = 0;
    this.selectedResponses = [];
    this.hasSelectedResponse = false;
    this.remainSeconds = Constants.MAX_SECONDS;
    this.intervalSecondId = null;
    this.sessionQuestions = null;
  }

  /**
   * This method allow us to go in specific page, by setting new content in appContainer
   * @param {String} page
   */
  goToPage(page) {
    const pageData = this.getPageData(page);
    this.appContainer.innerHTML = this.getPageTemplate(page, pageData);
    this.bindPageEvents(page);
  }

  /**
   * This method allow us to get needed data by a page
   * @param {String} page
   * @returns {any} the data need to the specified page
   */
  getPageData(page) {
    switch (page) {
      case this.QUESTION_PAGE: {
        const question = this.getOrGenerateQuestions()[this.currentQuestionIdx];
        return { ...question, questionNo: this.currentQuestionIdx + 1 };
      }
      case this.SCORE_PAGE: {
        return {
          score: this.selectedResponses?.filter((r) => r.isGood).length,
          name: this.name,
          email: this.email,
        };
      }
      default:
        return null;
    }
  }

  /**
   * This method help us to bind events in needed elements depending to the page where we are and if necessary,
   * execute some action in the page
   * @param {String} page
   */
  bindPageEvents(page) {
    switch (page) {
      case this.QUESTION_PAGE: {
        const nextPageAction = (e) => {
          if (Constants.MAX_QUESTIONS === this.currentQuestionIdx + 1) {
            this.goToPage(this.SCORE_PAGE);
          } else {
            this.currentQuestionIdx++;
            this.goToPage(this.QUESTION_PAGE);
          }
          this.hasSelectedResponse = false;
        };

        const exitAction = (e) => {
          clearInterval(this.intervalSecondId);
          this.goToPage(this.SCORE_PAGE);
        };

        const responseSelectAction = ({ currentTarget: item }) => {
          if (item.classList.contains("selected")) return;
          const questions = this.getOrGenerateQuestions();
          const responseIdx = questions[this.currentQuestionIdx].responseIdx;

          if (
            this.selectedResponses.find(
              (r) => r.qId === this.currentQuestionIdx
            )
          ) {
            this.selectedResponses = this.selectedResponses.map((r) =>
              r.qId === this.currentQuestionIdx
                ? { ...r, isGood: responseIdx === +item.id }
                : r
            );
          } else {
            this.selectedResponses.push({
              qId: this.currentQuestionIdx,
              isGood: responseIdx === +item.id,
            });
          }

          this.hasSelectedResponse = true;
          this.appContainer.querySelector("#next").classList.add("enable");
          this.appContainer
            .querySelector(".response-item.selected")
            ?.classList.remove("selected");
          item.classList.add("selected");
        };

        this.addElementEvent(
          "#exit",
          "click",
          (e) => exitAction(e),
          this.appContainer
        );

        this.addElementEvent(
          "#next",
          "click",
          (e) => {
            if (this.hasSelectedResponse) nextPageAction(e);
          },
          this.appContainer
        );

        this.addElementsEvent(
          ".response-container .response-item",
          "click",
          (e) => responseSelectAction(e),
          this.appContainer
        );

        const progressBar = this.appContainer.querySelector(
          ".progress-container .progress-bar .progress-bar-fill"
        );

        progressBar.style.animationDuration = `${Constants.MAX_SECONDS}s`;
        progressBar.style.animationPlayState = "running";

        this.remainSeconds = Constants.MAX_SECONDS;
        clearInterval(this.intervalSecondId);

        this.intervalSecondId = setInterval(() => {
          console.log("tic");
          if (this.remainSeconds === 0) {
            clearInterval(this.intervalSecondId);
            nextPageAction();
            return;
          }
          const time = this.appContainer.querySelector(
            ".progress-container .time"
          );
          time.textContent = `${this.remainSeconds - 1}`;
          this.remainSeconds--;
        }, 1000);

        if (Constants.MAX_QUESTIONS === this.currentQuestionIdx + 1) {
          this.appContainer.querySelector("#next").innerText = "Terminer";
        }

        break;
      }

      case this.LOGIN_PAGE: {
        this.addElementEvent(
          "form",
          "submit",
          (e) => {
            if (this.validateForm(e.target)) {
              this.resetState();
              this.goToPage(this.QUESTION_PAGE);
            }
          },
          this.appContainer
        );
        break;
      }

      case this.SCORE_PAGE: {
        clearInterval(this.intervalSecondId);
        this.addElementEvent(
          "#home-btn",
          "click",
          (e) => this.goToPage(this.LOGIN_PAGE),
          this.appContainer
        );
        break;
      }

      default:
        return null;
    }
  }

  /**
   * This method help us to get or generate questions needed when the app running
   */
  getOrGenerateQuestions() {
    if (this.sessionQuestions !== null) {
      return this.sessionQuestions;
    }
    const questions = this.getShuffledQuestions().slice(
      0,
      Constants.MAX_QUESTIONS
    );
    this.sessionQuestions = questions;
    return questions;
  }

  /**
   * This method shuffle all questions and response
   * @returns {Array} the shuffled questions
   */
  getShuffledQuestions() {
    return [
      ...Constants.QUESTIONS.map((q) => {
        const goodResponse = q.responses[q.responseIdx];
        const shuffledResponses = [...q.responses].sort(
          () => Math.random() - 0.5
        );
        const newResponseIdx = shuffledResponses.findIndex(
          (r) => r === goodResponse
        );
        return {
          ...q,
          responseIdx: newResponseIdx,
          responses: shuffledResponses,
        };
      }),
    ].sort(() => Math.random() - 0.5);
  }

  /**
   * This method allow us to validate form and if necessary, show error message
   * @param {HTMLFormElement} form
   * @returns {Boolean} if the form is valid
   */
  validateForm(form) {
    let isValid = true;
    for (const e of form.elements) {
      const setError = (field, errorIndex) => {
        isValid = false;
        e.parentElement.classList.add("error");
        e.parentElement.querySelector("span").textContent =
          Constants.ERROR_MESSAGES[field][errorIndex];
      };
      switch (e.name) {
        case "name": {
          if (!e.value) {
            setError("name", 0);
          } else if (e.value.length < 2) {
            setError("name", 1);
          } else {
            this.name = e.value;
            e.parentElement.classList.remove("error");
          }
          break;
        }
        case "email": {
          if (!e.value) {
            setError("email", 0);
          } else if (e.value.match(Constants.EMAIL_PATTERN) === null) {
            setError("email", 1);
          } else {
            this.email = e.value;
            e.parentElement.classList.remove("error");
          }
          break;
        }
        default:
          break;
      }
    }
    return isValid;
  }

  /**
   * This is a method that help us to bind quickly an event in element
   * @param {HTMLElementTagNameMap} selectors
   * @param {DocumentEventMap} eventType
   * @param {(ev: Event) => any} listener
   * @param {HTMLElement} parentElement
   * @param {Boolean} preventDefault
   */
  addElementEvent(
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

  /**
   * This is a method that help us to bind quickly  events in elements
   * @param {HTMLElementTagNameMap} selectors
   * @param {DocumentEventMap} eventType
   * @param {(ev: Event) => any} listener
   * @param {HTMLElement} parentElement
   * @param {Boolean} preventDefault
   */
  addElementsEvent(
    selectors,
    eventType,
    listener,
    parentElement = document,
    preventDefault = true
  ) {
    parentElement.querySelectorAll(selectors)?.forEach((element) =>
      element.addEventListener(eventType, (e) => {
        if (preventDefault) e.preventDefault();
        listener(e);
      })
    );
  }
}
