import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// --- Simple helpers ---
const getLS = (k, v) => JSON.parse(localStorage.getItem(k)) || v;
const setLS = (k, v) => localStorage.setItem(k, JSON.stringify(v));

const Gamification = () => {
  const [points, setPoints] = useState(getLS("points", 0));
  const [level, setLevel] = useState(getLS("level", 1));
  const [streak, setStreak] = useState(getLS("streak", 0));
  const [view, setView] = useState("menu");
  const [game, setGame] = useState(null);

  useEffect(() => {
    setLS("points", points);
    setLS("level", level);
    setLS("streak", streak);
  }, [points, level, streak]);

  const award = (p) => {
    setPoints(points + p);
    if ((points + p) >= level * 100) setLevel(level + 1);
  };

  const menu = (
    <motion.div className="p-6 grid grid-cols-2 gap-4">
      {[
        { key: "type", label: "⌨️ Type Challenge" },
        { key: "mcq", label: "⚡ MCQ Race" },
        { key: "wordle", label: "🧩 Wordle-lite" },
        { key: "memory", label: "🃏 Memory Flip" },
        { key: "draw", label: "🎨 Draw & Answer" },
        { key: "streak", label: "🔥 Daily Quiz Streak" },
      ].map((g) => (
        <motion.button
          key={g.key}
          whileHover={{ scale: 1.05 }}
          onClick={() => { setGame(g.key); setView("game"); }}
          className="p-6 rounded-2xl shadow-md bg-white text-lg font-bold"
        >
          {g.label}
        </motion.button>
      ))}
    </motion.div>
  );

  // --- Mini games (super simplified demo) ---
  const TypeChallenge = () => {
    const target = "hackathon";
    const [val, setVal] = useState("");
    return (
      <div className="p-6">
        <p className="mb-2">Type: <b>{target}</b></p>
        <input className="border p-2" value={val} onChange={e=>setVal(e.target.value)} />
        <button onClick={()=>{
          if(val===target){ award(20); alert("Correct! +20"); setView("menu"); }
          else alert("Try again");
        }} className="ml-2 bg-green-500 text-white px-3 py-1 rounded">Submit</button>
      </div>
    );
  };

  const MCQRace = () => {
    const q = {q:"2+2?", opts:["3","4","5"], ans:1};
    return (
      <div className="p-6">
        <p>{q.q}</p>
        {q.opts.map((o,i)=>(<button key={i} onClick={()=>{
          if(i===q.ans){ award(10); alert("+10"); setView("menu"); }
          else alert("Wrong");
        }} className="block my-2 p-2 border rounded">{o}</button>))}
      </div>
    );
  };

  const WordleLite = () => {
    const word = "code";
    const [guess,setGuess] = useState("");
    return (
      <div className="p-6">
        <p>Guess 4-letter word</p>
        <input value={guess} onChange={e=>setGuess(e.target.value)} className="border p-2" />
        <button onClick={()=>{
          if(guess===word){ award(30); alert("Nice! +30"); setView("menu"); }
          else alert("Nope");
        }} className="ml-2 bg-blue-500 text-white px-3 py-1 rounded">Check</button>
      </div>
    );
  };

  const MemoryFlip = () => (
    <div className="p-6">
      <p>Imagine flip cards here 🃏 (demo)</p>
      <button onClick={()=>{ award(15); setView("menu"); }}>Win +15</button>
    </div>
  );

  const DrawAnswer = () => (
    <div className="p-6">
      <p>Draw & upload sketch 🎨 (not implemented in demo)</p>
      <button onClick={()=>{ award(25); setView("menu"); }}>Submit +25</button>
    </div>
  );

  const Streak = () => {
    const today = new Date().toDateString();
    const last = getLS("lastDay", null);
    if(last!==today){
      setStreak(streak+1);
      setLS("lastDay", today);
      award(5);
    }
    return <div className="p-6">🔥 Current streak: {streak} days</div>;
  };

  const games = {
    type:<TypeChallenge/>, mcq:<MCQRace/>, wordle:<WordleLite/>, memory:<MemoryFlip/>, draw:<DrawAnswer/>, streak:<Streak/>
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-yellow-100">
      <header className="p-4 text-center text-2xl font-bold">Gamification</header>
      <div className="text-center mb-4">⚡ {points} pts | ⭐ Lv {level} | 🔥 {streak}d streak</div>
      {view==="menu" ? menu : (
        <div>
          <button onClick={()=>setView("menu")} className="ml-4 px-3 py-1 bg-gray-300 rounded">← Back</button>
          {games[game]}
        </div>
      )}
    </div>
  );
};

export default Gamification;