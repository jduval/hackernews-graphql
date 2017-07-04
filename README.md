# hackernews-graphql

## Prérequis

Créer la base de donnée MySQL `hackernews`

```
> mysql
create database hackernews;
```

puis importer les tables

```
> mysql -u root hackernews < sql.sql
```

## Fonctionnalités

- ajout d'url + insertion en bdd
- recupération du titre de la page de l'url saisi
- up et down vote d'un article
- trie des articles par rapport à leur score
- ajout de commentaire sur chaque article
- up et down vote d'un commentaire
- trie des commentaires par rapport à leur score

## Techno utilisées

### Backend

- [expressjs](http://expressjs.com/fr/)
- [express-graphql](https://github.com/graphql/express-graphql)
- [jest](https://facebook.github.io/jest)

### Frontend

- [create-react-app](https://github.com/facebookincubator/create-react-app)
- [redux](http://redux.js.org/)
- [fetch](https://github.com/github/fetch) pour requeter le endpoint graphql. Le schema n'étant pas compliqué, je n'ai pas trouvé la nécessité d'utiliser un client graphql.
- [jest](https://facebook.github.io/jest)

## Installation

Les explications d'installations sont également présentes dans les README des dossiers back/ et front/ :

### back

```
yarn install
yarn start
```

#### Test

`yarn test`

### front

```
yarn install
yarn start
```

#### Test

`yarn test`
