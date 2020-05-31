let app = new function() {
  //el: element
  this.el = document.getElementById('movies');
  // storage data in an array
  this.moviesName = ['Dilwale Dulhania Le Jayenge (1995-10-20)', 'Forrest Gump (1994-07-06)', 'Justice League Dark: Apokolips War(2020-05-05)', 'Life Is Beautiful (1997-12-20)', 'Me contro Te: Il film - La vendetta del Signor S (2020-01-17)', 'Mortal Kombat Legends: Scorpion\'s Revenge(2020-04-12)', 'Once Upon a Time in America (1984-05-23)', 'Parasite (2019-05-30)', 'Pulp Fiction (1994-09-10)', 'Schindler\'s List (1993-11-30)'];


  this.moviesInfo = [

    {
      movieName: 'Dilwale Dulhania Le Jayenge (1995-10-20)',
      movieFlag: true,
      movieId: ""
    },
    {
      movieName: "Forrest Gump (1994-07-06)",
      movieFlag: false,
      movieId: ""
    },
    {
      movieName: "Justice League Dark: Apokolips War(2020-05-05)",
      movieFlag: true,
      movieId: ""
    },
    {
      movieName: "Life Is Beautiful (1997-12-20)",
      movieFlag: true,
      movieId: ""
    },
    {
      movieName: "Me contro Te: Il film - La vendetta del Signor S (2020-01-17)",
      movieFlag: false,
      movieId: ""
    },
    {
      movieName: "Mortal Kombat Legends: Scorpion\'s Revenge(2020-04-12)",
      movieFlag: true,
      movieId: ""
    },
    {
      movieName: "Once Upon a Time in America (1984-05-23)",
      movieFlag: false,
      movieId: ""
    },
    {
      movieName: "Parasite (2019-05-30)",
      movieFlag: false,
      movieId: ""
    },
    {
      movieName: "Pulp Fiction (1994-09-10)','Schindler\'s List (1993-11-30)",
      movieFlag: true,
      movieId: ""
    },
  ];

  //show total of movies' number
  this.Count = function(data) {
    let el = document.getElementById('counter');
    let name = 'item';

    if (data) {
      if (data > 1) {
        name = 'items';
      }
      el.innerHTML = data + ' ' + name;
    } else {
      el.innerHTML = 'No ' + name;
    }
  };
  //fetch data from array
  this.FetchAll = function() {
    let data = '';

    if (this.moviesInfo.length > 0) {
      for (i = 0; i < this.moviesInfo.length; i++) {
        data += '<tr>';
        if(this.moviesInfo[i].movieFlag){
          data += '<td id="' + i + '" class="favorite-color-blue" onclick="app.toggleFavorite(' + i + ')">' + this.moviesInfo[i].movieName + '</td>';
        } else {data += '<td onclick="app.toggleFavorite(' + i + ')">' + this.moviesInfo[i].movieName + '</td>';}

        data += '<td><button onclick="app.Edit(' + i + ')">Edit</button></td>';
        data += '<td><button onclick="app.Delete(' + i + ')">Delete</button></td>';
        data += '</tr>';
      }
    }

    this.Count(this.moviesInfo.length);
    return this.el.innerHTML = data;
  };

  this.Add = function() {
    el = document.getElementById('add-name');
    // Get the value
    let movie = el.value;
    let movieInfo = {
      movieName: movie.trim(),
      movieFlag: false,
      movieId: this.moviesInfo.length + 1
    };

    if (movie) {
      // Add the new value
      this.moviesInfo.push(movieInfo);
      // Reset input value
      el.value = '';
        //sort data array
          this.moviesInfo.sort(this.compareByName);
      // Dislay the new list
      this.FetchAll();
    }
  };

  this.Edit = function(item) {
    let el = document.getElementById('edit-name');
    // Display value in the field
    el.value = this.moviesInfo[item].movieName;
    // Display fields
    document.getElementById('spoiler').style.display = 'block';
    self = this;

    document.getElementById('saveEdit').onsubmit = function() {
      // Get value
      let movieName = el.value;

      if (movieName) {
        // Edit value
        self.moviesInfo[item].movieName = movieName.trim();
        // Display the new list
        //sort data array
        this.moviesInfo.sort(this.compareByName);
        self.FetchAll();
        // Hide fields
        CloseInput();
      }
    }
  };

  this.Delete = function(item) {
    // Delete the current row
    this.moviesInfo.splice(item, 1);
    //sort data array
    this.moviesInfo.sort(this.compareByName);
    // Display the new list
    this.FetchAll();
  };

  //Get favorite movies
  this.getFavoriteMovies = function() {
    let favoriteMoviesData = '';

    if (this.moviesInfo.length > 0) {
      for (i = 0; i < this.moviesInfo.length; i++) {
        if(this.moviesInfo[i].movieFlag) {
          favoriteMoviesData += '<p>' + this.moviesInfo[i].movieName + '</p>';
        }
      }
    }

    return document.getElementById('favoriteMovieList').innerHTML = favoriteMoviesData;
  }

  // Toggle to favorite List
  this.toggleFavorite = function(item) {
    this.moviesInfo[item].movieFlag = !this.moviesInfo[item].movieFlag;
    document.getElementById(item).classList.toggle("favorite-color-blue");
  }

  //Display the favorite movie to blue color
 this.displayFavoriteMovie = function() {

 }
  // pop favorit list method
  this.PopFavorite = function() {
    // Get the modal
    let modal = document.getElementById("favoritListModal");
    // Get the button that opens the modal
    let btn = document.getElementById("favoritListBtn");
    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[0];
    //Get favorite movies info
    this.getFavoriteMovies();

    // When the user clicks on the button, open the modal
    btn.onclick = function() {
      modal.style.display = "block";
      //before click recreate the favorite list
      app.PopFavorite();
    }
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }
  }
//small in front
  this.compareByName = function(a, b) {
    var x = a.movieName.toLowerCase();
    var y = b.movieName.toLowerCase();
    return x < y ? -1 : x > y ? 1 : 0;
  }
}





app.FetchAll();

app.PopFavorite();

function CloseInput() {
  document.getElementById('spoiler').style.display = 'none';
}
