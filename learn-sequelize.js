const { Genre, Movie, Actor} = require('./models');

/*
  currently, the genre table only has 3 entries: Action, Comedy, and Drama
  Add one more Genre of your choice.
*/
function insertNewGenre() {
  return Genre.create({ name: 'Scifi' });

  // return Genre.create({ name: 'Comedy'}).catch( err => console.log(err));
}

/*
  currently, there are 5 movies
  Add one more Movie of your choice. But it CANNOT be from 2008.
*/
function insertNewMovie() {
  return Movie.create({ title: 'Inception', year: 2010 });
}

/*
  Return the title of the movie with ID=2
*/
function getMovieWithId2() {
  return Movie.findByPk(2).get('title');

  // .get() unwraps the object and gets only one column

  // alternatives
  // Movie.findOne({ where: {id: 2} }).get("title");

  // get a Promise, .then() will return the movie Object, then access movie title, can also do movie.title
  // Movie.findByPk(2).then(movie => movie["title"])
}

/*
  Return an array of all the actor names
*/
function getAllActors() {
  // return Actor.findAll().map(actor => actor.get('name'));

  return Actor.findAll().then(actorList => { return actorList.map(actor => actor.name) })
}

/*
  Return an array of all the movie names from 2008
*/
function getAllMoviesFrom2008() {
  // return Movie.findAll({ where: { year: 2008 } }).map(movie => movie.get('title'));

  return Movie.findAll({where: { year: 2008 }}).then(movieList => {
    return movieList.map(movie => movie.title)
  })
}

/*
  Delete the genre you added in the first test
*/
function deleteGenreYouAdded() {
  // 1 sql statement
  // return Genre.destroy({ where: { name: 'Scifi' } })

  // check if there is a genre called Scifi, and if there is, get it and destroy it
  // 2 sql statements, .findOne() and .destroy()
  return Genre.findOne({where: {name: 'Scifi'}}).then(genre => {
    if(genre){
      return genre.destroy();
    }
  })
}

/*
  Rosario Dawson acted in the movie Eagle Eye.
  Add this association.
*/
async function associateRosarioToEagleEye() {
  // return Actor.findOne({ where: {name: 'Rosario Dawson'} }).then(actorRD => {
  //   return Movie.findOne({where: {title: 'Eagle Eye'}}).then(movieEE => {
  //     return movieEE.addActor(actorRD);
  //     // return actorRD.addMovie(movieEE);
  //   })
  // })

  // let actorPromise = Actor.findOne({ where: {name: 'Rosario Dawson'} });
  // let moviePromise = Movie.findOne({where: {title: 'Eagle Eye'}});

  // return Promise.all([actorPromise, moviePromise])
  //               .then(([actor, movie]) => {
  //                 return actor.addMovie(movie);
  //               })

  // using async await syntax, need to put async in front of the original function
  let actorRD = await Actor.findOne({ where: {name: 'Rosario Dawson'} });
  let movieEE = await Movie.findOne({where: {title: 'Eagle Eye'}});

  return movieEE.addActor(actorRD);

}

/*
  Robert Downey Jr. acted in the movie Tropic Thunder.
  Add this association.
*/
async function associateRobertToTropicThunder() {
  let actorRDJ = await Actor.findOne({where: {name: 'Robert Downey Jr.'}});
  let movieTT = await Movie.findOne({where: {title: 'Tropic Thunder'}});

  return movieTT.addActor(actorRDJ);
}

module.exports = {
  insertNewGenre,
  insertNewMovie,
  getMovieWithId2,
  getAllActors,
  getAllMoviesFrom2008,
  deleteGenreYouAdded,
  associateRosarioToEagleEye,
  associateRobertToTropicThunder,
};
