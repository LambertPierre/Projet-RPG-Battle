//Enchaîment des évènements:
//A chaque tour, les persos peuvent faire une action. On sélectionne un perso puis une action et enfin une cible, si besoin.
//Ils ont chaqu'un une attaque, défense et un spéciale, dont les valeur change entre les différent persos.
//Puit après leur actions les monstres attaquent des cibles aléatoires.


/// Déclaration des valeurs/variables

var fin = false;

var atkMonstre = 0;
var monstre = 0;
var nomCible = "_";
var manaPerso = 0;
var cibleMonstre = 0;
var vieMonCible = 0;
var vieCible = 0;

var atkGuerrier = 40;
var atkPretre = 20;
var atkArcher = 60;
var atkVoleur = 80;

var manaDef = 10;
var manaAtk = 10;
var manaProvoc = 30;
var manaSoins = 25;
var manaPrecis = 40;
var manaDispa = 20;

var provoquer = false;
var disparu = false;


var atkGob = 15;
var atkDra = 40;
var atkFan = 20;

var vieGue = document.getElementByClass("vieGuer");
vieGue.value = 170;
vieGuer.innerHTML = vieGue.value;
var viePre = document.getElementByClass("viePret");
viePre.value = 80;
viePret.innerHTML = viePre.value;
var vieArc = document.getElementByClass("vieArch");
vieArc.value = 130;
vieArch.innerHTML = vieArc.value;
var vieVol = document.getElementByClass("vieVole");
vieVol.value = 120;
vieVole.innerHTML = vieVol.value;

var manaGue = document.getElementByClass("manaGuer");
manaGue.value = 90;
manaGuer.innerHTML = manaGue.value;
var manaPre = document.getElementByClass("manaPret");
manaPre.value = 90;
manaPret.innerHTML = manaPre.value;
var manaArc = document.getElementByClass("manaArch");
manaArc.value = 90;
manaArch.innerHTML = manaArc.value;
var manaVol = document.getElementByClass("manaVole");
manaVol.value = 90;
manaVole.innerHTML = manaVol.value;

var butGue = document.getElementById("butGue");
var butPre = document.getElementById("butPre");
var butArc = document.getElementById("butArc");
var butVol = document.getElementById("butVol");

var butAtk = document.getElementByClass("butAtk");
var butDef = document.getElementByClass("butDef");
var butSpe = document.getElementByClass("butSpe");

var butGob = document.getElementByClass("butGob");
var butDra = document.getElementByClass("butDra");
var butFan = document.getElementByClass("butFan");

var atkPerso = document.getElementByClass("atkPerso");

var vieGob = document.getElementByClass("vieGob");
vieGob.value = 170;
vieGob.innerHTML = vieGob.value;
var vieDra = document.getElementByClass("vieDra");
vieDra.value = 170;
vieDra.innerHTML = vieDra.value;
var vieFan = document.getElementByClass("vieFan");
vieFan.value = 170;
vieFan.innerHTML = vieFan.value;

var imgGob = document.getElementById("imageGobelin");
var srcGob = imgGob.getAttribute("src");
var imgDra = document.getElementById("imageDragon");
var srcDra = imgDra.getAttribute("src");
var imgFan = document.getElementById("imageFantome");
var srcFan = imgFan.getAttribute("src");

var description = document.getElementByClass("description");


//La fonction qui remet à zéro le tour pour qu'il recommence.
function initialisationTour() {

    //Avant de sélectionné le premier perso, les actions son grisé
    butAtk.style.background-color ; "grey";
    butAtk.disabled=true;
    butDef.style.background-color ; "grey";
    butDef.disabled=true;
    butSpe.style.background-color ; "grey";
    butSpe.disabled=true;
    butGob.style.background-color ; "grey";
    butGob.disabled=true;
    butDra.style.background-color ; "grey";
    butDra.disabled=true;
    butFan.style.background-color ; "grey";
    butFan.disabled=true;


    //Régénération de Mana
    manaGue.value += 5;
    manaGuer.innerHTML = manaGue.value;
    manaPre.value += 5;
    manaPret.innerHTML = manaPre.value;
    manaArc.value += 5;
    manaArch.innerHTML = manaArc.value;
    manaVol.value += 5;
    manaVole.innerHTML = manaVol.value;
    
    provoque=false;
    disparu=false;

    butGue.disabled=false;
    butPre.disabled=false;
    butArc.disabled=false;
    butVol.disabled=false;
    testMortPerso();
}

//Au début du tour les perso deviennent vert et quand on choisit un perso, les autres deviennent gris,
//De plus des valeur de l'attaque, de la Défence et la Spéciale s'affiche.
//Lors d'une prochaine sélection, dans un même tour, les persos déjà utilisé seront en gris.
function selectionPerso(){
    persoChoisie="_";
    choisie=false;
    //Pour savoir si les perso on pas encore été sélection ce tour
    if (butGue.disabled==true){
        butGue.style.background-color ; "grey";
    }
    else {
        butGue.style.background-color ; "green";
    }    
    if (butPre.disabled==true){
        butPre.style.background-color ; "grey";
    }
    else {
        butPre.style.background-color ; "green";
    }    
    if (butArc.disabled==true){
        butArc.style.background-color ; "grey";
    }
    else {
        butArc.style.background-color ; "green";
    }    
    if (butVol.disabled==true){
        butVol.style.background-color ; "grey";
    }
    else {
        butVol.style.background-color ; "green";
    }    
    //Pour prendre l'info du perso sélectionné
    while (choisie=false){
        butGue.onclick= function(){
            persoChoisie="Guerrier";
            choisie=true;
        }
        butPre.onclick= function(){
            persoChoisie="Prêtre";
            choisie=true;
        }
        butGue.onclick= function(){
            persoChoisie="Archer";
            choisie=true;
        }
        butGue.onclick= function(){
            persoChoisie="Voleur";
            choisie=true;
        }
    }
    //Pour traité l'info er changer les boutons d'actions en fonction du perso sélectionné
    description.innerHTML="Vous avez sélectionné le"+persoChoisie;

    if (persoChoisie=="Guerrier"){
        atkPerso.innerHTML = atkGuerrier.value;
        butSpe.innerHTML="Provocation";
        butGue.disabled==true
    } else{
        if (persoChoisie=="Prêtre"){
            atkPerso.innerHTML = atkPretre.value;
            butSpe.innerHTML="Soins";
            butPre.disabled==true
        } else {
            if (persoChoisie=="Archer"){
                atkPerso.innerHTML = atkArcher.value;
                butSpe.innerHTML="Tir précis";
                butArc.disabled==true
            } else {
                if (persoChoisie=="Voleur"){
                    atkPerso.innerHTML = atkVoleur.value;
                    butSpe.innerHTML="Disparition";
                    butVol.disabled==true
                }
            }
        }
    }
}

//Après avoir sélectionner un perso, ces actions apparaîssent:
// l'Attaque et ça valeur, la défense et son Spéciale.
//Ils sont tous les trois en vert mais deviennent gris quand l'un est sélectionné.

function selectionAction(){
    actionChoisie="_";
    choisie=false;
    butAtk.style.background-color ; "green";
    butDef.style.background-color ; "green";
    butSpe.style.background-color ; "green";
    while (choisie=false){
        butAtk.onclick= function(){
            actionChoisie="Attaquer";
            choisie=true;
        }
        butDef.onclick= function(){
            actionChoisie="Défense";
            choisie=true;
        }
        butSpe.onclick= function(){
            actionChoisie=butSpe.innerHTML;
            choisie=true;
        }
    }
    description.innerHTML="Vous avez sélectionné :"+actionChoisie;

    butAtk.style.background-color ; "grey";
    butDef.style.background-color ; "grey";
    butSpe.style.background-color ; "grey";

    if (actionChoisie=="Attaquer"){
        atk();
    } else{
        if (actionChoisie=="Défense"){
            défense();
        } else {
            if (actionChoisie=="Provocation"){
                provocation();
            } else {
                if (persoChoisie=="Soins"){
                    soins();
                } else {
                    if (actionChoisie=="Tir précis"){
                        tir_precis();
                    } else {
                        if (persoChoisie=="Disparition"){
                            disparition();
                        }
                    }
                }
            }
        }
    }
}

//Ensuite les fonctions pour toutes les actions possibles

//La fonctions pour l'attaque de tous les persos
function atk(){
		
    if (butAtk.disabled == false && manaPerso.value >= manaAtk){
		
        ciblerMonstre();
        vieMonCib.value -= atkPerso;
        vieMonCib.innerHTML = vieMonCib.value;
        testMortMonstre();

        
        description.innerHTML = "Il avez infligé "+atkPerso+" points de dégats. Il a consomé "+manaAtk+" points de Mana.";
        
		butAtk.disabled = true;
		butDef.disabled = true;
		butSpe.disabled = true;
		
    }	
    else{
        description.innerHTML = "Vous n'avez plus assez de Mana.";
        selectionAction();
    }
}

//Le fonctions pour la défense de tous les persos
function défense (){
	
	if (butDef.disabled == false && manaPerso.value >= manaDef){
		
		atkMonstre = atkMonstre/2;
		
		manaPerso.value -= manaDef;
		manaPerso.innerHTML = manaPerso.value;
		
		description.innerHTML = "Son sort le protège de 50% des attaques des monstre. Il a consomé "+manaDef+" points de Mana.";
		
		butDef.disabled = true;
		butAtk.disabled = true;
		butSpe.disabled = true;
		
    }
	else{
        description.innerHTML = "Vous n'avez plus assez de Mana.";;
        selectionAction();
    }
}

function provocation(){
    if (butSpe.disabled == false && manaPerso.value >= manaProvoc){

    provoque=true;

    manaPerso.value -= manaDef;
    manaPerso.innerHTML = manaPerso.value;

    description.innerHTML="Le Guerrier va reçevoir les coups des monstres ce tour-ci !";
    }
    else {
        description.innerHTML="Il n'avez pas assez de Mana !";
        selectionAction();
    }
}

function disparition(){
    if (butSpe.disabled == false && manaPerso.value >= manaDispa){

    disparu=true;

    manaPerso.value -= manaDef;
    manaPerso.innerHTML = manaPerso.value;

    description.innerHTML="Le Voleur ne va reçevoir aucun ce tour-ci !";
    }
    else {
        description.innerHTML="Il n'avez pas assez de Mana !";
        selectionAction();
    }
}

function soins(){
    if (butSpe.disabled == false && manaPerso.value >= manaSoins){
    //Trouver le perso avec le moins de vie
    cibleSoins=0;
    save="_";
    if ((vieGue-viePre) < 0){
        cibleSoins = vieGue;
        save = vieGuer;
    } else {
        cibleSoins = viePre;
        save = viePret;
    }
    if ((cibleSoins-vieArc) > 0){
        cibleSoins = vieArc;
        save = vieArch;
    } 
    if ((cibleSoins-vieVol) > 0){
        cibleSoins = vieVol;
        save = vieVole;
    }

    cibleSoins.value += 80;
    save.innerHTML = cibleSoins.value;

    manaPerso.value -= manaDef;
    manaPerso.innerHTML = manaPerso.value;

    description.innerHTML="Le Prêtre à soignez le "+cibleSoins+" de 80 de Vie !";
    }
    else {
        description.innerHTML="Il n'avez pas assez de Mana !";
        selectionAction();
    }
}

function tir_precis(){
    if (butSpe.disabled == false && manaPerso.value >= manaPrecis){
        
        ciblerMonstre();
        vieMonCib.value -= 100;
        vieMonCib.innerHTML = vieMonCib.value
        testMortMonstre();
       
        
        description.innerHTML = "L'Archeur a infligé 100 points de dégats à "+cibleMonstre+". Il a consomé "+manaAtk+" points de Mana.";
        
		butAtk.disabled = true;
		butDef.disabled = true;
		butSpe.disabled = true;
		
    }	
    else{
        description.innerHTML = "Vous n'avez plus assez de Mana.";
        selectionAction();
    }
}

//La fonction pour choisir quel monstre attaquer

function ciblerMonstre(){
    choisie=false;
    while (choisie=false){
        butGob.onclick= function(){
            cibleMonstre="Gobelin";
            vieMonCible=vieGob;
            choisie=true;
        }
        butDef.onclick= function(){
            cibleMonstre="Dragon";
            vieMonCible=vieDra;
            choisie=true;
        }
        butSpe.onclick= function(){
            cibleMonstre="Fantôme";
            vieMonCible=vieFan;
            choisie=true;
        }
    }
}

//Le fonction pour vérifier si la cible de l'attaque est morte

function testMortMonstre(){
    if (vieGob<=0) {
        srcGob="./assets/tombe.png";
        description.innerHTML = "Le Gobelin est mort !";
    }
    if (vieDra<=0) {
        srcDra="./assets/tombe.png";
        description.innerHTML = "Le Dragon est mort !";
    }
    if (vieFan<=0) {
        srcFan="./assets/tombe.png";
        description.innerHTML = "Le Fantôme est mort !";
    }
}

//La chaîne global du tour des monstres, ils attaquent les uns aprèsles autres, si ils sont toujours en vie.
function tourMonstre(){
    if (vieGob.value <= 0){
        monstre = "Gobelin"
        atkMonstre = atkGob
        atkDuMonstre(monstre)
    }
    if (vieGob.value <= 0){
        monstre = "Dragon"
        atkMonstre = atkDra
        atkDuMonstre(monstre)
    }
    if (vieGob.value <= 0){
        monstre = "Fantôme"
        atkMonstre = atkFan
        atkDuMonstre(monstre)
    }
    testMortPerso();
}
//La fonction pour l'attaque de chaque monstre
function atkDuMonstre (monstre){
    cible();
    if (vieCible == vieGue){
        nomCible = "au Guerrier";
    }
    if (vieCible == viePre){
        nomCible = "au Prêtre";
    }
    if (vieCible == vieArc){
        nomCible = "à l'Archer";
    }
    if (vieCible == vieVol){
        nomCible = "au Voleur";
    }
	vieCible.value -= atkMonstre;
	vieCible.innerHTML = vieCible.value;
	description.innerHTML = monstre+" inflige "+atkMonstre+" "+nomCible;
}

//La prise aléatoire de la cible des attaque de chaque monstres.
function cibleAlea() {
    return Math.floor(Math.random() * Math.floor(5));
}
function cible(){
    if (provoque==true){
        vieCible = vieGue.value;
    }
    else {
        cibleAlea();
        if (Math.floor == 1){
            vieCible = vieGue.value;
        }
        if (Math.floor == 2){
            vieCible = viePre.value;
        }
        if (Math.floor == 3){
            vieCible = vieArc.value;
        }
        if (Math.floor == 4){
           if (disparu==true) {
                description.innerHTML="Le Voleur à esquivé l'attaque du"+monstre;
           } else {
                vieCible = vieVol.value;
           }
        }
        return vieCible;
    }
}

function testMortPerso(){
    if (vieGue<=0) {
        description.innerHTML = "Le Guerrier est mort !";
        butGue.disabled=true;
    }
    if (viePre<=0) {
        description.innerHTML = "Le Prêtre est mort !";
        butPre.disabled=true;
    }
    if (vieArc<=0) {
        description.innerHTML = "L'Archer est mort !";
        butArc.disabled=true;
    }
    if (vieVol<=0) {
        description.innerHTML = "Le Voleur est mort !";
        butVol.disabled=true;
    }
}

//Je pense que le noms de ces fonctions sont explicites

function testVictoire() {
    if (vieGob<=0 && vieDra<=0 && vieFan<=0){
        description.innerHTML="Bravo vous avez gagnez !";
        fin=true;
        //Aucun bouton ne pourra être cliquer, car la partie est fini
        butGue.style.background-color ; "grey";
        butGue.disabled=true;
        butPre.style.background-color ; "grey";
        butPre.disabled=true;
        butArc.style.background-color ; "grey";
        butArc.disabled=true;
        butVol.style.background-color ; "grey";
        butVol.disabled=true;
        butAtk.style.background-color ; "grey";
        butAtk.disabled=true;
        butDef.style.background-color ; "grey";
        butDef.disabled=true;
        butSpe.style.background-color ; "grey";
        butSpe.disabled=true;
        butGob.style.background-color ; "grey";
        butGob.disabled=true;
        butDra.style.background-color ; "grey";
        butDra.disabled=true;
        butFan.style.background-color ; "grey";
        butFan.disabled=true;
    }
}
function testDefaite() {
    if (vieGue<=0 && viePre<=0 && vieArc<=0 && vieVol<=0){
        description.innerHTML="Dommage vous avez perdu !";
        fin=true;
        //Aucun bouton ne pourra être cliquer, car la partie est fini
        butGue.style.background-color ; "grey";
        butGue.disabled=true;
        butPre.style.background-color ; "grey";
        butPre.disabled=true;
        butArc.style.background-color ; "grey";
        butArc.disabled=true;
        butVol.style.background-color ; "grey";
        butVol.disabled=true;
        butAtk.style.background-color ; "grey";
        butAtk.disabled=true;
        butDef.style.background-color ; "grey";
        butDef.disabled=true;
        butSpe.style.background-color ; "grey";
        butSpe.disabled=true;
        butGob.style.background-color ; "grey";
        butGob.disabled=true;
        butDra.style.background-color ; "grey";
        butDra.disabled=true;
        butFan.style.background-color ; "grey";
        butFan.disabled=true;
    }
}

//Le squelette du jour, la structure d'un tour:

description.innerHTML="Des monstres apparaîssent !";
while (fin==false){
    initialisationTour();
    if (vieGue > 0){
        selectionPerso();
        selectionAction();
        testVictoire();
    }
    if (viePre > 0){
        selectionPerso();
        selectionAction();
        testVictoire();
    }
    if (vieArc > 0){
        selectionPerso();
        selectionAction();
        testVictoire();
    }
    if (vieVol > 0){
        selectionPerso();
        selectionAction();
        testVictoire();
    }
    tourMonstre();
    testMortPerso();
    testDefaite();
}