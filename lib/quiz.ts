export type QuizQuestion = {
  id: number;
  label: string;
  dimension: "clarte" | "confiance" | "analyse" | "intuition" | "action";
  answers: { text: string; value: number }[];
};

export type QuizAnswer = {
  questionId: number;
  value: number;
};

export type RadarPoint = {
  subject: string;
  score: number;
};

export type ProfileType = {
  id: 1 | 2 | 3 | 4 | 5;
  title: string;
  summary: string;
};

export type DiagnosticResult = {
  profile: ProfileType;
  radarData: RadarPoint[];
  score: number;
};

export const quizQuestions: QuizQuestion[] = [
{
id:1,
label:"Face à une décision importante...",
dimension:"confiance",
answers:[
{text:"Je doute longtemps avant de décider.",value:1},
{text:"Je réfléchis puis je tranche.",value:2},
{text:"Je décide rapidement.",value:3}
]},

{
id:2,
label:"Lorsque plusieurs options s'offrent à vous...",
dimension:"analyse",
answers:[
{text:"Je compare longuement toutes les possibilités.",value:3},
{text:"Je me fie à mon intuition.",value:2},
{text:"Je demande conseil autour de moi.",value:1}
]},

{
id:3,
label:"Quand une opportunité se présente...",
dimension:"action",
answers:[
{text:"Je préfère attendre avant de m'engager.",value:1},
{text:"J'évalue rapidement les risques.",value:2},
{text:"Je saisis l'opportunité.",value:3}
]},

{
id:4,
label:"Dans les périodes d'incertitude...",
dimension:"clarte",
answers:[
{text:"Je me sens parfois perdu.",value:1},
{text:"Je prends du recul pour analyser.",value:2},
{text:"Je garde une direction claire.",value:3}
]},

{
id:5,
label:"Avant de prendre une décision...",
dimension:"analyse",
answers:[
{text:"Je collecte beaucoup d'informations.",value:3},
{text:"Je réfléchis brièvement.",value:2},
{text:"Je décide selon mon ressenti.",value:1}
]},

{
id:6,
label:"Lorsque vous devez choisir rapidement...",
dimension:"confiance",
answers:[
{text:"Je ressens du stress.",value:1},
{text:"Je garde un certain contrôle.",value:2},
{text:"Je décide avec assurance.",value:3}
]},

{
id:7,
label:"Votre intuition dans les décisions...",
dimension:"intuition",
answers:[
{text:"Elle me guide souvent.",value:3},
{text:"Elle intervient parfois.",value:2},
{text:"Je m'en méfie.",value:1}
]},

{
id:8,
label:"Face à une décision difficile...",
dimension:"clarte",
answers:[
{text:"Je repousse la décision.",value:1},
{text:"Je prends le temps de clarifier.",value:2},
{text:"Je tranche une fois les éléments réunis.",value:3}
]},

{
id:9,
label:"Votre manière de décider est plutôt...",
dimension:"action",
answers:[
{text:"Prudente.",value:1},
{text:"Équilibrée.",value:2},
{text:"Décisive.",value:3}
]},

{
id:10,
label:"Quand vous regardez votre trajectoire de vie...",
dimension:"clarte",
answers:[
{text:"Je cherche encore ma direction.",value:1},
{text:"J'ai une idée générale.",value:2},
{text:"Ma direction est claire.",value:3}
]}
];

export const profiles: Record<number, ProfileType> = {

1:{
id:1,
title:"Décision freinée",
summary:"Vous avez tendance à hésiter longtemps avant de trancher, ce qui peut ralentir certaines opportunités."
},

2:{
id:2,
title:"Décision prudente",
summary:"Vous analysez les situations avec attention et cherchez à limiter les risques avant d'agir."
},

3:{
id:3,
title:"Décision équilibrée",
summary:"Vous combinez réflexion et intuition pour prendre des décisions généralement cohérentes."
},

4:{
id:4,
title:"Décision intuitive",
summary:"Votre intuition joue un rôle important dans vos choix et vous permet d'avancer rapidement."
},

5:{
id:5,
title:"Décision affirmée",
summary:"Vous prenez vos décisions avec assurance et vous savez généralement où vous allez."
}

};

export function shuffleArray<T>(array: T[]): T[] {

const arr=[...array];

for(let i=arr.length-1;i>0;i--){

const j=Math.floor(Math.random()*(i+1));

[arr[i],arr[j]]=[arr[j],arr[i]];

}

return arr;

}

export function getRandomizedQuiz(){

return shuffleArray(

quizQuestions.map(q=>({

...q,

answers:shuffleArray(q.answers)

}))

);

}

export function computeResults(answers:QuizAnswer[]):DiagnosticResult{

const totals={
clarte:0,
confiance:0,
analyse:0,
intuition:0,
action:0
};

answers.forEach(a=>{

const question=quizQuestions.find(q=>q.id===a.questionId);

if(!question) return;

totals[question.dimension]+=a.value;

});

const averages={
clarte:totals.clarte/3,
confiance:totals.confiance/2,
analyse:totals.analyse/2,
intuition:totals.intuition/1,
action:totals.action/2
};

const radarData=[
{subject:"Clarté",score:averages.clarte},
{subject:"Confiance",score:averages.confiance},
{subject:"Analyse",score:averages.analyse},
{subject:"Intuition",score:averages.intuition},
{subject:"Action",score:averages.action}
];

const score=Math.round(
radarData.reduce((sum,r)=>sum+r.score,0)/radarData.length*100/3
);

const globalScore=
(averages.clarte+
averages.confiance+
averages.analyse+
averages.intuition+
averages.action)/5;

let profileId:1|2|3|4|5=3;

if(globalScore<=1.5) profileId=1;
else if(globalScore<=2) profileId=2;
else if(globalScore<=2.4) profileId=3;
else if(globalScore<=2.7) profileId=4;
else profileId=5;

return{
profile:profiles[profileId],
radarData,
score
};

}
