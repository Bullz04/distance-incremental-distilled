const PATHOGENS_UNL = new ExpantaNum(1e21);
const PTH_UPGS = {
	1: {
		start: new ExpantaNum(50),
		inc: new ExpantaNum(2),
		pow: new ExpantaNum(0.7),
		expBase: new ExpantaNum(5),
		desc: () => "Power up 2nd TR Upgrade by +^" + showNum(getPathogenUpgradeBases("1"))
	},
	2: { start: new ExpantaNum(300), inc: new ExpantaNum(10), pow: new ExpantaNum(1.5), desc: "Rocket gain is boosted by your Cadavers." },
	3: { start: new ExpantaNum(300), inc: new ExpantaNum(10), pow: new ExpantaNum(1.5), desc: "Time Cube gain is boosted by your Cadavers." },
	4: { start: new ExpantaNum(8000), inc: new ExpantaNum(2), pow: new ExpantaNum(1.25), desc: "Maximum Velocity is boosted by your Pathogens." },
	5: {
		start: new ExpantaNum(3e4),
		inc: new ExpantaNum(1.5),
		pow: new ExpantaNum(1),
		expBase: new ExpantaNum(10),
		desc: () => "Boost Pathogen gain by x" + showNum(getPathogenUpgradeBases("5"))
	},
	6: {
		start: new ExpantaNum(8000),
		inc: new ExpantaNum(12),
		pow: new ExpantaNum(1.4),
		desc: "Life Essence boosts cadaver gain."
	},
	7: {
		start: new ExpantaNum(30000),
		inc: new ExpantaNum(1.4),
		pow: new ExpantaNum(0.7),
		expBase: new ExpantaNum(6),
		desc: () => "Rocket fuel requirement scale weaker by +x" + showNum(getPathogenUpgradeBases("7"))
	},
	8: {
		start: new ExpantaNum(1e8),
		inc: new ExpantaNum(2),
		pow: new ExpantaNum(1),
		expBase: new ExpantaNum(10),
		desc: () => "Multiply 5th Pathogen Upgrade's base effect by +x" + showNum(getPathogenUpgradeBases("8"))
	},
	9: {
		start: new ExpantaNum("1e17"),
		inc: new ExpantaNum(2.5),
		pow: new ExpantaNum(1),
		expBase: new ExpantaNum(10),
		desc: () => "Power up 3rd rank reward effect by +^" + showNum(getPathogenUpgradeBases("9"))
	},
	10: {
		start: new ExpantaNum("2e20"),
		inc: new ExpantaNum(1.15),
		pow: new ExpantaNum(1),
		expBase: new ExpantaNum(1e20),
		desc: "Pathogens boost their gain"
	},
	11: {
		start: new ExpantaNum(1e75),
		inc: new ExpantaNum(1e5),
		desc: "Superscaled Rocket Fuel scaling starts later based on your Pathogens.",
		unl: function () {
			return tmp.inf ? tmp.inf.upgs.has("2;9") : false;
		}
	},
	12: {
		start: new ExpantaNum(1e80),
		inc: new ExpantaNum(1e3),
		desc: "Scaled Dark Core scaling starts later based on your Rocket Fuel.",
		unl: function () {
			return tmp.inf ? tmp.inf.upgs.has("2;9") : false;
		}
	},
	13: {
		start: new ExpantaNum(1e80),
		inc: new ExpantaNum(10),
		desc: "Pathogen Upgrade 5 gets 2 extra Levels.",
		unl: function () {
			return tmp.inf ? tmp.inf.upgs.has("2;9") : false;
		}
	},
	14: {
		start: new ExpantaNum(1e85),
		inc: new ExpantaNum(1e5),
		desc: "Scaled & Superscaled Rank scalings are weaker based on your Dark Cores.",
		unl: function () {
			return tmp.inf ? tmp.inf.upgs.has("2;9") : false;
		}
	},
	15: {
		start: new ExpantaNum(1e85),
		inc: new ExpantaNum(1e15),
		desc: "Scaled Endorsement scaling is slightly weaker.",
		unl: function () {
			return tmp.inf ? tmp.inf.upgs.has("2;9") : false;
		}
	}
};
const PTH_AMT = Object.keys(PTH_UPGS).length;

const PTH_UPG_SCS = {
	1: new ExpantaNum(1 / 0),
	2: new ExpantaNum(1 / 0),
	3: new ExpantaNum(1 / 0),
	4: new ExpantaNum(1 / 0),
	5: new ExpantaNum(1 / 0),
	6: new ExpantaNum(1 / 0),
	7: new ExpantaNum(1 / 0),
	8: new ExpantaNum(1 / 0),
	9: new ExpantaNum(1 / 0),
	10: new ExpantaNum(1 / 0),
	11: new ExpantaNum(1 / 0),
	12: new ExpantaNum(1 / 0),
	13: new ExpantaNum(1 / 0),
	14: new ExpantaNum(1 / 0),
	15: new ExpantaNum(1 / 0)
}