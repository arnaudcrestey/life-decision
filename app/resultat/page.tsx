"use client";

import { useEffect, useMemo, useState } from "react";
import { RadarChart } from "@/components/radar-chart";
import { ResultCard } from "@/components/result-card";
import { ShareButtons } from "@/components/share-buttons";
import { computeResults } from "@/lib/quiz";

export default function ResultPage() {

const [answers,setAnswers] = useState<any[]>([]);
const [analysis,setAnalysis] = useState<string | null>(null);

const [firstName,setFirstName] = useState("");
const [email,setEmail] = useState("");

const [birthDay,setBirthDay] = useState("");
const [birthMonth,setBirthMonth] = useState("");
const [birthYear,setBirthYear] = useState("");
const [birthHour,setBirthHour] = useState("");
const [birthMinute,setBirthMinute] = useState("");
const [birthPlace,setBirthPlace] = useState("");

const [analysisRequested,setAnalysisRequested] = useState(false);
const [sending,setSending] = useState(false);
const [submitted,setSubmitted] = useState(false);

useEffect(()=>{

const rawAnswers = localStorage.getItem("quizAnswers");

if(rawAnswers){
setAnswers(JSON.parse(rawAnswers));
}

},[]);

const result = useMemo(()=>{

if(!answers.length) return null;

return computeResults(answers);

},[answers]);

const alignmentScore = useMemo(()=>{

if(!result?.radarData) return 0;

const values = result.radarData.map((item:any)=>item.value);

const avg = values.reduce((a,b)=>a+b,0) / values.length;

const normalized = ((avg - 1) / 2) * 100;

return Math.round(normalized);

},[result]);

useEffect(()=>{

if(!result || !alignmentScore || analysisRequested) return;

setAnalysisRequested(true);

async function generateAnalysis(){

try{

const res = await fetch("/api/diagnostic",{
method:"PUT",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify(result)
});

const data = await res.json();

if(data?.analysis){
setAnalysis(data.analysis);
}

}catch{

setAnalysis("Analyse indisponible pour le moment.");

}

}

generateAnalysis();

},[result,alignmentScore,analysisRequested]);

function onlyNumber(value:string){

return value.replace(/\D/g,"");

}

async function handleSubmit(e:React.FormEvent){

e.preventDefault();

if(sending) return;

setSending(true);

const data = {
firstName,
email,
birthDay,
birthMonth,
birthYear,
birthHour,
birthMinute,
birthPlace,
score: alignmentScore
};

try{

await fetch("/api/lead",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify(data)
});

setSubmitted(true);

}catch{

alert("Erreur serveur.");

}

setSending(false);

}

if(submitted){

return(

<main className="flex min-h-screen items-center justify-center px-6 text-center">

<div className="glass-card max-w-xl p-10">

<div className="text-4xl mb-4">
✉️
</div>

<h2 className="text-3xl font-semibold mb-3">
Demande bien envoyée
</h2>

<p className="text-white/80 leading-relaxed">
Votre demande a été enregistrée avec succès.
</p>

<p className="mt-3 text-white/70">
Nous préparons actuellement votre première lecture personnalisée.
</p>

<p className="mt-6 text-sm text-white/60">
⏱️ Vous recevrez votre analyse dans votre boîte email très prochainement.
</p>

</div>

</main>

);

}

return(

<main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-10">

<h1 className="text-4xl font-bold">
Votre profil décisionnel
</h1>

<p className="mt-2 text-white/75">
Analyse générée automatiquement à partir de vos réponses.
</p>

{result && (

<section className="mt-8 grid gap-6 md:grid-cols-2">

<ResultCard
profile={result.profile}
score={alignmentScore}
/>

<RadarChart
data={result.radarData}
/>

</section>

)}

<section className="glass-card mt-8 p-6 text-center">

<p className="text-lg text-white/80">
Score décisionnel global
</p>

<p className="mt-2 text-4xl font-bold text-cyan-400">
{alignmentScore}%
</p>

<p className="mt-2 text-white/60 text-sm">
Score moyen des participants : 54 %
</p>

</section>

<section className="glass-card mt-8 p-6">

<h3 className="text-xl font-semibold mb-3">
Analyse personnalisée
</h3>

{!analysis && (
<p className="text-white/60 italic">
Analyse en cours… 🔎
</p>
)}

{analysis && (
<p className="text-white/80 leading-relaxed">
{analysis}
</p>
)}

</section>

<section className="mt-12 rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-10 text-center shadow-xl">

<h2 className="text-3xl font-semibold mb-4">
Comprendre vos décisions
</h2>

<p className="text-white/80 max-w-2xl mx-auto leading-relaxed">
Au <strong>Cabinet Astrae</strong>, l’étude du thème astral permet
d’explorer les dynamiques personnelles qui influencent
les choix de vie et les orientations professionnelles.
</p>

<p className="mt-6 text-lg text-white font-medium">
🎁 Recevez <span className="font-bold text-cyan-400">gratuitement</span> votre première lecture personnalisée
</p>

<form
onSubmit={handleSubmit}
className="mt-8 grid gap-4 w-full max-w-md mx-auto"
>

<input
type="text"
placeholder="Votre prénom"
value={firstName}
onChange={(e)=>setFirstName(e.target.value)}
required
className="w-full rounded-xl bg-white px-4 py-3 text-black outline-none"
/>

<input
type="email"
placeholder="Votre email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
required
className="w-full rounded-xl bg-white px-4 py-3 text-black outline-none"
/>

<p className="text-sm text-white/70 text-left">
Date de naissance
</p>

<div className="grid grid-cols-3 gap-3">

<input
type="text"
inputMode="numeric"
maxLength={2}
placeholder="Jour"
value={birthDay}
onChange={(e)=>setBirthDay(onlyNumber(e.target.value))}
className="rounded-xl bg-white px-4 py-3 text-black text-center outline-none"
/>

<input
type="text"
inputMode="numeric"
maxLength={2}
placeholder="Mois"
value={birthMonth}
onChange={(e)=>setBirthMonth(onlyNumber(e.target.value))}
className="rounded-xl bg-white px-4 py-3 text-black text-center outline-none"
/>

<input
type="text"
inputMode="numeric"
maxLength={4}
placeholder="Année"
value={birthYear}
onChange={(e)=>setBirthYear(onlyNumber(e.target.value))}
className="rounded-xl bg-white px-4 py-3 text-black text-center outline-none"
/>

</div>

<p className="text-sm text-white/70 text-left mt-4">
Heure de naissance
</p>

<div className="grid grid-cols-2 gap-3">

<input
type="text"
inputMode="numeric"
maxLength={2}
placeholder="Heure"
value={birthHour}
onChange={(e)=>setBirthHour(onlyNumber(e.target.value))}
className="rounded-xl bg-white px-4 py-3 text-black text-center outline-none"
/>

<input
type="text"
inputMode="numeric"
maxLength={2}
placeholder="Minute"
value={birthMinute}
onChange={(e)=>setBirthMinute(onlyNumber(e.target.value))}
className="rounded-xl bg-white px-4 py-3 text-black text-center outline-none"
/>

</div>

<input
type="text"
placeholder="Ville de naissance"
value={birthPlace}
onChange={(e)=>setBirthPlace(e.target.value)}
required
className="w-full rounded-xl bg-white px-4 py-3 text-black outline-none"
/>

<button
type="submit"
disabled={!analysis || sending}
className="mt-2 w-full rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 py-4 text-lg font-semibold text-white disabled:opacity-50"
>
{sending ? "Envoi..." : "Recevoir ma première analyse"}
</button>

</form>

</section>

<section className="mt-12 text-center">

<p className="text-white/70 mb-3">
Partagez ce diagnostic avec quelqu’un qui traverse peut-être la même situation.
</p>

<ShareButtons />

</section>

</main>

);

}
