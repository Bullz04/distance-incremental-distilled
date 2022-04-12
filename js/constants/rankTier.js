// Ranks

const RANK_DESCS = {
	1: "x5 max velocity",
	2: () => "increase the acceleration and maximum velocity by x" + showNum(getRankEffBases("2")) + " for each rank up.",
	3: () => "distance travelled boosts maximum velocity and acceleration.",
	4: "triple your acceleration & maximum velocity for each tier up.",
	5: () => "increase the acceleration and maximum velocity by x" + showNum(getRankEffBases("5")) + " for each rank up.",
	8: "increase your maximum velocity and acceleration by x3 for each rank up.",
	9: "ranks boost 2nd rank reward base.",
	10: "double your acceleration.",
	12: "distance travelled boosts 5th rank reward base",
	14: "tiers power up 3rd rank reward",
	15: "quadruple your acceleration and max velocity.",
	17: "distance travelled boosts rocket gain.",
	20: "double intelligence gain.",
	21: "distance travelled boosts rocket gain.",
	25: "multiply your acceleration by 10.",
	30: "triple intelligence gain.",
	35: "time goes by 50% faster.",
	40: "intelligence boosts scrap gain",
	45: "rockets boost time cube gain",
	50: "multiply your acceleration by 15.",
	55: "double your maximum velocity for each rank up.",
	56: "distance travelled powers up 2nd Time Reversal upgrade",
	60: "double scrap gain.",
	70: "time goes by 40% faster.",
	75: "multiply your acceleration by 25.",
	80: "time goes by 50% faster.",
	90: "time goes by 75% faster.",
	100: "double rocket gain.",
	111: "double intelligence gain for each rank up.",
	120: "Cadavers power up 2nd Time Reversal upgrade",
	125: "Pathogens boost their gain.",
};

const DEFAULT_RANK_DESC = "rank up.";
// Tiers

const TIER_DESCS = {
	0: "make the rank requirement formula 15% slower.",
	1: "increase max velocity and acceleration by x1.3 for each rank up",
	2: "tiers make rank requirement scale weaker.",
	3: "triple your acceleration.",
	4: "double intelligence gain.",
	5: "quintuple your acceleration.",
	6: "time goes by 50% faster.",
	7: "time goes by 10% faster for each rocket fuel.",
	8: "multiply your acceleration by 10.",
	9: "intelligence boosts maximum velocity.",
	10: "multiply your acceleration by 15.",
	12: "triple intelligence gain.",
	13: "quadruple intelligence gain.",
	15: "multiply your acceleration by 25.",
	16: "time goes by 60% faster.",
	18: "time goes by 80% faster.",
	20: "time goes by 100% faster."
};

const DEFAULT_TIER_DESC = "tier up.";
