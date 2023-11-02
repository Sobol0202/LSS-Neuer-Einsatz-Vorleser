// ==UserScript==
// @name         LSS Neuer Einsatz vorleser
// @namespace    www.leitstellenspiel.de
// @version      1.0
// @description  Liest neue Missionen vor.
// @author       MissSobol
// @match        https://www.leitstellenspiel.de/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let lastMissionId = null;

    // Funktion zum Vorlesen des Textes
    function speakText(text) {
        const speechSynthesis = window.speechSynthesis;
        const speechUtterance = new SpeechSynthesisUtterance(`Neuer Einsatz: ${text}`);
        speechSynthesis.speak(speechUtterance);
    }

    // Erstellen eines Mutation Observers
    const missionList = document.getElementById('mission_list');
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            const newNodes = mutation.addedNodes;
            for (const newNode of newNodes) {
                if (newNode.nodeType === Node.ELEMENT_NODE && newNode.getAttribute('search_attribute')) {
                    const missionId = newNode.getAttribute('mission_id');
                    if (missionId !== lastMissionId) {
                        const searchAttribute = newNode.getAttribute('search_attribute');
                        if (searchAttribute) {
                            speakText(searchAttribute);
                            lastMissionId = missionId;
                        }
                    }
                }
            }
        });
    });

    // Konfiguration des Observers und Starten der Überwachung
    const config = { childList: true, subtree: true };
    observer.observe(missionList, config);
})();
