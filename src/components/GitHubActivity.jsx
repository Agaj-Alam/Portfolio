import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";
import { FiStar, FiGitPullRequest, FiBox, FiActivity } from "react-icons/fi";
import { SiGithub } from "react-icons/si";

const GITHUB_USERNAME = "Agaj-Alam";

function useInView(threshold = 0.15) {
  const [element, setElement] = useState(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!element) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold }
    );
    obs.observe(element);
    return () => obs.disconnect();
  }, [element, threshold]);
  return [setElement, visible];
}

function SectionLabel({ dark, label }) {
  return (
    <div
      style={{
        fontFamily: "'DM Mono',monospace",
        fontSize: "0.72rem",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)",
      }}
    >
      {label}
    </div>
  );
}

function AnimatedNumber({ value }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate(val) {
        setCount(Math.round(val));
      }
    });
    return controls.stop;
  }, [value]);

  return <span>{count}</span>;
}

function RepoCard({ repo, dark }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "1.25rem 1.4rem",
        borderRadius: 12,
        background: dark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.02)",
        border: `1px solid ${hov ? (dark ? "rgba(110,231,183,0.3)" : "rgba(5,150,105,0.25)") : dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
        transition: "all .25s cubic-bezier(.4,0,.2,1)",
        transform: hov ? "translateY(-3px)" : "none",
        boxShadow: hov ? `0 12px 32px ${dark ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.1)"}` : "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.6rem" }}>
        <SiGithub color={dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)"} size={14} />
        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          style={{
            fontFamily: "'DM Mono',monospace",
            fontSize: "0.85rem",
            fontWeight: 500,
            color: dark ? "#6ee7b7" : "#059669",
            textDecoration: hov ? "underline" : "none",
          }}
        >
          {GITHUB_USERNAME} / {repo.name}
        </a>
      </div>
      <div
        style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: "0.85rem",
          color: dark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.6)",
          lineHeight: 1.5,
          marginBottom: "1rem",
        }}
      >
        {repo.description || "No description provided."}
      </div>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        {repo.language && (
          <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.75rem", color: dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#f1e05a" }} />
            {repo.language}
          </div>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.75rem", color: dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)" }}>
          <FiStar /> {repo.stargazers_count}
        </div>
      </div>
    </div>
  );
}

export default function GitHubActivity({ dark }) {
  const [ref, visible] = useInView(0.1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hoveredCell, setHoveredCell] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [contribRes, userRes, reposRes, prsRes] = await Promise.all([
          fetch(`https://github-contributions-api.deno.dev/${GITHUB_USERNAME}.json`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`),
          fetch(`https://api.github.com/search/issues?q=type:pr+author:${GITHUB_USERNAME}`)
        ]);

        const contribs = await contribRes.json();
        const user = await userRes.json();
        const repos = await reposRes.json();
        const prs = await prsRes.json();

        let totalStars = 0;
        let repositories = 0;
        let pullRequests = 0;
        let topRepos = [];

        if (Array.isArray(repos)) {
          totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
          repositories = user.public_repos || repos.length;
          const pinnedNames = ["subharti-app", "Spotify_clone"];
          topRepos = pinnedNames.map(name => {
            const found = repos.find(r => r.name.toLowerCase() === name.toLowerCase());
            if (found) return found;
            return {
              name: name,
              html_url: `https://github.com/${GITHUB_USERNAME}/${name}`,
              description: "Currently private or coming soon...",
              stargazers_count: 0,
              language: null
            };
          });
        }

        if (prs && prs.total_count !== undefined) {
          pullRequests = prs.total_count;
        }

        if (!contribs || !contribs.contributions) {
          throw new Error("Contribution graph data is missing or failed to load");
        }
        
        let currentStreak = 0;
        let longestStreak = 0;
        let tempStreak = 0;
        
        const allDays = contribs.contributions.flat();
        
        for (let day of allDays) {
          if (day.contributionCount > 0) {
            tempStreak++;
            longestStreak = Math.max(longestStreak, tempStreak);
          } else {
            tempStreak = 0;
          }
        }
        
        for (let i = allDays.length - 1; i >= 0; i--) {
          if (allDays[i].contributionCount > 0) {
            currentStreak++;
          } else if (i < allDays.length - 2) {
            break;
          }
        }

        setData({
          totalContributions: contribs.totalContributions || 0,
          graph: contribs.contributions,
          repositories,
          totalStars,
          pullRequests,
          longestStreak,
          currentStreak,
          topRepos
        });
      } catch (e) {
        console.error("Failed to fetch GitHub data:", e);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  const stats = data ? [
    { label: "Total Contributions", value: data.totalContributions, icon: <FiActivity />, color: "#10b981" },
    { label: "Repositories", value: data.repositories, icon: <FiBox />, color: "#8b5cf6" },
    { label: "Total Stars", value: data.totalStars, icon: <FiStar />, color: "#f59e0b" },
    { label: "Pull Requests", value: data.pullRequests, icon: <FiGitPullRequest />, color: "#ef4444" },
  ] : [];

  const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <section
      id="github"
      style={{
        padding: "clamp(5rem,10vw,8rem) clamp(1.5rem,5vw,4rem)",
        maxWidth: 1100,
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
      }}
    >
      <SectionLabel dark={dark} label="04 - GitHub" />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "3rem",
          marginTop: "1.5rem",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <h2
          style={{
            fontFamily: "'Fraunces',serif",
            fontSize: "clamp(2rem,4vw,3rem)",
            fontWeight: 800,
            color: dark ? "#fff" : "#0a0a0a",
            letterSpacing: "-0.02em",
            margin: 0,
          }}
        >
          GitHub
          <br />
          <span
            style={{
              background: "linear-gradient(135deg,#6ee7b7,#c4b5fd)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Activity
          </span>
        </h2>
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "9px 20px",
            borderRadius: 8,
            border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"}`,
            background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.025)",
            fontFamily: "'DM Mono',monospace",
            fontSize: "0.78rem",
            textDecoration: "none",
            color: dark ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.6)",
            transition: "all .2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = dark ? "rgba(110,231,183,0.4)" : "rgba(5,150,105,0.35)";
            e.currentTarget.style.color = dark ? "#6ee7b7" : "#059669";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)";
            e.currentTarget.style.color = dark ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.6)";
          }}
        >
          <SiGithub size={15} />
          @{GITHUB_USERNAME} ↗
        </a>
      </div>

      {loading ? (
        <div style={{ padding: "4rem", textAlign: "center", color: dark ? "#888" : "#666", fontFamily: "'DM Mono',monospace" }}>
          <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}>
            Fetching live GitHub data...
          </motion.div>
        </div>
      ) : data ? (
        <>
          {/* Stats row */}
          <div
            ref={ref}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,190px),1fr))",
              gap: "1rem",
              marginBottom: "2.5rem",
            }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                style={{
                  padding: "1.5rem",
                  borderRadius: 12,
                  background: dark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.02)",
                  border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={{ fontSize: "1.2rem", color: stat.color, marginBottom: 8 }}>
                  {stat.icon}
                </div>
                <div
                  style={{
                    fontFamily: "'Fraunces',serif",
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: dark ? "#fff" : "#0a0a0a",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                  }}
                >
                  <AnimatedNumber value={stat.value} />
                </div>
                <div
                  style={{
                    fontFamily: "'DM Mono',monospace",
                    fontSize: "0.68rem",
                    color: dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.4)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginTop: 6,
                  }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contribution graph */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{
              padding: "1.75rem",
              borderRadius: 16,
              background: dark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.018)",
              border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
              marginBottom: "2.5rem",
              overflowX: "auto",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.25rem",
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: "0.8rem",
                  color: dark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.5)",
                }}
              >
                <AnimatedNumber value={data.totalContributions} /> contributions in the last year
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span
                  style={{
                    fontFamily: "'DM Mono',monospace",
                    fontSize: "0.65rem",
                    color: dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.35)",
                  }}
                >
                  Less
                </span>
                {[0, 1, 2, 3, 4].map((l) => {
                  const colors = dark
                    ? ["rgba(255,255,255,0.05)", "#0e4429", "#196127", "#239a3b", "#2dba4e"]
                    : ["rgba(0,0,0,0.05)", "#9be9a8", "#40c463", "#30a14e", "#216e39"];
                  return (
                    <div key={l} style={{ width: 10, height: 10, borderRadius: 2, background: colors[l] }} />
                  );
                })}
                <span
                  style={{
                    fontFamily: "'DM Mono',monospace",
                    fontSize: "0.65rem",
                    color: dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.35)",
                  }}
                >
                  More
                </span>
              </div>
            </div>

            <div style={{ display: "flex", gap: 3, marginLeft: 24, marginBottom: 4 }}>
              {MONTH_LABELS.map((m) => (
                <div
                  key={m}
                  style={{
                    width: `${(53 / 12) * 14}px`,
                    fontFamily: "'DM Mono',monospace",
                    fontSize: "0.62rem",
                    color: dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.35)",
                    flexShrink: 0,
                  }}
                >
                  {m}
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 3, position: "relative" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 3, marginRight: 4 }}>
                {["", "Mon", "", "Wed", "", "Fri", ""].map((d, i) => (
                  <div
                    key={i}
                    style={{
                      height: 11,
                      fontFamily: "'DM Mono',monospace",
                      fontSize: "0.58rem",
                      color: dark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.3)",
                      lineHeight: "11px",
                      width: 18,
                      textAlign: "right",
                    }}
                  >
                    {d}
                  </div>
                ))}
              </div>

              {data.graph.map((week, wi) => (
                <motion.div
                  key={wi}
                  initial={{ opacity: 0, y: 10 }}
                  animate={visible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + wi * 0.015, duration: 0.3 }}
                  style={{ display: "flex", flexDirection: "column", gap: 3 }}
                >
                  {week.map((day, di) => {
                    const level = day.contributionCount === 0 ? 0 : 
                                  day.contributionCount <= 3 ? 1 : 
                                  day.contributionCount <= 6 ? 2 : 
                                  day.contributionCount <= 9 ? 3 : 4;
                                  
                    const colors = dark
                      ? ["rgba(255,255,255,0.05)", "#0e4429", "#196127", "#239a3b", "#2dba4e"]
                      : ["rgba(0,0,0,0.05)", "#9be9a8", "#40c463", "#30a14e", "#216e39"];
                    
                    const cellId = `${wi}-${di}`;
                    const isHovered = hoveredCell === cellId;

                    return (
                      <motion.div
                        key={di}
                        onMouseEnter={() => setHoveredCell(cellId)}
                        onMouseLeave={() => setHoveredCell(null)}
                        whileHover={{ scale: 1.4, zIndex: 10 }}
                        style={{
                          width: 11,
                          height: 11,
                          borderRadius: 2,
                          background: colors[level],
                          position: "relative",
                          cursor: "crosshair",
                        }}
                      >
                        <AnimatePresence>
                          {isHovered && (
                            <motion.div
                              initial={{ opacity: 0, y: 5, scale: 0.8 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 2, scale: 0.9 }}
                              transition={{ duration: 0.15 }}
                              style={{
                                position: "absolute",
                                bottom: "100%",
                                left: "50%",
                                transform: "translateX(-50%)",
                                marginBottom: 8,
                                padding: "6px 10px",
                                background: dark ? "rgba(0,0,0,0.9)" : "rgba(255,255,255,0.95)",
                                border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                                borderRadius: 6,
                                fontSize: "0.7rem",
                                fontFamily: "'DM Sans',sans-serif",
                                color: dark ? "#fff" : "#000",
                                whiteSpace: "nowrap",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                pointerEvents: "none",
                                zIndex: 50,
                              }}
                            >
                              <strong>{day.contributionCount} contributions</strong> on {new Date(day.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Pinned repos */}
          {data.topRepos.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.2, duration: 0.5 }}
              style={{ marginBottom: "1rem" }}
            >
              <div
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: "0.72rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)",
                  marginBottom: "1.25rem",
                }}
              >
                Top Repositories
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,320px),1fr))",
                  gap: "1rem",
                }}
              >
                {data.topRepos.map((repo) => (
                  <RepoCard key={repo.name} repo={repo} dark={dark} />
                ))}
              </div>
            </motion.div>
          )}
        </>
      ) : (
        <div style={{ padding: "4rem", textAlign: "center", color: dark ? "#ef4444" : "#dc2626", fontFamily: "'DM Mono',monospace" }}>
          Failed to load live GitHub data. Please try again later.
        </div>
      )}
    </section>
  );
}
