(()=>{"use strict";class t{constructor(t,e,n){this._title=t,this._dueDate=e,this._priority=n}getTitle(){return this._title}set title(t){this._title=t}getDueDate(){return this._dueDate}set dueDate(t){this._dueDate=t}get priority(){return this._priority}set priority(t){this.priority=t}}class e{constructor(t){this._name=t,this._tasks=[]}setName(t){this._name=t}getName(){return this._name}setTasks(t){this._tasks=t}getTasks(){return this._tasks}getTask(t){return this.getTasks().find((e=>e.getTitle()==t))}addTask(t){this._tasks.push(t)}deleteTask(t){const e=this.getTasks().findIndex((e=>e.getTitle()==t));this.getTasks().splice(e,1)}clear(){this._tasks=[]}}class n{constructor(){this._projects=[],this._projects.push(new e("Inbox")),this._projects.push(new e("Done")),this._projects.push(new e("Today's Tasks")),this._projects.push(new e("This Week's Tasks"))}setProjects(t){this._projects=t}getProjects(){return this._projects}getProject(t){return this.getProjects().find((e=>e.getName()==t))}addProject(t){this._projects.push(t)}}class a{static getProjectList(){const a=Object.assign(new n,JSON.parse(localStorage.getItem("savedList")));return a.setProjects(a.getProjects().map((t=>Object.assign(new e,t)))),a.getProjects().forEach((e=>e.setTasks(e.getTasks().map((e=>Object.assign(new t,e)))))),a}static saveProjectList(t){localStorage.setItem("savedList",JSON.stringify(t))}static addTask(t,e){const n=a.getProjectList();n.getProject(t).addTask(e),a.saveProjectList(n)}static deleteTask(t,e){const n=a.getProjectList();n.getProject(t).deleteTask(e),a.saveProjectList(n)}static addProject(t){const e=a.getProjectList();e.addProject(t),a.saveProjectList(e)}}function r(t,e){if(e.length<t)throw new TypeError(t+" argument"+(t>1?"s":"")+" required, but only "+e.length+" present")}function o(t){r(1,arguments);var e=Object.prototype.toString.call(t);return t instanceof Date||"object"==typeof t&&"[object Date]"===e?new Date(t.getTime()):"number"==typeof t||"[object Number]"===e?new Date(t):("string"!=typeof t&&"[object String]"!==e||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}function i(t){r(1,arguments);var e=o(t);return!isNaN(e)}var s={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function c(t){return function(e){var n=e||{},a=n.width?String(n.width):t.defaultWidth;return t.formats[a]||t.formats[t.defaultWidth]}}var u,d={date:c({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:c({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:c({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},l={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function h(t){return function(e,n){var a,r=n||{};if("formatting"===(r.context?String(r.context):"standalone")&&t.formattingValues){var o=t.defaultFormattingWidth||t.defaultWidth,i=r.width?String(r.width):o;a=t.formattingValues[i]||t.formattingValues[o]}else{var s=t.defaultWidth,c=r.width?String(r.width):t.defaultWidth;a=t.values[c]||t.values[s]}return a[t.argumentCallback?t.argumentCallback(e):e]}}function m(t){return function(e,n){var a=String(e),r=n||{},o=r.width,i=o&&t.matchPatterns[o]||t.matchPatterns[t.defaultMatchWidth],s=a.match(i);if(!s)return null;var c,u=s[0],d=o&&t.parsePatterns[o]||t.parsePatterns[t.defaultParseWidth];return c="[object Array]"===Object.prototype.toString.call(d)?function(t,e){for(var n=0;n<t.length;n++)if(t[n].test(u))return n}(d):function(t,e){for(var n in t)if(t.hasOwnProperty(n)&&t[n].test(u))return n}(d),c=t.valueCallback?t.valueCallback(c):c,{value:c=r.valueCallback?r.valueCallback(c):c,rest:a.slice(u.length)}}}const g={code:"en-US",formatDistance:function(t,e,n){var a;return n=n||{},a="string"==typeof s[t]?s[t]:1===e?s[t].one:s[t].other.replace("{{count}}",e),n.addSuffix?n.comparison>0?"in "+a:a+" ago":a},formatLong:d,formatRelative:function(t,e,n,a){return l[t]},localize:{ordinalNumber:function(t,e){var n=Number(t),a=n%100;if(a>20||a<10)switch(a%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:h({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:h({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:function(t){return Number(t)-1}}),month:h({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:h({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:h({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(u={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:function(t){return parseInt(t,10)}},function(t,e){var n=String(t),a=e||{},r=n.match(u.matchPattern);if(!r)return null;var o=r[0],i=n.match(u.parsePattern);if(!i)return null;var s=u.valueCallback?u.valueCallback(i[0]):i[0];return{value:s=a.valueCallback?a.valueCallback(s):s,rest:n.slice(o.length)}}),era:m({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:m({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(t){return t+1}}),month:m({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:m({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:m({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};function f(t){if(null===t||!0===t||!1===t)return NaN;var e=Number(t);return isNaN(e)?e:e<0?Math.ceil(e):Math.floor(e)}function w(t,e){r(2,arguments);var n=o(t).getTime(),a=f(e);return new Date(n+a)}function p(t,e){r(2,arguments);var n=f(e);return w(t,-n)}function y(t,e){for(var n=t<0?"-":"",a=Math.abs(t).toString();a.length<e;)a="0"+a;return n+a}const v=function(t,e){var n=t.getUTCFullYear(),a=n>0?n:1-n;return y("yy"===e?a%100:a,e.length)},T=function(t,e){var n=t.getUTCMonth();return"M"===e?String(n+1):y(n+1,2)},b=function(t,e){return y(t.getUTCDate(),e.length)},P=function(t,e){return y(t.getUTCHours()%12||12,e.length)},k=function(t,e){return y(t.getUTCHours(),e.length)},C=function(t,e){return y(t.getUTCMinutes(),e.length)},D=function(t,e){return y(t.getUTCSeconds(),e.length)},j=function(t,e){var n=e.length,a=t.getUTCMilliseconds();return y(Math.floor(a*Math.pow(10,n-3)),e.length)};var E=864e5;function x(t){r(1,arguments);var e=1,n=o(t),a=n.getUTCDay(),i=(a<e?7:0)+a-e;return n.setUTCDate(n.getUTCDate()-i),n.setUTCHours(0,0,0,0),n}function L(t){r(1,arguments);var e=o(t),n=e.getUTCFullYear(),a=new Date(0);a.setUTCFullYear(n+1,0,4),a.setUTCHours(0,0,0,0);var i=x(a),s=new Date(0);s.setUTCFullYear(n,0,4),s.setUTCHours(0,0,0,0);var c=x(s);return e.getTime()>=i.getTime()?n+1:e.getTime()>=c.getTime()?n:n-1}function M(t){r(1,arguments);var e=L(t),n=new Date(0);n.setUTCFullYear(e,0,4),n.setUTCHours(0,0,0,0);var a=x(n);return a}var I=6048e5;function B(t,e){r(1,arguments);var n=e||{},a=n.locale,i=a&&a.options&&a.options.weekStartsOn,s=null==i?0:f(i),c=null==n.weekStartsOn?s:f(n.weekStartsOn);if(!(c>=0&&c<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var u=o(t),d=u.getUTCDay(),l=(d<c?7:0)+d-c;return u.setUTCDate(u.getUTCDate()-l),u.setUTCHours(0,0,0,0),u}function S(t,e){r(1,arguments);var n=o(t,e),a=n.getUTCFullYear(),i=e||{},s=i.locale,c=s&&s.options&&s.options.firstWeekContainsDate,u=null==c?1:f(c),d=null==i.firstWeekContainsDate?u:f(i.firstWeekContainsDate);if(!(d>=1&&d<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var l=new Date(0);l.setUTCFullYear(a+1,0,d),l.setUTCHours(0,0,0,0);var h=B(l,e),m=new Date(0);m.setUTCFullYear(a,0,d),m.setUTCHours(0,0,0,0);var g=B(m,e);return n.getTime()>=h.getTime()?a+1:n.getTime()>=g.getTime()?a:a-1}function U(t,e){r(1,arguments);var n=e||{},a=n.locale,o=a&&a.options&&a.options.firstWeekContainsDate,i=null==o?1:f(o),s=null==n.firstWeekContainsDate?i:f(n.firstWeekContainsDate),c=S(t,e),u=new Date(0);u.setUTCFullYear(c,0,s),u.setUTCHours(0,0,0,0);var d=B(u,e);return d}var N=6048e5;function W(t,e){var n=t>0?"-":"+",a=Math.abs(t),r=Math.floor(a/60),o=a%60;if(0===o)return n+String(r);var i=e||"";return n+String(r)+i+y(o,2)}function Y(t,e){return t%60==0?(t>0?"-":"+")+y(Math.abs(t)/60,2):q(t,e)}function q(t,e){var n=e||"",a=t>0?"-":"+",r=Math.abs(t);return a+y(Math.floor(r/60),2)+n+y(r%60,2)}const O={G:function(t,e,n){var a=t.getUTCFullYear()>0?1:0;switch(e){case"G":case"GG":case"GGG":return n.era(a,{width:"abbreviated"});case"GGGGG":return n.era(a,{width:"narrow"});case"GGGG":default:return n.era(a,{width:"wide"})}},y:function(t,e,n){if("yo"===e){var a=t.getUTCFullYear(),r=a>0?a:1-a;return n.ordinalNumber(r,{unit:"year"})}return v(t,e)},Y:function(t,e,n,a){var r=S(t,a),o=r>0?r:1-r;return"YY"===e?y(o%100,2):"Yo"===e?n.ordinalNumber(o,{unit:"year"}):y(o,e.length)},R:function(t,e){return y(L(t),e.length)},u:function(t,e){return y(t.getUTCFullYear(),e.length)},Q:function(t,e,n){var a=Math.ceil((t.getUTCMonth()+1)/3);switch(e){case"Q":return String(a);case"QQ":return y(a,2);case"Qo":return n.ordinalNumber(a,{unit:"quarter"});case"QQQ":return n.quarter(a,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(a,{width:"narrow",context:"formatting"});case"QQQQ":default:return n.quarter(a,{width:"wide",context:"formatting"})}},q:function(t,e,n){var a=Math.ceil((t.getUTCMonth()+1)/3);switch(e){case"q":return String(a);case"qq":return y(a,2);case"qo":return n.ordinalNumber(a,{unit:"quarter"});case"qqq":return n.quarter(a,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(a,{width:"narrow",context:"standalone"});case"qqqq":default:return n.quarter(a,{width:"wide",context:"standalone"})}},M:function(t,e,n){var a=t.getUTCMonth();switch(e){case"M":case"MM":return T(t,e);case"Mo":return n.ordinalNumber(a+1,{unit:"month"});case"MMM":return n.month(a,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(a,{width:"narrow",context:"formatting"});case"MMMM":default:return n.month(a,{width:"wide",context:"formatting"})}},L:function(t,e,n){var a=t.getUTCMonth();switch(e){case"L":return String(a+1);case"LL":return y(a+1,2);case"Lo":return n.ordinalNumber(a+1,{unit:"month"});case"LLL":return n.month(a,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(a,{width:"narrow",context:"standalone"});case"LLLL":default:return n.month(a,{width:"wide",context:"standalone"})}},w:function(t,e,n,a){var i=function(t,e){r(1,arguments);var n=o(t),a=B(n,e).getTime()-U(n,e).getTime();return Math.round(a/N)+1}(t,a);return"wo"===e?n.ordinalNumber(i,{unit:"week"}):y(i,e.length)},I:function(t,e,n){var a=function(t){r(1,arguments);var e=o(t),n=x(e).getTime()-M(e).getTime();return Math.round(n/I)+1}(t);return"Io"===e?n.ordinalNumber(a,{unit:"week"}):y(a,e.length)},d:function(t,e,n){return"do"===e?n.ordinalNumber(t.getUTCDate(),{unit:"date"}):b(t,e)},D:function(t,e,n){var a=function(t){r(1,arguments);var e=o(t),n=e.getTime();e.setUTCMonth(0,1),e.setUTCHours(0,0,0,0);var a=e.getTime(),i=n-a;return Math.floor(i/E)+1}(t);return"Do"===e?n.ordinalNumber(a,{unit:"dayOfYear"}):y(a,e.length)},E:function(t,e,n){var a=t.getUTCDay();switch(e){case"E":case"EE":case"EEE":return n.day(a,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(a,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(a,{width:"short",context:"formatting"});case"EEEE":default:return n.day(a,{width:"wide",context:"formatting"})}},e:function(t,e,n,a){var r=t.getUTCDay(),o=(r-a.weekStartsOn+8)%7||7;switch(e){case"e":return String(o);case"ee":return y(o,2);case"eo":return n.ordinalNumber(o,{unit:"day"});case"eee":return n.day(r,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(r,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(r,{width:"short",context:"formatting"});case"eeee":default:return n.day(r,{width:"wide",context:"formatting"})}},c:function(t,e,n,a){var r=t.getUTCDay(),o=(r-a.weekStartsOn+8)%7||7;switch(e){case"c":return String(o);case"cc":return y(o,e.length);case"co":return n.ordinalNumber(o,{unit:"day"});case"ccc":return n.day(r,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(r,{width:"narrow",context:"standalone"});case"cccccc":return n.day(r,{width:"short",context:"standalone"});case"cccc":default:return n.day(r,{width:"wide",context:"standalone"})}},i:function(t,e,n){var a=t.getUTCDay(),r=0===a?7:a;switch(e){case"i":return String(r);case"ii":return y(r,e.length);case"io":return n.ordinalNumber(r,{unit:"day"});case"iii":return n.day(a,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(a,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(a,{width:"short",context:"formatting"});case"iiii":default:return n.day(a,{width:"wide",context:"formatting"})}},a:function(t,e,n){var a=t.getUTCHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(a,{width:"narrow",context:"formatting"});case"aaaa":default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},b:function(t,e,n){var a,r=t.getUTCHours();switch(a=12===r?"noon":0===r?"midnight":r/12>=1?"pm":"am",e){case"b":case"bb":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(a,{width:"narrow",context:"formatting"});case"bbbb":default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},B:function(t,e,n){var a,r=t.getUTCHours();switch(a=r>=17?"evening":r>=12?"afternoon":r>=4?"morning":"night",e){case"B":case"BB":case"BBB":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(a,{width:"narrow",context:"formatting"});case"BBBB":default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},h:function(t,e,n){if("ho"===e){var a=t.getUTCHours()%12;return 0===a&&(a=12),n.ordinalNumber(a,{unit:"hour"})}return P(t,e)},H:function(t,e,n){return"Ho"===e?n.ordinalNumber(t.getUTCHours(),{unit:"hour"}):k(t,e)},K:function(t,e,n){var a=t.getUTCHours()%12;return"Ko"===e?n.ordinalNumber(a,{unit:"hour"}):y(a,e.length)},k:function(t,e,n){var a=t.getUTCHours();return 0===a&&(a=24),"ko"===e?n.ordinalNumber(a,{unit:"hour"}):y(a,e.length)},m:function(t,e,n){return"mo"===e?n.ordinalNumber(t.getUTCMinutes(),{unit:"minute"}):C(t,e)},s:function(t,e,n){return"so"===e?n.ordinalNumber(t.getUTCSeconds(),{unit:"second"}):D(t,e)},S:function(t,e){return j(t,e)},X:function(t,e,n,a){var r=(a._originalDate||t).getTimezoneOffset();if(0===r)return"Z";switch(e){case"X":return Y(r);case"XXXX":case"XX":return q(r);case"XXXXX":case"XXX":default:return q(r,":")}},x:function(t,e,n,a){var r=(a._originalDate||t).getTimezoneOffset();switch(e){case"x":return Y(r);case"xxxx":case"xx":return q(r);case"xxxxx":case"xxx":default:return q(r,":")}},O:function(t,e,n,a){var r=(a._originalDate||t).getTimezoneOffset();switch(e){case"O":case"OO":case"OOO":return"GMT"+W(r,":");case"OOOO":default:return"GMT"+q(r,":")}},z:function(t,e,n,a){var r=(a._originalDate||t).getTimezoneOffset();switch(e){case"z":case"zz":case"zzz":return"GMT"+W(r,":");case"zzzz":default:return"GMT"+q(r,":")}},t:function(t,e,n,a){var r=a._originalDate||t;return y(Math.floor(r.getTime()/1e3),e.length)},T:function(t,e,n,a){return y((a._originalDate||t).getTime(),e.length)}};function A(t,e){switch(t){case"P":return e.date({width:"short"});case"PP":return e.date({width:"medium"});case"PPP":return e.date({width:"long"});case"PPPP":default:return e.date({width:"full"})}}function _(t,e){switch(t){case"p":return e.time({width:"short"});case"pp":return e.time({width:"medium"});case"ppp":return e.time({width:"long"});case"pppp":default:return e.time({width:"full"})}}const F={p:_,P:function(t,e){var n,a=t.match(/(P+)(p+)?/),r=a[1],o=a[2];if(!o)return A(t,e);switch(r){case"P":n=e.dateTime({width:"short"});break;case"PP":n=e.dateTime({width:"medium"});break;case"PPP":n=e.dateTime({width:"long"});break;case"PPPP":default:n=e.dateTime({width:"full"})}return n.replace("{{date}}",A(r,e)).replace("{{time}}",_(o,e))}};function X(t){var e=new Date(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds(),t.getMilliseconds()));return e.setUTCFullYear(t.getFullYear()),t.getTime()-e.getTime()}var z=["D","DD"],H=["YY","YYYY"];function Q(t){return-1!==z.indexOf(t)}function G(t){return-1!==H.indexOf(t)}function R(t,e,n){if("YYYY"===t)throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(e,"`) for formatting years to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("YY"===t)throw new RangeError("Use `yy` instead of `YY` (in `".concat(e,"`) for formatting years to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("D"===t)throw new RangeError("Use `d` instead of `D` (in `".concat(e,"`) for formatting days of the month to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("DD"===t)throw new RangeError("Use `dd` instead of `DD` (in `".concat(e,"`) for formatting days of the month to the input `").concat(n,"`; see: https://git.io/fxCyr"))}var J=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,V=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,K=/^'([^]*?)'?$/,$=/''/g,Z=/[a-zA-Z]/;function tt(t){return t.match(K)[1].replace($,"'")}class et{static initialiseButtons(){const t=document.getElementById("addTaskBtn"),e=document.getElementById("cancelAddTaskBtn"),n=document.getElementById("createTaskBtn"),a=document.getElementById("inboxIcon"),r=document.getElementById("todayIcon"),o=(document.getElementById("weekIcon"),document.getElementById("projectIcon")),i=document.getElementById("addProjectButton"),s=document.getElementById("cancelAddProjectBtn"),c=document.getElementById("createProjectBtn"),u=document.getElementById("removeToDosBtn"),d=document.getElementById("doneIcon");t.addEventListener("click",et.openAddTaskPopup),e.addEventListener("click",et.closeAddTaskPopup),n.addEventListener("click",nt.createTask),a.addEventListener("click",et.openInbox),o.addEventListener("click",et.openProjectPage),i.addEventListener("click",et.openAddProjectPopup),s.addEventListener("click",et.closeProjectPopup),c.addEventListener("click",nt.handleCreateProjectButton),u.addEventListener("click",nt.shiftDoneItems),d.addEventListener("click",et.openDoneToDosPage),r.addEventListener("click",nt.handleTodayListButton),window.addEventListener("click",(()=>{document.getElementById("context-menu").classList.remove("active")}))}static openContextMenu(t){var e=document.getElementById("context-menu");let n=et.getPosition(t);e.style.left=n.x+"px",e.style.top=n.y+"px",e.classList.add("active")}static showProject(t){const e=a.getProjectList().getProject(t);et.changeLayout("toDoList"),et.resetInputs(t),et.changeProjectTitle(t),et.showToDoList(e)}static resetInputs(t){et.showAddTaskButton(),et.closeAddTaskPopup(),"Today's Tasks"!=t&&"This Week's Tasks"!=t&&"Done"!=t||et.hideAddTaskButton(),document.getElementById("taskTextInput").value="",document.getElementById("dateInput").value=""}static showToDoList(t){et.resetList();for(let e=0;e<t.getTasks().length;e++){const n=et.createTaskDivs(t.getTasks()[e]);et.displayTaskDiv(n)}}static changeProjectTitle(t){document.getElementById("listTitle").textContent=t}static getProjectName(){return this.querySelector("p").textContent}static createTaskDivs(t){const e=et.createCircle(),n=et.createTaskInfo(t),a=et.createDeleteButton(t),r=document.createElement("div");return r.classList.add("task"),r.append(e,n,a),r.addEventListener("click",nt.handleClickOnTask),r.addEventListener("contextmenu",(t=>{t.preventDefault(),et.openContextMenu(t)})),r}static displayTaskDiv(t){document.getElementById("list").appendChild(t)}static createCircle(){const t=document.createElement("i");return t.classList.add("far","fa-circle"),et.embedInDiv(t,"taskCheckCircle")}static createDeleteButton(t){const e=document.createElement("i");e.classList.add("fas","fa-times","deleteIcon");const n=et.embedInDiv(e,"taskCancelButton");return n.addEventListener("click",nt.deleteTask),n}static createTaskInfo(t){const e=document.createElement("p");e.textContent=t.getTitle();const n=document.createElement("div");if(n.append(e),""!==t.getDueDate()){const e=document.createElement("p");e.textContent=t.getDueDate();const a=et.embedInDiv(e,"taskDateDiv");n.append(a)}return n}static resetList(){document.getElementById("list").innerHTML=""}static openAddTaskPopup(){document.getElementById("addTaskPopup").style.display="flex",document.getElementById("addTaskBtn").style.display="none"}static closeAddTaskPopup(){const t=document.getElementById("addTaskPopup");t.style.display="none",document.getElementById("addTaskBtn").style.display="flex",et.deleteErrorMessage(t)}static copyTaskInputInformation(){return{title:document.getElementById("taskTextInput").value,date:function(t,e,n){r(2,arguments);var a=String(e),s=n||{},c=s.locale||g,u=c.options&&c.options.firstWeekContainsDate,d=null==u?1:f(u),l=null==s.firstWeekContainsDate?d:f(s.firstWeekContainsDate);if(!(l>=1&&l<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var h=c.options&&c.options.weekStartsOn,m=null==h?0:f(h),w=null==s.weekStartsOn?m:f(s.weekStartsOn);if(!(w>=0&&w<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");if(!c.localize)throw new RangeError("locale must contain localize property");if(!c.formatLong)throw new RangeError("locale must contain formatLong property");var y=o(t);if(!i(y))throw new RangeError("Invalid time value");var v=X(y),T=p(y,v),b={firstWeekContainsDate:l,weekStartsOn:w,locale:c,_originalDate:y};return a.match(V).map((function(t){var e=t[0];return"p"===e||"P"===e?(0,F[e])(t,c.formatLong,b):t})).join("").match(J).map((function(n){if("''"===n)return"'";var a=n[0];if("'"===a)return tt(n);var r=O[a];if(r)return!s.useAdditionalWeekYearTokens&&G(n)&&R(n,e,t),!s.useAdditionalDayOfYearTokens&&Q(n)&&R(n,e,t),r(T,n,c.localize,b);if(a.match(Z))throw new RangeError("Format string contains an unescaped latin alphabet character `"+a+"`");return n})).join("")}(new Date(document.getElementById("dateInput").value),"dd.MM.yyyy")}}static showTaskError(){const t=document.getElementById("addTaskPopup");if("errorMessageDiv"==t.lastChild.id)return;const e=document.createElement("h4");e.textContent="Task needs a title";let n=et.embedInDiv(e,"errorMessageDiv");t.appendChild(n)}static showAddTaskButton(){document.getElementById("addTaskBtn").style.display="flex"}static hideAddTaskButton(){document.getElementById("addTaskBtn").style.display="none"}static markTaskFinished(t){t.classList.add("finished"),t.removeChild(t.querySelector("#taskCheckCircle")),t.prepend(et.createCheckedCircle())}static markNotFinished(t){t.classList.remove("finished"),t.removeChild(t.querySelector("#taskCheckCircle")),t.prepend(et.createCircle())}static createCheckedCircle(){const t=document.createElement("i");return t.classList.add("far","fa-check-circle"),et.embedInDiv(t,"taskCheckCircle")}static openInbox(){et.showProject("Inbox")}static openDoneToDosPage(){et.showProject("Done")}static openProjectPage(){et.changeLayout("projectList"),et.showAllProjects()}static showAllProjects(){et.clearProjectList();const t=a.getProjectList().getProjects(),e=document.getElementById("projectListDiv");for(let n=0;n<t.length;n++){const a=et.createProjectDiv(t[n]);a.classList.add("projectDiv"),e.appendChild(a)}}static showProjectToDos(){const t=this.querySelector("p").textContent;et.showProject(t)}static createProjectDiv(t){const e=document.createElement("p");e.textContent=t.getName();const n=et.embedInDiv(e);return n.addEventListener("click",et.showProjectToDos),n.addEventListener("contextmenu",(t=>{t.preventDefault(),et.openContextMenu(t)})),n}static openAddProjectPopup(){document.getElementById("addProjectPopup").classList.add("activePopup"),document.getElementById("addProjectButton").style.display="none"}static closeProjectPopup(){const t=document.getElementById("addProjectPopup");t.classList.remove("activePopup"),document.getElementById("addProjectButton").style.display="flex",et.deleteErrorMessage(t)}static copyInputProjectInformation(){return document.getElementById("projectNameInput").value}static clearProjectList(){document.getElementById("projectListDiv").textContent=""}static openProject(){et.changeLayout("toDoList"),et.showToDoList(this.querySelector("p").textContent)}static showProjectError(){const t=document.getElementById("addProjectPopup");if("errorMessageDiv"==t.lastChild.id)return;const e=document.createElement("h4");e.textContent="Project needs a title";let n=et.embedInDiv(e,"errorMessageDiv");t.appendChild(n)}static deleteErrorMessage(t){"errorMessageDiv"==t.lastChild.id&&t.removeChild(t.lastChild)}static changeLayout(t){switch(document.querySelectorAll(".activeLayout").forEach((t=>t.classList.remove("activeLayout"))),t){case"toDoList":et.showToDoListLayout();break;case"projectList":et.showProjectListLayout()}}static showToDoListLayout(){document.getElementById("toDoLayoutDiv").classList.add("activeLayout")}static showProjectListLayout(){document.getElementById("projectLayoutDiv").classList.add("activeLayout")}static embedInDiv(t,e){const n=document.createElement("div");return n.id=e,n.appendChild(t),n}static getPosition(t){let e=0,n=0;return t.pageX||t.pageY?(e=t.pageX,n=t.pageY):(t.clientX||t.clientY)&&(e=t.clientX+document.body.scrollLeft+document.documentElement.scrollLeft,n=t.clientY+document.body.scrollTop+document.documentElement.scrollTop),{x:e,y:n}}}class nt{static loadPage(){et.initialiseButtons(),nt.initialiseProjects(),et.showProject("Inbox")}static createInputExamples(e){e.getProject("Inbox").setTasks([new t("Example1","16.05.2021"),new t("Example2","29.05.2021"),new t("Example3","3.08.2021")])}static initialiseProjects(){if(0==localStorage.length){const t=new n;nt.createInputExamples(t),a.saveProjectList(t)}}static createTask(){const t=et.copyTaskInputInformation();if(""==t.title)return void et.showTaskError();const e=nt.createNewTask(t),n=this.closest("#toDoLayoutDiv").querySelector("#listTitle").textContent;et.closeAddTaskPopup(),a.addTask(n,e),et.showProject(n)}static createNewTask(e){return new t(e.title,e.date)}static deleteTask(){const t=this.parentNode.querySelector("p").textContent,e=this.closest("main").querySelector("#listTitle").textContent;a.deleteTask(e,t),et.showProject(e)}static handleTodayListButton(){const t=a.getProjectList(),e=t.getProject("Inbox"),n=t.getProject("Today's Tasks");n.clear(),console.log(n);const r=e.getTasks().filter((t=>"23.04.2021"==t.getDueDate()));for(let t=0;t<r.length;t++)n.addTask(r[t]);a.saveProjectList(t),et.showProject("Today's Tasks")}static handleCreateProjectButton(){const t=et.copyInputProjectInformation();""!=t?(nt.createNewProject(t),et.closeProjectPopup(),et.showAllProjects()):et.showProjectError()}static createNewProject(t){const n=new e(t);return a.addProject(n),n}static handleClickOnTask(){this.classList.contains("finished")?et.markNotFinished(this):et.markTaskFinished(this)}static shiftDoneItems(){const t=document.getElementById("listTitle").textContent;nt.shiftTaskToProject(t),et.showProject(t)}static shiftTaskToProject(t,e){const n=a.getProjectList().getProject(t),r=document.querySelectorAll(".finished");for(let e=0;e<r.length;e++){const o=r[e].querySelector("p").textContent;a.addTask("Done",n.getTask(o)),a.deleteTask(t,n.getTask(o))}}}document.addEventListener("DOMContentLoaded",nt.loadPage)})();