---
title: "Radin Khayyam: website copy, version 4 (for review)"
---

# Radin Khayyam: website copy, v4

Status: draft for Radin's review. Nothing is built yet. Tags: `[Photo: filename]` points to a photo in `photo-package/images/`. `[CONFIRM: …]` marks anything to check before launch. The full list is at the end.

Site map: **Home** · **Research** · **Experience & Projects** · **Sport** · **Blog**. Header links: those five pages, plus a "CV" button that downloads the phone-free PDF.

---

## 1. Home

### Hero

[Photo: 2024-studio-portrait.jpg]

# Radin Khayyam

**I study how neural networks learn and generalize, and use that understanding to build AI systems that adapt to people.**

*I chase the “why” behind things that seem to work.*

Buttons: **Research** · **Download CV** · **Get in touch**

### About

I'm an MSc student in Artificial Intelligence at Koç University. Before that, I completed my BSc in Electrical Engineering at Sharif University of Technology. Today my research centers on learning theory: understanding how neural networks learn and why they generalize. My research interests also include recommender systems, personalized AI, LLM agents, and biomedical signal processing. I also have industry experience as an AI Engineer at Solico Group.

### My story so far (scroll chapters)

**1. Table tennis** · 2008–2019
[Photo: 2018-taipei-gold-podium.jpg]
I picked up a racket at five, in 2008, and it shaped my childhood. I won national age-group titles, then spent more than four years on Iran's cadet and junior national teams. 2017 to 2019 were my best years, competing across Asia and Europe, and in 2018 I reached World No. 6 in ITTF Boys Under-15 rankings.
Link: *The full story is on the Sport page →*

**2. Sharif: exploring electrical engineering** · 2020–2025
[Photo: 2025-sharif-graduation.jpg]
I studied Electrical Engineering at Sharif University of Technology from 2020 to 2025. During those years, I explored three areas: IoT and embedded systems, signal processing, and machine learning.

*Summer 2023 · Hong Kong.* During my degree, I spent a summer as a research intern at The Chinese University of Hong Kong. I worked on an authentication system for IoT devices based on signals from the human body. It was my first research experience abroad.
[Photo, inset: 2023-cuhk-faculty-of-science.jpg]

For my BSc thesis, I compared machine learning methods for estimating hand movements from EEG signals. This work became my first paper, published at ICBME 2024.

[DESIGN NOTE: Show Sharif as one long chapter on the timeline (2020–2025). Mark Hong Kong as a sub-step inside it: a small pin at 2023 on the Sharif line, with an inset card (CUHK photo plus "Summer 2023 · Hong Kong") that slides in as the reader scrolls past and then hands back to the Sharif line for the thesis. The graduation photo stays the main image. This keeps the internship visibly inside the Sharif years, not after them.]

**3. A change of plans** · 2025
[Photo: none. Suggest a simple typographic card with the four university names.]
In 2025 I received fully funded PhD offers from Rice University, USC, the University of Maryland and UC Riverside. Because of the US travel ban, I couldn't take them up. Losing a goal I had worked toward for years was hard, but I kept moving. I joined Solico Group as an AI Engineer and, a year later, started my MSc at Koç University.

**4. Young Olympic Ambassadors, Greece** · June 2025
[Photo: 2025-olympia-presenting.jpg]
I was selected as Iran's sole representative at the 65th International Session for Young Olympic Ambassadors. In Athens and Olympia I worked with delegates from more than 100 countries and presented our group's paper on AI in future Olympic venues.

**5. Solico Group** · Aug 2025 – Sep 2026
[Photo: none. The Solico Group photos show colleagues and stay unpublished until they agree. Suggest a simple diagram of the recommender pipeline instead.]
As an AI Engineer at Solico Group, I led the R&D of a B2B order-suggestion platform: a three-stage recommender, customer targeting and quantity estimation, plus the data pipeline that feeds them. It taught me what it takes to get models working on real, messy data.

**6. Koç and learning theory** · Oct 2026 – now
[Photo: 2026-koc-campus.jpg]
Today I'm an MSc student in Artificial Intelligence at Koç University, where I was awarded the Presidential Fellowship. I'm part of Asst. Prof. Zafer Doğan's MLIP group. We use mathematics to answer a simple question: why do neural networks learn and generalize so well? I spent years making models work. Now I want to understand why they do.

### What I work on

**Theory of learning.** How neural networks learn and generalize, studied with tools from high-dimensional probability and statistical physics.

**Recommender systems and personalized AI.** Systems that learn what each person needs.

**Machine learning for healthcare.** Models that make sense of noisy brain and body signals such as EEG.

Link: *Read about my research →*

### Teasers

**Experience & Projects.** Industry, teaching and projects. *See experience & projects →*

**Sport.** Table tennis for most of my life, and running these days. *See the sport page →*

### Contact

I'm always happy to talk about research, collaborations or interesting problems.

**rkhayyam26@ku.edu.tr**
LinkedIn · X · Instagram · GitHub · Google Scholar

---

## 2. Research

[Photo: 2026-koc-campus.jpg]

### Intro

My research has two sides: understanding why modern machine learning works, and building AI systems that work for people.

### Track 1: Theory of learning (main focus)

I'm a member of the Machine Learning and Information Processing (MLIP) group at Koç University, led by Asst. Prof. Zafer Doğan. Our research builds mathematical foundations for modern machine learning. Using tools from high-dimensional probability and statistical physics, we study how neural networks learn, generalize, and develop emergent behavior, and how data structure and optimization choices shape that behavior. The goal is a principled understanding that leads to more reliable and efficient AI systems.

Within this, I'm most interested in three questions:

- **Generalization.** Why do large models that can memorize their training data still perform well on new data?
- **Classical theory meets deep learning.** Where classical learning theory still explains deep networks, and where it needs new ideas.
- **Structured data.** How learning changes when data looks like the real world, with structure and correlations, not neat independent samples.

This track is new, so I don't have publications in it yet.

### Track 2: Applied AI

Alongside theory, there are two applied areas I love. They are separate interests, and I've spent real time learning each one and working on its problems.

**Recommender systems and personalized AI.** I'm drawn to a simple question: how can a system learn what one person actually needs? At Solico Group I led a B2B order-suggestion platform, and it showed me that much of applied machine learning is about framing. The real work was turning a business question, "what should this shop order this week, and how much?", into retrieval, ranking and quantity-estimation problems that a model can actually solve. Large language models are now changing how systems learn what a person needs. I'm interested in conversational and generative recommender systems, LLM agents that can act on a user's behalf, and the retrieval and search that ground them in real data. I had a first taste of this on a RAG-based shopping assistant at Solico Group, where I helped adapt Gemma 3 4B with LoRA.

**Machine learning for biomedical signals and healthcare.** This is where my path in AI began, during my Sharif years. Brain and body signals are noisy, personal and hard to label, which makes them a demanding test for any model. In my BSc thesis I compared classical and deep models for estimating 3D hand movement from EEG, and published the results at ICBME 2024. At the University of British Columbia, I then worked on cleaning EEG recorded alongside fMRI and brain stimulation. What keeps me here is that progress here shows up directly in people's lives, from better diagnosis to brain-computer interfaces.

#### Research experience

**Hand trajectory estimation from EEG signals** · Sep 2023 – Aug 2024
BSc thesis, Sharif University of Technology · Advisor: Prof. Mohammad B. Shamsollahi
I compared classical methods (mLR, PLSR, KRR, MLP, Kalman filter) with deep models (CNN, LSTM, GRU) for estimating 3D hand position from EEG. In the published paper, a CNN-GRU hybrid performed best, with a correlation (PCC) of 0.87 ± 0.02 on the WAY-EEG-GAL dataset.
[Paper](https://ieeexplore.ieee.org/document/10895673)

**Advanced EEG denoising in multimodal neuroimaging** · Aug 2024 – Jan 2025
Remote research internship, University of British Columbia · Prof. Sepideh Hajipour
I worked on an algorithm to denoise EEG recorded at the same time as fMRI and galvanic vestibular stimulation (GVS).

**Device authentication using induced body electric potentials** · Jul – Sep 2023
In-person research internship, The Chinese University of Hong Kong · Prof. Zhenyu Yan
I worked on a new authentication system for IoT devices, implementing wireless communication protocols on ARM-based microcontrollers, including the CC2650, to transfer and process the measured data.
[Photo: 2023-cuhk-campus.jpg]

### Publications

- **Radin Khayyam**, Mohammad B. Shamsollahi. "Comparison of Methods for Hand Trajectory Estimation in 3D Space Using EEG Signals." *31st National and 9th International Iranian Conference on Biomedical Engineering (ICBME)*, 2024. [Paper](https://ieeexplore.ieee.org/document/10895673) · [Slides](https://drive.google.com/file/d/1vfxfPBEQrINraJK8Xg00AbBsi5e0A8pd/view?usp=share_link)

Full list: [Google Scholar](https://scholar.google.com.tr/citations?user=Nz0anzQAAAAJ)

---

## 3. Experience & Projects

### Intro

Where I've applied what I know, from industry to teaching, plus the projects I've built along the way.

### A. Experience

**AI Engineer, Solico Group** · Aug 2025 – Sep 2026 · Full-time · [solico-group.com](https://www.solico-group.com)
I led the R&D and implementation of a B2B order-suggestion platform for FMCG customers.
- Built a three-stage recommender: a two-tower retriever trained with contrastive learning, a LightGBM learning-to-rank model, and rule-based reranking for stock and promotions.
- Developed customer targeting for new or never-bought products, and used feature overrides for cold-start and what-if recommendations.
- Built a quantity estimator that suggests units when a product goes into a basket, to cut overstocking and expired-product returns.
- Built a medallion-architecture pipeline that turns daily transaction data into model inputs.
- Contributed to a shopping-assistant chatbot using RAG, adapting Gemma 3 4B with LoRA.

**Biomedical Engineering Intern, Atieh Clinic** · Jul – Sep 2024
I implemented psychological tasks (Iowa Gambling, Random Dot Motion) in MATLAB/Psychtoolbox, and recorded and pre-processed EEG with EEGLAB.

**Teaching assistant, Sharif University of Technology**
Introduction to Machine Learning · Digital Signal Processing · Linear Algebra (two semesters, plus Python tutorials) · Biomedical Image and Signal Processing Lab · Bioelectronics. I also mentored teams and held weekly project sessions at an Artificial Intelligence Summer Camp at the Institute for Research in Fundamental Sciences (IPM).

**Scientific and Technological Advisor, Iran Table Tennis Federation** · 2024 – present
Data-driven player performance analysis and technology for coaching.

### B. Projects

Filter: **All** · **Personal** · **Course** · **Sharif** · **Koç**

**Lightweight LLMs for Persian news title generation** · `Personal`
I compared zero-shot, few-shot and refined prompting with LoRA fine-tuning of Gemma 3 4B and Llama 3.1 8B on 1,000+ editor-written Persian news pairs. LoRA lifted Llama's ROUGE-L from 0.42 to 0.54. [GitHub](https://github.com/RadinKhayyam/Persian-News-Title-Generation)

**EEG signal processing** · `Course` `Sharif` · Fall 2023
Source localization (MNE, WMNE, LORETA, sLORETA), blind source separation (PCA, ICA, DSS, GEVD), SSVEP and P300 detection, and CSP+SVM motor-imagery classification. [GitHub](https://github.com/RadinKhayyam/EEG_Signal_Processing_Course)

**Neuroscience of learning, memory and cognition** · `Course` `Sharif` · Spring 2024
Phase-synchrony and coupling analysis (PLV, PLI, PAC) of rat LFP, AlexNet fine-tuned on fMRI responses, and a Deep Q-Network agent that learns to navigate a maze. [GitHub](https://github.com/RadinKhayyam/Neuroscience_of_Learning_Memory_and_Cognition_Course)

**Deep learning** · `Course` `Sharif` · Fall 2024
CNNs for CIFAR-10, MobileNetV2 fine-tuned on Oxford 102 Flowers, an RNN for tweet emotion detection, and multi-sport player tracking. [GitHub](https://github.com/RadinKhayyam/Deep_Learning_Course)

**Song recognition with audio fingerprinting** · `Course` `Sharif` · Spring 2022
My Signals and Systems final project: a Shazam-style song recognizer in MATLAB. I implemented the FFT and STFT, picked spectrogram peaks as anchor points, hashed them into a searchable database, and tested how reliably it identified songs from short clips as Gaussian noise was added. [GitHub](https://github.com/RadinKhayyam/Signals_and_Systems_Course)

*Note for the build: each card carries a type tag and a place tag, so new Koç course projects slot in with no layout change.*

---

## 4. Sport

[Photo: 2018-taipei-action-iran-shirt.jpg]

### Intro

Sport was my first serious commitment, long before research. It taught me to train when nobody's watching, to lose and come back the next day, and to judge myself by results rather than intentions. I still compete. I've just added a few disciplines.

### Table tennis

**The early years (from age 5).** I started at five and won my first national medal in 2011, a silver at the Under-9 championships. National titles followed at U9 (2012), U12 (2014, 2015) and U15 (2017, 2018). In 2015 I played my first world event, the ITTF World Hopes in Shanghai, and finished fifth.
[Photo: 2017-slovenia-cadet-podium.jpg]
[Photo, alternative: 2017-slovakia-cadet-doubles-podium.jpg]

**National team, 2015–2019.** For more than four years I played for Iran's cadet and junior national teams: over 25 international tournaments and 15 international medals. In late 2017 the ITTF invited me to its Rough Diamonds training camp for top under-15 players in Luxembourg.
[Photo: 2018-jordan-action.jpg]

**The peak, 2017–2019.** 2018 was my best year. I won gold in cadet singles in Chinese Taipei, took silver in Jordan, and helped the Asian team win silver at the World Cadet Challenge in Tottori. By October I was **World No. 6 in ITTF Boys Under-15 rankings (2018)**, a record for an Iranian player at the time. After moving up an age group, I was ranked 60th in the world in the Under-18 rankings in February 2019.
[Photo: 2018-tottori-wcc-asian-silver-podium.jpg]

**After the peak.** From 2020 I put my studies first and moved into coaching, but I kept playing in the national senior league and university games. I coached Iran's U11 and U13 teams abroad, became a scientific and technological advisor to the national federation in 2024, and earned the ITTF Level 1 coaching certificate in 2025.
[Photo: 2022-sulaymaniyah-world-tournament.jpg]

#### Selected honors

| Year | Event | Result |
|---|---|---|
| 2015 | ITTF World Hopes Week & Challenge, Shanghai | 5th, U12 singles |
| 2017 | Slovenia Junior & Cadet Open, Otočec | Bronze, cadet singles |
| 2017 | 21st Slovak Cadet Open, ITTF World Junior Circuit | Silver, cadet doubles |
| 2017 | Jordan Junior & Cadet Open, Amman | Silver, cadet doubles; bronze, cadet singles and team |
| 2017 | Croatia Junior & Cadet Open, Varaždin | Bronze, cadet team |
| 2018 | Oman Junior & Cadet Open, Muscat | Bronze, cadet singles and team |
| 2018 | Chinese Taipei Junior & Cadet Open, Taipei (June) | **Gold, cadet singles**; bronze, cadet team |
| 2018 | Jordan Junior & Cadet Open, Amman (July) | Silver, cadet singles; bronze, cadet team |
| 2018 | ITTF World Cadet Challenge, Tottori | **Silver, team (Asia)**; 13th, singles |
| 2018 | ITTF world rankings | World No. 6 in ITTF Boys Under-15 rankings (October), a record for an Iranian player at the time |
| 2019 | ITTF world rankings | World No. 60, Under-18 (February) |
| 2019 | Belgium Junior & Cadet Open, Spa (January) | Bronze, junior team |
| 2019 | French Junior & Cadet Open, Metz | Bronze, junior doubles |
| 2011–2018 | Iran national championships | Titles at U9, U12 and U15 |
| 2021 | National Senior Premier League | Gold, with Farasanj Club |
| 2024 | Regional University Games | Silver, doubles; bronze, singles |
| 2025 | ITTF | Level 1 coaching certificate |

### Running

I took up running in 2025, at a moment when I needed a new goal, and these days most of my training is running. I like that it's simple and honest: the watch doesn't care how you feel.

- **Olympic Day Run, Olympia, Greece**, 14 June 2025: chip time 20:18, during the Young Olympic Ambassadors session. [Photo: 2025-olympia-day-run.jpg]
- **2nd TehRun 10K, Tehran**, October 2025: 47:24 in my first 10 km race, after three months of early-morning training with my club. [Instagram post](https://www.instagram.com/p/DPoF0_7jl9z/) [Photo: 2025-tehrun-10k.jpg, Instagram DPoF0_7jl9z image 2]
- **6th Kish Island International Marathon**, 5 Dec 2025: 15 km in 74 minutes. [Photo: 2025-kish-marathon.jpg]
- **Training with my running club in Tehran**: early-morning sessions with my coach and team. [Photo: 2025-tehrun-10k.jpg can double here; no separate club photo for now]

---

## 5. Blog

**Intro:** Notes on research, learning and the occasional detour.

**Empty state:** Nothing here yet. The first post is on its way.

---

## 6. Site-wide

**SEO title:** Radin Khayyam | Machine learning theory and applied AI

**Meta description:** Radin Khayyam is an MSc student in AI at Koç University, studying how neural networks learn and generalize and building personalized and medical AI. Sharif EE graduate.

**Footer:** © 2026 Radin Khayyam · rkhayyam26@ku.edu.tr · LinkedIn · X · Instagram · GitHub · Google Scholar

**Links:**
- LinkedIn: https://www.linkedin.com/in/radin-khayyam/
- X: https://x.com/radinkh03
- Instagram: https://www.instagram.com/radin.khayyam/
- GitHub: https://github.com/RadinKhayyam
- Google Scholar: https://scholar.google.com.tr/citations?user=Nz0anzQAAAAJ
- CV: phone-free PDF, linked from the header and the hero

---

## To confirm before launch

1. **Running club photos:** none for now; the TehRun 10K photo is used.
2. **Still left out:** the Oman 2018 doubles win over China (photo caption only) and the "Qom 2021 team bronze" photo caption (clashes with the 2021 Farasanj gold). Say if you want either added.
3. **Tehran 10 km date:** your Instagram post (published 10 October 2025) says you ran it "today", so the copy says October 2025. Tell me the race name if you'd like it shown.
