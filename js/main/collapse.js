function getCadaverEffSoftcapStart() {
	let sc = new ExpantaNum(1/0);
	if (modeActive("hard")) sc = sc.div(100);
	if (modeActive("easy")) sc = sc.times(80);
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
	if (tmp.inf) if (tmp.inf.upgs.has("3;4")) eff = eff.times(INF_UPGS.effects["3;4"]())



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

function calcCollapseSCS(){
	tmp.collapse.sc = new ExpantaNum(LAYER_SC["collapse"]);
	if (tmp.pathogens && player.pathogens.unl) tmp.collapse.sc = tmp.collapse.sc.times(tmp.pathogens[9].eff());
	if (tmp.inf) tmp.collapse.sc = tmp.collapse.sc.times(tmp.inf.asc.perkEff(4));
}

function calcCollapseSacEff(){
	tmp.collapse.sacEff = new ExpantaNum(1);
	if (modeActive("hard")) tmp.collapse.sacEff = tmp.collapse.sacEff.div(1.4);
	if (modeActive("easy")) tmp.collapse.sacEff = tmp.collapse.sacEff.times(1.6);
}

function getIncineratorBulkCap() {
	let cap = new ExpantaNum(15)
	if (player.collapse && player.collapse.crematorium.unl) cap = cap.times(getRepCrUpgEffects("2"))
	return cap
}

function getIncineratorSpeed() {
	let speed = new ExpantaNum(1)
	if (player.collapse && player.collapse.crematorium.unl) speed = speed.times(getRepCrUpgEffects("1"))
	return speed
}

function getIncineratorMinBulk() {
	return player.collapse.cadavers.div(tmp.collapse.crematorium.incinerator.cadaverReq).floor()
		.min(player.collapse.crematorium.cremationFuel.div(tmp.collapse.crematorium.incinerator.cremationFuelReq).floor())
		.min(getIncineratorBulkCap())
}

function getIncineratorProcessReqDiscount() {
	let discount = new ExpantaNum(1)
	if (player.collapse && player.collapse.crematorium.unl) discount = discount.times(getRepCrUpgEffects("4"))
	return discount
}

function getCremationFuelGain() {
	let gain = player.collapse.cadavers.max(1e150).minus(1e150).div(1e150).root(10)
	if (player.collapse && player.collapse.crematorium.unl) gain = gain.times(getAshEffect().cremationFuel)
	return gain
}

function getAshGain() {
	let gain = new ExpantaNum(1)
	if (player.rank.gte(rankRewardReq[35])) gain = gain.times(getRankEffects("36"))
	if (player.collapse && player.collapse.crematorium.unl) gain = gain.times(getRepCrUpgEffects("3"))
	if (player.collapse && player.collapse.crematorium.unl) gain = gain.times(getRepCrUpgEffects("5"))
	if (hasNormCrUpg(1)) gain = gain.times(getNormCrUpgEffects("1"))
	if (player.tr.upgrades.includes(11) && !HCCBA("noTRU")) gain = gain.times(tr11Eff());
	if (tmp.inf) if (tmp.inf.upgs.has("2;1")) gain = gain.times( INF_UPGS.effects["2;1"]()["ashGain"] );
	return gain
}

function getAshEffect() {
	return {
		cadavers: player.collapse.crematorium.ash.plus(1).root(2),
		cremationFuel: player.collapse.crematorium.ash.plus(1).root(4)
	}
}

function repCrUpgConsumeAshes() {
	let ret = true
	if (tmp.ach[83].has) ret = false;
	return ret
}

function getRepCrUpgData(x) {
	let fp = getNativeRepCrUpgFP(x+"").times(getRepCrUpgFP(x+""))
	let cost
	let bulk
	if (x == 1) {
		cost = ExpantaNum.pow(
			EN.pow(3, 30),
			ExpantaNum.pow(
				31/30,
				player.collapse.crematorium.upgrades.repeatable[x].div(fp)
			)
		).div(EN.pow(3, 30)).times(10)
		bulk = player.collapse.crematorium.ash.times(EN.pow(3, 30)).div(10).max(1)
			.logBase(EN.pow(3, 30))
			.logBase(31/30)
			.times(fp).plus(1).floor()
	} else if (x == 2) {
		cost = ExpantaNum.pow(
			EN.pow(2.3, 35),
			ExpantaNum.pow(
				36/35,
				player.collapse.crematorium.upgrades.repeatable[x].div(fp)
			)
		).div(EN.pow(2.3, 35))
		.times(100)
		bulk = player.collapse.crematorium.ash.times(EN.pow(2.3, 35)).div(100).max(1)
			.logBase(EN.pow(2.3, 35))
			.logBase(36/35)
			.times(fp).plus(1).floor()
	} else if (x == 3) {
		cost = ExpantaNum.pow(
			EN.pow(5, 5),
			ExpantaNum.pow(
				6/5,
				player.collapse.crematorium.upgrades.repeatable[x].div(fp)
			)
		).div(EN.pow(5, 5))
		.times(1000)
		bulk = player.collapse.crematorium.ash.times(EN.pow(5, 5)).div(1000).max(1)
			.logBase(EN.pow(5, 5))
			.logBase(6/5)
			.times(fp).plus(1).floor()
	} else if (x == 4) {
		cost = ExpantaNum.pow(
			3,
			player.collapse.crematorium.upgrades.repeatable[x].div(fp).plus(1).pow(1.4)
		).div(3)
		.times(1e6)
		bulk = EN.logBase(player.collapse.crematorium.ash.times(3).div(1e6).max(1), 3)
			.root(1.4).minus(1).times(fp)
			.plus(1).floor()
	} else if (x == 5) {
		cost = ExpantaNum.pow(
			EN.pow(1e3, 12),
			ExpantaNum.pow(
				13/12,
				player.collapse.crematorium.upgrades.repeatable[x].div(fp)
			)
		).div(EN.pow(1e3, 12))
		.times(1e8)
		bulk = player.collapse.crematorium.ash.times(EN.pow(1e3, 12)).div(1e8).max(1)
			.logBase(EN.pow(1e3, 12))
			.logBase(13/12)
			.times(fp).plus(1).floor()
	} else if (x == 6) {
		cost = ExpantaNum.pow(
			EN.pow(10, 30),
			ExpantaNum.pow(
				31/30,
				player.collapse.crematorium.upgrades.repeatable[x].div(fp)
			)
		).div(EN.pow(10, 30))
		.times(1e28)
		bulk = player.collapse.crematorium.ash.times(EN.pow(10, 30)).div(1e28).max(1)
			.logBase(EN.pow(10, 30))
			.logBase(31/30)
			.times(fp).plus(1).floor()
	} else {
		cost = ExpantaNum.pow(
			EN.pow(3, 30),
			ExpantaNum.pow(
				31/30,
				player.collapse.crematorium.upgrades.repeatable[x].div(fp)
			)
		).div(EN.pow(3, 30)).times(1e30)
		bulk = player.collapse.crematorium.ash.times(EN.pow(3, 30)).div(1e30).max(1)
			.logBase(EN.pow(3, 30))
			.logBase(31/30)
			.times(fp).plus(1).floor()
	}
	return {cost: cost, bulk: bulk}
}

function getRepCrUpgEffBases(i) {
	switch (i+"") {
		case "1":
			return new ExpantaNum(2)
		case "2":
			return new ExpantaNum(2.5)
		case "4":
			return new ExpantaNum(1.5)
		case "6":
			return new ExpantaNum(0.025)
		default:
			return new EN(1)
	}
}

function getRepCrUpgEffPower(i) {
	switch (i+"") {
		default:
			return new EN(1)
	}
}

function getRepCrUpgEffects(i) {
	switch (i+"") {
		case "1": {
			return ExpantaNum.pow(getRepCrUpgEffBases("1"), player.collapse.crematorium.upgrades.repeatable[1])
		}
		case "2": {
			return ExpantaNum.pow(getRepCrUpgEffBases("2"), player.collapse.crematorium.upgrades.repeatable[2])
		}
		case "3": {
			return ExpantaNum.logBase(player.collapse.crematorium.ash.plus(10), 10)
				.root(2)
				.pow(player.collapse.crematorium.upgrades.repeatable[3])
		}
		case "4": {
			return ExpantaNum.pow(getRepCrUpgEffBases("4"), player.collapse.crematorium.upgrades.repeatable[4])
		}
		case "5": {
			return ExpantaNum.pow(
				EN.logBase(player.collapse.cadavers.plus(10), 10).root(2),
				player.collapse.crematorium.upgrades.repeatable[5]
			)
		}
		case "6": {
			return player.collapse.crematorium.upgrades.repeatable[6].times(getRepCrUpgEffBases("6")).plus(1)
		}
		default:
			return new EN(1)
	}
}

function getNativeRepCrUpgFP(a) {
	switch (a+"") {
		default:
			return new ExpantaNum(1)
	}
}

function getRepCrUpgFP(a) {
	switch (a+"") {
		default:
			return new ExpantaNum(1)
	}
}

function getNormCrUpgEffPower(s) {
	switch (s+"") {
		case "1": {
			let pow = new EN(1)
			if (hasNormCrUpg(3)) pow = pow.times(getNormCrUpgEffects("3"))
			return pow
		}
		default:
			return new ExpantaNum(1)
	}
}

function getNormCrUpgEffBases(s) {
	switch (s+"") {
		default:
			return new ExpantaNum(1)
	}
}

function getNormCrUpgEffects(s) {
	switch (s+"") {
		case "1": {
			let eff = EN.logBase(player.collapse.crematorium.ash.plus(10), 10)
			eff = eff.pow(getNormCrUpgEffPower("1"))
			return eff
		}
		case "2": {
			let eff = new ExpantaNum(1.05)
			eff = eff.pow(getNormCrUpgEffPower("2"))
			return eff
		}
		case "3": {
			let x = player.collapse.crematorium.ash
			return ExpantaNum.logBase(ExpantaNum.logBase(x.plus(1), 10).plus(1), 10).times(0.2).plus(1).pow(2.5)
		}
		default:
			return new ExpantaNum(1)
	}
}

function buyNormCrUpg(x) {
	if (!player.collapse.crematorium.upgrades.normal.includes(x) && player.collapse.crematorium.ash.gte(NORMAL_CREMATORIUM_UPGRADES[x].cost())) {
		player.collapse.crematorium.ash = player.collapse.crematorium.ash.minus(NORMAL_CREMATORIUM_UPGRADES[x].cost())
		player.collapse.crematorium.upgrades.normal.push(x)
	}
}

function hasNormCrUpg(x) {
	return player.collapse.crematorium.upgrades.normal.includes(x)
}

function removeNormCrUpg(x) {
	player.collapse.crematorium.upgrades.normal = player.collapse.crematorium.upgrades.normal.filter(item => item !== x)
}

function updateTempIncinerator() {
	if (!tmp.collapse.crematorium.incinerator) tmp.collapse.crematorium.incinerator = {}
	tmp.collapse.crematorium.incinerator.bulkCap = getIncineratorBulkCap()
	tmp.collapse.crematorium.incinerator.speed = getIncineratorSpeed()
	tmp.collapse.crematorium.incinerator.cadaverReq = new EN(1e150)
	tmp.collapse.crematorium.incinerator.cremationFuelReq = new EN(10)

	tmp.collapse.crematorium.incinerator.cadaverReq = tmp.collapse.crematorium.incinerator.cadaverReq.div(getIncineratorProcessReqDiscount())
	tmp.collapse.crematorium.incinerator.cremationFuelReq = tmp.collapse.crematorium.incinerator.cremationFuelReq.div(getIncineratorProcessReqDiscount())


	if (!tmp.collapse.crematorium.incinerator.addProcess) tmp.collapse.crematorium.incinerator.addProcess = function (amount, buyMax) {
		let cReq = tmp.collapse.crematorium.incinerator.cadaverReq
		let fReq = tmp.collapse.crematorium.incinerator.cremationFuelReq
		let maxAmount
		if (buyMax == true) {
			maxAmount = new ExpantaNum(1/0)
		} else {
			maxAmount = amount
		}
		if (getIncineratorMinBulk().gt(0)) {
			let lastPendingProcess = player.collapse.crematorium.incinerator.pendingProcess
			player.collapse.crematorium.incinerator.pendingProcess = player.collapse.crematorium.incinerator.pendingProcess.plus(
				getIncineratorMinBulk().min(maxAmount)
			).min(getIncineratorBulkCap())

			player.collapse.cadavers = player.collapse.cadavers.minus(
				cReq.times(getIncineratorMinBulk().min(
					EN.floor(getIncineratorBulkCap().minus(lastPendingProcess))
				).min(maxAmount))
			)

			player.collapse.crematorium.cremationFuel = player.collapse.crematorium.cremationFuel.minus(
				fReq.times(getIncineratorMinBulk().min(
					EN.floor(getIncineratorBulkCap().minus(lastPendingProcess))
				).min(maxAmount))
			)/*
			console.log(getIncineratorMinBulk().min(
				EN.floor(getIncineratorBulkCap().minus(lastPendingProcess))
			))*/
		}
	}

	if (!tmp.collapse.crematorium.incinerator.cancelProcess) tmp.collapse.crematorium.incinerator.cancelProcess = function () {
		let cReq = tmp.collapse.crematorium.incinerator.cadaverReq
		let fReq = tmp.collapse.crematorium.incinerator.cremationFuelReq
		let lastPendingProcess = player.collapse.crematorium.incinerator.pendingProcess
		player.collapse.crematorium.incinerator.pendingProcess = new ExpantaNum(0)

		player.collapse.cadavers = player.collapse.cadavers.plus(
			cReq.times(lastPendingProcess)
		)

		player.collapse.crematorium.cremationFuel = player.collapse.crematorium.cremationFuel.plus(
			fReq.times(lastPendingProcess)
		)
	}
}

function updateTempCrematorium() {
	if (!tmp.collapse.crematorium) tmp.collapse.crematorium = {}
	tmp.collapse.crematorium.ashGain = getAshGain()
	tmp.collapse.crematorium.lrm = new ExpantaNum(1)

	if (!tmp.collapse.crematorium.upgBuy) tmp.collapse.crematorium.upgBuy = function (n, buyMax=false) {
		
		if (buyMax == false) {
			if ( player.collapse.crematorium.ash.gte(getRepCrUpgData(n).cost) ) {
				if (repCrUpgConsumeAshes()) player.collapse.crematorium.ash = player.collapse.crematorium.ash.minus(getRepCrUpgData(n).cost)
				player.collapse.crematorium.upgrades.repeatable[n] = player.collapse.crematorium.upgrades.repeatable[n].add(1)
			}
		} else if (buyMax == true) {
			if ( player.collapse.crematorium.ash.gte(getRepCrUpgData(n).cost) ) {
				let tempCost = getRepCrUpgData(n).cost
				player.collapse.crematorium.upgrades.repeatable[n] = player.collapse.crematorium.upgrades.repeatable[n].max(getRepCrUpgData(n).bulk.floor()).max(player.collapse.crematorium.upgrades.repeatable[n].plus(1))
				if (repCrUpgConsumeAshes()) {
					player.collapse.crematorium.upgrades.repeatable[n] = player.collapse.crematorium.upgrades.repeatable[n].minus(1)
					player.collapse.crematorium.ash = player.collapse.crematorium.ash.minus(getRepCrUpgData(n).cost)
					player.collapse.crematorium.upgrades.repeatable[n] = player.collapse.crematorium.upgrades.repeatable[n].add(1)
				}
			}
		}
	}

	if (!tmp.collapse.crematorium.maxAll) tmp.collapse.crematorium.maxAll = function () {
		for (let i = 0; i < RCRU_AMT; i++) {
			tmp.collapse.crematorium.upgBuy(i+1, true)
		}
	}
	updateTempIncinerator()

}

function crematoriumTick(diff) {
	if (player.collapse.crematorium.unl) {
		player.collapse.crematorium.cremationFuel = player.collapse.crematorium.cremationFuel.plus(
				adjustGen(getCremationFuelGain(), "cremationFuel").times(diff)
			).max(0);
			
		if (player.collapse.crematorium.incinerator.pendingProcess.gt(0)) {
			player.collapse.crematorium.incinerator.timesProcessed = player.collapse.crematorium.incinerator.timesProcessed
				.plus(
					getIncineratorSpeed().times(0.1).times(diff)
				).max(0)
				
		} else {
			player.collapse.crematorium.incinerator.timesProcessed = new ExpantaNum(0)
		}
		if (
			player.collapse.crematorium.incinerator.timesProcessed.gte(
				EN.min(player.collapse.crematorium.incinerator.pendingProcess, 1)
			)
		) {//1 second
			let lastPendingProcess = player.collapse.crematorium.incinerator.pendingProcess
			player.collapse.crematorium.incinerator.pendingProcess = player.collapse.crematorium.incinerator.pendingProcess.minus(
				EN.floor(
					player.collapse.crematorium.incinerator.timesProcessed
					.plus(EN.minus(1, lastPendingProcess.min(1)))
				)
				.min(lastPendingProcess)
			)
			player.collapse.crematorium.ash = player.collapse.crematorium.ash.plus(
				EN.floor(
					player.collapse.crematorium.incinerator.timesProcessed
					.plus(EN.minus(1, lastPendingProcess.min(1)))
				)
				.min(lastPendingProcess).times(getAshGain())
			)
			player.collapse.crematorium.incinerator.timesProcessed = player.collapse.crematorium.incinerator.timesProcessed.minus(
				EN.floor(
					player.collapse.crematorium.incinerator.timesProcessed
					.plus(EN.minus(1, lastPendingProcess.min(1)))
				)
				.min(lastPendingProcess)
			)

		}
	}
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
	calcCollapseSCS()
	tmp.collapse.lrm = new ExpantaNum(1);
	if (modeActive("hard")) tmp.collapse.lrm = tmp.collapse.lrm.div(50);
	tmp.collapse.can = player.distance.gte(ExpantaNum.mul(LAYER_REQS["collapse"][1], tmp.collapse.lrm));

	if (nerfActive("noCadavers")) tmp.collapse.can = false;
	tmp.collapse.layer = new Layer("collapse", tmp.collapse.can, "normal", true);
	tmp.collapse.doGain = function () {
		player.collapse.cadavers = player.collapse.cadavers.plus(tmp.collapse.layer.gain);
	};
	calcCollapseSacEff()

	updateTempCrematorium()
	
}

function collapseMile1Eff() {
	return new ExpantaNum(100).div(player.distance.plus(1).pow(0.06989).plus(1).min(50))
}

function collapseMile5Eff() {
	let eff = player.tr.cubes.plus(1).log10().plus(1).log10().plus(1);
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

	if (player.rank.gte(rankRewardReq[34])) mult = mult.times(getRankEffects("35"))
	if (player.rank.gte(rankRewardReq[37])) mult = mult.times(getRankEffects("38"))

	if (player.collapse && player.collapse.crematorium.unl) mult = mult.times(getAshEffect().cadavers)

	if (hasCollapseMilestone(5)) mult = mult.times(collapseMile5Eff());
	if (hasCollapseMilestone(10)) mult = mult.times(collapseMile10Eff());
	if (tmp.ach[38].has) mult = mult.times(2);
	if (tmp.ach[65].has) mult = mult.times(1.4);
	if (tmp.ach[131].has) mult = mult.times(2);
	//if (player.tr.upgrades.includes(14) && !HCCBA("noTRU")) mult = mult.times(tr14Eff()["cd"]);
	if (player.tr.upgrades.includes(13) && !HCCBA("noTRU")) mult = mult.times(tr13Eff()["cadaverGain"])
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