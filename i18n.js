(function() {
  'use strict';

  var translations = {
    en: {
      'nav.features': 'Features',
      'nav.product': 'Product',
      'nav.roles': 'Roles',
      'nav.security': 'Security',
      'nav.cta': 'Request early access',
      'hero.badge': 'Coming Soon',
      'hero.title': 'Ground Handling operations,<br><span class="text-gradient">finally in one place.</span>',
      'hero.subtitle': 'MAYFLY centralizes operational data into a single source of truth for airport operations, helping teams stay aligned in real time.',
      'hero.cta': 'Request early access',
      'hero.see_more': 'See what it does →',
      'pos.label': 'What is a transit?',
      'pos.intro': 'The time an aircraft spends on the ground, from arrival to departure. That’s the unit Mayfly is built around.',
      'pos.p1': 'Every role sees the same data, at the same moment, on any device.',
      'pos.p2': 'Ground dispatcher, passenger agent, ramp agent, supervisor: one shared picture.',
      'pos.p3': 'From touchdown to pushback, everything orchestrated in one place.',
      'feat.during': 'During the turnaround',
      'f01.num': '01 / Real-time flight view',
      'f01.title': 'See every flight, in the state it’s really in',
      'f01.desc': 'Flights are organised by what they need right now: inbound, on the ground, or departed. Each one shows its flight number, airline, aircraft, route, scheduled and estimated times, and stand. Status moves on its own as the turnaround progresses.',
      'f01.b1': 'Opens straight onto active flights, falling back to arrivals when the apron is quiet',
      'f01.b2': 'Refreshes continuously with a live connection indicator you can trust',
      'f02.num': '02 / Operational milestones (A-CDM)',
      'f02.title': 'One timestamp updates everyone',
      'f02.desc': 'Agents log the key moments of the turnaround: landing, block on, unloading, cleaning, boarding, doors, loading, block off, take-off. Correct a mistaken entry in a tap. The rest follows on its own.',
      'f02.b1': 'Estimated departure recomputed from the real block-on and each airline’s minimum ground time',
      'f02.b2': 'Flight advances state automatically and pushes the change to everyone on the team',
      'f03.num': '03 / Team coordination',
      'f03.title': 'A crew on every flight, no phone tag',
      'f03.desc': 'Supervisors assign a ground dispatcher, a passenger agent, a ramp agent and an operations agent to each transit. Agents only see the flights that are theirs; supervisors see the whole station.',
      'f03.b1': 'A dedicated message thread per flight, visible only to its crew and supervisors',
      'f03.b2': 'Flight notes to record a delay, a special operation or an airline instruction',
      'f04.num': '04 / Passenger operations',
      'f04.title': 'From check-in counts to the final figures',
      'f04.desc': 'The passenger agent enters booked, checked-in and bag counts, confirms the high-load estimate once check-in closes, and locks the final figures before departure.',
      'f04.b1': 'Track wheelchairs, unaccompanied minors, reduced mobility, animals and medical needs in one place',
      'f04.b2': 'Load recommendations re-run the moment a count changes, with a live boarding countdown',
      'f05.num': '05 / Load distribution',
      'f05.title': 'From recommendation to loaded, in three steps',
      'f05.desc': 'The system proposes a hold-by-hold distribution based on passenger and bag counts, following each airline’s own distribution rules. The ramp agent adjusts it, then confirms what was actually loaded.',
      'f05.v1': 'Recommended split per airline rules',
      'f05.v2': 'Real quantities at the counter',
      'f05.v3name': 'Loaded',
      'f05.v3': 'What actually went on board',
      'f06.num': '06 / Stand management',
      'f06.title': 'Right aircraft, right stand, right time',
      'f06.desc': 'A schedule view lays out every stand over time and flags conflicts before they bite. Assign by drag-and-drop, respect each stand’s constraints, or ask for an automatic layout that makes the most of the apron.',
      'f06.b1': 'Alerts for overlapping windows, wrong aircraft size, night restrictions',
      'f06.b2': 'Automatic stand suggestion to optimize apron usage across the day',
      'cap.header': 'Everything else the station runs on',
      'cap.c1.t': 'Ground service requests',
      'cap.c1.d': 'Raise fuelling, cleaning, de-icing, water or other requests from the flight, set a priority, and the operations team accepts or declines in real time.',
      'cap.c2.t': 'Team planning',
      'cap.c2.d': 'A lane per agent shows their flights across the day, colour-coded by role, so supervisors can read workload at a glance and rebalance before anyone is overloaded.',
      'cap.c3.t': 'Airport map',
      'cap.c3.d': 'See the airport layout with stands and live aircraft positions. Taxiways fade out as you zoom to keep the picture readable on a tablet in the field.',
      'cap.c4.t': 'IATA delay codes',
      'cap.c4.d': 'The full IATA delay-code reference, with operational descriptions and each airline’s preferred set, on hand from any screen without leaving what you’re doing.',
      'cap.c5.t': 'Multi-station',
      'cap.c5.d': 'Each airport is an isolated station with its own data, users and configuration. One platform runs many stations at once; platform admins see across all of them.',
      'roles.label': 'Access by role',
      'roles.title': 'Everyone sees what they need, nothing more',
      'roles.desc': 'Roles scope what each person can see and do. Station admins manage users, airlines and airport configuration; platform admins oversee every station.',
      'roles.r1': 'Turnaround coordination, milestones, service requests, crew messaging',
      'roles.r2': 'Check-in figures, boarding, SSR tracking, load estimates',
      'roles.r3': 'Hold loading, baggage distribution, loadsheet confirmation',
      'roles.r4': 'Ground service requests, equipment coordination',
      'roles.r5': 'Full station visibility, team assignments, workload management',
      'roles.r6': 'User management, airline configuration, airport setup, billing',
      'sec.title': 'Built for<br><span class="text-gradient">controlled operations</span>',
      'sec.s1.t': 'Isolated stations',
      'sec.s1.d': 'Data, users and configuration are separated per airport. A field team never sees another station’s operation.',
      'sec.s2.t': 'Scoped access',
      'sec.s2.d': 'Every role only reaches the flights and actions it owns. Admins grant and revoke access as crews change.',
      'sec.s3.t': 'One live source of truth',
      'sec.s3.d': 'Every change propagates to the whole crew at once, so no two people are ever acting on different numbers.',
      'cta.text': 'Interested in Mayfly for your station?'
    },
    fr: {
      'nav.features': 'Fonctionnalités',
      'nav.product': 'Produit',
      'nav.roles': 'Rôles',
      'nav.security': 'Sécurité',
      'nav.cta': 'Demander un accès',
      'hero.badge': 'Bientôt disponible',
      'hero.title': 'Les opérations d’assistance en escale,<br><span class="text-gradient">enfin centralisées.</span>',
      'hero.subtitle': 'MAYFLY centralise les données opérationnelles en une source unique pour les opérations aéroportuaires, permettant aux équipes de rester alignées en temps réel.',
      'hero.cta': 'Demander un accès',
      'hero.see_more': 'Découvrir les fonctionnalités →',
      'pos.label': 'Qu’est-ce qu’un transit ?',
      'pos.intro': 'Le temps qu’un avion passe au sol, de l’arrivée au départ. C’est l’unité autour de laquelle Mayfly est construit.',
      'pos.p1': 'Chaque rôle voit les mêmes données, au même moment, sur n’importe quel terminal.',
      'pos.p2': 'Dispatcher, agent pax, agent ramp, superviseur : une vision partagée.',
      'pos.p3': 'Du posé au départ, tout est orchestré au même endroit.',
      'feat.during': 'Pendant le transit',
      'f01.num': '01 / Vue des vols en temps réel',
      'f01.title': 'Chaque vol, dans l’état où il se trouve vraiment',
      'f01.desc': 'Les vols sont organisés par besoin immédiat : en approche, au sol ou partis. Chacun affiche son numéro, sa compagnie, son appareil, sa route, ses heures prévues et estimées, et son poste. Le statut évolue automatiquement.',
      'f01.b1': 'Affiche d’emblée les vols actifs, avec repli sur les arrivées quand le tarmac est calme',
      'f01.b2': 'Rafraîchissement continu avec un indicateur de connexion temps réel',
      'f02.num': '02 / Jalons opérationnels (A-CDM)',
      'f02.title': 'Un horodatage met tout le monde à jour',
      'f02.desc': 'Les agents saisissent les moments clés du transit : atterrissage, bloc on, déchargement, nettoyage, embarquement, portes, chargement, bloc off, décollage. Une correction se fait en un geste.',
      'f02.b1': 'Heure de départ estimée recalculée à partir du bloc on réel et du temps de transit minimum de la compagnie',
      'f02.b2': 'Le vol passe automatiquement à l’état suivant et propage le changement à toute l’équipe',
      'f03.num': '03 / Coordination d’équipe',
      'f03.title': 'Une équipe sur chaque vol, sans téléphone',
      'f03.desc': 'Le superviseur affecte un dispatcher, un agent pax, un agent ramp et un agent opérations à chaque transit. Chaque agent ne voit que ses vols ; le superviseur voit toute la station.',
      'f03.b1': 'Un fil de messages dédié par vol, visible uniquement par l’équipe affectée et les superviseurs',
      'f03.b2': 'Notes de vol pour documenter un retard, une opération spéciale ou une instruction compagnie',
      'f04.num': '04 / Opérations passagers',
      'f04.title': 'Du check-in aux chiffres définitifs',
      'f04.desc': 'L’agent pax saisit les données passagers et bagages, valide l’estimation haute charge après la fermeture de l’enregistrement, et confirme les chiffres définitifs avant le départ.',
      'f04.b1': 'Suivi des fauteuils roulants, mineurs non accompagnés, mobilité réduite, animaux et besoins médicaux',
      'f04.b2': 'Les recommandations de chargement sont recalculées dès qu’un chiffre change, avec compte à rebours embarquement',
      'f05.num': '05 / Répartition de chargement',
      'f05.title': 'De la recommandation au chargé, en trois étapes',
      'f05.desc': 'Le système propose une répartition soute par soute selon les données passagers et bagages, en respectant les règles de répartition de chaque compagnie. L’agent ramp ajuste puis confirme le chargement réel.',
      'f05.v1': 'Répartition recommandée selon les règles compagnie',
      'f05.v2': 'Quantités réelles au comptoir',
      'f05.v3name': 'Chargé',
      'f05.v3': 'Ce qui est effectivement monté à bord',
      'f06.num': '06 / Gestion du stationnement',
      'f06.title': 'Le bon avion, le bon poste, au bon moment',
      'f06.desc': 'Une vue planning affiche chaque poste dans le temps et signale les conflits avant qu’ils ne posent problème. Affectation par glisser-déposer, respect des contraintes de poste, ou suggestion automatique pour optimiser le tarmac.',
      'f06.b1': 'Alertes en cas de chevauchement, de taille d’appareil incompatible ou de restriction de nuit',
      'f06.b2': 'Suggestion automatique d’affectation pour optimiser l’utilisation des postes',
      'cap.header': 'Tout le reste de la station, en un coup d’œil',
      'cap.c1.t': 'Demandes de services au sol',
      'cap.c1.d': 'Créez des demandes d’avitaillement, nettoyage, dégivrage, eau ou autre depuis le vol, avec un niveau de priorité. L’équipe opérations accepte ou refuse en temps réel.',
      'cap.c2.t': 'Planning équipe',
      'cap.c2.d': 'Une ligne par agent montre ses vols sur la journée, codée par couleur selon le rôle, pour que les superviseurs lisent la charge de travail en un coup d’œil.',
      'cap.c3.t': 'Carte aéroportuaire',
      'cap.c3.d': 'Visualisez le plan de l’aéroport avec les postes et les avions positionnés en temps réel. Les taxiways s’estompent au zoom pour garder la lisibilité sur tablette.',
      'cap.c4.t': 'Codes retard IATA',
      'cap.c4.d': 'Le référentiel complet des codes retard IATA, avec descriptions opérationnelles et la sélection préférée de chaque compagnie, accessible depuis n’importe quel écran.',
      'cap.c5.t': 'Multi-station',
      'cap.c5.d': 'Chaque aéroport est une station isolée avec ses propres données, utilisateurs et configuration. Une plateforme peut opérer plusieurs stations simultanément.',
      'roles.label': 'Accès par rôle',
      'roles.title': 'Chacun voit ce dont il a besoin, rien de plus',
      'roles.desc': 'Les rôles définissent ce que chaque personne peut voir et faire. Les admins station gèrent les utilisateurs, compagnies et configuration ; les admins plateforme supervisent toutes les stations.',
      'roles.r1': 'Jalons, services, notes & messages sur les vols assignés',
      'roles.r2': 'Données passagers & bagages, SSR, embarquement sur les vols assignés',
      'roles.r3': 'Chargement soute, check-in & rapport sur les vols assignés',
      'roles.r4': 'Demandes de service & affectations sur les vols assignés',
      'roles.r5': 'Tous les vols de la station, plus le pilotage équipe',
      'roles.r6': 'Utilisateurs, configuration compagnie & aéroport, multi-station et facturation',
      'sec.title': 'Conçu pour des<br><span class="text-gradient">opérations contrôlées</span>',
      'sec.s1.t': 'Stations isolées',
      'sec.s1.d': 'Données, utilisateurs et configuration sont séparés par aéroport. Une équipe terrain ne voit jamais les opérations d’une autre station.',
      'sec.s2.t': 'Accès cloisonné',
      'sec.s2.d': 'Chaque rôle n’accède qu’aux vols et actions qui lui sont propres. Les admins accordent et révoquent les accès au fil des équipes.',
      'sec.s3.t': 'Une source de vérité unique',
      'sec.s3.d': 'Chaque modification est propagée à toute l’équipe en temps réel, pour que personne ne travaille sur des chiffres différents.',
      'cta.text': 'Intéressé par Mayfly pour votre station ?'
    }
  };

  var currentLang = 'en';

  function applyLang(lang) {
    currentLang = lang;
    var dict = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
      var key = el.getAttribute('data-i18n');
      if (dict[key]) {
        if (el.hasAttribute('data-i18n-html')) {
          el.innerHTML = dict[key];
        } else {
          el.textContent = dict[key];
        }
      }
    });
    document.documentElement.lang = lang;
    // Update lang buttons
    document.querySelectorAll('.nav__lang-btn').forEach(function(btn) {
      btn.classList.toggle('nav__lang-btn--active', btn.getAttribute('data-lang') === lang);
    });
  }

  // Language buttons
  document.querySelectorAll('.nav__lang-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      applyLang(btn.getAttribute('data-lang'));
    });
  });

  window.mayfly_i18n = { applyLang: applyLang, getLang: function() { return currentLang; } };
})();
