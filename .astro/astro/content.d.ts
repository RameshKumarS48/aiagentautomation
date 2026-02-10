declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"agents": {
"3rd-softsec-reviewer.md": {
	id: "3rd-softsec-reviewer.md";
  slug: "3rd-softsec-reviewer";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"abhishek-saikia-cofounder-at-kusho.md": {
	id: "abhishek-saikia-cofounder-at-kusho.md";
  slug: "abhishek-saikia-cofounder-at-kusho";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"adversarialgpt.md": {
	id: "adversarialgpt.md";
  slug: "adversarialgpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"agent-protocol.md": {
	id: "agent-protocol.md";
  slug: "agent-protocol";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"agents-js.md": {
	id: "agents-js.md";
  slug: "agents-js";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"agixt.md": {
	id: "agixt.md";
  slug: "agixt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ai-cybersecurity-guardian.md": {
	id: "ai-cybersecurity-guardian.md";
  slug: "ai-cybersecurity-guardian";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ai-cyberwar.md": {
	id: "ai-cyberwar.md";
  slug: "ai-cyberwar";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ai-executive-order-and-policy-analyst.md": {
	id: "ai-executive-order-and-policy-analyst.md";
  slug: "ai-executive-order-and-policy-analyst";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ai-features.md": {
	id: "ai-features.md";
  slug: "ai-features";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ai-jsx.md": {
	id: "ai-jsx.md";
  slug: "ai-jsx";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ai-legion.md": {
	id: "ai-legion.md";
  slug: "ai-legion";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ailaflow-ai-agents-no-code-platform.md": {
	id: "ailaflow-ai-agents-no-code-platform.md";
  slug: "ailaflow-ai-agents-no-code-platform";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"alphahoundai.md": {
	id: "alphahoundai.md";
  slug: "alphahoundai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"amelia-cybersecurity-analyst.md": {
	id: "amelia-cybersecurity-analyst.md";
  slug: "amelia-cybersecurity-analyst";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"announcement.md": {
	id: "announcement.md";
  slug: "announcement";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"api-guardian.md": {
	id: "api-guardian.md";
  slug: "api-guardian";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"appsec-test-crafter.md": {
	id: "appsec-test-crafter.md";
  slug: "appsec-test-crafter";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"article.md": {
	id: "article.md";
  slug: "article";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"arxiv-preprint.md": {
	id: "arxiv-preprint.md";
  slug: "arxiv-preprint";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ask-ida-c.md": {
	id: "ask-ida-c.md";
  slug: "ask-ida-c";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ask-ida-idapython.md": {
	id: "ask-ida-idapython.md";
  slug: "ask-ida-idapython";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ask-ida-plugins.md": {
	id: "ask-ida-plugins.md";
  slug: "ask-ida-plugins";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"att-ck-mate.md": {
	id: "att-ck-mate.md";
  slug: "att-ck-mate";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"autogpt.md": {
	id: "autogpt.md";
  slug: "autogpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"basic-security-helper.md": {
	id: "basic-security-helper.md";
  slug: "basic-security-helper";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"betterscan-io-ai-code-analyzer.md": {
	id: "betterscan-io-ai-code-analyzer.md";
  slug: "betterscan-io-ai-code-analyzer";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"blackbox-ai-code-interpreter-in-terminal.md": {
	id: "blackbox-ai-code-interpreter-in-terminal.md";
  slug: "blackbox-ai-code-interpreter-in-terminal";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"blackbox-ai-code-interpreter.md": {
	id: "blackbox-ai-code-interpreter.md";
  slug: "blackbox-ai-code-interpreter";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"blackbox-ai-supercharging-your-coding-workflow.md": {
	id: "blackbox-ai-supercharging-your-coding-workflow.md";
  slug: "blackbox-ai-supercharging-your-coding-workflow";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"blackbox-ai-vs-codium-ai.md": {
	id: "blackbox-ai-vs-codium-ai.md";
  slug: "blackbox-ai-vs-codium-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"blog-post-how-to-use-crew-ai.md": {
	id: "blog-post-how-to-use-crew-ai.md";
  slug: "blog-post-how-to-use-crew-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"blog.md": {
	id: "blog.md";
  slug: "blog";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"bloop-apps.md": {
	id: "bloop-apps.md";
  slug: "bloop-apps";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"blue-team-guides.md": {
	id: "blue-team-guides.md";
  slug: "blue-team-guides";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"bondai-homepage-documentation.md": {
	id: "bondai-homepage-documentation.md";
  slug: "bondai-homepage-documentation";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"botnetgpt.md": {
	id: "botnetgpt.md";
  slug: "botnetgpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"bug-bounty-assistant.md": {
	id: "bug-bounty-assistant.md";
  slug: "bug-bounty-assistant";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"bug-insider.md": {
	id: "bug-insider.md";
  slug: "bug-insider";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cateye.md": {
	id: "cateye.md";
  slug: "cateye";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ceo.md": {
	id: "ceo.md";
  slug: "ceo";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"chadgpt.md": {
	id: "chadgpt.md";
  slug: "chadgpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"chrome-extension.md": {
	id: "chrome-extension.md";
  slug: "chrome-extension";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ciso-ai.md": {
	id: "ciso-ai.md";
  slug: "ciso-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cleverbee.md": {
	id: "cleverbee.md";
  slug: "cleverbee";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cloud-guardian.md": {
	id: "cloud-guardian.md";
  slug: "cloud-guardian";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cloud-native-threat-modeling.md": {
	id: "cloud-native-threat-modeling.md";
  slug: "cloud-native-threat-modeling";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cmmc-gpt.md": {
	id: "cmmc-gpt.md";
  slug: "cmmc-gpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"co-founder-s-linkedin-1.md": {
	id: "co-founder-s-linkedin-1.md";
  slug: "co-founder-s-linkedin-1";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"co-founder-s-linkedin-2.md": {
	id: "co-founder-s-linkedin-2.md";
  slug: "co-founder-s-linkedin-2";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"co-founder-s-x-twitter-1.md": {
	id: "co-founder-s-x-twitter-1.md";
  slug: "co-founder-s-x-twitter-1";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"code-securely.md": {
	id: "code-securely.md";
  slug: "code-securely";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"codefuse-chatbot.md": {
	id: "codefuse-chatbot.md";
  slug: "codefuse-chatbot";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"colab-demo.md": {
	id: "colab-demo.md";
  slug: "colab-demo";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"community.md": {
	id: "community.md";
  slug: "community";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"coreagent.md": {
	id: "coreagent.md";
  slug: "coreagent";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"corentingpt.md": {
	id: "corentingpt.md";
  slug: "corentingpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"creator-s-twitter.md": {
	id: "creator-s-twitter.md";
  slug: "creator-s-twitter";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"creator-website.md": {
	id: "creator-website.md";
  slug: "creator-website";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"creators-s-twitter.md": {
	id: "creators-s-twitter.md";
  slug: "creators-s-twitter";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"crew-ai-wiki-with-examples-and-guides.md": {
	id: "crew-ai-wiki-with-examples-and-guides.md";
  slug: "crew-ai-wiki-with-examples-and-guides";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"crewai.md": {
	id: "crewai.md";
  slug: "crewai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cves.md": {
	id: "cves.md";
  slug: "cves";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cyber-ai-assistant.md": {
	id: "cyber-ai-assistant.md";
  slug: "cyber-ai-assistant";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cyber-charli.md": {
	id: "cyber-charli.md";
  slug: "cyber-charli";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cyber-mentor.md": {
	id: "cyber-mentor.md";
  slug: "cyber-mentor";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cyber-pulse.md": {
	id: "cyber-pulse.md";
  slug: "cyber-pulse";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cyber-scraper-seraphina-web-crawler.md": {
	id: "cyber-scraper-seraphina-web-crawler.md";
  slug: "cyber-scraper-seraphina-web-crawler";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cyber-security-career-mentor.md": {
	id: "cyber-security-career-mentor.md";
  slug: "cyber-security-career-mentor";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cyber-security-ciso-assistant.md": {
	id: "cyber-security-ciso-assistant.md";
  slug: "cyber-security-ciso-assistant";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cyber-security-tutor.md": {
	id: "cyber-security-tutor.md";
  slug: "cyber-security-tutor";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cyber-sentinel.md": {
	id: "cyber-sentinel.md";
  slug: "cyber-sentinel";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cyber-test-careerprep.md": {
	id: "cyber-test-careerprep.md";
  slug: "cyber-test-careerprep";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cyber-threat-intelligence.md": {
	id: "cyber-threat-intelligence.md";
  slug: "cyber-threat-intelligence";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cybercrime-tracker.md": {
	id: "cybercrime-tracker.md";
  slug: "cybercrime-tracker";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cybergpt.md": {
	id: "cybergpt.md";
  slug: "cybergpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cyberguard.md": {
	id: "cyberguard.md";
  slug: "cyberguard";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cybernewsgpt.md": {
	id: "cybernewsgpt.md";
  slug: "cybernewsgpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cybersecurity-data-bot.md": {
	id: "cybersecurity-data-bot.md";
  slug: "cybersecurity-data-bot";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cybersecurity-requirements-guide.md": {
	id: "cybersecurity-requirements-guide.md";
  slug: "cybersecurity-requirements-guide";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cybersecurity-researcher.md": {
	id: "cybersecurity-researcher.md";
  slug: "cybersecurity-researcher";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cylect-io-the-ultimate-ai-osint-tool.md": {
	id: "cylect-io-the-ultimate-ai-osint-tool.md";
  slug: "cylect-io-the-ultimate-ai-osint-tool";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"daniel-vassilev-x-twitter.md": {
	id: "daniel-vassilev-x-twitter.md";
  slug: "daniel-vassilev-x-twitter";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"data-analysis.md": {
	id: "data-analysis.md";
  slug: "data-analysis";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"dave-brewster-linkedin.md": {
	id: "dave-brewster-linkedin.md";
  slug: "dave-brewster-linkedin";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"defender-for-endpoint-guardian.md": {
	id: "defender-for-endpoint-guardian.md";
  slug: "defender-for-endpoint-guardian";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"demo-video.md": {
	id: "demo-video.md";
  slug: "demo-video";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"demo.md": {
	id: "demo.md";
  slug: "demo";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"devsecops-guides.md": {
	id: "devsecops-guides.md";
  slug: "devsecops-guides";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"devsecops-guru.md": {
	id: "devsecops-guru.md";
  slug: "devsecops-guru";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"dfir-gpt.md": {
	id: "dfir-gpt.md";
  slug: "dfir-gpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"dify.md": {
	id: "dify.md";
  slug: "dify";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"disinfo-fimi-detective.md": {
	id: "disinfo-fimi-detective.md";
  slug: "disinfo-fimi-detective";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"docker-image.md": {
	id: "docker-image.md";
  slug: "docker-image";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"email-security-expert.md": {
	id: "email-security-expert.md";
  slug: "email-security-expert";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"embedchain.md": {
	id: "embedchain.md";
  slug: "embedchain";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"eu-cra-assistant.md": {
	id: "eu-cra-assistant.md";
  slug: "eu-cra-assistant";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"evoagentx.md": {
	id: "evoagentx.md";
  slug: "evoagentx";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"f-bio-z-domingues-co-founder-of-code-autopilot.md": {
	id: "f-bio-z-domingues-co-founder-of-code-autopilot.md";
  slug: "f-bio-z-domingues-co-founder-of-code-autopilot";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"filip-kozera-founder-at-wordware.md": {
	id: "filip-kozera-founder-at-wordware.md";
  slug: "filip-kozera-founder-at-wordware";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"fixie-developer-portal.md": {
	id: "fixie-developer-portal.md";
  slug: "fixie-developer-portal";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"flappy.md": {
	id: "flappy.md";
  slug: "flappy";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"floom.md": {
	id: "floom.md";
  slug: "floom";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"fridagpt.md": {
	id: "fridagpt.md";
  slug: "fridagpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"game-data-replay.md": {
	id: "game-data-replay.md";
  slug: "game-data-replay";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"geopolitic-explainer.md": {
	id: "geopolitic-explainer.md";
  slug: "geopolitic-explainer";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"getpaths.md": {
	id: "getpaths.md";
  slug: "getpaths";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"github-issue-only.md": {
	id: "github-issue-only.md";
  slug: "github-issue-only";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"google-adk.md": {
	id: "google-adk.md";
  slug: "google-adk";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"google-chrome-extension.md": {
	id: "google-chrome-extension.md";
  slug: "google-chrome-extension";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gp-en-t-ester.md": {
	id: "gp-en-t-ester.md";
  slug: "gp-en-t-ester";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gpt-h4x0r.md": {
	id: "gpt-h4x0r.md";
  slug: "gpt-h4x0r";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gustavo-silva-co-founder-of-code-autopilot.md": {
	id: "gustavo-silva-co-founder-of-code-autopilot.md";
  slug: "gustavo-silva-co-founder-of-code-autopilot";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"h4ckgpt.md": {
	id: "h4ckgpt.md";
  slug: "h4ckgpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"hacker-art.md": {
	id: "hacker-art.md";
  slug: "hacker-art";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"hacker-news-gpt.md": {
	id: "hacker-news-gpt.md";
  slug: "hacker-news-gpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"hackernews-discussion.md": {
	id: "hackernews-discussion.md";
  slug: "hackernews-discussion";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"hackingpt.md": {
	id: "hackingpt.md";
  slug: "hackingpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"hackit-security-researcher.md": {
	id: "hackit-security-researcher.md";
  slug: "hackit-security-researcher";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"hackmeifyoucan.md": {
	id: "hackmeifyoucan.md";
  slug: "hackmeifyoucan";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"hacktricksgpt.md": {
	id: "hacktricksgpt.md";
  slug: "hacktricksgpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"haystack.md": {
	id: "haystack.md";
  slug: "haystack";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"hit-us-up-on-discord.md": {
	id: "hit-us-up-on-discord.md";
  slug: "hit-us-up-on-discord";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"hugging-face-datasets.md": {
	id: "hugging-face-datasets.md";
  slug: "hugging-face-datasets";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"hugging-face-space.md": {
	id: "hugging-face-space.md";
  slug: "hugging-face-space";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"iac-code-guardian.md": {
	id: "iac-code-guardian.md";
  slug: "iac-code-guardian";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"impacketgpt.md": {
	id: "impacketgpt.md";
  slug: "impacketgpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"installation.md": {
	id: "installation.md";
  slug: "installation";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"interview-founder-about-building-maige.md": {
	id: "interview-founder-about-building-maige.md";
  slug: "interview-founder-about-building-maige";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ioc-analyzer.md": {
	id: "ioc-analyzer.md";
  slug: "ioc-analyzer";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"jacky-koh-x-twitter.md": {
	id: "jacky-koh-x-twitter.md";
  slug: "jacky-koh-x-twitter";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"james-lepage-founder-of-codewp.md": {
	id: "james-lepage-founder-of-codewp.md";
  slug: "james-lepage-founder-of-codewp";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"kiln-ai.md": {
	id: "kiln-ai.md";
  slug: "kiln-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"kql-query-helper.md": {
	id: "kql-query-helper.md";
  slug: "kql-query-helper";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"langchain-agents.md": {
	id: "langchain-agents.md";
  slug: "langchain-agents";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"langchain.md": {
	id: "langchain.md";
  slug: "langchain";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"launch-announcement.md": {
	id: "launch-announcement.md";
  slug: "launch-announcement";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"launch-post.md": {
	id: "launch-post.md";
  slug: "launch-post";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"license-mit.md": {
	id: "license-mit.md";
  slug: "license-mit";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"llama-index.md": {
	id: "llama-index.md";
  slug: "llama-index";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"llm-top10-gpt.md": {
	id: "llm-top10-gpt.md";
  slug: "llm-top10-gpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"local-demo.md": {
	id: "local-demo.md";
  slug: "local-demo";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"luke-lalor-linkedin.md": {
	id: "luke-lalor-linkedin.md";
  slug: "luke-lalor-linkedin";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"magicunprotect.md": {
	id: "magicunprotect.md";
  slug: "magicunprotect";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"malware-analyst.md": {
	id: "malware-analyst.md";
  slug: "malware-analyst";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"malware-rule-master.md": {
	id: "malware-rule-master.md";
  slug: "malware-rule-master";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mandos-brief.md": {
	id: "mandos-brief.md";
  slug: "mandos-brief";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"medium-blog.md": {
	id: "medium-blog.md";
  slug: "medium-blog";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"medium.md": {
	id: "medium.md";
  slug: "medium";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"meme.md": {
	id: "meme.md";
  slug: "meme";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"message-header-analyzer.md": {
	id: "message-header-analyzer.md";
  slug: "message-header-analyzer";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"microsoft-autogen.md": {
	id: "microsoft-autogen.md";
  slug: "microsoft-autogen";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"microsoft-semantic-kernel.md": {
	id: "microsoft-semantic-kernel.md";
  slug: "microsoft-semantic-kernel";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mitregpt.md": {
	id: "mitregpt.md";
  slug: "mitregpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"neurolink.md": {
	id: "neurolink.md";
  slug: "neurolink";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"nvd-cve-research-assistant.md": {
	id: "nvd-cve-research-assistant.md";
  slug: "nvd-cve-research-assistant";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"openagents.md": {
	id: "openagents.md";
  slug: "openagents";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"openmanus.md": {
	id: "openmanus.md";
  slug: "openmanus";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"osistent.md": {
	id: "osistent.md";
  slug: "osistent";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ot-security-buddy-gpt.md": {
	id: "ot-security-buddy-gpt.md";
  slug: "ot-security-buddy-gpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"owasp-llm-advisor.md": {
	id: "owasp-llm-advisor.md";
  slug: "owasp-llm-advisor";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"paper-chatdev-communicative-agents-for-software-development.md": {
	id: "paper-chatdev-communicative-agents-for-software-development.md";
  slug: "paper-chatdev-communicative-agents-for-software-development";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pentest-reporter.md": {
	id: "pentest-reporter.md";
  slug: "pentest-reporter";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pentester-interviewer.md": {
	id: "pentester-interviewer.md";
  slug: "pentester-interviewer";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"playground.md": {
	id: "playground.md";
  slug: "playground";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"portia-ai.md": {
	id: "portia-ai.md";
  slug: "portia-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"privacy-guardian-ai.md": {
	id: "privacy-guardian-ai.md";
  slug: "privacy-guardian-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"privacy-overview.md": {
	id: "privacy-overview.md";
  slug: "privacy-overview";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"privacygpt.md": {
	id: "privacygpt.md";
  slug: "privacygpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"profile-of-the-company.md": {
	id: "profile-of-the-company.md";
  slug: "profile-of-the-company";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"project-demo.md": {
	id: "project-demo.md";
  slug: "project-demo";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"project-page.md": {
	id: "project-page.md";
  slug: "project-page";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"prompt-injection-detector.md": {
	id: "prompt-injection-detector.md";
  slug: "prompt-injection-detector";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"prompt-injection-maker.md": {
	id: "prompt-injection-maker.md";
  slug: "prompt-injection-maker";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"rai.md": {
	id: "rai.md";
  slug: "rai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ransomchatgpt.md": {
	id: "ransomchatgpt.md";
  slug: "ransomchatgpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ravi-ramachandran-linkedin.md": {
	id: "ravi-ramachandran-linkedin.md";
  slug: "ravi-ramachandran-linkedin";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"red-team-guides.md": {
	id: "red-team-guides.md";
  slug: "red-team-guides";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"redteamgpt.md": {
	id: "redteamgpt.md";
  slug: "redteamgpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"repo-ranger.md": {
	id: "repo-ranger.md";
  slug: "repo-ranger";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"repo.md": {
	id: "repo.md";
  slug: "repo";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"rfcgpt.md": {
	id: "rfcgpt.md";
  slug: "rfcgpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"risk-guardian.md": {
	id: "risk-guardian.md";
  slug: "risk-guardian";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"roadmap.md": {
	id: "roadmap.md";
  slug: "roadmap";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"secure-code-assistant.md": {
	id: "secure-code-assistant.md";
  slug: "secure-code-assistant";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"secure-password-generator.md": {
	id: "secure-password-generator.md";
  slug: "secure-password-generator";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"secure-software-development-framework-ssdf-agent.md": {
	id: "secure-software-development-framework-ssdf-agent.md";
  slug: "secure-software-development-framework-ssdf-agent";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"securia.md": {
	id: "securia.md";
  slug: "securia";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"security-advisor.md": {
	id: "security-advisor.md";
  slug: "security-advisor";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"securityrecipesgpt.md": {
	id: "securityrecipesgpt.md";
  slug: "securityrecipesgpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"simplisec.md": {
	id: "simplisec.md";
  slug: "simplisec";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"slack-channel.md": {
	id: "slack-channel.md";
  slug: "slack-channel";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"slack.md": {
	id: "slack.md";
  slug: "slack";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"smart-contract-audit-assistant.md": {
	id: "smart-contract-audit-assistant.md";
  slug: "smart-contract-audit-assistant";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"smart-contract-auditor.md": {
	id: "smart-contract-auditor.md";
  slug: "smart-contract-auditor";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"soc-copilot.md": {
	id: "soc-copilot.md";
  slug: "soc-copilot";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"sourabh-gawande-cofounder-at-kusho.md": {
	id: "sourabh-gawande-cofounder-at-kusho.md";
  slug: "sourabh-gawande-cofounder-at-kusho";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"sourcecodeanalysis.md": {
	id: "sourcecodeanalysis.md";
  slug: "sourcecodeanalysis";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"spamguard-tutor.md": {
	id: "spamguard-tutor.md";
  slug: "spamguard-tutor";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"squidshing.md": {
	id: "squidshing.md";
  slug: "squidshing";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"step-by-step-guide.md": {
	id: "step-by-step-guide.md";
  slug: "step-by-step-guide";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"streamlit-app.md": {
	id: "streamlit-app.md";
  slug: "streamlit-app";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"strobes-intel-ai.md": {
	id: "strobes-intel-ai.md";
  slug: "strobes-intel-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"subreddit.md": {
	id: "subreddit.md";
  slug: "subreddit";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"superagi.md": {
	id: "superagi.md";
  slug: "superagi";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"systems-security-analyst.md": {
	id: "systems-security-analyst.md";
  slug: "systems-security-analyst";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tech-insight-guru.md": {
	id: "tech-insight-guru.md";
  slug: "tech-insight-guru";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"techno-guardian-v1-3.md": {
	id: "techno-guardian-v1-3.md";
  slug: "techno-guardian-v1-3";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"telegram.md": {
	id: "telegram.md";
  slug: "telegram";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"templates.md": {
	id: "templates.md";
  slug: "templates";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"the-privacy-protector.md": {
	id: "the-privacy-protector.md";
  slug: "the-privacy-protector";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"thedfirreport-assistant.md": {
	id: "thedfirreport-assistant.md";
  slug: "thedfirreport-assistant";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"they-re-building-an-ai-assistant-here.md": {
	id: "they-re-building-an-ai-assistant-here.md";
  slug: "they-re-building-an-ai-assistant-here";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"threat-intel-bot.md": {
	id: "threat-intel-bot.md";
  slug: "threat-intel-bot";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"threat-intel-brief.md": {
	id: "threat-intel-brief.md";
  slug: "threat-intel-brief";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"threat-model-buddy.md": {
	id: "threat-model-buddy.md";
  slug: "threat-model-buddy";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"threat-model-companion.md": {
	id: "threat-model-companion.md";
  slug: "threat-model-companion";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"threat-modeler.md": {
	id: "threat-modeler.md";
  slug: "threat-modeler";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"threat-modeling-companion.md": {
	id: "threat-modeling-companion.md";
  slug: "threat-modeling-companion";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"threat-modelling.md": {
	id: "threat-modelling.md";
  slug: "threat-modelling";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tim-d-linkedin.md": {
	id: "tim-d-linkedin.md";
  slug: "tim-d-linkedin";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tricks-for-prompting-sweep.md": {
	id: "tricks-for-prompting-sweep.md";
  slug: "tricks-for-prompting-sweep";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"twitter-review-by-attack.md": {
	id: "twitter-review-by-attack.md";
  slug: "twitter-review-by-attack";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"underlying-paper-generative-agents.md": {
	id: "underlying-paper-generative-agents.md";
  slug: "underlying-paper-generative-agents";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"upsonic.md": {
	id: "upsonic.md";
  slug: "upsonic";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"use-cases.md": {
	id: "use-cases.md";
  slug: "use-cases";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"video-testing-maige.md": {
	id: "video-testing-maige.md";
  slug: "video-testing-maige";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"virtual-senior-security-engineer.md": {
	id: "virtual-senior-security-engineer.md";
  slug: "virtual-senior-security-engineer";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"virus-gpt.md": {
	id: "virus-gpt.md";
  slug: "virus-gpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"vscode-extension.md": {
	id: "vscode-extension.md";
  slug: "vscode-extension";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"vulnerability-bot.md": {
	id: "vulnerability-bot.md";
  slug: "vulnerability-bot";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"vulnprioritizer.md": {
	id: "vulnprioritizer.md";
  slug: "vulnprioritizer";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"waitlist.md": {
	id: "waitlist.md";
  slug: "waitlist";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"watson.md": {
	id: "watson.md";
  slug: "watson";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"web-app-and-api-hacker.md": {
	id: "web-app-and-api-hacker.md";
  slug: "web-app-and-api-hacker";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"web-hacking-wizard.md": {
	id: "web-hacking-wizard.md";
  slug: "web-hacking-wizard";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"whichsat.md": {
	id: "whichsat.md";
  slug: "whichsat";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"wifi-assistant.md": {
	id: "wifi-assistant.md";
  slug: "wifi-assistant";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"wp-secure-guide.md": {
	id: "wp-secure-guide.md";
  slug: "wp-secure-guide";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"wva.md": {
	id: "wva.md";
  slug: "wva";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"x-post.md": {
	id: "x-post.md";
  slug: "x-post";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"x-twitter.md": {
	id: "x-twitter.md";
  slug: "x-twitter";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"xagent.md": {
	id: "xagent.md";
  slug: "xagent";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ycombinator-profile.md": {
	id: "ycombinator-profile.md";
  slug: "ycombinator-profile";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ycombinator.md": {
	id: "ycombinator.md";
  slug: "ycombinator";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"zero-day-tools.md": {
	id: "zero-day-tools.md";
  slug: "zero-day-tools";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"zkgpt.md": {
	id: "zkgpt.md";
  slug: "zkgpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
