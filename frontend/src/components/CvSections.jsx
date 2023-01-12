import React from "react";

function CvSections() {
  return (
    <div className="container">
      <div className="cv-sections">
        <div className="onglet">
          <div>Compétences</div>
          <div>Expériences professionelles</div>
          <div>Formations</div>
          <div>Activités extra-professionelles</div>
        </div>
        <div className="section-content-container">
          <div className="competences">
            <article>
              <div className="sub-section-title">Développement Web</div>
              <div className="sub-section-content">
                Maquettage, développement composants frontend
                (HTML/CSS/JavaScript + React) et backend (Node/Express/MySQL) +
                intégration & développement d’API REST + bases C
              </div>
            </article>
            <article>
              <div className="sub-section-title">Conseil & Recherche</div>
              <div className="sub-section-content">
                Gestion de projet, réalisation d’études et prévisions de marché,
                modélisation, conduite d’entretien, recherche avancée,
                sensibilité à l’expérience utilisateur, esprit rigoureux,
                créatif et collaboratif
              </div>
            </article>
            <article>
              <div className="sub-section-title">Anglais</div>
              <div className="sub-section-content">
                Courant, lu, écrit, parlé, TOEIC : 860/990 et pratique
                quotidienne en milieu professionnel (conférences, tables rondes,
                interviews, recherche documentaire ...)
              </div>
            </article>
            <article>
              <div className="sub-section-title">Allemand</div>
              <div className="sub-section-content">
                Lu, écrit, parlé (séjour linguistique à Hanovre)
              </div>
            </article>
            <article>
              <div className="sub-section-title">Informatique</div>
              <div className="sub-section-content">
                Word, Excel, PowerPoint, Access, Photoshop, GIMP, Lightroom
                (développement photo), Mac, PC et Unix/Linux, compétences
                réseaux, domotique
              </div>
            </article>
          </div>
          <div className="experiences-professionnelles">
            <article>
              <div className="sub-section-title">
                Fév. – Juillet 2022 (Formation 5 mois)
              </div>
              <div className="sub-section-content">
                <h1>Développeur web junior :</h1> projets en méthode Agile
                (framework Scrum) en groupe et en individuel
                <ul>
                  <li>
                    <b>Stack technique : </b>
                    HTML / CSS / JavaScript / React / NodeJS / Express / MySQL /
                    git / GitHub / RESTAPIs
                  </li>
                  <li>
                    <b>Rôles tournants occupés :</b> Product Owner, Scrum
                    master, Git master (et toujours dev)
                  </li>
                  <li>
                    <b>Projets fullstack réalisés de bout en bout :</b>
                    Définition du cahier des charges, organisation
                    fonctionnement interne du groupe, wireframe, prototype,
                    modélisation base de données (Merise), dev, gestion workflow
                    Git
                  </li>
                  <li>
                    <b>Exemples de projets réalisés :</b>
                    <li>
                      <b>Social Team Consulting</b> (projet fin de formation) :
                      Système de mise en relation entre associations et
                      intervenants sociaux, Réalisation site vitrine & interface
                      de candidature et de gestion des missions
                    </li>
                    <li>
                      <b>My Green Advisor</b> : site fullstack suivi météo et
                      pollution de l’air avec système ajout de favori (dev en
                      30h)
                    </li>
                    <li>
                      <b>Ka[r]out404 (hackathon)</b> : développement à 6 en 48h
                      d’une plateforme pour améliorer le partage d’information
                      au sein d’une entreprise via un système de page projet,
                      collaborateur, profil et newsfeed
                    </li>
                  </li>
                </ul>
              </div>
            </article>
            <article>
              <div className="sub-section-title">
                2008 – 2022 (CDI - 14 ans)
              </div>
              <div className="sub-section-content">
                <h1>IDATE DigiWorld</h1>, Institut De l’Audiovisuel et des
                Télécommunications en Europe (Montpellier)
                <br />
                <b>Consultant Sénior</b>, Expert Innovations terminaux,
                plateformes mobiles et technologies radio
                <ul>
                  <li>
                    <b>
                      Compréhension et analyse de la dynamique et du potentiel
                      de l’innovation technologique
                    </b>
                    <li>Apport fonctionnel / usages directs et indirects</li>
                    <li>
                      Stade de maturité technologique (écart entre la promesse
                      et apport réel)
                    </li>
                    <li>
                      Écosystème, modèles économiques et expérience utilisateurs
                    </li>
                    <li>
                      Environnement régulation/standardisation et acceptabilité
                      sociale
                    </li>
                  </li>
                  <li>
                    <b>
                      Analyse stratégique des mouvements et enjeux sur
                      l’intégralité de la chaine de valeur des
                      télécommunications mobiles, du composant au terminal
                      utilisateur et ses différents acteurs jusqu’à l’évolution
                      des technologies réseaux, usages associés et impacts.
                    </b>
                    <li>
                      <h1>
                        Évolutions des différentes technologies d’accès radio
                      </h1>
                      <b> terrestre</b> et <b>spatiales</b> (4G/5G/LPWA ...)
                    </li>
                    <li>
                      <h1>Problématique de déploiement des réseaux mobiles</h1>
                    </li>
                    <li>
                      <h1>Transformation des opérateurs</h1>
                    </li>
                    <li>
                      <h1>
                        Évolution de l’industrie des télécommunications
                        spatiales
                      </h1>
                    </li>
                    <li>
                      <h1>Impact environnemental des réseaux</h1>
                    </li>
                    <li>
                      <h1>
                        Évolution de l’industrie des semiconducteurs et
                        composants électroniques
                      </h1>
                    </li>
                  </li>
                </ul>
              </div>
            </article>
          </div>
          <div className="formations">
            <article>
              <div className="sub-section-title">2022 (Février - Juillet)</div>
              <div className="sub-section-content">
                <b>Wild Code School : Développeur Web et Web Mobile </b>
                (Formation intensive de 5 mois, titre RNCP niveau 5)
              </div>
            </article>
            <article>
              <div className="sub-section-title">2002/2006</div>
              <div className="sub-section-content">
                <b>EDHEC Business School</b>, Master in Management, Majeure
                <b>Marketing Management</b> (en anglais)
              </div>
            </article>
            <article>
              <div className="sub-section-title">2000/2002</div>
              <div className="sub-section-content">
                <b>Lycée Grandchamps</b>, Classe Prépa HEC (Versailles)
              </div>
            </article>
          </div>
          <div className="Extra-professionel">
            <article>
              <div className="sub-section-title">2007-2021</div>
              <div className="sub-section-content">
                <b>Team La Cordée & StaRT</b> (course à pied) : pratique de
                <b> l’ultra-endurance</b> ({">"}100km) en montagne en
                compétition à travers le monde en solo / non-stop sur des
                profils à fort dénivelés (GRR, UTMB, TDG ...)
              </div>
              <div className="sub-section-content">
                <b>FreeXXL9</b> (août 2015)
                <b> : traversée intégrale non-stop</b>
                en relais/équipe du GR9 de St Amour (Jura) jusqu’à Marseille
                (bouches du Rhône) : 911 km / 51000m D+ en 7 jours et 14h
              </div>
            </article>
            <article>
              <div className="sub-section-title">Centres d’intérêt : </div>
              <div className="sub-section-content">
                <b>Photographie :</b> maîtrise des différentes techniques de la
                prise de vue jusqu’au développement numérique (
                <b>
                  composition, filé, pose lente, HDR, light painting, focus
                  stacking, traitement de la lumière
                </b>
                , apprentissage des techniques liées au <b>panorama</b> (visites
                à 360°, Gigapixel...).
              </div>
            </article>
            <article>
              <div className="sub-section-title">Voyages : </div>
              <div className="sub-section-content">
                En voiture, à pied : Réunion, Australie, New Zealand, USA,
                Népal, Pérou, Allemagne, Hong Kong, Israël ...
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CvSections;
