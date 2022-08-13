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
	14: "tiers power up 3rd rank reward",//10
	15: "quadruple your acceleration and max velocity.",
	17: "distance travelled boosts rocket gain.",
	20: "double intelligence gain.",
	21: "distance travelled boosts rocket gain.",
	25: "multiply your acceleration by 10.",
	30: "triple intelligence gain.",
	35: "time goes by 50% faster.",
	40: "intelligence boosts scrap gain",
	45: "rockets boost time cube gain",
	50: "multiply your acceleration by 15.",//20
	55: "double your maximum velocity for each rank up.",
	56: "distance travelled powers up 2nd Time Reversal upgrade.",
	60: "double scrap gain.",
	70: "time goes by 40% faster.",
	75: "multiply your acceleration by 25.",
	80: "time goes by 50% faster.",
	90: "time goes by 75% faster.",
	100: "double rocket gain.",
	111: "double intelligence gain for each rank up.",
	120: "cadavers power up 2nd Time Reversal upgrade.",//30
	125: "pathogens boost their gain.",
	130: "distance travelled powers up 12th and 14th rank reward effect.",
	175: "time cubes power up Achievement 63 effect.",
	195: "life essence boosts FP of Pathogen upgrade 5 and 8.",
	222: "rockets boost cadaver gain.",//35
	230: "ashes boost their gain",
	545: () => "raise 8th pathogen upgrade ^" + showNum(getRankEffects("37")) + ".",//37
	585: "distance travelled boost cadaver gain.",//38
	610: "distance travelled boost dark flow.",
	620: "distance travelled power up 1st Time Reversal Upgrade."//40
};

const DEFAULT_RANK_DESC = "rank up.";
// Tiers

const TIER_DESCS = {
	1: "make the rank requirement formula 15% slower.",
	2: () => "increase max velocity and acceleration by x"+ showNum(getTierEffBases("2")) +" for each rank up.",
	3: "tiers make rank requirement scale weaker.",
	4: "x30 your acceleration.",
	5: "double intelligence gain.",
	6: "quintuple your acceleration.",
	7: "time goes by 50% faster.",
	8: "time goes by 10% faster for each rocket fuel.",
	9: "multiply your acceleration by 10.",
	10: "intelligence boosts rocket gain.",//10
	11: "multiply your acceleration by 15.",
	13: "intelligence boost dark core FP.",
	14: () => "increase tier FP by x" + showNum(getTierEffects("13"))
};

const DEFAULT_TIER_DESC = "tier up.";
