function updateTempTR() {
	if (tmp.tr===undefined) tmp.tr = {};
	tmp.tr.txt = player.tr.active ? "Bring Time back to normal." : "Reverse Time.";
	tmp.tr.esc = new ExpantaNum(1 / 0);
	cubes = player.tr.cubes;
	//if (cubes.gte(tmp.tr.esc)) cubes = cubes.cbrt().times(Math.pow(tmp.tr.esc, 2 / 3));
	tmp.tr.eff = EN.logBase(cubes.plus(1), 10).times(2).root(1.1);
	if (tmp.inf) if (tmp.inf.stadium.completed("reality")) tmp.tr.eff = tmp.tr.eff.times(mltRewardActive(1)?8:3);
}

function getTimeCubeGain() {
	let gain = new ExpantaNum(1);
	if (modeActive("hard")) gain = gain.div(3);
	if (modeActive("easy")) gain = gain.times(5).times(player.pathogens.amount.plus(1));
	if (player.rank.gte(rankRewardReq[18])) gain = gain.times(getRankEffects("19"));
	if (player.tr.upgrades.includes(1) && !HCCBA("noTRU")) gain = gain.times(tr1Eff());
	if (player.tr.upgrades.includes(4) && !HCCBA("noTRU")) gain = gain.times(tr4Eff());
	if (player.tr.upgrades.includes(9) && !HCCBA("noTRU")) gain = gain.times(tr9Eff()["cubeGain"]);
	if (tmp.ach[55].has) gain = gain.times(1.1);
	if (tmp.ach[72].has && modeActive("extreme")) {
		let exp = ExpantaNum.add(5, player.dc.cores.sqrt().times(5));
		gain = gain.times(player.furnace.coal.plus(1).log10().plus(1).pow(exp));
	}
	if (tmp.ach[86].has && modeActive("extreme+hikers_dream")) {
		gain = gain.times(player.pathogens.amount.plus(1))
	}
	if (player.tr.upgrades.includes(16) && !HCCBA("noTRU") && modeActive("extreme"))
		gain = gain.times(player.furnace.coal.plus(1).log10().sqrt().plus(1));
	if (tmp.pathogens && player.pathogens.unl) gain = gain.times(tmp.pathogens[3].eff());
	if (tmp.dc) if (player.dc.unl) gain = gain.times(tmp.dc.deEff);
	if (tmp.inf) if (tmp.inf.upgs.has("2;3")) gain = gain.times(INF_UPGS.effects["2;3"]()["cubes"]);
	return gain
}

function reverseTime(force = false) {
	if (!player.tr.unl) return;
	player.tr.active = !player.tr.active;
}

function buyTRUpg(n) {
	if (player.tr.upgrades.includes(n)) return;
	if (player.tr.cubes.lt(TR_UPGS[n].cost())) return;
	player.tr.cubes = player.tr.cubes.sub(TR_UPGS[n].cost());
	player.tr.upgrades.push(n);
}

function tr1Pow() {
	let pow = new ExpantaNum(1)
	if (player.rank.gte(rankRewardReq[39])) pow = pow.times(getRankEffects("40"))
	return pow
}

function tr1Eff() {
	return ExpantaNum.pow(1.1, player.rank.plus(player.tier)).pow(tr1Pow());
}

function tr2Pow() {
	let pow = new ExpantaNum(1)
	if (tmp.pathogens && player.pathogens.unl) pow = pow.times(tmp.pathogens[1].eff());
	if (player.rank.gte(rankRewardReq[21])) pow = pow.times(getRankEffects("22"))
	if (player.rank.gte(rankRewardReq[29])) pow = pow.times(getRankEffects("30"))
	return pow
}

function tr2Eff() {
	let pow = tr2Pow()
	let eff = player.tr.cubes.plus(1).log10().plus(1).pow(pow)
	return eff
}

function tr4Eff() {
	let r = player.rockets
	return ExpantaNum.pow(
		10,
		r.plus(1).max(1).logBase(10).pow(0.85).div(15)
	)
}

function tr6Eff() {
	return ExpantaNum.logBase(player.tr.cubes.plus(1), 10).times(0.1).plus(1).pow(1.25)
}

function tr7EffBase() {
	return new ExpantaNum(1.1)
}

function tr7Eff() {
	return ExpantaNum.pow(tr7EffBase(), player.achievements.length)
}

function getTR9Mod() {
	let mod = new ExpantaNum(1)
	if (modeActive("hard")) mod = mod.div(((tmp.ach?tmp.ach[105].has:false)&&modeActive("extreme"))?0.9:2)
	if (modeActive("easy")) mod = mod.times(3)
	return mod
}

function tr8EffBase() {
	let base = new ExpantaNum(0.01)
	return base
}

function tr8Eff() {
	return player.rank.times(tr8EffBase()).plus(1)
}

function tr9Eff() {
	return {
		cubeGain: EN.logBase(player.automation.intelligence.plus(1).max(1), 10).plus(1),
		intelligenceGain: EN.logBase(player.tr.cubes.plus(1).max(1), 10).plus(1).pow(2)
	}
}

function tr10Eff() {
	let x = player.tr.cubes
	return x.plus(1).root(6)
}

function tr11Pow() {
	let pow = new ExpantaNum(1)
	if (tmp.inf) if (tmp.inf.upgs.has("1;8")) pow = pow.times(INF_UPGS.effects["1;8"]())
	return pow
}

function tr11Eff() {
	return player.dc.matter.plus(1).root(4).pow(tr11Pow())
}

function tr12Eff() {
	return tmp.dc ? player.dc.fluid.plus(1).root(3) : new ExpantaNum(1)
}

function tr13Eff() {
	let x = player.tr.cubes.max("1e700").minus("1e700").div("1e700")
	return {
		coreFP: x.plus(1).logBase(10).plus(1).logBase(2).times(0.01).plus(1).pow(2),
		cadaverGain: x.plus(10).logBase(10).pow(4)
	}
}

function tr14Eff() {
	return ExpantaNum.pow(1.25, player.dc.cores).times(player.dc.cores.plus(1).pow(2))
}

function tr15EffBase() {
	return new ExpantaNum(0.00)
}

function tr15Eff() {
	//let division = new ExpantaNum(modeActive("extreme+hikers_dream") ? "1e1200" : "1e1000")
	//let x = player.tr.cubes.max(division).minus(division).div(division)
	let eff = player.tr.cubes.plus(1).logBase(10).plus(1).root(2)
	return eff
}



function tr19Eff() {
	if (!modeActive("extreme")) return new ExpantaNum(1)
	let eff = ExpantaNum.div(4.5, tmp.auto ? tmp.auto.rankCheapbot.interval.max(1e-10) : 1).pow(getTR89Mod().times(0.3)).max(1);
	if (showNum(eff) === undefined || !eff.isFinite()) eff = new ExpantaNum(1)
	return eff
}