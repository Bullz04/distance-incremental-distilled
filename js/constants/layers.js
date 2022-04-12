const LAYER_RESETS = {
	rank: ["distance", "velocity"],
	rankCheap: ["distance", "velocity"],
	tier: ["distance", "velocity", "rank"],
	rockets: ["distance", "velocity", "rank", "tier"],
	rf: ["distance", "velocity", "rank", "tier", "rockets"],
	collapse: ["distance", "velocity", "rank", "tier", "rockets", "rf", "tr"],
	inf: ["distance", "velocity", "rank", "tier", "rockets", "rf", "tr", "automation", "collapse", "pathogens", "dc"],
	elementary: [
		"distance",
		"velocity",
		"rank",
		"tier",
		"rockets",
		"rf",
		"tr",
		"automation",
		"collapse",
		"pathogens",
		"dc",
		"inf"
	],
	multiverse: [
		"distance",
		"velocity",
		"rank",
		"tier",
		"rockets",
		"rf",
		"tr",
		"automation",
		"collapse",
		"pathogens",
		"dc",
		"inf",
		"elementary"
	],
};

const LAYER_RESETS_EXTRA = {
	rank: ["energy", "canRefill"],
	rankCheap: ["energy", "canRefill"],
	tier: ["energy", "canRefill", "rankCheap"],
	rockets: ["energy", "canRefill", "rankCheap"],
	rf: [],
	collapse: ["energy", "canRefill", "rankCheap", "furnace"],
	inf: ["energy", "canRefill", "rankCheap", "furnace", "activeFC"],
	elementary: ["energy", "spentMotive", "energyUpgs", "canRefill", "geners", "genLvl", "spentMotiveGens", "bestMotive", "rankCheap", "furnace", "activeFC", "furnChalls", "extremeStad"],
	multiverse: ["energy", "spentMotive", "energyUpgs", "canRefill", "geners", "genLvl", "spentMotiveGens", "bestMotive", "rankCheap", "furnace", "activeFC", "furnChalls", "extremeStad", "magma", "plasma"],
};

const LAYER_REQS = {
	rank: ["distance", 10],
	tier: ["rank", 3],
	rockets: ["distance", new EN(1e40)],
	rf: ["rockets", 100],
	collapse: ["distance", new ExpantaNum("1e470")],
	inf: ["distance", new ExpantaNum("1e1e6")],
	elementary: [
		["rockets", new ExpantaNum("1e300000")],
		["cadavers", new ExpantaNum("1e30000")],
		["endorsements", 36]
	],
	multiverse: ["distance", DISTANCES.mlt],
};

const LAYER_FP = {
	rank: 1,
	tier: 1,
	rockets: 1/10,
	rf: 1,
	collapse: 1/70,
	inf: 1,
	elementary: 1,
	multiverse: 1,
};

const LAYER_SC = {
	rank: new ExpantaNum(1 / 0),
	tier: new ExpantaNum(1 / 0),
	rockets: new ExpantaNum(1 / 0),
	rf: new ExpantaNum(1 / 0),
	collapse: new ExpantaNum(1 / 0),
	inf: new ExpantaNum(1 / 0),
	elementary: new ExpantaNum(1 / 0),
	multiverse: new ExpantaNum(1 / 0),
};

const LAYER_RESETS_NOTHING = {
	rank() { return tmp.collapse ? hasCollapseMilestone(12) : false },
	rankCheap() { return tmp.ach[112].has },
	tier() { return player.tr.upgrades.includes(14) && !HCCBA("noTRU") },
	rockets() { return false },
	rf() { return modeActive("extreme") ? (player.tr.upgrades.includes(17) && !HCCBA("noTRU")) : player.inf.unl },
	collapse() { return false },
	inf() { return false },
	elementary() { return false },
	multiverse() { return false },
}