const skillsData = {
  skills: [
    {
      name: "Web Development",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      description: "Design and build modern responsive websites and full-stack applications used by millions worldwide.",
      level: "Beginner → Advanced",
      time: "3-6 Months",
      prerequisites: "HTML, CSS Basics",
      why: "High demand + freelancing + startups",

      roles: "Frontend Dev, Backend Dev, Full Stack Dev",
      salary: "₹4L - ₹15L per year",
      tools: "React, Node.js, MongoDB, Git",
      demand: "Very High 🚀",

      notes: [
        { title: "Beginner HTML & CSS Notes", link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
        { title: "Advanced React Guide", link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
        { title: "Interview Questions", link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
        { title: "Quick Revision Sheet", link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" }
      ],

      resources: [
        { title: "Web Dev Roadmap", link: "https://www.youtube.com/embed/ZxKM3DCV2kE", duration: "1h" },
        { title: "React Course", link: "https://www.youtube.com/embed/Ke90Tje7VS0", duration: "10h" },
        { title: "JavaScript", link: "https://www.youtube.com/embed/jS4aFq5-91M", duration: "8h" },
        { title: "CSS", link: "https://www.youtube.com/embed/3PHXvlpOkf4", duration: "5h" }
      ]
    },

    {
      name: "Artificial Intelligence",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
      description: "Create intelligent systems that can learn, reason, and make decisions like humans.",
      level: "Intermediate",
      time: "6-9 Months",
      prerequisites: "Python, Linear Algebra",
      why: "Future of technology",

      roles: "AI Engineer, Researcher, ML Engineer",
      salary: "₹8L - ₹30L per year",
      tools: "Python, TensorFlow, PyTorch",
      demand: "Extremely High 🔥",

      notes: [
        { title: "AI Basics Notes", link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
        { title: "Deep Learning Guide", link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
        { title: "AI Interview Prep", link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
        { title: "AI Quick Revision", link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" }
      ],

      resources: [
        { title: "AI Course", link: "https://www.youtube.com/embed/aircAruvnKk", duration: "4h" },
        { title: "Neural Networks", link: "https://www.youtube.com/embed/aircAruvnKk", duration: "3h" },
        { title: "Deep Learning", link: "https://www.youtube.com/embed/tPYj3fFJGjk", duration: "5h" },
        { title: "AI Projects", link: "https://www.youtube.com/embed/7eh4d6sabA0", duration: "2h" }
      ]
    },

    {
      name: "Machine Learning",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
      description: "Build predictive models and intelligent algorithms using data-driven approaches.",
      level: "Intermediate",
      time: "5-8 Months",
      prerequisites: "Python, Statistics",
      why: "Core AI skill",

      roles: "ML Engineer, Data Scientist",
      salary: "₹6L - ₹25L per year",
      tools: "Scikit-learn, TensorFlow, Pandas",
      demand: "Very High 🔥",

      notes: [
        { title: "ML Basics", link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
        { title: "Advanced ML", link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
        { title: "ML Interview Prep", link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
        { title: "ML Revision", link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" }
      ],

      resources: [
        { title: "ML Course", link: "https://www.youtube.com/embed/ukzFI9rgwfU", duration: "10h" },
        { title: "ML Basics", link: "https://www.youtube.com/embed/GwIo3gDZCVQ", duration: "2h" },
        { title: "Projects", link: "https://www.youtube.com/embed/i_LwzRVP7bg", duration: "3h" },
        { title: "ML Math", link: "https://www.youtube.com/embed/JcI5E2Ng6r4", duration: "2h" }
      ]
    },

    {
      name: "Data Science",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      description: "Analyze data, generate insights, and drive decisions using statistics and visualization.",
      level: "Beginner → Intermediate",
      time: "6 Months",
      prerequisites: "Python",
      why: "High salary + demand",

      roles: "Data Analyst, Data Scientist",
      salary: "₹5L - ₹20L per year",
      tools: "Python, Pandas, Power BI",
      demand: "Very High 🚀",

      notes: [
        { title: "Data Science Basics", link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
        { title: "Advanced Analytics", link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
        { title: "DS Interview Prep", link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
        { title: "DS Revision", link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" }
      ],

      resources: [
        { title: "Full Course", link: "https://www.youtube.com/embed/X3paOmcrTjQ", duration: "12h" },
        { title: "Python DS", link: "https://www.youtube.com/embed/r-uOLxNrNk8", duration: "6h" },
        { title: "Visualization", link: "https://www.youtube.com/embed/a9UrKTVEeZA", duration: "3h" },
        { title: "Projects", link: "https://www.youtube.com/embed/ua-CiDNNj30", duration: "2h" }
      ]
    },

    {
      name: "Cyber Security",
      image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87",
      notes: [
        { title: "Cyber Basics", link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
        { title: "Ethical Hacking", link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
        { title: "Security Interview", link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
        { title: "Quick Revision", link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" }
      ],
      description: "Protect systems, networks, and data from cyber threats and attacks.",
      level: "Intermediate",
      time: "6 Months",
      prerequisites: "Networking",
      why: "Critical industry need",
      roles: "Security Analyst, Ethical Hacker",
      salary: "₹6L - ₹22L per year",
      tools: "Kali Linux, Wireshark, Metasploit",
      demand: "Very High 🔥",
      resources: [
        { title: "Cyber Course", link: "https://www.youtube.com/embed/inWWhr5tnEA", duration: "3h" },
        { title: "Ethical Hacking", link: "https://www.youtube.com/embed/3Kq1MIfTWCE", duration: "5h" },
        { title: "Network Security", link: "https://www.youtube.com/embed/U_P23SqJaDc", duration: "4h" },
        { title: "Tools", link: "https://www.youtube.com/embed/lXKDu6cdXLI", duration: "2h" }
      ]
    },

    {
      name: "Cloud Computing",
      image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769",
      description: "Deploy and manage scalable applications using cloud platforms.",
      level: "Intermediate",
      time: "4-6 Months",
      prerequisites: "Networking",
      why: "Used everywhere",
      roles: "Cloud Engineer, DevOps Engineer",
      salary: "₹6L - ₹25L per year",
      tools: "AWS, Azure, Docker",
      demand: "Extremely High 🚀",
      notes: [
        { title: "Cloud Basics", link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
        { title: "AWS Guide", link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
        { title: "Cloud Interview", link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
        { title: "Cloud Revision", link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" }
      ],
      resources: [
        { title: "AWS Course", link: "https://www.youtube.com/embed/ulprqHHWlng", duration: "3h" },
        { title: "Azure", link: "https://www.youtube.com/embed/NKEFWyqJ5XA", duration: "4h" },
        { title: "Docker", link: "https://www.youtube.com/embed/fqMOX6JJhGo", duration: "3h" },
        { title: "Kubernetes", link: "https://www.youtube.com/embed/X48VuDVv0do", duration: "5h" }
      ]
    },

    {
      name: "DevOps",
      image: "https://images.unsplash.com/photo-1605379399642-870262d3d051",
      description: "Automate workflows and CI/CD pipelines.",
      level: "Intermediate",
      time: "4 Months",
      prerequisites: "Linux",
      why: "Automation",
      roles: "DevOps Engineer",
      salary: "₹7L - ₹25L",
      tools: "Docker, Jenkins",
      demand: "High 🔥",
      notes: [
        { title: "DevOps Basics", link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
        { title: "CI/CD Guide", link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
        { title: "DevOps Interview", link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
        { title: "DevOps Revision", link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" }
      ],
      resources: [
        { title: "DevOps Course", link: "https://www.youtube.com/embed/j5Zsa_eOXeY", duration: "5h" },
        { title: "CI/CD", link: "https://www.youtube.com/embed/1er2cjUq1UI", duration: "3h" },
        { title: "Docker", link: "https://www.youtube.com/embed/fqMOX6JJhGo", duration: "3h" },
        { title: "K8s", link: "https://www.youtube.com/embed/X48VuDVv0do", duration: "4h" }
      ]
    },

    {
      name: "Blockchain",
      image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040",
      description: "Build decentralized apps.",
      level: "Advanced",
      time: "5 Months",
      prerequisites: "Programming",
      why: "Future finance",
      roles: "Blockchain Dev",
      salary: "₹8L - ₹30L",
      tools: "Solidity",
      demand: "High 🚀",
      notes: [
        { title: "Blockchain Basics", link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
        { title: "Smart Contracts", link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
        { title: "Blockchain Interview", link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
        { title: "Blockchain Revision", link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" }
      ],
      resources: [
        { title: "Blockchain", link: "https://www.youtube.com/embed/SSo_EIwHSd4", duration: "2h" },
        { title: "Smart Contracts", link: "https://www.youtube.com/embed/M576WGiDBdQ", duration: "3h" },
        { title: "Web3", link: "https://www.youtube.com/embed/gyMwXuJrbJQ", duration: "4h" },
        { title: "Projects", link: "https://www.youtube.com/embed/coQ5dg8wM2o", duration: "2h" }
      ]
    },

    {
      name: "Android Development",
      image: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb",
      description: "Build Android apps.",
      level: "Beginner",
      time: "4 Months",
      prerequisites: "Java/Kotlin",
      why: "Huge demand",
      roles: "Android Dev",
      salary: "₹4L - ₹18L",
      tools: "Kotlin",
      demand: "High 🚀",
      notes: [
        { title: "Android Basics", link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
        { title: "Advanced Android", link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
        { title: "Android Interview", link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
        { title: "Android Revision", link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" }
      ],
      resources: [
        { title: "Android", link: "https://www.youtube.com/embed/fis26HvvDII", duration: "8h" },
        { title: "Kotlin", link: "https://www.youtube.com/embed/F9UC9DY-vIU", duration: "3h" },
        { title: "UI", link: "https://www.youtube.com/embed/xWV71C2kp38", duration: "2h" },
        { title: "Projects", link: "https://www.youtube.com/embed/BBWyXo-3JGQ", duration: "2h" }
      ]
    },

    {
      name: "UI UX Design",
      image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e",
      description: "Design user experiences.",
      level: "Beginner",
      time: "3 Months",
      prerequisites: "Creativity",
      why: "Product success",
      roles: "UI Designer",
      salary: "₹4L - ₹15L",
      tools: "Figma",
      demand: "High 🚀",
      notes: [
        { title: "UI UX Basics", link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
        { title: "Figma Guide", link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
        { title: "UX Interview", link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
        { title: "Design Revision", link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" }
      ],
      resources: [
        { title: "UI UX", link: "https://www.youtube.com/embed/c9Wg6Cb_YlU", duration: "3h" },
        { title: "Figma", link: "https://www.youtube.com/embed/FTFaQWZBqQ8", duration: "2h" },
        { title: "UX Research", link: "https://www.youtube.com/embed/Ovj4hFxko7c", duration: "2h" },
        { title: "Design Systems", link: "https://www.youtube.com/embed/7vVqY6M9d1U", duration: "2h" }
      ]
    },

    {
      name: "Data Structures",
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
      description: "Master algorithms.",
      level: "Intermediate",
      time: "4 Months",
      prerequisites: "Programming",
      why: "Placement key",
      roles: "Software Engineer",
      salary: "₹5L - ₹25L",
      tools: "C++, Java",
      demand: "High 🔥",
      notes: [
        { title: "DSA Basics", link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
        { title: "Advanced Algorithms", link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
        { title: "DSA Interview", link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
        { title: "DSA Revision", link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" }
      ],
      resources: [
        { title: "DSA", link: "https://www.youtube.com/embed/8hly31xKli0", duration: "8h" },
        { title: "Algorithms", link: "https://www.youtube.com/embed/0IAPZzGSbME", duration: "6h" },
        { title: "Practice", link: "https://www.youtube.com/embed/1fV8z7QYy4U", duration: "3h" },
        { title: "Interview", link: "https://www.youtube.com/embed/2ZLl8GAk1X4", duration: "2h" }
      ]
    },

    {
      name: "Internet of Things",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      description: "Build smart devices.",
      level: "Intermediate",
      time: "5 Months",
      prerequisites: "Electronics",
      why: "Future tech",
      roles: "IoT Engineer",
      salary: "₹5L - ₹18L",
      tools: "Arduino",
      demand: "Growing 🚀",
      notes: [
        { title: "IoT Basics", link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
        { title: "Sensors Guide", link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
        { title: "IoT Interview", link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
        { title: "IoT Revision", link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" }
      ],
      resources: [
        { title: "IoT Course", link: "https://www.youtube.com/embed/LlhmzVL5bm8", duration: "2h" },
        { title: "Arduino", link: "https://www.youtube.com/embed/zJ-LqeX_fLU", duration: "3h" },
        { title: "Projects", link: "https://www.youtube.com/embed/5qap5aO4i9A", duration: "2h" },
        { title: "Sensors", link: "https://www.youtube.com/embed/t0gGdH3sRrE", duration: "2h" }
      ]
    }
  ]
};

export default skillsData;