function getCadaverEffSoftcapStart() {
	let sc = new ExpantaNum(1e12);
	if (modeActive("hard")) sc = sc.div(100);
	if (modeActive("easy")) sc = sc.times(80);
	//if (tmp.pathogens && player.pathogens.unl) sc = sc.times(tmp.pathogens[10].eff());
	if (tmp.inf) sc = sc.times(tmp.inf.asc.perkEff(3));
	return sc;
}

function getCadaverEffSoftcapPower() {
	let pow = new ExpantaNum(1);
	if (tmp.inf) if (tmp.inf.upgs.has("8;5")) pow = pow.times(0.2);
	return pow;
}

function getCadaverEff() {
	let cadavers = player.collapse.cadavers
	let scs = getCadaverEffSoftcapStart()
	let scp = getCadaverEffSoftcapPower()
	let eff = cadavers.plus(1).pow(1.4)
	eff = eff.times(
		ExpantaNum.logBase(cadavers.plus(1), 10).plus(1).pow(2)
	)
	eff = eff.pow(
		tmp.elm && player.elementary.times.gt(0) ? tmp.elm.ferm.leptonR("muon").max(1) : 1
	);
	if (player.elementary.sky.unl && tmp.elm) eff = eff.pow(tmp.elm.sky.pionEff[4])
	if (player.elementary.sky.unl && tmp.elm) eff = eff.pow(tmp.elm.sky.pionEff[12])
	if (player.elementary.entropy.upgrades.includes(35) && modeActive("extreme")) eff = eff.pow(100);
	return eff;
}

function sacrificeToLifeEssence() {
	if (player.collapse.cadavers.eq(0) || nerfActive("noLifeEssence")) return;
	player.collapse.lifeEssence = player.collapse.lifeEssence.plus(
		player.collapse.cadavers.times(tmp.collapse.sacEff).max(1)
	);
	if (tmp.inf ? !tmp.inf.upgs.has("2;4") : true) player.collapse.cadavers = new ExpantaNum(0);
}

function hasCollapseMilestone(n) {
	return player.collapse.lifeEssence.gte(ESSENCE_MILESTONES[n].req);
}

function calcCollpaseSCS(){
	tmp.collapse.sc = new ExpantaNum(LAYER_SC["collapse"]);
	if (tmp.pathogens && player.pathogens.unl) tmp.collapse.sc = tmp.collapse.sc.times(tmp.pathogens[9].eff());
	if (tmp.inf) tmp.collapse.sc = tmp.collapse.sc.times(tmp.inf.asc.perkEff(4));
}

function calcCollapseSacEff(){
	tmp.collapse.sacEff = new ExpantaNum(1);
	if (modeActive("hard")) tmp.collapse.sacEff = tmp.collapse.sacEff.div(1.4);
	if (modeActive("easy")) tmp.collapse.sacEff = tmp.collapse.sacEff.times(1.6);
}

function updateTempCollapse() {
	if (!tmp.collapse) {
		tmp.collapse = {};
		tmp.collapse.onReset = function (prev) {
			if (hasCollapseMilestone(3)) player.rockets = new ExpantaNum(10);
			if (hasCollapseMilestone(4)) player.rf = new ExpantaNum(1);
			if (hasCollapseMilestone(7)) player.tr.upgrades = prev.tr.upgrades;
			tmp.inf.derv.resetDervs();
		};
	}
	calcCollpaseSCS()
	tmp.collapse.lrm = new ExpantaNum(1);
	if (modeActive("hard")) tmp.collapse.lrm = tmp.collapse.lrm.div(50);
	tmp.collapse.can = player.distance.gte(ExpantaNum.mul(LAYER_REQS["collapse"][1], tmp.collapse.lrm));
	if (nerfActive("noCadavers")) tmp.collapse.can = false;
	tmp.collapse.layer = new Layer("collapse", tmp.collapse.can, "normal", true);
	tmp.collapse.doGain = function () {
		player.collapse.cadavers = player.collapse.cadavers.plus(tmp.collapse.layer.gain);
	};
	calcCollapseSacEff()
}

function collapseMile1Eff() {
	return new ExpantaNum(100).div(player.distance.plus(1).pow(0.06989).plus(1).min(50))
}

function collapseMile5Eff() {
	let eff = player.tr.cubes.plus(1).log10().plus(1).log10().plus(1);
	if (eff.gte(2.5)) eff = eff.logBase(2.5).plus(1.5)
	return eff
}

function collapseMile6Eff() {
	return ExpantaNum.logBase(player.rockets.plus(1), 10).plus(1).pow(2)
}

function collapseMile8Eff() {
	let eff = (tmp.timeSpeed ? tmp.timeSpeed : new ExpantaNum(1));
	return ExpantaNum.logBase(eff.plus(1), 1.3).max(1).pow(3)
}

function collapseMile10Eff() {
	let exp = 8
	if (modeActive("extreme")) exp = 3
	let eff = player.collapse.lifeEssence.plus(1).log10().plus(1).sqrt().pow(exp);
	if (hasDE(5)) if ((player.elementary.theory.tree.upgrades[27]||new ExpantaNum(0)).gte(1)) {
		eff = player.collapse.lifeEssence.plus(1).pow(0.1)
		if (eff.gte(40)) eff = eff.pow(0.2).times(Math.pow(40, 0.8))
	}
	return eff
}

function getCadaverGainMult() {
	let mult = new ExpantaNum(1);
	if (hasCollapseMilestone(5)) mult = mult.times(collapseMile5Eff());
	if (hasCollapseMilestone(10)) mult = mult.times(collapseMile10Eff());
	if (tmp.ach[38].has) mult = mult.times(2);
	if (tmp.ach[65].has) mult = mult.times(1.4);
	if (tmp.ach[131].has) mult = mult.times(2);
	if (player.tr.upgrades.includes(14) && !HCCBA("noTRU")) mult = mult.times(tr14Eff()["cd"]);
	if (tmp.pathogens && player.pathogens.unl) mult = mult.times(tmp.pathogens[6].eff());
	if (tmp.inf) if (tmp.inf.upgs.has("3;2")) mult = mult.times(INF_UPGS.effects["3;2"]()["cadavers"]);
	if (tmp.collapse) if (modeActive("extreme") && (tmp.collapse.layer.gain.gte(10) || (tmp.clghm && tmp.collapse.layer.gain.gte(5)))) {
		mult = mult.div(2);
		tmp.clghm = true;
	}
	if (modeActive("extreme") && FCComp(5)) mult = mult.times(ExpantaNum.pow(2, player.furnace.upgrades[4].times(tmp.fn ? tmp.fn.upgPow : 1)))
	if (tmp.ach[68].has && modeActive("extreme")) mult = mult.times(5);
	if (tmp.collapse) if (modeActive("easy")) mult = mult.times(3);
	if (tmp.elm) if (player.elementary.times.gt(0)) mult = mult.times(tmp.elm.ferm.quarkR("down").max(1));
	return mult
}