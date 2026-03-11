"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiClock, FiCalendar, FiUser } from "react-icons/fi";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  author: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "5 Biggest Mistakes Beginners Make in the Gym",
    excerpt: "Avoid these common pitfalls.",
    content: `Starting your fitness journey is exciting, but many beginners unknowingly sabotage their progress with common mistakes. Here are the top 5 you need to avoid:

**1. Skipping Warm-Up**
Jumping straight into heavy lifts without warming up is a recipe for injury. Spend 5-10 minutes on dynamic stretches and light cardio to prepare your muscles and joints.

**2. Ego Lifting**
Using weights that are too heavy to impress others leads to poor form and injuries. Focus on controlled movements with proper form — your muscles don't care about the number on the dumbbell.

**3. Neglecting Nutrition**
You can't out-train a bad diet. Your body needs proper fuel to build muscle and recover. Prioritize protein intake (1.6-2.2g per kg of bodyweight) and eat in a slight caloric surplus for muscle gain.

**4. No Progressive Overload**
Doing the same exercises with the same weight week after week won't build muscle. Gradually increase weight, reps, or sets to continuously challenge your body.

**5. Inconsistency**
The best program is the one you stick to. Training 3-4 times per week consistently beats a perfect program you do for 2 weeks then quit. Build the habit first, optimize later.

**The Bottom Line:** Focus on learning proper form, be patient with progress, eat well, and stay consistent. The results will come.`,
    date: "Mar 5, 2026",
    readTime: "5 min",
    category: "Training Tips",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600",
    author: "Rudrendra Shrestha",
  },
  {
    id: 2,
    title: "The Truth About Fat Loss: What Actually Works",
    excerpt: "Science-backed principles of effective fat loss.",
    content: `Fat loss is surrounded by myths and quick-fix promises. Let's cut through the noise and focus on what actually works, backed by science.

**Caloric Deficit is King**
The fundamental principle of fat loss is consuming fewer calories than you burn. No supplement, superfood, or special diet can override this basic thermodynamic law. Track your calories for at least 2 weeks to understand your intake.

**Protein is Your Best Friend**
During a caloric deficit, protein helps preserve muscle mass. Aim for 2-2.5g per kg of bodyweight. High-protein foods also keep you fuller for longer, making the deficit easier to maintain.

**Strength Training > Cardio**
While cardio burns calories during the session, strength training builds muscle which increases your resting metabolic rate. You burn more calories 24/7 with more muscle mass. Prioritize 3-4 resistance training sessions per week.

**Sleep & Stress Management**
Poor sleep increases hunger hormones (ghrelin) and decreases satiety hormones (leptin). Aim for 7-9 hours of quality sleep. Chronic stress elevates cortisol, which promotes fat storage — especially around the midsection.

**The Role of Cardio**
Cardio is a tool, not a requirement. Walking 8,000-10,000 steps daily (NEAT) is more sustainable and effective than grueling cardio sessions. Add 2-3 sessions of moderate cardio if needed.

**Patience & Consistency**
Healthy fat loss is 0.5-1% of bodyweight per week. Crash diets lead to muscle loss, metabolic adaptation, and rebound weight gain. Play the long game.

**The Bottom Line:** Create a moderate caloric deficit, keep protein high, lift weights, sleep well, manage stress, and be patient. That's the proven formula.`,
    date: "Feb 28, 2026",
    readTime: "7 min",
    category: "Nutrition",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=600",
    author: "Rudrendra Shrestha",
  },
  {
    id: 3,
    title: "Building Mental Toughness: The Athlete's Mindset",
    excerpt: "How the athlete's mindset transforms every area of life.",
    content: `Physical training builds your body. Mental training builds your character. The gym is a laboratory for developing the mindset that will carry you through every challenge in life.

**Embrace Discomfort**
Growth happens outside your comfort zone — in the gym and in life. That last rep when your muscles are screaming, that's where transformation occurs. Train yourself to lean into discomfort rather than away from it.

**Set Process Goals, Not Just Outcome Goals**
Instead of "I want to lose 10kg," focus on "I will train 4x per week and hit my protein target daily." Process goals are within your control and build the habits that lead to outcomes.

**The Power of Consistency Over Motivation**
Motivation is fleeting. Discipline is permanent. You won't always feel like training, but showing up on days you don't want to is what separates achievers from dreamers. Build systems, not just goals.

**Visualization**
Elite athletes visualize their performance before executing. Before a heavy set, close your eyes and see yourself completing it with perfect form. Your brain doesn't fully distinguish between vivid visualization and reality.

**Learn from Failure**
A failed rep isn't failure — it's data. It tells you where your limit is today so you can push past it tomorrow. Adopt a growth mindset: every setback is a setup for a comeback.

**Surround Yourself with Excellence**
Your environment shapes your behavior. Train with people who are stronger, more disciplined, and more focused than you. Their standards become your new baseline.

**The Bottom Line:** The strongest muscle you can develop is your mind. The discipline, resilience, and mental toughness you build through training will transform every area of your life.`,
    date: "Feb 20, 2026",
    readTime: "6 min",
    category: "Mindset",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600",
    author: "Rudrendra Shrestha",
  },
  {
    id: 4,
    title: "Progressive Overload: The Key to Muscle Growth",
    excerpt: "The fundamental principle driving all muscle growth.",
    content: `Progressive overload is the single most important principle for building muscle and strength. Without it, your body has no reason to adapt and grow.

**What is Progressive Overload?**
It's the gradual increase of stress placed on your body during training. Your muscles adapt to the demands you place on them — so you must consistently increase those demands.

**Methods of Progressive Overload:**

**1. Increase Weight**
The most straightforward method. Add 1-2.5kg to your lifts when you can complete all prescribed reps with good form.

**2. Increase Reps**
If you're doing 3×8, work up to 3×12 before adding weight. This builds muscular endurance alongside strength.

**3. Increase Sets**
Add an extra set to your exercises. Going from 3 sets to 4 sets increases total volume by 33%.

**4. Decrease Rest Time**
Reducing rest between sets increases training density and metabolic stress — a key driver of muscle growth.

**5. Improve Range of Motion**
A deeper squat or a fuller stretch at the bottom of a curl recruits more muscle fibers and increases time under tension.

**6. Slow Down the Tempo**
A 3-second eccentric (lowering) phase dramatically increases time under tension without changing the weight.

**Tracking is Essential**
You can't progressively overload if you don't track your workouts. Log every set, rep, and weight. Your training journal is your roadmap to progress.

**The Bottom Line:** Progressive overload isn't about lifting heavy every session. It's about doing slightly more than last time, consistently, over months and years.`,
    date: "Feb 14, 2026",
    readTime: "8 min",
    category: "Training Tips",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=600",
    author: "Rudrendra Shrestha",
  },
  {
    id: 5,
    title: "Meal Prep Guide for Busy Professionals",
    excerpt: "Simple meal prep strategies for busy schedules.",
    content: `Meal prep is the secret weapon of every successful fitness transformation. It removes decision fatigue, saves time and money, and keeps you consistent with your nutrition.

**Why Meal Prep?**
When you're hungry and unprepared, you make poor food choices. Having meals ready eliminates the "what should I eat?" problem and keeps you on track with your goals.

**The Basic Framework:**
Choose 2-3 protein sources, 2-3 carb sources, and 2-3 vegetable sources. Mix and match throughout the week.

**Protein Sources:**
- Chicken breast (versatile, affordable)
- Lean ground turkey
- Eggs / Egg whites
- Greek yogurt
- Fish (salmon, tilapia)

**Carb Sources:**
- Rice (white or brown)
- Sweet potatoes
- Oats
- Quinoa
- Whole wheat pasta

**Vegetables:**
- Broccoli
- Spinach
- Bell peppers
- Green beans
- Mixed stir-fry veggies

**Step-by-Step Process:**
- Plan your meals for the week (Sunday)
- Shop for all ingredients
- Cook proteins in bulk (bake, grill, or slow cook)
- Cook carbs in bulk (rice cooker is your friend)
- Steam or roast vegetables
- Portion into containers
- Refrigerate (3-4 days) or freeze (up to 3 months)

**Pro Tips:**
- Invest in quality glass containers
- Use different sauces and seasonings to avoid flavor fatigue
- Prep breakfast items too (overnight oats, egg muffins)
- Start with just prepping lunch — don't overcomplicate it

**The Bottom Line:** Meal prep doesn't need to be complicated. Start small, stay consistent, and watch how much easier hitting your nutrition targets becomes.`,
    date: "Feb 8, 2026",
    readTime: "10 min",
    category: "Nutrition",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=600",
    author: "Rudrendra Shrestha",
  },
  {
    id: 6,
    title: "Why Sleep is Your Secret Weapon for Gains",
    excerpt: "How sleep optimization improves training results.",
    content: `You don't grow in the gym — you grow during recovery. Training creates the stimulus, but adaptation happens when you rest. Neglecting recovery is like planting seeds and never watering them.

**The Science of Sleep & Muscle Growth**
During deep sleep, your body releases growth hormone (GH), which is essential for muscle repair and growth. Poor sleep can reduce GH secretion by up to 70%.

**How Much Sleep Do You Need?**
For active individuals, 7-9 hours is optimal. Athletes may benefit from even more. Quality matters as much as quantity.

**Sleep Optimization Tips:**
- Keep your room dark, cool (18-20°C), and quiet
- Avoid screens 1 hour before bed (blue light suppresses melatonin)
- Maintain a consistent sleep/wake schedule — even on weekends
- Avoid caffeine after 2 PM
- Don't eat heavy meals within 2 hours of bedtime
- Consider magnesium supplementation (400mg before bed)

**The Impact of Poor Sleep:**
- Increased hunger hormones (ghrelin) — you'll crave junk food
- Decreased satiety hormones (leptin) — you won't feel full
- Elevated cortisol — promotes fat storage, especially belly fat
- Reduced testosterone — impairs muscle building
- Poor recovery — increased injury risk
- Decreased motivation and mental focus

**Napping Strategy**
A 20-30 minute power nap between 1-3 PM can boost recovery without affecting nighttime sleep. Avoid napping longer than 30 minutes or after 4 PM.

**Track Your Sleep**
Use a fitness tracker or sleep app to monitor sleep quality. Look at trends over weeks, not individual nights.

**The Bottom Line:** Sleep is not a luxury — it's the foundation of your fitness results. Prioritize it as seriously as your training and nutrition. Your gains depend on it.`,
    date: "Feb 1, 2026",
    readTime: "4 min",
    category: "Recovery",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=600",
    author: "Rudrendra Shrestha",
  },
];

const categoryColors: Record<string, string> = {
  "Training Tips": "bg-accent/90",
  Nutrition: "bg-green-500/90",
  Mindset: "bg-purple-500/90",
  Recovery: "bg-blue-500/90",
};

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Render content with markdown-like formatting
  const renderContent = (content: string) => {
    return content.split("\n\n").map((paragraph, i) => {
      // Bold-only line = heading
      if (paragraph.startsWith("**") && paragraph.endsWith("**") && !paragraph.slice(2, -2).includes("**")) {
        return (
          <h3
            key={i}
            className="font-heading text-xl tracking-wider text-accent mt-8 mb-3"
          >
            {paragraph.replace(/\*\*/g, "")}
          </h3>
        );
      }

      // Lines with bullet points
      if (paragraph.includes("\n-")) {
        const lines = paragraph.split("\n");
        const heading = lines[0] && !lines[0].startsWith("-") ? lines[0] : null;
        const items = lines.filter((line) => line.startsWith("-"));
        return (
          <div key={i} className="mb-4">
            {heading && (
              <p className="text-gray-300 font-body text-sm leading-relaxed mb-2">
                {heading.split(/(\*\*.*?\*\*)/g).map((part, j) =>
                  part.startsWith("**") && part.endsWith("**") ? (
                    <strong key={j} className="text-white font-semibold">
                      {part.replace(/\*\*/g, "")}
                    </strong>
                  ) : (
                    <span key={j}>{part}</span>
                  )
                )}
              </p>
            )}
            <ul className="space-y-1.5 ml-1">
              {items.map((item, li) => (
                <li
                  key={li}
                  className="text-gray-400 font-body text-sm flex items-start gap-2"
                >
                  <span className="text-accent mt-1.5 text-[6px]">●</span>
                  {item.replace(/^-\s*/, "")}
                </li>
              ))}
            </ul>
          </div>
        );
      }

      // Paragraphs with inline bold
      if (paragraph.includes("**")) {
        const parts = paragraph.split(/(\*\*.*?\*\*)/g);
        return (
          <p
            key={i}
            className="text-gray-300 font-body text-sm leading-relaxed mb-4"
          >
            {parts.map((part, j) =>
              part.startsWith("**") && part.endsWith("**") ? (
                <strong key={j} className="text-white font-semibold">
                  {part.replace(/\*\*/g, "")}
                </strong>
              ) : (
                <span key={j}>{part}</span>
              )
            )}
          </p>
        );
      }

      // Regular paragraph
      return (
        <p
          key={i}
          className="text-gray-300 font-body text-sm leading-relaxed mb-4"
        >
          {paragraph}
        </p>
      );
    });
  };

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070')",
          }}
        />
        <div className="absolute inset-0 bg-primary/85" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.h1
            className="font-heading text-5xl sm:text-7xl tracking-wider"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Fitness <span className="text-gradient">Blog</span>
          </motion.h1>
          <motion.p
            className="mt-4 text-muted font-body text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Training tips, nutrition advice, and mindset coaching
          </motion.p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="section-padding bg-primary">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <ScrollReveal key={post.id} delay={index * 0.1}>
                <article
                  className="glass rounded-lg overflow-hidden group cursor-pointer h-full flex flex-col"
                  onClick={() => setSelectedPost(post)}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url('${post.image}')` }}
                    />
                    <div
                      className={`absolute top-3 left-3 ${
                        categoryColors[post.category] || "bg-accent/90"
                      } px-3 py-1 rounded text-[10px] uppercase tracking-wider text-primary font-body font-semibold`}
                    >
                      {post.category}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 text-muted text-xs font-body mb-3">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h2 className="font-heading text-xl tracking-wider text-white group-hover:text-accent transition-colors mb-3">
                      {post.title}
                    </h2>
                    <p className="text-muted font-body text-sm leading-relaxed flex-grow">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <span className="text-accent text-xs font-body uppercase tracking-wider group-hover:tracking-[0.2em] transition-all">
                        Read More →
                      </span>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BLOG POST POPUP MODAL ===== */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedPost(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal */}
            <motion.div
              className="relative w-full max-w-3xl max-h-[90vh] glass rounded-lg overflow-hidden flex flex-col"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-primary/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:text-accent hover:border-accent/50 transition-all duration-300"
              >
                <FiX size={20} />
              </button>

              {/* Scrollable Content */}
              <div className="overflow-y-auto">
                {/* Cover Image */}
                <div className="relative h-64 sm:h-80 flex-shrink-0">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url('${selectedPost.image}')`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-16">
                    <span
                      className={`inline-block ${
                        categoryColors[selectedPost.category] || "bg-accent/90"
                      } text-primary text-xs font-body font-semibold uppercase tracking-wider px-3 py-1 rounded-sm mb-3`}
                    >
                      {selectedPost.category}
                    </span>
                    <h2 className="font-heading text-3xl sm:text-4xl tracking-wider text-white leading-tight">
                      {selectedPost.title}
                    </h2>
                  </div>
                </div>

                {/* Article Meta */}
                <div className="px-6 sm:px-8 pt-6 flex flex-wrap items-center gap-4 text-muted text-xs font-body">
                  <span className="flex items-center gap-1.5">
                    <FiUser size={13} />
                    {selectedPost.author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FiCalendar size={13} />
                    {selectedPost.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FiClock size={13} />
                    {selectedPost.readTime} read
                  </span>
                </div>

                {/* Article Body */}
                <div className="px-6 sm:px-8 py-8">
                  {renderContent(selectedPost.content)}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}