const fs=require("fs"),p=require("path");
const I=process.env.MAKEFUN_INPUT_DIR||"/input",O=process.env.MAKEFUN_OUTPUT_DIR||"/output";
function run(P,D){
const S=[],C=[],M=new Array(256).fill(0),O=[];
const T=c=>[Buffer.from(O),c];
let pc=0,ip=0,st=0;
while(1){
if(st>=1e6)return T(10);
if(pc<0||pc>=P.length)return T(9);
const op=P[pc],nx=pc+1;
if(!(op<=7||op>=16&&op<=34||op>=48&&op<=52||op==64||op==65||op>=80&&op<=83))return T(5);
const L=op==1?1:op==2?4:op>=48&&op<=51?2:0;
if(nx+L>P.length)return T(9);
st++;
const s=()=>{let o=P[nx]|P[nx+1]<<8;return o>=32768?o-65536:o};
switch(op){
case 0:return T(0);
case 1:if(S.length>=256)return T(3);S.push(P[nx]<<24>>24);break;
case 2:if(S.length>=256)return T(3);S.push(P[nx]|P[nx+1]<<8|P[nx+2]<<16|P[nx+3]<<24);break;
case 3:if(!S.length)return T(2);S.pop();break;
case 4:if(!S.length)return T(2);if(S.length>=256)return T(3);S.push(S[S.length-1]);break;
case 5:if(S.length<2)return T(2);{let t=S[S.length-1];S[S.length-1]=S[S.length-2];S[S.length-2]=t}break;
case 6:if(S.length<2)return T(2);if(S.length>=256)return T(3);S.push(S[S.length-2]);break;
case 7:if(S.length<3)return T(2);{let c=S.pop(),b=S.pop(),a=S.pop();S.push(b,c,a)}break;
case 16:case 17:case 18:case 19:case 20:case 21:case 22:case 24:case 25:case 26:case 28:case 29:case 30:case 32:case 33:case 34:{
if(S.length<2)return T(2);
const b=S.pop(),a=S.pop();let r;
if(op==16)r=a+b|0;
else if(op==17)r=a-b|0;
else if(op==18)r=Math.imul(a,b);
else if(op==19){if(!b)return T(4);r=Math.trunc(a/b)|0}
else if(op==20){if(!b)return T(4);r=a%b|0}
else if(op==21){if(!b)return T(4);r=Math.trunc((a>>>0)/(b>>>0))|0}
else if(op==22){if(!b)return T(4);r=(a>>>0)%(b>>>0)|0}
else if(op==24)r=a&b;
else if(op==25)r=a|b;
else if(op==26)r=a^b;
else if(op==28)r=a<<(b&31);
else if(op==29)r=a>>(b&31);
else if(op==30)r=(a>>>(b&31))|0;
else if(op==32)r=a==b?1:0;
else if(op==33)r=a<b?1:0;
else r=(a>>>0)<(b>>>0)?1:0;
S.push(r);break}
case 23:if(!S.length)return T(2);S.push(-S.pop()|0);break;
case 27:if(!S.length)return T(2);S.push(~S.pop());break;
case 48:pc=nx+L+s();continue;
case 49:if(!S.length)return T(2);if(!S.pop()){pc=nx+L+s();continue}break;
case 50:if(!S.length)return T(2);if(S.pop()){pc=nx+L+s();continue}break;
case 51:if(C.length>=64)return T(7);C.push(nx+L);pc=P[nx]|P[nx+1]<<8;continue;
case 52:if(!C.length)return T(8);pc=C.pop();continue;
case 64:if(!S.length)return T(2);{let a=S.pop();if(a<0||a>255)return T(6);S.push(M[a])}break;
case 65:if(S.length<2)return T(2);{let a=S.pop(),v=S.pop();if(a<0||a>255)return T(6);M[a]=v}break;
case 80:if(!S.length)return T(2);{let t=String(S.pop());if(O.length+t.length>65536)return T(11);for(let i=0;i<t.length;i++)O.push(t.charCodeAt(i))}break;
case 81:if(!S.length)return T(2);if(O.length>=65536)return T(11);O.push(S.pop()&255);break;
case 82:if(S.length>=256)return T(3);S.push(ip<D.length?D[ip++]:-1);break;
case 83:if(!S.length)return T(2);return T(S.pop()&255);
}
pc=nx+L;
}
}
for(const id of fs.readdirSync(I).sort()){
const d=p.join(I,id);
if(!fs.statSync(d).isDirectory())continue;
const[o,c]=run(fs.readFileSync(p.join(d,"program.bin")),fs.readFileSync(p.join(d,"input.bin")));
const q=p.join(O,id);fs.mkdirSync(q,{recursive:true});
fs.writeFileSync(p.join(q,"stdout.bin"),o);
fs.writeFileSync(p.join(q,"exit.txt"),c+"\n");
}
