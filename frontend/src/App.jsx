import { useState } from "react";
import { extractSkills, compareSkills, getRoadmap } from "./api/client";

function App() {
  const [resumeText, setResumeText] = useState("");
  const [jdText, setJdText] = useState("");
  const [result, setResult] = useState(null);
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    setResult(null);
    setRoadmap(null);
    
    try {
      const resumeRes = await extractSkills(resumeText);
      const jdRes = await extractSkills(jdText);
      const compareRes = await compareSkills(resumeRes.data.skills, jdRes.data.skills);
      setResult(compareRes.data);

      if (compareRes.data.missing.length > 0) {
        const roadmapRes = await getRoadmap(compareRes.data.missing);
        setRoadmap(roadmapRes.data);
      } else {
        setRoadmap({});
      }
    } catch (err) {
      console.error(err);
      alert("API Error! Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-10 font-sans selection:bg-purple-500 selection:text-white">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="text-center space-y-4 pt-8">
          <h1 className="text-5xl font-black tracking-tight bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent inline-block">
            Resume Gap Analyzer
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
            Powered by Gemini AI. Uncover missing skills and generate a dynamic study roadmap to beat the ATS.
          </p>
        </div>

        {/* Input Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-400 uppercase tracking-wider ml-1">Your Resume</label>
            <textarea
              className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-5 h-80 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all focus:outline-none resize-none shadow-inner text-slate-300 placeholder-slate-600"
              placeholder="Paste your resume text here..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-400 uppercase tracking-wider ml-1">Job Description</label>
            <textarea
              className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-5 h-80 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all focus:outline-none resize-none shadow-inner text-slate-300 placeholder-slate-600"
              placeholder="Paste the target job description here..."
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <button
            onClick={handleAnalyze}
            disabled={loading || !resumeText || !jdText}
            className="group relative inline-flex items-center justify-center px-12 py-4 font-bold text-white transition-all duration-200 bg-indigo-600 font-pj rounded-xl hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_40px_rgba(99,102,241,0.4)]"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                AI is Analyzing...
              </span>
            ) : "Initialize Analysis"}
          </button>
        </div>

        {/* Results Section */}
        {result && (
          <div className="animate-fade-in-up bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-6">
              <h2 className="text-3xl font-bold text-white">Analysis Results</h2>
              <div className="flex items-center gap-4">
                <span className="text-slate-400 font-medium">Match Score</span>
                <span className={`text-4xl font-black ${result.match_percent >= 70 ? "text-emerald-400" : result.match_percent >= 40 ? "text-amber-400" : "text-rose-400"}`}>
                  {result.match_percent}%
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="space-y-3">
                <h3 className="text-emerald-400 font-bold flex items-center gap-2 text-lg">
                  <span className="bg-emerald-400/10 p-1.5 rounded-md">✅</span> Verified Skills
                </h3>
                <p className="text-slate-300 leading-relaxed bg-slate-950/50 p-4 rounded-xl border border-slate-800/50">
                  {result.matched.join(" • ") || "No matching skills found."}
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-rose-400 font-bold flex items-center gap-2 text-lg">
                  <span className="bg-rose-400/10 p-1.5 rounded-md">⚠️</span> Skill Gaps Detected
                </h3>
                <p className="text-slate-300 leading-relaxed bg-slate-950/50 p-4 rounded-xl border border-slate-800/50">
                  {result.missing.join(" • ") || "You have all the required skills!"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Roadmap Section */}
        {roadmap && Object.keys(roadmap).length > 0 && (
          <div className="animate-fade-in-up mt-12 space-y-8 pb-20">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-white">Targeted Study Roadmap</h2>
              <p className="text-slate-400">Curated video courses to close your specific skill gaps.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(roadmap).map(([skill, courses]) => (
                <div key={skill} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/50 transition-colors group shadow-lg">
                  <h3 className="text-xl font-bold text-indigo-400 mb-5 flex items-center border-b border-slate-800 pb-3">
                    <span className="mr-3 text-2xl group-hover:scale-110 transition-transform">⚡</span> {skill}
                  </h3>
                  <ul className="space-y-4">
                    {courses.map((c, i) => (
                      <li key={i} className="flex flex-col space-y-1.5">
                        <a href={c.url} target="_blank" rel="noopener noreferrer" className="text-slate-200 hover:text-indigo-400 font-medium hover:underline line-clamp-2 leading-snug transition-colors">
                          {c.title}
                        </a>
                        <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">{c.channel}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;