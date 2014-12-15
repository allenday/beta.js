//by http://twitter.com/allenday
//bitten from https://github.com/substack/gamma.js/blob/master/index.js
//bitten, in turn, from http://en.wikipedia.org/wiki/Lanczos_approximation

var g = 7;
var p = [
   0.99999999999980993,
   676.5203681218851,
   -1259.1392167224028,
   771.32342877765313,
   -176.61502916214059,
   12.507343278686905,
   -0.13857109526572012,
   9.9843695780195716e-6,
   1.5056327351493116e-7
];

var g_ln = 607/128;
var p_ln = [
   0.99999999999999709182,
   57.156235665862923517,
   -59.597960355475491248,
   14.136097974741747174,
   -0.49191381609762019978,
   0.33994649984811888699e-4,
   0.46523628927048575665e-4,
   -0.98374475304879564677e-4,
   0.15808870322491248884e-3,
   -0.21026444172410488319e-3,
   0.21743961811521264320e-3,
   -0.16431810653676389022e-3,
   0.84418223983852743293e-4,
   -0.26190838401581408670e-4,
   0.36899182659531622704e-5
];

// Spouge approximation (suitable for large arguments)
function lngamma(z) {

	//console.log("        z   ="+z);
	if(z < 0) return Number('0/0');
	var x = p_ln[0];
	for(var i = p_ln.length - 1; i > 0; --i) x += p_ln[i] / (z + i);
	var t = z + g_ln + 0.5;
	//console.log("        g_ln="+g_ln);
	//console.log("        t   ="+t);

	var c1 = .5*Math.log(2*Math.PI);
	//console.log("        c1  ="+c1);
	var c2 = (z+.5)*Math.log(t);
	//console.log("        c2  ="+c2);
	var c3 = Math.log(x);
	//console.log("        c3  ="+c3);
	var c4 = Math.log(z);
	//console.log("        c4  ="+c4);

	//console.log("        lng0="+(c1+c2-t+c3-c4));

	var lng = .5*Math.log(2*Math.PI)+(z+.5)*Math.log(t)-t+Math.log(x)-Math.log(z);
	//console.log("        lng ="+lng);
	return lng;
}

function gamma(z) {
	if (z < 0.5) {
		//console.log("      z1         ="+z);
		return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z));
	}
	else if(z > 100) {
		//console.log("      z2         ="+z);
		var lng = lngamma(z);
		//console.log("      lng        ="+lng);
		var explng = Math.exp(lng);
		//console.log("      explng     ="+explng);
		if ( explng == Number.POSITIVE_INFINITY ) {
			explng = Number.MAX_VALUE;
			//console.log("      explng==Infinity");
		}
		return explng;
	}
	else {
		//console.log("      z3         ="+z);
		z -= 1;
		var x = p[0];
		for (var i = 1; i < g + 2; i++) {
			x += p[i] / (z + i);
		}
		var t = z + g + 0.5;

		return Math.sqrt(2 * Math.PI)
			* Math.pow(t, z + 0.5)
			* Math.exp(-t)
			* x
			;
	}
}

function _compute(Z,A,B) {
	//console.log("    Z="+Z+" A="+A+" B="+B);
	var gammaAB = gamma(A+B);
	//console.log("    gamma(A+B)="+gammaAB);
	var gammaA  = gamma(A);
	//console.log("    gamma(A)  ="+gammaA);
	var gammaB  = gamma(B);
	//console.log("    gamma(B)  ="+gammaB);
	var c1 = Math.pow(Z,A-1);
	//console.log("    c1        ="+c1);
	var c2 = Math.pow(1-Z,B-1);
	if ( c2 == 0 ) {
		c2 = Number.MIN_VALUE;
	}
	//console.log("    c2        ="+c2);
	var den = (gammaA*gammaB);
	if ( den == Number.POSITIVE_INFINITY ) {
		den = Number.MAX_VALUE;
	}
	//console.log("    den       ="+den);
	return gammaAB/den * c1 * c2;
}

function _scale(A,B,step) {
	//console.log(step);
	if (step == undefined ) {
		step = 0.001;
	}
	var cum = 0;
	for (var i = 0; i < 1; i += step) {
		//console.log("  i="+i+" cum="+cum);
		cum += _compute(i,A,B);
	}
	return 1/cum;
}

function BetaPDF(A,B,Z,precision) {
	var scale = _scale(A,B);
	//console.log(scale);
	return _compute(Z,A,B) * scale;
}

function BetaPDFRange(A,B,Zmin,Zmax,Zstep,precision) {
	var scale = _scale(A,B,Zstep);
	//console.log("scale="+scale);
	if (Zstep == undefined ) {
		Zstep = 0.001;
	}
	//console.log(scale);
	var v = [];
	var x = [];
	var y = [];
	for (var i = Zmin; i <= Zmax; i += Zstep) {
		var Bep = _compute(i,A,B) * scale;
		//var Beps = " "+Bep
		//Beps=Number(Beps.substr(0,8));
		//var is = " "+i;
		//is=Number(is.substr(0,8));
		x.push(i);
		y.push(Math.log(Bep));
		v.push([i,Bep]);
	}
	//return [x,y];
	return v;
}

function plotBetaPDF(element, alpha, beta, pMin, pMax, pStep) {
	var tuples = BetaPDFRange(alpha,beta,pMin,pMax,pStep);    
	tuples.unshift(['x','p']);
	var data = google.visualization.arrayToDataTable(tuples);
	var options = {
		//title: 'PDF of Beta(['+pMin+'..'+pMax+'],'+alpha+','+beta+'), step='+pStep,
		hAxis: {title: 'x', gridlineColor: 'transparent', baselineColor: 'transparent', textPosition: 'none'},
       		vAxis: {title: 'p', gridlineColor: 'transparent', baselineColor: 'transparent', textPosition: 'none', titleTextStyle: {color: 'transparent'}},
       		legend:{position:'none'}
	};
	var chart = new google.visualization.LineChart(document.getElementById(element));
	chart.draw(data, options);
}
