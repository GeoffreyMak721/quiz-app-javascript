/**
 * Util app constants
 */
class Constants {
  static MAX_QUESTIONS = 15;
  static MAX_SECONDS = 60;
  static EMAIL_PATTERN = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi;
  static ERROR_MESSAGES = {
    name: [
      "N’oubliez pas de renseigner votre nom avant de commencer le Quiz.",
      "Votre nom doit avoir au moins 2 caractères",
    ],
    email: [
      "N’oubliez pas de renseigner votre email avant de commencer le Quiz.",
      "Votre email n'est pas valide, voici un email valid XXX@XXX.XXX",
    ],
  };
  static QUESTIONS = [
    {
      question: "Comment lire le jour du mois dans une date ?",
      responseIdx: 2,
      responses: ["Day()", "Date.parse()", "getDate()", "getDay()"],
    },
    {
      question: "Le mot clé 'var' permet de déclarer des variables",
      responseIdx: 3,
      responses: [
        "locales uniquement",
        "globales uniquement",
        "n'existe pas en JavaScript",
        "locales ou globales",
      ],
    },
    {
      question: "alert(!(1 && 0) ? 'VRAI' : 'FAUX'); affiche",
      responseIdx: 3,
      responses: ["FAUX", "une erreur", "VRAI:FAUX", "VRAI"],
    },
    {
      question: "Que contient document.images[1] ?",
      responseIdx: 1,
      responses: [
        "les images de l'en-tête du document",
        "la deuxième image du document",
        "la première image du document",
        "cela n'existe pas en JavaScript",
      ],
    },
    {
      question:
        "De quelle façon peut-on récupérer le nombre d'éléments d'un tableau T1 ?",
      responseIdx: 1,
      responses: ["T1.count()", "T1.length", "length(T1)", "T1.last()"],
    },
    {
      question: "Comment afficher la page précédente du navigateur ?",
      responseIdx: 0,
      responses: [
        "history.back()",
        "previous()",
        "c'est impossible",
        "rollback()",
      ],
    },
    {
      question:
        "Une variable locale déclarée dans une fonction peut être utilisée",
      responseIdx: 2,
      responses: [
        "dans toutes les fonctions mais pas dans le script appelant",
        "dans toutes les fonctions du document HTML",
        "dans cette fonction uniquement",
        "dans cette fonction et dans le script appelant",
      ],
    },
    {
      question: "Que signifie NaN ?",
      responseIdx: 1,
      responses: [
        "Number area NULL",
        "Not a Number",
        "Not at NULL",
        "Not area Negative",
      ],
    },
    {
      question: "Avec quoi peut-on faire référence à l'objet courant ?",
      responseIdx: 0,
      responses: ["this", "->", "&", "le point"],
    },
    {
      question: "Comment parcourir toutes les valeurs du tableau T1 ?",
      responseIdx: 3,
      responses: [
        "for(T1[i]) { }",
        "for(T1[]<>NULL) { }",
        "for(each(T1[]) { }",
        "for(i in T1) { }",
      ],
    },
    {
      question: "Que renvoie ch1.substring(2,4) si ch1 = 'ABCDEF' ?",
      responseIdx: 1,
      responses: ["BCD", "CD", "BCDE", "CDE"],
    },
    {
      question: "Comment passer à l'itération suivante dans une boucle for() ?",
      responseIdx: 2,
      responses: ["next", "return", "continue", "break"],
    },
    {
      question: "Comment changer la couleur de 'chp2' en bleu sur 'form' ?",
      responseIdx: 3,
      responses: [
        "document.form.chp2.color = 'blue';",
        "windows.form.chp2.color = 'blue';",
        ".form.document.chp2.style.color = 'blue';",
        "document.form.chp2.style.color = 'blue';",
      ],
    },
    {
      question: "Que fais T1.push(3) sur le tableau T1 ?",
      responseIdx: 1,
      responses: [
        "décale tous les indices de 3 positions",
        "ajoute l'élément 3",
        "retire l'élément en 3ème position",
        "retire les 3 derniers éléments",
      ],
    },
    {
      question: "Comment mettre une chaîne ch1 en minuscules ?",
      responseIdx: 0,
      responses: ["ch1.toLowerCase()", "Min(ch1)", "Lower(ch1)", "ch1.min()"],
    },
    {
      question: "Comment afficher 'Bonjour' dans une boite de dialogue ?",
      responseIdx: 3,
      responses: [
        "echo('bonjour');",
        "print('bonjour');",
        "write('bonjour');",
        "alert('bonjour');",
      ],
    },
    {
      question: "Que fait *i = &a ?",
      responseIdx: 0,
      responses: [
        "n'existe pas en JavaScript",
        "crée un pointeur sur la variable a",
        "affecte le contenu de a à i",
        "récupère l'adresse de a",
      ],
    },
    {
      question: "Comment définir la largeur de l'image 'img1' à 120 ?",
      responseIdx: 1,
      responses: [
        "navigator.getElementById(img1).width = '120';",
        "document.getElementById('img1').width = '120';",
        "document.getElementById('img1').length = '120';",
        "navigator.getElementById('img1').length = '120';",
      ],
    },
    {
      question: "JavaScript",
      responseIdx: 2,
      responses: [
        "s'exécute sur le serveur uniquement",
        "doit être compilé avant d'être exécuté",
        "s'exécute sur le client",
        "est un langage dérivé de l'ADA",
      ],
    },
    {
      question: "Comment sortir d'une boucle for() ou while() ?",
      responseIdx: 1,
      responses: ["end", "break", "exit", "continue"],
    },
    {
      question: "A quoi sert l'opérateur #= ?",
      responseIdx: 2,
      responses: [
        "c'est un comparateur logique",
        "à comparer le type et la valeur de 2 données",
        "n'existe pas en JavaScript",
        "à comparer 2 pointeurs",
      ],
    },
    {
      question: "Comment connaître le nombre d'éléments d'un formulaire ?",
      responseIdx: 3,
      responses: [
        "document.form1.elements.count",
        "document.form1.length",
        "document.form1.count",
        "document.form1.elements.length",
      ],
    },
    {
      question: "L'opérateur == ",
      responseIdx: 2,
      responses: [
        "n'existe pas en JavaScript",
        "est un OU logique",
        "teste l'égalité",
        "s'utilise pour les affectations",
      ],
    },
    {
      question: "Comment renvoyer un nombre aléatoire compris entre 0 et 1 ?",
      responseIdx: 2,
      responses: ["rnd()", "Math.rnd()", "Math.random()", "random()"],
    },
    {
      question: "Quelle propriété permet d'identifier l'OS de l'utilisateur ?",
      responseIdx: 0,
      responses: [
        "navigator.platform",
        "navigator.os",
        "navigator.userAgent",
        "navigator.system",
      ],
    },
    {
      question: "Comment trouver la longueur de la variable Nom ?",
      responseIdx: 2,
      responses: ["Nom.width", "width(Nom)", "Nom.length", "length(Nom)"],
    },
    {
      question: "A quoi sert l'opérateur === ?",
      responseIdx: 0,
      responses: [
        "à comparer le type et la valeur de 2 données",
        "à opérer une affectation après la comparaison",
        "c'est un comparateur logique",
        "n'existe pas en JavaScript",
      ],
    },
    {
      question: "Avec quoi peut-on créer une instance d'un nouvel objet ?",
      responseIdx: 3,
      responses: ["->", "this", "instance", "new"],
    },
  ];
}
