function justcopy(e,s){fs.createReadStream(e).pipe(fs.createWriteStream(s))}function minifying(e,s,t){var n,r;switch(e){case"css":var i=void 0;n=ugly.css,r=n.processFiles([s],i||{});break;case"js":n=ugly.js,r=n.minify(s).code}console.log(e,t),fs.appendFile(t,r,function(e){e&&console.log(e)})}function readdir(e,s){fs.readdir(e,function(s,t){s?console.log(s):t.forEach(function(s){var t=e+s,n=isDir(t),r=t.replace(baseIn,baseOut);n?(mkdir(r),readdir(n)):fs.unlink(r,function(){var e=r.substr(r.lastIndexOf("/")+1,r.length-1),s=e.split(/\./g),n="",i=e.lastIndexOf("."),a="copy";if(0!=i&&-1!==i){var o=exceptions.filter(function(e){return 0==t.indexOf(e)});n=s[s.length-1].toLowerCase(),o.length||"min"===s[s.length-2]||-1===exts.indexOf(n)||(a="minify")}"copy"==a?justcopy(t,r):minifying(n,t,r)})})})}var fs=require("fs"),path=require("path"),ugly={js:require("uglify-js"),css:require("uglifycss")},baseOut,baseIn=path.normalize(process.argv[2]),force=process.argv[3]||!1,exceptions,exts=Object.keys(ugly).map(function(e){return e.toString().toLowerCase()}),mkdir=function(e){try{return e&&"/"!=e.indexOf(e.length-1)&&(e+="/"),fs.mkdirSync(e),e}catch(s){}},isDir=function(e){var s=fs.lstatSync(e).isDirectory();return s&&(s=e,"/"!==e[e.length-1]&&(s+="/")),s};if(baseIn=isDir(baseIn)){var okay=!1;baseOut=baseIn.substr(0,baseIn.length-1)+".ugly";try{fs.lstatSync(baseOut)&&"true"==force&&(okay=!0)}catch(e){mkdir(baseOut),okay=!0}if(okay){baseOut=isDir(baseOut);var e=fs.readFileSync(baseIn+".ugly").toString()||"[]";exceptions=JSON.parse(e).map(function(e){var s=e;return"/*"==s.substr(s.length-2,2)&&(s=s.substr(0,s.length-2)),"/"==s.substr(s.length-1,1)&&(s=s.substr(0,s.length-1)),console.log("exception :",baseIn+s),baseIn+s}),readdir(baseIn,baseOut)}else console.log("Output directory is exist!")}else console.log("Invalid input directory!");