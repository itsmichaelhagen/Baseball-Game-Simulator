class Pitcher {
	constructor(name, throws, fb, fbctr, fbmvt, fbvr, fbvelo, fbtnd) {
		this.name = name;
		this.throws = throws;
		this.fb = fb;
		this.fbctr = fbctr;
		this.fbmvt = fbmvt;
		this.fbvr = fbvr;
		this.fbvelo = fbvelo;
		this.fbtnd = fbtnd;

	}
}

class Batter {
	constructor(name, bats, spray, battype, fbContact, fbEye, gapPower, power) {
		this.name = name;
		this.bats = bats;
		this.spray = spray;
		this.battype = battype;
		this.fbContact = fbContact;
		this.fbEye = fbEye;
		this.gapPower = gapPower;
		this.power = power;

	}
}

let currentpitcher = new Pitcher('Default Pitcher', 'Right','Fastball', 150, 150, 150, 92, 200);
let currentbatter = new Batter('Default Batter', 'Right', 'Pull', 'Contact',150, 150, 125, 125);


let lastpitch = "None";
let lastpitchType = "None";

//Strike/Ball Bubble Variables
	s1 = document.getElementById("strike-1");
	s2 = document.getElementById("strike-2");
	b1 = document.getElementById("ball-1");
	b2 = document.getElementById("ball-2");
	b3 = document.getElementById("ball-3");
	o1 = document.getElementById("out-1");
	o2 = document.getElementById("out-2");
	let strikes = 0;
	let balls = 0;
	let outs = 0;


// Game Modifiers
	strikeMod = 0.5201;
	strikeoutMod = 0.1701;
	gbPct = 0.4270;
	fbPct = 0.3570;
	ldPct = 0.2160;

	baMod = 0.2899;
	singlesMod = 0.6828;
	doublesMod = 0.1762;
	triplesMod = 0.0153;
	homerunMod = 0.1256;
	ldHit = .6675;
	gbHit = .2525;
	fbHit = .0800; 

	leftHZ = 0.1434;
	leftcenterHZ = 0.2849;
	centerHZ = 0.1434;
	rightcenterHZ = 0.2849;
	rightHZ = 0.1434;

	leftOZ = 0.2461;
	leftcenterOZ = 0.1300;
	centerOZ = 0.2460;
	rightcenterOZ = 0.1300;
	rightOZ = 0.2461;

	leftfoulZone = .3333;
	behindfoulZone = .3334;
	rightfoulZone = .3333;

	single = singlesMod;
	double = singlesMod+doublesMod;
	homerun = singlesMod+doublesMod+homerunMod;
	triple = 1-triplesMod;

	//Count Swing Modifiers
	firstpitchSwing = 0.2664;
	ohoneSwing = 0.4662;
	ohtwoSwing = 0.4991;
	oneohSwing = 0.4054;
	oneoneSwing = 0.5327;
	onetwoSwing = 0.5788;
	twoohSwing = 0.3909;
	twooneSwing = 0.5910;
	twotwoSwing = 0.6568;
	threeohSwing = 0.0642;
	threeoneSwing = 0.5472;
	fullCountSwing = 0.7384;

	//Count Foul% Modifiers
	firstpitchFoul = 0.3699;
	ohoneFoul = 0.3825;
	ohtwoFoul = 0.3865;
	oneohFoul = 0.3853;
	oneoneFoul = 0.3866;
	onetwoFoul = 0.3882;
	twoohFoul = 0.3953;
	twooneFoul = 0.3954;
	twotwoFoul = 0.3996;
	threeohFoul = 0.4095;
	threeoneFoul = 0.3968;
	fullCountFoul = 0.4058;

	//Count Ball in Play Modifiers
	firstpitchBIP = 0.3926;
	ohoneBIP = 0.4010;
	ohtwoBIP = 0.3675;
	oneohBIP = 0.4282;
	oneoneBIP = 0.4155;
	onetwoBIP = 0.3889;
	twoohBIP = 0.4504;
	twooneBIP = 0.4355;
	twotwoBIP = 0.4096;
	threeohBIP = 0.4669;
	threeoneBIP = 0.4699;
	fullCountBIP = 0.4461;

	//Count Whiff Modifiers
	firstpitchWhiff = 0.0521; // .9479
	ohoneWhiff = 0.1009; //
	ohtwoWhiff = 0.1228; //
	oneohWhiff = 0.0756; //
	oneoneWhiff = 0.1054; //
	onetwoWhiff = 0.1290; //
	twoohWhiff = 0.0603; //
	twooneWhiff = 0.0999; //
	twotwoWhiff = 0.1253; //
	threeohWhiff = 0.0079; //
	threeoneWhiff = 0.0729; //
	fullCountWhiff = 0.1093; //

	let currentSwing;
	let currentFoul;
	let currentBIP;
	let	currentWhiff;
	let currentContact;
	let pitchtype;
	let pull;
	let spraytype;
	let hittertype;
	let currentFrame;
	let inning;
	let currentinningRuns = 0;
	let awayScore = 0;
	let homeScore = 0;
	let awayHits = 0;
	let homeHits = 0;
	let awayErrors = 0;
	let homeErrors = 0;
	let onFirst = false;
	let onSecond = false;
	let onThird = false;
	let scoreHome = false;


	//((200*0.2664)-((150*0.10656)+(150*0.15984)))
	//53.28-(15.984+23.976)
	//53.28-39.96
	//13.32/1000

function rhPull() {
	x = Math.random();
	x = x-.500;
	x = x*4;
	x = x/100;

	leftHZ = leftHZ + .1050 + x;
	leftcenterHZ = leftcenterHZ + .0300 + x;
	centerHZ = centerHZ + .0850;
	rightcenterHZ = rightcenterHZ - .2000 - x;
	rightHZ = rightHZ - .0200 - x;

	leftOZ = leftOZ + .1050 + x;
	leftcenterOZ = leftcenterOZ + .0300 + x;
	centerOZ = centerOZ + .0450;
	rightcenterOZ = rightcenterOZ - .2000 - x;
	rightOZ = rightOZ + .0200 - x;

	leftfoulZone = .5199;
	behindfoulZone = .3601;
	rightfoulZone = .1200;

}

function lhPull() {
	x = Math.random();
	x = x-.500;
	x = x*4;
	x = x/100;

	rightHZ = rightHZ + .1050 + x;
	rightcenterHZ = rightcenterHZ + .0300 + x;
	centerHZ = centerHZ + .0850;
	leftcenterHZ = leftcenterHZ - .2000 - x;
	leftHZ = leftHZ - .0200 - x;

	rightOZ = rightOZ + .1050 + x;
	rightcenterOZ = rightcenterOZ + .0300 + x;
	centerOZ = centerOZ + .0450;
	leftcenterOZ = leftcenterOZ - .2000 - x;
	leftOZ = leftOZ + .0200 - x;
	
	leftfoulZone = .1200;
	behindfoulZone = .3601;
	rightfoulZone = .5199;
}

function rhSpray() {
	x = Math.random();
	x = Math.random();
	x = x-.500;
	x = x*10;
	x = x/100;

	foulX = x/2;

	leftHZ = leftHZ - .01 + x;
	leftcenterHZ = leftcenterHZ - .01 - x;
	centerHZ = centerHZ + .0400;
	rightcenterHZ = rightcenterHZ - .01 + x;
	rightHZ = rightHZ - .01 - x;

	leftOZ = leftOZ - .02 + x;
	leftcenterOZ = leftcenterOZ - .02 - x;
	centerOZ = centerOZ + .0800;
	rightcenterOZ = rightcenterOZ - .02 + x;
	rightOZ = rightOZ - .0200 - x;

	leftfoulZone = leftfoulZone - foulX;
	behindfoulZone = behindfoulZone + x;
	rightfoulZone = rightfoulZone - foulX;

}

function lhSpray() {
	x = Math.random();
	x = Math.random();
	x = x-.500;
	x = x*10;
	x = x/100;

	foulX = x/2;

	leftHZ = leftHZ - .01 - x;
	leftcenterHZ = leftcenterHZ - .01 + x;
	centerHZ = centerHZ + .0400;
	rightcenterHZ = rightcenterHZ - .01 - x;
	rightHZ = rightHZ - .01 + x;

	leftOZ = leftOZ - .02 - x;
	leftcenterOZ = leftcenterOZ - .02 + x;
	centerOZ = centerOZ + .0800;
	rightcenterOZ = rightcenterOZ - .02 - x;
	rightOZ = rightOZ - .0200 + x;

	leftfoulZone = leftfoulZone - foulX;
	behindfoulZone = behindfoulZone + x;
	rightfoulZone = rightfoulZone - foulX;
}

function determineSpray() {
	batter = currentbatter.bats;
	pull = null;

	if (batter == "Right") {
		pull = "Right";
		if (spray == "Pull") {
			rhPull();
			if (battype == "Contact") {
				console.log('contact');
			} else if (battype == "Line Drive") {
				console.log('line drive');
			} else if (battype == "Fly Ball" ) {
				console.log('fly ball')
			}
		} else if (spray == "Spray") {
			rhSpray();
			if (battype == "Contact") {
				console.log('contact');
			} else if (battype == "Line Drive") {
				console.log('line drive');
			} else if (battype == "Fly Ball" ) {
				console.log('fly ball')
			}
		}
	} else if (batter = "Left") {
		pull = "Left";
		if (spray == "Pull") {
			lhPull();
			if (battype == "Contact") {
				console.log('contact');
			} else if (battype == "Line Drive") {
				console.log('line drive');
			} else if (battype == "Fly Ball" ) {
				console.log('fly ball')
			}
		} else if (spray == "Spray") {
			lhSpray();
			if (battype == "Contact") {
				console.log('contact');
			} else if (battype == "Line Drive") {
				console.log('line drive');
			} else if (battype == "Fly Ball" ) {
				console.log('fly ball')
			}
		}
	}
}

function determineCount() {
	if (balls == 0 && strikes == 0) {
		currentSwing = firstpitchSwing;
		currentFoul = firstpitchFoul;
		currentBIP = firstpitchBIP;
		currentWhiff = firstpitchWhiff;
		currentContact = 1-currentWhiff;
	} else if (balls == 0 && strikes == 1) {
		currentSwing = ohoneSwing;
		currentFoul = ohoneFoul;
		currentBIP = ohoneBIP;
		currentWhiff = ohoneWhiff;
		currentContact = 1-currentWhiff;
	} else if (balls == 0 && strikes == 2) {
		currentSwing = ohtwoSwing;
		currentFoul = ohtwoFoul;
		currentBIP = ohtwoBIP;
		currentWhiff = ohtwoWhiff;
		currentContact = 1-currentWhiff;
	} else if (balls == 1 && strikes == 0) {
		currentSwing = oneohSwing;
		currentFoul = oneohFoul;
		currentBIP = oneohBIP;
		currentWhiff = oneohWhiff;
		currentContact = 1-currentWhiff;
	} else if (balls == 1 && strikes == 1) {
		currentSwing = oneoneSwing;
		currentFoul = oneoneFoul;
		currentBIP = oneoneBIP;
		currentWhiff = oneoneWhiff;
		currentContact = 1-currentWhiff;
	} else if (balls == 1 && strikes == 2) {
		currentSwing = onetwoSwing;
		currentFoul = onetwoFoul;
		currentBIP = onetwoBIP;
		currentWhiff = onetwoWhiff;
		currentContact = 1-currentWhiff;
	} else if (balls == 2 && strikes == 0) {
		currentSwing = twoohSwing;
		currentFoul = twoohFoul;
		currentBIP = twoohBIP;
		currentWhiff = twoohWhiff;
		currentContact = 1-currentWhiff;
	} else if (balls == 2 && strikes == 1) {
		currentSwing = twooneSwing;
		currentFoul = twooneFoul;
		currentBIP = twooneBIP;
		currentWhiff = twooneWhiff;
		currentContact = 1-currentWhiff;
	} else if (balls == 2 && strikes == 2) {
		currentSwing = twotwoSwing;
		currentFoul = twotwoFoul;
		currentBIP = twotwoBIP;
		currentWhiff = twotwoWhiff;
		currentContact = 1-currentWhiff;
	} else if (balls == 3 && strikes == 0) {
		currentSwing = threeohSwing;
		currentFoul = threeohFoul;
		currentBIP = threeohBIP;
		currentWhiff = threeohWhiff;
		currentContact = 1-currentWhiff;
	} else if (balls == 3 && strikes == 1) {
		currentSwing = threeoneSwing;
		currentFoul = threeoneFoul;
		currentBIP = threeoneBIP;
		currentWhiff = threeoneWhiff;
		currentContact = 1-currentWhiff;
	} else if (balls == 3 && strikes == 2) {
		currentSwing = fullCountSwing;
		currentFoul = fullCountFoul;
		currentBIP = fullCountBIP;
		currentWhiff = fullCountWhiff;
		currentContact = 1-currentWhiff;
	}	
}
	
function currentMods() {
	determineCount();

	baMod = 0.2899

	if (currentpitcher.throws == "Right" && currentbatter.bats == "Right") {
		baMod = baMod+0.001;
	} else if (currentpitcher.throws == "Left" && currentbatter.bats == "Right") {
		baMod = baMod+0.009;
	} else if (currentpitcher.throws == "Left" && currentbatter.bats == "Left") {
		baMod = baMod-0.009;
	} else if (currentpitcher.throws == "Right" && currentbatter.bats == "Left") {
		baMod = baMod-0.001;
	}

	//Pitch Tendencies
	fastballTendency = (currentpitcher.fbtnd/2)/100;
	fastballControl = ((((currentpitcher.fbctr*strikeMod)-((strikeMod)*(100)))/1000)+strikeMod);

	//Plate Discpline vs. Pitcher
	currentFBSwing = currentSwing + ((currentbatter.fbEye*currentSwing)-((currentpitcher.fbmvt*(currentSwing*.4))+((currentpitcher.fbvr*(currentSwing*.6)))))/500;

	//Contact vs. Pitcher
	fbCalc = (((currentbatter.fbContact*currentContact)-((currentpitcher.fbmvt*(currentContact*.25))+(currentpitcher.fbvr*(currentContact*.75))))/500);
	currentFoul = currentFoul + (fbCalc/2);
	currentBIP = currentBIP + (fbCalc/2);

	currentContact = 1-currentWhiff;

	currentFoul = currentFoul/currentContact;
	currentBIP = currentBIP/currentContact;

	if (strikes == 2) {
		currentFBSwing = (1-strikeoutMod)+(((currentbatter.fbEye*currentSwing)-((currentpitcher.fbmvt*(currentSwing*.4))+((currentpitcher.fbvr*(currentSwing*.6)))))/500);
	}

}

function resetCount() {
	strikes = 0;
	balls = 0;
	document.getElementById("strike-1").style.backgroundColor="#4f7e6f";
	document.getElementById("strike-2").style.backgroundColor="#4f7e6f";
	document.getElementById("ball-1").style.backgroundColor="#4f7e6f";
	document.getElementById("ball-2").style.backgroundColor="#4f7e6f";
	document.getElementById("ball-3").style.backgroundColor="#4f7e6f";
}

function measurePitch() {
	x = Math.random();
	document.getElementById('lastpitch').innerHTML = pitchtype;
	velocity = currentpitcher.fbvelo+(0.5-x);

	velocity = velocity.toFixed(1);
	document.getElementById('velocity').innerHTML = velocity + "mph";
}

function recordPitch() {
	if (pitchloc == "In Zone" && swing == "Yes" && contact == "Yes" && lastpitch == "Single") {
		document.getElementById("pbp-text").innerHTML = "<b>IT'S A SINGLE!</b>";
	} else if (pitchloc == "In Zone" && swing == "Yes" && contact == "Yes" && lastpitch == "Double") {
		document.getElementById("pbp-text").innerHTML = "<b>IT'S A DOUBLE!!</b>";		
	} else if (pitchloc == "In Zone" && swing == "Yes" && contact == "Yes" && lastpitch == "Triple") {
		document.getElementById("pbp-text").innerHTML = "<b>IT'S A TRIPLE!!!</b>";		
	} else if (pitchloc == "In Zone" && swing == "Yes" && contact == "Yes" && lastpitch == "Homerun") {
		document.getElementById("pbp-text").innerHTML = "<b>WOW HOMERUN!!!</b>";		
	} else if (pitchloc == "In Zone" && swing == "Yes" && contact == "No" && lastpitch == "Strike") {
		document.getElementById("pbp-text").innerHTML = "<b>SWING AND A MISS, STRIKE!</b>";		
	} else if (pitchloc == "In Zone" && swing == "No" && contact == "No" && lastpitch == "Strike") {
		document.getElementById("pbp-text").innerHTML = "<b>STRIKE, CAUGHT LOOKING!</b>";				
	} else if (pitchloc == "Out of Zone" && swing == "No" && contact == "No" && lastpitch == "Ball") {
		document.getElementById("pbp-text").innerHTML = "<b>BALL</b>";						
	} else if (pitchloc == "Out of Zone" && swing == "Yes" && contact == "No" && lastpitch == "Strike") {
		document.getElementById("pbp-text").innerHTML = "<b>HE REACHES OUT OF THE ZONE, STRIKE!</b>";						
	} else if (pitchloc == "Out of Zone" && swing == "Yes" && contact == "Yes" && lastpitch == "Double") {
		document.getElementById("pbp-text").innerHTML = "<b>IT'S A DOUBLE!!</b>";		
	} else if (pitchloc == "Out of Zone" && swing == "Yes" && contact == "Yes" && lastpitch == "Triple") {
		document.getElementById("pbp-text").innerHTML = "<b>IT'S A TRIPLE!!!</b>";		
	} else if (pitchloc == "Out of Zone" && swing == "Yes" && contact == "Yes" && lastpitch == "Homerun") {
		document.getElementById("pbp-text").innerHTML = "<b>WOW HOMERUN!!!</b>";		
	} else if (pitchloc == "Out of Zone" && swing == "Yes" && contact == "Yes" && lastpitch == "Single") {
		document.getElementById("pbp-text").innerHTML = "<b>IT'S A SINGLE!</b>";
	} else if (pitchloc == "In Zone" && swing == "Yes" && contact == "Yes" && lastpitch == "Out") {
		document.getElementById("pbp-text").innerHTML = "<b>HIT INTO PLAY - OUT!</b>";
	} else if (pitchloc == "Out of Zone" && swing == "Yes" && contact == "Yes" && lastpitch == "Out") {
		document.getElementById("pbp-text").innerHTML = "<b>HIT INTO PLAY - OUT!</b>";
	} else if (pitchloc == "In Zone" && swing == "Yes" && contact == "Yes" && lastpitch == "Foul") {
		document.getElementById("pbp-text").innerHTML = "<b>FOUL BALL!</b>";
	} else if (pitchloc == "Out of Zone" && swing == "Yes" && contact == "Yes" && lastpitch == "Foul") {
		document.getElementById("pbp-text").innerHTML = "<b>FOUL BALL!</b>";
	}
}

// Stats Variables
	let pa = 0;
	let ab = 0;
	let bb = 0;
	let hit = 0;
	let singleStat = 0;
	let doubleStat = 0;
	let tripleStat = 0;
	let homerunStat = 0;
	let so = 0;
	let ba = 0;
	let sopct = 0;
	let putout = 0;
	let pitches = 0;
	strikes = 0;
	balls = 0;
	let contact;


/*function calculateStats() {
	
	singleStat = singleStat;
	doubleStat = doubleStat;
	tripleStat = tripleStat;
	homerunStat = homerunStat;
	bb = bb;
	so = so;
	putout = putout;

	hit = singleStat+doubleStat+tripleStat+homerunStat;
	ab = hit+so+putout;
	pa = bb+ab;
	sopct = so/ab;
	sopct = sopct.toFixed(3);
	ba = hit/ab;
	ba = ba.toFixed(3);
}*/


let timeLeft = 15000;
let timeX = 0;
let intervalId;
let simInterval;
let throwpitchInterval;
let atbatPitches = 0;
let p = 1;
let batOver = 0;
var pitchInterval;
var pitchclockInterval;
var nextInterval;
let inningRuns = 0;
let justscored = 0;
let numberofRunners = 0;
let homePrimary = '#ffffff';
let homeSecondary = '#0C2340';
let homeNumbers = '#0C2340'
let awayPrimary = '#BD3039';
let awaySecondary = '#0C2340';
let awayNumbers = '#0C2340';
let homeP = 45;
let homeC = 28;
let homeFirst = 48;
let homeSecond = 25;
let homeThird = 95;
let homeSS = 11;
let homeLF = 24;
let homeCF = 99;
let homeRF = 22;
let awayP = 50;
let awayC = 12;
let awayFirst = 2;
let awaySecond = 23;
let awayThird = 11;
let awaySS = 70;
let awayLF = 16;
let awayCF = 43;
let awayRF = 52;
let gameID = 1;
let data = `Game Log for gameid: ${gameID}`;



function pitchTime() {
	p = Math.random()*5;

	p = p.toFixed(0);

	p = p*1000;

	p = p+5000;
}

function pitchclock() {
	timeLeft = 15;

	pitchclockInterval = setInterval(() => {
		document.getElementById("pitchclock-counter").innerHTML = timeLeft;
		if (timeLeft > 0 && lastpitch == "None") {
			timeLeft--;
		} else if (timeLeft > 0 && lastpitch !== "None") {
			lastpitch = "None";
			document.getElementById("pitchclock-counter").innerHTML = " ";
			clearInterval(pitchclockInterval);
		} else {
			document.getElementById("pitchclock-counter").innerHTML = " ";
			clearInterval(pitchclockInterval);
		}
	}, 1000);
}

function inningclock() {
	timeLeft = 15;

	pitchclockInterval = setInterval(() => {
		document.getElementById("pbp-text").innerHTML = `<b>MOVING ONTO THE NEXT INNING: ${timeLeft}</b>`;
		if (timeLeft > 0 && lastpitch == "None") {
			timeLeft--;
		} else if (timeLeft > 0 && lastpitch !== "None") {
			lastpitch = "None";
			clearInterval(pitchclockInterval);
		} else {
			clearInterval(pitchclockInterval);
		}
	}, 1000);
}

function seventhinningstretch() {
	timeLeft = 15;

	pitchclockInterval = setInterval(() => {
		document.getElementById("pbp-text").innerHTML = `<b>TIME FOR THE 7TH INNING STRETCH: ${timeLeft}</b>`;
		if (timeLeft > 0 && lastpitch == "None") {
			timeLeft--;
		} else if (timeLeft > 0 && lastpitch !== "None") {
			lastpitch = "None";
			clearInterval(pitchclockInterval);
		} else {
			clearInterval(pitchclockInterval);
		}
	}, 1000);
}


// Game Functions

// Instead of a While loop for the at-bat function, I used the setInterval() method so that it would simulate the pitcher throwing a pitch every 7 seconds.

function switchSides() {
	if (inning % 1 == 0) {
		document.getElementById("pitcher").style.backgroundColor=homePrimary;
		document.getElementById("pitcher").style.borderColor=homeSecondary;
		document.getElementById("pitcher").style.color=homeNumbers;
		document.getElementById("catcher").style.backgroundColor=homePrimary;
		document.getElementById("catcher").style.borderColor=homeSecondary;
		document.getElementById("catcher").style.color=homeNumbers;
		document.getElementById("first-baseman").style.backgroundColor=homePrimary;
		document.getElementById("first-baseman").style.borderColor=homeSecondary;
		document.getElementById("first-baseman").style.color=homeNumbers;
		document.getElementById("second-baseman").style.backgroundColor=homePrimary;
		document.getElementById("second-baseman").style.borderColor=homeSecondary;
		document.getElementById("second-baseman").style.color=homeNumbers;
		document.getElementById("third-baseman").style.backgroundColor=homePrimary;
		document.getElementById("third-baseman").style.borderColor=homeSecondary;
		document.getElementById("third-baseman").style.color=homeNumbers;
		document.getElementById("shortstop").style.backgroundColor=homePrimary;
		document.getElementById("shortstop").style.borderColor=homeSecondary;
		document.getElementById("shortstop").style.color=homeNumbers;
		document.getElementById("left-fielder").style.backgroundColor=homePrimary;
		document.getElementById("left-fielder").style.borderColor=homeSecondary;
		document.getElementById("left-fielder").style.color=homeNumbers;
		document.getElementById("center-fielder").style.backgroundColor=homePrimary;
		document.getElementById("center-fielder").style.borderColor=homeSecondary;
		document.getElementById("center-fielder").style.color=homeNumbers;
		document.getElementById("right-fielder").style.backgroundColor=homePrimary;
		document.getElementById("right-fielder").style.borderColor=homeSecondary;
		document.getElementById("right-fielder").style.color=homeNumbers;
		document.getElementById("batter").style.backgroundColor=awayPrimary;
		document.getElementById("batter").style.borderColor=awaySecondary;
		document.getElementById("batter").style.color=awayNumbers;
		document.getElementById("runner-one").style.backgroundColor=awayPrimary;
		document.getElementById("runner-one").style.borderColor=awaySecondary;
		document.getElementById("runner-one").style.color=awayNumbers;
		document.getElementById("runner-two").style.backgroundColor=awayPrimary;
		document.getElementById("runner-two").style.borderColor=awaySecondary;
		document.getElementById("runner-two").style.color=awayNumbers;
		document.getElementById("runner-three").style.backgroundColor=awayPrimary;
		document.getElementById("runner-three").style.borderColor=awaySecondary;
		document.getElementById("runner-three").style.color=awayNumbers;
		document.getElementById("pitcher-no").innerHTML=homeP;
		document.getElementById("catcher-no").innerHTML=homeC;
		document.getElementById("firstbase-no").innerHTML=homeFirst;
		document.getElementById("secondbase-no").innerHTML=homeSecond;
		document.getElementById("thirdbase-no").innerHTML=homeThird;
		document.getElementById("shortstop-no").innerHTML=homeSS;
		document.getElementById("leftfield-no").innerHTML=homeLF;
		document.getElementById("centerfield-no").innerHTML=homeCF;
		document.getElementById("rightfield-no").innerHTML=homeRF;
		runnerPrimary = awayPrimary;
		runnerSecondary = awaySecondary;
		runnerNumbers = awayNumbers;
	} else {
		document.getElementById("pitcher").style.backgroundColor=awayPrimary;
		document.getElementById("pitcher").style.borderColor=awaySecondary;
		document.getElementById("pitcher").style.color=awayNumbers;
		document.getElementById("catcher").style.backgroundColor=awayPrimary;
		document.getElementById("catcher").style.borderColor=awaySecondary;
		document.getElementById("catcher").style.color=awayNumbers;
		document.getElementById("first-baseman").style.backgroundColor=awayPrimary;
		document.getElementById("first-baseman").style.borderColor=awaySecondary;
		document.getElementById("first-baseman").style.color=awayNumbers;
		document.getElementById("second-baseman").style.backgroundColor=awayPrimary;
		document.getElementById("second-baseman").style.borderColor=awaySecondary;
		document.getElementById("second-baseman").style.color=awayNumbers;
		document.getElementById("third-baseman").style.backgroundColor=awayPrimary;
		document.getElementById("third-baseman").style.borderColor=awaySecondary;
		document.getElementById("third-baseman").style.color=awayNumbers;
		document.getElementById("shortstop").style.backgroundColor=awayPrimary;
		document.getElementById("shortstop").style.borderColor=awaySecondary;
		document.getElementById("shortstop").style.color=awayNumbers;
		document.getElementById("left-fielder").style.backgroundColor=awayPrimary;
		document.getElementById("left-fielder").style.borderColor=awaySecondary;
		document.getElementById("left-fielder").style.color=awayNumbers;
		document.getElementById("center-fielder").style.backgroundColor=awayPrimary;
		document.getElementById("center-fielder").style.borderColor=awaySecondary;
		document.getElementById("center-fielder").style.color=awayNumbers;
		document.getElementById("right-fielder").style.backgroundColor=awayPrimary;
		document.getElementById("right-fielder").style.borderColor=awaySecondary;
		document.getElementById("right-fielder").style.color=awayNumbers;
		document.getElementById("batter").style.backgroundColor=homePrimary;
		document.getElementById("batter").style.borderColor=homeSecondary;
		document.getElementById("batter").style.color=homeNumbers;
		document.getElementById("runner-one").style.backgroundColor=homePrimary;
		document.getElementById("runner-one").style.borderColor=homeSecondary;
		document.getElementById("runner-one").style.color=homeNumbers;
		document.getElementById("runner-two").style.backgroundColor=homePrimary;
		document.getElementById("runner-two").style.borderColor=homeSecondary;
		document.getElementById("runner-two").style.color=homeNumbers;
		document.getElementById("runner-three").style.backgroundColor=homePrimary;
		document.getElementById("runner-three").style.borderColor=homeSecondary;
		document.getElementById("runner-three").style.color=homeNumbers;
		document.getElementById("pitcher-no").innerHTML=awayP;
		document.getElementById("catcher-no").innerHTML=awayC;
		document.getElementById("firstbase-no").innerHTML=awayFirst;
		document.getElementById("secondbase-no").innerHTML=awaySecond;
		document.getElementById("thirdbase-no").innerHTML=awayThird;
		document.getElementById("shortstop-no").innerHTML=awaySS;
		document.getElementById("leftfield-no").innerHTML=awayLF;
		document.getElementById("centerfield-no").innerHTML=awayCF;
		document.getElementById("rightfield-no").innerHTML=awayRF;
		runnerPrimary = homePrimary;
		runnerSecondary = homeSecondary;
		runnerNumbers = homeNumbers;		
	}
}

function runScore() {
	if (inning % 1 == 0) {
		awayScore++;
	} else {
		homeScore++;
	}
}

function updateRuns() {
	if (inning == 1) {
		document.getElementById("top-1").innerHTML = `${inningRuns}`;
		document.getElementById("awayScore").innerHTML = `${awayScore}`;
	} else if (inning == 1.5) {
		document.getElementById("bottom-1").innerHTML = `${inningRuns}`;
		document.getElementById("homeScore").innerHTML = `${homeScore}`;
	} else if (inning == 2) {
		document.getElementById("top-2").innerHTML = `${inningRuns}`;
		document.getElementById("awayScore").innerHTML = `${awayScore}`;
	} else if (inning == 2.5) {
		document.getElementById("bottom-2").innerHTML = `${inningRuns}`;
		document.getElementById("homeScore").innerHTML = `${homeScore}`;
	} else if (inning == 3) {
		document.getElementById("top-3").innerHTML = `${inningRuns}`;
		document.getElementById("awayScore").innerHTML = `${awayScore}`;
	} else if (inning == 3.5) {
		document.getElementById("bottom-3").innerHTML = `${inningRuns}`;
		document.getElementById("homeScore").innerHTML = `${homeScore}`;
	} else if (inning == 4) {
		document.getElementById("top-4").innerHTML = `${inningRuns}`;
		document.getElementById("awayScore").innerHTML = `${awayScore}`;
	} else if (inning == 4.5) {
		document.getElementById("bottom-4").innerHTML = `${inningRuns}`;
		document.getElementById("homeScore").innerHTML = `${homeScore}`;
	} else if (inning == 5) {
		document.getElementById("top-5").innerHTML = `${inningRuns}`;
		document.getElementById("awayScore").innerHTML = `${awayScore}`;
	} else if (inning == 5.5) {
		document.getElementById("bottom-5").innerHTML = `${inningRuns}`;
		document.getElementById("homeScore").innerHTML = `${homeScore}`;
	} else if (inning == 6) {
		document.getElementById("top-6").innerHTML = `${inningRuns}`;
		document.getElementById("awayScore").innerHTML = `${awayScore}`;
	} else if (inning == 6.5) {
		document.getElementById("bottom-6").innerHTML = `${inningRuns}`;
		document.getElementById("homeScore").innerHTML = `${homeScore}`;
	} else if (inning == 7) {
		document.getElementById("top-7").innerHTML = `${inningRuns}`;
		document.getElementById("awayScore").innerHTML = `${awayScore}`;
	} else if (inning == 7.5) {
		document.getElementById("bottom-7").innerHTML = `${inningRuns}`;
		document.getElementById("homeScore").innerHTML = `${homeScore}`;
	} else if (inning == 8) {
		document.getElementById("top-8").innerHTML = `${inningRuns}`;
		document.getElementById("awayScore").innerHTML = `${awayScore}`;
	} else if (inning == 8.5) {
		document.getElementById("bottom-8").innerHTML = `${inningRuns}`;
		document.getElementById("homeScore").innerHTML = `${homeScore}`;
	} else if (inning >= 9 && inning % 1 == 0) {
		document.getElementById("top-9").innerHTML = `${inningRuns}`;
		document.getElementById("awayScore").innerHTML = `${awayScore}`;
	} else if (inning >= 9.5 && inning % 1 !== 0) {
		document.getElementById("bottom-9").innerHTML = `${inningRuns}`;
		document.getElementById("homeScore").innerHTML = `${homeScore}`;
	} 
}

function updateHits() {
	if (inning == 1 || inning == 2 || inning == 3 || inning == 4 || inning == 5 || inning == 6 || inning == 7 || inning == 8 || inning == 9) {
		if (lastpitch == "Single" || lastpitch == "Double" || lastpitch == "Triple" || lastpitch == "Homerun") {
		awayHits++;
		document.getElementById("awayHits").innerHTML = `${awayHits}`;
		} else {
			console.log('No hits to record.')
		}
	} else if (inning == 1.5 || inning == 2.5 || inning == 3.5 || inning == 4.5 || inning == 5.5 || inning == 6.5 || inning == 7.5 || inning == 8.5 || inning == 9.5)  {
		if (lastpitch == "Single" || lastpitch == "Double" || lastpitch == "Triple" || lastpitch == "Homerun") {
		homeHits++;
		document.getElementById("homeHits").innerHTML = `${homeHits}`;
		} else {
			console.log('No hits to record.')
		}
	}
}

function showRunners() {
	if (onFirst == true && onSecond == false && onThird == false && scoreHome == false) {
		document.getElementById("runner-one").style.opacity = '100%';
		document.getElementById("runner-two").style.opacity = '0%';
		document.getElementById("runner-three").style.opacity = '0%';
		} else if (onFirst == true && onSecond == true && onThird == false && scoreHome == false) {
		document.getElementById("runner-one").style.opacity = '100%';
		document.getElementById("runner-two").style.opacity = '100%';
		document.getElementById("runner-three").style.opacity = '0%';	
		} else if (onFirst == true && onSecond == true && onThird == true && scoreHome == false) {
		document.getElementById("runner-one").style.opacity = '100%';
		document.getElementById("runner-two").style.opacity = '100%';
		document.getElementById("runner-three").style.opacity = '100%';
		} else if (onFirst == false && onSecond == true && onThird == true && scoreHome == false) {
		document.getElementById("runner-one").style.opacity = '0%';		
		document.getElementById("runner-two").style.opacity = '100%';
		document.getElementById("runner-three").style.opacity = '100%';
		} else if (onFirst == false && onSecond == true && onThird == false && scoreHome == false) {
		document.getElementById("runner-one").style.opacity = '0%';		
		document.getElementById("runner-two").style.opacity = '100%';
		document.getElementById("runner-three").style.opacity = '0%';		
		} else if (onFirst == false && onSecond == false && onThird == true && scoreHome == false) {
		document.getElementById("runner-one").style.opacity = '0%';		
		document.getElementById("runner-two").style.opacity = '0%';
		document.getElementById("runner-three").style.opacity = '100%';
		} else if (onFirst == true && onSecond == false && onThird == true && scoreHome == false) {
		document.getElementById("runner-one").style.opacity = '100%';
		document.getElementById("runner-two").style.opacity = '0%';
		document.getElementById("runner-three").style.opacity = '100%';
		} else if (onFirst == false && onSecond == false && onThird == false && scoreHome == false) {
		document.getElementById("runner-one").style.opacity = '0%';
		document.getElementById("runner-two").style.opacity = '0%';
		document.getElementById("runner-three").style.opacity = '0%';			
		}
}

function runnersMove() {
	if (lastpitch == "Single") {
		if (onFirst == false && onSecond == false && onThird == false && scoreHome == false) {
			onFirst = true;
			onSecond = false;
			onThird = false;
			numberofRunners = 1;
			runners();
		} else if (onFirst == true && onSecond == false && onThird == false && scoreHome == false) {
			onFirst = true;
			onSecond = true;
			onThird = false;
			numberofRunners = 2;
			runners();
		} else if (onFirst == true && onSecond == true && onThird == false && scoreHome == false) {
			onFirst = true;
			onSecond = true;
			onThird = true;
			numberofRunners = 3;
			runners();			
		} else if (onFirst == true && onSecond == true && onThird == true && scoreHome == false) {
			onFirst = true;
			onSecond = true;
			onThird = true;
			inningRuns++;
			runScore();
			numberofRunners = 3;
			runners();
			updateRuns();
		} else if (onFirst == false && onSecond == true && onThird == true && scoreHome == false) {
			onFirst = true;
			onSecond = false;
			onThird = true;
			inningRuns++;
			runScore();
			numberofRunners = 2;
			runners();	
			updateRuns();
		} else if (onFirst == false && onSecond == true && onThird == false && scoreHome == false) {
			onFirst = true;
			onSecond = false;
			onThird = true;
			numberofRunners = 2;
			runners();
		} else if (onFirst == false && onSecond == false && onThird == true && scoreHome == false) {
			onFirst = true;
			onSecond = false;
			onThird = false;
			inningRuns++;
			runScore();
			numberofRunners = 1;
			runners();
			updateRuns();
		} else if (onFirst == true && onSecond == false && onThird == true && scoreHome == false) {
			onFirst = true;
			onSecond = true;
			onThird = false;
			inningRuns++;
			runScore();
			numberofRunners = 2;
			runners();
			updateRuns();
		}
	} else if (lastpitch == "Double") {
		if (onFirst == false && onSecond == false && onThird == false && scoreHome == false) {
			onFirst = false;
			onSecond = true;
			onThird = false;
			numberofRunners = 1;
			runners();
		} else if (onFirst == true && onSecond == false && onThird == false && scoreHome == false) {
			onFirst = false;
			onSecond = true;
			onThird = true;
			numberofRunners = 2;
			runners();
		} else if (onFirst == true && onSecond == true && onThird == false && scoreHome == false) {
			onFirst = false;
			onSecond = true;
			onThird = true;
			inningRuns++;
			runScore();
			numberofRunners = 2;
			runners();
			updateRuns();
		} else if (onFirst == true && onSecond == true && onThird == true && scoreHome == false) {
			onFirst = false;
			onSecond = true;
			onThird = true;
			inningRuns++;
			inningRuns++;
			runScore();
			runScore();
			numberofRunners = 2;
			runners();
			updateRuns();
		} else if (onFirst == false && onSecond == true && onThird == true && scoreHome == false) {
			onFirst = false;
			onSecond = true;
			onThird = false;
			inningRuns++;
			inningRuns++;
			runScore();
			runScore();
			numberofRunners = 1;
			runners();
			updateRuns();
		} else if (onFirst == false && onSecond == true && onThird == false && scoreHome == false) {
			onFirst = false;
			onSecond = true;
			onThird = false;
			inningRuns++;
			runScore();
			numberofRunners = 1;
			runners();
			updateRuns();
			justscored = 0;
		} else if (onFirst == false && onSecond == false && onThird == true && scoreHome == false) {
			onFirst = false;
			onSecond = true;
			onThird = false;
			inningRuns++;
			runScore();
			numberofRunners = 1;
			runners();
			updateRuns();
		} else if (onFirst == true && onSecond == false && onThird == true && scoreHome == false) {
			onFirst = false;
			onSecond = true;
			onThird = true;
			inningRuns++;
			runScore();
			numberofRunners = 1;
			runners();
			updateRuns();
		} 
	} else if (lastpitch == "Triple") {
		if (onFirst == false && onSecond == false && onThird == false && scoreHome == false) {
			onFirst = false;
			onSecond = false;
			onThird = true;
			numberofRunners = 1;
			runners();
		} else if (onFirst == true && onSecond == false && onThird == false && scoreHome == false) {
			onFirst = false;
			onSecond = false;
			onThird = true;
			inningRuns++;
			runScore();
			numberofRunners = 1;
			runners();
			updateRuns();
		} else if (onFirst == true && onSecond == true && onThird == false && scoreHome == false) {
			onFirst = false;
			onSecond = false;
			onThird = true;
			inningRuns++;
			inningRuns++;
			runScore();
			runScore();
			numberofRunners = 1;
			runners();
			updateRuns();
		} else if (onFirst == true && onSecond == true && onThird == true && scoreHome == false) {
			onFirst = false;
			onSecond = false;
			onThird = true;
			inningRuns++;
			inningRuns++;
			inningRuns++;
			runScore();
			runScore();
			runScore();
			numberofRunners = 1;
			runners();
			updateRuns();
		} else if (onFirst == false && onSecond == true && onThird == true && scoreHome == false) {
			onFirst = false;
			onSecond = false;
			onThird = true;
			inningRuns++;
			inningRuns++;
			runScore();
			runScore();
			numberofRunners = 1;
			runners();
			updateRuns();
		} else if (onFirst == false && onSecond == true && onThird == false && scoreHome == false) {
			onFirst = false;
			onSecond = false;
			onThird = true;
			inningRuns++;
			runScore();
			numberofRunners = 1;
			runners();
			updateRuns();
		} else if (onFirst == false && onSecond == false && onThird == true && scoreHome == false) {
			onFirst = false;
			onSecond = false;
			onThird = true;
			inningRuns++;
			runScore();
			numberofRunners = 1;
			runners();
			updateRuns();
		} else if (onFirst == true && onSecond == false && onThird == true && scoreHome == false) {
			onFirst = false;
			onSecond = false;
			onThird = true;
			inningRuns++;
			inningRuns++;
			runScore();
			runScore();
			numberofRunners = 1;
			runners();
			updateRuns();
		}
	} else if (lastpitch == "Homerun") {
		let i = 0;
		justscored = numberofRunners + 1;
		inningRuns = inningRuns + justscored;
		onFirst = false;
		onSecond = false;
		onThird = false;
		scoreHome = false;
		numberofRunners = 0;
		function homerunScore() {
			while (i < justscored) {
				runScore();
			}
		}
		homerunScore();
		runners();
		updateRuns();
		justscored = 0;
	} else if (lastpitch == "Ball" && balls == 4) {
		if (onFirst == false && onSecond == false && onThird == false && scoreHome == false) {
			onFirst = true;
			onSecond = false;
			onThird = false;
			numberofRunners = 1;
			runners();
		} else if (onFirst == true && onSecond == false && onThird == false && scoreHome == false) {
			onFirst = true;
			onSecond = true;
			onThird = false;
			numberofRunners = 2;
			runners();
		} else if (onFirst == true && onSecond == true && onThird == false && scoreHome == false) {
			onFirst = true;
			onSecond = true;
			onThird = true;
			numberofRunners = 3;
			runners();
		} else if (onFirst == true && onSecond == true && onThird == true && scoreHome == false) {
			onFirst = true;
			onSecond = true;
			onThird = true;
			inningRuns++;
			runScore();
			numberofRunners = 3;
			runners();
			updateRuns();
		} else if (onFirst == false && onSecond == true && onThird == true && scoreHome == false) {
			onFirst = true;
			onSecond = true;
			onThird = true;
			numberofRunners = 3;
			runners();
		} else if (onFirst == false && onSecond == true && onThird == false && scoreHome == false) {
			onFirst = true;
			onSecond = true;
			onThird = false;
			numberofRunners = 2;
			runners();
		} else if (onFirst == false && onSecond == false && onThird == true && scoreHome == false) {
			onFirst = true;
			onSecond = false;
			onThird = true;
			numberofRunners = 1;
			runners();
		} else if (onFirst == true && onSecond == false && onThird == true && scoreHome == false) {
			onFirst = true;
			onSecond = true;
			onThird = true;
			numberofRunners = 3;
			runners();
		}

	}
} 

function runners() {
	if (onFirst == false && onSecond == false && onThird == false && scoreHome == false) {
		document.getElementById("onFirst").style.backgroundColor = "#4f7e6f";	
		document.getElementById("onSecond").style.backgroundColor = "#4f7e6f";	
		document.getElementById("onThird").style.backgroundColor = "#4f7e6f";	
		document.getElementById("home").style.backgroundColor = "#4f7e6f";		
	} else if (onFirst == true && onSecond == false && onThird == false && scoreHome == false) {
		document.getElementById("onFirst").style.backgroundColor = "yellow";	
		document.getElementById("onSecond").style.backgroundColor = "#4f7e6f";	
		document.getElementById("onThird").style.backgroundColor = "#4f7e6f";	
		document.getElementById("home").style.backgroundColor = "#4f7e6f";		
	} else if (onFirst == true && onSecond == true && onThird == false && scoreHome == false) {
		document.getElementById("onFirst").style.backgroundColor = "yellow";	
		document.getElementById("onSecond").style.backgroundColor = "yellow";	
		document.getElementById("onThird").style.backgroundColor = "#4f7e6f";	
		document.getElementById("home").style.backgroundColor = "#4f7e6f";		
	} else if (onFirst == true && onSecond == true && onThird == true && scoreHome == false) {
		document.getElementById("onFirst").style.backgroundColor = "yellow";	
		document.getElementById("onSecond").style.backgroundColor = "yellow";	
		document.getElementById("onThird").style.backgroundColor = "yellow";	
		document.getElementById("home").style.backgroundColor = "#4f7e6f";		
	} else if (onFirst == true && onSecond == true && onThird == true && scoreHome == true) {
		document.getElementById("onFirst").style.backgroundColor = "yellow";	
		document.getElementById("onSecond").style.backgroundColor = "yellow";	
		document.getElementById("onThird").style.backgroundColor = "yellow";	
		document.getElementById("home").style.backgroundColor = "yellow";		
	} else if (onFirst == true && onSecond == false && onThird == true && scoreHome == false) {
		document.getElementById("onFirst").style.backgroundColor = "yellow";	
		document.getElementById("onSecond").style.backgroundColor = "#4f7e6f";	
		document.getElementById("onThird").style.backgroundColor = "yellow";	
		document.getElementById("home").style.backgroundColor = "#4f7e6f";		
	} else if (onFirst == false && onSecond == true && onThird == false && scoreHome == false) {
		document.getElementById("onFirst").style.backgroundColor = "#4f7e6f";	
		document.getElementById("onSecond").style.backgroundColor = "yellow";	
		document.getElementById("onThird").style.backgroundColor = "#4f7e6f";	
		document.getElementById("home").style.backgroundColor = "#4f7e6f";		
	} else if (onFirst == false && onSecond == true && onThird == true && scoreHome == false) {
		document.getElementById("onFirst").style.backgroundColor = "#4f7e6f";	
		document.getElementById("onSecond").style.backgroundColor = "yellow";	
		document.getElementById("onThird").style.backgroundColor = "yellow";	
		document.getElementById("home").style.backgroundColor = "#4f7e6f";		
	} else if (onFirst == false && onSecond == false && onThird == true && scoreHome == false) {
		document.getElementById("onFirst").style.backgroundColor = "#4f7e6f";	
		document.getElementById("onSecond").style.backgroundColor = "#4f7e6f";	
		document.getElementById("onThird").style.backgroundColor = "yellow";	
		document.getElementById("home").style.backgroundColor = "#4f7e6f";		
	};
}

function resetRunners() {
	document.getElementById("onFirst").style.backgroundColor = "#4f7e6f";	
	document.getElementById("onSecond").style.backgroundColor = "#4f7e6f";	
	document.getElementById("onThird").style.backgroundColor = "#4f7e6f";	
	document.getElementById("home").style.backgroundColor = "#4f7e6f";
	onFirst = false;
	onSecond = false;
	onThird = false;
	scoreHome = false;	
	numberofRunners = 0;	
}

function pitch() {
	determineCount();
	currentMods();
	lastpitch = "None";
	x = Math.random();
	if (x<=fastballTendency) {
		x = Math.random();
		pitchtype = 'Fastball';
		measurePitch();
		if (x<=fastballControl) {
			x = Math.random();
			pitchloc = "In Zone";
			if (x<=currentFBSwing) {
				x = Math.random();
				swing = "Yes";
				if (x<=currentContact) {
					x = Math.random();
					contact = "Yes";
					if (x<=currentBIP) {
						x = Math.random();
						if (x<=baMod) {
							x = Math.random();
							if (x<=single) {
								lastpitch = "Single";
								recordPitch();
								runnersMove();
								clearInterval(pitchInterval);
							} else if (single<x && x<=double) {
								lastpitch = "Double";
								recordPitch();
								runnersMove();
								clearInterval(pitchInterval);
							} else if (double<x && x<=homerun) {
								lastpitch = "Homerun";
								recordPitch();
								runnersMove();
								clearInterval(pitchInterval);							
							} else if (triple<=x) {
								lastpitch = "Triple";
								recordPitch();
								runnersMove();
								clearInterval(pitchInterval);
							}
						} else {
							lastpitch = "Out";
							recordPitch();
							clearInterval(pitchInterval);
						}
					} else {
						lastpitch = "Foul"
						recordPitch();
					}
				} else {
					contact = "No";
					lastpitch = "Strike";
					recordPitch();
				}
			} else {
				swing = "No";
				contact = "No";
				lastpitch = "Strike";
				recordPitch();
			}
		} else {
			x = Math.random();
			pitchloc = "Out of Zone";
			if (x<=currentFBSwing) {
				swing = "No";
				contact = "No";
				lastpitch = "Ball";
				recordPitch();
			} else {
				x = Math.random();
				swing = "Yes"
				if (x<=currentContact) {
					x = Math.random();
					contact = "Yes";
					if (x<=currentBIP) {
						x = Math.random();
						if (x<=baMod) {
							x = Math.random();
							if (x<=single) {
								lastpitch = "Single";
								recordPitch();
								runnersMove();
								clearInterval(pitchInterval);
							} else if (single<x && x<=double) {
								lastpitch = "Double";
								recordPitch();
								runnersMove();
								clearInterval(pitchInterval);
							} else if (double<x && x<=homerun) {
								lastpitch = "Homerun";
								recordPitch();
								runnersMove();
								clearInterval(pitchInterval);
							} else if (triple<=x) {
								lastpitch = "Triple";
								recordPitch();
								runnersMove();
								clearInterval(pitchInterval);
							}
						} else {
							lastpitch = "Out";
							recordPitch();
							clearInterval(pitchInterval);
						}
					} else {
						lastpitch = "Foul"
						recordPitch();
					}
				} else {
					contact = "No";
					lastpitch = "Strike";
					recordPitch();
				}

			}
		}
	} else {
		console.log('Not a fastball');
	}


}

function atbatRecord() {
			if (lastpitch == 'Strike') {
				strikes++;
				if (strikes == 1) {
					document.getElementById("strike-1").style.backgroundColor="#FFF59D";
				} else if (strikes == 2) {
					document.getElementById("strike-1").style.backgroundColor="#FFF59D";
					document.getElementById("strike-2").style.backgroundColor="#FFF59D";
				} else if (strikes == 3) {
					outs++;
					atbatPitches = 0;
					document.getElementById("strike-1").style.backgroundColor="#4f7e6f";
					document.getElementById("strike-2").style.backgroundColor="#4f7e6f";
					document.getElementById("ball-1").style.backgroundColor="#4f7e6f";
					document.getElementById("ball-2").style.backgroundColor="#4f7e6f";
					document.getElementById("ball-3").style.backgroundColor="#4f7e6f";
					lastpitch = "None";
					batOver = 1001;
					clearInterval(pitchclockInterval);
					clearInterval(pitchInterval);
					clearInterval(intervalId);
					if (outs == 1) {
						document.getElementById("out-1").style.backgroundColor="#DC143C";
						nextAtBat();
					} else if (outs == 2) {
						document.getElementById("out-1").style.backgroundColor="#DC143C";
						document.getElementById("out-2").style.backgroundColor="#DC143C";
						nextAtBat();
					} else if (outs == 3) {
						document.getElementById("out-1").style.backgroundColor="#4f7e6f";
						document.getElementById("out-2").style.backgroundColor="#4f7e6f";
						resetRunners();
						changeInning();
						outs = 0;					
					}
				} else {
					console.log(`The count is ${balls}-${strikes}.`);
				}
			} else if (lastpitch == 'Ball') {
				balls++;
				if (balls == 1) {
					document.getElementById("ball-1").style.backgroundColor="#2a52be";
				} else if (balls == 2) {
					document.getElementById("ball-1").style.backgroundColor="#2a52be";
					document.getElementById("ball-2").style.backgroundColor="#2a52be";
				} else if (balls == 3) {
					document.getElementById("ball-1").style.backgroundColor="#2a52be";
					document.getElementById("ball-2").style.backgroundColor="#2a52be";
					document.getElementById("ball-3").style.backgroundColor="#2a52be";
				} else if (balls == 4) {
					atbatPitches = 0;
					runnersMove();
					document.getElementById("ball-1").style.backgroundColor="#4f7e6f";
					document.getElementById("ball-2").style.backgroundColor="#4f7e6f";
					document.getElementById("ball-3").style.backgroundColor="#4f7e6f";
					document.getElementById("strike-1").style.backgroundColor="#4f7e6f";
					document.getElementById("strike-2").style.backgroundColor="#4f7e6f";
					lastpitch = "None";
					batOver = 1001;
					clearInterval(pitchclockInterval);
					clearInterval(pitchInterval);
					clearInterval(intervalId);
					nextAtBat();
				} else {
					console.log(`The count is ${balls}-${strikes}.`);
				}
			} else if (lastpitch == 'Foul') {
				lastpitch = 'Foul';
				if (strikes == 0) {
					strikes++;
					document.getElementById("strike-1").style.backgroundColor="#FFF59D";
				} else if (strikes == 1) {
					strikes++;
					document.getElementById("strike-1").style.backgroundColor="#FFF59D";
					document.getElementById("strike-2").style.backgroundColor="#FFF59D";
				} else if (strikes == 2) {
					document.getElementById("strike-1").style.backgroundColor="#FFF59D";
					document.getElementById("strike-2").style.backgroundColor="#FFF59D";
				}
			} else if (lastpitch == 'Single') {
				atbatPitches = 0;
				updateHits();
				document.getElementById("ball-1").style.backgroundColor="#4f7e6f";
				document.getElementById("ball-2").style.backgroundColor="#4f7e6f";
				document.getElementById("ball-3").style.backgroundColor="#4f7e6f";
				document.getElementById("strike-1").style.backgroundColor="#4f7e6f";
				document.getElementById("strike-2").style.backgroundColor="#4f7e6f";
				resetCount();
				lastpitch = "None";
				batOver = 1001;
				clearInterval(pitchclockInterval);
				clearInterval(pitchInterval);
				clearInterval(intervalId);
				nextAtBat();
			} else if (lastpitch == 'Double') {
				atbatPitches = 0;
				updateHits();
				document.getElementById("ball-1").style.backgroundColor="#4f7e6f";
				document.getElementById("ball-2").style.backgroundColor="#4f7e6f";
				document.getElementById("ball-3").style.backgroundColor="#4f7e6f";
				document.getElementById("strike-1").style.backgroundColor="#4f7e6f";
				document.getElementById("strike-2").style.backgroundColor="#4f7e6f";
				resetCount();
				lastpitch = "None";
				batOver = 1001;
				clearInterval(pitchclockInterval);
				clearInterval(pitchInterval);
				clearInterval(intervalId);
				nextAtBat();
			} else if (lastpitch == 'Triple') {
				batPitches = 0;
				updateHits();
				document.getElementById("ball-1").style.backgroundColor="#4f7e6f";
				document.getElementById("ball-2").style.backgroundColor="#4f7e6f";
				document.getElementById("ball-3").style.backgroundColor="#4f7e6f";
				document.getElementById("strike-1").style.backgroundColor="#4f7e6f";
				document.getElementById("strike-2").style.backgroundColor="#4f7e6f";
				resetCount();
				lastpitch = "None";
				batOver = 1001;
				clearInterval(pitchclockInterval);
				clearInterval(pitchInterval);
				clearInterval(intervalId);
				nextAtBat();
			} else if (lastpitch == 'Homerun') {
				atbatPitches = 0;
				updateHits();
				document.getElementById("ball-1").style.backgroundColor="#4f7e6f";
				document.getElementById("ball-2").style.backgroundColor="#4f7e6f";
				document.getElementById("ball-3").style.backgroundColor="#4f7e6f";
				document.getElementById("strike-1").style.backgroundColor="#4f7e6f";
				document.getElementById("strike-2").style.backgroundColor="#4f7e6f";
				resetCount();
				lastpitch = "None";
				batOver = 1001;
				clearInterval(pitchclockInterval);
				clearInterval(pitchInterval);
				clearInterval(intervalId);
				nextAtBat();
			} else if (lastpitch == 'Out') {
				atbatPitches = 0;
				outs++;	
				document.getElementById("ball-1").style.backgroundColor="#4f7e6f";
				document.getElementById("ball-2").style.backgroundColor="#4f7e6f";
				document.getElementById("ball-3").style.backgroundColor="#4f7e6f";
				document.getElementById("strike-1").style.backgroundColor="#4f7e6f";
				document.getElementById("strike-2").style.backgroundColor="#4f7e6f";
				resetCount();
				lastpitch = "None";
				batOver = 1001;
				clearInterval(pitchclockInterval);
				clearInterval(pitchInterval);
				clearInterval(intervalId);
				if (outs == 1) {
					document.getElementById("out-1").style.backgroundColor="#DC143C";
					nextAtBat();
				} else if (outs == 2) {
					document.getElementById("out-1").style.backgroundColor="#DC143C";
					document.getElementById("out-2").style.backgroundColor="#DC143C";
					nextAtBat();
				} else if (outs == 3) {
					document.getElementById("out-1").style.backgroundColor="#4f7e6f";
					document.getElementById("out-2").style.backgroundColor="#4f7e6f";
					resetRunners();
					changeInning();
					outs = 0;		
				}
			}
}


function changeInning() {
	if (inning == 1) {
		inning = inning+0.5;
		resetRunners();
		showRunners();
		switchSides();

		inningRuns = 0;
		inningclock();
		/* document.querySelectorAll(".defense").style.backgroundColor="#BD3039";
		document.querySelectorAll(".offense").style.backgroundColor="#ffffff";
		document.querySelectorAll(".defense").style.border="2px solid #0D2B56";
		document.querySelectorAll(".offense").style.border="2px solid #0C2340";
		document.querySelectorAll(".defense").style.color="#ffffff";
		document.querySelectorAll(".offense").style.color="#0C2340";*/	
		document.getElementById("box-T1").style.backgroundColor="#4f7e6f";
		document.getElementById("box-B1").style.backgroundColor="#000000";
		document.getElementById("bottom-1").innerHTML = inningRuns;		
		setTimeout(() => {
			nextAtBat();
		}, 15000);
	} else if (inning == 1.5) {
		inning = inning+0.5;
		resetRunners();
		showRunners();
		switchSides();

		inningRuns = 0;
		inningclock();
		document.getElementById("box-B1").style.backgroundColor="#4f7e6f";
		document.getElementById("box-T2").style.backgroundColor="#000000";
		document.getElementById("top-2").innerHTML = inningRuns;	
		setTimeout(() => {
			nextAtBat();
		}, 15000);
	} else if (inning == 2) {
		inning = inning+0.5;
		resetRunners();
		showRunners();
		switchSides();
		
		inningRuns = 0;
		inningclock();
		document.getElementById("box-T2").style.backgroundColor="#4f7e6f";
		document.getElementById("box-B2").style.backgroundColor="#000000";
		document.getElementById("bottom-2").innerHTML = inningRuns;	
		setTimeout(() => {
			nextAtBat();
		}, 15000);
	} else if (inning == 2.5) {
		inning = inning+0.5;
		resetRunners();
		showRunners();
		switchSides();
		
		inningRuns = 0;
		inningclock();
		document.getElementById("box-B2").style.backgroundColor="#4f7e6f";
		document.getElementById("box-T3").style.backgroundColor="#000000";
		document.getElementById("top-3").innerHTML = inningRuns;	
		setTimeout(() => {
			nextAtBat();
		}, 15000);
	} else if (inning == 3) {
		inning = inning+0.5;
		resetRunners();
		showRunners();
		switchSides();
		
		inningRuns = 0;
		inningclock();
		document.getElementById("box-T3").style.backgroundColor="#4f7e6f";
		document.getElementById("box-B3").style.backgroundColor="#000000";
		document.getElementById("bottom-3").innerHTML = inningRuns;	
		setTimeout(() => {
			nextAtBat();
		}, 15000);
	} else if (inning == 3.5) {
		inning = inning+0.5;
		resetRunners();
		showRunners();
		switchSides();
		
		inningRuns = 0;
		inningclock();
		document.getElementById("box-B3").style.backgroundColor="#4f7e6f";
		document.getElementById("box-T4").style.backgroundColor="#000000";
		document.getElementById("top-4").innerHTML = inningRuns;	
		setTimeout(() => {
			nextAtBat();
		}, 15000);
	} else if (inning == 4) {
		inning = inning+0.5;
		resetRunners();
		showRunners();
		switchSides();
		
		inningRuns = 0;
		inningclock();
		document.getElementById("box-T4").style.backgroundColor="#4f7e6f";
		document.getElementById("box-B4").style.backgroundColor="#000000";
		document.getElementById("bottom-4").innerHTML = inningRuns;	
		setTimeout(() => {
			nextAtBat();
		}, 15000);
	} else if (inning == 4.5) {
		inning = inning+0.5;
		resetRunners();
		showRunners();
		switchSides();
		
		inningRuns = 0;
		inningclock();
		document.getElementById("box-B4").style.backgroundColor="#4f7e6f";
		document.getElementById("box-T5").style.backgroundColor="#000000";
		document.getElementById("top-5").innerHTML = inningRuns;	
		setTimeout(() => {
			nextAtBat();
		}, 15000);
	} else if (inning == 5) {
		inning = inning+0.5;
		resetRunners();
		showRunners();
		switchSides();
		
		inningRuns = 0;
		inningclock();
		document.getElementById("box-T5").style.backgroundColor="#4f7e6f";
		document.getElementById("box-B5").style.backgroundColor="#000000";
		document.getElementById("bottom-5").innerHTML = inningRuns;	
		setTimeout(() => {
			nextAtBat();
		}, 15000);
	} else if (inning == 5.5) {
		inning = inning+0.5;
		resetRunners();
		showRunners();
		switchSides();
		
		inningRuns = 0;
		inningclock();
		document.getElementById("box-B5").style.backgroundColor="#4f7e6f";
		document.getElementById("box-T6").style.backgroundColor="#000000";
		document.getElementById("top-6").innerHTML = inningRuns;	
		setTimeout(() => {
			nextAtBat();
		}, 15000);
	} else if (inning == 6) {
		inning = inning+0.5;
		resetRunners();
		showRunners();
		switchSides();
		
		inningRuns = 0;
		document.getElementById("box-T6").style.backgroundColor="#4f7e6f";
		document.getElementById("box-B6").style.backgroundColor="#000000";
		document.getElementById("bottom-6").innerHTML = inningRuns;	
		setTimeout(() => {
			nextAtBat();
		}, 15000);
	} else if (inning == 6.5) {
		inning = inning+0.5;
		resetRunners();
		switchSides();
		
		inningRuns = 0;
		inningclock();
		document.getElementById("box-B6").style.backgroundColor="#4f7e6f";
		document.getElementById("box-T7").style.backgroundColor="#000000";
		document.getElementById("top-7").innerHTML = inningRuns;	
		setTimeout(() => {
			nextAtBat();
		}, 15000);
	} else if (inning == 7) {
		inning = inning+0.5;
		resetRunners();
		showRunners();
		switchSides();
		
		inningRuns = 0;
		seventhinningstretch();
		document.getElementById("box-T7").style.backgroundColor="#4f7e6f";
		document.getElementById("box-B7").style.backgroundColor="#000000";
		document.getElementById("bottom-7").innerHTML = inningRuns;	
		setTimeout(() => {
			nextAtBat();
		}, 15000);
	} else if (inning == 7.5) {
		inning = inning+0.5;
		resetRunners();
		showRunners();
		switchSides();
		
		inningRuns = 0;
		inningclock();
		document.getElementById("box-B7").style.backgroundColor="#4f7e6f";
		document.getElementById("box-T8").style.backgroundColor="#000000";
		document.getElementById("top-8").innerHTML = inningRuns;	
		setTimeout(() => {
			nextAtBat();
		}, 15000);
	} else if (inning == 8) {
		inning = inning+0.5;
		resetRunners();
		showRunners();
		switchSides();
		
		inningRuns = 0;
		inningclock();
		document.getElementById("box-T8").style.backgroundColor="#4f7e6f";
		document.getElementById("box-B8").style.backgroundColor="#000000";
		document.getElementById("bottom-8").innerHTML = inningRuns;	
		setTimeout(() => {
			nextAtBat();
		}, 15000);
	} else if (inning == 8.5) {
		inning = inning+0.5;
		resetRunners();
		showRunners();
		switchSides();
		
		inningRuns = 0;
		inningclock();
		document.getElementById("box-B8").style.backgroundColor="#4f7e6f";
		document.getElementById("box-T9").style.backgroundColor="#000000";
		document.getElementById("top-9").innerHTML = inningRuns;	
		setTimeout(() => {
			nextAtBat();
		}, 15000);
	} else if (inning >= 9) {
		if (homeScore>awayScore) {
			document.getElementById("pbp-text").innerHTML = "<b>GAME OVER</b>";
			document.getElementById("bottom-9").innerHTML = 'X';
			document.getElementById("box-T9").style.backgroundColor="#4f7e6f";
			document.getElementById("box-B9").style.backgroundColor="#4f7e6f";
			document.getElementById("away-runs").style.backgroundColor="#000000";
			document.getElementById("away-hits").style.backgroundColor="#000000";
			document.getElementById("away-errors").style.backgroundColor="#000000";
			document.getElementById("home-runs").style.backgroundColor="#000000";
			document.getElementById("home-hits").style.backgroundColor="#000000";
			document.getElementById("home-errors").style.backgroundColor="#000000";
		} else if (homeScore<awayScore) {
			document.getElementById("pbp-text").innerHTML = "<b>GAME OVER</b>";
			document.getElementById("box-T9").style.backgroundColor="#4f7e6f";
			document.getElementById("box-B9").style.backgroundColor="#4f7e6f";
			document.getElementById("away-runs").style.backgroundColor="#000000";
			document.getElementById("away-hits").style.backgroundColor="#000000";
			document.getElementById("away-errors").style.backgroundColor="#000000";
			document.getElementById("home-runs").style.backgroundColor="#000000";
			document.getElementById("home-hits").style.backgroundColor="#000000";
			document.getElementById("home-errors").style.backgroundColor="#000000";		
		} else if (homeScore==awayScore) {
			inning = inning+0.5;
			resetRunners();
			showRunners();
			switchSides();
			inningRuns = 0;

			if (inning % 1 == 0) {
				document.getElementById("last-inning").innerHTML = inning;	
				document.getElementById("box-T9").style.backgroundColor="#000000";
				document.getElementById("box-B9").style.backgroundColor="#4f7e6f";
				document.getElementById("top-9").innerHTML = inningRuns;		
			} else if (inning % 1 !== 0) {
				document.getElementById("last-inning").innerHTML = (inning-0.5);	
				document.getElementById("box-T9").style.backgroundColor="#4f7e6f";
				document.getElementById("box-B9").style.backgroundColor="#000000";
				document.getElementById("bottom-9").innerHTML = inningRuns;				
			} else {
				document.getElementById("last-inning").innerHTML = inning;				
				console.log('Error calculating extra inning.');	
			}


			inningclock();
			setTimeout(() => {
				nextAtBat();
			}, 15000);				
		};
	} else {
		document.getElementById("pbp-text").innerHTML = "<b>GAME OVER</b>";	
		document.getElementById("away-runs").style.backgroundColor="#000000";
		document.getElementById("away-hits").style.backgroundColor="#000000";
		document.getElementById("away-errors").style.backgroundColor="#000000";
		document.getElementById("home-runs").style.backgroundColor="#000000";
		document.getElementById("home-hits").style.backgroundColor="#000000";
		document.getElementById("home-errors").style.backgroundColor="#000000";
	};
}

function playatbat() {
		document.getElementById("pbp-text").innerHTML = `<b>Next up to bat: ${currentbatter.name}</b>`;
		document.getElementById("lastpitch").innerHTML = "";
		document.getElementById("velocity").innerHTML = "";
		resetCount()
		intervalId = setInterval(() => {
			pitch();
			pitches++;
			atbatRecord();
		}, 5000);
		
	}

function throwPitch() {
	p = 1;
	timeLeft = 1;


	document.getElementById("pbp-text").innerHTML = "<b>The pitcher gets set...</b>";

	pitchclock();
	pitchTime();

	throwpitchInterval = setTimeout(() => {
		pitch();
		atbatPitches++;
		pitches++;
		atbatRecord();
	}, p);

	throwpitchInterval = null;

	if (batOver > 1000) {
		document.getElementById("pbp-text").innerHTML = "<b>AT BAT OVER</b>";
		resetCount();
		clearInterval(pitchInterval);
	};

}

function atbat() {
	batOver = 0;
	p = 1;
	pitchclock();
	pitchTime();
	document.getElementById("pbp-text").innerHTML = `<b>Next up to bat: ${currentbatter.name}</b>`;
	document.getElementById("lastpitch").innerHTML = "";
	document.getElementById("velocity").innerHTML = "";
	throwpitchInterval = setTimeout(() => {
		pitch();	
		atbatPitches++;
		pitches++;
		atbatRecord();
	}, p);

	throwpitchInterval = null;

	pitchInterval = setInterval(throwPitch, 15000);

}

function nextAtBat() {
	showRunners();
	setTimeout(() => {
		resetCount();
		atbat();
	}, 10000);

}

function playball() {
	document.getElementById("playball").style.display = "None";
	document.getElementById("pbp-text").innerHTML = `<b>PLAY BALL!</b>`;
	inning = 1;
	switchSides();
		

	setTimeout(() => {
		atbat();
	}, 6000);

}