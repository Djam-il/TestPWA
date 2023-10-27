const express = require("express");
const session = require("express-session"); // Ajoutez cette ligne
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "votre_clé_secrète",
    resave: true,
    saveUninitialized: true,
  })
);

// Définir le moteur de vue pour afficher des messages de succès ou d'erreur.
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/search-page", (req, res) => {
  res.sendFile(__dirname + "/PWA/index.html");
});

app.post("/", (req, res) => {
  const password = req.body.mdp;
  const confirmPassword = req.body.cmdp;
  const apiKey = req.body.key;
  const name = req.body.nom;

  if (password === confirmPassword) {
    // Mot de passe confirmé, vous pouvez enregistrer l'API key ou effectuer d'autres actions ici.
    // Enregistrez la clé API dans la session ou une base de données.
    // Puis redirigez l'utilisateur vers la page de recherche.
    req.session.apiKey = apiKey; // Exemple de stockage en session
    res.redirect("/search-page"); // Redirection vers la page de recherche
  } else {
    res.render("error", { message: "Les mots de passe ne correspondent pas." });
  }
});

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
