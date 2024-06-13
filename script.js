document.addEventListener("DOMContentLoaded", function () {

    //Initializes the buttons and makes them dependent on their respective elements.
    const toggleNormalButton = document.getElementById('toggle-normal-fissures');
    const normalFissuresSection = document.getElementById('normal-fissures');

    const toggleVoidStormButton = document.getElementById('toggle-voidstorm-fissures');
    const voidStormFissuresSection = document.getElementById('voidstorm-fissures');

    // const toggleLegendButton = document.getElementById('toggle-legend-menu');
    // const legendSection = document.getElementById('legend-menu');

    // toggleNormalButton.classList.add('buttonStyle');
    // toggleVoidStormButton.classList.add('buttonStyle');

    // document.addEventListener('mousemove', function(e) {
    //     const amountMovedX = (e.clientX / window.innerWidth) * 2 - 1; // Range from -1 to 1
    //     const amountMovedY = (e.clientY / window.innerHeight) * 2 - 1; // Range from -1 to 1
    //     const zoomFactor = 1.05; // Adjust zoom factor as needed
    //     const backgroundSize = 100 * zoomFactor + '%'; // Increase background size for zoom effect

    //     document.body.style.backgroundPosition = `${50 - amountMovedX * 10}% ${50 - amountMovedY * 10}%`;
    //     document.body.style.backgroundSize = backgroundSize;
    // });

    //Loading icon
    const loadingSpinner = document.getElementById('loading-spinner');

    //Credits
    const creditsName = document.getElementById('credits-title');
    creditsName.classList.add('rainbow-text');

    //Legend
    const legendTierSectionLith = document.getElementById('tierListLith');
    const legendTierSectionMeso = document.getElementById('tierListMeso');
    const legendTierSectionNeo = document.getElementById('tierListNeo');
    const legendTierSectionAxi = document.getElementById('tierListAxi');
    const legendTierSectionRequiem = document.getElementById('tierListRequiem');
    const legendTierSectionOmnia = document.getElementById('tierListOmnia');

    legendTierSectionLith.classList.add('tier-lith');
    legendTierSectionMeso.classList.add('tier-meso');
    legendTierSectionNeo.classList.add('tier-neo');
    legendTierSectionAxi.classList.add('tier-axi');
    legendTierSectionRequiem.classList.add('tier-requiem');
    legendTierSectionOmnia.classList.add('tier-omnia');
    // legendTierSectionOmnia.classList.add('rainbow-text');

    const legendFactionSectionGrineer = document.getElementById('factionGrineer');
    const legendFactionSectionCorpus = document.getElementById('factionCorpus');
    const legendFactionSectionInfested = document.getElementById('factionInfested');
    const legendFactionSectionOrokin = document.getElementById('factionOrokin');
    const legendFactionSectionMurmur = document.getElementById('factionMurmur');

    legendFactionSectionGrineer.classList.add('red-text');
    legendFactionSectionCorpus.classList.add('blue-text');
    legendFactionSectionInfested.classList.add('green-text');
    legendFactionSectionOrokin.classList.add('yellow-text');
    // legendFactionSectionMurmur.classList.add('rainbow-text');

    //Function for toggling the legend
    // toggleLegendButton.addEventListener('click', function () {
    //     if (legendSection.classList.contains('hidden')) {
    //         legendSection.classList.remove('hidden');
    //         toggleLegendButton.textContent = 'Hide Legend';
    //     } else {
    //         legendSection.classList.add('hidden');
    //         legendButton.textContent = 'Show Legend';
    //     }
    // });

    //Function for toggling normal fissures
    toggleNormalButton.addEventListener('click', function () {
        if (normalFissuresSection.classList.contains('hidden')) {
            normalFissuresSection.classList.remove('hidden');
            toggleNormalButton.textContent = 'Hide Normal Fissures';
        } else {
            normalFissuresSection.classList.add('hidden');
            toggleNormalButton.textContent = 'Show Normal Fissures';
        }
    });

    //Function for toggling void storm fissures
    toggleVoidStormButton.addEventListener('click', function () {
        if (voidStormFissuresSection.classList.contains('hidden')) {
            voidStormFissuresSection.classList.remove('hidden');
            toggleVoidStormButton.textContent = 'Hide Void Storm Fissures';
        } else {
            voidStormFissuresSection.classList.add('hidden');
            toggleVoidStormButton.textContent = 'Show Void Storm Fissures';
        }
    }); 

    loadingSpinner.classList.remove('hidden'); // Remove icon when everything is loaded.

    fetch('https://api.warframestat.us/pc/fissures')
        .then(response => response.json())
        .then(fissures => {
            const tierOrder = ['lith', 'meso', 'neo', 'axi', 'requiem', 'omnia']; //In-game, fissures have different tiers in this order

            // Separate normal, void storm, and Steel Path fissures
            const normalFissures = fissures.filter(fissure => !fissure.isHard && !fissure.isStorm);
            const voidStormFissures = fissures.filter(fissure => fissure.isStorm);
            const steelPathFissures = fissures.filter(fissure => fissure.isHard);

            // Sort normal fissures by the custom tier order and then by expiry
            normalFissures.sort((a, b) => {
                const tierA = tierOrder.indexOf(a.tier.toLowerCase());
                const tierB = tierOrder.indexOf(b.tier.toLowerCase());
                if (tierA !== tierB) {
                    return tierA - tierB;
                }
                return new Date(a.expiry) - new Date(b.expiry);
            });

            // Sort void storm fissures by the custom tier order and then by expiry
            voidStormFissures.sort((a, b) => {
                const tierA = tierOrder.indexOf(a.tier.toLowerCase());
                const tierB = tierOrder.indexOf(b.tier.toLowerCase());
                if (tierA !== tierB) {
                    return tierA - tierB;
                }
                return new Date(a.expiry) - new Date(b.expiry);
            });

            // Sort Steel Path fissures by the custom tier order and then by expiry
            steelPathFissures.sort((a, b) => {
                const tierA = tierOrder.indexOf(a.tier.toLowerCase());
                const tierB = tierOrder.indexOf(b.tier.toLowerCase());
                if (tierA !== tierB) {
                    return tierA - tierB;
                }
                return new Date(a.expiry) - new Date(b.expiry);
            });

            loadingSpinner.classList.add('hidden');

            // Display normal fissures
            const normalFissuresContainer = document.getElementById('normal-fissures');
            normalFissures.forEach(fissure => {
                const fissureElement = createFissureElement(fissure);
                normalFissuresContainer.appendChild(fissureElement);
                updateFissureTimeRemaining(fissureElement, fissure.expiry);
            });

            //Display void storm fissures
            const voidStormFissuresContainer = document.getElementById('voidstorm-fissures');
            voidStormFissures.forEach(fissure => {
                const fissureElement = createFissureElement(fissure);
                voidStormFissuresContainer.appendChild(fissureElement);
                updateFissureTimeRemaining(fissureElement, fissure.expiry);
            });

            // Display Steel Path fissures
            const steelPathFissuresContainer = document.getElementById('steelpath-fissures');
            steelPathFissures.forEach(fissure => {
                const fissureElement = createFissureElement(fissure);
                steelPathFissuresContainer.appendChild(fissureElement);
                updateFissureTimeRemaining(fissureElement, fissure.expiry);
            });

            // Function to create fissure element
            function createFissureElement(fissure) {
                const fissureElement = document.createElement('div');
                fissureElement.classList.add(`tier-${fissure.tier.toLowerCase()}`);
                if (fissure.tier.toLowerCase() === 'omnia') {
                    fissureElement.classList.add('rainbow-text');
                }
                if (fissure.enemy.toLowerCase() === 'grineer') {
                    fissureElement.classList.add('red-text');
                }
                if (fissure.enemy.toLowerCase() === 'corpus') {
                    fissureElement.classList.add('blue-text');
                }
                if (fissure.enemy.toLowerCase() === 'infested') {
                    fissureElement.classList.add('green-text');
                }
                if (fissure.enemy.toLowerCase() === 'orokin') {
                    fissureElement.classList.add('yellow-text');
                }
                if (fissure.missionType === 'Corruption') {
                    fissure.missionType = 'Void Flood';
                }
                if (fissure.missionType === 'Void_cascade') {
                    fissure.missionType = 'Void Cascade';
                }

                fissureElement.innerHTML = `
                    <p class="enemy-${fissure.enemy.toLowerCase()}">
                        Mission: ${fissure.missionType} \xa0|\xa0
                        Location: ${fissure.node} \xa0|\xa0
                        Tier: ${fissure.tier} \xa0|\xa0
                        Enemy: ${fissure.enemy} \xa0|\xa0
                        Expiry: <span class="expiry"></span>
                    </p>`;
                return fissureElement;
            }

            // Function to update fissure time remaining
            function updateFissureTimeRemaining(fissureElement, expiryTime) {
                const expiryElement = fissureElement.querySelector('.expiry');
                function update() {
                    const now = new Date();
                    const remainingSeconds = Math.floor((new Date(expiryTime) - now) / 1000);
                    if (remainingSeconds <= 0) {
                        expiryElement.textContent = 'Expired';
                    } else {
                        const hours = Math.floor(remainingSeconds / 3600);
                        const minutes = Math.floor((remainingSeconds % 3600) / 60);
                        const seconds = remainingSeconds % 60;
                        expiryElement.textContent = `${hours}h ${minutes}m ${seconds}s`;
                    }
                }
                update(); // Initial update
                setInterval(update, 1000); // Update every second
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    // Set the interval for the page refresh (e.g., every 5 minutes = 300000 milliseconds)
    const refreshInterval = 600000; // 10 minutes in milliseconds
    let timeLeft = refreshInterval / 1000; // Convert to seconds
    const timerElement = document.getElementById('timer');

    // Update the countdown timer every second
    const countdown = setInterval(function () {
        if (timeLeft <= 0) {
            clearInterval(countdown);
        } else {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60)
            const seconds = timeLeft % 60;
            timerElement.textContent = `${minutes} minute${minutes !== 1 ? 's' : ''} ${seconds} second${seconds !== 1 ? 's' : ''}`;
        }
    }, 1000);

    // Refresh the page after the specified interval
    setTimeout(function () {
        window.location.reload();
    }, refreshInterval);

});


















