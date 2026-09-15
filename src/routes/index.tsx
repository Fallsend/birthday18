import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'

export const Route = createFileRoute('/')({ component: App })

/* ============================================================================
   EDIT ME — personalize the birthday page here.
   ============================================================================ */
const HER_NAME = 'Rayn'
const BIRTHDAY = '2026-09-16T00:00:00' // unlocks at local midnight on her device, on this date
const VIDEO_SRC = 'https://assets.macaly-user-data.dev/gy1ra4desaglzg1x6dvf9yoh/caci2yr6wabjr2w2z80x1e09/s2ecPjuPJjQxn2v5p_YPJ.mp4' // uploaded via Macaly's media library
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
type Star = {
  x: number
  y: number
  name: string
  character: string
  media: string
  image: string
  desc: string
}
const STARS: Star[] = [
  {
    x: 50,
    y: 106,
    name: 'ν Vir',
    character: 'Wanderer',
    media: 'Genshin Impact',
    image: '/characters/wanderer.png',
    desc: 'Formerly known as Scaramouche and the Balladeer, the Sixth Fatui Harbinger. Created by the Raiden Shogun as a prototype puppet, he endured centuries of abandonment and betrayal before severing his past through Irminsul. Now walking freely as an Anemo Wanderer, he conceals a deeply loyal and protective heart beneath a razor-sharp, sarcastic tongue.',
  },
  {
    x: 63,
    y: 166,
    name: 'Zavijava',
    character: 'Luka & Hyuna',
    media: 'Alien Stage (ALNST)',
    image: '/characters/luka_hyuna.jpg',
    desc: 'The deeply intertwined legends of Alien Stage. Hyuna is the fierce, charismatic rebel leader with an indomitable will and stage presence that sparked a revolution. Luka is the alluring, melancholic top star with an enigmatic facade and profound childhood scars. From Anakt Garden to the haunting chords of "Wiege," their connection is one of the most intense, tragic, and unforgettable bonds in the series.',
  },
  {
    x: 145,
    y: 197,
    name: 'Zaniah',
    character: 'Princess Luna',
    media: 'My Little Pony',
    image: '/characters/luna.png',
    desc: 'The regal Princess of the Night and co-ruler of Equestria. After being trapped in the dark isolation of Nightmare Moon for a thousand years, she was redeemed through friendship. Endearingly formal, deeply caring, and devoted to guarding ponies inside the dream realm, she embodies redemption, midnight beauty, and gentle strength.',
  },
  {
    x: 205,
    y: 207,
    name: 'Porrima',
    character: 'Midge Maisel',
    media: 'The Marvelous Mrs. Maisel',
    image: '/characters/mrs_maisel.jpg',
    desc: 'Miriam "Midge" Maisel is a brilliant, quick-witted 1950s New Yorker who turns sudden heartbreak into a trailblazing career as a stand-up comedian. Armed with rapid-fire comedic genius, immaculate style, and unstoppable confidence, she refuses to let anyone diminish her ambition, owning the stage completely on her own terms.',
  },
  {
    x: 244,
    y: 146,
    name: 'Auva',
    character: 'Jinx & Ekko',
    media: 'Arcane',
    image: '/characters/jinx_ekko.png',
    desc: 'The Boy Savior and the Loose Cannon—childhood best friends from the Undercity whose bond became a heartbreaking collision of loyalty, trauma, and time. While Ekko leads the Firelights with hope and brilliance, Jinx battles grief and chaotic genius. Their bittersweet history (TimeBomb) remains one of the most visually stunning and emotionally resonant relationships in Arcane.',
  },
  {
    x: 262,
    y: 50,
    name: 'Vindemiatrix',
    character: 'Gloria Delgado-Pritchett',
    media: 'Modern Family',
    image: '/characters/gloria.jpg',
    desc: 'The passionate, glamorous, and fiercely protective Colombian matriarch. Unapologetically vibrant, loudly loving, and always ready to defend her family (often with hilarious mispronunciations and unforgettable stories), Gloria brings fiery energy, endless laughs, and immense heart to everyone around her.',
  },
  {
    x: 326,
    y: 330,
    name: 'Spica',
    character: 'Mini Durin',
    media: 'Genshin Impact',
    image: '/characters/durin.png',
    desc: 'The gentle-hearted dragon from the storybook realm of Simulanka. Born from a legacy of tragedy and fear, Mini Durin only ever yearned for warmth, flight, and genuine companionship. His journey proved that regardless of past curses or origins, kindness and friendship can write an entirely new, heartwarming destiny.',
  },
  {
    x: 353,
    y: 196,
    name: 'Heze',
    character: 'Kim Seyeong & Shin Heejae',
    media: 'Netkama Punch!!!',
    image: '/characters/netkama.jpg',
    desc: 'The chaotic and addictive duo from the virtual world of Arcadia. When Seyeong takes on a female avatar to catfish top-ranking player Shin Heejae for revenge, he never expects Heejae to fall so completely and protectively in love with his persona. Their dynamic turns an elaborate gaming prank into a hilarious, sweet, and unforgettable romance.',
  },
  {
    x: 450,
    y: 265,
    name: 'Syrma',
    character: 'Rudo Surebrec',
    media: 'Gachiakuta',
    image: '/characters/rudo.png',
    desc: 'The relentless, fiery protagonist of Gachiakuta. Wrongfully framed and cast down from the Sphere into the lethal Abyss, Rudo refuses to surrender. Using his vital instrument gloves that give life to the souls of discarded things, he fights through the wasteland with grit, fierce loyalty to his fellow Cleaners, and an unshakeable sense of justice.',
  },
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

type QuizItem = {
  q: string
  placeholder: string
  funnyLine: string
}
const QUIZ: QuizItem[] = [
  {
    q: 'Why do you like eating ice?',
    placeholder: 'Type your freezing cold confession here...',
    funnyLine: 'Crunch crunch... your teeth must be made of vibranium. Are you secretly anemic or just part penguin? 🐧🧊',
  },
  {
    q: 'How did you start reading yaoi?',
    placeholder: 'Explain yourself...',
    funnyLine: 'Admit it, you saw one suspicious panel on Pinterest and suddenly your whole algorithm was cooked forever. 📖✨',
  },
  {
    q: 'When did you start actually loving me?',
    placeholder: 'Be completely honest...',
    funnyLine: "Take your time. If the answer is 'the day you sent me food', I won't even be mad. 🍔❤️",
  },
  {
    q: "What's your favourite meal?",
    placeholder: 'Name the ultimate dish...',
    funnyLine: "Choose carefully. This answer will be cited as legal evidence in future 'where should we eat?' arguments. 🍽️👀",
  },
  {
    q: 'What do you like the most about yourself?',
    placeholder: 'Tell me your favorite thing about you...',
    funnyLine: "'Everything' is 100% the correct answer, but let's hear the full unfiltered narcissism please. 👑💅",
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
  const [currentAnswer, setCurrentAnswer] = useState('')
  const [answers, setAnswers] = useState<string[]>([])
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

  function handleNextQuiz() {
    const nextAns = [...answers]
    nextAns[quizIndex] = currentAnswer.trim()
    setAnswers(nextAns)
    setCurrentAnswer('')

    if (quizIndex + 1 >= QUIZ.length) {
      setQuizDone(true)
      dropHearts()
    } else {
      setQuizIndex((i) => i + 1)
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
        <p className="text-lavender max-w-[44ch] mb-6">Virgo — tap any star to reveal one of your favorite characters.</p>

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
              aria-label={`${star.name}: ${star.character}`}
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
          <div className="mt-8 w-full max-w-[460px] px-6 py-6 border border-gold/35 rounded-2xl bg-night-deep/95 backdrop-blur-md shadow-2xl flex flex-col items-center text-center">
            {STARS[activeStar].image && (
              <div className="w-full h-72 md:h-80 mb-4 rounded-xl overflow-hidden border border-gold/30 bg-black/60 shadow-inner flex items-center justify-center p-2">
                <img
                  src={STARS[activeStar].image}
                  alt={STARS[activeStar].character}
                  className="w-full h-full object-contain rounded-lg drop-shadow-md"
                  loading="lazy"
                />
              </div>
            )}
            <span className="text-gold text-xs tracking-widest uppercase font-medium">
              {STARS[activeStar].name} • {STARS[activeStar].media}
            </span>
            <h3 className="font-display text-2xl text-gold-soft mt-1 mb-3 font-semibold">
              {STARS[activeStar].character}
            </h3>
            <p className="text-cream/90 text-sm md:text-base leading-relaxed mb-5 text-left">
              {STARS[activeStar].desc}
            </p>
            <button
              onClick={() => setActiveStar(null)}
              className="px-6 py-1.5 rounded-full border border-gold/40 text-gold-soft hover:bg-gold/15 text-xs font-medium tracking-wider uppercase transition cursor-pointer"
            >
              Close
            </button>
          </div>
        )}
      </section>

      {/* ================= QUIZ ================= */}
      <section id="quiz" className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 py-20">
        <h2 className="font-display font-semibold text-2xl md:text-4xl mb-2">Pop Quiz For You</h2>
        <p className="text-lavender max-w-[42ch] mb-8">No wrong answers, but you will be judged lovingly.</p>

        {!quizDone ? (
          <div className="w-full max-w-[500px] flex flex-col items-center">
            <span className="text-gold/80 text-xs font-medium tracking-widest uppercase mb-3">
              Question {quizIndex + 1} of {QUIZ.length}
            </span>
            <p className="font-display text-2xl md:text-3xl mb-6 text-cream font-medium">
              {currentQuiz.q}
            </p>

            {/* Answer Input Box */}
            <div className="w-full mb-3">
              <textarea
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                placeholder={currentQuiz.placeholder}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gold/35 bg-night-deep/80 text-cream placeholder:text-lavender/40 text-base focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 transition resize-none shadow-inner"
              />
            </div>

            {/* Funny Line in Yellow below the type thing */}
            <p className="text-amber-300 font-display italic text-sm md:text-base leading-relaxed mb-8 px-3">
              {currentQuiz.funnyLine}
            </p>

            <button
              onClick={handleNextQuiz}
              disabled={!currentAnswer.trim()}
              className={`border border-gold rounded-full px-8 py-2.5 transition text-xs tracking-wider uppercase font-semibold ${
                currentAnswer.trim()
                  ? 'text-gold-soft hover:bg-gold/15 cursor-pointer shadow-lg shadow-gold/10 hover:scale-[1.02]'
                  : 'text-lavender/30 border-gold/20 cursor-not-allowed opacity-50'
              }`}
            >
              {quizIndex + 1 >= QUIZ.length ? 'Finish ✨' : 'Next Question →'}
            </button>
          </div>
        ) : (
          <div className="w-full max-w-[520px] flex flex-col items-center text-center">
            <span className="text-4xl mb-3">💌</span>
            <h3 className="font-display text-2xl md:text-3xl text-gold-soft mb-3">
              Answers Recorded!
            </h3>
            <p className="font-display text-lg md:text-xl text-cream leading-relaxed mb-8">
              You made it through every question, and got the same answer every time: I love you, {HER_NAME}. Happy birthday. I can't wait to close this distance for good.
            </p>

            {/* Summary of her answers */}
            <div className="w-full bg-night-deep/90 border border-gold/30 rounded-2xl p-6 text-left flex flex-col gap-4 shadow-xl">
              <span className="text-gold text-xs uppercase tracking-widest font-semibold border-b border-gold/20 pb-2">
                Your Confessions:
              </span>
              {QUIZ.map((item, idx) => (
                <div key={idx} className="text-sm">
                  <p className="text-lavender font-medium">{idx + 1}. {item.q}</p>
                  <p className="text-amber-200/90 italic mt-1 pl-3 border-l-2 border-gold/40">
                    "{answers[idx] || 'No answer'}"
                  </p>
                </div>
              ))}
            </div>
          </div>
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
