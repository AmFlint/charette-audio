     // Affichage et Play pause next
 var chansons = {
     "songs": [
         {
             "titre": "Vampire Killer",
             "jeu": "Castlevania",
             "path": "musiques/castlevania-theme.mp3",
             "cover": "img-content/castlevania-cover.jpg",
             "gifA": "img-content/castle.gif",
             "gifF": "img-content/castlefix.gif"
        },
         {
             "titre": "Mario Thème principal",
             "jeu": "Super Mario Bros",
             "path": "musiques/mario-theme.mp3",
             "cover": "img-content/mario-cover.jpg",
             "gifA": "img-content/mario.gif",
             "gifF": "img-content/mariofix.gif"
        },
         {
             "titre": "Dr. Wily's Castle",
             "jeu": "Megaman 2",
             "path": "musiques/megaman-theme.mp3",
             "cover": "img-content/megaman-cover.jpg",
             "gifA": "img-content/megaman.gif",
             "gifF": "img-content/megamanfix.gif"
        },
         {
             "titre": "Overworld Theme",
             "jeu": "The legend of Zelda",
             "path": "musiques/zelda-theme.mp3",
             "cover": "img-content/zelda-cover.jpg",
             "gifA": "img-content/link.gif",
             "gifF": "img-content/linkfix.gif"
        },
         {
             "titre": "Athletic theme",
             "jeu": "yoshi's island",
             "path": "musiques/yoshi-theme.mp3",
             "cover": "img-content/yoshi-cover.jpg",
             "gifA": "img-content/yoshi.gif",
             "gifF": "img-content/yoshifix.gif"
        }
      ]
 }

 // récupère élément HTML
 var next = document.querySelector('.next');
 var preview = document.querySelector('.preview');
 var btn = document.querySelector('.play');
 var btnStop = document.querySelector('.stop');
 var rond_play = document.querySelector('.rond-play');
 // récupère les élément barre progression
 var fondBarre = document.querySelector('.fond-barre');
 var barre = document.querySelector('.barre');
 // création variable pour bar progress
 var temps;
 var tempsTotal;
 var temps_actuel;

 var etat = btn.innerHTML;
 var player = document.querySelector('audio');
 var jeu = document.querySelector('h2');
 var title = document.querySelector('h3');
 var cover = document.querySelector('.coverimage');
 var gif = document.querySelector('.barre img')

 var i = 0;
 var curtitle = chansons.songs[i].titre;
 var curjeu = chansons.songs[i].jeu;
 var cursong = chansons.songs[i].path;
 var curcover = chansons.songs[i].cover;
 var curgifF = chansons.songs[i].gifF;
 var curgifA = chansons.songs[i].gifA;
 var entrance = document.querySelector('.gifEntrance');
 var tout = document.querySelector('.tout');
 var random = document.querySelector('.random');
 var hasard = 0;
 var ison;

setTimeout(function(){entrance.style.opacity = 0;},4500);
setTimeout(function(){entrance.style.display = "none"; tout.style.display = 'block' },5500);


 function Play() {
    player.play();
    rond_play.innerHTML = '<img src="img-content/pause.svg" alt="play" class="icone">';
    gif.src = curgifA;
    setInterval(function () {
             temps = player.currentTime;
             tempsTotal = player.duration;
             temps_actuel = temps / tempsTotal * 100;
             barre.style.width = temps_actuel + '%';
         }, 1000);
}

function Pause() {
    player.pause();
         rond_play.innerHTML = '<img src="img-content/play.svg" alt="play" class="icone">';
         gif.src = curgifF;
}

function changeInfos() {
    player.src = chansons.songs[i].path;
    player.currentTime = 0;
    curtitle = chansons.songs[i].titre;
    title.innerHTML = curtitle;
    curjeu = chansons.songs[i].jeu;
    jeu.innerHTML = curjeu;
    curcover = chansons.songs[i].cover;
    cover.src = curcover;
    curgifA = chansons.songs[i].gifA;
    curgifF = chansons.songs[i].gifF;
    gif.src = curgifF;
    var lis = document.querySelectorAll('.dispo ul li');
    for (var m = 0; m < lis.length; m++) {
        lis[m].classList.remove('selected')
    }
    lis[i].classList.add('selected');
}

 // Affiche les titres disponibles
 var tableau = document.querySelector('.dispo ul');
 for (j = 0; j < chansons.songs.length; j++) {
     var tempo = '<li>' + chansons.songs[j].titre + '</li>';
     tableau.innerHTML += tempo;
 };

 // affiche le titre, le nom du jeu, ajoute l'url pour l'audio et le lien pour l'image cover
 changeInfos();


// FUNCTION RANDOM

random.addEventListener('click', function(){
    hasard = Math.floor((Math.random() * 5)); // ?
    while (i == hasard) {
            // On relance la var random qui va chercher un entier entre 0 et 3
            hasard = Math.floor((Math.random() * 5));
        }
        i = hasard;
    changeInfos();
    Play();
});


 // FUNCTION NEXT
 next.addEventListener('click', function elNext() {
    if (i == 4) {
      i = 0;
    } else {
      i++;
    }
    changeInfos();
    Play();
 });

 // PREVIEW
 preview.addEventListener('click', function elPrev() {
    if (i == 0) {
        i = 4;
    } else {
        i--;
    }
    changeInfos();
    Play();
 });

 // récupère les li du tableau - événement de clique
 $('.dispo ul li').on(
     'click',
     function () {
        i = $(this).index();
        changeInfos();
        Play();
        var lis = document.querySelectorAll('.dispo ul li');
     });



 // FUNCTION PLAY / PAUSE
btn.addEventListener('click', function () {
    if (rond_play.innerHTML == '<img src="img-content/pause.svg" alt="play" class="icone">') {
        Pause();
    } else {
        Play();
    }
});


document.addEventListener('keypress', function() {
    if (event.keyCode == 32 && player.paused == true) {
        Play();
    } else if (event.keyCode == 32 && player.paused == false) {
        Pause();
    }
});


// FUNCTION STOP
btnStop.addEventListener('click', function () {
    Pause();
    player.currentTime = 0;
    i = 0;
});

// Barre de progression
fondBarre.addEventListener('click', function (event) {

    barre.style.width = event.offsetX / 1009 * 100 + '%';

    player.currentTime = (event.offsetX / 1009) * tempsTotal;

});

 // GESTIONNAIRE DE VOLUME
 var container = document.querySelector(".container");
 var volumeUp = document.querySelector(".volume-rect");

 container.addEventListener("click", function () {
     var rect = container.getBoundingClientRect();
     // On crée une variable x qui va contenir la position en X du curseur de la souris
     var x = event.clientX;
     // On créer une variable width qui va contenir le calcul de la width à afficher de l'image up
     // la position de la souris en x - la position du bloc container_santa par rapport à la gauche (margin-left) et petit ajustement de 13 pixels
     var width = x - rect.left;
     // On change le style "width" de la div qui contient l'image en conséquence
     volumeUp.style.width = width + "px";
     player.volume = width / 100;
 });

 // FONCTION MUTE
 var mute = document.querySelector('.mute');
 
  mute.addEventListener('click', function () {
    if (player.volume !== 0) {
    ison = player.volume;
    player.volume = 0;
    volumeUp.style.width = 0 + "px";
    } else  {
      player.volume = ison;
      volumeUp.style.width = ison*100 + "px";
    }
  });
