function Jeu(maxEssais) {
    this.nombre = Math.ceil(Math.random()*100);
    this.nbEssais = 0;
    this.maxEssais = maxEssais;
}

let jeu = new Jeu(10);

function essai() {
    const essai = parseInt($('#essai').val());
    $('#essais p').append(essai + " - ");
    jeu.nbEssais++;

    if(essai === jeu.nombre) {
        $('#message').text("Bravo !").addClass('succes').removeClass('erreur');
        fin();
    }
    else {
        const message = essai < jeu.nombre ? "Trop bas": "Trop haut;";
        if(jeu.nbEssais > jeu.maxEssais) {
            fin();
        }
        else if(essai < jeu.nombre){
            $('.nombre').filter((index, element)=>parseInt(element.id,10) <= essai).addClass('cache');
        }
        /*Symboles < et > du mauvais côté et jeu.nombre a la place de essai
        * parseInt avec mauvaise syntaxe
        */
        else {
            $('.nombre').filter((index, element)=>parseInt(element.id,10) >= essai).addClass('cache');
        }
        $('#message').text(`Ah non :(  ${message}`).addClass('erreur');
    }
}

function fin(){
    $('#resultats').addClass('cache');
    $('#essais').html('<p id="message">Bravo !</p>\n' + '<button onclick="nouveauJeu()">Jouer une nouvelle partie</button>');
    $('#message').text("Bravo !").addClass('succes').removeClass('erreur');
    $('.nombre').addClass('cache')
}

function nouveauJeu() {
    jeu = new Jeu(10);
    /* Avait pas de max essais laissais pas restart
    */
    $('#essais button').last().remove();
    /*Restartais sans le bon display*/
    $('#essais').html('<h2>Essais précédents</h2>\n' +
        '      <p></p>\n' +
        '      <p id="message"></p>\n' +
        '      <div id="resultats">\n' +
        '        <label for="essai">Le nombre choisi est: </label>\n' +
        '        <input type="text" id="essai">\n' +
        '        <button onclick="essai()">Soumettre</button>\n' +
        '      </div>')
    /*Nombres restaient cachés*/
    $('.nombre').removeClass('cache')
    $('#essai').val(0);
    $('#essais p').first().text('');
    $('#message').text().removeClass('succes');
}
