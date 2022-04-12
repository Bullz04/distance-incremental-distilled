const COLLAPSE_UNL = LAYER_REQS["collapse"][1];
const ESSENCE_MILESTONES = {
	1: {
		req: new ExpantaNum(1),
		desc: "Time goes by 100x faster, but this gets weaker the further you go (minimum 2x, at 50Mpc).",
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
