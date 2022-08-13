function ach25Eff() {
	return ExpantaNum.logBase(player.tier.plus(1), 2).times(0.02).plus(1).pow(10)
}

function ach46Eff(type) {
	if (type == "intelligence" || type == "Intelligence" || type == "Int") {
		return EN.logBase(player.automation.scraps.plus(3), 3).pow(1.25)
	} else if (type == "Max Velocity" || type == "max velocity" || type == "maxvel" || type == "Vmax" || type == "maxVel") {
		return player.automation.scraps.times(1/100).plus(1).pow(3)
	}
}

function ach63SC() {
	let sc = new ExpantaNum(1 / 0)
	if (tmp.inf) if (tmp.inf.upgs.has("8;4")) sc = sc.times(player.inf.pantheon.purge.power.plus(1).pow(17))
	return sc
}

function ach63Pow() {
	let pow = new ExpantaNum(1)
	if (tmp.ach) if (tmp.ach[74].has) pow = pow.times(1.25)
	if (modeActive("easy")) pow = pow.times(1.25)
	if (player.tr.upgrades.includes(24) && !HCCBA("noTRU") && modeActive("extreme")) pow = pow.times(1.75)
	if (player.rank.gte(rankRewardReq[32])) pow = pow.times(getRankEffects("33"))
	return pow
}

function ach63Eff() {
	let sc = ach63SC()
	let pow = ach63Pow()
	let eff = tmp.timeSpeed 
		? EN.pow(EN.logBase(tmp.timeSpeed.plus(1), 10).root(6), 10).pow(pow).root(4)
		: new ExpantaNum(1)
	if (player.elementary.sky.unl && tmp.elm) eff = eff.pow(tmp.elm.sky.pionEff[9])
	return eff
}

function ach75Eff() {
	let eff = ExpantaNum.logBase(player.dc.fluid.plus(10), 10).pow(2)
	return eff
}

function ach112Pow() {
	let pow = new ExpantaNum(1)
	if (tmp.inf) if (tmp.inf.upgs.has("4;10")) pow = pow.times(INF_UPGS.effects["4;10"]().max(1))
	return pow
}

function ach112Eff() {
	let pow = ach112Pow()
	let eff = tmp.timeSpeed ? tmp.timeSpeed.log10().plus(1).log10().plus(1).pow(0.1).pow(pow) : new ExpantaNum(1)
	if (tmp.ach) if (tmp.ach[123].has) eff = tmp.timeSpeed ? tmp.timeSpeed.log10().plus(1).pow(0.02).pow(pow).max(eff) : new ExpantaNum(1)
	if (eff.gte(1e160)) eff = eff.log10().pow(72.6).min(eff)
	return eff
}

function ach152Eff() {
	let eff = new ExpantaNum(1)
	if (tmp.ach) if (tmp.ach[152].has) eff = eff.times(player.elementary.hc.best.plus(1).pow(0.15));
	if (player.elementary.entropy.upgrades.includes(26) && tmp.elm.entropy) eff = eff.pow(tmp.elm.entropy.upgEff[26]);
	if (modeActive("extreme+hikers_dream")) {
		if (tmp.ach[196].has && tmp.mlt) eff = eff.times(tmp.mlt.quilts[3].eff2)
	}
	return eff;
}
