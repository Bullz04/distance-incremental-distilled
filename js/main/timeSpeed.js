function updateTempTimeSpeed() {
	tmp.timeSpeed = new ExpantaNum(1);
	if (modeActive("hard")) tmp.timeSpeed = tmp.timeSpeed.times(0.75);
	if (modeActive("easy")) tmp.timeSpeed = tmp.timeSpeed.times(2.5);
	if (modeActive("extreme")) tmp.timeSpeed = tmp.timeSpeed.times(0.7);
	if (player.tr.upgrades.includes(2) && !HCCBA("noTRU")) tmp.timeSpeed = tmp.timeSpeed.times(tr2Eff());
	if (player.tr.upgrades.includes(7) && !HCCBA("noTRU")) tmp.timeSpeed = tmp.timeSpeed.times(tr7Eff());
	if (player.tr.upgrades.includes(18) && !HCCBA("noTRU") && modeActive("extreme"))
		tmp.timeSpeed = tmp.timeSpeed.times(ExpantaNum.pow(2, player.rankCheap.sqrt()));
	if (player.tr.upgrades.includes(23) && !HCCBA("noTRU") && modeActive("extreme"))
		tmp.timeSpeed = tmp.timeSpeed.times(ExpantaNum.pow(2.5, player.furnace.blueFlame));
	if (tmp.ach[17].has) tmp.timeSpeed = tmp.timeSpeed.times(1.01);
	if (tmp.ach[27].has) tmp.timeSpeed = tmp.timeSpeed.times(1.1);
	if (tmp.ach[47].has) tmp.timeSpeed = tmp.timeSpeed.times(1.5);
	if (tmp.ach[18].has) tmp.timeSpeed = tmp.timeSpeed.times(1.5);
	if (tmp.ach[52].has) tmp.timeSpeed = tmp.timeSpeed.times(1.2);
	if (tmp.ach[57].has) tmp.timeSpeed = tmp.timeSpeed.times(1.1);
	if (tmp.ach[67].has) tmp.timeSpeed = tmp.timeSpeed.times(1.111);
	if (player.rank.gte(rankRewardReq[16])) tmp.timeSpeed = tmp.timeSpeed.times(getRankEffects("17"));
	if (player.rank.gte(rankRewardReq[23])) tmp.timeSpeed = tmp.timeSpeed.times(getRankEffects("24"))
	if (player.rank.gte(rankRewardReq[25])) tmp.timeSpeed = tmp.timeSpeed.times(getRankEffects("26"))
	if (player.rank.gte(rankRewardReq[26])) tmp.timeSpeed = tmp.timeSpeed.times(getRankEffects("27"))

	if (player.tier.gte(tierRewardReq[6])) tmp.timeSpeed = tmp.timeSpeed.times(getTierEffects("7"))
	if (player.tier.gte(tierRewardReq[7])) tmp.timeSpeed = tmp.timeSpeed.times(getTierEffects("8"))
	
	tmp.timeSpeed = tmp.timeSpeed.times(getCadaverEff().max(1));
	if (hasCollapseMilestone(1)) tmp.timeSpeed = tmp.timeSpeed.times(collapseMile1Eff());
	if (hasCollapseMilestone(2)) tmp.timeSpeed = tmp.timeSpeed.times(modeActive("extreme")?2:5);
	//if (tmp.inf.upgs.has("1;1")) tmp.timeSpeed = tmp.timeSpeed.times(INF_UPGS.effects["1;1"]());
	if (tmp.inf.upgs.has("7;7")) tmp.timeSpeed = tmp.timeSpeed.times(INF_UPGS.effects["7;7"]()["ts"]);
	if (tmp.inf.upgs.has("9;4")) tmp.timeSpeed = tmp.timeSpeed.times(INF_UPGS.effects["9;4"]());
	if (tmp.inf.stadium.completed("eternity")) tmp.timeSpeed = tmp.timeSpeed.times(STADIUM_REWARDS.effects.eternity());
	if (player.tr.upgrades.includes(34) && !HCCBA("noTRU") && modeActive("extreme")) tmp.timeSpeed = tmp.timeSpeed.times(TR_UPGS[34].current())
	if (nerfActive("nerfTS")) tmp.timeSpeed = tmp.timeSpeed.pow(0.1);
	if (player.tr.upgrades.includes(30) && !HCCBA("noTRU") && modeActive("extreme"))
		tmp.timeSpeed = tmp.timeSpeed.pow(player.pathogens.amount.plus(1).log10().plus(1).times(10).slog(10).pow(1.2));
	if (tmp.rockets) tmp.timeSpeed = tmp.timeSpeed.times(tmp.rockets.tsPow)
	if (player.mlt.times.gt(0) && tmp.mlt) tmp.timeSpeed = tmp.timeSpeed.times(tmp.mlt.quilts[1].eff);
	if (modeActive("extreme") && tmp.timeSpeed.gte(Number.MAX_VALUE)) {
		if (player.tr.upgrades.includes(31) && !HCCBA("noTRU")) tmp.timeSpeed = tmp.timeSpeed.pow(0.725).times(Math.pow(Number.MAX_VALUE, 0.275))
		else tmp.timeSpeed = tmp.timeSpeed.sqrt().times(Math.sqrt(Number.MAX_VALUE))
	}
	if (modeActive("extreme")) if (tmp.fn) tmp.timeSpeed = tmp.timeSpeed.times(tmp.fn.enh.eff2)
	if (((player.elementary.theory.active&&player.elementary.theory.depth.gte(player.modes==[]?25:20))||HCTVal("tv").gte(player.modes==[]?25:20)) && tmp.elm) tmp.timeSpeed = tmp.timeSpeed.pow(tmp.elm.theory.nerf)
	if (mltActive(2)) tmp.timeSpeed = tmp.timeSpeed.root(1.3);
	if (mltActive(5)) tmp.timeSpeed = tmp.timeSpeed.root(modeActive("extreme")?Math.PI:3.6);
	if (modeActive("extreme") && tmp.timeSpeed.gte(ExpantaNum.pow(DISTANCES.mlt, 300))) {
		let mlt300 = ExpantaNum.pow(DISTANCES.mlt, 300);
		tmp.timeSpeed = ExpantaNum.pow(mlt300, tmp.timeSpeed.logBase(mlt300).root(5))
	}
}
