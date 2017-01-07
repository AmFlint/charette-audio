 // Affichage et Play pause next
 var chansons = {
     "songs": [
         {
             "titre": "Vempire Killer",
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
 var btnStop = document.querySelector('.stop-it');
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
 var cover = document.querySelector('img');
 var gif = document.querySelector('.barre img')

 var i = 0;
 var curtitle = chansons.songs[i].titre;
 var curjeu = chansons.songs[i].jeu;
 var cursong = chansons.songs[i].path;
 var curcover = chansons.songs[i].cover;
 var curgifF = chansons.songs[i].gifF;
 var curgifA = chansons.songs[i].gifA;

 // affiche le titre, le nom du jeu, ajoute l'url pour l'audio et le lien pour l'image cover             
 title.innerHTML = curtitle;
 jeu.innerHTML = curjeu;
 player.src = cursong;
 cover.src = curcover;
 gif.src = curgifF;


 // FUNCTION NEXT
 next.addEventListener('click', function elNext() {
     i++;
     cur = chansons.songs[i].path;
     player.src = cur;
     player.play();
     btn.innerHTML = 'Pause';
     player.currentTime = 0;
     curtitle = chansons.songs[i].titre;
     title.innerHTML = curtitle;
     curjeu = chansons.songs[i].jeu;
     jeu.innerHTML = curjeu;
     curcover = chansons.songs[i].cover;
     cover.src = curcover;
     curgifA = chansons.songs[i].gifA;
     gif.src = curgifA;

 });

 // PREVIEW
 preview.addEventListener('click', function elPrev() {

     i--;
     cur = chansons.songs[i].path;
     player.src = cur;
     btn.innerHTML = 'Pause';
     player.currentTime = 0;
     player.play();
     curtitle = chansons.songs[i].titre;
     title.innerHTML = curtitle;
     curjeu = chansons.songs[i].jeu;
     jeu.innerHTML = curjeu;
     curcover = chansons.songs[i].cover;
     cover.src = curcover;
     curgifA = chansons.songs[i].gifA;
     gif.src = curgifA;
 });




 // Affiche les titres disponibles
 var tableau = document.querySelector('.dispo ul');
 for (j = 0; j < chansons.songs.length; j++) {
     var tempo = '<li>' + chansons.songs[j].titre + '</li>';
     tableau.innerHTML += tempo;
 };

 // récupère les li du tableau - événement de clique
 $('.dispo ul li').on(
     'click',
     function () {
         var id = $(this).index();
         var changeM = chansons.songs[id].path;
         player.src = changeM;
         player.currentTime = 0;
         player.play();
         btn.innerHTML = 'Pause';
         var changetitle = chansons.songs[id].titre;
         title.innerHTML = changetitle;
         var changejeu = chansons.songs[id].jeu;
         jeu.innerHTML = changejeu;
         var changecover = chansons.songs[id].cover;
         cover.src = changecover;
         var changegif = chansons.songs[id].gifA;
         gif.src = changegif;
         i = id;
     });


 // FUNCTION PLAY / PAUSE
 btn.addEventListener('click', function () {
     if (btn.innerHTML == 'Pause') {
         player.pause()
         btn.innerHTML = 'Play';
         gif.src = chansons.songs[i].gifF;
     } else {
         player.play();
         btn.innerHTML = 'Pause';
         gif.src = chansons.songs[i].gifA;
         setInterval(function () {
             temps = player.currentTime;
             tempsTotal = player.duration;
             temps_actuel = temps / tempsTotal * 100;
             barre.style.width = temps_actuel + '%';
         }, 1000);
     }
 });


 // FUNCTION STOP
 btnStop.addEventListener('click', function () {
     player.pause();
     player.currentTime = 0;
     btn.innerHTML = 'Play';
 });

 // Barre de progression
 fondBarre.addEventListener('click', function (event) {

     barre.style.width = event.offsetX / 500 * 100 + '%';

     player.currentTime = (event.offsetX / 500) * tempsTotal;

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