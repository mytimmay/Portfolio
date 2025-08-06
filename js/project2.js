import {
  setLanguage,
  currentLang,
  initLangToggle,
  getTranslation,
  getInitialLanguage,
} from "./i18n.js";
import { initNav } from "./nav.js";
import { initFadeAnimations } from "./animations.js";
import { loadHeader } from "./header.js";
import { loadFooter } from "./footer.js";
import {
  createTwoColumnSection,
  createDesignProcessSection,
  createDetailsSection,
  createProcessStep,
  createProjectHeroSection,
  createMoreProjectsSection,
} from "./layout.js";
import { convertYouTubeUrl } from "./youtubeUtils.js";

document.addEventListener("DOMContentLoaded", async () => {
  await loadHeader();
  await setLanguage(getInitialLanguage());

  initLangToggle();
  initNav();
  renderSections();
  initFadeAnimations();
  await loadFooter();
});

function renderSections() {
  const container = document.querySelector(".smooth-wrapper");
  if (!container) return;

  container.querySelectorAll(".dynamic-section").forEach((el) => el.remove());

  const hero = createProjectHeroSection({
    className: "project2",
    titleKey: "project2_title",
    textKey: "project2_text",
    imageSrc: "assets/images/project-cards/VispaGame-Image.webp",
    imageAlt: "VISPA Fun",
  });

  hero.classList.add("dynamic-section");
  container.prepend(hero);

  const groupStack = [];

  const appendToCurrentGroup = (el) => {
    if (groupStack.length > 0) {
      groupStack[groupStack.length - 1].appendChild(el);
    } else {
      container.appendChild(el);
    }
  };

  const details = [
    {
      title: "project_detail1",
      items: [
        "project_role1",
        "project_role2",
        "project_role3",
        "project_role4",
        "project_role5",
      ],
    },
    {
      title: "project_detail2",
      items: [
        "software_1",
        "software_6",
        "software_7",
        "software_10",
        "software_11",
      ],
    },
    {
      title: "project_detail3",
      items: [
        "project_team1",
        "project_team2",
        "project_team3",
        "project_team4",
      ],
    },
    { title: "project_detail4", items: ["project2_year"] },
  ];

  const designPhases = [
    {
      title: "designprocess_title1",
      methods: [
        "designprocess_analyse_method3",
        "designprocess_analyse_method4",
        "designprocess_analyse_method2",
        "designprocess_analyse_method5",
      ],
      image: "assets/icons/Search.svg",
    },
    {
      title: "designprocess_title2",
      methods: [
        "designprocess_concept_method3",
        "designprocess_concept_method4",
        "designprocess_concept_method5",
      ],
      image: "assets/icons/Choose.svg",
    },
    {
      title: "designprocess_title3",
      methods: [
        "designprocess_design_method3",
        "designprocess_design_method2",
        "designprocess_design_method4",
        "designprocess_design_method5",
        "designprocess_design_method6",
      ],
      image: "assets/icons/Colorpalett.svg",
    },
    {
      title: "designprocess_title4",
      methods: ["designprocess_testing_method1"],
      image: "assets/icons/Group.svg",
    },
  ];

  const urls = [
    { title: "project1_title", href: "project1.html" },
    { title: "project3_title", href: "project3.html" },
  ];

  const sections = [
    { type: "group-start" },
    { type: "details", data: details },
    {
      type: "twoColumn",
      left: "tasks",
      text: "tasks_project2",
    },
    {
      type: "youtube-video",
      src: "https://www.youtube.com/watch?v=BdJbY9q_JD4&t=2s",
    },
    {
      type: "twoColumn",
      left: "problemstatement",
      text: "problemstatement_project2",
    },
    {
      type: "twoColumn",
      left: "goals",
      text: "goals_project2",
    },
    {
      type: "twoColumn",
      left: "usergroup",
      text: "usergroup_project2",
    },
    { type: "designPhases", data: designPhases },
    { type: "group-end" },
    { type: "step", h1: "designprocess_title1" },
    { type: "group-start" },
    {
      type: "twoColumn",
      left: "deskresearch",
      text: "deskresearch_project2",
    },
    {
      type: "twoColumn",
      left: "userresearch",
      text: "userresearch_project2",
    },
    {
      type: "twoColumn",
      left: "competitiveanalysis",
      text: "competitiveanalysis_project2",
    },
    { type: "group-start", className: "subcontent-wrapper" },
    {
      type: "twoColumn",
      left: "userpersonas",
      text: "userpersonas_project2",
    },
    { type: "group-start", className: "image-wrapper-2column" },
    { type: "group-start", className: "image-box" },
    {
      type: "image",
      src: "assets/images/project-vispa-game/Persona4.webp",
    },
    { type: "group-end" },
    { type: "group-start", className: "image-2column" },
    {
      type: "image",
      src: "assets/images/project-vispa-game/Persona1.webp",
    },
    {
      type: "image",
      src: "assets/images/project-vispa-game/Persona2.webp",
    },
    {
      type: "image",
      src: "assets/images/project-vispa-game/Persona3.webp",
    },
    {
      type: "image",
      src: "assets/images/project-vispa-game/Persona5.webp",
    },
    { type: "group-end" },
    { type: "group-end" },
    { type: "group-end" },
    { type: "group-end" },
    { type: "step", h1: "designprocess_title2" },
    { type: "group-start" },
    { type: "group-start", className: "subcontent-wrapper" },
    {
      type: "twoColumn",
      left: "moodboards",
      text: "moodboards_project2",
    },
    { type: "group-start", className: "image-wrapper-3column" },
    {
      type: "image",
      src: "assets/images/project-vispa-game/Moodboard_Desert.webp",
    },
    {
      type: "image",
      src: "assets/images/project-vispa-game/Moodboard_Tundra.webp",
    },
    {
      type: "image",
      src: "assets/images/project-vispa-game/Moodboard_Aquatic.webp",
    },
    { type: "group-end" },
    { type: "group-end" },
    { type: "group-start", className: "subcontent-wrapper" },
    {
      type: "twoColumn",
      left: "storyboards",
      text: "storyboards_project2",
    },
    {
      type: "image",
      src: "assets/images/project-vispa-game/Storyboard_VispaGame.webp",
    },
    { type: "group-end" },
    { type: "group-start", className: "subcontent-wrapper" },
    {
      type: "twoColumn",
      left: "userflows",
      text: "userflows_project2",
    },
    {
      type: "image",
      src: "assets/images/project-vispa-game/UserFlows_VispaGame.webp",
    },
    { type: "group-end" },
    { type: "group-end" },
    { type: "step", h1: "designprocess_title3" },
    { type: "group-start" },
    { type: "group-start", className: "subcontent-wrapper" },
    {
      type: "twoColumn",
      left: "mechanics",
      text: [
        "mechanics_project2_1",
        "mechanics_project2_2",
        "mechanics_project2_3",
        "mechanics_project2_4",
        "mechanics_project2_5",
        "mechanics_project2_6",
      ],
    },
    { type: "group-start", className: "image-wrapper-2column" },
    {
      type: "image",
      src: "assets/images/project-vispa-game/NEW VISPA FLOW_Mainmenu.webp",
    },
    {
      type: "image",
      src: "assets/images/project-vispa-game/NEW VISPA FLOW_Wardrobe.webp",
    },
    {
      type: "image",
      src: "assets/images/project-vispa-game/Chapter_1_VispaGame.webp",
    },
    {
      type: "image",
      src: "assets/images/project-vispa-game/Chapter_2_VispaGame.webp",
    },
    {
      type: "image",
      src: "assets/images/project-vispa-game/Chapter_4_VispaGame.webp",
    },
    {
      type: "image",
      src: "assets/images/project-vispa-game/Chapter_4Group_VispaGame.webp",
    },
    { type: "group-end" },
    { type: "group-end" },
    { type: "group-start", className: "subcontent-wrapper" },
    {
      type: "twoColumn",
      left: "world",
      text: "world_project2",
    },
    { type: "group-start", className: "image-wrapper-2column" },
    {
      type: "image",
      src: "assets/images/project-vispa-game/story/Intro Chapter 1.webp",
    },
    {
      type: "image",
      src: "assets/images/project-vispa-game/story/Intro Chapter 1_1.webp",
    },
    {
      type: "image",
      src: "assets/images/project-vispa-game/story/Intro Chapter 1_2.webp",
    },
    {
      type: "image",
      src: "assets/images/project-vispa-game/story/Outro Chapter1.webp",
    },
    {
      type: "image",
      src: "assets/images/project-vispa-game/story/Intro Chapter 2.webp",
    },
    {
      type: "image",
      src: "assets/images/project-vispa-game/story/Intro Chapter 3.webp",
    },
    {
      type: "image",
      src: "assets/images/project-vispa-game/story/Intro Chapter 4.webp",
    },
    {
      type: "image",
      src: "assets/images/project-vispa-game/story/Intro Chapter 4_1.webp",
    },
    { type: "group-end" },
    { type: "group-end" },
    { type: "group-start", className: "subcontent-wrapper" },
    {
      type: "twoColumn",
      left: "level",
      text: "level_project2",
    },
    { type: "group-start", className: "image-wrapper" },
    {
      type: "image",
      src: "assets/images/project-vispa-game/Chapter_1_Map.webp",
    },
    { type: "group-end" },
    { type: "group-end" },
    { type: "group-start", className: "subcontent-wrapper" },
    {
      type: "twoColumn",
      left: "teamanalyse",
      text: "teamanalyse_project2",
    },
    { type: "group-start", className: "image-wrapper-2column" },
    { type: "group-start", className: "image-1column" },
    {
      type: "image",
      src: "assets/images/project-vispa-game/TeamScoring.webp",
    },
    {
      type: "image",
      src: "assets/images/project-vispa-game/TeamSummary_DetailedScoring.webp",
    },
    { type: "group-end" },
    {
      type: "image",
      src: "assets/images/project-vispa-game/TeamAnalysis.webp",
    },
    { type: "group-end" },
    { type: "group-end" },
    { type: "group-end" },
    { type: "step", h1: "designprocess_title4" },
    { type: "group-start" },
    {
      type: "twoColumn",
      left: "feedback",
      text: "feedback_project2",
    },
    { type: "group-end" },
    { type: "step", h1: "designprocess_title5" },
    { type: "group-start" },
    {
      type: "twoColumn",
      left: "moremechanics",
      text: "moremechanics_project2",
    },
    {
      type: "twoColumn",
      left: "development",
      text: "development_project2",
    },
    {
      type: "twoColumn",
      left: "startup",
      text: "startup_project2",
    },
    { type: "group-end" },
    { type: "moreProjects", data: urls },
  ];

  sections.forEach((sec) => {
    if (sec.type === "group-start") {
      const newGroup = document.createElement("div");
      const cls = sec.className || "content-wrapper";
      newGroup.classList.add(cls);
      groupStack.push(newGroup);
      return;
    }

    if (sec.type === "group-end") {
      const finishedGroup = groupStack.pop();
      appendToCurrentGroup(finishedGroup);
      return;
    }

    let el = null;
    if (sec.type === "twoColumn") {
      let contentNodes = [];

      const processKey = (key) => {
        const p = document.createElement("p");
        p.setAttribute("data-i18n", key);
        const content = getTranslation(key, currentLang);
        if (content.includes("<br>") || content.includes("\n")) {
          p.setAttribute("data-i18n-html", "");
          p.innerHTML = content;
        } else {
          p.textContent = content;
        }
        return p;
      };

      if (Array.isArray(sec.text)) {
        contentNodes = sec.text.map((key) => processKey(key));
      } else {
        contentNodes = [processKey(sec.text)];
      }

        el = createTwoColumnSection(sec.left, contentNodes);
    } else if (sec.type === "youtube-video") {
      const iframe = document.createElement("iframe");
      iframe.src = convertYouTubeUrl(sec.src);
      iframe.title = "YouTube video player";
      iframe.frameBorder = "0";
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;

      el = document.createElement("div");
      el.classList.add("youtube-wrapper");
      el.appendChild(iframe);
    } else if (sec.type === "designPhases") {
      el = createDesignProcessSection(sec.data);
    } else if (sec.type === "step") {
      el = createProcessStep({ title: sec.h1 });
    } else if (sec.type === "details") {
      el = createDetailsSection(sec.data);
    } else if (sec.type === "image") {
      const img = document.createElement("img");
      img.src = sec.src;
      img.loading = "lazy";
      el = document.createElement("div");
      el.appendChild(img);
    } else if (sec.type === "moreProjects") {
      el = createMoreProjectsSection(sec.data);
    }

    if (el) {
      el.classList.add("dynamic-section");
      appendToCurrentGroup(el);
    }
  });
}
