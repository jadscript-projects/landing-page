import { useTranslation } from "react-i18next";
import { getWorkingYears } from "../../../utils/date";

const SKILLS_BY_CATEGORY: Record<string, string[]> = {
  langJavaScriptTypescript: [
    "Javascript",
    "Typescript",
    "Node.js",
    "React.js",
    "React Native / Expo",
    "Next.js",
    "Vue.js",
    "Angular",
    "NestJS",
    "Fastify",
    "Express",
    "JQuery",
  ],
  langJava: ["Java", "Spring Boot", "Spring Framework", "Spring Security", "Spring Data", "Spring Batch", "Spring Cloud", "Quarkus"],
  langPython: ["Python", "FastAPI"],
  langClojure: ["Clojure", "ClojureScript", "Compojure", "Pedestal"],
  langCsharp: ["C#", ".NET", "ASP.NET", "ASP.NET Core", "Entity Framework", "Dapper", "LINQ", "EF Core"],
  langKotlin: ["Kotlin", "KMP"],
  frontendStyling: [
    "HTML5",
    "CSS3",
    "SASS",
    "Styled Components",
    "Tailwind",
  ],
  buildAndTooling: ["Vite", "Babel", "Webpack", "NPM"],
  dataAndMessaging: ["Rechart", "D3.js", "RabbitMQ", "Apache Kafka"],
  databases: [
    "Postgres",
    "PGVector",
    "MySQL",
    "Mongo / Atlas",
    "Redis",
    "DynamoDB",
    "Datomic",
    "DocumentDB",
    "Cassandra",
    "DynamoDB",
  ],
  architectureAndDesign: [
    "Design Patterns",
    "DDD",
    "Clean Arch",
    "Hexagonal",
    "Atomic Design",
    "Module Federation",
    "SPA",
    "SSR",
    "CSR",
    "SSG",
  ],
  apisAndIntegrations: [
    "Swagger",
    "OpenAPI",
    "GraphQL",
    "REST",
    "tRPC",
    "gRPC",
    "Docusaurus",
  ],
  stateManagement: ["Context API", "Redux", "Zustand"],
  testingAndQuality: ["Jest", "Cypress", "TDD", "Playwright"],
  uxUiAccessibility: ["Figma", "a11y", "SEO", "Storybook"],
  cloudDevops: [
    "AWS",
    "Azure",
    "Google Cloud Platform",
    "Github Actions",
    "Docker",
    "Kubernetes",
  ],
  iaTools: [
    "OpenAI",
    "Gemini",
    "Cursor",
    "Github Copilot",
    "Whisper",
    "Groq",
    "Claude",
    "Anthropic",
    "MCP",
    "Skills",
    "Agentic",
    "n8n",
    "Rag",
  ],
  cmsAndMarketing: ["Wordpress", "Strapi", "Google Analytics", "Hotjar", "Hubspot", "Contentful", "Sanity", "DatoCMS", "Prismic", "Storyblok"],
  collaborationTools: ["Jira", "Pipefy", "Linear", "Confluence", "Notion", "Slack"],
};

const CATEGORY_ORDER = [
  "langJavaScriptTypescript",
  "langJava",
  "langPython",
  "langClojure",
  "langCsharp",
  "langKotlin",
  "frontendStyling",
  "buildAndTooling",
  "dataAndMessaging",
  "databases",
  "architectureAndDesign",
  "apisAndIntegrations",
  "stateManagement",
  "testingAndQuality",
  "uxUiAccessibility",
  "cloudDevops",
  "iaTools",
  "cmsAndMarketing",
  "collaborationTools",
];

const SkillsSection = () => {
  const { t } = useTranslation();

  return (
    <section
      id="skills"
      className="bg-black text-white flex flex-col gap-12 py-16 px-4 md:px-6 mt-10 z-10 relative left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw]"
    >
      <h2 className="lg:text-5xl text-4xl font-bold text-center max-w-2xl mx-auto lg:leading-14 leading-10">
        {t("skills.title", { years: getWorkingYears() })}
      </h2>

      <div className="flex flex-col gap-10 max-w-5xl mx-auto w-full">
        {CATEGORY_ORDER.map((categoryKey) => (
          <div key={categoryKey} className="flex flex-col gap-3">
            <span className="inline-flex w-fit px-3 py-1.5 rounded-lg text-sm font-semibold text-black bg-linear-to-r from-cyan-300 to-lime-300">
              {t(`skills.categories.${categoryKey}`)}
            </span>
            <div className="flex flex-wrap gap-2">
              {SKILLS_BY_CATEGORY[categoryKey].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-md bg-white/10 text-white/90 text-xs border border-white/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
