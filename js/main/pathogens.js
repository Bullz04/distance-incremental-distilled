function updatePathogensGain(){
	tmp.pathogens.st = new ExpantaNum(1 / 0);
	tmp.pathogens.gainLEpart = player.collapse.lifeEssence.plus(1).log10().plus(1).pow(0.1).sub(1);
	tmp.pathogens.gainPTHpart = player.pathogens.amount.plus(1).root(4);
	
	tmp.pathogens.gain = tmp.pathogens.gainLEpart.times(tmp.pathogens.gainPTHpart);
	//if (tmp.pathogens.gain.gte(tmp.pathogens.st))
	//	tmp.pathogens.gain = tmp.pathogens.gain.sqrt().times(tmp.pathogens.st.sqrt());
	tmp.pathogens.baseGain = new ExpantaNum(tmp.pathogens.gain);

	if (player.rank.gte(rankRewardReq[30])) tmp.pathogens.gain = tmp.pathogens.gain.times(getRankEffects("31"))
	
	if (tmp.ach) if (tmp.ach[63].has) tmp.pathogens.gain = tmp.pathogens.gain.times(ach63Eff());
	if (tmp.ach) if (tmp.ach[68].has) {
		tmp.pathogens.gain = tmp.pathogens.gain.times(2.5);
		if (modeActive("hard+hikers_dream")) tmp.pathogens.gain = tmp.pathogens.gain.times(tmp.hd.enerUpgs[3])
	}
	if (tmp.ach[131].has) tmp.pathogens.gain = tmp.pathogens.gain.times(2);
	if (tmp.ach[87].has && modeActive("hard+hikers_dream")) {
		let x = player.tr.cubes.div("1e750").pow(.2).plus(1)
		if (x.gt(100)) x = x.log10().times(50)
		tmp.pathogens.gain = tmp.pathogens.gain.times(x)
		let x2 = player.tr.cubes.div("1e800").pow(.2).plus(1).min(1e3)
		tmp.pathogens.gain = tmp.pathogens.gain.times(x2)
	}
	if (modeActive("hard")) tmp.pathogens.gain = tmp.pathogens.gain.div(3);
	if (modeActive("easy")) tmp.pathogens.gain = tmp.pathogens.gain.times(2.4);
	if (tmp.pathogens && player.pathogens.unl) tmp.pathogens.gain = tmp.pathogens.gain.times(tmp.pathogens[5].eff());
	if (tmp.pathogens && player.pathogens.unl) tmp.pathogens.gain = tmp.pathogens.gain.times(tmp.pathogens[10].eff())
	if (player.tr.upgrades.includes(25) && modeActive("extreme")) tmp.pathogens.gain = tmp.pathogens.gain.times(5)
	if (player.tr.upgrades.includes(12) && !HCCBA("noTRU")) tmp.pathogens.gain = tmp.pathogens.gain.times(tr12Eff())
	if (tmp.elm)
		if (player.elementary.times.gt(0))
			tmp.pathogens.gain = tmp.pathogens.gain.times(tmp.elm.ferm.quarkR("strange").max(1));
	if (tmp.pathogens && player.pathogens.unl) tmp.pathogens.gain = tmp.pathogens.gain.times(tmp.pathogens[8].eff());
	if (tmp.elm) tmp.pathogens.gain = tmp.pathogens.gain.times(tmp.elm.bos.photonEff(1).max(1));
	if (tmp.inf) if (tmp.inf.upgs.has("3;1")) tmp.pathogens.gain = tmp.pathogens.gain.times(INF_UPGS.effects["3;1"]()["effect"]);
	if (tmp.inf) if (tmp.inf.upgs.has("2;1")) tmp.pathogens.gain = tmp.pathogens.gain.times( INF_UPGS.effects["2;1"]()["pathogenGain"] );
	if (tmp.inf) if (tmp.inf.upgs.has("5;10")) tmp.pathogens.gain = tmp.pathogens.gain.times(INF_UPGS.effects["5;10"]().pth)
	if (tmp.inf) if (tmp.inf.upgs.has("10;5")) tmp.pathogens.gain = tmp.pathogens.gain.times(INF_UPGS.effects["10;5"]())
	if (tmp.inf) if (tmp.inf.upgs.has("10;10")) tmp.pathogens.gain = tmp.pathogens.gain.times(INF_UPGS.effects["10;10"]())
	if (tmp.fn && modeActive("extreme")) tmp.pathogens.gain = tmp.pathogens.gain.times(tmp.fn.enh.moltBrEff||1)
	if (player.elementary.foam.unl && tmp.elm) tmp.pathogens.gain = tmp.pathogens.gain.times(tmp.elm.qf.boost24)
}

function updateTempPathogens() {
	if (!tmp.pathogens) tmp.pathogens = {};
	tmp.pathogens.lrm = new ExpantaNum(1);
	if (modeActive("hard")) tmp.pathogens.lrm = tmp.pathogens.lrm.div(5);
	if (modeActive("extreme")) tmp.pathogens.lrm = tmp.pathogens.lrm.times(20);

	tmp.pathogens.upgPow = new ExpantaNum(1);
	if (modeActive("extreme") && player.tr.upgrades.includes(27) && !HCCBA("noTRU"))
		tmp.pathogens.upgPow = tmp.pathogens.upgPow.plus(
			TR_UPGS[27].current()
		);
	if (modeActive("hard")) tmp.pathogens.upgPow = tmp.pathogens.upgPow.times(0.98);
	if (modeActive("easy")) tmp.pathogens.upgPow = tmp.pathogens.upgPow.times(1.089);
	if (modeActive('extreme')) tmp.pathogens.upgPow = tmp.pathogens.upgPow.times(0.8);
	if (tmp.inf) if (tmp.inf.upgs.has("5;2")) tmp.pathogens.upgPow = tmp.pathogens.upgPow.plus(0.05);
	if (tmp.inf) if (tmp.inf.upgs.has("6;3")) tmp.pathogens.upgPow = tmp.pathogens.upgPow.plus(0.025);
	if (tmp.inf)
		if (tmp.inf.stadium.completed("drigganiz"))
			tmp.pathogens.upgPow = tmp.pathogens.upgPow.plus(STADIUM_REWARDS.effects.drigganiz());
	if (tmp.inf)
		if (tmp.inf.upgs.has("9;5"))
			tmp.pathogens.upgPow = tmp.pathogens.upgPow.plus(ExpantaNum.mul(0.01, player.inf.endorsements));
	if (tmp.ach) if (tmp.ach[125].has) tmp.pathogens.upgPow = tmp.pathogens.upgPow.plus(0.05);
	if (extremeStadiumComplete("quantron")) tmp.pathogens.upgPow = tmp.pathogens.upgPow.plus(EXTREME_STADIUM_DATA.quantron.effect());
	if (tmp.elm)
		if (player.elementary.times.gt(0))
			tmp.pathogens.upgPow = tmp.pathogens.upgPow.plus(tmp.elm.ferm.leptonR("netrion"));
	if (tmp.inf) if (tmp.inf.upgs.has("9;10")) tmp.pathogens.upgPow = tmp.pathogens.upgPow.plus(INF_UPGS.effects["9;10"]().sub(1).max(0))
	if (player.elementary.theory.tree.unl) tmp.pathogens.upgPow = tmp.pathogens.upgPow.plus(TREE_UPGS[13].effect(player.elementary.theory.tree.upgrades[13]||0))
	if (hasDE(5)) if ((player.elementary.theory.tree.upgrades[25]||new ExpantaNum(0)).gte(1)) tmp.pathogens.upgPow = tmp.pathogens.upgPow.plus(1.5)

	if (extremeStadiumActive("aqualon", 3)) tmp.pathogens.upgPow = tmp.pathogens.upgPow.div(player.rank.plus(1).pow(0.05).times(1.01))
	if (extremeStadiumActive("cranius", 4)) tmp.pathogens.upgPow = tmp.pathogens.upgPow.div(player.tier.plus(1).pow(0.1).times(1.02))
	if (nerfActive("weakPathogenUpgs")) tmp.pathogens.upgPow = tmp.pathogens.upgPow.div(10);
	if (extremeStadiumActive("flamis", 3)) tmp.pathogens.upgPow = tmp.pathogens.upgPow.div(2);
	if (extremeStadiumActive("nullum", 3)) tmp.pathogens.upgPow = tmp.pathogens.upgPow.times(0.8);
	if (extremeStadiumActive("quantron")) tmp.pathogens.upgPow = tmp.pathogens.upgPow.times(0.9);

	if (hasNormCrUpg(2)) tmp.pathogens.upgPow = tmp.pathogens.upgPow.times(getNormCrUpgEffects("2"))
	//if (tmp.inf) if (tmp.inf.upgs.has("3;3")) tmp.pathogens.upgPow = tmp.pathogens.upgPow.times(1.1);
	
	if (nerfActive("noPathogenUpgs")) tmp.pathogens.upgPow = new ExpantaNum(0);
	if (player.elementary.sky.unl && tmp.elm) tmp.pathogens.upgPow = tmp.pathogens.upgPow.times(tmp.elm.sky.pionEff[2])
	if (!tmp.pathogens.extra) tmp.pathogens.extra = function (n) {
		let extra = new ExpantaNum(0);
		if (tmp.inf) if (tmp.inf.asc) extra = extra.plus(tmp.inf.asc.perkEff(2));
		if (n == 5 && tmp.pathogens[13]) extra = extra.plus(pathogenUpg13Eff());
		return extra;
	};
	if (!tmp.pathogens.buy) tmp.pathogens.buy = function (n, manual=false) {
		if (PTH_UPGS[n].unl ? !PTH_UPGS[n].unl() : false) return;
		let cost;
		if (manual) cost = getPathogenUpgData(n).cost
		else cost = tmp.pathogens[n].cost
		if (player.pathogens.amount.lt(cost)) return;
		if (!tmp.ach[88].has) player.pathogens.amount = player.pathogens.amount.sub(cost);
		player.pathogens.upgrades[n] = player.pathogens.upgrades[n].plus(1);
	};
	if (!tmp.pathogens.eff) tmp.pathogens.eff = function (n) {
		let fp = new ExpantaNum(1);
		if (tmp.inf) if (tmp.inf.upgs.has("8;8")) fp = fp.times(INF_UPGS.effects["8;8"]());
		let bought = player.pathogens.upgrades[n].plus(tmp.pathogens.extra(n));
		if (bought.gte(getPathogenUpgSoftcapStart(n))) bought = bought.sqrt().times(getPathogenUpgSoftcapStart(n).sqrt());
		bought = bought.times(tmp.pathogens.upgPow);
		if (PTH_UPGS[n].unl ? !PTH_UPGS[n].unl() : false) bought = new ExpantaNum(0);
		//let sPos = tmp.inf ? (tmp.inf.upgs.has("3;8") && n >= 6 && n <= 10) : false //3;8
		switch(n) {
			case 1: {
				let ret = bought.times(getPathogenUpgradeBases("1")).plus(1)
				//if (ret.gte(2e3) && !(tmp.elm?tmp.elm.bos.hasHiggs("0;1;4"):false)) ret = ret.sqrt().times(Math.sqrt(2e3));//if you have the upgrade, this line will not work
				//if (tmp.elm) if (tmp.elm.bos.hasHiggs("0;1;4")) ret = ret.times(4)
				//if (player.elementary.sky.unl && tmp.elm) ret = ret.times(tmp.elm.sky.pionEff[11])
				return ret;
				break;//vscode doesn't need break in this case, blame jacorb
			}
			case 2: {
				let ret = ExpantaNum.logBase(player.collapse.cadavers.plus(69), 69).pow(bought).pow(3)//whoops
				return ret;
				break;//vscode doesn't need break in this case, blame jacorb
			}
			case 3: {
				let ret = ExpantaNum.logBase(player.collapse.cadavers.plus(69), 69).pow(bought).pow(1.5)
				return ret;
				break;//vscode doesn't need break in this case, blame jacorb
			}
			case 4:
				return player.pathogens.amount.plus(1).pow(1.5).pow(bought);
				break;//vscode doesn't need break in this case, blame jacorb
			case 5: {
				let exp = new ExpantaNum(1);
				if (tmp.inf) if (tmp.inf.upgs.has("7;5")) exp = exp.times(INF_UPGS.effects["7;5"]());
				let eff = ExpantaNum.pow(getPathogenUpgradeBases("5"), bought).pow(exp)
				return eff;
				break;
			}
			case 6: {
				let eff = ExpantaNum.logBase(player.collapse.lifeEssence.plus(10), 10).pow(bought)
				return eff
				break;
			}
			case 7: {
				let mainEff = bought.times(getPathogenUpgradeBases("7")).plus(1)
				return mainEff
				break;
			}
			case 8: {
				let mainEff = bought.times(getPathogenUpgradeBases("8")).plus(1).pow(getPathogenUpgPlusPow("8"))
				return mainEff
				break;
			}
				
			case 9: 
				return bought.times(getPathogenUpgradeBases("9")).plus(1).pow(getPathogenUpgPlusPow("9"));
				break;
			case 10: 
				return EN.logBase(player.pathogens.amount.plus(10), 10).pow(bought)
				break;
			case 11: 
				return player.pathogens.amount.plus(1).times(10).slog(10).times(bought.sqrt().times(2.5));
				break;
			case 12: 
				return player.rf.plus(1).log10().plus(1).log10().times(bought.cbrt().times(1.5));
				break;
			case 13: 
				return ExpantaNum.mul(2, bought);
				break;
			case 14: 
				return ExpantaNum.sub(1, ExpantaNum.div(1, player.dc.cores.plus(1).log10().times(bought).plus(1)));
				break;
			case 15: 
				return ExpantaNum.sub(1, ExpantaNum.div(1, bought.plus(1).log10().plus(1).pow(0.1)));
				break;
		}
		return undefined
	};
	if (!tmp.pathogens.disp) tmp.pathogens.disp = function (n) {
		let eff = tmp.pathogens.eff(n);
		if (n == 1) return "^" + showNum(eff);
		else if (n == 2) return "x" + showNum(eff);
		else if (n == 3) return "x" + showNum(eff);
		else if (n == 4) return "x" + showNum(eff);
		else if (n == 5) return "x" + showNum(eff);
		else if (n == 6) return "x" + showNum(eff);
		else if (n == 7) return "x" + showNum(eff);
		else if (n == 8) return "x" + showNum(eff);
		else if (n == 9) return "^" + showNum(eff);
		else if (n == 10) return "x" + showNum(eff);
		else if (n == 11 || n == 12) return showNum(eff) + " later";
		else if (n == 13) return "+" + showNum(eff) + " Levels";
		else if (n == 14 || n == 15) return showNum(eff.times(100)) + "% weaker";
		else return "???";
	};
	for (let i = 1; i <= PTH_AMT; i++) {//buying
		if (!tmp.pathogens[i]) tmp.pathogens[i] = {};
		let data = getPathogenUpgData(i)
		tmp.pathogens[i].cost = data.cost
		tmp.pathogens[i].bulk = data.bulk
		if (!tmp.pathogens[i].extra) tmp.pathogens[i].extra = function() { return tmp.pathogens.extra(i) }
		if (!tmp.pathogens[i].buy) tmp.pathogens[i].buy = function(manual=false) { tmp.pathogens.buy(i, manual) }
		if (!tmp.pathogens[i].eff) tmp.pathogens[i].eff = function() { return tmp.pathogens.eff(i) }
		if (!tmp.pathogens[i].disp) tmp.pathogens[i].disp = function() { return tmp.pathogens.disp(i) }
	}
	if (!tmp.pathogens.maxAll) tmp.pathogens.maxAll = function () {
		for (let i = 1; i <= PTH_AMT; i++) {
			if (PTH_UPGS[i].unl ? !PTH_UPGS[i].unl() : false) continue;
			if (player.pathogens.amount.lt(tmp.pathogens[i].cost)) continue;
			player.pathogens.upgrades[i] = player.pathogens.upgrades[i].max(
				tmp.pathogens[i].bulk.floor().max(player.pathogens.upgrades[i].plus(1))
			);
			if (!tmp.ach[88].has) player.pathogens.amount = player.pathogens.amount.sub(tmp.pathogens[i].cost);
		}
	};
	updatePathogensGain()
}

function getNativePathogenUpgFP(a) {
	switch (a+"") {
		case "1":
			return new ExpantaNum(4)
		case "8":
			return new ExpantaNum(2.25)
		default:
			return new ExpantaNum(1)
	}
}

function getPathogenUpgFP(a) {
	switch (a+"") {
		case "2": {
			let fp = new ExpantaNum(1)
			if (tmp.dc) fp = fp.times(tmp.dc.coreEff)
			return fp
		}
		case "3": {
			let fp = new ExpantaNum(1)
			if (tmp.dc) fp = fp.times(tmp.dc.coreEff)
			return fp
		}
		case "4": {
			let fp = new ExpantaNum(1)
			if (tmp.dc) fp = fp.times(tmp.dc.coreEff)
			return fp
		}
		case "5": {
			let fp = new ExpantaNum(1)
			if (player.rank.gte(rankRewardReq[33])) fp = fp.times(getRankEffects("34"))
			if (tmp.dc) fp = fp.times(tmp.dc.coreEff)
			return fp
		}
		case "6": {
			let fp = new ExpantaNum(1)
			if (tmp.dc) fp = fp.times(tmp.dc.coreEff)
			return fp
		}
		case "8": {
			let fp = new ExpantaNum(1)
			if (player.rank.gte(rankRewardReq[33])) fp = fp.times(getRankEffects("34"))
			return fp
		}
		default:
			return new EN(1)
	}
}

function getPathogenUpgData(i) {
	let upg = PTH_UPGS[i];
	let costPow = (upg.pow !== undefined)?upg.pow:new ExpantaNum(1)
	let costExpBase = upg.expBase;
	let start = upg.start.div((upg.expBase)?upg.expBase:1)
	let fp = getNativePathogenUpgFP(i).times(getPathogenUpgFP(i))

	let cost = ExpantaNum.pow(
		upg.inc,
		player.pathogens.upgrades[i].div(fp).pow(costPow)
	).times(upg.start)
	let bulk = player.pathogens.amount.div(upg.start).max(1).logBase(upg.inc).root(costPow).times(fp).floor().add(1);
	
	if (upg.expBase !== undefined && upg.expBase.gt(1)) {
		cost = ExpantaNum.pow(
			costExpBase,
			ExpantaNum.pow(
				upg.inc,
				player.pathogens.upgrades[i].div(fp).pow(costPow)
			)
		).times(start)
		bulk = ExpantaNum.logBase(
			ExpantaNum.logBase(
				player.pathogens.amount.div(start).max(1),
				costExpBase
			),
			upg.inc
		).root(costPow).times(fp)
		.floor().add(1)
	}
	/*let start = getScalingStart("scaled", "pathogenUpg");
	let power = getScalingPower("scaled", "pathogenUpg");
	let exp = ExpantaNum.pow(3, power);
	if (scalingActive("pathogenUpg", player.pathogens.upgrades[i].max(bulk), "scaled")) {
		cost = upg.start.times(
			ExpantaNum.pow(
				upg.inc,
				player.pathogens.upgrades[i].pow(exp).div(start.pow(exp.sub(1)))
			)
		);
		bulk = player.pathogens.amount
			.div(upg.start)
			.max(1)
			.logBase(upg.inc)
			.times(start.pow(exp.sub(1)))
			.pow(exp.pow(-1))
			.add(1);
	}
	let start2 = getScalingStart("superscaled", "pathogenUpg");
	let power2 = getScalingPower("superscaled", "pathogenUpg");
	let exp2 = ExpantaNum.pow(5, power2);
	if (scalingActive("pathogenUpg", player.pathogens.upgrades[i].max(bulk), "superscaled")) {
		cost = upg.start.times(
			ExpantaNum.pow(
				upg.inc,
				player.pathogens.upgrades[i]
					.pow(exp2)
					.div(start2.pow(exp2.sub(1)))
					.pow(exp)
					.div(start.pow(exp.sub(1)))
			)
		);
		bulk = player.pathogens.amount
			.div(upg.start)
			.max(1)
			.logBase(upg.inc)
			.times(start.pow(exp.sub(1)))
			.pow(exp.pow(-1))
			.times(start2.pow(exp2.sub(1)))
			.pow(exp2.pow(-1))
			.add(1);
	}
	let start3 = getScalingStart("hyper", "pathogenUpg");
	let power3 = getScalingPower("hyper", "pathogenUpg");
	let base3 = ExpantaNum.pow(1.025, power3);
	if (scalingActive("pathogenUpg", player.pathogens.upgrades[i].max(bulk), "hyper")) {
		cost = upg.start.times(
			ExpantaNum.pow(
				upg.inc,
				ExpantaNum.pow(base3, player.pathogens.upgrades[i].sub(start3))
					.times(start3)
					.pow(exp2)
					.div(start2.pow(exp2.sub(1)))
					.pow(exp)
					.div(start.pow(exp.sub(1)))
			)
		);
		bulk = player.pathogens.amount
			.div(upg.start)
			.max(1)
			.logBase(upg.inc)
			.times(start.pow(exp.sub(1)))
			.pow(exp.pow(-1))
			.times(start2.pow(exp2.sub(1)))
			.pow(exp2.pow(-1))
			.div(start3)
			.max(1)
			.logBase(base3)
			.plus(start3)
			.add(1);
	}*/
	return {cost: cost, bulk: bulk}
}

function getPathogenUpgradeBases(a) {
	switch (a+"") {
		case "1":
			return new ExpantaNum(0.05)
		case "5": {
			let eff = new ExpantaNum(5)
			if (tmp.pathogens && player.pathogens.unl) eff = eff.times(tmp.pathogens[8].eff())
			return eff
		}
		case "7":
			return new ExpantaNum(0.003)
		case "8":
			return new ExpantaNum(0.2)
		case "9":
			return new ExpantaNum(0.6)
		default:
			return new ExpantaNum(1)
	}
}

function getPathogenUpgPlusPow(a) {
	switch (a+"") {
		case "8": {
			let pow = new ExpantaNum(1)
			if (player.rank.gte(rankRewardReq[36])) pow = pow.times(getRankEffects("37"))
			return pow
		}
		default:
			return new ExpantaNum(1)
	}
}

function getPathogenUpgPlusMulti(a) {
	switch (a+"") {
		default:
			return new ExpantaNum(1)
	}
}

function getPathogenUpgSoftcapStart(x) {
	let sc = new ExpantaNum(PTH_UPG_SCS[x])
	if (tmp.inf) if (tmp.inf.upgs.has("3;6")) sc = sc.plus(1);
	if (modeActive("hard")) {
		sc = modeActive("easy") ? sc : new ExpantaNum(modeActive("extreme")?1:2);
		if (tmp.ach[65].has) sc = sc.plus(5);
	}
	if (modeActive("easy")) sc = sc.times(1.1).round();
	return sc;
}

function pathogenUpg5Eff() {
	return (tmp.pathogens && player.pathogens.unl) ? tmp.pathogens.eff(5) : new ExpantaNum(1);
}

function pathogenUpg13Eff() {
	return (tmp.pathogens && player.pathogens.unl) ? tmp.pathogens.eff(13) : new ExpantaNum(1);
}