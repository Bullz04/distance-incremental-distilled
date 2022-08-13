let rankRewardDesc = []
let rankRewardReq = []

for (let i = 0; i < Object.keys(RANK_DESCS).length; i++) {
	rankRewardDesc.push(Object.values(RANK_DESCS)[i])
	rankRewardReq.push(new ExpantaNum(Object.keys(RANK_DESCS)[i]))
}

(function(){
	for (let i = 0; i < rankRewardDesc.length; i++) {
		console.log((i+1) + ". Rank " + showNum(rankRewardReq[i]) + ": " + rankRewardDesc[i])
	}
})()/**/

function updateTempRanks() {
	if (!tmp.ranks) tmp.ranks = {};
	let fp = getRankFP()
	let bc = getRankBaseCost()
	let discount = getRankReqDiscount()
	tmp.ranks.req = new ExpantaNum(bc).times(
		ExpantaNum.pow(2, player.rank.div(fp).plus(1).max(1).sub(1).pow(2))
	).div(discount);
	tmp.ranks.bulk = ExpantaNum.logBase(
		player.distance.times(discount).div(bc).max(1),
		2
	).root(2).times(fp).plus(1).floor();
	/**
	{
	if (scalingActive("rank", player.rank.max(tmp.ranks.bulk), "scaled")) {
		let start = getScalingStart("scaled", "rank");
		let power = getScalingPower("scaled", "rank");
		let exp = ExpantaNum.pow(2, power);
		tmp.ranks.req = new ExpantaNum(bc).times(
			ExpantaNum.pow(
				2,
				player.rank
					.pow(exp)
					.div(start.pow(exp.sub(1)))
					.div(fp)
					.sub(1)
					.pow(2)
			)
		);
		tmp.ranks.bulk = player.distance
			.div(bc)
			.max(1)
			.logBase(2)
			.sqrt()
			.plus(1)
			.times(fp)
			.times(start.pow(exp.sub(1)))
			.pow(exp.pow(-1))
			.plus(1)
			.floor();
	}
	if (scalingActive("rank", player.rank.max(tmp.ranks.bulk), "superscaled")) {
		let start2 = getScalingStart("superscaled", "rank");
		let power2 = getScalingPower("superscaled", "rank");
		let exp2 = ExpantaNum.pow(3, power2);
		let start = getScalingStart("scaled", "rank");
		let power = getScalingPower("scaled", "rank");
		let exp = ExpantaNum.pow(2, power);
		tmp.ranks.req = new ExpantaNum(bc).times(
			ExpantaNum.pow(
				2,
				player.rank
					.pow(exp2)
					.div(start2.pow(exp2.sub(1)))
					.pow(exp)
					.div(start.pow(exp.sub(1)))
					.div(fp)
					.sub(1)
					.pow(2)
			)
		);
		tmp.ranks.bulk = player.distance
			.div(bc)
			.max(1)
			.logBase(2)
			.sqrt()
			.plus(1)
			.times(fp)
			.times(start.pow(exp.sub(1)))
			.pow(exp.pow(-1))
			.times(start2.pow(exp2.sub(1)))
			.pow(exp2.pow(-1))
			.add(1)
			.floor();
	}
	if (scalingActive("rank", player.rank.max(tmp.ranks.bulk), "hyper")) {
		let start3 = getScalingStart("hyper", "rank");
		let power3 = getScalingPower("hyper", "rank");
		let base3 = ExpantaNum.pow(1.01, power3);
		let start2 = getScalingStart("superscaled", "rank");
		let power2 = getScalingPower("superscaled", "rank");
		let exp2 = ExpantaNum.pow(3, power2);
		let start = getScalingStart("scaled", "rank");
		let power = getScalingPower("scaled", "rank");
		let exp = ExpantaNum.pow(2, power);
		tmp.ranks.req = new ExpantaNum(bc).times(
			ExpantaNum.pow(
				2,
				ExpantaNum.pow(base3, player.rank.sub(start3))
					.times(start3)
					.pow(exp2)
					.div(start2.pow(exp2.sub(1)))
					.pow(exp)
					.div(start.pow(exp.sub(1)))
					.div(fp)
					.sub(1)
					.pow(2)
			)
		);
		tmp.ranks.bulk = player.distance
			.div(bc)
			.max(1)
			.logBase(2)
			.sqrt()
			.plus(1)
			.times(fp)
			.times(start.pow(exp.sub(1)))
			.pow(exp.pow(-1))
			.times(start2.pow(exp2.sub(1)))
			.pow(exp2.pow(-1))
			.div(start3)
			.max(1)
			.logBase(base3)
			.add(start3)
			.add(1)
			.floor();
	}
	if (scalingActive("rank", player.rank.max(tmp.ranks.bulk), "atomic")) {
		let start4 = getScalingStart("atomic", "rank");
		let power4 = getScalingPower("atomic", "rank");
		let exp4 = ExpantaNum.pow(4, power4);
		let start3 = getScalingStart("hyper", "rank");
		let power3 = getScalingPower("hyper", "rank");
		let base3 = ExpantaNum.pow(1.01, power3);
		let start2 = getScalingStart("superscaled", "rank");
		let power2 = getScalingPower("superscaled", "rank");
		let exp2 = ExpantaNum.pow(3, power2);
		let start = getScalingStart("scaled", "rank");
		let power = getScalingPower("scaled", "rank");
		let exp = ExpantaNum.pow(2, power);
		tmp.ranks.req = new ExpantaNum(bc).times(
			ExpantaNum.pow(
				2,
				ExpantaNum.pow(
					base3,
					player.rank
						.pow(exp4)
						.div(start4.pow(exp4.sub(1)))
						.sub(start3)
				)
					.times(start3)
					.pow(exp2)
					.div(start2.pow(exp2.sub(1)))
					.pow(exp)
					.div(start.pow(exp.sub(1)))
					.div(fp)
					.sub(1)
					.pow(2)
			)
		);
		tmp.ranks.bulk = player.distance
			.div(bc)
			.max(1)
			.logBase(2)
			.sqrt()
			.plus(1)
			.times(fp)
			.times(start.pow(exp.sub(1)))
			.pow(exp.pow(-1))
			.times(start2.pow(exp2.sub(1)))
			.pow(exp2.pow(-1))
			.div(start3)
			.max(1)
			.logBase(base3)
			.add(start3)
			.times(start4.pow(exp4.sub(1)))
			.pow(exp4.pow(-1))
			.add(1)
			.floor();
	}
	}*/
	
	let reachedRewards = () => {
		let num = 0
		for (let i = 0; i < rankRewardReq.length; i++) {
			let reached = true
			if (player.rank.lt(rankRewardReq[i])) reached = false
			if (reached) num++
		}
		return num
	}
	if (typeof rankRewardDesc[reachedRewards()] == "function") {
		if (reachedRewards() > (rankRewardReq.length-1)) tmp.ranks.desc = ""
		else tmp.ranks.desc = "At Rank " + showNum(rankRewardReq[reachedRewards()].floor()) + ", " + rankRewardDesc[reachedRewards()]()
	} else {
		if (reachedRewards() > (rankRewardReq.length-1)) tmp.ranks.desc = ""
		else tmp.ranks.desc = "At Rank " + showNum(rankRewardReq[reachedRewards()].floor()) + ", " + rankRewardDesc[reachedRewards()]		
	}
	
	tmp.ranks.canRankUp = player.distance.gte(tmp.ranks.req);
	if (nerfActive("noRank")) tmp.ranks.canRankUp = false;
	tmp.ranks.layer = new Layer("rank", tmp.ranks.canRankUp, "semi-forced");
	if (!tmp.rank) tmp.rank = {};
	if (!tmp.rank.onReset) tmp.rank.onReset = function (prev) {
		if (tmp.collapse)
			if (hasCollapseMilestone(12)) {
				player.distance = prev.distance;
				player.velocity = prev.velocity;
			}
		if (!tmp.inf.upgs.has("4;9")) tmp.inf.derv.resetDervs();
	};
	if (!tmp.rank.updateOnReset) tmp.rank.updateOnReset = function() { updateTempRanks(); }
}

function getRankFP() {
	let fp = new ExpantaNum(1);

	if (player.tier.gte(tierRewardReq[0])) fp = fp.times(getTierEffects("1"))
	if (player.tier.gte(tierRewardReq[2])) fp = fp.times(getTierEffects("3"))

	if (tmp.ach) if (tmp.ach[43].has) fp = fp.times(1.025)
	if (player.tr.upgrades.includes(3) && !HCCBA("noTRU")) fp = fp.times(1.1)

	if (player.collapse && player.collapse.crematorium.unl) fp = fp.times(getRepCrUpgEffects("6"))

	if (tmp.rankCheap && modeActive("extreme")) fp = fp.times(getRankCheapEff())
	return fp
}

function getRankBaseCost() {
	let bc = new ExpantaNum(10)
	if (modeActive("extreme") && player.rank < 3) bc = bc.times(2)
	if (modeActive("easy") && player.rank < 3) bc = bc.div(3)
	if (tmp.inf) if (tmp.inf.stadium.active("spaceon", 5) || tmp.inf.stadium.active("solaris", 6)) bc = bc.times(10)
	if (tmp.rankCheap && modeActive("extreme")) bc = bc.div(tmp.rankCheap.eff2).max(1e-100)
	return bc
}

function getRankReqDiscount() {
	let disc = new ExpantaNum(1)
	if (player.dc.unl && tmp.dc) disc = disc.times(tmp.dc.dfEff)
	return disc
}

function getRankEffPower(key) {
	switch (key) {
		case "3": {
			let pow = new EN(1)
			if (tmp.ach) if (tmp.ach[25].has) pow = pow.times(ach25Eff())
			if (player.rank.gte(rankRewardReq[9])) pow = pow.times(getRankEffects("10"));
			if (tmp.pathogens && player.pathogens.unl) pow = pow.times(tmp.pathogens[9].eff())
			return pow
		}
		case "12": {
			let pow = new EN(1)
			if (player.rank.gte(rankRewardReq[31])) pow = pow.times(getRankEffects("32"))
			return pow
		}		
		case "14": {
			let pow = new EN(1)
			if (player.rank.gte(rankRewardReq[31])) pow = pow.times(getRankEffects("32"))
			return pow
		}
		default:
			return new ExpantaNum(1)
	}
}

function getRankEffBases(a) {
	switch (a+"") {
		case "2": {
			let base = new EN(4)
			if (player.rank.gte(rankRewardReq[6])) base = base.times(getRankEffects("7"))
			if (player.tr.upgrades.includes(6) && !HCCBA("noTRU")) base = base.times(tr6Eff());
			return base
		}
		case "4": {
			let eff = new EN(3)
			return eff
		}
			
		case "5": {
			let base = new EN(1.975)
			if (player.rank.gte(rankRewardReq[8])) base = base.times(getRankEffects("9"))
			return base
		}
		default:
			return new ExpantaNum(1)
	}
}

function getRankEffects(a) {
	switch (a+"") {
		case "1":
			return new ExpantaNum(5)
		case "2":
			return ExpantaNum.pow(getRankEffBases("2"), player.rank)
		case "3": {
			let eff = EN.logBase(player.distance.plus(10), 10).pow(2)
			eff = eff.pow(getRankEffPower("3"))
			return eff
		}
		case "4":
			return ExpantaNum.pow(getRankEffBases("4"), player.tier);
		case "5":
			return ExpantaNum.pow(getRankEffBases("5"), player.rank);
		case "6":
			return ExpantaNum.pow(3, player.rank);
		case "7":
			return player.rank.times(0.13).plus(1)
		case "8":
			return new ExpantaNum(2)
		case "9":
			return EN.logBase(player.distance.plus(10), 10).root(4);
		case "10":
			return player.tier.times(0.25).plus(1)
		case "11":
			return new ExpantaNum(4)
		case "12": {
			let eff = ExpantaNum.logBase(player.distance.plus(10), 10).root(4)
			eff = eff.pow(getRankEffPower("12"))
			return eff
		}
		case "13":
			return new ExpantaNum(2)
		case "14": {
			let eff = EN.logBase(player.distance.plus(10), 10).root(3)
			eff = eff.pow(getRankEffPower("14"))
			return eff
		}
		case "15":
			return new ExpantaNum(10)
		case "16":
			return new ExpantaNum(3)
		case "17":
			return new ExpantaNum(1.5)
		case "18": {
			let eff = player.automation.intelligence.times(0.01).plus(1);
			return eff;
		}
		case "19":
			return ExpantaNum.logBase(player.rockets.plus(10), 10)
		case "20":
			return new ExpantaNum(15)
		case "21":
			return ExpantaNum.pow(2, player.rank)
		case "22": {
			let dist = player.distance
			let eff = dist
			for (let i = 0; i < 2; i++) eff = ExpantaNum.logBase(eff.plus(1), 10)
			return eff.times(0.4).plus(1)
		}
		case "23":
			return new ExpantaNum(2)
		case "24":
			return new ExpantaNum(1.4)
		case "25":
			return new ExpantaNum(25)
		case "26":
			return new ExpantaNum(1.5)
		case "27":
			return new ExpantaNum(1.75)
		case "28":
			return new ExpantaNum(2)
		case "29":
			return ExpantaNum.pow(2, player.rank)
		case "30": {
			let c = player.collapse.cadavers
			let eff = ExpantaNum.logBase(ExpantaNum.logBase(c.plus(1), 10).plus(1), 10).times(0.05).plus(1).pow(6)
			return eff
		}
		case "31": {
			let p = player.pathogens.amount
			return p.plus(10).logBase(10).pow(2)
		}
		case "32": {
			let eff = player.distance
			for (let i = 0; i < 2; i++) eff = ExpantaNum.logBase(eff.plus(1), 10)
			eff = eff.times(1.3).plus(1)
			return eff
		}
		case "33": {
			let eff = ExpantaNum.logBase(ExpantaNum.logBase(player.tr.cubes.plus(1), 10).plus(1), 10)
				.times(0.5).plus(1)
			return eff
		}
		case "34": {
			let eff = player.collapse.lifeEssence
			for (let i = 0; i < 2; i++) eff = ExpantaNum.logBase(eff.plus(1), 10)
			eff = eff.times(0.05).plus(1).pow(1.3)
			return eff
		}
		case "35": {
			let r = player.rockets
			let eff = ExpantaNum.logBase(r.plus(10), 10).pow(2)
			return eff
		}
		case "36": {
			let eff = ExpantaNum.logBase(player.collapse.crematorium.ash.plus(10), 10)
			return eff
		}
		case "37":
			return new ExpantaNum(1.1)
		case "38":	{
			let eff = ExpantaNum.logBase(player.distance.plus(2), 2)
			return eff
		}
		case "39": {
			let eff = ExpantaNum.logBase(player.distance.plus(1), 10).plus(1).root(2)
			return eff
		}
		case "40": {
			let eff = ExpantaNum.logBase(ExpantaNum.logBase(player.distance.plus(1), 10).plus(1), 10)
				.times(0.025).plus(1)
			return eff
		}
		
		default:
			return new ExpantaNum(1)
	}
}

function rank2Eff() {
	return ExpantaNum.pow(4, player.rank);
}

function rank3Eff() {
	let eff = EN.log(player.distance.plus(10), 10).pow(2)
	if (tmp.ach) if (tmp.ach[25].has) eff = eff.pow(ach25Eff())
	return eff
}

function rank4Eff() {
	return ExpantaNum.pow(3, player.tier);
}

function rank5Eff() {
	return ExpantaNum.pow(1.975, player.rank);
}

function rank8Eff() {
	return ExpantaNum.pow(1.1, player.rank);
}

function rank14Eff() {
	return ExpantaNum.pow(player.rf.plus(1), 1.6);
}

function rank21Eff() {
	return EN.log(player.distance.plus(10), 10).root(3)
}

function rank40Eff() {
	let eff = primesLTE(player.automation.scraps).max(1);
	if (eff.gte(1e9)) eff = eff.log10().times(1e9/9)
	return eff;
}

function rank55Eff() {
	return ExpantaNum.pow(2, player.rank)
}

function rank111Eff() {
	return ExpantaNum.pow(2, player.rank)
}