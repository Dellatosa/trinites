export default class TrinitesActor extends Actor {

    prepareData() {
        super.prepareData();
        let data = this.data.data;

    if(this.type == "trinite")
    {
        //Calcul des bonus de Signes
        for(let[keySigne, signe] of Object.entries(data.signes)) {
            if(data.themeAstral.archetype == keySigne) {
                signe.valeur = 6;
            }
            else if(data.themeAstral.ascendant1 == keySigne || data.themeAstral.ascendant2 == keySigne) {
                signe.valeur = 4;
            }
            else if(data.themeAstral.descendant1 == keySigne || data.themeAstral.descendant2 == keySigne || data.themeAstral.descendant3 == keySigne) {
                signe.valeur = 2;
            }
            else {
                signe.valeur = 0;
            }
        }

        /*------------------------------------------
        ---- Calcul des valeurs des compétences ----
        ------------------------------------------*/
        
        for(let[keySigne, compsSigne] of Object.entries(data.competences)) {
            for(let[keyComp, competence] of Object.entries(compsSigne)) {
                if(data.competences[keySigne][keyComp].ouverte == 1) {
                    data.competences[keySigne][keyComp].valeur = data.competences[keySigne][keyComp].base + data.signes[keySigne].valeur;
                }
                else {
                    if(data.competences[keySigne][keyComp].base > 0) {
                        data.competences[keySigne][keyComp].valeur = data.competences[keySigne][keyComp].base + data.signes[keySigne].valeur;
                    }
                    else {
                        data.competences[keySigne][keyComp].valeur = 0;
                    }
                }
            }
        }

        /*-----------------------------------
        ---- Calcul des valeurs de Karma ----
        -----------------------------------*/

        //recalcul des valeurs de karma afin qu'elles ne dépasent pas le max
        if(data.trinite.deva.karma.value > data.trinite.deva.karma.max) { data.trinite.deva.karma.value = data.trinite.deva.karma.max; }
        if(data.trinite.archonte.karma.value > data.trinite.archonte.karma.max) { data.trinite.archonte.karma.value = data.trinite.archonte.karma.max; }

        // La valeur de Karma de l'adam est calculée en fonction des valeurs du Deva et de l'Archonte
        data.trinite.adam.karma.max = Math.abs(data.trinite.deva.karma.max - data.trinite.archonte.karma.max);
        if(data.trinite.adam.karma.value > data.trinite.adam.karma.max) { data.trinite.adam.karma.value = data.trinite.adam.karma.max; }

        // Son type dépend du plus fort des deux
        if(data.trinite.adam.karma.max == 0) {
            data.trinite.adam.karma.type = "";
        }
        else {
            data.trinite.adam.karma.type = data.trinite.deva.karma.max > data.trinite.archonte.karma.max ? "lumiere" : "tenebre";
        }

    }

    // L'influence ne peut dépasser la valeur de réseau
    if(data.influence.valeur > data.reseau.valeur) {
        data.influence.valeur = data.reseau.valeur;
    }

    // Points de vie maxi
    data.ligneVie1 = data.pointsLigneVie;
    data.ligneVie2 = data.pointsLigneVie * 2;
    data.nbPointsVieMax = data.pointsLigneVie * 3;

    //Etat de santé
    if(data.nbBlessure == 0) {
        data.etatSante = "indemne";
    }
    else if (data.nbBlessure <= data.ligneVie1) {
        data.etatSante = "endolori";
    }
    else if(data.nbBlessure <= data.ligneVie2) {
        data.etatSante = "blesse";
    }
    else {
        data.etatSante = "inconscient";
    }

    //console.log(data);
    }
}