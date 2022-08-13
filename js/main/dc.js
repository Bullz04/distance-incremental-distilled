function updateTempDarkCoreCost(){
	let nAmt = player.dc.cores.max(tmp.dc.bulk)
	let fp = getDarkCoreFP()
	let baseCost = new ExpantaNum("1e240")
	let expBase = new ExpantaNum("1e1300")
	let expMulti = new ExpantaNum(1.01)

	let start = getScalingStart("scaled", "darkCore");
	let power = scalingActive("darkCore", nAmt, "scaled") ? getScalingPower("scaled", "darkCore") : 0
	let exp = ExpantaNum.pow(2, power);
	let start2 = getScalingStart("superscaled", "darkCore");
	let power2 = scalingActive("darkCore", nAmt, "superscaled") ? getScalingPower("superscaled", "darkCore") : 0
	let exp2 = ExpantaNum.pow(3, power2);
	let start3 = getScalingStart("hyper", "darkCore");
	let power3 = getScalingPower("hyper", "darkCore");
	let base3 = ExpantaNum.pow(1.03, power3);

	let bcMult = modeActive("extreme") ? 0.025 : 1

	let starting = player.dc.cores
	/****if (scalingActive("darkCore", nAmt, "hyper")) {
		if (!(scalingActive("darkCore", player.dc.cores, "hyper")) && (!modeActive("extreme")&&!modeActive("hikers_dream"))) starting = player.dc.cores;
		else starting = ExpantaNum.pow(base3, player.dc.cores.sub(start3)).times(start3)
	} else {*/
	//}
	tmp.dc.coreCost = ExpantaNum.pow(
		expBase,
		ExpantaNum.pow(
			expMulti,
			player.dc.cores.div(fp)
		)
	)
	.div(expBase)
	.times(baseCost)
	.times(bcMult)
	.div(getDarkCoreCostDiscount())


	tmp.dc.bulk = ExpantaNum.logBase(
		ExpantaNum.logBase(
			player.collapse.cadavers.times(expBase).div(baseCost).div(bcMult).times(getDarkCoreCostDiscount())
			.max(1),
			expBase
		),
		expMulti
	).add(1).floor()
}

function getDarkCoreCostDiscount() {
	let discount = new ExpantaNum(1)
	return discount
}

function getDarkCoreFP() {
	let fp = new ExpantaNum(1)
	if (player.tier.gte(tierRewardReq[11])) fp = fp.times(getTierEffects("12"))
	if (player.tr.upgrades.includes(13) && !HCCBA("noTRU")) fp = fp.times(tr13Eff()["coreFP"])
	
	return fp
}

function calcDarkFlow(){
	tmp.dc.flow = new ExpantaNum(1);
	if (player.rank.gte(rankRewardReq[38])) tmp.dc.flow = tmp.dc.flow.times(getRankEffects("39"))
	if (player.tr.upgrades.includes(15) && !HCCBA("noTRU")) tmp.dc.flow = tmp.dc.flow.times(tr15Eff());
	if (tmp.ach[75].has) tmp.dc.flow = tmp.dc.flow.times(ach75Eff());
	if (tmp.ach[131].has) tmp.dc.flow = tmp.dc.flow.times(1.5);
	if (tmp.inf) {
		if (tmp.inf.upgs.has("4;1")) tmp.dc.flow = tmp.dc.flow.times(2);
		if (tmp.inf.upgs.has("5;1")) tmp.dc.flow = tmp.dc.flow.times(2);
		if (tmp.inf.upgs.has("4;6")) tmp.dc.flow = tmp.dc.flow.times(2);
		if (tmp.inf.upgs.has("5;5")) tmp.dc.flow = tmp.dc.flow.times(INF_UPGS.effects["5;5"]());
		tmp.dc.flow = tmp.dc.flow.times(tmp.inf.asc.perkEff(1));
		if (tmp.inf.upgs.has("7;2")) tmp.dc.flow = tmp.dc.flow.times(INF_UPGS.effects["7;2"]()["flow"]);
		if (tmp.inf.upgs.has("7;6")) tmp.dc.flow = tmp.dc.flow.times(INF_UPGS.effects["7;6"]());
		if (tmp.inf.upgs.has("7;8")) tmp.dc.flow = tmp.dc.flow.times(INF_UPGS.effects["7;8"]());
		if (tmp.inf.upgs.has("10;5")) tmp.dc.flow = tmp.dc.flow.times(INF_UPGS.effects["10;5"]());
		if (tmp.inf.upgs.has("10;10")) tmp.dc.flow = tmp.dc.flow.times(INF_UPGS.effects["10;10"]());
	}
	if (tmp.elm) {
		if (player.elementary.times.gt(0)) tmp.dc.flow = tmp.dc.flow.times(tmp.elm.bos.z2.max(1));
		if (player.elementary.sky.unl) tmp.dc.flow = tmp.dc.flow.times(tmp.elm.sky.pionEff[5]);
	}
	if (extremeStadiumActive("quantron", 5)) tmp.dc.flow = tmp.dc.flow.pow(0.95);
	if (nerfActive("noDarkFlow")) tmp.dc.flow = new ExpantaNum(0);
}

function calcDarkCircleBonus(){
	tmp.dc.power = new ExpantaNum(1);
	if (tmp.inf) if (tmp.inf.stadium.completed("reality") && mltRewardActive(1)) tmp.dc.power = tmp.dc.power.times(8);
	tmp.dc.dmEff = player.dc.matter.plus(1)
		.pow(
			player.dc.matter.plus(1).log10().plus(1).log10().plus(1)
			.times(tmp.dc.power)
		)
	tmp.dc.deEff = player.dc.energy.plus(1)
		.pow(
			player.dc.energy.plus(1).log10().plus(1).log10().plus(1)
			.times(tmp.dc.power)
		)
	/*if (tmp.inf && tmp.inf.upgs.has("6;8")) {
		tmp.dc.dmEff = tmp.dc.dmEff.max(
			player.dc.matter
				.plus(1)
				.pow(
					ExpantaNum.mul(
						player.dc.matter.plus(1).log10().plus(1).log10().plus(1),
						tmp.dc.power
					)
				)
				.pow(10)
		);
		tmp.dc.deEff = tmp.dc.deEff.max(
			player.dc.energy
				.plus(1)
				.pow(
					ExpantaNum.mul(
						player.dc.energy.plus(1).log10().plus(1).log10().plus(1),
						tmp.dc.power
					)
				)
				.pow(15)
		);
	}*/
	tmp.dc.dfEff = extremeStadiumActive("spectra", 4) ? new ExpantaNum(1) : (
		player.dc.fluid.plus(1)
		.pow(
			player.dc.fluid.plus(1).log10().plus(1).log10().plus(1).pow(4)
			.times(tmp.dc.power)
			.times(3)
		)
	);
}

function calcDarkCircleGain(){
	tmp.dc.dmGain = ExpantaNum.pow(2, player.dc.cores).sub(1).times(player.dc.fluid.plus(1).log10().plus(1)).max(0);
	tmp.dc.deGain = player.dc.matter.plus(1).log10();
	tmp.dc.dfGain = player.dc.energy.plus(1).log10();

	if (tmp.inf && tmp.inf.upgs.has("8;1")) {
		let fp = new ExpantaNum(1);
		if (tmp.inf.upgs.has("8;8")) fp = fp.times(INF_UPGS.effects["8;8"]());
		tmp.dc.dmGain = ExpantaNum.pow(2, player.dc.cores)
			.sub(1)
			.times(
				player.dc.fluid
					.plus(1)
					.log10()
					.plus(1)
					.times(player.dc.fluid.plus(1).pow(ExpantaNum.mul(1 / 5, fp)))
			)
			.max(0);
		tmp.dc.deGain = player.dc.matter
			.plus(1)
			.log10()
			.times(player.dc.matter.plus(1).pow(ExpantaNum.mul(1 / 5, fp)));
		tmp.dc.dfGain = player.dc.energy
			.plus(1)
			.log10()
			.times(player.dc.energy.plus(1).pow(ExpantaNum.mul(1 / 5, fp)));
	}/* */

	if (player.tr.upgrades.includes(14) && !HCCBA("noTRU")) tmp.dc.deGain = tmp.dc.deGain.times(tr14Eff())
	if (player.tr.upgrades.includes(14) && !HCCBA("noTRU")) tmp.dc.dfGain = tmp.dc.dfGain.times(tr14Eff())

}

function calcDarkCircleAllComp(){
	tmp.dc.allComp = player.dc.matter.plus(1).log10()
		.plus(player.dc.energy.plus(1).log10())
		.plus(player.dc.fluid.plus(1).log10())
		.plus(player.dc.cores);
}

function calcDarkCircleCoreEff(){
	tmp.dc.coreEff = player.dc.cores.times(0.025).plus(1)
}

function updateTempDC() { // 339 Normal Mode
	if (!tmp.dc) tmp.dc = {};

	tmp.dc.lrm = new ExpantaNum(modeActive("extreme") ? 1e-28 : 1);

	calcDarkCircleGain()
	calcDarkCircleAllComp()
	calcDarkFlow()
	calcDarkCircleBonus()
	calcDarkCircleCoreEff()
	
	updateTempDarkCoreCost()
	if (!tmp.dc.buyCore) tmp.dc.buyCore = function (manual=false) {
		if (manual) updateTempDarkCoreCost()
		if (player.collapse.cadavers.lt(tmp.dc.coreCost) || nerfActive("noDarkCores")) return;
		if (!player.dc.unl) return;
		if (!tmp.ach[92].has) player.collapse.cadavers = player.collapse.cadavers.sub(tmp.dc.coreCost);
		player.dc.cores = player.dc.cores.plus(1);
	};
	if (!tmp.dc.maxCores) tmp.dc.maxCores = function () {
		if (player.collapse.cadavers.lt(tmp.dc.coreCost) || nerfActive("noDarkCores")) return;
		if (!player.dc.unl) return;
		if (!tmp.ach[92].has) player.collapse.cadavers = player.collapse.cadavers.sub(tmp.dc.coreCost);
		player.dc.cores = player.dc.cores.max(tmp.dc.bulk.floor().max(0)).max(player.dc.cores.plus(1));
	};
	if (!tmp.dc.tick) tmp.dc.tick = function (diff) {
		player.dc.matter = player.dc.matter.plus(adjustGen(tmp.dc.dmGain, "dc").times(diff).times(tmp.dc.flow));
		player.dc.energy = player.dc.energy.plus(adjustGen(tmp.dc.deGain, "dc").times(diff).times(tmp.dc.flow));
		player.dc.fluid = player.dc.fluid.plus(adjustGen(tmp.dc.dfGain, "dc").times(diff).times(tmp.dc.flow));
	};
}