const COLLAPSE_UNL = LAYER_REQS["collapse"][1];
const CREMATORIUM_UNL = new ExpantaNum("1e150")
const ESSENCE_MILESTONES = {
	1: {
		req: new ExpantaNum(1),
		desc: "Time goes by 100x faster, but this gets weaker the further you go (minimum x2).",
		disp: function () {
			return showNum(collapseMile1Eff()) + "x";
		}
	},
	2: { 
		req: new ExpantaNum(2),
		desc: "Time goes by faster.",
		disp: function() {
			return showNum(modeActive("extreme")?2:5)+"x"
		},
	},
	3: { req: new ExpantaNum(3), desc: "Start with 10 Rockets on reset." },
	4: { req: new ExpantaNum(5), desc: "Start with 1 Rocket Fuel on reset." },
	5: {
		req: new ExpantaNum(10).times(7),
		desc: "Unlock Fuelbot, and Cadaver gain is boosted by Time Cubes.",
		disp: function () {
			return showNum(collapseMile5Eff()) + "x";
		}
	},
	6: { 
		req: new ExpantaNum(15).times(2000), 
		desc: "Gain more Rockets based on Rocket amount.",
		disp: function() {
			return "x" + showNum(collapseMile6Eff())
		}
	},
	7: { req: new ExpantaNum(25).times(1e4), desc: "Keep Time Reversal upgrades on reset." },
	8: {
		req: new ExpantaNum(50).times(2e4),
		desc: "Time Speed multiplies Rocket gain at a reduced rate.",
		disp: function () {
			return showNum(collapseMile8Eff()) + "x";
		}
	},
	9: {
		req: new ExpantaNum(75).times(2.5e8),
		desc: "Gain 1% of Rocket gain every second (unaffected by Time Speed)."
	},
	10: {
		req: new ExpantaNum(100).times(1e9),
		desc: "Life Essence boosts Cadaver gain.",
		disp: function () {
			return showNum(collapseMile10Eff()) + "x";
		}
	},
	11: { req: new ExpantaNum(1000).times(1e15), desc: "Tiers do not reset Ranks." },
	12: { req: new ExpantaNum(10000).times(1e18), desc: "Ranks do not reset anything." }
};
const EM_AMT = Object.keys(ESSENCE_MILESTONES).length;

const REPEATABLE_CREMATORIUM_UPGRADES = {
	1: {
		name: "Blast Incinerator",
		desc: () => "Increase incinerator speed by x" + showNum(getRepCrUpgEffBases("1"))
	},
	2: {
		name: "Incinerator Strength",
		desc: () => "Increase max process bulk of incinerator by x" + showNum(getRepCrUpgEffBases("2"))
	},
	3: {
		name: "Ash Dupe",
		desc: "Ashes boost their gain"
	},
	4: {
		name: "Diet",
		desc: () => "Incinerator process requirement is x" + showNum(getRepCrUpgEffBases("4")) + " cheaper"
	},
	5: {
		name: "Ash Dupe II",
		desc: "Cadavers boost ash gain"
	},
	6 :{
		name: "Rank Completionist",
		desc: () => "Increase rank FP by +x" + showNum(getRepCrUpgEffBases("6"))
	}
}
const RCRU_AMT = Object.keys(REPEATABLE_CREMATORIUM_UPGRADES).length

const NORMAL_CREMATORIUM_UPGRADES = {
	1: {
		cost: function () {
			return new ExpantaNum(5000)
		},
		desc: function() {
			return "Ashes boost their gain"
		},
		effDisp: function() {
			return "Currently: x" + showNum(getNormCrUpgEffects("1"))
		},
	},
	2: {
		cost: function () {
			return new ExpantaNum(1e12)
		},
		desc: function() {
			return "Pathogen Upgrade power is increased multiplier below"
		},
		effDisp: function() {
			return "Currently: x" + showNum(getNormCrUpgEffects("2"))
		},
	},
	3: {
		cost: function () {
			return new ExpantaNum(1e29)
		},
		desc: function() {
			return "Ashes power up 1st Normal Crematorium Upgrade"
		},
		effDisp: function() {
			return "Currently: ^" + showNum(getNormCrUpgEffects("3"))
		},
	}
}
const NCRU_AMT = Object.keys(NORMAL_CREMATORIUM_UPGRADES).length