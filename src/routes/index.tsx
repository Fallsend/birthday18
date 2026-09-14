import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'

export const Route = createFileRoute('/')({ component: App })

/* ============================================================================
   EDIT ME — personalize the birthday page here.
   ============================================================================ */
const HER_NAME = 'Rayn'
const BIRTHDAY = '2026-09-16T00:00:00' // unlocks at local midnight on her device, on this date
const VIDEO_SRC = '/her-message.mp4' // put your video file in the public/ folder with this exact name
const CAPSULE_MESSAGE =
  "Happy birthday, my love. I couldn't be there to hand you this myself, so I built you something instead. Press play — I made this just for you."
const FOOTER_NOTE = `Made for ${HER_NAME}, from farther away than I'd like to be.`

const REASONS: string[] = [
  'The way you laugh after making a bad joke forcing everyone to laugh with your infectious mirth.',
  'How you remember everything I tell you even when it feels like you are not paying attention.',
  'Your hatred for men inflicted torture on women and how you never soften your opinions no matter how the other person reacts',
  'The way you write noni',
  'How hard you work for the things you want, without ever asking for applause.',
  'The filter applied voice notes you send.',
  'How you make every normal day special by spending time on call.',
  'How your eyes look like shining bundles of joy when the sunlight hits them.',
  'The way you defend your friends no matter what.',
  "Your outfits (do I even have to explain?)",
  'How strong you remain even when you are going through something hard, you might cry but you never let it show (it is okay to show it sometimes)',
  'How you make fun of yourself and not take yourself too seriously all the time.',
  'They way your voice softens when I hold your face',
  "Your niche media literate ass.",
  "Your patience with me on days I don't deserve it.",
  'The way "goodnight" from you still feels like the best part of my day.',
  'How your hair falls on your shoulders.',
  'Simply your method of loving, It takes time to develop but when it does it is complete, not the loudest but true.',
]

/* Virgo constellation — real stars, plotted from their right ascension / declination,
   connected the way Virgo's "Y" asterism is traditionally drawn (Porrima/γ as the
   branch point, or "heart", of the figure). */
type Star = { x: number; y: number; name: string; title: string; text: string }
const STARS: Star[] = [
  { x: 50, y: 106, name: 'ν Vir', title: 'Home', text: 'Wherever you are already feels like the place I most want to be.' },
  { x: 63, y: 166, name: 'Zavijava', title: 'Us', text: 'Two time zones, one very stubborn constant.' },
  { x: 145, y: 197, name: 'Zaniah', title: 'Your Mind', text: "Sharp, curious, endlessly interesting — I never get tired of talking to you." },
  { x: 205, y: 207, name: 'Porrima', title: 'Forever', text: "The heart of this whole shape, same as it's the heart of everything else — the one thing I'm completely, certainly sure of." },
  { x: 244, y: 146, name: 'Auva', title: 'Your Dreams', text: 'Big enough that I want a front-row seat to watch every one of them come true.' },
  { x: 262, y: 50, name: 'Vindemiatrix', title: 'Your Kindness', text: 'The way you make total strangers feel like they matter.' },
  { x: 326, y: 330, name: 'Spica', title: 'Your Smile', text: 'The brightest thing in the whole sky, same as yours is the brightest thing in any room.' },
  { x: 353, y: 196, name: 'Heze', title: 'Your Strength', text: 'The days you carried yourself through without ever letting the world see the weight of it.' },
  { x: 450, y: 265, name: 'Syrma', title: 'Your Laugh', text: 'Loud, sudden, completely unfiltered — my favorite sound, hands down.' },
]
// lines connecting the stars, indices into STARS — draws Virgo's traditional branching shape
const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [3, 6],
  [6, 7],
  [7, 8],
]

type QuizItem = { q: string; options: string[]; reveal: string }
const QUIZ: QuizItem[] = [
  {
    q: "What's the real reason I check my phone the second I wake up?",
    options: ['Habit', 'Waiting for the sun to rise on your side of the world', 'Hoping for a good morning from you'],
    reveal: 'The last one. Always the last one. Waking up to your message is my favorite way to start any day.',
  },
  {
    q: 'Why do I save the voice notes you send me?',
    options: ['I forget things easily', 'Your voice is my favorite sound', 'Both, honestly'],
    reveal: 'Both — but mostly the second one. I could listen to you talk about nothing for hours.',
  },
  {
    q: 'What do I actually think about in boring meetings?',
    options: ['Lunch', 'You', "Whether you've eaten yet"],
    reveal: "You, and yes — whether you've eaten yet. I've never been great at multitasking except for this.",
  },
  {
    q: 'Why do I count down the days until I see you again?',
    options: ["I'm impatient by nature", 'Because every day closer feels like progress', 'Because the distance never gets easier, only worth it'],
    reveal: 'The distance never gets easier. It just keeps being worth it.',
  },
  {
    q: "What's my actual favorite thing about you?",
    options: ['Your laugh', 'Your heart', 'Honestly, all of it'],
    reveal: "I tried to pick just one for a long time. I couldn't. It's all of it.",
  },
  {
    q: 'Where do I picture us in the future?',
    options: ['Same city, finally', 'No more time zones between us', 'Wherever you are'],
    reveal: "All three, if I'm honest. But mostly — wherever you are, that's home.",
  },
]

type BgStar = { top: number; left: number; size: number; duration: number; delay: number }
type Heart = { id: number; left: number; duration: number; symbol: string }

function App() {
  const [mounted, setMounted] = useState(false)
  const [unlocked, setUnlocked] = useState(false)
  const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number } | null>(null)
  const [capsuleOpen, setCapsuleOpen] = useState(false)
  const [shake, setShake] = useState(false)
  const [videoError, setVideoError] = useState(false)

  const [reasonIndex, setReasonIndex] = useState(0)
  const touchStartX = useRef<number | null>(null)

  const [activeStar, setActiveStar] = useState<number | null>(null)

  const [quizIndex, setQuizIndex] = useState(0)
  const [chosenOption, setChosenOption] = useState<number | null>(null)
  const [quizDone, setQuizDone] = useState(false)

  const [bgStars, setBgStars] = useState<BgStar[]>([])
  const [hearts, setHearts] = useState<Heart[]>([])

  // client-only setup (avoids server/client render mismatches)
  useEffect(() => {
    setMounted(true)
    const stars: BgStar[] = Array.from({ length: 70 }, () => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: 1 + Math.random() * 2,
      duration: 2 + Math.random() * 4,
      delay: Math.random() * 4,
    }))
    setBgStars(stars)
  }, [])

  useEffect(() => {
    const target = new Date(BIRTHDAY).getTime()
    function tick() {
      const diff = target - Date.now()
      if (diff <= 0) {
        setUnlocked(true)
        setTimeLeft(null)
        return
      }
      setTimeLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor(diff / 3600000) % 24,
        m: Math.floor(diff / 60000) % 60,
        s: Math.floor(diff / 1000) % 60,
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  function handleCapsuleClick() {
    if (!unlocked) {
      setShake(true)
      setTimeout(() => setShake(false), 400)
      return
    }
    setCapsuleOpen((o) => !o)
  }

  function prevReason() {
    setReasonIndex((i) => (i - 1 + REASONS.length) % REASONS.length)
  }
  function nextReason() {
    setReasonIndex((i) => (i + 1) % REASONS.length)
  }
  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX
  }
  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 40) {
      if (dx < 0) nextReason()
      else prevReason()
    }
    touchStartX.current = null
  }

  function chooseOption(i: number) {
    if (chosenOption !== null) return
    setChosenOption(i)
  }

  function dropHearts() {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const symbols = ['♥', '✦', '♥', '✧']
    for (let i = 0; i < 28; i++) {
      setTimeout(() => {
        const id = Date.now() + Math.random()
        const heart: Heart = {
          id,
          left: Math.random() * 100,
          duration: 3 + Math.random() * 2.5,
          symbol: symbols[Math.floor(Math.random() * symbols.length)],
        }
        setHearts((h) => [...h, heart])
        setTimeout(() => setHearts((h) => h.filter((x) => x.id !== id)), 6000)
      }, i * 90)
    }
  }

  function nextQuiz() {
    if (quizIndex + 1 >= QUIZ.length) {
      setQuizDone(true)
      dropHearts()
    } else {
      setQuizIndex((i) => i + 1)
      setChosenOption(null)
    }
  }

  const currentQuiz = QUIZ[quizIndex]

  return (
    <div className="font-body relative bg-gradient-to-b from-night-deep via-night to-night-light text-cream overflow-x-hidden">
      {/* background stars */}
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        {mounted &&
          bgStars.map((s, i) => (
            <div
              key={i}
              className="bday-motion absolute rounded-full bg-cream"
              style={{
                top: `${s.top}vh`,
                left: `${s.left}vw`,
                width: `${s.size}px`,
                height: `${s.size}px`,
                opacity: 0.5,
                animation: `bday-twinkle ${s.duration}s linear infinite`,
                animationDelay: `${s.delay}s`,
              }}
            />
          ))}
      </div>

      {/* ================= HERO ================= */}
      <section id="hero" className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 py-20">
        <p className="font-display italic text-lavender text-base md:text-lg mb-3">
          I couldn't be there to hand this to you, so I built it instead.
        </p>
        <h1 className="font-display font-semibold text-4xl md:text-6xl leading-tight">
          For <span className="text-gold-soft">{HER_NAME}</span>
        </h1>
        <p className="text-lavender max-w-[32ch] mt-4 mb-10 text-base md:text-lg">
          Happy birthday. Everything on this page is about you — open it whenever you're ready.
        </p>

        <div className="flex gap-3 md:gap-7 mb-10" aria-live="polite">
          {mounted && timeLeft && (
            <>
              <div className="flex flex-col items-center">
                <span className="font-display text-2xl md:text-4xl text-gold tabular-nums">{timeLeft.d}</span>
                <span className="text-[.72rem] text-lavender mt-1 tracking-wide">days</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-display text-2xl md:text-4xl text-gold tabular-nums">{timeLeft.h}</span>
                <span className="text-[.72rem] text-lavender mt-1 tracking-wide">hrs</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-display text-2xl md:text-4xl text-gold tabular-nums">{timeLeft.m}</span>
                <span className="text-[.72rem] text-lavender mt-1 tracking-wide">min</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-display text-2xl md:text-4xl text-gold tabular-nums">{timeLeft.s}</span>
                <span className="text-[.72rem] text-lavender mt-1 tracking-wide">sec</span>
              </div>
            </>
          )}
        </div>

        <button
          onClick={handleCapsuleClick}
          className={`bday-motion relative w-[150px] h-[150px] md:w-[170px] md:h-[170px] rounded-full flex flex-col items-center justify-center gap-2 transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-4 ${
            unlocked ? 'border border-gold' : 'border border-gold/40'
          }`}
          style={{
            background: 'radial-gradient(circle at 35% 30%, hsl(var(--gold) / 0.18), hsl(var(--gold) / 0.02) 70%)',
            animation: shake ? 'bday-shake 0.4s ease' : undefined,
          }}
        >
          <span className={`text-3xl ${unlocked ? 'text-gold-soft' : 'text-gold'}`}>{unlocked ? '✧' : '✦'}</span>
          <span className="text-sm text-lavender max-w-[110px]">
            {!mounted ? 'Loading…' : unlocked ? (capsuleOpen ? 'Close' : "It's your day. Open it.") : 'Not yet — almost'}
          </span>
        </button>

        {capsuleOpen && unlocked && (
          <div className="mt-10 max-w-[480px] flex flex-col items-center gap-5">
            <p className="font-display text-lg md:text-xl">{CAPSULE_MESSAGE}</p>
            {!videoError ? (
              <video
                playsInline
                preload="none"
                controls
                className="w-full max-w-[420px] rounded-md border border-gold/30"
                onError={() => setVideoError(true)}
              >
                <source src={VIDEO_SRC} type="video/mp4" />
              </video>
            ) : (
              <p className="text-lavender text-sm border border-dashed border-gold/35 rounded-md p-5">
                🎥 Your video will appear here once it's added at {VIDEO_SRC}
              </p>
            )}
          </div>
        )}

        <a href="#reasons" className="mt-14 text-lavender text-sm no-underline">
          keep scrolling
          <span
            className="bday-motion block mx-auto mt-1 w-3.5 h-3.5 border-r border-b border-lavender"
            style={{ transform: 'rotate(45deg)', animation: 'bday-bob 1.6s ease-in-out infinite' }}
            aria-hidden="true"
          />
        </a>
      </section>

      {/* ================= REASONS ================= */}
      <section id="reasons" className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 py-20">
        <h2 className="font-display font-semibold text-2xl md:text-4xl mb-2">18 reasons, in no particular order</h2>
        <p className="text-lavender max-w-[40ch] mb-10">Tap through — there's one for every year.</p>

        <div className="flex items-center gap-3 md:gap-8 w-full max-w-[560px]" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <button
            onClick={prevReason}
            aria-label="Previous reason"
            className="flex-none w-[42px] h-[42px] rounded-full border border-gold/35 text-gold-soft flex items-center justify-center hover:bg-gold/10 hover:scale-105 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4">
              <path d="M15 4l-8 8 8 8" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="flex-1 min-h-[180px] flex flex-col items-center justify-center gap-5">
            <span className="text-[.78rem] text-lavender tracking-wide">
              {String(reasonIndex + 1).padStart(2, '0')} / {REASONS.length}
            </span>
            <p className="font-display text-xl md:text-2xl max-w-[36ch]">{REASONS[reasonIndex]}</p>
          </div>

          <button
            onClick={nextReason}
            aria-label="Next reason"
            className="flex-none w-[42px] h-[42px] rounded-full border border-gold/35 text-gold-soft flex items-center justify-center hover:bg-gold/10 hover:scale-105 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4">
              <path d="M9 4l8 8-8 8" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="w-full max-w-[560px] h-[2px] bg-gold/15 mt-9 rounded-full overflow-hidden">
          <div className="h-full bg-gold transition-all" style={{ width: `${((reasonIndex + 1) / REASONS.length) * 100}%` }} />
        </div>
      </section>

      {/* ================= CONSTELLATION ================= */}
      <section id="constellation" className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 py-20">
        <h2 className="font-display font-semibold text-2xl md:text-4xl mb-2">Your constellation</h2>
        <p className="text-lavender max-w-[40ch] mb-6">Virgo — every star is something about you. Tap one.</p>

        <svg viewBox="0 0 500 360" role="img" aria-label="Virgo, drawn as an interactive constellation" className="w-full max-w-[560px] h-auto mt-4">
          {EDGES.map(([ai, bi], i) => {
            const a = STARS[ai]
            const b = STARS[bi]
            return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="hsl(var(--gold) / 0.28)" strokeWidth={1} />
          })}
          {STARS.map((star, i) => (
            <g
              key={i}
              tabIndex={0}
              role="button"
              aria-label={`${star.name}: ${star.title}`}
              className="cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
              onClick={() => setActiveStar(i)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setActiveStar(i)
                }
              }}
            >
              <circle
                cx={star.x}
                cy={star.y}
                r={activeStar === i ? 7 : 5}
                className="bday-motion transition-all"
                fill={activeStar === i ? 'hsl(var(--gold))' : 'hsl(var(--gold-soft))'}
                style={{ animation: 'bday-pulse 3s ease-in-out infinite' }}
              />
            </g>
          ))}
        </svg>

        {activeStar !== null && (
          <div className="mt-8 max-w-[380px] px-7 py-6 border border-gold/30 rounded-lg bg-gold/5">
            <p className="text-lavender text-xs tracking-wide mb-1">{STARS[activeStar].name}</p>
            <h3 className="font-display text-lg text-gold-soft mb-2">{STARS[activeStar].title}</h3>
            <p className="text-cream mb-4">{STARS[activeStar].text}</p>
            <button onClick={() => setActiveStar(null)} className="text-lavender text-sm underline bg-transparent border-none cursor-pointer p-0">
              close
            </button>
          </div>
        )}
      </section>

      {/* ================= QUIZ ================= */}
      <section id="quiz" className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 py-20">
        <h2 className="font-display font-semibold text-2xl md:text-4xl mb-2">How well do you know yourself?</h2>
        <p className="text-lavender max-w-[40ch] mb-8">Careful — every answer here is true.</p>

        {!quizDone ? (
          <div className="w-full max-w-[480px]">
            <p className="text-lavender text-sm mb-4">
              Question {quizIndex + 1} of {QUIZ.length}
            </p>
            <p className="font-display text-xl md:text-2xl mb-7">{currentQuiz.q}</p>
            <div className="flex flex-col gap-3">
              {currentQuiz.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => chooseOption(i)}
                  disabled={chosenOption !== null}
                  className={`text-left px-4 py-3 rounded-md border text-cream text-[.95rem] transition ${
                    chosenOption === i ? 'border-gold bg-gold/10' : 'border-gold/25 bg-cream/[0.03] hover:bg-gold/10 hover:border-gold/50'
                  } focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {chosenOption !== null && <p className="font-display italic text-gold-soft mt-6 text-[1.05rem]">{currentQuiz.reveal}</p>}
            {chosenOption !== null && (
              <button
                onClick={nextQuiz}
                className="mt-7 border border-gold text-gold-soft rounded-full px-7 py-2.5 bg-transparent hover:bg-gold/10 transition"
              >
                Continue
              </button>
            )}
          </div>
        ) : (
          <p className="font-display text-2xl md:text-3xl max-w-[34ch]">
            You made it through every question, and got the same answer every time: I love you, {HER_NAME}. Happy birthday. I can't wait to close
            this distance for good.
          </p>
        )}
      </section>

      {hearts.map((h) => (
        <div
          key={h.id}
          className="fixed -top-8 z-50 text-rose text-lg pointer-events-none"
          style={{ left: `${h.left}vw`, animation: `bday-fall ${h.duration}s linear forwards` }}
        >
          {h.symbol}
        </div>
      ))}

      <footer className="relative z-10 text-center text-lavender text-sm px-6 py-16">
        <p>{FOOTER_NOTE}</p>
      </footer>
    </div>
  )
}
