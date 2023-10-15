let clickingAreaNode = document.querySelector('.js-clicking-area-container');
let skillsContainerNode = document.querySelector('.js-skills-container');
let employeeContainerNode = document.querySelector('.js-employee-container');
let timerAreaNode = document.querySelector('.js-timer-area');
let goldAreaNode = document.querySelector('.js-gold-area');

const CHANGE_TYPE = {
    SKILL: "SKILL",
    EMPLOYEE: "EMPLOYEE",
    TIME: "TIME",
    ALL: "ALL",
    GOLD: "GOLD",
}

//állapottér 
let {

    seconds,
    gold,
    goldPerClick,
    goldPerSec,
    skillList,
    employeeList,
    startTimestamp,
    skillChanged,
    employeeChanged,


} = getInitialState();

function getInitialState() {
    let intervalId = setInterval(administrateTime, 200);
    return {
        intervalId,
        startTimestamp: new Date().getTime(),
        seconds: 0,
        gold: 0,
        goldPerClick: 1,
        goldPerSec: 0,
        skillList: [
            {
                skillName: "Aranykutatás",
                goldPerClickIncrement: 1,
                description: "Ahol a víz áramlását akadályok megváltoztatják, aranyat találhatunk.",
                amount: 0,
                price: 10,
                link: "./assets/prospecting.png",
            },
            {
                skillName: "Bagolyidomítás",
                goldPerClickIncrement: 10,
                description: "Baglyok betanítását készpénzre válthatjuk. Magasabb szinten postabaglyokat is nevelhetünk.",
                amount: 0,
                price: 200,
                link: "./assets/owl.png",
            },
            {
                skillName: "Gyógyfőzetkészítés",
                goldPerClickIncrement: 25,
                description: `Minél jobban kitanuljuk a gyógyfőzetek készítésének tudományát, 
                             annál több gyógyfőzetet tudunk értékesíteni aranyért cserébe.`,
                amount: 0,
                price: 750,
                link: "./assets/potion.png",
            },
            {
                skillName: "Kereskedelem",
                goldPerClickIncrement: 100,
                description: "Varázstárgyak készítésével és értékesítésével profitot zsebelhetünk be.",
                amount: 0,
                price: 4000,
                link: "./assets/barter.png",
            },
            {
                skillName: "Alkímia",
                goldPerClickIncrement: 300,
                description: "Az aranykészítés tudománya titkos recept alapján.",
                amount: 0,
                price: 15000,
                link: "./assets/alchemy.png",
            },
            {
                skillName: "Varázstudomány",
                goldPerClickIncrement: 1000,
                description: "Az alkímia hatását tovább erősíti és oktatási tevékenységet is végezhetünk.",
                amount: 0,
                price: 100000,
                link: "./assets/wizardry.png",
            }
        ],
        employeeList: [
            {
                employeeName: "Aranykutató",
                goldPerSecIncrement: 1,
                description: "Aranyat keres és talál.",
                amount: 0,
                price: 100,
                link: "./assets/prospector.png",
            },
            {
                employeeName: "Bagolyidomár",
                goldPerSecIncrement: 5,
                description: "Szerződéses munkatársként baglyokat tanít.",
                amount: 0,
                price: 1000,
                link: "./assets/owl_trainer.png",
            },
            {
                employeeName: "Győgyfőzet készítő",
                goldPerSecIncrement: 10,
                description: "Gyógyfőzeteket készít és értékesít a piacon.",
                amount: 0,
                price: 3000,
                link: "./assets/potion_mixer.png",
            },
            {
                employeeName: "Kereskedő",
                goldPerSecIncrement: 25,
                description: "Varázstárgyakat készít és értékesít.",
                amount: 0,
                price: 10000,
                link: "./assets/merchant.png",
            },
            {
                employeeName: "Varázsló Professzor",
                goldPerSecIncrement: 100,
                description: "Tanulókat képez ki szerződéses munkatársként. Szabadidejében alkímiával foglalkozik.",
                amount: 0,
                price: 50000,
                link: "./assets/alchemist.png",
            },
            {
                employeeName: "Befektető Kacsa",
                goldPerSecIncrement: 250,
                description: "Dagobert bácsihoz hasonló szakértelemmel kezeli és fialtatja a vagyonodat.",
                amount: 0,
                price: 200000,
                link: "./assets/gold_duck.png",
            },
        ],
    };
};


function administrateTime() {
    let currentTimestamp = new Date().getTime();
    let elapsedTime = Math.floor((currentTimestamp - startTimestamp) / 1000);
    let rewardSecunds = elapsedTime - seconds;
    if (rewardSecunds > 0) {
        gold += goldPerSec * rewardSecunds;
        seconds = elapsedTime;
        render(CHANGE_TYPE.TIME);
    }
};

/* click event listeners */

function handleGoldClicked(event) {
    if (event.target.dataset.enable_click === "true") {
        gold += goldPerClick;
        render(CHANGE_TYPE.GOLD);

    };
};
/* ----------------------------------------------- */

/* felugró ablak ha kevés az arany*/
let message = document.querySelector(".message");

function showMessage() {
    message.innerHTML = "Nincs elég aranyad!";
    message.style.display = "inline-block";
    setTimeout(function () {
        message.style.display = "none";
    }, 3000);
}

/* ---------------------------------- */
function handleSkillsClicked(event) {

    let clickIndex = event.target.dataset.index;
    if (typeof clickIndex !== "undefined") {
        let clickedSkill = skillList[clickIndex];
        if (gold < clickedSkill.price) {
            showMessage();
            return;
        }
        gold -= clickedSkill.price;
        goldPerClick += clickedSkill.goldPerClickIncrement;
        clickedSkill.amount += 1;
        render(CHANGE_TYPE.SKILL, CHANGE_TYPE.GOLD);
    }
};

function handleEmployeeClicked(event) {
    let clickIndex = event.target.dataset.index;
    if (typeof clickIndex !== "undefined") {
        let clickedEmployee = employeeList[clickIndex];
        if (gold < clickedEmployee.price) {
            showMessage();
            return;
        }
        gold -= clickedEmployee.price;
        goldPerSec += clickedEmployee.goldPerSecIncrement;
        clickedEmployee.amount += 1;
        render(CHANGE_TYPE.EMPLOYEE, CHANGE_TYPE.GOLD);
    };
};







/* ----------------------- Templates ------------------- */
function formatPrice(price) {
    if (price < 1000) return price;
    let kValue = price / 1000;
    return `${kValue}K`;
};

function getTimerAreaTemplate() {
    return `
<p><strong>${seconds} másodperc</strong></p>

`};


function getGoldAreaTemplate() {
    return `
<p><strong>${gold} arany</strong></p>
<p>${goldPerClick} arany / klikk</p>
<p>${goldPerSec} arany / mp</p>
`};













function getSkill({ skillName, goldPerClickIncrement, description, amount, price, link }, index) {
    return `
<tr>
    <td class="upgrade-text-cell">
        <p><strong>${skillName} (${goldPerClickIncrement} arany / klikk)</strong></p>
        <p>${description}</p>
    </td>
    <td class="upgrade-stats-cell">
        <p>db: ${amount}</p>
        <p>ár: ${formatPrice(price)}</p>
    </td>
    <td class="upgrade-icon-cell">
        <img draggable="false" class="skill-image" src="${link}" alt="${skillName}" data-index = "${index}">
    </td>
</tr>
`
};

function getEmployee({ employeeName, goldPerSecIncrement, description, amount, price, link }, index) {
    return `
        <tr>
            <td class="upgrade-icon-cell">
                <img draggable="false" class="skill-image" src="${link}" alt="${employeeName}" data-index = "${index}"/>
            </td>
            <td class="upgrade-stats-cell">
                <p>db: ${amount}</p>
                <p>ár: ${formatPrice(price)}</p>
            </td>
            <td class="upgrade-text-cell">
                <p><strong>${employeeName} (${goldPerSecIncrement} arany / mp)</strong></p>
                <p>${description}</p>
            </td>
        </tr>    
    `
};




/* ------------------------------------------- */

function render(changeType = CHANGE_TYPE.ALL) {
    if (changeType === CHANGE_TYPE.ALL || changeType === CHANGE_TYPE.TIME) {
        timerAreaNode.innerHTML = getTimerAreaTemplate();
    }

    if (changeType === CHANGE_TYPE.ALL || changeType === CHANGE_TYPE.SKILL) {
        document.querySelector(".js-skills-tbody").innerHTML = skillList.map(getSkill).join("");
    }
    if (changeType === CHANGE_TYPE.ALL || changeType === CHANGE_TYPE.EMPLOYEE) {
        document.querySelector(".js-business-tbody").innerHTML = employeeList.map(getEmployee).join("");
    }
    goldAreaNode.innerHTML = getGoldAreaTemplate();
};

function initialize() {
    let data = getInitialState();
    seconds = data.seconds;
    gold = data.gold;
    goldPerClick = data.goldPerClick;
    goldPerSec = data.goldPerSec;

    clickingAreaNode.addEventListener('click', handleGoldClicked);
    skillsContainerNode.addEventListener('click', handleSkillsClicked);
    employeeContainerNode.addEventListener('click', handleEmployeeClicked);

    render();
};

initialize();