 // Affichage et Play pause next
 var chansons = {
     "songs": [
         {
             "titre": "Vempire Killer",
             "jeu": "Castlevania",
             "path": "musiques/castlevania.mp3",
             "cover": "img-content/gojira.jpeg",
             "gifF": "img-content/",
             "gifA": "img-content/"
        },
         {
             "titre": "Mario Thème principal",
             "jeu": "Super Mario Bros",
             "path": "musiques/mario-theme.mp3",
             "cover": "img-content/gojira.jpeg",
             "gifF": "img-content/",
             "gifA": "img-content/"
        },
         {
             "titre": "Dr. Wily's Castle",
             "jeu": "Megaman 2",
             "path": "musiques/megaman-theme.mp3",
             "cover": "img-content/gojira.jpeg",
             "gifF": "img-content/",
             "gifA": "img-content/"
        },
         {
             "titre": "Overworld Theme",
             "jeu": "The legend of Zelda",
             "path": "musiques/yoshi-theme.mp3",
             "cover": "img-content/gojira.jpeg",
             "gifF": "img-content/",
             "gifA": "img-content/"
        },
         {
             "titre": "Athletic theme",
             "jeu": "yoshi's island",
             "path": "musiques/zelda-theme.mp3",
             "cover": "img-content/gojira.jpeg",
             "gifF": "img-content/",
             "gifA": "img-content/"
        }


      ]
 }
 var next = document.querySelector('.next');
 var btn = document.querySelector('.play');
 var btnStop = document.querySelector('.stop-it');

 var etat = btn.innerHTML;
 var player = document.querySelector('audio');
 var artiste = document.querySelector('h2');
 var title = document.querySelector('h3');
 var cover = document.querySelector('img');

 var i = 0;
 var cursong = chansons.songs[i].path;
 var curtitle = chansons.songs[i].titre;
 var curartiste = chansons.songs[i].artiste;
 var curcover = chansons.songs[i].cover;

 title.innerHTML = curtitle;
 artiste.innerHTML = curartiste;
 player.src = cursong;
 cover.src = curcover;

 console.log(player);
 console.log(etat);

 //NEXT
 next.addEventListener('click', function elNext() {

     i++;
     cur = chansons.songs[i].path;
     player.src = cur;
     btn.innerHTML = 'Play';
     curtitle = chansons.songs[i].titre;
     title.innerHTML = curtitle;
     curartiste = chansons.songs[i].artiste;
     artiste.innerHTML = curartiste;
     curcover = chansons.songs[i].cover;
     cover.src = curcover;
     console.log(etat);

 })

 // SAMANTHA


 // test pour boucle sur tableau pour afficher les titres
 var test = document.querySelector('.dispo ul');

 for (j = 0; j < chansons.songs.length; j++) {
     var tempo = '<li>' + chansons.songs[j].titre + '</li>';
     test.innerHTML += tempo;
 };

 // récupère les li pour faire événement de clique
 $('.dispo ul li').on(
     'click',
     function () {
         var id = $(this).index();
         var changeM = chansons.songs[id].path;
         player.src = changeM;
         player.play();
         btn.innerHTML = 'Pause';
     });


 // PLAY / PAUSE
 btn.addEventListener('click', function () {
     if (btn.innerHTML == 'Pause') {
         player.pause()
         btn.innerHTML = 'Play';
         var etat = btn.innerHTML;
         console.log(etat);
         barre.innerHTML = '<img src="img-content/megamanfix.gif" alt="">';
     } else {
         player.play();
         btn.innerHTML = 'Pause';
         var etat = btn.innerHTML;
         console.log(etat);
         barre.innerHTML = '<img src="img-content/megaman.gif" alt="">';
         setInterval(function () {
             temps = player.currentTime;
             tempsTotal = player.duration;
             temps_actuel = temps / tempsTotal * 100;
             barre.style.width = temps_actuel + '%';
         }, 1000);
     }
 });
 //STOP
 btnStop.addEventListener('click', function () {
     player.currentTime = 0;
     player.pause();
     btn.innerHTML = 'Play';
 });

 // Barre de progression
 var fondBarre = document.querySelector('.fond-barre');
 var barre = document.querySelector('.barre');
 var temps;
 var tempsTotal;
 var temps_actuel;

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