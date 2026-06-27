export const initialSeedData = {
  courses: [
    {
      id: "kodava",
      title: "Kodava",
      dialectInfo: "RARE DIALECT",
      description: "Dravidian language spoken primarily in the Kodagu district of Karnataka, India. Preserving heritage through modern tech.",
      detailedDescription: "In the lush highlands of Coorg, greetings are often accompanied by a gentle nod. Kodava Takk is an endangered language, making every word you learn a vital part of cultural preservation.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPqEQZDxRunUpDjheRVbbBjHRTwMRpZ4tEeNXrOLPo_nRbhGCRPCyQdTGX6q2FrFlwoSnXT0rwg_xHsFbGebNOGHVtVIdBSG9m_sCBOc6gXpqt6-p4gWvffi-CgjT466YLZLqO5GTCrzwn3E4rKB9JG9EixfkZqPQ5oniS4_gABx9-tugGnVLLh9LhdL89eqUDoWUCBqYrQ-O-Xrd9XH95qgOJQ2DcD0gCcKdBpPx0aLfMDkLhBBRbU3MRsm8LKEF4-lHakSrDV8k",
      bannerImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCmRFCjEaiEjZ4hllAhNcZKZfDBr_tFSoI4fciO4fHlMD2jqIbX9FEaZEH4zhhGWSRlkCsOEzNDW7Sxx0vjT11uzAZbv646K9yirVPy3tOJGwSoooskBZRffMRdI3M6W4XAeRbrLjDbcwAOjMfZqXHiPf2YL-G1DJq3zb4P-xZbDGJN7FrcWgXKE_kkyn53svcf1393SQe-JbAVfW9cP4Re6YDuLhye8iVNEGLjWVUEN1X6glr_NKmgz5ImP44wVEisa0FWaJFdJRQ",
      progress: 35,
      level: "Beginner",
      totalLessons: 12,
      completedLessons: 4,
      units: [
        {
          id: "unit-1",
          title: "Unit 1: Greetings",
          status: "LIVE",
          lessons: [
            {
              id: "lesson-1",
              title: "Introduction to 'Namaskara'",
              activitiesCount: 3,
              duration: "12 mins",
              unlocked: true,
              completed: true,
              activities: [
                { id: "act-1", type: "listening", title: "Phonetic Nuance", word: "Namaskara", translation: "Hello / Greetings", audioSrc: "namaskara.mp3", desc: "The traditional way to greet someone in Kodava. Used at any time of day to show respect and warmth." },
                { id: "act-2", type: "writing", title: "The Character Set" }
              ]
            },
            {
              id: "lesson-2",
              title: "Formal vs. Informal",
              activitiesCount: 5,
              duration: "20 mins",
              unlocked: true,
              completed: false,
              activities: [
                { id: "act-3", type: "match", title: "Identify the correct phrase" },
                { id: "act-4", type: "vocabulary", title: "Daily Review" }
              ]
            }
          ]
        },
        {
          id: "unit-2",
          title: "Unit 2: Family & Lineage",
          status: "LIVE",
          lessons: [
            { id: "lesson-3", title: "Elders & Kinship Terms", activitiesCount: 4, duration: "15 mins", unlocked: false, completed: false }
          ]
        },
        {
          id: "unit-3",
          title: "Unit 3: Harvest Traditions",
          status: "LIVE",
          lessons: [
            { id: "lesson-4", title: "Puttari Festival Basics", activitiesCount: 3, duration: "10 mins", unlocked: false, completed: false }
          ]
        },
        {
          id: "unit-4",
          title: "Unit 4: Advanced Syntax",
          status: "DRAFT",
          lessons: [
            { id: "lesson-5", title: "Compound Verb Structures", activitiesCount: 6, duration: "25 mins", unlocked: false, completed: false }
          ]
        }
      ],
      vocabulary: [
        { word: "Namaskara", phonetic: "na-mas-ka-ra", type: "Greeting", translation: "Hello / Greetings", example: "Namaskara, sowkhyame?", exampleTranslation: "Hello, are you well?" },
        { word: "Enne", phonetic: "en-ne", type: "Pronoun", translation: "Me / I", example: "Enne baruvia.", exampleTranslation: "I am coming." },
        { word: "Pedha", phonetic: "pe-dha", type: "Noun", translation: "Name", example: "Ninna pedha enu?", exampleTranslation: "What is your name?" },
        { word: "Sowkhyame", phonetic: "sow-khya-me", type: "Adjective", translation: "Are you well?", example: "Namaskara, sowkhyame?", exampleTranslation: "Hello, are you well?" }
      ]
    },
    {
      id: "japanese",
      title: "Advanced Business Japanese",
      level: "Intermediate",
      description: "Master the nuances of Keigo and professional etiquette in the corporate world.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBfMqTlIukXIc7s2iKR4PWE4I-RTFEWITZr2OpX0Eu3WEE7TeB0uy6S8KUHF3aDCqfAByVkOeGN3t60MM8WggAanV7o8JqzuGyhqrGABwGXAJuwtK0gcZLhdxOrV36P7knkfouYAaj4_ceoG61kCWZiB3wFrmEr-vxVB96IZQQVOQVzdvLdCdvGTQ4uUP_i9bYThSSLmtjK4x2nYhzgQ3i7cx4Nqr6LGSL7_L4JqOSykngPmEJdO7exA3MOJFz44gvu-RqkwBJad28",
      progress: 65,
      totalLessons: 24,
      completedLessons: 15,
      units: []
    },
    {
      id: "french",
      title: "Modern French Literature",
      level: "Expert",
      description: "Analyzing contemporary works from 21st-century Francophone authors.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZu_u14ts0ZUcgPSvWKaqHRF2fgMEtXMs-8UCixh4Fq7UM6CzwjMjCAui47K2IdnMu8y4lVBwcDI7PYTLatbNk3eTgWAiP7eAhOKFu4wU90A0vtlb1tse4aqPyy6mXHAQ4p8pc9cf8GAkpIdvPys-T_-gByTT3Mlkgcfeos1aWUkMiyRMVjGpKG2p5oKz9GZJS0n5KAObgUaFJ6zpVQyOmpQGNIqOyctKxRx55h_P1nbm1xVeK2Hg36Nr60iOH_EI1KjyxZfit_yY",
      progress: 88,
      totalLessons: 18,
      completedLessons: 16,
      units: [],
      vocabulary: [
        { word: "L'Éphémère", type: "Noun", translation: "Ephemeral / Short-lived", example: "\"La beauté des fleurs de cerisier réside dans leur nature éphémère.\"", exampleTranslation: "The beauty of cherry blossoms lies in their ephemeral nature." },
        { word: "La Solitude", type: "Noun", translation: "Solitude / Loneliness", example: "\"Il apprécie la solitude des montagnes.\"", exampleTranslation: "He appreciates the solitude of the mountains." }
      ]
    },
    {
      id: "german",
      title: "Technical German I",
      level: "Beginner",
      description: "Foundational vocabulary and grammar for engineering and tech professionals.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-QLXFZslKhgeZSF-J-STuCjmyNqziFr8yfyAThcjnB6Mp0sFefwJGohIUZWgNtpWexWClfgo3_RH_CFO4SL9hU6A5Nq21IVot5bI0cyKNeSRJHXtI3_5pNWhVOsCwaXaTkrt4Grb2WW3VGzwisGzYUi6N5PVS1v53xlTLuhR7BBT5l2p-2wsGw4ijkpi02AGleq5ZBANl60XypXvVF5maVe7INRHIN63fLwO-x72ZSBhTilNnUR2ya6o2ItZOa87dyttZmHldUys",
      progress: 12,
      totalLessons: 30,
      completedLessons: 3,
      units: []
    },
    {
      id: "spanish",
      title: "Conversational Spanish",
      level: "Intermediate",
      description: "Developing fluency in daily social interactions and cultural contexts.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBvE2Xu8cqHfn4tRlLWSt5_VqPtAVJ6Ru1dVCmHJFdnlMa--vBry9-hkGzPtcvJFZU0YXHWegfIf4L2g_mkpmQ73lcOzfRvUYxT9FtN2Lsbg_KjQPgKnAPbl9UQ93BxT2fNqIXzjdi2fuDfjf2fu86DyGlNIvUu5hsq3pORcikd0_fNbB-bWpDiapS6qpchNUUpmEdKX_LjFk2KFrV7Hlo-VtSzcV-okvPshMS01QpJosK3Lx61l8PGiLKvuMj9emEHt0SEhGLGCn8",
      progress: 42,
      totalLessons: 20,
      completedLessons: 8,
      units: []
    },
    {
      id: "icelandic",
      title: "Icelandic",
      level: "Beginner",
      description: "Learn the heritage language of the Vikings with unique grammatical structures.",
      imageUrl: "https://images.unsplash.com/photo-1504893524553-ac55fce698be?auto=format&fit=crop&w=600&q=80",
      progress: 0,
      totalLessons: 32,
      completedLessons: 0,
      units: []
    },
    {
      id: "tamazight",
      title: "Tamazight",
      level: "Beginner",
      description: "Learn the Berber language spoken across North Africa, utilizing the Tifinagh script.",
      imageUrl: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=600&q=80",
      progress: 0,
      totalLessons: 18,
      completedLessons: 0,
      units: []
    },
    {
      id: "basque",
      title: "Basque",
      level: "Intermediate",
      description: "Explore Euskara, Europe's oldest surviving language isolate with no known relatives.",
      imageUrl: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=600&q=80",
      progress: 0,
      totalLessons: 45,
      completedLessons: 0,
      units: []
    }
  ],
  achievements: [
    {
      id: "genesis-ring",
      title: "The Genesis Ring",
      description: "Mastered the foundational syntax and vocabulary.",
      rarity: "Epic (4%)",
      dateEarned: "Oct 24, 2023",
      unlocked: true,
      category: "Legendary Artifact",
      icon: "cruelty_free",
      color: "primary"
    },
    {
      id: "flawless-week",
      title: "Flawless Week",
      description: "Completed 7 consecutive days of practice with >90% accuracy.",
      rarity: "Rare (15%)",
      dateEarned: "Nov 02",
      unlocked: true,
      category: "Milestone",
      icon: "local_fire_department",
      color: "accent"
    },
    {
      id: "orators-echo",
      title: "Orator's Echo",
      description: "Perfect pronunciation score in 10 consecutive speaking exercises.",
      rarity: "Rare (18%)",
      dateEarned: "Nov 15",
      unlocked: true,
      category: "Skill Master",
      icon: "record_voice_over",
      color: "primary"
    },
    {
      id: "polyglot-core",
      title: "Polyglot Core",
      description: "Complete intermediate module 3 in two or more languages.",
      rarity: "Epic (5%)",
      unlocked: false,
      category: "Locked Achievement",
      icon: "lock",
      color: "muted",
      progress: 40
    },
    {
      id: "cultural-attache",
      title: "Cultural Attache",
      description: "Finish all cultural contexts and historical context notes in a course.",
      rarity: "Common (35%)",
      unlocked: false,
      category: "Locked Achievement",
      icon: "lock",
      color: "muted",
      progress: 15
    }
  ],
  community: {
    kodava: [
      { id: "m-1", user: "Rohan Somanna", level: "Lvl 15", text: "Namaskara everyone! Has anyone successfully finished Unit 2 vocab? Finding the kinship terminology tricky.", timestamp: "2 hrs ago", reactions: [{ emoji: "❤️", count: 4 }, { emoji: "👍", count: 2 }], replies: [
        { id: "r-1", user: "Neela K.", text: "Yes Rohan, the distinction between older/younger siblings' spouses is highly specific! I found sketching a family tree helpful.", timestamp: "1 hr ago" }
      ] },
      { id: "m-2", user: "Prof. Appanna", level: "Instructor", text: "Reminder: The harvest festival of Puttari is covered in Unit 3. Check out the cultural context note before playing the audio lesson.", timestamp: "5 hrs ago", reactions: [{ emoji: "🎓", count: 8 }] }
    ],
    french: [
      { id: "m-3", user: "Sophie Dubois", level: "Lvl 21", text: "J'adore 'L'Éphémère'. Such a poetic word. Fits perfectly in describing cherry blossoms.", timestamp: "Yesterday", reactions: [{ emoji: "🌸", count: 12 }] }
    ]
  }
};
