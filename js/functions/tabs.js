// Normal Tabs

function isTabShown(name) {
	return player.tab == name;
}

function getTabBtnsShown() {
	let btns = [];
	for (j = 0; j < Object.keys(TABBTN_SHOWN).length; j++) 
		if (Object.values(TABBTN_SHOWN)[j]()) btns.push(Object.keys(TABBTN_SHOWN)[j]);
	return btns;
}

function updateTabs() {
	if (player.options.tabsHidden===undefined) player.options.tabsHidden = [];
	var tabs = document.getElementsByClassName("tab");
	for (i = 0; i < tabs.length; i++) {
		var el = new Element(tabs[i].id);
		el.setDisplay(isTabShown(tabs[i].id));
		var elT = new Element(tabs[i].id + "tabbtn");
		elT.changeStyle("visibility", getTabBtnsShown().includes(tabs[i].id)?"visible":"hidden");
		elT.setDisplay(!player.options.tabsHidden.includes(tabs[i].id))
	}
	if (!player.options.tabsHidden.includes("furnace")) new Element("furnacetabbtn").setDisplay(player.modes.includes("extreme"))
	if (!player.options.tabsHidden.includes("energy")) new Element("energytabbtn").setDisplay(player.modes.includes("hikers_dream"))
}

function showTab(name) {
	player.tab = name;
}

// Options Tabs

function isOptionsTabShown(name) {
	return player.optionsTab == name;
}

function updateOptionsTabs() {
	var tabs = document.getElementsByClassName("optionstab");
	for (i = 0; i < tabs.length; i++) {
		var el = new Element(tabs[i].id);
		el.setDisplay(isOptionsTabShown(tabs[i].id));
	}
}

function showOptionsTab(name) {
	player.optionsTab = name;
}

// Stats Tabs

function isStatTabShown(name) {
	return statTab == name;
}

function getStatTabBtnsShown() {
	let btns = [];
	for (j = 0; j < Object.keys(STAT_TABBTN_SHOWN).length; j++)
		if (Object.values(STAT_TABBTN_SHOWN)[i]()) btns.push(Object.keys(STAT_TABBTN_SHOWN)[i]);
	return btns;
}

function updateStatTabs() {
	var tabs = document.getElementsByClassName("stattab");
	for (i = 0; i < tabs.length; i++) {
		var el = new Element(tabs[i].id);
		el.setDisplay(isStatTabShown(tabs[i].id));
		var elT = new Element(tabs[i].id + "btn");
		elT.changeStyle("visibility", getStatTabBtnsShown().includes(tabs[i].id)?"visible":"hidden");
	}
}

function showStatTab(name) {
	statTab = name;
}

// Collapse Tabs

function isCollapseTabShown(name) {
	return collapseTab == name;
}

function getCollapseTabBtnsShown() {
	let btns = [];
	for (j = 0; j < Object.keys(COLLAPSE_TABBTN_SHOWN).length; j++)
		if (Object.values(COLLAPSE_TABBTN_SHOWN)[i]()) btns.push(Object.keys(COLLAPSE_TABBTN_SHOWN)[i]);
	return btns;
}

function updateCollapseTabs() {
	var tabs = document.getElementsByClassName("collapseTab");
	for (i = 0; i < tabs.length; i++) {
		var el = new Element(tabs[i].id);
		el.setDisplay(isCollapseTabShown(tabs[i].id));
		var elT = new Element(tabs[i].id + "CollapseTabButton");
		//elT.changeStyle("visibility", getCollapseTabBtnsShown().includes(tabs[i].id)?"visible":"hidden");
		elT.setDisplay(getCollapseTabBtnsShown().includes(tabs[i].id));
	}
}

function showCollapseTab(name) {
	collapseTab = name;
}