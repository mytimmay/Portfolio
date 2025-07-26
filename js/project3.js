import {
  setLanguage,
  currentLang,
  initLangToggle,
  getTranslation,
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
  await setLanguage(localStorage.getItem("lang") || "de");

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
    className: "project3",
    titleKey: "project3_title",
    textKey: "project3_text",
    imageSrc: "assets/images/project-cards/VispaWorkshop-Image.webp",
    imageAlt: "VISPA Workshops",
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
        "software_2",
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
    { title: "project_detail4", items: ["project3_year"] },
  ];

  const designPhases = [
    {
      title: "designprocess_title1",
      methods: [
        "designprocess_analyse_method3",
        "designprocess_analyse_method2",
      ],
      image: "assets/icons/Search.svg",
    },
    {
      title: "designprocess_title2",
      methods: [
        "designprocess_concept_method3",
        "designprocess_concept_method1",
        "designprocess_concept_method2",
      ],
      image: "assets/icons/Choose.svg",
    },
    {
      title: "designprocess_title3",
      methods: [
        "designprocess_design_method7",
        "designprocess_design_method2",
        "designprocess_design_method8",
        "designprocess_design_method9",
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
  { title: "project1_title", href: "project1" },
  { title: "project2_title", href: "project2" },
  ];

  const sections = [
    { type: "group-start" },
    { type: "details", data: details },
    {
      type: "twoColumn",
      left: "tasks",
      text: "tasks_project3",
    },
    {
      type: "youtube-video",
      src: "https://www.youtube.com/watch?v=BdJbY9q_JD4&t=2s",
    },
    {
      type: "twoColumn",
      left: "problemstatement",
      text: "problemstatement_project3",
    },
    {
      type: "twoColumn",
      left: "goals",
      text: "goals_project3",
    },
    {
      type: "twoColumn",
      left: "usergroup",
      text: "usergroup_project3",
    },
    { type: "designPhases", data: designPhases },
    { type: "group-end" },
    { type: "step", h1: "designprocess_title1" },
    { type: "group-start" },
    {
      type: "twoColumn",
      left: "preface",
      text: "preface_project3",
    },
    {
      type: "twoColumn",
      left: "deskresearch",
      text: "deskresearch_project3",
    },
    {
      type: "twoColumn",
      left: "competitiveanalysis",
      text: "competitiveanalysis_project3",
    },
    { type: "group-end" },
    { type: "step", h1: "designprocess_title2" },
    { type: "group-start" },
    { type: "group-start", className: "subcontent-wrapper" },
    {
      type: "twoColumn",
      left: "moodboards",
      text: "moodboards_project3",
    },
    { type: "group-start", className: "image-wrapper-3column" },
    {
      type: "image",
      src: "assets/images/project-vispa-workshop/Moodboard Scenes.webp",
    },
    {
      type: "image",
      src: "assets/images/project-vispa-workshop/Moodboard Objects.webp",
    },
    {
      type: "image",
      src: "assets/images/project-vispa-workshop/Moodboard  Colors.webp",
    },
    { type: "group-end" },
    { type: "group-end" },
    { type: "group-start", className: "subcontent-wrapper" },
    {
      type: "twoColumn",
      left: "flowgraph",
      text: "flowgraph_project3",
    },
    { type: "group-start", className: "image-wrapper-2column" },
    {
      type: "image",
      src: "assets/images/project-vispa-workshop/FlowGraph_Permission.webp",
    },
    {
      type: "image",
      src: "assets/images/project-vispa-workshop/FlowGraph_Linking.webp",
    },
    { type: "group-end" },
    { type: "group-end" },
    { type: "group-start", className: "subcontent-wrapper" },
    {
      type: "twoColumn",
      left: "prototypes",
      text: "prototypes_project3",
    },
    {
      type: "image",
      src: "assets/images/project-vispa-workshop/Prototype Website.webp",
    },
    { type: "group-end" },
    { type: "group-end" },
    { type: "step", h1: "designprocess_title3" },
    { type: "group-start" },
    { type: "group-start", className: "subcontent-wrapper" },
    {
      type: "twoColumn",
      left: "website",
      text: "website_project3",
    },
    { type: "group-start", className: "image-wrapper" },
    { type: "group-start", className: "image-wrapper-3column" },
    {
      type: "image",
      src: "assets/images/project-vispa-workshop/Vispa - Home.webp",
    },
    {
      type: "image",
      src: "assets/images/project-vispa-workshop/Vispa Pricing.webp",
    },
    {
      type: "image",
      src: "assets/images/project-vispa-workshop/Vispa FAQ.webp",
    },
    { type: "group-end" },
    { type: "group-start", className: "image-wrapper-2column" },
    {
      type: "image",
      src: "assets/images/project-vispa-workshop/Vispa-Login.webp",
    },
    {
      type: "image",
      src: "assets/images/project-vispa-workshop/Vispa ControlPanel - Download.webp",
    },
    {
      type: "image",
      src: "assets/images/project-vispa-workshop/Vispa ControlPanel - Subscription.webp",
    },
    {
      type: "image",
      src: "assets/images/project-vispa-workshop/Vispa ControlPanel - Account.webp",
    },
    { type: "group-end" },
    { type: "group-end" },
    { type: "group-end" },
    { type: "group-start", className: "subcontent-wrapper" },
    {
      type: "twoColumn",
      left: "userinterface",
      text: [
        "userinterface_project3_1",
        "userinterface_project3_2",
        "userinterface_project3_3",
        "userinterface_project3_4",
        "userinterface_project3_5",
        "userinterface_project3_6",
      ],
    },
    { type: "group-start", className: "image-wrapper" },
    { type: "group-start", className: "image-wrapper-2column" },
    {
      type: "image",
      src: "assets/images/project-vispa-workshop/Spacebrowser.webp",
    },
    {
      type: "image",
      src: "assets/images/project-vispa-workshop/Spacebrowser Options.webp",
    },
    { type: "group-end" },
    { type: "group-start", className: "image-wrapper-3column" },
    {
      type: "image",
      src: "assets/images/project-vispa-workshop/PERSONA_MODULE_CONSULTINGPROJECT 1.webp",
    },
    {
      type: "image",
      src: "assets/images/project-vispa-workshop/PERSONA_MODULE_WORKSHOPFACILLITATORS.webp",
    },
    {
      type: "image",
      src: "assets/images/project-vispa-workshop/PERSONA_MODULE_AGILECOACH.webp",
    },
    { type: "group-end" },
    { type: "group-end" },
    { type: "group-end" },
    { type: "group-start", className: "subcontent-wrapper" },
    {
      type: "twoColumn",
      left: "environment",
      text: "environment_project3",
    },
    { type: "group-start", className: "image-wrapper-2column" },
    {
      type: "image",
      src: "assets/images/project-vispa-workshop/Umgebung_1.webp",
    },
    {
      type: "image",
      src: "assets/images/project-vispa-workshop/Umgebung_2.webp",
    },
    { type: "group-end" },
    { type: "group-end" },
    { type: "group-start", className: "subcontent-wrapper" },
    {
      type: "twoColumn",
      left: "templates",
      text: "templates_project3",
    },
    { type: "group-start", className: "image-wrapper" },
    {
      type: "image",
      src: "assets/images/project-vispa-workshop/Templates.webp",
    },
    { type: "group-end" },
    { type: "group-end" },
    { type: "group-end" },
    { type: "step", h1: "designprocess_title4" },
    { type: "group-start" },
    { type: "group-start", className: "subcontent-wrapper" },
    {
      type: "twoColumn",
      left: "feedback",
      text: "feedback_project3",
    },
    { type: "group-start", className: "image-wrapper" },
    {
      type: "image",
      src: "assets/images/project-vispa-workshop/Complete Gizmos – 78 1.webp",
    },
    {
      type: "image",
      src: "assets/images/project-vispa-workshop/Complete Gizmos – 9 2.webp",
    },
    { type: "group-end" },
    { type: "group-end" },
    { type: "group-end" },
    { type: "step", h1: "designprocess_title5" },
    { type: "group-start" },
    {
      type: "twoColumn",
      left: "moremechanics",
      text: "moremechanics_project3",
    },
    {
      type: "twoColumn",
      left: "development",
      text: "development_project3",
    },
    {
      type: "twoColumn",
      left: "startup",
      text: "startup_project3",
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
