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
"16x-prompt.md": {
	id: "16x-prompt.md";
  slug: "16x-prompt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"19-questions.md": {
	id: "19-questions.md";
  slug: "19-questions";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"365-data-science-course.md": {
	id: "365-data-science-course.md";
  slug: "365-data-science-course";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"3d-machine-learning.md": {
	id: "3d-machine-learning.md";
  slug: "3d-machine-learning";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"3d-point-clouds.md": {
	id: "3d-point-clouds.md";
  slug: "3d-point-clouds";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"3rd-softsec-reviewer.md": {
	id: "3rd-softsec-reviewer.md";
  slug: "3rd-softsec-reviewer";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"5-best-openclaw-alternatives.md": {
	id: "5-best-openclaw-alternatives.md";
  slug: "5-best-openclaw-alternatives";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"500-best-ai-tools.md": {
	id: "500-best-ai-tools.md";
  slug: "500-best-ai-tools";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"a-stage-review-of-instruction-tuning.md": {
	id: "a-stage-review-of-instruction-tuning.md";
  slug: "a-stage-review-of-instruction-tuning";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"aakash-gupta-prompt-engineering-in-2025.md": {
	id: "aakash-gupta-prompt-engineering-in-2025.md";
  slug: "aakash-gupta-prompt-engineering-in-2025";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"accord-framework.md": {
	id: "accord-framework.md";
  slug: "accord-framework";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"accord-machinelearning.md": {
	id: "accord-machinelearning.md";
  slug: "accord-machinelearning";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"accord-net.md": {
	id: "accord-net.md";
  slug: "accord-net";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"actiondesk.md": {
	id: "actiondesk.md";
  slug: "actiondesk";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"activecalculator.md": {
	id: "activecalculator.md";
  slug: "activecalculator";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"activepieces.md": {
	id: "activepieces.md";
  slug: "activepieces";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"adal.md": {
	id: "adal.md";
  slug: "adal";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"adalflow.md": {
	id: "adalflow.md";
  slug: "adalflow";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"adalo.md": {
	id: "adalo.md";
  slug: "adalo";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"adk-rust.md": {
	id: "adk-rust.md";
  slug: "adk-rust";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"adon-ai.md": {
	id: "adon-ai.md";
  slug: "adon-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"adrenaline.md": {
	id: "adrenaline.md";
  slug: "adrenaline";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"advanced-prompt-engineering.md": {
	id: "advanced-prompt-engineering.md";
  slug: "advanced-prompt-engineering";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"advanced-prompt-hacking.md": {
	id: "advanced-prompt-hacking.md";
  slug: "advanced-prompt-hacking";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"adversarial-examples.md": {
	id: "adversarial-examples.md";
  slug: "adversarial-examples";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"adversarial-ml.md": {
	id: "adversarial-ml.md";
  slug: "adversarial-ml";
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
"adzooma.md": {
	id: "adzooma.md";
  slug: "adzooma";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"aequitas.md": {
	id: "aequitas.md";
  slug: "aequitas";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"affective-computing.md": {
	id: "affective-computing.md";
  slug: "affective-computing";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"aforge-net.md": {
	id: "aforge-net.md";
  slug: "aforge-net";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"agency.md": {
	id: "agency.md";
  slug: "agency";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"agent-llm.md": {
	id: "agent-llm.md";
  slug: "agent-llm";
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
"agenta.md": {
	id: "agenta.md";
  slug: "agenta";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"agentdock.md": {
	id: "agentdock.md";
  slug: "agentdock";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"agentfield.md": {
	id: "agentfield.md";
  slug: "agentfield";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"agentflow.md": {
	id: "agentflow.md";
  slug: "agentflow";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"agentfund.md": {
	id: "agentfund.md";
  slug: "agentfund";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"agentgpt.md": {
	id: "agentgpt.md";
  slug: "agentgpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"agentic-radar.md": {
	id: "agentic-radar.md";
  slug: "agentic-radar";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"agentic-signal.md": {
	id: "agentic-signal.md";
  slug: "agentic-signal";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"agentic-sprint.md": {
	id: "agentic-sprint.md";
  slug: "agentic-sprint";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"agentlabs.md": {
	id: "agentlabs.md";
  slug: "agentlabs";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"agentmail.md": {
	id: "agentmail.md";
  slug: "agentmail";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"agentrun.md": {
	id: "agentrun.md";
  slug: "agentrun";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"agentrunner-ai.md": {
	id: "agentrunner-ai.md";
  slug: "agentrunner-ai";
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
"agents-md.md": {
	id: "agents-md.md";
  slug: "agents-md";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"agents.md": {
	id: "agents.md";
  slug: "agents";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"agentscope.md": {
	id: "agentscope.md";
  slug: "agentscope";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"agentset-ai.md": {
	id: "agentset-ai.md";
  slug: "agentset-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"agentskb.md": {
	id: "agentskb.md";
  slug: "agentskb";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"agentverse.md": {
	id: "agentverse.md";
  slug: "agentverse";
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
"ai-agents-in-langgraph.md": {
	id: "ai-agents-in-langgraph.md";
  slug: "ai-agents-in-langgraph";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ai-agents.md": {
	id: "ai-agents.md";
  slug: "ai-agents";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ai-alignment-forum.md": {
	id: "ai-alignment-forum.md";
  slug: "ai-alignment-forum";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ai-and-machine-learning-roadmaps.md": {
	id: "ai-and-machine-learning-roadmaps.md";
  slug: "ai-and-machine-learning-roadmaps";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ai-career.md": {
	id: "ai-career.md";
  slug: "ai-career";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ai-character-for-gpt.md": {
	id: "ai-character-for-gpt.md";
  slug: "ai-character-for-gpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ai-chatbot.md": {
	id: "ai-chatbot.md";
  slug: "ai-chatbot";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ai-code-convert.md": {
	id: "ai-code-convert.md";
  slug: "ai-code-convert";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ai-code-playground.md": {
	id: "ai-code-playground.md";
  slug: "ai-code-playground";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ai-coding-tools-references.md": {
	id: "ai-coding-tools-references.md";
  slug: "ai-coding-tools-references";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ai-coding-tools.md": {
	id: "ai-coding-tools.md";
  slug: "ai-coding-tools";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ai-competition-statement.md": {
	id: "ai-competition-statement.md";
  slug: "ai-competition-statement";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ai-content-detectors.md": {
	id: "ai-content-detectors.md";
  slug: "ai-content-detectors";
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
"ai-dungeon.md": {
	id: "ai-dungeon.md";
  slug: "ai-dungeon";
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
"ai-expert-roadmap.md": {
	id: "ai-expert-roadmap.md";
  slug: "ai-expert-roadmap";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ai-explainability-360.md": {
	id: "ai-explainability-360.md";
  slug: "ai-explainability-360";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ai-fairness-360.md": {
	id: "ai-fairness-360.md";
  slug: "ai-fairness-360";
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
"ai-flow.md": {
	id: "ai-flow.md";
  slug: "ai-flow";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ai-for-developers.md": {
	id: "ai-for-developers.md";
  slug: "ai-for-developers";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ai-for-google-slides.md": {
	id: "ai-for-google-slides.md";
  slug: "ai-for-google-slides";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ai-gateway.md": {
	id: "ai-gateway.md";
  slug: "ai-gateway";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ai-getting-started.md": {
	id: "ai-getting-started.md";
  slug: "ai-getting-started";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ai-git-narrator.md": {
	id: "ai-git-narrator.md";
  slug: "ai-git-narrator";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ai-in-golang.md": {
	id: "ai-in-golang.md";
  slug: "ai-in-golang";
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
"ai-kernel-explorer.md": {
	id: "ai-kernel-explorer.md";
  slug: "ai-kernel-explorer";
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
"ai-machine-learning.md": {
	id: "ai-machine-learning.md";
  slug: "ai-machine-learning";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ai-mask.md": {
	id: "ai-mask.md";
  slug: "ai-mask";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ai-ml-api.md": {
	id: "ai-ml-api.md";
  slug: "ai-ml-api";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ai-music-generator.md": {
	id: "ai-music-generator.md";
  slug: "ai-music-generator";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ai-poem-generator.md": {
	id: "ai-poem-generator.md";
  slug: "ai-poem-generator";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ai-powered-infrastructure-as-code-generator.md": {
	id: "ai-powered-infrastructure-as-code-generator.md";
  slug: "ai-powered-infrastructure-as-code-generator";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ai-residency-programs-information.md": {
	id: "ai-residency-programs-information.md";
  slug: "ai-residency-programs-information";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ai-safety.md": {
	id: "ai-safety.md";
  slug: "ai-safety";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ai-scientist.md": {
	id: "ai-scientist.md";
  slug: "ai-scientist";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ai-use-cases.md": {
	id: "ai-use-cases.md";
  slug: "ai-use-cases";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ai-utils.md": {
	id: "ai-utils.md";
  slug: "ai-utils";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ai-voice-agents.md": {
	id: "ai-voice-agents.md";
  slug: "ai-voice-agents";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ai-watermark-remover.md": {
	id: "ai-watermark-remover.md";
  slug: "ai-watermark-remover";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ai-wedding-toast.md": {
	id: "ai-wedding-toast.md";
  slug: "ai-wedding-toast";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ai.md": {
	id: "ai.md";
  slug: "ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ai2-thor.md": {
	id: "ai2-thor.md";
  slug: "ai2-thor";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ai2sql.md": {
	id: "ai2sql.md";
  slug: "ai2sql";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"aicaller-io.md": {
	id: "aicaller-io.md";
  slug: "aicaller-io";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"aicamp.md": {
	id: "aicamp.md";
  slug: "aicamp";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"aidbase.md": {
	id: "aidbase.md";
  slug: "aidbase";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"aider.md": {
	id: "aider.md";
  slug: "aider";
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
"aim.md": {
	id: "aim.md";
  slug: "aim";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ainterview-space.md": {
	id: "ainterview-space.md";
  slug: "ainterview-space";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"aipdf.md": {
	id: "aipdf.md";
  slug: "aipdf";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"airllm.md": {
	id: "airllm.md";
  slug: "airllm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"airtable.md": {
	id: "airtable.md";
  slug: "airtable";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"aisaver.md": {
	id: "aisaver.md";
  slug: "aisaver";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"aispect.md": {
	id: "aispect.md";
  slug: "aispect";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"aitemplate.md": {
	id: "aitemplate.md";
  slug: "aitemplate";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"aiva.md": {
	id: "aiva.md";
  slug: "aiva";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"aixcoder.md": {
	id: "aixcoder.md";
  slug: "aixcoder";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"alexander-rush-series.md": {
	id: "alexander-rush-series.md";
  slug: "alexander-rush-series";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"alibi-detect.md": {
	id: "alibi-detect.md";
  slug: "alibi-detect";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"alibi.md": {
	id: "alibi.md";
  slug: "alibi";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"alluxio.md": {
	id: "alluxio.md";
  slug: "alluxio";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"aloc.md": {
	id: "aloc.md";
  slug: "aloc";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"alpa.md": {
	id: "alpa.md";
  slug: "alpa";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"alpaca-photoshop-plugin.md": {
	id: "alpaca-photoshop-plugin.md";
  slug: "alpaca-photoshop-plugin";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"alpacaeval.md": {
	id: "alpacaeval.md";
  slug: "alpacaeval";
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
"alphaxiv.md": {
	id: "alphaxiv.md";
  slug: "alphaxiv";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"alrojo-tensorflow-tutorial.md": {
	id: "alrojo-tensorflow-tutorial.md";
  slug: "alrojo-tensorflow-tutorial";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"amazon-codewhisperer.md": {
	id: "amazon-codewhisperer.md";
  slug: "amazon-codewhisperer";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"amazon-q-developer-cli.md": {
	id: "amazon-q-developer-cli.md";
  slug: "amazon-q-developer-cli";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"amazon-q-developer-review.md": {
	id: "amazon-q-developer-review.md";
  slug: "amazon-q-developer-review";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"amazon-q-developer-transform.md": {
	id: "amazon-q-developer-transform.md";
  slug: "amazon-q-developer-transform";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"amazon-q-developer.md": {
	id: "amazon-q-developer.md";
  slug: "amazon-q-developer";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"amazon-q.md": {
	id: "amazon-q.md";
  slug: "amazon-q";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ambrosia.md": {
	id: "ambrosia.md";
  slug: "ambrosia";
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
"amundsen.md": {
	id: "amundsen.md";
  slug: "amundsen";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"analytics-vidhya.md": {
	id: "analytics-vidhya.md";
  slug: "analytics-vidhya";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"anchain-ai-openclaw-guide.md": {
	id: "anchain-ai-openclaw-guide.md";
  slug: "anchain-ai-openclaw-guide";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"android-studio-bot.md": {
	id: "android-studio-bot.md";
  slug: "android-studio-bot";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ankidecks-ai.md": {
	id: "ankidecks-ai.md";
  slug: "ankidecks-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ann-benchmarks.md": {
	id: "ann-benchmarks.md";
  slug: "ann-benchmarks";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"anse.md": {
	id: "anse.md";
  slug: "anse";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"anthropic-claude-4-best-practices.md": {
	id: "anthropic-claude-4-best-practices.md";
  slug: "anthropic-claude-4-best-practices";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"anthropic-courses.md": {
	id: "anthropic-courses.md";
  slug: "anthropic-courses";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"anthropic-discord.md": {
	id: "anthropic-discord.md";
  slug: "anthropic-discord";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"anthropic-effective-context-engineering-for-ai-agents.md": {
	id: "anthropic-effective-context-engineering-for-ai-agents.md";
  slug: "anthropic-effective-context-engineering-for-ai-agents";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"anthropic-interactive-tutorial.md": {
	id: "anthropic-interactive-tutorial.md";
  slug: "anthropic-interactive-tutorial";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"anthropic-prompt-engineering-overview.md": {
	id: "anthropic-prompt-engineering-overview.md";
  slug: "anthropic-prompt-engineering-overview";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"anything-llm.md": {
	id: "anything-llm.md";
  slug: "anything-llm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"anyword.md": {
	id: "anyword.md";
  slug: "anyword";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"apache-airflow.md": {
	id: "apache-airflow.md";
  slug: "apache-airflow";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"apache-arrow.md": {
	id: "apache-arrow.md";
  slug: "apache-arrow";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"apache-atlas.md": {
	id: "apache-atlas.md";
  slug: "apache-atlas";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"apache-beam.md": {
	id: "apache-beam.md";
  slug: "apache-beam";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"apache-druid.md": {
	id: "apache-druid.md";
  slug: "apache-druid";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"apache-echarts.md": {
	id: "apache-echarts.md";
  slug: "apache-echarts";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"apache-flink.md": {
	id: "apache-flink.md";
  slug: "apache-flink";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"apache-hudi.md": {
	id: "apache-hudi.md";
  slug: "apache-hudi";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"apache-iceberg.md": {
	id: "apache-iceberg.md";
  slug: "apache-iceberg";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"apache-ignite.md": {
	id: "apache-ignite.md";
  slug: "apache-ignite";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"apache-kafka.md": {
	id: "apache-kafka.md";
  slug: "apache-kafka";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"apache-nifi.md": {
	id: "apache-nifi.md";
  slug: "apache-nifi";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"apache-oozie.md": {
	id: "apache-oozie.md";
  slug: "apache-oozie";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"apache-parquet.md": {
	id: "apache-parquet.md";
  slug: "apache-parquet";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"apache-pinot.md": {
	id: "apache-pinot.md";
  slug: "apache-pinot";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"apache-samza.md": {
	id: "apache-samza.md";
  slug: "apache-samza";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"apache-spark.md": {
	id: "apache-spark.md";
  slug: "apache-spark";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"apache-superset.md": {
	id: "apache-superset.md";
  slug: "apache-superset";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"apache-zeppelin.md": {
	id: "apache-zeppelin.md";
  slug: "apache-zeppelin";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"apexoracle.md": {
	id: "apexoracle.md";
  slug: "apexoracle";
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
"apify.md": {
	id: "apify.md";
  slug: "apify";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"apis.md": {
	id: "apis.md";
  slug: "apis";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"app-generators.md": {
	id: "app-generators.md";
  slug: "app-generators";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"applications-and-datasets.md": {
	id: "applications-and-datasets.md";
  slug: "applications-and-datasets";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"apponboard-studio.md": {
	id: "apponboard-studio.md";
  slug: "apponboard-studio";
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
"appsheet.md": {
	id: "appsheet.md";
  slug: "appsheet";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"appsmith.md": {
	id: "appsmith.md";
  slug: "appsmith";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"appspotr.md": {
	id: "appspotr.md";
  slug: "appspotr";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"appstylo.md": {
	id: "appstylo.md";
  slug: "appstylo";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"aqueduct.md": {
	id: "aqueduct.md";
  slug: "aqueduct";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"architecture-helper.md": {
	id: "architecture-helper.md";
  slug: "architecture-helper";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"architecture-search.md": {
	id: "architecture-search.md";
  slug: "architecture-search";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"architectures.md": {
	id: "architectures.md";
  slug: "architectures";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"arctic.md": {
	id: "arctic.md";
  slug: "arctic";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ares.md": {
	id: "ares.md";
  slug: "ares";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"argilla.md": {
	id: "argilla.md";
  slug: "argilla";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"argo-workflows.md": {
	id: "argo-workflows.md";
  slug: "argo-workflows";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"arize-ai.md": {
	id: "arize-ai.md";
  slug: "arize-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"arize-phoenix.md": {
	id: "arize-phoenix.md";
  slug: "arize-phoenix";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"art.md": {
	id: "art.md";
  slug: "art";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"artbreeder-collage.md": {
	id: "artbreeder-collage.md";
  slug: "artbreeder-collage";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"arthur-shield.md": {
	id: "arthur-shield.md";
  slug: "arthur-shield";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"articles-papers-code-data-courses.md": {
	id: "articles-papers-code-data-courses.md";
  slug: "articles-papers-code-data-courses";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"artificial-analysis.md": {
	id: "artificial-analysis.md";
  slug: "artificial-analysis";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"artificial-intelligence-ai.md": {
	id: "artificial-intelligence-ai.md";
  slug: "artificial-intelligence-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"artificial-intelligence.md": {
	id: "artificial-intelligence.md";
  slug: "artificial-intelligence";
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
"askcodi.md": {
	id: "askcodi.md";
  slug: "askcodi";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"askcommand.md": {
	id: "askcommand.md";
  slug: "askcommand";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"asreview.md": {
	id: "asreview.md";
  slug: "asreview";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"assistant-cli.md": {
	id: "assistant-cli.md";
  slug: "assistant-cli";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"assistants.md": {
	id: "assistants.md";
  slug: "assistants";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"atlassian-rovo.md": {
	id: "atlassian-rovo.md";
  slug: "atlassian-rovo";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"atomist.md": {
	id: "atomist.md";
  slug: "atomist";
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
"audify-ai.md": {
	id: "audify-ai.md";
  slug: "audify-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"audiocraft.md": {
	id: "audiocraft.md";
  slug: "audiocraft";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"audiogpt.md": {
	id: "audiogpt.md";
  slug: "audiogpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"augment.md": {
	id: "augment.md";
  slug: "augment";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"auto-gpt.md": {
	id: "auto-gpt.md";
  slug: "auto-gpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"auto-sklearn.md": {
	id: "auto-sklearn.md";
  slug: "auto-sklearn";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"autoawq.md": {
	id: "autoawq.md";
  slug: "autoawq";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"autochain.md": {
	id: "autochain.md";
  slug: "autochain";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"autocode.md": {
	id: "autocode.md";
  slug: "autocode";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"autocomplete-sh.md": {
	id: "autocomplete-sh.md";
  slug: "autocomplete-sh";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"autodoc.md": {
	id: "autodoc.md";
  slug: "autodoc";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"autofaiss-automatically-create-faiss-knn-indices.md": {
	id: "autofaiss-automatically-create-faiss-knn-indices.md";
  slug: "autofaiss-automatically-create-faiss-knn-indices";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"autogen.md": {
	id: "autogen.md";
  slug: "autogen";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"autogluon.md": {
	id: "autogluon.md";
  slug: "autogluon";
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
"autogptq.md": {
	id: "autogptq.md";
  slug: "autogptq";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"autokeras.md": {
	id: "autokeras.md";
  slug: "autokeras";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"automatic1111.md": {
	id: "automatic1111.md";
  slug: "automatic1111";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"automation.md": {
	id: "automation.md";
  slug: "automation";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"automl.md": {
	id: "automl.md";
  slug: "automl";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"autonomous-hr-chatbot.md": {
	id: "autonomous-hr-chatbot.md";
  slug: "autonomous-hr-chatbot";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"autorag.md": {
	id: "autorag.md";
  slug: "autorag";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"autoregex.md": {
	id: "autoregex.md";
  slug: "autoregex";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"autotrain-advanced.md": {
	id: "autotrain-advanced.md";
  slug: "autotrain-advanced";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"avalanche.md": {
	id: "avalanche.md";
  slug: "avalanche";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-ai-agents.md": {
	id: "awesome-ai-agents.md";
  slug: "awesome-ai-agents";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-ai-analytics.md": {
	id: "awesome-ai-analytics.md";
  slug: "awesome-ai-analytics";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-ai-devtools.md": {
	id: "awesome-ai-devtools.md";
  slug: "awesome-ai-devtools";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-ai-regulation.md": {
	id: "awesome-ai-regulation.md";
  slug: "awesome-ai-regulation";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-ai-tools.md": {
	id: "awesome-ai-tools.md";
  slug: "awesome-ai-tools";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-aws.md": {
	id: "awesome-aws.md";
  slug: "awesome-aws";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-chatgpt-prompts.md": {
	id: "awesome-chatgpt-prompts.md";
  slug: "awesome-chatgpt-prompts";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-chinese-nlp.md": {
	id: "awesome-chinese-nlp.md";
  slug: "awesome-chinese-nlp";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-dl4nlp.md": {
	id: "awesome-dl4nlp.md";
  slug: "awesome-dl4nlp";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-hugging-face-models.md": {
	id: "awesome-hugging-face-models.md";
  slug: "awesome-hugging-face-models";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-keras.md": {
	id: "awesome-keras.md";
  slug: "awesome-keras";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-langchain.md": {
	id: "awesome-langchain.md";
  slug: "awesome-langchain";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-llm.md": {
	id: "awesome-llm.md";
  slug: "awesome-llm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-llmops.md": {
	id: "awesome-llmops.md";
  slug: "awesome-llmops";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-music-production.md": {
	id: "awesome-music-production.md";
  slug: "awesome-music-production";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-nocode-lowcode.md": {
	id: "awesome-nocode-lowcode.md";
  slug: "awesome-nocode-lowcode";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-openclaw-skills.md": {
	id: "awesome-openclaw-skills.md";
  slug: "awesome-openclaw-skills";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-production-genai.md": {
	id: "awesome-production-genai.md";
  slug: "awesome-production-genai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-rag-production.md": {
	id: "awesome-rag-production.md";
  slug: "awesome-rag-production";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-sentence-embedding.md": {
	id: "awesome-sentence-embedding.md";
  slug: "awesome-sentence-embedding";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-software-engineering-for-machine-learning.md": {
	id: "awesome-software-engineering-for-machine-learning.md";
  slug: "awesome-software-engineering-for-machine-learning";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-tensorflow.md": {
	id: "awesome-tensorflow.md";
  slug: "awesome-tensorflow";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-vibe-coding.md": {
	id: "awesome-vibe-coding.md";
  slug: "awesome-vibe-coding";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awq.md": {
	id: "awq.md";
  slug: "awq";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ax.md": {
	id: "ax.md";
  slug: "ax";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"axflow.md": {
	id: "axflow.md";
  slug: "axflow";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"axolotl.md": {
	id: "axolotl.md";
  slug: "axolotl";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"babyagi-ui.md": {
	id: "babyagi-ui.md";
  slug: "babyagi-ui";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"babyagi.md": {
	id: "babyagi.md";
  slug: "babyagi";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"bark.md": {
	id: "bark.md";
  slug: "bark";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"based-ai.md": {
	id: "based-ai.md";
  slug: "based-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"baserow.md": {
	id: "baserow.md";
  slug: "baserow";
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
"baz-cli.md": {
	id: "baz-cli.md";
  slug: "baz-cli";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"baz.md": {
	id: "baz.md";
  slug: "baz";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"be-my-eyes.md": {
	id: "be-my-eyes.md";
  slug: "be-my-eyes";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"beatoven-ai.md": {
	id: "beatoven-ai.md";
  slug: "beatoven-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"bee.md": {
	id: "bee.md";
  slug: "bee";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"beelzebub-chatgpt-honeypot.md": {
	id: "beelzebub-chatgpt-honeypot.md";
  slug: "beelzebub-chatgpt-honeypot";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"beir.md": {
	id: "beir.md";
  slug: "beir";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"bentoml.md": {
	id: "bentoml.md";
  slug: "bentoml";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"berrry.md": {
	id: "berrry.md";
  slug: "berrry";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"besser-bot-framework.md": {
	id: "besser-bot-framework.md";
  slug: "besser-bot-framework";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"besser.md": {
	id: "besser.md";
  slug: "besser";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"best-100-stable-diffusion-prompts.md": {
	id: "best-100-stable-diffusion-prompts.md";
  slug: "best-100-stable-diffusion-prompts";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"best-practices.md": {
	id: "best-practices.md";
  slug: "best-practices";
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
"betty-blocks.md": {
	id: "betty-blocks.md";
  slug: "betty-blocks";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"bge.md": {
	id: "bge.md";
  slug: "bge";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"bifrost.md": {
	id: "bifrost.md";
  slug: "bifrost";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"big-cartel.md": {
	id: "big-cartel.md";
  slug: "big-cartel";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"big-data-research.md": {
	id: "big-data-research.md";
  slug: "big-data-research";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"big-data-society.md": {
	id: "big-data-society.md";
  slug: "big-data-society";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"binary-neural-networks.md": {
	id: "binary-neural-networks.md";
  slug: "binary-neural-networks";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"bindsnet.md": {
	id: "bindsnet.md";
  slug: "bindsnet";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"bing-chat.md": {
	id: "bing-chat.md";
  slug: "bing-chat";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"bing-search.md": {
	id: "bing-search.md";
  slug: "bing-search";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"binroot-tensorflow-book.md": {
	id: "binroot-tensorflow-book.md";
  slug: "binroot-tensorflow-book";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"bisheng.md": {
	id: "bisheng.md";
  slug: "bisheng";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"bitnet-cpp.md": {
	id: "bitnet-cpp.md";
  slug: "bitnet-cpp";
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
"blackbox-ai.md": {
	id: "blackbox-ai.md";
  slug: "blackbox-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"blank-space.md": {
	id: "blank-space.md";
  slug: "blank-space";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"blinky-debugging-agent.md": {
	id: "blinky-debugging-agent.md";
  slug: "blinky-debugging-agent";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"blinky.md": {
	id: "blinky.md";
  slug: "blinky";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"blockagi.md": {
	id: "blockagi.md";
  slug: "blockagi";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"bloggi.md": {
	id: "bloggi.md";
  slug: "bloggi";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"blogs-articles.md": {
	id: "blogs-articles.md";
  slug: "blogs-articles";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"bloom.md": {
	id: "bloom.md";
  slug: "bloom";
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
"bloop.md": {
	id: "bloop.md";
  slug: "bloop";
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
"bmtrain.md": {
	id: "bmtrain.md";
  slug: "bmtrain";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"bokeh.md": {
	id: "bokeh.md";
  slug: "bokeh";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"bolt-diy.md": {
	id: "bolt-diy.md";
  slug: "bolt-diy";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"bolt-new.md": {
	id: "bolt-new.md";
  slug: "bolt-new";
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
"bondai.md": {
	id: "bondai.md";
  slug: "bondai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"boomy.md": {
	id: "boomy.md";
  slug: "boomy";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"boringui.md": {
	id: "boringui.md";
  slug: "boringui";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"botbots.md": {
	id: "botbots.md";
  slug: "botbots";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"botnation.md": {
	id: "botnation.md";
  slug: "botnation";
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
"botorch.md": {
	id: "botorch.md";
  slug: "botorch";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"botpress.md": {
	id: "botpress.md";
  slug: "botpress";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"botsify.md": {
	id: "botsify.md";
  slug: "botsify";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"bpn-neuralnetwork.md": {
	id: "bpn-neuralnetwork.md";
  slug: "bpn-neuralnetwork";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"brainsoup.md": {
	id: "brainsoup.md";
  slug: "brainsoup";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"brandmark.md": {
	id: "brandmark.md";
  slug: "brandmark";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"bravo-studio.md": {
	id: "bravo-studio.md";
  slug: "bravo-studio";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"bread-dataset-viewer.md": {
	id: "bread-dataset-viewer.md";
  slug: "bread-dataset-viewer";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"bread-wandb-viewer.md": {
	id: "bread-wandb-viewer.md";
  slug: "bread-wandb-viewer";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"bricks.md": {
	id: "bricks.md";
  slug: "bricks";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"bs-in-data-science-applications.md": {
	id: "bs-in-data-science-applications.md";
  slug: "bs-in-data-science-applications";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"bubble.md": {
	id: "bubble.md";
  slug: "bubble";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"budibase.md": {
	id: "budibase.md";
  slug: "budibase";
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
"build-a-large-language-model-from-scratch.md": {
	id: "build-a-large-language-model-from-scratch.md";
  slug: "build-a-large-language-model-from-scratch";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"build-gpt-how-ai-works.md": {
	id: "build-gpt-how-ai-works.md";
  slug: "build-gpt-how-ai-works";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"building-agentic-rag-with-llamaindex.md": {
	id: "building-agentic-rag-with-llamaindex.md";
  slug: "building-agentic-rag-with-llamaindex";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"building-systems-with-the-chatgpt-api.md": {
	id: "building-systems-with-the-chatgpt-api.md";
  slug: "building-systems-with-the-chatgpt-api";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"buildt.md": {
	id: "buildt.md";
  slug: "buildt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"butterfish.md": {
	id: "butterfish.md";
  slug: "butterfish";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"bytewax.md": {
	id: "bytewax.md";
  slug: "bytewax";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"c-eval.md": {
	id: "c-eval.md";
  slug: "c-eval";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cald-ai.md": {
	id: "cald-ai.md";
  slug: "cald-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"callstack-ai-code-reviewer.md": {
	id: "callstack-ai-code-reviewer.md";
  slug: "callstack-ai-code-reviewer";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"callstack-ai-pr-reviewer.md": {
	id: "callstack-ai-pr-reviewer.md";
  slug: "callstack-ai-pr-reviewer";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"calmo.md": {
	id: "calmo.md";
  slug: "calmo";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"camel-autogpt.md": {
	id: "camel-autogpt.md";
  slug: "camel-autogpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"camel.md": {
	id: "camel.md";
  slug: "camel";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"canva.md": {
	id: "canva.md";
  slug: "canva";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"canvascript.md": {
	id: "canvascript.md";
  slug: "canvascript";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"capacity.md": {
	id: "capacity.md";
  slug: "capacity";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"capsule-networks.md": {
	id: "capsule-networks.md";
  slug: "capsule-networks";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"captum.md": {
	id: "captum.md";
  slug: "captum";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"carbonate.md": {
	id: "carbonate.md";
  slug: "carbonate";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"casibase.md": {
	id: "casibase.md";
  slug: "casibase";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"catalyzex.md": {
	id: "catalyzex.md";
  slug: "catalyzex";
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
"cc-by-sa-4-0.md": {
	id: "cc-by-sa-4-0.md";
  slug: "cc-by-sa-4-0";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"censusgpt.md": {
	id: "censusgpt.md";
  slug: "censusgpt";
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
"chaindesk.md": {
	id: "chaindesk.md";
  slug: "chaindesk";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"chainer.md": {
	id: "chainer.md";
  slug: "chainer";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"chainlit.md": {
	id: "chainlit.md";
  slug: "chainlit";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"changelog-md.md": {
	id: "changelog-md.md";
  slug: "changelog-md";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"chaos-genius.md": {
	id: "chaos-genius.md";
  slug: "chaos-genius";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"character-ai.md": {
	id: "character-ai.md";
  slug: "character-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"chat-langchain.md": {
	id: "chat-langchain.md";
  slug: "chat-langchain";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"chat-math-techniques.md": {
	id: "chat-math-techniques.md";
  slug: "chat-math-techniques";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"chat-with-pdf-by-copilot-us.md": {
	id: "chat-with-pdf-by-copilot-us.md";
  slug: "chat-with-pdf-by-copilot-us";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"chat-with-scanned-documents.md": {
	id: "chat-with-scanned-documents.md";
  slug: "chat-with-scanned-documents";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"chatamo.md": {
	id: "chatamo.md";
  slug: "chatamo";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"chatbot-arena.md": {
	id: "chatbot-arena.md";
  slug: "chatbot-arena";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"chatbot-ui.md": {
	id: "chatbot-ui.md";
  slug: "chatbot-ui";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"chatfiles.md": {
	id: "chatfiles.md";
  slug: "chatfiles";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"chatfuel.md": {
	id: "chatfuel.md";
  slug: "chatfuel";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"chatgpt-code-review.md": {
	id: "chatgpt-code-review.md";
  slug: "chatgpt-code-review";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"chatgpt-for-discord-bot.md": {
	id: "chatgpt-for-discord-bot.md";
  slug: "chatgpt-for-discord-bot";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"chatgpt-for-everyone.md": {
	id: "chatgpt-for-everyone.md";
  slug: "chatgpt-for-everyone";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"chatgpt-for-jupyter.md": {
	id: "chatgpt-for-jupyter.md";
  slug: "chatgpt-for-jupyter";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"chatgpt-for-search-engines.md": {
	id: "chatgpt-for-search-engines.md";
  slug: "chatgpt-for-search-engines";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"chatgpt-for-sheets-docs-slides-forms.md": {
	id: "chatgpt-for-sheets-docs-slides-forms.md";
  slug: "chatgpt-for-sheets-docs-slides-forms";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"chatgpt-for-slack-bot.md": {
	id: "chatgpt-for-slack-bot.md";
  slug: "chatgpt-for-slack-bot";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"chatgpt-gpt-3-5-turbo-api-client-in-golang.md": {
	id: "chatgpt-gpt-3-5-turbo-api-client-in-golang.md";
  slug: "chatgpt-gpt-3-5-turbo-api-client-in-golang";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"chatgpt-heralds-an-intellectual-revolution.md": {
	id: "chatgpt-heralds-an-intellectual-revolution.md";
  slug: "chatgpt-heralds-an-intellectual-revolution";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"chatgpt-langchain.md": {
	id: "chatgpt-langchain.md";
  slug: "chatgpt-langchain";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"chatgpt-official-app.md": {
	id: "chatgpt-official-app.md";
  slug: "chatgpt-official-app";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"chatgpt-prompt-engineering-for-developers.md": {
	id: "chatgpt-prompt-engineering-for-developers.md";
  slug: "chatgpt-prompt-engineering-for-developers";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"chatgpt-prompt-engineering.md": {
	id: "chatgpt-prompt-engineering.md";
  slug: "chatgpt-prompt-engineering";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"chatgpt-prompt-genius.md": {
	id: "chatgpt-prompt-genius.md";
  slug: "chatgpt-prompt-genius";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"chatgpt-shroud.md": {
	id: "chatgpt-shroud.md";
  slug: "chatgpt-shroud";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"chatgpt-wrapper.md": {
	id: "chatgpt-wrapper.md";
  slug: "chatgpt-wrapper";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"chatgpt-writer.md": {
	id: "chatgpt-writer.md";
  slug: "chatgpt-writer";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"chatgpt.md": {
	id: "chatgpt.md";
  slug: "chatgpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"chatgptify.md": {
	id: "chatgptify.md";
  slug: "chatgptify";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"chatpdf.md": {
	id: "chatpdf.md";
  slug: "chatpdf";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"chatsonic.md": {
	id: "chatsonic.md";
  slug: "chatsonic";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"chatui.md": {
	id: "chatui.md";
  slug: "chatui";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"chatwithcloud.md": {
	id: "chatwithcloud.md";
  slug: "chatwithcloud";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"chatwithgit.md": {
	id: "chatwithgit.md";
  slug: "chatwithgit";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cheatsheets.md": {
	id: "cheatsheets.md";
  slug: "cheatsheets";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"checksum-ai.md": {
	id: "checksum-ai.md";
  slug: "checksum-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cheshire-cat.md": {
	id: "cheshire-cat.md";
  slug: "cheshire-cat";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"chidori.md": {
	id: "chidori.md";
  slug: "chidori";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"chinese-ai-models-power-openclaw-s-low-cost-push.md": {
	id: "chinese-ai-models-power-openclaw-s-low-cost-push.md";
  slug: "chinese-ai-models-power-openclaw-s-low-cost-push";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"chroma.md": {
	id: "chroma.md";
  slug: "chroma";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cipherchat.md": {
	id: "cipherchat.md";
  slug: "cipherchat";
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
"civitai.md": {
	id: "civitai.md";
  slug: "civitai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cl-libsvm.md": {
	id: "cl-libsvm.md";
  slug: "cl-libsvm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cl-online-learning.md": {
	id: "cl-online-learning.md";
  slug: "cl-online-learning";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cl-random-forest.md": {
	id: "cl-random-forest.md";
  slug: "cl-random-forest";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"claude-3.md": {
	id: "claude-3.md";
  slug: "claude-3";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"claude-code.md": {
	id: "claude-code.md";
  slug: "claude-code";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"claude-engineer.md": {
	id: "claude-engineer.md";
  slug: "claude-engineer";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"clawdtalk.md": {
	id: "clawdtalk.md";
  slug: "clawdtalk";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"clawhub.md": {
	id: "clawhub.md";
  slug: "clawhub";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"clay.md": {
	id: "clay.md";
  slug: "clay";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cleanlab.md": {
	id: "cleanlab.md";
  slug: "cleanlab";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"clearbit.md": {
	id: "clearbit.md";
  slug: "clearbit";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"clearml.md": {
	id: "clearml.md";
  slug: "clearml";
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
"click-through-rate-prediction.md": {
	id: "click-through-rate-prediction.md";
  slug: "click-through-rate-prediction";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"clickable.md": {
	id: "clickable.md";
  slug: "clickable";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"clickhouse.md": {
	id: "clickhouse.md";
  slug: "clickhouse";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cline.md": {
	id: "cline.md";
  slug: "cline";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"clipwing.md": {
	id: "clipwing.md";
  slug: "clipwing";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"clojure.md": {
	id: "clojure.md";
  slug: "clojure";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cloud-canal.md": {
	id: "cloud-canal.md";
  slug: "cloud-canal";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cloud-devops-infra.md": {
	id: "cloud-devops-infra.md";
  slug: "cloud-devops-infra";
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
"cloud-infrastructure.md": {
	id: "cloud-infrastructure.md";
  slug: "cloud-infrastructure";
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
"cmd-ai.md": {
	id: "cmd-ai.md";
  slug: "cmd-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cml.md": {
	id: "cml.md";
  slug: "cml";
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
"co-dev.md": {
	id: "co-dev.md";
  slug: "co-dev";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"co-here.md": {
	id: "co-here.md";
  slug: "co-here";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"coco-annotator.md": {
	id: "coco-annotator.md";
  slug: "coco-annotator";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"code-chatgpt-plugin.md": {
	id: "code-chatgpt-plugin.md";
  slug: "code-chatgpt-plugin";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"code-collator.md": {
	id: "code-collator.md";
  slug: "code-collator";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"code-generation-lm-evaluation-harness.md": {
	id: "code-generation-lm-evaluation-harness.md";
  slug: "code-generation-lm-evaluation-harness";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"code-interpreter-api.md": {
	id: "code-interpreter-api.md";
  slug: "code-interpreter-api";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"code-review-gpt.md": {
	id: "code-review-gpt.md";
  slug: "code-review-gpt";
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
"code-to-flow.md": {
	id: "code-to-flow.md";
  slug: "code-to-flow";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"code.md": {
	id: "code.md";
  slug: "code";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"codeant-ai.md": {
	id: "codeant-ai.md";
  slug: "codeant-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"codecademy-s-data-science.md": {
	id: "codecademy-s-data-science.md";
  slug: "codecademy-s-data-science";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"codecomplete.md": {
	id: "codecomplete.md";
  slug: "codecomplete";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"codeflash-ai.md": {
	id: "codeflash-ai.md";
  slug: "codeflash-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"codeflash.md": {
	id: "codeflash.md";
  slug: "codeflash";
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
"codegeex.md": {
	id: "codegeex.md";
  slug: "codegeex";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"codegen.md": {
	id: "codegen.md";
  slug: "codegen";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"codegpt-nvim.md": {
	id: "codegpt-nvim.md";
  slug: "codegpt-nvim";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"codeium.md": {
	id: "codeium.md";
  slug: "codeium";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"codel.md": {
	id: "codel.md";
  slug: "codel";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"codemate.md": {
	id: "codemate.md";
  slug: "codemate";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"codepal.md": {
	id: "codepal.md";
  slug: "codepal";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"codeparrot.md": {
	id: "codeparrot.md";
  slug: "codeparrot";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"coderabbit.md": {
	id: "coderabbit.md";
  slug: "coderabbit";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"codereviewbot.md": {
	id: "codereviewbot.md";
  slug: "codereviewbot";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"codespaces-template.md": {
	id: "codespaces-template.md";
  slug: "codespaces-template";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"codesquire.md": {
	id: "codesquire.md";
  slug: "codesquire";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"codestory.md": {
	id: "codestory.md";
  slug: "codestory";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"codewp.md": {
	id: "codewp.md";
  slug: "codewp";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"codiga.md": {
	id: "codiga.md";
  slug: "codiga";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"codiumai.md": {
	id: "codiumai.md";
  slug: "codiumai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cognita.md": {
	id: "cognita.md";
  slug: "cognita";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cognitive-class-ai-by-ibm.md": {
	id: "cognitive-class-ai-by-ibm.md";
  slug: "cognitive-class-ai-by-ibm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cogram.md": {
	id: "cogram.md";
  slug: "cogram";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cohere-summarize-beta.md": {
	id: "cohere-summarize-beta.md";
  slug: "cohere-summarize-beta";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"collosalai-chat.md": {
	id: "collosalai-chat.md";
  slug: "collosalai-chat";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"colossyan.md": {
	id: "colossyan.md";
  slug: "colossyan";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"comet.md": {
	id: "comet.md";
  slug: "comet";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"comfyui.md": {
	id: "comfyui.md";
  slug: "comfyui";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"comics.md": {
	id: "comics.md";
  slug: "comics";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"communities.md": {
	id: "communities.md";
  slug: "communities";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"community-lawyer.md": {
	id: "community-lawyer.md";
  slug: "community-lawyer";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"comp3222-comp6246-machine-learning-technologies.md": {
	id: "comp3222-comp6246-machine-learning-technologies.md";
  slug: "comp3222-comp6246-machine-learning-technologies";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"compass.md": {
	id: "compass.md";
  slug: "compass";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"compose-ai.md": {
	id: "compose-ai.md";
  slug: "compose-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"computer-vision-cv.md": {
	id: "computer-vision-cv.md";
  slug: "computer-vision-cv";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"computer-vision.md": {
	id: "computer-vision.md";
  slug: "computer-vision";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"concepts.md": {
	id: "concepts.md";
  slug: "concepts";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"conduit8.md": {
	id: "conduit8.md";
  slug: "conduit8";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"conference-scheduling.md": {
	id: "conference-scheduling.md";
  slug: "conference-scheduling";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"conferences.md": {
	id: "conferences.md";
  slug: "conferences";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"consensus.md": {
	id: "consensus.md";
  slug: "consensus";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"construct.md": {
	id: "construct.md";
  slug: "construct";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"contenda.md": {
	id: "contenda.md";
  slug: "contenda";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"context-data.md": {
	id: "context-data.md";
  slug: "context-data";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"contextmcp.md": {
	id: "contextmcp.md";
  slug: "contextmcp";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"continue.md": {
	id: "continue.md";
  slug: "continue";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"contractbook.md": {
	id: "contractbook.md";
  slug: "contractbook";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"contrastive-learning.md": {
	id: "contrastive-learning.md";
  slug: "contrastive-learning";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"contribute.md": {
	id: "contribute.md";
  slug: "contribute";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"contributing.md": {
	id: "contributing.md";
  slug: "contributing";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"convertigo.md": {
	id: "convertigo.md";
  slug: "convertigo";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"convex-optimization.md": {
	id: "convex-optimization.md";
  slug: "convex-optimization";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"copy-ai.md": {
	id: "copy-ai.md";
  slug: "copy-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"copysmith.md": {
	id: "copysmith.md";
  slug: "copysmith";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"coqui.md": {
	id: "coqui.md";
  slug: "coqui";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"core-areas.md": {
	id: "core-areas.md";
  slug: "core-areas";
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
"corenet.md": {
	id: "corenet.md";
  slug: "corenet";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"corenlp.md": {
	id: "corenlp.md";
  slug: "corenlp";
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
"corgea.md": {
	id: "corgea.md";
  slug: "corgea";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cosine.md": {
	id: "cosine.md";
  slug: "cosine";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cosmos.md": {
	id: "cosmos.md";
  slug: "cosmos";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"couler.md": {
	id: "couler.md";
  slug: "couler";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"craiyon.md": {
	id: "craiyon.md";
  slug: "craiyon";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cratecode.md": {
	id: "cratecode.md";
  slug: "cratecode";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"create-t3-turbo-ai.md": {
	id: "create-t3-turbo-ai.md";
  slug: "create-t3-turbo-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"createeasily.md": {
	id: "createeasily.md";
  slug: "createeasily";
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
"crimson-hexagon.md": {
	id: "crimson-hexagon.md";
  slug: "crimson-hexagon";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"crowdstrike-analysis.md": {
	id: "crowdstrike-analysis.md";
  slug: "crowdstrike-analysis";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"crystal.md": {
	id: "crystal.md";
  slug: "crystal";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cs-109-data-science.md": {
	id: "cs-109-data-science.md";
  slug: "cs-109-data-science";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cs-171-visualization.md": {
	id: "cs-171-visualization.md";
  slug: "cs-171-visualization";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cs25-transformers-united.md": {
	id: "cs25-transformers-united.md";
  slug: "cs25-transformers-united";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cs324-large-language-models.md": {
	id: "cs324-large-language-models.md";
  slug: "cs324-large-language-models";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"css-picker.md": {
	id: "css-picker.md";
  slug: "css-picker";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"csv-ai.md": {
	id: "csv-ai.md";
  slug: "csv-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cursor.md": {
	id: "cursor.md";
  slug: "cursor";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"custompod-io.md": {
	id: "custompod-io.md";
  slug: "custompod-io";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cv-people.md": {
	id: "cv-people.md";
  slug: "cv-people";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cv2.md": {
	id: "cv2.md";
  slug: "cv2";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cvat.md": {
	id: "cvat.md";
  slug: "cvat";
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
"d-id.md": {
	id: "d-id.md";
  slug: "d-id";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"dagster.md": {
	id: "dagster.md";
  slug: "dagster";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"dall-e-2.md": {
	id: "dall-e-2.md";
  slug: "dall-e-2";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"dall-e-3.md": {
	id: "dall-e-3.md";
  slug: "dall-e-3";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"dalle-prompt-book.md": {
	id: "dalle-prompt-book.md";
  slug: "dalle-prompt-book";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"dalle2.md": {
	id: "dalle2.md";
  slug: "dalle2";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"darklang.md": {
	id: "darklang.md";
  slug: "darklang";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"darts.md": {
	id: "darts.md";
  slug: "darts";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"daruy.md": {
	id: "daruy.md";
  slug: "daruy";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"dashbase.md": {
	id: "dashbase.md";
  slug: "dashbase";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"data-analysis-tools.md": {
	id: "data-analysis-tools.md";
  slug: "data-analysis-tools";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"data-analytics.md": {
	id: "data-analytics.md";
  slug: "data-analytics";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"data-augmentation.md": {
	id: "data-augmentation.md";
  slug: "data-augmentation";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"data-fetcher.md": {
	id: "data-fetcher.md";
  slug: "data-fetcher";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"data-formulator.md": {
	id: "data-formulator.md";
  slug: "data-formulator";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"data-science-cartoons.md": {
	id: "data-science-cartoons.md";
  slug: "data-science-cartoons";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"data-science-competitions.md": {
	id: "data-science-competitions.md";
  slug: "data-science-competitions";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"data-science-course-by-ibm.md": {
	id: "data-science-course-by-ibm.md";
  slug: "data-science-course-by-ibm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"data-science-degree-berkeley.md": {
	id: "data-science-degree-berkeley.md";
  slug: "data-science-degree-berkeley";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"data-science-degree-uva.md": {
	id: "data-science-degree-uva.md";
  slug: "data-science-degree-uva";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"data-science-degree-wisconsin.md": {
	id: "data-science-degree-wisconsin.md";
  slug: "data-science-degree-wisconsin";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"data-science-journal.md": {
	id: "data-science-journal.md";
  slug: "data-science-journal";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"data-science-skill-tree.md": {
	id: "data-science-skill-tree.md";
  slug: "data-science-skill-tree";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"data-science-specialization.md": {
	id: "data-science-specialization.md";
  slug: "data-science-specialization";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"data-science-statistics-machine-learning.md": {
	id: "data-science-statistics-machine-learning.md";
  slug: "data-science-statistics-machine-learning";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"data-science-the-xkcd-edition.md": {
	id: "data-science-the-xkcd-edition.md";
  slug: "data-science-the-xkcd-edition";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"data-science-trello-board.md": {
	id: "data-science-trello-board.md";
  slug: "data-science-trello-board";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"data-science.md": {
	id: "data-science.md";
  slug: "data-science";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"data-scientist-with-python.md": {
	id: "data-scientist-with-python.md";
  slug: "data-scientist-with-python";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"data-scientist-with-r.md": {
	id: "data-scientist-with-r.md";
  slug: "data-scientist-with-r";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"data.md": {
	id: "data.md";
  slug: "data";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"datachad.md": {
	id: "datachad.md";
  slug: "datachad";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"dataflowmapper.md": {
	id: "dataflowmapper.md";
  slug: "dataflowmapper";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"datahub.md": {
	id: "datahub.md";
  slug: "datahub";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"dataline.md": {
	id: "dataline.md";
  slug: "dataline";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"datapup.md": {
	id: "datapup.md";
  slug: "datapup";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"datatalks-club.md": {
	id: "datatalks-club.md";
  slug: "datatalks-club";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"datatau-com-news.md": {
	id: "datatau-com-news.md";
  slug: "datatau-com-news";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"datatrove.md": {
	id: "datatrove.md";
  slug: "datatrove";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"datature.md": {
	id: "datature.md";
  slug: "datature";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"datawars.md": {
	id: "datawars.md";
  slug: "datawars";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"davika.md": {
	id: "davika.md";
  slug: "davika";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"db-gpt.md": {
	id: "db-gpt.md";
  slug: "db-gpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"dbt.md": {
	id: "dbt.md";
  slug: "dbt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"dear-ai.md": {
	id: "dear-ai.md";
  slug: "dear-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"debuild.md": {
	id: "debuild.md";
  slug: "debuild";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"deep-lake.md": {
	id: "deep-lake.md";
  slug: "deep-lake";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"deep-learning-dl.md": {
	id: "deep-learning-dl.md";
  slug: "deep-learning-dl";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"deep-learning-for-graphs.md": {
	id: "deep-learning-for-graphs.md";
  slug: "deep-learning-for-graphs";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"deep-learning-in-production.md": {
	id: "deep-learning-in-production.md";
  slug: "deep-learning-in-production";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"deep-learning-interpretability.md": {
	id: "deep-learning-interpretability.md";
  slug: "deep-learning-interpretability";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"deep-learning.md": {
	id: "deep-learning.md";
  slug: "deep-learning";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"deepchecks.md": {
	id: "deepchecks.md";
  slug: "deepchecks";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"deepcode.md": {
	id: "deepcode.md";
  slug: "deepcode";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"deepdetect.md": {
	id: "deepdetect.md";
  slug: "deepdetect";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"deepeval.md": {
	id: "deepeval.md";
  slug: "deepeval";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"deepfakes.md": {
	id: "deepfakes.md";
  slug: "deepfakes";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"deepl-write.md": {
	id: "deepl-write.md";
  slug: "deepl-write";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"deeplearning-500-questions.md": {
	id: "deeplearning-500-questions.md";
  slug: "deeplearning-500-questions";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"deeplearning-ai-community.md": {
	id: "deeplearning-ai-community.md";
  slug: "deeplearning-ai-community";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"deepnote.md": {
	id: "deepnote.md";
  slug: "deepnote";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"deepseek-r1.md": {
	id: "deepseek-r1.md";
  slug: "deepseek-r1";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"deepseek-v3.md": {
	id: "deepseek-v3.md";
  slug: "deepseek-v3";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"deepspeed-mii.md": {
	id: "deepspeed-mii.md";
  slug: "deepspeed-mii";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"deepspeed.md": {
	id: "deepspeed.md";
  slug: "deepspeed";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"deepteam.md": {
	id: "deepteam.md";
  slug: "deepteam";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"deepunit.md": {
	id: "deepunit.md";
  slug: "deepunit";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"deequ.md": {
	id: "deequ.md";
  slug: "deequ";
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
"delta-lake.md": {
	id: "delta-lake.md";
  slug: "delta-lake";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"demogpt.md": {
	id: "demogpt.md";
  slug: "demogpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"deploy-llms-with-ansible.md": {
	id: "deploy-llms-with-ansible.md";
  slug: "deploy-llms-with-ansible";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"deployment-io.md": {
	id: "deployment-io.md";
  slug: "deployment-io";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"deployment-mlops.md": {
	id: "deployment-mlops.md";
  slug: "deployment-mlops";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"descript-overdub.md": {
	id: "descript-overdub.md";
  slug: "descript-overdub";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"destack.md": {
	id: "destack.md";
  slug: "destack";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"detectron2.md": {
	id: "detectron2.md";
  slug: "detectron2";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"determined.md": {
	id: "determined.md";
  slug: "determined";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"devin.md": {
	id: "devin.md";
  slug: "devin";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"devopsgpt.md": {
	id: "devopsgpt.md";
  slug: "devopsgpt";
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
"diagram.md": {
	id: "diagram.md";
  slug: "diagram";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"dialoqbase.md": {
	id: "dialoqbase.md";
  slug: "dialoqbase";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"diffblue.md": {
	id: "diffblue.md";
  slug: "diffblue";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"diffsharp.md": {
	id: "diffsharp.md";
  slug: "diffsharp";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"diffuse-the-rest.md": {
	id: "diffuse-the-rest.md";
  slug: "diffuse-the-rest";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"diffusiondb.md": {
	id: "diffusiondb.md";
  slug: "diffusiondb";
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
"digitalocean-prompt-engineering-best-practices.md": {
	id: "digitalocean-prompt-engineering-best-practices.md";
  slug: "digitalocean-prompt-engineering-best-practices";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"dingo.md": {
	id: "dingo.md";
  slug: "dingo";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"disclaimer.md": {
	id: "disclaimer.md";
  slug: "disclaimer";
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
"dittto-ai.md": {
	id: "dittto-ai.md";
  slug: "dittto-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"dl-papers.md": {
	id: "dl-papers.md";
  slug: "dl-papers";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"dl-resources.md": {
	id: "dl-resources.md";
  slug: "dl-resources";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"dl.md": {
	id: "dl.md";
  slug: "dl";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"dm-flow.md": {
	id: "dm-flow.md";
  slug: "dm-flow";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"dmwithme.md": {
	id: "dmwithme.md";
  slug: "dmwithme";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"dnn-compression-and-acceleration.md": {
	id: "dnn-compression-and-acceleration.md";
  slug: "dnn-compression-and-acceleration";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"doc-search.md": {
	id: "doc-search.md";
  slug: "doc-search";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"docarray.md": {
	id: "docarray.md";
  slug: "docarray";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"doccano.md": {
	id: "doccano.md";
  slug: "doccano";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"docnavigator.md": {
	id: "docnavigator.md";
  slug: "docnavigator";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"docsgpt.md": {
	id: "docsgpt.md";
  slug: "docsgpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"doctorgpt.md": {
	id: "doctorgpt.md";
  slug: "doctorgpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"dolt.md": {
	id: "dolt.md";
  slug: "dolt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"domain-adaptation.md": {
	id: "domain-adaptation.md";
  slug: "domain-adaptation";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"domainbed.md": {
	id: "domainbed.md";
  slug: "domainbed";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"draftbit.md": {
	id: "draftbit.md";
  slug: "draftbit";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"draggan.md": {
	id: "draggan.md";
  slug: "draggan";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"draxlr.md": {
	id: "draxlr.md";
  slug: "draxlr";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"dreamstudio.md": {
	id: "dreamstudio.md";
  slug: "dreamstudio";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"drivendata.md": {
	id: "drivendata.md";
  slug: "drivendata";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"dronahq.md": {
	id: "dronahq.md";
  slug: "dronahq";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"dspy-stanford-nlp.md": {
	id: "dspy-stanford-nlp.md";
  slug: "dspy-stanford-nlp";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"dspy.md": {
	id: "dspy.md";
  slug: "dspy";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"dstack.md": {
	id: "dstack.md";
  slug: "dstack";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"duckie.md": {
	id: "duckie.md";
  slug: "duckie";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"duetgpt.md": {
	id: "duetgpt.md";
  slug: "duetgpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"duolingo.md": {
	id: "duolingo.md";
  slug: "duolingo";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"dust.md": {
	id: "dust.md";
  slug: "dust";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"dvc.md": {
	id: "dvc.md";
  slug: "dvc";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"dvclive.md": {
	id: "dvclive.md";
  slug: "dvclive";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"dynamo.md": {
	id: "dynamo.md";
  slug: "dynamo";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"e2b-fragments.md": {
	id: "e2b-fragments.md";
  slug: "e2b-fragments";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"e2b.md": {
	id: "e2b.md";
  slug: "e2b";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"earlybird.md": {
	id: "earlybird.md";
  slug: "earlybird";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"easycode.md": {
	id: "easycode.md";
  slug: "easycode";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"easyedit.md": {
	id: "easyedit.md";
  slug: "easyedit";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"easyrec.md": {
	id: "easyrec.md";
  slug: "easyrec";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ecrett-music.md": {
	id: "ecrett-music.md";
  slug: "ecrett-music";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"edgedb.md": {
	id: "edgedb.md";
  slug: "edgedb";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"editgpt.md": {
	id: "editgpt.md";
  slug: "editgpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"edmdesigner.md": {
	id: "edmdesigner.md";
  slug: "edmdesigner";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"educational.md": {
	id: "educational.md";
  slug: "educational";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"eino.md": {
	id: "eino.md";
  slug: "eino";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ekhos-ai.md": {
	id: "ekhos-ai.md";
  slug: "ekhos-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"elephas.md": {
	id: "elephas.md";
  slug: "elephas";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"eleven-labs.md": {
	id: "eleven-labs.md";
  slug: "eleven-labs";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"elevenlabs.md": {
	id: "elevenlabs.md";
  slug: "elevenlabs";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"elicit.md": {
	id: "elicit.md";
  slug: "elicit";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"emacs-org-mode-package.md": {
	id: "emacs-org-mode-package.md";
  slug: "emacs-org-mode-package";
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
"emailtriager.md": {
	id: "emailtriager.md";
  slug: "emailtriager";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"embedanything.md": {
	id: "embedanything.md";
  slug: "embedanything";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"embedbase.md": {
	id: "embedbase.md";
  slug: "embedbase";
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
"embodied-vision.md": {
	id: "embodied-vision.md";
  slug: "embodied-vision";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"emebedded-ai.md": {
	id: "emebedded-ai.md";
  slug: "emebedded-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"emergent-mind.md": {
	id: "emergent-mind.md";
  slug: "emergent-mind";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"emilio.md": {
	id: "emilio.md";
  slug: "emilio";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"encog.md": {
	id: "encog.md";
  slug: "encog";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"enlighten-apply.md": {
	id: "enlighten-apply.md";
  slug: "enlighten-apply";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"enlighten-deep.md": {
	id: "enlighten-deep.md";
  slug: "enlighten-deep";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"enlighten-integration.md": {
	id: "enlighten-integration.md";
  slug: "enlighten-integration";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"entelligenceai.md": {
	id: "entelligenceai.md";
  slug: "entelligenceai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"envd.md": {
	id: "envd.md";
  slug: "envd";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"epjdatascience.md": {
	id: "epjdatascience.md";
  slug: "epjdatascience";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"epsilla.md": {
	id: "epsilla.md";
  slug: "epsilla";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ethics-altruistic-motives.md": {
	id: "ethics-altruistic-motives.md";
  slug: "ethics-altruistic-motives";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ethics-governance.md": {
	id: "ethics-governance.md";
  slug: "ethics-governance";
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
"evalai.md": {
	id: "evalai.md";
  slug: "evalai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"evalchemy.md": {
	id: "evalchemy.md";
  slug: "evalchemy";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"evalml.md": {
	id: "evalml.md";
  slug: "evalml";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"evalplus.md": {
	id: "evalplus.md";
  slug: "evalplus";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"evals.md": {
	id: "evals.md";
  slug: "evals";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"evalscope.md": {
	id: "evalscope.md";
  slug: "evalscope";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"evaluate.md": {
	id: "evaluate.md";
  slug: "evaluate";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"evaluation.md": {
	id: "evaluation.md";
  slug: "evaluation";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"evasion-attacks.md": {
	id: "evasion-attacks.md";
  slug: "evasion-attacks";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"event-based-vision-resources.md": {
	id: "event-based-vision-resources.md";
  slug: "event-based-vision-resources";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"everything-rag.md": {
	id: "everything-rag.md";
  slug: "everything-rag";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"evidently.md": {
	id: "evidently.md";
  slug: "evidently";
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
"exam-samurai.md": {
	id: "exam-samurai.md";
  slug: "exam-samurai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"examor.md": {
	id: "examor.md";
  slug: "examor";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"examples.md": {
	id: "examples.md";
  slug: "examples";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"excelmatic.md": {
	id: "excelmatic.md";
  slug: "excelmatic";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"exllama.md": {
	id: "exllama.md";
  slug: "exllama";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"exo.md": {
	id: "exo.md";
  slug: "exo";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"explain-your-runtime-errors-with-chatgpt.md": {
	id: "explain-your-runtime-errors-with-chatgpt.md";
  slug: "explain-your-runtime-errors-with-chatgpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"explainable-ai.md": {
	id: "explainable-ai.md";
  slug: "explainable-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"explainpaper.md": {
	id: "explainpaper.md";
  slug: "explainpaper";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"explore-by-domain.md": {
	id: "explore-by-domain.md";
  slug: "explore-by-domain";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"eyelet.md": {
	id: "eyelet.md";
  slug: "eyelet";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ezjobs.md": {
	id: "ezjobs.md";
  slug: "ezjobs";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"fabric.md": {
	id: "fabric.md";
  slug: "fabric";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"facebook-accounts.md": {
	id: "facebook-accounts.md";
  slug: "facebook-accounts";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"fact-checker.md": {
	id: "fact-checker.md";
  slug: "fact-checker";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"factory.md": {
	id: "factory.md";
  slug: "factory";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"fairlearn.md": {
	id: "fairlearn.md";
  slug: "fairlearn";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"fairseq.md": {
	id: "fairseq.md";
  slug: "fairseq";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"fairytailai.md": {
	id: "fairytailai.md";
  slug: "fairytailai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"faiss.md": {
	id: "faiss.md";
  slug: "faiss";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"faradav.md": {
	id: "faradav.md";
  slug: "faradav";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"farsite.md": {
	id: "farsite.md";
  slug: "farsite";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"fastchat.md": {
	id: "fastchat.md";
  slug: "fastchat";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"fastdatasets.md": {
	id: "fastdatasets.md";
  slug: "fastdatasets";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"fastertransformer.md": {
	id: "fastertransformer.md";
  slug: "fastertransformer";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"fastrag.md": {
	id: "fastrag.md";
  slug: "fastrag";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"fastshot.md": {
	id: "fastshot.md";
  slug: "fastshot";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"faststream.md": {
	id: "faststream.md";
  slug: "faststream";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"fate.md": {
	id: "fate.md";
  slug: "fate";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"fauxpilot.md": {
	id: "fauxpilot.md";
  slug: "fauxpilot";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"feast.md": {
	id: "feast.md";
  slug: "feast";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"feathery.md": {
	id: "feathery.md";
  slug: "feathery";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"feature-engine.md": {
	id: "feature-engine.md";
  slug: "feature-engine";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"feature-selection.md": {
	id: "feature-selection.md";
  slug: "feature-selection";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"featureform.md": {
	id: "featureform.md";
  slug: "featureform";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"featuretools.md": {
	id: "featuretools.md";
  slug: "featuretools";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"fedml.md": {
	id: "fedml.md";
  slug: "fedml";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"femtogpt.md": {
	id: "femtogpt.md";
  slug: "femtogpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"fibery.md": {
	id: "fibery.md";
  slug: "fibery";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"fiddler-ai.md": {
	id: "fiddler-ai.md";
  slug: "fiddler-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"figma.md": {
	id: "figma.md";
  slug: "figma";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"finchat.md": {
	id: "finchat.md";
  slug: "finchat";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"fine.md": {
	id: "fine.md";
  slug: "fine";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"finrobot.md": {
	id: "finrobot.md";
  slug: "finrobot";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"fire-flyer-file-system.md": {
	id: "fire-flyer-file-system.md";
  slug: "fire-flyer-file-system";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"fireflies-ai.md": {
	id: "fireflies-ai.md";
  slug: "fireflies-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"fireworksai.md": {
	id: "fireworksai.md";
  slug: "fireworksai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"firmos.md": {
	id: "firmos.md";
  slug: "firmos";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"fiverr-workspace.md": {
	id: "fiverr-workspace.md";
  slug: "fiverr-workspace";
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
"flagai.md": {
	id: "flagai.md";
  slug: "flagai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"flaml.md": {
	id: "flaml.md";
  slug: "flaml";
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
"flatfile.md": {
	id: "flatfile.md";
  slug: "flatfile";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"flexapp.md": {
	id: "flexapp.md";
  slug: "flexapp";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"flexyform.md": {
	id: "flexyform.md";
  slug: "flexyform";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"fliki.md": {
	id: "fliki.md";
  slug: "fliki";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"fliplet.md": {
	id: "fliplet.md";
  slug: "fliplet";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"flock.md": {
	id: "flock.md";
  slug: "flock";
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
"flow-xo.md": {
	id: "flow-xo.md";
  slug: "flow-xo";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"flower.md": {
	id: "flower.md";
  slug: "flower";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"flowgpt.md": {
	id: "flowgpt.md";
  slug: "flowgpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"flowise.md": {
	id: "flowise.md";
  slug: "flowise";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"flux.md": {
	id: "flux.md";
  slug: "flux";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"flyonui-mcp.md": {
	id: "flyonui-mcp.md";
  slug: "flyonui-mcp";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"flyte.md": {
	id: "flyte.md";
  slug: "flyte";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"fomo.md": {
	id: "fomo.md";
  slug: "fomo";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"forefront.md": {
	id: "forefront.md";
  slug: "forefront";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"forest-admin.md": {
	id: "forest-admin.md";
  slug: "forest-admin";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"formester.md": {
	id: "formester.md";
  slug: "formester";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"formnx.md": {
	id: "formnx.md";
  slug: "formnx";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"formstack.md": {
	id: "formstack.md";
  slug: "formstack";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"fortvision.md": {
	id: "fortvision.md";
  slug: "fortvision";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"framework.md": {
	id: "framework.md";
  slug: "framework";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"frameworks-libraries.md": {
	id: "frameworks-libraries.md";
  slug: "frameworks-libraries";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"frameworks.md": {
	id: "frameworks.md";
  slug: "frameworks";
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
"from-clawdbot-to-moltbot-to-openclaw.md": {
	id: "from-clawdbot-to-moltbot-to-openclaw.md";
  slug: "from-clawdbot-to-moltbot-to-openclaw";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"frontly.md": {
	id: "frontly.md";
  slug: "frontly";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"fructose.md": {
	id: "fructose.md";
  slug: "fructose";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"full-extension-ecosystem-guide.md": {
	id: "full-extension-ecosystem-guide.md";
  slug: "full-extension-ecosystem-guide";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"full-pyro-code.md": {
	id: "full-pyro-code.md";
  slug: "full-pyro-code";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"fullmetalai.md": {
	id: "fullmetalai.md";
  slug: "fullmetalai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"fun.md": {
	id: "fun.md";
  slug: "fun";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"funcchain.md": {
	id: "funcchain.md";
  slug: "funcchain";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"functions-tools-and-agents-with-langchain.md": {
	id: "functions-tools-and-agents-with-langchain.md";
  slug: "functions-tools-and-agents-with-langchain";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"fynix.md": {
	id: "fynix.md";
  slug: "fynix";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"fynk.md": {
	id: "fynk.md";
  slug: "fynk";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"galactica.md": {
	id: "galactica.md";
  slug: "galactica";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gali-chat.md": {
	id: "gali-chat.md";
  slug: "gali-chat";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"galileo-ai.md": {
	id: "galileo-ai.md";
  slug: "galileo-ai";
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
"gamma.md": {
	id: "gamma.md";
  slug: "gamma";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gaokao-bench.md": {
	id: "gaokao-bench.md";
  slug: "gaokao-bench";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gateway.md": {
	id: "gateway.md";
  slug: "gateway";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gdevelop.md": {
	id: "gdevelop.md";
  slug: "gdevelop";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gecco.md": {
	id: "gecco.md";
  slug: "gecco";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gemini-cli.md": {
	id: "gemini-cli.md";
  slug: "gemini-cli";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gemini.md": {
	id: "gemini.md";
  slug: "gemini";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"genei.md": {
	id: "genei.md";
  slug: "genei";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"generative-ai-a-creative-new-world.md": {
	id: "generative-ai-a-creative-new-world.md";
  slug: "generative-ai-a-creative-new-world";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"generative-ai-with-llms-deeplearning-ai-aws.md": {
	id: "generative-ai-with-llms-deeplearning-ai-aws.md";
  slug: "generative-ai-with-llms-deeplearning-ai-aws";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"generative-ai.md": {
	id: "generative-ai.md";
  slug: "generative-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"genetic-algorithms-ocw-course.md": {
	id: "genetic-algorithms-ocw-course.md";
  slug: "genetic-algorithms-ocw-course";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"geneticsharp.md": {
	id: "geneticsharp.md";
  slug: "geneticsharp";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"genie-ai-chatgpt-vs-code.md": {
	id: "genie-ai-chatgpt-vs-code.md";
  slug: "genie-ai-chatgpt-vs-code";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"genie.md": {
	id: "genie.md";
  slug: "genie";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"genkit.md": {
	id: "genkit.md";
  slug: "genkit";
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
"ggml.md": {
	id: "ggml.md";
  slug: "ggml";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ggplot2.md": {
	id: "ggplot2.md";
  slug: "ggplot2";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ghostwriter.md": {
	id: "ghostwriter.md";
  slug: "ghostwriter";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gigapixel-upscaler.md": {
	id: "gigapixel-upscaler.md";
  slug: "gigapixel-upscaler";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"giskard.md": {
	id: "giskard.md";
  slug: "giskard";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gist-ai.md": {
	id: "gist-ai.md";
  slug: "gist-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"git-clients.md": {
	id: "git-clients.md";
  slug: "git-clients";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gitbrain.md": {
	id: "gitbrain.md";
  slug: "gitbrain";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gitbutler.md": {
	id: "gitbutler.md";
  slug: "gitbutler";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gitfluence.md": {
	id: "gitfluence.md";
  slug: "gitfluence";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"github-copilot.md": {
	id: "github-copilot.md";
  slug: "github-copilot";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"github-discussions.md": {
	id: "github-discussions.md";
  slug: "github-discussions";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"github-groups.md": {
	id: "github-groups.md";
  slug: "github-groups";
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
"github-issues.md": {
	id: "github-issues.md";
  slug: "github-issues";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"github-models.md": {
	id: "github-models.md";
  slug: "github-models";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gitingest.md": {
	id: "gitingest.md";
  slug: "gitingest";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gitlab-code-suggestions.md": {
	id: "gitlab-code-suggestions.md";
  slug: "gitlab-code-suggestions";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gito.md": {
	id: "gito.md";
  slug: "gito";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gitwit.md": {
	id: "gitwit.md";
  slug: "gitwit";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"glide.md": {
	id: "glide.md";
  slug: "glide";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"glowbom.md": {
	id: "glowbom.md";
  slug: "glowbom";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"go-telegram-bot.md": {
	id: "go-telegram-bot.md";
  slug: "go-telegram-bot";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"go.md": {
	id: "go.md";
  slug: "go";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"goast.md": {
	id: "goast.md";
  slug: "goast";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gocodeo.md": {
	id: "gocodeo.md";
  slug: "gocodeo";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"golden-tensorflow.md": {
	id: "golden-tensorflow.md";
  slug: "golden-tensorflow";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gooey-ai.md": {
	id: "gooey-ai.md";
  slug: "gooey-ai";
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
"google-advanced-data-analytics-certificate.md": {
	id: "google-advanced-data-analytics-certificate.md";
  slug: "google-advanced-data-analytics-certificate";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"google-ai-studio.md": {
	id: "google-ai-studio.md";
  slug: "google-ai-studio";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"google-analytics.md": {
	id: "google-analytics.md";
  slug: "google-analytics";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"google-antigravity.md": {
	id: "google-antigravity.md";
  slug: "google-antigravity";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"google-colab.md": {
	id: "google-colab.md";
  slug: "google-colab";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"google-docs.md": {
	id: "google-docs.md";
  slug: "google-docs";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"google-flow.md": {
	id: "google-flow.md";
  slug: "google-flow";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"google-forms.md": {
	id: "google-forms.md";
  slug: "google-forms";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"google-gemini-code-assist.md": {
	id: "google-gemini-code-assist.md";
  slug: "google-gemini-code-assist";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"google-gemini-prompting-strategies.md": {
	id: "google-gemini-prompting-strategies.md";
  slug: "google-gemini-prompting-strategies";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"google-prompting-essentials.md": {
	id: "google-prompting-essentials.md";
  slug: "google-prompting-essentials";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"google-s-differential-privacy.md": {
	id: "google-s-differential-privacy.md";
  slug: "google-s-differential-privacy";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"google-sheets-formula-generator.md": {
	id: "google-sheets-formula-generator.md";
  slug: "google-sheets-formula-generator";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gopher.md": {
	id: "gopher.md";
  slug: "gopher";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gorse.md": {
	id: "gorse.md";
  slug: "gorse";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gosh.md": {
	id: "gosh.md";
  slug: "gosh";
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
"gpr.md": {
	id: "gpr.md";
  slug: "gpr";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gpt-4-chat-ui.md": {
	id: "gpt-4-chat-ui.md";
  slug: "gpt-4-chat-ui";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gpt-4-openai-research.md": {
	id: "gpt-4-openai-research.md";
  slug: "gpt-4-openai-research";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gpt-4-unlimited-tools.md": {
	id: "gpt-4-unlimited-tools.md";
  slug: "gpt-4-unlimited-tools";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gpt-4.md": {
	id: "gpt-4.md";
  slug: "gpt-4";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gpt-4o-mini.md": {
	id: "gpt-4o-mini.md";
  slug: "gpt-4o-mini";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gpt-builder.md": {
	id: "gpt-builder.md";
  slug: "gpt-builder";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gpt-cli.md": {
	id: "gpt-cli.md";
  slug: "gpt-cli";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gpt-code-ui.md": {
	id: "gpt-code-ui.md";
  slug: "gpt-code-ui";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gpt-engineer.md": {
	id: "gpt-engineer.md";
  slug: "gpt-engineer";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gpt-for-gmail.md": {
	id: "gpt-for-gmail.md";
  slug: "gpt-for-gmail";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gpt-for-sheets-and-docs.md": {
	id: "gpt-for-sheets-and-docs.md";
  slug: "gpt-for-sheets-and-docs";
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
"gpt-in-60-lines-of-numpy.md": {
	id: "gpt-in-60-lines-of-numpy.md";
  slug: "gpt-in-60-lines-of-numpy";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gpt-migrate.md": {
	id: "gpt-migrate.md";
  slug: "gpt-migrate";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gpt-pilot.md": {
	id: "gpt-pilot.md";
  slug: "gpt-pilot";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gpt-prompt-engineer.md": {
	id: "gpt-prompt-engineer.md";
  slug: "gpt-prompt-engineer";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gpt-prompter.md": {
	id: "gpt-prompter.md";
  slug: "gpt-prompter";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gpt-researcher.md": {
	id: "gpt-researcher.md";
  slug: "gpt-researcher";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gpt-voice-conversation-chatbot.md": {
	id: "gpt-voice-conversation-chatbot.md";
  slug: "gpt-voice-conversation-chatbot";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gpt-web-app-generator.md": {
	id: "gpt-web-app-generator.md";
  slug: "gpt-web-app-generator";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gpt3-blog-post-generator.md": {
	id: "gpt3-blog-post-generator.md";
  slug: "gpt3-blog-post-generator";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gpt3-wordpress-post-generator.md": {
	id: "gpt3-wordpress-post-generator.md";
  slug: "gpt3-wordpress-post-generator";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gpt4-pdf-chatbot-langchain.md": {
	id: "gpt4-pdf-chatbot-langchain.md";
  slug: "gpt4-pdf-chatbot-langchain";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gpt4all.md": {
	id: "gpt4all.md";
  slug: "gpt4all";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gptbot.md": {
	id: "gptbot.md";
  slug: "gptbot";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gptcache.md": {
	id: "gptcache.md";
  slug: "gptcache";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gptcomet.md": {
	id: "gptcomet.md";
  slug: "gptcomet";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gptdiscord.md": {
	id: "gptdiscord.md";
  slug: "gptdiscord";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gpthelp-ai.md": {
	id: "gpthelp-ai.md";
  slug: "gpthelp-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gptlocalhost.md": {
	id: "gptlocalhost.md";
  slug: "gptlocalhost";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gptstore.md": {
	id: "gptstore.md";
  slug: "gptstore";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gpustack.md": {
	id: "gpustack.md";
  slug: "gpustack";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gradgpt.md": {
	id: "gradgpt.md";
  slug: "gradgpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gradio-template.md": {
	id: "gradio-template.md";
  slug: "gradio-template";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gradio.md": {
	id: "gradio.md";
  slug: "gradio";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"grapedrop.md": {
	id: "grapedrop.md";
  slug: "grapedrop";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"graph-based-deep-learning.md": {
	id: "graph-based-deep-learning.md";
  slug: "graph-based-deep-learning";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"graph-classification.md": {
	id: "graph-classification.md";
  slug: "graph-classification";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"graph-neural-networks-gnn.md": {
	id: "graph-neural-networks-gnn.md";
  slug: "graph-neural-networks-gnn";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"graphqleditor.md": {
	id: "graphqleditor.md";
  slug: "graphqleditor";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"graphrag.md": {
	id: "graphrag.md";
  slug: "graphrag";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"graphs.md": {
	id: "graphs.md";
  slug: "graphs";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"greptile.md": {
	id: "greptile.md";
  slug: "greptile";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gretel-synthetics.md": {
	id: "gretel-synthetics.md";
  slug: "gretel-synthetics";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"griptape.md": {
	id: "griptape.md";
  slug: "griptape";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"grit.md": {
	id: "grit.md";
  slug: "grit";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"groq-ruby.md": {
	id: "groq-ruby.md";
  slug: "groq-ruby";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"guardrails-ai.md": {
	id: "guardrails-ai.md";
  slug: "guardrails-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"guardrails.md": {
	id: "guardrails.md";
  slug: "guardrails";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"guidance.md": {
	id: "guidance.md";
  slug: "guidance";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"guidellm.md": {
	id: "guidellm.md";
  slug: "guidellm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"guides.md": {
	id: "guides.md";
  slug: "guides";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"guild-ai.md": {
	id: "guild-ai.md";
  slug: "guild-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gummysearch.md": {
	id: "gummysearch.md";
  slug: "gummysearch";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gumroad.md": {
	id: "gumroad.md";
  slug: "gumroad";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"h2o-3.md": {
	id: "h2o-3.md";
  slug: "h2o-3";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"h2oai.md": {
	id: "h2oai.md";
  slug: "h2oai";
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
"habitat-sim.md": {
	id: "habitat-sim.md";
  slug: "habitat-sim";
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
"haddock.md": {
	id: "haddock.md";
  slug: "haddock";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"hailuo-ai.md": {
	id: "hailuo-ai.md";
  slug: "hailuo-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"hamilton.md": {
	id: "hamilton.md";
  slug: "hamilton";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"hammerai.md": {
	id: "hammerai.md";
  slug: "hammerai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"hands-on-train-and-deploy-ml.md": {
	id: "hands-on-train-and-deploy-ml.md";
  slug: "hands-on-train-and-deploy-ml";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"harbor.md": {
	id: "harbor.md";
  slug: "harbor";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"hardware.md": {
	id: "hardware.md";
  slug: "hardware";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"harmonai.md": {
	id: "harmonai.md";
  slug: "harmonai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"hasura.md": {
	id: "hasura.md";
  slug: "hasura";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"have-i-been-trained.md": {
	id: "have-i-been-trained.md";
  slug: "have-i-been-trained";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"havoptic.md": {
	id: "havoptic.md";
  slug: "havoptic";
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
"headlinesai-pro.md": {
	id: "headlinesai-pro.md";
  slug: "headlinesai-pro";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"hebo.md": {
	id: "hebo.md";
  slug: "hebo";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"helicone.md": {
	id: "helicone.md";
  slug: "helicone";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"helm.md": {
	id: "helm.md";
  slug: "helm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"hexabot.md": {
	id: "hexabot.md";
  slug: "hexabot";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"heyform.md": {
	id: "heyform.md";
  slug: "heyform";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"heygen.md": {
	id: "heygen.md";
  slug: "heygen";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"hipporag.md": {
	id: "hipporag.md";
  slug: "hipporag";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"holistic-evaluation-of-language-models-helm.md": {
	id: "holistic-evaluation-of-language-models-helm.md";
  slug: "holistic-evaluation-of-language-models-helm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"hopsworks-feature-store.md": {
	id: "hopsworks-feature-store.md";
  slug: "hopsworks-feature-store";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"hopsworks.md": {
	id: "hopsworks.md";
  slug: "hopsworks";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"hotjar.md": {
	id: "hotjar.md";
  slug: "hotjar";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"hour-one.md": {
	id: "hour-one.md";
  slug: "hour-one";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"how-to-contribute.md": {
	id: "how-to-contribute.md";
  slug: "how-to-contribute";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"how-to-learn-artificial-intelligence-ai.md": {
	id: "how-to-learn-artificial-intelligence-ai.md";
  slug: "how-to-learn-artificial-intelligence-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"how-to-share-data-with-a-statistician.md": {
	id: "how-to-share-data-with-a-statistician.md";
  slug: "how-to-share-data-with-a-statistician";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"https-letsenhance-io.md": {
	id: "https-letsenhance-io.md";
  slug: "https-letsenhance-io";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"hubspot.md": {
	id: "hubspot.md";
  slug: "hubspot";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"humaneval.md": {
	id: "humaneval.md";
  slug: "humaneval";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"humanloop.md": {
	id: "humanloop.md";
  slug: "humanloop";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"hunter.md": {
	id: "hunter.md";
  slug: "hunter";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"huntr-ai-resume-builder.md": {
	id: "huntr-ai-resume-builder.md";
  slug: "huntr-ai-resume-builder";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"hyperbrowser.md": {
	id: "hyperbrowser.md";
  slug: "hyperbrowser";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"hyperwrite.md": {
	id: "hyperwrite.md";
  slug: "hyperwrite";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"hypotenuse-ai.md": {
	id: "hypotenuse-ai.md";
  slug: "hypotenuse-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"hyv.md": {
	id: "hyv.md";
  slug: "hyv";
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
"ibm-2026-guide-to-prompt-engineering.md": {
	id: "ibm-2026-guide-to-prompt-engineering.md";
  slug: "ibm-2026-guide-to-prompt-engineering";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ibm-data-prep-kit.md": {
	id: "ibm-data-prep-kit.md";
  slug: "ibm-data-prep-kit";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ibm-watsonx-code-assistant-for-z.md": {
	id: "ibm-watsonx-code-assistant-for-z.md";
  slug: "ibm-watsonx-code-assistant-for-z";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"icml.md": {
	id: "icml.md";
  slug: "icml";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"icse-2025-aiware-prompt-engineering-tutorial.md": {
	id: "icse-2025-aiware-prompt-engineering-tutorial.md";
  slug: "icse-2025-aiware-prompt-engineering-tutorial";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ides.md": {
	id: "ides.md";
  slug: "ides";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ifttt.md": {
	id: "ifttt.md";
  slug: "ifttt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ignite.md": {
	id: "ignite.md";
  slug: "ignite";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"illa-cloud.md": {
	id: "illa-cloud.md";
  slug: "illa-cloud";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"im-creator.md": {
	id: "im-creator.md";
  slug: "im-creator";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"imagen.md": {
	id: "imagen.md";
  slug: "imagen";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"imbalanced-learning.md": {
	id: "imbalanced-learning.md";
  slug: "imbalanced-learning";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"imgsys.md": {
	id: "imgsys.md";
  slug: "imgsys";
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
"incognito-pilot.md": {
	id: "incognito-pilot.md";
  slug: "incognito-pilot";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"incremental-learning.md": {
	id: "incremental-learning.md";
  slug: "incremental-learning";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"infer-net.md": {
	id: "infer-net.md";
  slug: "infer-net";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"inference.md": {
	id: "inference.md";
  slug: "inference";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"infinity-ai.md": {
	id: "infinity-ai.md";
  slug: "infinity-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"infinity.md": {
	id: "infinity.md";
  slug: "infinity";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"influxdb.md": {
	id: "influxdb.md";
  slug: "influxdb";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"infographic.md": {
	id: "infographic.md";
  slug: "infographic";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"inline-help.md": {
	id: "inline-help.md";
  slug: "inline-help";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"innocentive.md": {
	id: "innocentive.md";
  slug: "innocentive";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"inspect.md": {
	id: "inspect.md";
  slug: "inspect";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"instabot.md": {
	id: "instabot.md";
  slug: "instabot";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"instapage.md": {
	id: "instapage.md";
  slug: "instapage";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"instavr.md": {
	id: "instavr.md";
  slug: "instavr";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"instill-vdp.md": {
	id: "instill-vdp.md";
  slug: "instill-vdp";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"instruct-eval.md": {
	id: "instruct-eval.md";
  slug: "instruct-eval";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"instructor.md": {
	id: "instructor.md";
  slug: "instructor";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"instrukt.md": {
	id: "instrukt.md";
  slug: "instrukt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"intelli-shell.md": {
	id: "intelli-shell.md";
  slug: "intelli-shell";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"intelliserver.md": {
	id: "intelliserver.md";
  slug: "intelliserver";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"interactivecalculator.md": {
	id: "interactivecalculator.md";
  slug: "interactivecalculator";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"internal-google-model.md": {
	id: "internal-google-model.md";
  slug: "internal-google-model";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"internal.md": {
	id: "internal.md";
  slug: "internal";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"interpretml.md": {
	id: "interpretml.md";
  slug: "interpretml";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"involve-me.md": {
	id: "involve-me.md";
  slug: "involve-me";
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
"ipex-llm.md": {
	id: "ipex-llm.md";
  slug: "ipex-llm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"is-chatgpt-175-billion-parameters-technical-analysis.md": {
	id: "is-chatgpt-175-billion-parameters-technical-analysis.md";
  slug: "is-chatgpt-175-billion-parameters-technical-analysis";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"isaaclab.md": {
	id: "isaaclab.md";
  slug: "isaaclab";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ispeech.md": {
	id: "ispeech.md";
  slug: "ispeech";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ix.md": {
	id: "ix.md";
  slug: "ix";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"jamai-base.md": {
	id: "jamai-base.md";
  slug: "jamai-base";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"jan-framework.md": {
	id: "jan-framework.md";
  slug: "jan-framework";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"jan.md": {
	id: "jan.md";
  slug: "jan";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"janai.md": {
	id: "janai.md";
  slug: "janai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"jasper-ai.md": {
	id: "jasper-ai.md";
  slug: "jasper-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"jasper.md": {
	id: "jasper.md";
  slug: "jasper";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"java.md": {
	id: "java.md";
  slug: "java";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"javascript.md": {
	id: "javascript.md";
  slug: "javascript";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"jenni.md": {
	id: "jenni.md";
  slug: "jenni";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"jeremy-howard-s-fast-ai-data-institute-certificates.md": {
	id: "jeremy-howard-s-fast-ai-data-institute-certificates.md";
  slug: "jeremy-howard-s-fast-ai-data-institute-certificates";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"jet-admin.md": {
	id: "jet-admin.md";
  slug: "jet-admin";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"jetbrains-ai.md": {
	id: "jetbrains-ai.md";
  slug: "jetbrains-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"jetbrains-ides-plugin.md": {
	id: "jetbrains-ides-plugin.md";
  slug: "jetbrains-ides-plugin";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"jetbrains-qodana.md": {
	id: "jetbrains-qodana.md";
  slug: "jetbrains-qodana";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"jieba-php.md": {
	id: "jieba-php.md";
  slug: "jieba-php";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"jimdo.md": {
	id: "jimdo.md";
  slug: "jimdo";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"jina-serve.md": {
	id: "jina-serve.md";
  slug: "jina-serve";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"jiwer.md": {
	id: "jiwer.md";
  slug: "jiwer";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"jotform.md": {
	id: "jotform.md";
  slug: "jotform";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"journal-of-big-data.md": {
	id: "journal-of-big-data.md";
  slug: "journal-of-big-data";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"journal-of-data-science.md": {
	id: "journal-of-data-science.md";
  slug: "journal-of-data-science";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"julia-python-golang-r.md": {
	id: "julia-python-golang-r.md";
  slug: "julia-python-golang-r";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"julia.md": {
	id: "julia.md";
  slug: "julia";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"jupyter-ai.md": {
	id: "jupyter-ai.md";
  slug: "jupyter-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"just-chat.md": {
	id: "just-chat.md";
  slug: "just-chat";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"kaggle.md": {
	id: "kaggle.md";
  slug: "kaggle";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"kangas.md": {
	id: "kangas.md";
  slug: "kangas";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"kartra.md": {
	id: "kartra.md";
  slug: "kartra";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"katib.md": {
	id: "katib.md";
  slug: "katib";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"kazimir-ai.md": {
	id: "kazimir-ai.md";
  slug: "kazimir-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"kedro.md": {
	id: "kedro.md";
  slug: "kedro";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"keepsake.md": {
	id: "keepsake.md";
  slug: "keepsake";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"keploy.md": {
	id: "keploy.md";
  slug: "keploy";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"keyla-ai.md": {
	id: "keyla-ai.md";
  slug: "keyla-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"khan-academy.md": {
	id: "khan-academy.md";
  slug: "khan-academy";
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
"kiln.md": {
	id: "kiln.md";
  slug: "kiln";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"kilo-code.md": {
	id: "kilo-code.md";
  slug: "kilo-code";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"kimi-k2.md": {
	id: "kimi-k2.md";
  slug: "kimi-k2";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"kiro.md": {
	id: "kiro.md";
  slug: "kiro";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"kirokuforms.md": {
	id: "kirokuforms.md";
  slug: "kirokuforms";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"kitops.md": {
	id: "kitops.md";
  slug: "kitops";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"kling-ai.md": {
	id: "kling-ai.md";
  slug: "kling-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"klingai.md": {
	id: "klingai.md";
  slug: "klingai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"knowledge-gpt.md": {
	id: "knowledge-gpt.md";
  slug: "knowledge-gpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"knowledge.md": {
	id: "knowledge.md";
  slug: "knowledge";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"knowledge3d-k3d.md": {
	id: "knowledge3d-k3d.md";
  slug: "knowledge3d-k3d";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"kombai.md": {
	id: "kombai.md";
  slug: "kombai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"komo-ai.md": {
	id: "komo-ai.md";
  slug: "komo-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"komo.md": {
	id: "komo.md";
  slug: "komo";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"kornia.md": {
	id: "kornia.md";
  slug: "kornia";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"kosmik.md": {
	id: "kosmik.md";
  slug: "kosmik";
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
"krea.md": {
	id: "krea.md";
  slug: "krea";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"krfuzzycmeans-algorithm.md": {
	id: "krfuzzycmeans-algorithm.md";
  slug: "krfuzzycmeans-algorithm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"krhebbian-algorithm.md": {
	id: "krhebbian-algorithm.md";
  slug: "krhebbian-algorithm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"krkmeans-algorithm.md": {
	id: "krkmeans-algorithm.md";
  slug: "krkmeans-algorithm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"kserve.md": {
	id: "kserve.md";
  slug: "kserve";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ktransformers.md": {
	id: "ktransformers.md";
  slug: "ktransformers";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"kubeflow.md": {
	id: "kubeflow.md";
  slug: "kubeflow";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"kushoai.md": {
	id: "kushoai.md";
  slug: "kushoai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"label-noise.md": {
	id: "label-noise.md";
  slug: "label-noise";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"label-studio.md": {
	id: "label-studio.md";
  slug: "label-studio";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"lagent.md": {
	id: "lagent.md";
  slug: "lagent";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"laika.md": {
	id: "laika.md";
  slug: "laika";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"lakefs.md": {
	id: "lakefs.md";
  slug: "lakefs";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"laminar.md": {
	id: "laminar.md";
  slug: "laminar";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"landbot.md": {
	id: "landbot.md";
  slug: "landbot";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"landing-ai.md": {
	id: "landing-ai.md";
  slug: "landing-ai";
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
"langchain-chat-websocket.md": {
	id: "langchain-chat-websocket.md";
  slug: "langchain-chat-websocket";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"langchain-chat.md": {
	id: "langchain-chat.md";
  slug: "langchain-chat";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"langchain-chatchat.md": {
	id: "langchain-chatchat.md";
  slug: "langchain-chatchat";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"langchain-go.md": {
	id: "langchain-go.md";
  slug: "langchain-go";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"langchain-hs.md": {
	id: "langchain-hs.md";
  slug: "langchain-hs";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"langchain-js-llm-template.md": {
	id: "langchain-js-llm-template.md";
  slug: "langchain-js-llm-template";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"langchain-js.md": {
	id: "langchain-js.md";
  slug: "langchain-js";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"langchain-rust.md": {
	id: "langchain-rust.md";
  slug: "langchain-rust";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"langchain-text-summarizer.md": {
	id: "langchain-text-summarizer.md";
  slug: "langchain-text-summarizer";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"langchain-yt-tools.md": {
	id: "langchain-yt-tools.md";
  slug: "langchain-yt-tools";
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
"langchain4j.md": {
	id: "langchain4j.md";
  slug: "langchain4j";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"langchaindart.md": {
	id: "langchaindart.md";
  slug: "langchaindart";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"langchainrb.md": {
	id: "langchainrb.md";
  slug: "langchainrb";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"langextract.md": {
	id: "langextract.md";
  slug: "langextract";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"langfa-st.md": {
	id: "langfa-st.md";
  slug: "langfa-st";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"langflow.md": {
	id: "langflow.md";
  slug: "langflow";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"langfuse.md": {
	id: "langfuse.md";
  slug: "langfuse";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"langmagic.md": {
	id: "langmagic.md";
  slug: "langmagic";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"langroid.md": {
	id: "langroid.md";
  slug: "langroid";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"langserve.md": {
	id: "langserve.md";
  slug: "langserve";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"langsmith.md": {
	id: "langsmith.md";
  slug: "langsmith";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"langstream.md": {
	id: "langstream.md";
  slug: "langstream";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"langtest.md": {
	id: "langtest.md";
  slug: "langtest";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"langtrace.md": {
	id: "langtrace.md";
  slug: "langtrace";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"language-model-evaluation-harness.md": {
	id: "language-model-evaluation-harness.md";
  slug: "language-model-evaluation-harness";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"langwatch.md": {
	id: "langwatch.md";
  slug: "langwatch";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"large-language-model-training-in-2023.md": {
	id: "large-language-model-training-in-2023.md";
  slug: "large-language-model-training-in-2023";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"large-language-models.md": {
	id: "large-language-models.md";
  slug: "large-language-models";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"lavender.md": {
	id: "lavender.md";
  slug: "lavender";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"lavis.md": {
	id: "lavis.md";
  slug: "lavis";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"layer.md": {
	id: "layer.md";
  slug: "layer";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"lazyllm.md": {
	id: "lazyllm.md";
  slug: "lazyllm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"leaderboard-by-lmsys-org.md": {
	id: "leaderboard-by-lmsys-org.md";
  slug: "leaderboard-by-lmsys-org";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"leadpages.md": {
	id: "leadpages.md";
  slug: "leadpages";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"leap-new.md": {
	id: "leap-new.md";
  slug: "leap-new";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"learn-prompting-learnprompting-org.md": {
	id: "learn-prompting-learnprompting-org.md";
  slug: "learn-prompting-learnprompting-org";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"learn-prompting.md": {
	id: "learn-prompting.md";
  slug: "learn-prompting";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"learning-from-data.md": {
	id: "learning-from-data.md";
  slug: "learning-from-data";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"learning-resources.md": {
	id: "learning-resources.md";
  slug: "learning-resources";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"learning.md": {
	id: "learning.md";
  slug: "learning";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"legacy-content-full-index.md": {
	id: "legacy-content-full-index.md";
  slug: "legacy-content-full-index";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"lemmy.md": {
	id: "lemmy.md";
  slug: "lemmy";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"lepton-ai.md": {
	id: "lepton-ai.md";
  slug: "lepton-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"lesswrong.md": {
	id: "lesswrong.md";
  slug: "lesswrong";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"lex.md": {
	id: "lex.md";
  slug: "lex";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"lexica.md": {
	id: "lexica.md";
  slug: "lexica";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"libcom.md": {
	id: "libcom.md";
  slug: "libcom";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"libra-tk.md": {
	id: "libra-tk.md";
  slug: "libra-tk";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"libraire.md": {
	id: "libraire.md";
  slug: "libraire";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"librechat.md": {
	id: "librechat.md";
  slug: "librechat";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"liger-kernel.md": {
	id: "liger-kernel.md";
  slug: "liger-kernel";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"lighteval.md": {
	id: "lighteval.md";
  slug: "lighteval";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"lightllm.md": {
	id: "lightllm.md";
  slug: "lightllm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"lightly.md": {
	id: "lightly.md";
  slug: "lightly";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"lightlytrain.md": {
	id: "lightlytrain.md";
  slug: "lightlytrain";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"lightrag.md": {
	id: "lightrag.md";
  slug: "lightrag";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"lil-bots.md": {
	id: "lil-bots.md";
  slug: "lil-bots";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"lilian-weng-s-prompt-engineering-guide.md": {
	id: "lilian-weng-s-prompt-engineering-guide.md";
  slug: "lilian-weng-s-prompt-engineering-guide";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"linear-algebra.md": {
	id: "linear-algebra.md";
  slug: "linear-algebra";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"liner-ai.md": {
	id: "liner-ai.md";
  slug: "liner-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"links.md": {
	id: "links.md";
  slug: "links";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"linkz-ai.md": {
	id: "linkz-ai.md";
  slug: "linkz-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"linx.md": {
	id: "linx.md";
  slug: "linx";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"listomatic.md": {
	id: "listomatic.md";
  slug: "listomatic";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"litechain.md": {
	id: "litechain.md";
  slug: "litechain";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"litellm.md": {
	id: "litellm.md";
  slug: "litellm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"literally-anything.md": {
	id: "literally-anything.md";
  slug: "literally-anything";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"literature-and-media.md": {
	id: "literature-and-media.md";
  slug: "literature-and-media";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"litgpt.md": {
	id: "litgpt.md";
  slug: "litgpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"litserve.md": {
	id: "litserve.md";
  slug: "litserve";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"llama-2.md": {
	id: "llama-2.md";
  slug: "llama-2";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"llama-agents.md": {
	id: "llama-agents.md";
  slug: "llama-agents";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"llama-cpp-agent.md": {
	id: "llama-cpp-agent.md";
  slug: "llama-cpp-agent";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"llama-cpp.md": {
	id: "llama-cpp.md";
  slug: "llama-cpp";
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
"llamachat.md": {
	id: "llamachat.md";
  slug: "llamachat";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"llamacoder.md": {
	id: "llamacoder.md";
  slug: "llamacoder";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"llamaindex.md": {
	id: "llamaindex.md";
  slug: "llamaindex";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"llfn.md": {
	id: "llfn.md";
  slug: "llfn";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"llm-agents.md": {
	id: "llm-agents.md";
  slug: "llm-agents";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"llm-app.md": {
	id: "llm-app.md";
  slug: "llm-app";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"llm-as-a-chatbot-service.md": {
	id: "llm-as-a-chatbot-service.md";
  slug: "llm-as-a-chatbot-service";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"llm-chain.md": {
	id: "llm-chain.md";
  slug: "llm-chain";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"llm-course.md": {
	id: "llm-course.md";
  slug: "llm-course";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"llm-leaderboard.md": {
	id: "llm-leaderboard.md";
  slug: "llm-leaderboard";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"llm-powered-autonomous-agents.md": {
	id: "llm-powered-autonomous-agents.md";
  slug: "llm-powered-autonomous-agents";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"llm-rl-visualized-en.md": {
	id: "llm-rl-visualized-en.md";
  slug: "llm-rl-visualized-en";
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
"llm-ui.md": {
	id: "llm-ui.md";
  slug: "llm-ui";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"llm.md": {
	id: "llm.md";
  slug: "llm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"llmcord-py.md": {
	id: "llmcord-py.md";
  slug: "llmcord-py";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"llmfarm.md": {
	id: "llmfarm.md";
  slug: "llmfarm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"llmflow.md": {
	id: "llmflow.md";
  slug: "llmflow";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"llmperf.md": {
	id: "llmperf.md";
  slug: "llmperf";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"llmstack.md": {
	id: "llmstack.md";
  slug: "llmstack";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"llmware.md": {
	id: "llmware.md";
  slug: "llmware";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"llocalsearch.md": {
	id: "llocalsearch.md";
  slug: "llocalsearch";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"lm-evaluation-harness.md": {
	id: "lm-evaluation-harness.md";
  slug: "lm-evaluation-harness";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"lm-studio.md": {
	id: "lm-studio.md";
  slug: "lm-studio";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"lmdeploy.md": {
	id: "lmdeploy.md";
  slug: "lmdeploy";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"lmms-eval.md": {
	id: "lmms-eval.md";
  slug: "lmms-eval";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"lmql.md": {
	id: "lmql.md";
  slug: "lmql";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"lmscript.md": {
	id: "lmscript.md";
  slug: "lmscript";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"lobe-chat.md": {
	id: "lobe-chat.md";
  slug: "lobe-chat";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"local-gpt.md": {
	id: "local-gpt.md";
  slug: "local-gpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"local-llm-npc.md": {
	id: "local-llm-npc.md";
  slug: "local-llm-npc";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"localai.md": {
	id: "localai.md";
  slug: "localai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"localforge.md": {
	id: "localforge.md";
  slug: "localforge";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"lofo-importance.md": {
	id: "lofo-importance.md";
  slug: "lofo-importance";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"logic-apps.md": {
	id: "logic-apps.md";
  slug: "logic-apps";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"logicballs.md": {
	id: "logicballs.md";
  slug: "logicballs";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"looksmax-ai.md": {
	id: "looksmax-ai.md";
  slug: "looksmax-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"loom.md": {
	id: "loom.md";
  slug: "loom";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"loopin-ai.md": {
	id: "loopin-ai.md";
  slug: "loopin-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"loopple.md": {
	id: "loopple.md";
  slug: "loopple";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"loss-function-porn.md": {
	id: "loss-function-porn.md";
  slug: "loss-function-porn";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"loudly.md": {
	id: "loudly.md";
  slug: "loudly";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"lovable.md": {
	id: "lovable.md";
  slug: "lovable";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"lovo-ai.md": {
	id: "lovo-ai.md";
  slug: "lovo-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"lowdefy.md": {
	id: "lowdefy.md";
  slug: "lowdefy";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ludwig.md": {
	id: "ludwig.md";
  slug: "ludwig";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"luigi.md": {
	id: "luigi.md";
  slug: "luigi";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"luma-dream-machine.md": {
	id: "luma-dream-machine.md";
  slug: "luma-dream-machine";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"luthor.md": {
	id: "luthor.md";
  slug: "luthor";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"lyric.md": {
	id: "lyric.md";
  slug: "lyric";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"m-s-management-data-science-leuphana.md": {
	id: "m-s-management-data-science-leuphana.md";
  slug: "m-s-management-data-science-leuphana";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"m2cgen.md": {
	id: "m2cgen.md";
  slug: "m2cgen";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mac-menubar-app.md": {
	id: "mac-menubar-app.md";
  slug: "mac-menubar-app";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"machine-learning-engineering-for-production-mlops.md": {
	id: "machine-learning-engineering-for-production-mlops.md";
  slug: "machine-learning-engineering-for-production-mlops";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"machine-learning-interpretability.md": {
	id: "machine-learning-interpretability.md";
  slug: "machine-learning-interpretability";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"machine-learning-ml.md": {
	id: "machine-learning-ml.md";
  slug: "machine-learning-ml";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"machine-learning-problems.md": {
	id: "machine-learning-problems.md";
  slug: "machine-learning-problems";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"machine-learning-system.md": {
	id: "machine-learning-system.md";
  slug: "machine-learning-system";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"machine-learning.md": {
	id: "machine-learning.md";
  slug: "machine-learning";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"machinelearning.md": {
	id: "machinelearning.md";
  slug: "machinelearning";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"machinelearningwithtensorflow2ed.md": {
	id: "machinelearningwithtensorflow2ed.md";
  slug: "machinelearningwithtensorflow2ed";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"macroscope.md": {
	id: "macroscope.md";
  slug: "macroscope";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"maestro.md": {
	id: "maestro.md";
  slug: "maestro";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mage.md": {
	id: "mage.md";
  slug: "mage";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"magentic.md": {
	id: "magentic.md";
  slug: "magentic";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"magic-patterns.md": {
	id: "magic-patterns.md";
  slug: "magic-patterns";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"magic-potion.md": {
	id: "magic-potion.md";
  slug: "magic-potion";
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
"magnet.md": {
	id: "magnet.md";
  slug: "magnet";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mailchimp.md": {
	id: "mailchimp.md";
  slug: "mailchimp";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"major-llms-data-availability.md": {
	id: "major-llms-data-availability.md";
  slug: "major-llms-data-availability";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"make-formerly-integromat.md": {
	id: "make-formerly-integromat.md";
  slug: "make-formerly-integromat";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"make-real.md": {
	id: "make-real.md";
  slug: "make-real";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"making-pre-trained-language-models-better-few-shot-learners.md": {
	id: "making-pre-trained-language-models-better-few-shot-learners.md";
  slug: "making-pre-trained-language-models-better-few-shot-learners";
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
"manifest.md": {
	id: "manifest.md";
  slug: "manifest";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"many-shot-jailbreaking.md": {
	id: "many-shot-jailbreaking.md";
  slug: "many-shot-jailbreaking";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"manychat.md": {
	id: "manychat.md";
  slug: "manychat";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"marblism.md": {
	id: "marblism.md";
  slug: "marblism";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"marimo.md": {
	id: "marimo.md";
  slug: "marimo";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"marketmuse.md": {
	id: "marketmuse.md";
  slug: "marketmuse";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"marqo.md": {
	id: "marqo.md";
  slug: "marqo";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"marquez.md": {
	id: "marquez.md";
  slug: "marquez";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"marvin.md": {
	id: "marvin.md";
  slug: "marvin";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"massive-text-embedding-benchmark.md": {
	id: "massive-text-embedding-benchmark.md";
  slug: "massive-text-embedding-benchmark";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"master-of-data-science-melbourne-university.md": {
	id: "master-of-data-science-melbourne-university.md";
  slug: "master-of-data-science-melbourne-university";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"master-of-management-analytics-queen-s-university.md": {
	id: "master-of-management-analytics-queen-s-university.md";
  slug: "master-of-management-analytics-queen-s-university";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mastra-ai.md": {
	id: "mastra-ai.md";
  slug: "mastra-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mastra.md": {
	id: "mastra.md";
  slug: "mastra";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"math-net-numerics.md": {
	id: "math-net-numerics.md";
  slug: "math-net-numerics";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mathematica.md": {
	id: "mathematica.md";
  slug: "mathematica";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mathos-ai.md": {
	id: "mathos-ai.md";
  slug: "mathos-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"matlab.md": {
	id: "matlab.md";
  slug: "matlab";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"matter-ai.md": {
	id: "matter-ai.md";
  slug: "matter-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"maxim-ai.md": {
	id: "maxim-ai.md";
  slug: "maxim-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mazaal-ai.md": {
	id: "mazaal-ai.md";
  slug: "mazaal-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mcp-adapter-plugin.md": {
	id: "mcp-adapter-plugin.md";
  slug: "mcp-adapter-plugin";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mcp-server-pr-1605.md": {
	id: "mcp-server-pr-1605.md";
  slug: "mcp-server-pr-1605";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mcp-server-pr-5121.md": {
	id: "mcp-server-pr-5121.md";
  slug: "mcp-server-pr-5121";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"meetgeek.md": {
	id: "meetgeek.md";
  slug: "meetgeek";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"megatron-lm.md": {
	id: "megatron-lm.md";
  slug: "megatron-lm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"melies.md": {
	id: "melies.md";
  slug: "melies";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"melting-pot.md": {
	id: "melting-pot.md";
  slug: "melting-pot";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"melty.md": {
	id: "melty.md";
  slug: "melty";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mem.md": {
	id: "mem.md";
  slug: "mem";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mem0.md": {
	id: "mem0.md";
  slug: "mem0";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"memary.md": {
	id: "memary.md";
  slug: "memary";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"memberspace.md": {
	id: "memberspace.md";
  slug: "memberspace";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"memex.md": {
	id: "memex.md";
  slug: "memex";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"memfree.md": {
	id: "memfree.md";
  slug: "memfree";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"memgpt.md": {
	id: "memgpt.md";
  slug: "memgpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mentat.md": {
	id: "mentat.md";
  slug: "mentat";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"merlin.md": {
	id: "merlin.md";
  slug: "merlin";
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
"meta-lingua.md": {
	id: "meta-lingua.md";
  slug: "meta-lingua";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"meta-world.md": {
	id: "meta-world.md";
  slug: "meta-world";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"metabase.md": {
	id: "metabase.md";
  slug: "metabase";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"metacat.md": {
	id: "metacat.md";
  slug: "metacat";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"metaflow.md": {
	id: "metaflow.md";
  slug: "metaflow";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"metagpt.md": {
	id: "metagpt.md";
  slug: "metagpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"metaphor.md": {
	id: "metaphor.md";
  slug: "metaphor";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"meticulous-ai.md": {
	id: "meticulous-ai.md";
  slug: "meticulous-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mftcoder.md": {
	id: "mftcoder.md";
  slug: "mftcoder";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mgl-gpr.md": {
	id: "mgl-gpr.md";
  slug: "mgl-gpr";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mgl.md": {
	id: "mgl.md";
  slug: "mgl";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"micro-agent-by-builder.md": {
	id: "micro-agent-by-builder.md";
  slug: "micro-agent-by-builder";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"microagent.md": {
	id: "microagent.md";
  slug: "microagent";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"microprediction.md": {
	id: "microprediction.md";
  slug: "microprediction";
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
"microsoft-azure-ai-fundamentals-generative-ai.md": {
	id: "microsoft-azure-ai-fundamentals-generative-ai.md";
  slug: "microsoft-azure-ai-fundamentals-generative-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"microsoft-azure-neural-tts.md": {
	id: "microsoft-azure-neural-tts.md";
  slug: "microsoft-azure-neural-tts";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"microsoft-designer.md": {
	id: "microsoft-designer.md";
  slug: "microsoft-designer";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"microsoft-power-automate.md": {
	id: "microsoft-power-automate.md";
  slug: "microsoft-power-automate";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"microsoft-professional-program-for-data-science.md": {
	id: "microsoft-professional-program-for-data-science.md";
  slug: "microsoft-professional-program-for-data-science";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"microsoft-prompt-engineering-docs.md": {
	id: "microsoft-prompt-engineering-docs.md";
  slug: "microsoft-prompt-engineering-docs";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"microsoft-prompt-engineering-in-azure-ai-studio.md": {
	id: "microsoft-prompt-engineering-in-azure-ai-studio.md";
  slug: "microsoft-prompt-engineering-in-azure-ai-studio";
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
"midjourney-discord.md": {
	id: "midjourney-discord.md";
  slug: "midjourney-discord";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"midjourney.md": {
	id: "midjourney.md";
  slug: "midjourney";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"milvus.md": {
	id: "milvus.md";
  slug: "milvus";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mindgeniusai.md": {
	id: "mindgeniusai.md";
  slug: "mindgeniusai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mindmac.md": {
	id: "mindmac.md";
  slug: "mindmac";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mindpal.md": {
	id: "mindpal.md";
  slug: "mindpal";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mindsdb.md": {
	id: "mindsdb.md";
  slug: "mindsdb";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mindsql.md": {
	id: "mindsql.md";
  slug: "mindsql";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mindstudio.md": {
	id: "mindstudio.md";
  slug: "mindstudio";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"minference.md": {
	id: "minference.md";
  slug: "minference";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mini-sglang.md": {
	id: "mini-sglang.md";
  slug: "mini-sglang";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"miniappmaker.md": {
	id: "miniappmaker.md";
  slug: "miniappmaker";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"minichain.md": {
	id: "minichain.md";
  slug: "minichain";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"minima.md": {
	id: "minima.md";
  slug: "minima";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mintdata.md": {
	id: "mintdata.md";
  slug: "mintdata";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mintlify.md": {
	id: "mintlify.md";
  slug: "mintlify";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"minusx.md": {
	id: "minusx.md";
  slug: "minusx";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mir-eval.md": {
	id: "mir-eval.md";
  slug: "mir-eval";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"misc.md": {
	id: "misc.md";
  slug: "misc";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"miscellaneous.md": {
	id: "miscellaneous.md";
  slug: "miscellaneous";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mistral-rs.md": {
	id: "mistral-rs.md";
  slug: "mistral-rs";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mit-6-s191-introduction-to-deep-learning.md": {
	id: "mit-6-s191-introduction-to-deep-learning.md";
  slug: "mit-6-s191-introduction-to-deep-learning";
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
"mixeval.md": {
	id: "mixeval.md";
  slug: "mixeval";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mixo-io.md": {
	id: "mixo-io.md";
  slug: "mixo-io";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ml-cn.md": {
	id: "ml-cn.md";
  slug: "ml-cn";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ml-metadata.md": {
	id: "ml-metadata.md";
  slug: "ml-metadata";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ml-net.md": {
	id: "ml-net.md";
  slug: "ml-net";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ml-observability-fundamentals.md": {
	id: "ml-observability-fundamentals.md";
  slug: "ml-observability-fundamentals";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ml-source-code.md": {
	id: "ml-source-code.md";
  slug: "ml-source-code";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ml-tables.md": {
	id: "ml-tables.md";
  slug: "ml-tables";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ml-workspace.md": {
	id: "ml-workspace.md";
  slug: "ml-workspace";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ml.md": {
	id: "ml.md";
  slug: "ml";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mleap.md": {
	id: "mleap.md";
  slug: "mleap";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mlem.md": {
	id: "mlem.md";
  slug: "mlem";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mlflow.md": {
	id: "mlflow.md";
  slug: "mlflow";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mljar-supervised.md": {
	id: "mljar-supervised.md";
  slug: "mljar-supervised";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mlops-deployment.md": {
	id: "mlops-deployment.md";
  slug: "mlops-deployment";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mlperf-inference.md": {
	id: "mlperf-inference.md";
  slug: "mlperf-inference";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mlpneuralnet.md": {
	id: "mlpneuralnet.md";
  slug: "mlpneuralnet";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mlreef.md": {
	id: "mlreef.md";
  slug: "mlreef";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mlrun.md": {
	id: "mlrun.md";
  slug: "mlrun";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mlserver.md": {
	id: "mlserver.md";
  slug: "mlserver";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mlsys-nyu-2022.md": {
	id: "mlsys-nyu-2022.md";
  slug: "mlsys-nyu-2022";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mm-react.md": {
	id: "mm-react.md";
  slug: "mm-react";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mnist-example-running-with-dlang.md": {
	id: "mnist-example-running-with-dlang.md";
  slug: "mnist-example-running-with-dlang";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mnn-llm.md": {
	id: "mnn-llm.md";
  slug: "mnn-llm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"moa.md": {
	id: "moa.md";
  slug: "moa";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mobile-machine-learning.md": {
	id: "mobile-machine-learning.md";
  slug: "mobile-machine-learning";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mocha.md": {
	id: "mocha.md";
  slug: "mocha";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"model-compression.md": {
	id: "model-compression.md";
  slug: "model-compression";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"modelfusion.md": {
	id: "modelfusion.md";
  slug: "modelfusion";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"models.md": {
	id: "models.md";
  slug: "models";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"moltbook.md": {
	id: "moltbook.md";
  slug: "moltbook";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"monto.md": {
	id: "monto.md";
  slug: "monto";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"moonbeam.md": {
	id: "moonbeam.md";
  slug: "moonbeam";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"more.md": {
	id: "more.md";
  slug: "more";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"morgan-stanley.md": {
	id: "morgan-stanley.md";
  slug: "morgan-stanley";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"morpher-ai.md": {
	id: "morpher-ai.md";
  slug: "morpher-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mosaicml-streaming.md": {
	id: "mosaicml-streaming.md";
  slug: "mosaicml-streaming";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mosec.md": {
	id: "mosec.md";
  slug: "mosec";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"motor-admin.md": {
	id: "motor-admin.md";
  slug: "motor-admin";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ms-in-applied-data-science-syracuse.md": {
	id: "ms-in-applied-data-science-syracuse.md";
  slug: "ms-in-applied-data-science-syracuse";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ms-in-business-analytics-asu-online.md": {
	id: "ms-in-business-analytics-asu-online.md";
  slug: "ms-in-business-analytics-asu-online";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"msty.md": {
	id: "msty.md";
  slug: "msty";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mubert.md": {
	id: "mubert.md";
  slug: "mubert";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"multi-modal-langchain-agents-in-production.md": {
	id: "multi-modal-langchain-agents-in-production.md";
  slug: "multi-modal-langchain-agents-in-production";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"multi-perceptron-neuralnetwork.md": {
	id: "multi-perceptron-neuralnetwork.md";
  slug: "multi-perceptron-neuralnetwork";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"multi-platform-desktop-app-windows-mac-linux.md": {
	id: "multi-platform-desktop-app-windows-mac-linux.md";
  slug: "multi-platform-desktop-app-windows-mac-linux";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"multimodal-machine-learning.md": {
	id: "multimodal-machine-learning.md";
  slug: "multimodal-machine-learning";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"multimodal-research.md": {
	id: "multimodal-research.md";
  slug: "multimodal-research";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"murf-ai.md": {
	id: "murf-ai.md";
  slug: "murf-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"musicgpt.md": {
	id: "musicgpt.md";
  slug: "musicgpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"musiclm.md": {
	id: "musiclm.md";
  slug: "musiclm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mutable.md": {
	id: "mutable.md";
  slug: "mutable";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mutableai.md": {
	id: "mutableai.md";
  slug: "mutableai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mutahunterai.md": {
	id: "mutahunterai.md";
  slug: "mutahunterai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mutiny.md": {
	id: "mutiny.md";
  slug: "mutiny";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"myriad.md": {
	id: "myriad.md";
  slug: "myriad";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"n8n.md": {
	id: "n8n.md";
  slug: "n8n";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"na-ve-bayes.md": {
	id: "na-ve-bayes.md";
  slug: "na-ve-bayes";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"naive-apl.md": {
	id: "naive-apl.md";
  slug: "naive-apl";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"nannyml.md": {
	id: "nannyml.md";
  slug: "nannyml";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"nanonets-airtable-models.md": {
	id: "nanonets-airtable-models.md";
  slug: "nanonets-airtable-models";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"nanotron.md": {
	id: "nanotron.md";
  slug: "nanotron";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"naologic.md": {
	id: "naologic.md";
  slug: "naologic";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"napkin.md": {
	id: "napkin.md";
  slug: "napkin";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"native-mcp-support-issue.md": {
	id: "native-mcp-support-issue.md";
  slug: "native-mcp-support-issue";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"natural-language-processing-nlp.md": {
	id: "natural-language-processing-nlp.md";
  slug: "natural-language-processing-nlp";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"nekton-ai.md": {
	id: "nekton-ai.md";
  slug: "nekton-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"nemo-curator.md": {
	id: "nemo-curator.md";
  slug: "nemo-curator";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"nemo-guardrails.md": {
	id: "nemo-guardrails.md";
  slug: "nemo-guardrails";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"nemo.md": {
	id: "nemo.md";
  slug: "nemo";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"neovim-plugin.md": {
	id: "neovim-plugin.md";
  slug: "neovim-plugin";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"neptune.md": {
	id: "neptune.md";
  slug: "neptune";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"nerf.md": {
	id: "nerf.md";
  slug: "nerf";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"net-interactive.md": {
	id: "net-interactive.md";
  slug: "net-interactive";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"netron.md": {
	id: "netron.md";
  slug: "netron";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"neural-compressor.md": {
	id: "neural-compressor.md";
  slug: "neural-compressor";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"neural-rendering.md": {
	id: "neural-rendering.md";
  slug: "neural-rendering";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"neurips2022-foundational-robustness-of-foundation-models.md": {
	id: "neurips2022-foundational-robustness-of-foundation-models.md";
  slug: "neurips2022-foundational-robustness-of-foundation-models";
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
"never-jobless-linkedin-message-generator.md": {
	id: "never-jobless-linkedin-message-generator.md";
  slug: "never-jobless-linkedin-message-generator";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"nexus-ai.md": {
	id: "nexus-ai.md";
  slug: "nexus-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ngt.md": {
	id: "ngt.md";
  slug: "ngt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"nightcafe.md": {
	id: "nightcafe.md";
  slug: "nightcafe";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"nimbalyst.md": {
	id: "nimbalyst.md";
  slug: "nimbalyst";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ninox.md": {
	id: "ninox.md";
  slug: "ninox";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"nlintz-tensorflow-tutorials.md": {
	id: "nlintz-tensorflow-tutorials.md";
  slug: "nlintz-tensorflow-tutorials";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"nlp-course.md": {
	id: "nlp-course.md";
  slug: "nlp-course";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"nlp-datasets.md": {
	id: "nlp-datasets.md";
  slug: "nlp-datasets";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"nlp-paper.md": {
	id: "nlp-paper.md";
  slug: "nlp-paper";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"nlp-progress.md": {
	id: "nlp-progress.md";
  slug: "nlp-progress";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"nlp-reading-group.md": {
	id: "nlp-reading-group.md";
  slug: "nlp-reading-group";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"nlp.md": {
	id: "nlp.md";
  slug: "nlp";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"nlpir.md": {
	id: "nlpir.md";
  slug: "nlpir";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"nmslib.md": {
	id: "nmslib.md";
  slug: "nmslib";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"nndeploy.md": {
	id: "nndeploy.md";
  slug: "nndeploy";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"nnef.md": {
	id: "nnef.md";
  slug: "nnef";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"noam-chomsky-the-false-promise-of-chatgpt.md": {
	id: "noam-chomsky-the-false-promise-of-chatgpt.md";
  slug: "noam-chomsky-the-false-promise-of-chatgpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"nocodb.md": {
	id: "nocodb.md";
  slug: "nocodb";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"node-red.md": {
	id: "node-red.md";
  slug: "node-red";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"notion-ai.md": {
	id: "notion-ai.md";
  slug: "notion-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"notion-qa.md": {
	id: "notion-qa.md";
  slug: "notion-qa";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"notion.md": {
	id: "notion.md";
  slug: "notion";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"notionapps.md": {
	id: "notionapps.md";
  slug: "notionapps";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"notte.md": {
	id: "notte.md";
  slug: "notte";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"nova.md": {
	id: "nova.md";
  slug: "nova";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"novacura.md": {
	id: "novacura.md";
  slug: "novacura";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"nuaaxq-point-cloud-analysis.md": {
	id: "nuaaxq-point-cloud-analysis.md";
  slug: "nuaaxq-point-cloud-analysis";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"nuclino.md": {
	id: "nuclino.md";
  slug: "nuclino";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"nuclio.md": {
	id: "nuclio.md";
  slug: "nuclio";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"nudge-ai.md": {
	id: "nudge-ai.md";
  slug: "nudge-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"numl.md": {
	id: "numl.md";
  slug: "numl";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"nussknacker.md": {
	id: "nussknacker.md";
  slug: "nussknacker";
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
"nvidia-omniverse-ai-animal-explorer-extension.md": {
	id: "nvidia-omniverse-ai-animal-explorer-extension.md";
  slug: "nvidia-omniverse-ai-animal-explorer-extension";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"obsidian-copilot-auto-completion.md": {
	id: "obsidian-copilot-auto-completion.md";
  slug: "obsidian-copilot-auto-completion";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"octomind.md": {
	id: "octomind.md";
  slug: "octomind";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"octoparse.md": {
	id: "octoparse.md";
  slug: "octoparse";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ogb.md": {
	id: "ogb.md";
  slug: "ogb";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ollama-grid-search.md": {
	id: "ollama-grid-search.md";
  slug: "ollama-grid-search";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ollama.md": {
	id: "ollama.md";
  slug: "ollama";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"olmo-eval.md": {
	id: "olmo-eval.md";
  slug: "olmo-eval";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"oml.md": {
	id: "oml.md";
  slug: "oml";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"onboard.md": {
	id: "onboard.md";
  slug: "onboard";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"one-ai.md": {
	id: "one-ai.md";
  slug: "one-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"onecompiler.md": {
	id: "onecompiler.md";
  slug: "onecompiler";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"oneke.md": {
	id: "oneke.md";
  slug: "oneke";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"onnx.md": {
	id: "onnx.md";
  slug: "onnx";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"onout.md": {
	id: "onout.md";
  slug: "onout";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"oobabooga.md": {
	id: "oobabooga.md";
  slug: "oobabooga";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"opacus.md": {
	id: "opacus.md";
  slug: "opacus";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"open-agent.md": {
	id: "open-agent.md";
  slug: "open-agent";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"open-data-science.md": {
	id: "open-data-science.md";
  slug: "open-data-science";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"open-interpreter.md": {
	id: "open-interpreter.md";
  slug: "open-interpreter";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"open-llm-leaderboard-by-hugging-face.md": {
	id: "open-llm-leaderboard-by-hugging-face.md";
  slug: "open-llm-leaderboard-by-hugging-face";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"open-notebook.md": {
	id: "open-notebook.md";
  slug: "open-notebook";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"open-r1.md": {
	id: "open-r1.md";
  slug: "open-r1";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"open-set-recognition.md": {
	id: "open-set-recognition.md";
  slug: "open-set-recognition";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"open-webui.md": {
	id: "open-webui.md";
  slug: "open-webui";
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
"openagi.md": {
	id: "openagi.md";
  slug: "openagi";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"openai-api-documentation.md": {
	id: "openai-api-documentation.md";
  slug: "openai-api-documentation";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"openai-api.md": {
	id: "openai-api.md";
  slug: "openai-api";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"openai-codex-cli.md": {
	id: "openai-codex-cli.md";
  slug: "openai-codex-cli";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"openai-codex.md": {
	id: "openai-codex.md";
  slug: "openai-codex";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"openai-cookbook.md": {
	id: "openai-cookbook.md";
  slug: "openai-cookbook";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"openai-developer-community.md": {
	id: "openai-developer-community.md";
  slug: "openai-developer-community";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"openai-discord.md": {
	id: "openai-discord.md";
  slug: "openai-discord";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"openai-downtime-monitor.md": {
	id: "openai-downtime-monitor.md";
  slug: "openai-downtime-monitor";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"openai-evals.md": {
	id: "openai-evals.md";
  slug: "openai-evals";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"openai-gpt-4-1-prompting-guide.md": {
	id: "openai-gpt-4-1-prompting-guide.md";
  slug: "openai-gpt-4-1-prompting-guide";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"openai-o3-mini.md": {
	id: "openai-o3-mini.md";
  slug: "openai-o3-mini";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"openai-playground.md": {
	id: "openai-playground.md";
  slug: "openai-playground";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"openai-plugins.md": {
	id: "openai-plugins.md";
  slug: "openai-plugins";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"openai-prompt-engineering-guide.md": {
	id: "openai-prompt-engineering-guide.md";
  slug: "openai-prompt-engineering-guide";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"openai.md": {
	id: "openai.md";
  slug: "openai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"openart.md": {
	id: "openart.md";
  slug: "openart";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"openchat.md": {
	id: "openchat.md";
  slug: "openchat";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"openclaw-adopts-kimi-k2-5-and-minimax.md": {
	id: "openclaw-adopts-kimi-k2-5-and-minimax.md";
  slug: "openclaw-adopts-kimi-k2-5-and-minimax";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"openclaw-and-the-ai-threshold-effect.md": {
	id: "openclaw-and-the-ai-threshold-effect.md";
  slug: "openclaw-and-the-ai-threshold-effect";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"openclaw-clawhub.md": {
	id: "openclaw-clawhub.md";
  slug: "openclaw-clawhub";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"openclaw-documentation.md": {
	id: "openclaw-documentation.md";
  slug: "openclaw-documentation";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"openclaw-github.md": {
	id: "openclaw-github.md";
  slug: "openclaw-github";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"openclaw-releases.md": {
	id: "openclaw-releases.md";
  slug: "openclaw-releases";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"openclaw-showcase.md": {
	id: "openclaw-showcase.md";
  slug: "openclaw-showcase";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"openclaw-skills.md": {
	id: "openclaw-skills.md";
  slug: "openclaw-skills";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"openclaw-vs-openmanus.md": {
	id: "openclaw-vs-openmanus.md";
  slug: "openclaw-vs-openmanus";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"openclaw-website.md": {
	id: "openclaw-website.md";
  slug: "openclaw-website";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"openclaw.md": {
	id: "openclaw.md";
  slug: "openclaw";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"opencompass.md": {
	id: "opencompass.md";
  slug: "opencompass";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"opencreator.md": {
	id: "opencreator.md";
  slug: "opencreator";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"opendan.md": {
	id: "opendan.md";
  slug: "opendan";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"opendevin.md": {
	id: "opendevin.md";
  slug: "opendevin";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"openfl.md": {
	id: "openfl.md";
  slug: "openfl";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"openintro.md": {
	id: "openintro.md";
  slug: "openintro";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"openlit.md": {
	id: "openlit.md";
  slug: "openlit";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"openllm.md": {
	id: "openllm.md";
  slug: "openllm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"openllmetry.md": {
	id: "openllmetry.md";
  slug: "openllmetry";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"openlm.md": {
	id: "openlm.md";
  slug: "openlm";
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
"openplayground.md": {
	id: "openplayground.md";
  slug: "openplayground";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"openrail-m-v1.md": {
	id: "openrail-m-v1.md";
  slug: "openrail-m-v1";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"openrouter-llm-rankings.md": {
	id: "openrouter-llm-rankings.md";
  slug: "openrouter-llm-rankings";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"openrouter.md": {
	id: "openrouter.md";
  slug: "openrouter";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"openvino.md": {
	id: "openvino.md";
  slug: "openvino";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"openwork.md": {
	id: "openwork.md";
  slug: "openwork";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"opik.md": {
	id: "opik.md";
  slug: "opik";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"oplim.md": {
	id: "oplim.md";
  slug: "oplim";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"opsgpt.md": {
	id: "opsgpt.md";
  slug: "opsgpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"opt.md": {
	id: "opt.md";
  slug: "opt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"optillm.md": {
	id: "optillm.md";
  slug: "optillm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"optuna.md": {
	id: "optuna.md";
  slug: "optuna";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"org-ai.md": {
	id: "org-ai.md";
  slug: "org-ai";
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
"oss-vizier.md": {
	id: "oss-vizier.md";
  slug: "oss-vizier";
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
"other-awesome-lists.md": {
	id: "other-awesome-lists.md";
  slug: "other-awesome-lists";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"other-research-topics.md": {
	id: "other-research-topics.md";
  slug: "other-research-topics";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"otter-ai.md": {
	id: "otter-ai.md";
  slug: "otter-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"outcode.md": {
	id: "outcode.md";
  slug: "outcode";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"outfunnel.md": {
	id: "outfunnel.md";
  slug: "outfunnel";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"outlines.md": {
	id: "outlines.md";
  slug: "outlines";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"overcooked-ai.md": {
	id: "overcooked-ai.md";
  slug: "overcooked-ai";
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
"oxford-deep-learning.md": {
	id: "oxford-deep-learning.md";
  slug: "oxford-deep-learning";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"oxford-machine-learning.md": {
	id: "oxford-machine-learning.md";
  slug: "oxford-machine-learning";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pachyderm.md": {
	id: "pachyderm.md";
  slug: "pachyderm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pagerly.md": {
	id: "pagerly.md";
  slug: "pagerly";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pagexl.md": {
	id: "pagexl.md";
  slug: "pagexl";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pair.md": {
	id: "pair.md";
  slug: "pair";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"paper-qa.md": {
	id: "paper-qa.md";
  slug: "paper-qa";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"paperform.md": {
	id: "paperform.md";
  slug: "paperform";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"papermill.md": {
	id: "papermill.md";
  slug: "papermill";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"papers.md": {
	id: "papers.md";
  slug: "papers";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"parabola.md": {
	id: "parabola.md";
  slug: "parabola";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"parsehub.md": {
	id: "parsehub.md";
  slug: "parsehub";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"parsel.md": {
	id: "parsel.md";
  slug: "parsel";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"paypal.md": {
	id: "paypal.md";
  slug: "paypal";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pearai.md": {
	id: "pearai.md";
  slug: "pearai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"peft.md": {
	id: "peft.md";
  slug: "peft";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"penetration-testing-findings-generator.md": {
	id: "penetration-testing-findings-generator.md";
  slug: "penetration-testing-findings-generator";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"penpot.md": {
	id: "penpot.md";
  slug: "penpot";
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
"perch-reader.md": {
	id: "perch-reader.md";
  slug: "perch-reader";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"perfect-codes.md": {
	id: "perfect-codes.md";
  slug: "perfect-codes";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"perpetual.md": {
	id: "perpetual.md";
  slug: "perpetual";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"perplexity-ai.md": {
	id: "perplexity-ai.md";
  slug: "perplexity-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"personaforce.md": {
	id: "personaforce.md";
  slug: "personaforce";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"personalitychatbot.md": {
	id: "personalitychatbot.md";
  slug: "personalitychatbot";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"perspective.md": {
	id: "perspective.md";
  slug: "perspective";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"persuva.md": {
	id: "persuva.md";
  slug: "persuva";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"petals.md": {
	id: "petals.md";
  slug: "petals";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pfa.md": {
	id: "pfa.md";
  slug: "pfa";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pgvector.md": {
	id: "pgvector.md";
  slug: "pgvector";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"phantombuster.md": {
	id: "phantombuster.md";
  slug: "phantombuster";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"phidata.md": {
	id: "phidata.md";
  slug: "phidata";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"phind.md": {
	id: "phind.md";
  slug: "phind";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"phoenix.md": {
	id: "phoenix.md";
  slug: "phoenix";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"photoroom.md": {
	id: "photoroom.md";
  slug: "photoroom";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"phrasee.md": {
	id: "phrasee.md";
  slug: "phrasee";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"phygital.md": {
	id: "phygital.md";
  slug: "phygital";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pico.md": {
	id: "pico.md";
  slug: "pico";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pictory.md": {
	id: "pictory.md";
  slug: "pictory";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pieces.md": {
	id: "pieces.md";
  slug: "pieces";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pika.md": {
	id: "pika.md";
  slug: "pika";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pinecone.md": {
	id: "pinecone.md";
  slug: "pinecone";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pineify.md": {
	id: "pineify.md";
  slug: "pineify";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pipecat.md": {
	id: "pipecat.md";
  slug: "pipecat";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pipedream.md": {
	id: "pipedream.md";
  slug: "pipedream";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pixee.md": {
	id: "pixee.md";
  slug: "pixee";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pixeltable.md": {
	id: "pixeltable.md";
  slug: "pixeltable";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pkmital-tensorflow-tutorials.md": {
	id: "pkmital-tensorflow-tutorials.md";
  slug: "pkmital-tensorflow-tutorials";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"plandex.md": {
	id: "plandex.md";
  slug: "plandex";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"plant-an-app.md": {
	id: "plant-an-app.md";
  slug: "plant-an-app";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"play-ht.md": {
	id: "play-ht.md";
  slug: "play-ht";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ploomber.md": {
	id: "ploomber.md";
  slug: "ploomber";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"plugin-documentation.md": {
	id: "plugin-documentation.md";
  slug: "plugin-documentation";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pmml.md": {
	id: "pmml.md";
  slug: "pmml";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"podcast-ai.md": {
	id: "podcast-ai.md";
  slug: "podcast-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"podia.md": {
	id: "podia.md";
  slug: "podia";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"podify-io.md": {
	id: "podify-io.md";
  slug: "podify-io";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"poe.md": {
	id: "poe.md";
  slug: "poe";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"poisoning-attacks.md": {
	id: "poisoning-attacks.md";
  slug: "poisoning-attacks";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"polyaxon.md": {
	id: "polyaxon.md";
  slug: "polyaxon";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"polymet.md": {
	id: "polymet.md";
  slug: "polymet";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"polynote.md": {
	id: "polynote.md";
  slug: "polynote";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"poolside.md": {
	id: "poolside.md";
  slug: "poolside";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"poorcoder.md": {
	id: "poorcoder.md";
  slug: "poorcoder";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"poplarml.md": {
	id: "poplarml.md";
  slug: "poplarml";
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
"portkey.md": {
	id: "portkey.md";
  slug: "portkey";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"postcards.md": {
	id: "postcards.md";
  slug: "postcards";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"postgraphile.md": {
	id: "postgraphile.md";
  slug: "postgraphile";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"postgresml.md": {
	id: "postgresml.md";
  slug: "postgresml";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"posthog.md": {
	id: "posthog.md";
  slug: "posthog";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"postwise.md": {
	id: "postwise.md";
  slug: "postwise";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"potpie.md": {
	id: "potpie.md";
  slug: "potpie";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"powerinfer.md": {
	id: "powerinfer.md";
  slug: "powerinfer";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pr-agent.md": {
	id: "pr-agent.md";
  slug: "pr-agent";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pr-agents.md": {
	id: "pr-agents.md";
  slug: "pr-agents";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pr-explainer-bot.md": {
	id: "pr-explainer-bot.md";
  slug: "pr-explainer-bot";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"praisonai.md": {
	id: "praisonai.md";
  slug: "praisonai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"predibase.md": {
	id: "predibase.md";
  slug: "predibase";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"prediction-guard.md": {
	id: "prediction-guard.md";
  slug: "prediction-guard";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"predictionbuilder.md": {
	id: "predictionbuilder.md";
  slug: "predictionbuilder";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"prefect-core.md": {
	id: "prefect-core.md";
  slug: "prefect-core";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"presentations.md": {
	id: "presentations.md";
  slug: "presentations";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"presspulse-ai.md": {
	id: "presspulse-ai.md";
  slug: "presspulse-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"prima-cpp.md": {
	id: "prima-cpp.md";
  slug: "prima-cpp";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"prime.md": {
	id: "prime.md";
  slug: "prime";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"princeton-understanding-large-language-models.md": {
	id: "princeton-understanding-large-language-models.md";
  slug: "princeton-understanding-large-language-models";
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
"privacygpt.md": {
	id: "privacygpt.md";
  slug: "privacygpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"private-gpt.md": {
	id: "private-gpt.md";
  slug: "private-gpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"privategpt.md": {
	id: "privategpt.md";
  slug: "privategpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"process-mining-data-science-in-action.md": {
	id: "process-mining-data-science-in-action.md";
  slug: "process-mining-data-science-in-action";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"programmieren-f-r-germanist-innen.md": {
	id: "programmieren-f-r-germanist-innen.md";
  slug: "programmieren-f-r-germanist-innen";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"programming-languages.md": {
	id: "programming-languages.md";
  slug: "programming-languages";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"programming-with-julia.md": {
	id: "programming-with-julia.md";
  slug: "programming-with-julia";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"prometheus-eval.md": {
	id: "prometheus-eval.md";
  slug: "prometheus-eval";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"prompt-engineering-for-vision-models.md": {
	id: "prompt-engineering-for-vision-models.md";
  slug: "prompt-engineering-for-vision-models";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"prompt-engineering-guide-dair-ai-promptingguide-ai.md": {
	id: "prompt-engineering-guide-dair-ai-promptingguide-ai.md";
  slug: "prompt-engineering-guide-dair-ai-promptingguide-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"prompt-engineering-guide.md": {
	id: "prompt-engineering-guide.md";
  slug: "prompt-engineering-guide";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"prompt-engineering-specialization-vanderbilt.md": {
	id: "prompt-engineering-specialization-vanderbilt.md";
  slug: "prompt-engineering-specialization-vanderbilt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"prompt-engineering.md": {
	id: "prompt-engineering.md";
  slug: "prompt-engineering";
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
"prompt2model.md": {
	id: "prompt2model.md";
  slug: "prompt2model";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"promptbase.md": {
	id: "promptbase.md";
  slug: "promptbase";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"promptbench.md": {
	id: "promptbench.md";
  slug: "promptbench";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"promptext.md": {
	id: "promptext.md";
  slug: "promptext";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"promptfoo.md": {
	id: "promptfoo.md";
  slug: "promptfoo";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"promptform-run-gpt-in-bulk.md": {
	id: "promptform-run-gpt-in-bulk.md";
  slug: "promptform-run-gpt-in-bulk";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"prompthero.md": {
	id: "prompthero.md";
  slug: "prompthero";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"promptify.md": {
	id: "promptify.md";
  slug: "promptify";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"promptlib.md": {
	id: "promptlib.md";
  slug: "promptlib";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"promptly.md": {
	id: "promptly.md";
  slug: "promptly";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"promptpal.md": {
	id: "promptpal.md";
  slug: "promptpal";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"promptperfect.md": {
	id: "promptperfect.md";
  slug: "promptperfect";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"promptslab-discord.md": {
	id: "promptslab-discord.md";
  slug: "promptslab-discord";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"promptslab.md": {
	id: "promptslab.md";
  slug: "promptslab";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"promptsource.md": {
	id: "promptsource.md";
  slug: "promptsource";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"prompttools.md": {
	id: "prompttools.md";
  slug: "prompttools";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"publicprompts.md": {
	id: "publicprompts.md";
  slug: "publicprompts";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"publish7.md": {
	id: "publish7.md";
  slug: "publish7";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pulsepost.md": {
	id: "pulsepost.md";
  slug: "pulsepost";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pycaret.md": {
	id: "pycaret.md";
  slug: "pycaret";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pycodeagi.md": {
	id: "pycodeagi.md";
  slug: "pycodeagi";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pygpt.md": {
	id: "pygpt.md";
  slug: "pygpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pyod.md": {
	id: "pyod.md";
  slug: "pyod";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pyro-examples-air-attend-infer-repeat.md": {
	id: "pyro-examples-air-attend-infer-repeat.md";
  slug: "pyro-examples-air-attend-infer-repeat";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pyro-examples-bayesian-optimization.md": {
	id: "pyro-examples-bayesian-optimization.md";
  slug: "pyro-examples-bayesian-optimization";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pyro-examples-bayesian-regression.md": {
	id: "pyro-examples-bayesian-regression.md";
  slug: "pyro-examples-bayesian-regression";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pyro-examples-deep-markov-model.md": {
	id: "pyro-examples-deep-markov-model.md";
  slug: "pyro-examples-deep-markov-model";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pyro-examples-full-examples.md": {
	id: "pyro-examples-full-examples.md";
  slug: "pyro-examples-full-examples";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pyro-examples-gaussian-process.md": {
	id: "pyro-examples-gaussian-process.md";
  slug: "pyro-examples-gaussian-process";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pyro-examples-gmm.md": {
	id: "pyro-examples-gmm.md";
  slug: "pyro-examples-gmm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pyro-examples-semi-supervised-ve.md": {
	id: "pyro-examples-semi-supervised-ve.md";
  slug: "pyro-examples-semi-supervised-ve";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pyro-examples-variational-autoencoders.md": {
	id: "pyro-examples-variational-autoencoders.md";
  slug: "pyro-examples-variational-autoencoders";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pysyft.md": {
	id: "pysyft.md";
  slug: "pysyft";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"python-for-data-science-by-scaler.md": {
	id: "python-for-data-science-by-scaler.md";
  slug: "python-for-data-science-by-scaler";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"python-for-data-science-foundation-course.md": {
	id: "python-for-data-science-foundation-course.md";
  slug: "python-for-data-science-foundation-course";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"python.md": {
	id: "python.md";
  slug: "python";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pythonizr.md": {
	id: "pythonizr.md";
  slug: "pythonizr";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"qa-pilot.md": {
	id: "qa-pilot.md";
  slug: "qa-pilot";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"qabot.md": {
	id: "qabot.md";
  slug: "qabot";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"qdrant.md": {
	id: "qdrant.md";
  slug: "qdrant";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"qnimgpt.md": {
	id: "qnimgpt.md";
  slug: "qnimgpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"qodo-pr-agent.md": {
	id: "qodo-pr-agent.md";
  slug: "qodo-pr-agent";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"qodo.md": {
	id: "qodo.md";
  slug: "qodo";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"quack-ai.md": {
	id: "quack-ai.md";
  slug: "quack-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"quanto.md": {
	id: "quanto.md";
  slug: "quanto";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"quantum-ml.md": {
	id: "quantum-ml.md";
  slug: "quantum-ml";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"quantus.md": {
	id: "quantus.md";
  slug: "quantus";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"quick-base.md": {
	id: "quick-base.md";
  slug: "quick-base";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"quick-creator.md": {
	id: "quick-creator.md";
  slug: "quick-creator";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"quillbot.md": {
	id: "quillbot.md";
  slug: "quillbot";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"quilt.md": {
	id: "quilt.md";
  slug: "quilt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"quip.md": {
	id: "quip.md";
  slug: "quip";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"quiver.md": {
	id: "quiver.md";
  slug: "quiver";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"quivr.md": {
	id: "quivr.md";
  slug: "quivr";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"qurate.md": {
	id: "qurate.md";
  slug: "qurate";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"qwen2-5-max.md": {
	id: "qwen2-5-max.md";
  slug: "qwen2-5-max";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"r-chatgpt-discord.md": {
	id: "r-chatgpt-discord.md";
  slug: "r-chatgpt-discord";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"r2r.md": {
	id: "r2r.md";
  slug: "r2r";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"rabbitholes-ai.md": {
	id: "rabbitholes-ai.md";
  slug: "rabbitholes-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"rag-fit.md": {
	id: "rag-fit.md";
  slug: "rag-fit";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ragaai-catalyst.md": {
	id: "ragaai-catalyst.md";
  slug: "ragaai-catalyst";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ragas.md": {
	id: "ragas.md";
  slug: "ragas";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ragflow.md": {
	id: "ragflow.md";
  slug: "ragflow";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ragxplorer.md": {
	id: "ragxplorer.md";
  slug: "ragxplorer";
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
"ramalama.md": {
	id: "ramalama.md";
  slug: "ramalama";
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
"rapidpages.md": {
	id: "rapidpages.md";
  slug: "rapidpages";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"rapidtextai.md": {
	id: "rapidtextai.md";
  slug: "rapidtextai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"rasagpt.md": {
	id: "rasagpt.md";
  slug: "rasagpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"raycast-extension-unofficial.md": {
	id: "raycast-extension-unofficial.md";
  slug: "raycast-extension-unofficial";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"read-ai.md": {
	id: "read-ai.md";
  slug: "read-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"real-time-network.md": {
	id: "real-time-network.md";
  slug: "real-time-network";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"rebillion-ai.md": {
	id: "rebillion-ai.md";
  slug: "rebillion-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"recall.md": {
	id: "recall.md";
  slug: "recall";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"recast-studio.md": {
	id: "recast-studio.md";
  slug: "recast-studio";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"recommender-systems.md": {
	id: "recommender-systems.md";
  slug: "recommender-systems";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"recommenders.md": {
	id: "recommenders.md";
  slug: "recommenders";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"recurse-ml.md": {
	id: "recurse-ml.md";
  slug: "recurse-ml";
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
"redash.md": {
	id: "redash.md";
  slug: "redash";
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
"refact-ai.md": {
	id: "refact-ai.md";
  slug: "refact-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"reference-materials.md": {
	id: "reference-materials.md";
  slug: "reference-materials";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"refinder-ai.md": {
	id: "refinder-ai.md";
  slug: "refinder-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"refinery.md": {
	id: "refinery.md";
  slug: "refinery";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"rellm.md": {
	id: "rellm.md";
  slug: "rellm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"rember.md": {
	id: "rember.md";
  slug: "rember";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"remusic.md": {
	id: "remusic.md";
  slug: "remusic";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"rendernet.md": {
	id: "rendernet.md";
  slug: "rendernet";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"rendition-create.md": {
	id: "rendition-create.md";
  slug: "rendition-create";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"rephrase-ai.md": {
	id: "rephrase-ai.md";
  slug: "rephrase-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"replit-ghostwriter-chat.md": {
	id: "replit-ghostwriter-chat.md";
  slug: "replit-ghostwriter-chat";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"replit-ghostwriter.md": {
	id: "replit-ghostwriter.md";
  slug: "replit-ghostwriter";
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
"repochat.md": {
	id: "repochat.md";
  slug: "repochat";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"repomix.md": {
	id: "repomix.md";
  slug: "repomix";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"rerun.md": {
	id: "rerun.md";
  slug: "rerun";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"researchers.md": {
	id: "researchers.md";
  slug: "researchers";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"resemble-ai.md": {
	id: "resemble-ai.md";
  slug: "resemble-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"resharper.md": {
	id: "resharper.md";
  slug: "resharper";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"resources.md": {
	id: "resources.md";
  slug: "resources";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"respeecher.md": {
	id: "respeecher.md";
  slug: "respeecher";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"responsevault.md": {
	id: "responsevault.md";
  slug: "responsevault";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"restgpt.md": {
	id: "restgpt.md";
  slug: "restgpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"resumedive.md": {
	id: "resumedive.md";
  slug: "resumedive";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"retool.md": {
	id: "retool.md";
  slug: "retool";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"rewardbench.md": {
	id: "rewardbench.md";
  slug: "rewardbench";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"rewardful.md": {
	id: "rewardful.md";
  slug: "rewardful";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"rewind.md": {
	id: "rewind.md";
  slug: "rewind";
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
"riffo.md": {
	id: "riffo.md";
  slug: "riffo";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"rigging.md": {
	id: "rigging.md";
  slug: "rigging";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"risingwave.md": {
	id: "risingwave.md";
  slug: "risingwave";
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
"rivet.md": {
	id: "rivet.md";
  slug: "rivet";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"rlbench.md": {
	id: "rlbench.md";
  slug: "rlbench";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"rmarkdown.md": {
	id: "rmarkdown.md";
  slug: "rmarkdown";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"robby-chatbot.md": {
	id: "robby-chatbot.md";
  slug: "robby-chatbot";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"robocorp.md": {
	id: "robocorp.md";
  slug: "robocorp";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"robosuite.md": {
	id: "robosuite.md";
  slug: "robosuite";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"robotics.md": {
	id: "robotics.md";
  slug: "robotics";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"roboverse.md": {
	id: "roboverse.md";
  slug: "roboverse";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"roocode.md": {
	id: "roocode.md";
  slug: "roocode";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"rosie.md": {
	id: "rosie.md";
  slug: "rosie";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"roundtable-mcp-server.md": {
	id: "roundtable-mcp-server.md";
  slug: "roundtable-mcp-server";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"rubberduck.md": {
	id: "rubberduck.md";
  slug: "rubberduck";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"rubix-ml.md": {
	id: "rubix-ml.md";
  slug: "rubix-ml";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"rulai.md": {
	id: "rulai.md";
  slug: "rulai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"runanywhere.md": {
	id: "runanywhere.md";
  slug: "runanywhere";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"runcell.md": {
	id: "runcell.md";
  slug: "runcell";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"runway.md": {
	id: "runway.md";
  slug: "runway";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"runwayml.md": {
	id: "runwayml.md";
  slug: "runwayml";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"rupert-ai.md": {
	id: "rupert-ai.md";
  slug: "rupert-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"rysa-ai.md": {
	id: "rysa-ai.md";
  slug: "rysa-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"rytr.md": {
	id: "rytr.md";
  slug: "rytr";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"s2ds.md": {
	id: "s2ds.md";
  slug: "s2ds";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"sacred.md": {
	id: "sacred.md";
  slug: "sacred";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"safer-ai-agents-compared.md": {
	id: "safer-ai-agents-compared.md";
  slug: "safer-ai-agents-compared";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"safetensors.md": {
	id: "safetensors.md";
  slug: "safetensors";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"safurai.md": {
	id: "safurai.md";
  slug: "safurai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"salesagent-chat.md": {
	id: "salesagent-chat.md";
  slug: "salesagent-chat";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"salesflare.md": {
	id: "salesflare.md";
  slug: "salesflare";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"salesforce-codegen.md": {
	id: "salesforce-codegen.md";
  slug: "salesforce-codegen";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"sauna.md": {
	id: "sauna.md";
  slug: "sauna";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"saws.md": {
	id: "saws.md";
  slug: "saws";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"scala.md": {
	id: "scala.md";
  slug: "scala";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"scale-spellbook.md": {
	id: "scale-spellbook.md";
  slug: "scale-spellbook";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"scaler-data-science-machine-learning-program.md": {
	id: "scaler-data-science-machine-learning-program.md";
  slug: "scaler-data-science-machine-learning-program";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"scenario.md": {
	id: "scenario.md";
  slug: "scenario";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"scispace.md": {
	id: "scispace.md";
  slug: "scispace";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"scite.md": {
	id: "scite.md";
  slug: "scite";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"screenzy.md": {
	id: "screenzy.md";
  slug: "screenzy";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"scribbl.md": {
	id: "scribbl.md";
  slug: "scribbl";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"scribepal.md": {
	id: "scribepal.md";
  slug: "scribepal";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"scrollhub.md": {
	id: "scrollhub.md";
  slug: "scrollhub";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"sdv.md": {
	id: "sdv.md";
  slug: "sdv";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"seagoat.md": {
	id: "seagoat.md";
  slug: "seagoat";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"seal-llm-leaderboard.md": {
	id: "seal-llm-leaderboard.md";
  slug: "seal-llm-leaderboard";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"search-with-lepton.md": {
	id: "search-with-lepton.md";
  slug: "search-with-lepton";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"search.md": {
	id: "search.md";
  slug: "search";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"searchgpt-connecting-chatgpt-with-the-internet.md": {
	id: "searchgpt-connecting-chatgpt-with-the-internet.md";
  slug: "searchgpt-connecting-chatgpt-with-the-internet";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"sebastian-thrun-s-introduction-to-machine-learning.md": {
	id: "sebastian-thrun-s-introduction-to-machine-learning.md";
  slug: "sebastian-thrun-s-introduction-to-machine-learning";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"second-brain-ai-agent.md": {
	id: "second-brain-ai-agent.md";
  slug: "second-brain-ai-agent";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"second-dev.md": {
	id: "second-dev.md";
  slug: "second-dev";
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
"seede-ai.md": {
	id: "seede-ai.md";
  slug: "seede-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"segmentation-saliency-detection.md": {
	id: "segmentation-saliency-detection.md";
  slug: "segmentation-saliency-detection";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"seldon-core.md": {
	id: "seldon-core.md";
  slug: "seldon-core";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"selfies-with-sama.md": {
	id: "selfies-with-sama.md";
  slug: "selfies-with-sama";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"semantic-kernel.md": {
	id: "semantic-kernel.md";
  slug: "semantic-kernel";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"semantic-segmentation-editor.md": {
	id: "semantic-segmentation-editor.md";
  slug: "semantic-segmentation-editor";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"sematic.md": {
	id: "sematic.md";
  slug: "sematic";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"semi-supervised-learning.md": {
	id: "semi-supervised-learning.md";
  slug: "semi-supervised-learning";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"sendgrid.md": {
	id: "sendgrid.md";
  slug: "sendgrid";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"seqio.md": {
	id: "seqio.md";
  slug: "seqio";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"serge.md": {
	id: "serge.md";
  slug: "serge";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"serverless-telegram-bot.md": {
	id: "serverless-telegram-bot.md";
  slug: "serverless-telegram-bot";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"services.md": {
	id: "services.md";
  slug: "services";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"seventh-sense.md": {
	id: "seventh-sense.md";
  slug: "seventh-sense";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"sglang.md": {
	id: "sglang.md";
  slug: "sglang";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"shadcn-studio-mcp.md": {
	id: "shadcn-studio-mcp.md";
  slug: "shadcn-studio-mcp";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"shap.md": {
	id: "shap.md";
  slug: "shap";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"shapash.md": {
	id: "shapash.md";
  slug: "shapash";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"sharegpt-permenent-links-to-your-conversations.md": {
	id: "sharegpt-permenent-links-to-your-conversations.md";
  slug: "sharegpt-permenent-links-to-your-conversations";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"sharegpt.md": {
	id: "sharegpt.md";
  slug: "sharegpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"sheet2site.md": {
	id: "sheet2site.md";
  slug: "sheet2site";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"shell-assistants.md": {
	id: "shell-assistants.md";
  slug: "shell-assistants";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"shell-pilot.md": {
	id: "shell-pilot.md";
  slug: "shell-pilot";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"shell-whiz.md": {
	id: "shell-whiz.md";
  slug: "shell-whiz";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ship.md": {
	id: "ship.md";
  slug: "ship";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"sho.md": {
	id: "sho.md";
  slug: "sho";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"shopify.md": {
	id: "shopify.md";
  slug: "shopify";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"shortvideogen.md": {
	id: "shortvideogen.md";
  slug: "shortvideogen";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"shotstack-workflows.md": {
	id: "shotstack-workflows.md";
  slug: "shotstack-workflows";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"shy-editor.md": {
	id: "shy-editor.md";
  slug: "shy-editor";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"sim.md": {
	id: "sim.md";
  slug: "sim";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"simple-analytics.md": {
	id: "simple-analytics.md";
  slug: "simple-analytics";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"simple-evals.md": {
	id: "simple-evals.md";
  slug: "simple-evals";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"simple-scraper.md": {
	id: "simple-scraper.md";
  slug: "simple-scraper";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"simpleaichat.md": {
	id: "simpleaichat.md";
  slug: "simpleaichat";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"simplerenv.md": {
	id: "simplerenv.md";
  slug: "simplerenv";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"simplescraper.md": {
	id: "simplescraper.md";
  slug: "simplescraper";
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
"singlebasecloud.md": {
	id: "singlebasecloud.md";
  slug: "singlebasecloud";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"sisif.md": {
	id: "sisif.md";
  slug: "sisif";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"sitegpt.md": {
	id: "sitegpt.md";
  slug: "sitegpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"sitespeakai.md": {
	id: "sitespeakai.md";
  slug: "sitespeakai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"skaffold.md": {
	id: "skaffold.md";
  slug: "skaffold";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"skills-sh.md": {
	id: "skills-sh.md";
  slug: "skills-sh";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"skyagi.md": {
	id: "skyagi.md";
  slug: "skyagi";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"skypilot.md": {
	id: "skypilot.md";
  slug: "skypilot";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"slam.md": {
	id: "slam.md";
  slug: "slam";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"slideswizard.md": {
	id: "slideswizard.md";
  slug: "slideswizard";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"smart-connections.md": {
	id: "smart-connections.md";
  slug: "smart-connections";
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
"smartgpt.md": {
	id: "smartgpt.md";
  slug: "smartgpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"smartly-io.md": {
	id: "smartly-io.md";
  slug: "smartly-io";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"smartpilot.md": {
	id: "smartpilot.md";
  slug: "smartpilot";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"smartxml.md": {
	id: "smartxml.md";
  slug: "smartxml";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"smarty-gpt.md": {
	id: "smarty-gpt.md";
  slug: "smarty-gpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"smmry.md": {
	id: "smmry.md";
  slug: "smmry";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"smol-developer.md": {
	id: "smol-developer.md";
  slug: "smol-developer";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"smooch.md": {
	id: "smooch.md";
  slug: "smooch";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"snakemake.md": {
	id: "snakemake.md";
  slug: "snakemake";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"sniffbench.md": {
	id: "sniffbench.md";
  slug: "sniffbench";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"snippet-generators.md": {
	id: "snippet-generators.md";
  slug: "snippet-generators";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"snowchat.md": {
	id: "snowchat.md";
  slug: "snowchat";
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
"socialize.md": {
	id: "socialize.md";
  slug: "socialize";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"socialsonic.md": {
	id: "socialsonic.md";
  slug: "socialsonic";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"softgen.md": {
	id: "softgen.md";
  slug: "softgen";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"software.md": {
	id: "software.md";
  slug: "software";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"solidgpt.md": {
	id: "solidgpt.md";
  slug: "solidgpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"solr-apache-solr.md": {
	id: "solr-apache-solr.md";
  slug: "solr-apache-solr";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"sora.md": {
	id: "sora.md";
  slug: "sora";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"soundful.md": {
	id: "soundful.md";
  slug: "soundful";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"soundraw.md": {
	id: "soundraw.md";
  slug: "soundraw";
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
"sourcegraph-amp.md": {
	id: "sourcegraph-amp.md";
  slug: "sourcegraph-amp";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"sourcegraph-cody.md": {
	id: "sourcegraph-cody.md";
  slug: "sourcegraph-cody";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"sourcely.md": {
	id: "sourcely.md";
  slug: "sourcely";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"sourcery.md": {
	id: "sourcery.md";
  slug: "sourcery";
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
"speech-recognition.md": {
	id: "speech-recognition.md";
  slug: "speech-recognition";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"speech-to-text-benchmark.md": {
	id: "speech-to-text-benchmark.md";
  slug: "speech-to-text-benchmark";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"spell.md": {
	id: "spell.md";
  slug: "spell";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"splash-pro.md": {
	id: "splash-pro.md";
  slug: "splash-pro";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"sponsoring.md": {
	id: "sponsoring.md";
  slug: "sponsoring";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"spotlight.md": {
	id: "spotlight.md";
  slug: "spotlight";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"spreadsheetweb.md": {
	id: "spreadsheetweb.md";
  slug: "spreadsheetweb";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"sqlai-ai.md": {
	id: "sqlai-ai.md";
  slug: "sqlai-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"squarespace.md": {
	id: "squarespace.md";
  slug: "squarespace";
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
"srcbook.md": {
	id: "srcbook.md";
  slug: "srcbook";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"stable-audio.md": {
	id: "stable-audio.md";
  slug: "stable-audio";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"stable-beluga-2.md": {
	id: "stable-beluga-2.md";
  slug: "stable-beluga-2";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"stable-beluga.md": {
	id: "stable-beluga.md";
  slug: "stable-beluga";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"stable-diffusion-models.md": {
	id: "stable-diffusion-models.md";
  slug: "stable-diffusion-models";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"stable-diffusion-public-release.md": {
	id: "stable-diffusion-public-release.md";
  slug: "stable-diffusion-public-release";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"stable-diffusion.md": {
	id: "stable-diffusion.md";
  slug: "stable-diffusion";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"stable-horde.md": {
	id: "stable-horde.md";
  slug: "stable-horde";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"stable-img-to-img.md": {
	id: "stable-img-to-img.md";
  slug: "stable-img-to-img";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"stableboost.md": {
	id: "stableboost.md";
  slug: "stableboost";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"stablediffusion-on-huggingface.md": {
	id: "stablediffusion-on-huggingface.md";
  slug: "stablediffusion-on-huggingface";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"stablediffusion-on-replicate.md": {
	id: "stablediffusion-on-replicate.md";
  slug: "stablediffusion-on-replicate";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"stablediffusion-web-gui.md": {
	id: "stablediffusion-web-gui.md";
  slug: "stablediffusion-web-gui";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"stablediffusion-with-diffusers.md": {
	id: "stablediffusion-with-diffusers.md";
  slug: "stablediffusion-with-diffusers";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"stablender-a-blender-plugin.md": {
	id: "stablender-a-blender-plugin.md";
  slug: "stablender-a-blender-plugin";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"stacker.md": {
	id: "stacker.md";
  slug: "stacker";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"stackspot-ai.md": {
	id: "stackspot-ai.md";
  slug: "stackspot-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"stanford-artificial-intelligence-professional-program.md": {
	id: "stanford-artificial-intelligence-professional-program.md";
  slug: "stanford-artificial-intelligence-professional-program";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"stanford-cs336-language-modeling-from-scratch.md": {
	id: "stanford-cs336-language-modeling-from-scratch.md";
  slug: "stanford-cs336-language-modeling-from-scratch";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"stanford-nlp-for-net.md": {
	id: "stanford-nlp-for-net.md";
  slug: "stanford-nlp-for-net";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"starops.md": {
	id: "starops.md";
  slug: "starops";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"start-here.md": {
	id: "start-here.md";
  slug: "start-here";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"state-of-gpt.md": {
	id: "state-of-gpt.md";
  slug: "state-of-gpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"stencila.md": {
	id: "stencila.md";
  slug: "stencila";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"stenography.md": {
	id: "stenography.md";
  slug: "stenography";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"stockgpt.md": {
	id: "stockgpt.md";
  slug: "stockgpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"storm.md": {
	id: "storm.md";
  slug: "storm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"stream-language.md": {
	id: "stream-language.md";
  slug: "stream-language";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"strikingly.md": {
	id: "strikingly.md";
  slug: "strikingly";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"stripe.md": {
	id: "stripe.md";
  slug: "stripe";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"stripo.md": {
	id: "stripo.md";
  slug: "stripo";
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
"studio.md": {
	id: "studio.md";
  slug: "studio";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"study-notes.md": {
	id: "study-notes.md";
  slug: "study-notes";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"substack.md": {
	id: "substack.md";
  slug: "substack";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"sudocode.md": {
	id: "sudocode.md";
  slug: "sudocode";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"summara.md": {
	id: "summara.md";
  slug: "summara";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"summary-with-ai.md": {
	id: "summary-with-ai.md";
  slug: "summary-with-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"suno-ai.md": {
	id: "suno-ai.md";
  slug: "suno-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"superagent.md": {
	id: "superagent.md";
  slug: "superagent";
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
"supergradients.md": {
	id: "supergradients.md";
  slug: "supergradients";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"supermaven.md": {
	id: "supermaven.md";
  slug: "supermaven";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"supervision.md": {
	id: "supervision.md";
  slug: "supervision";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"svgstud-io.md": {
	id: "svgstud-io.md";
  slug: "svgstud-io";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"swanlab.md": {
	id: "swanlab.md";
  slug: "swanlab";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"swe-agent.md": {
	id: "swe-agent.md";
  slug: "swe-agent";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"sweep.md": {
	id: "sweep.md";
  slug: "sweep";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"swept.md": {
	id: "swept.md";
  slug: "swept";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"swimm.md": {
	id: "swimm.md";
  slug: "swimm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"swiss-army-llama.md": {
	id: "swiss-army-llama.md";
  slug: "swiss-army-llama";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"sybill.md": {
	id: "sybill.md";
  slug: "sybill";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"symbolicai.md": {
	id: "symbolicai.md";
  slug: "symbolicai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"synapses.md": {
	id: "synapses.md";
  slug: "synapses";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"synthcity.md": {
	id: "synthcity.md";
  slug: "synthcity";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"synthesia.md": {
	id: "synthesia.md";
  slug: "synthesia";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"synthical.md": {
	id: "synthical.md";
  slug: "synthical";
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
"tabby.md": {
	id: "tabby.md";
  slug: "tabby";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tabbyml.md": {
	id: "tabbyml.md";
  slug: "tabbyml";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"table-of-contents.md": {
	id: "table-of-contents.md";
  slug: "table-of-contents";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tabnine.md": {
	id: "tabnine.md";
  slug: "tabnine";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tachybase.md": {
	id: "tachybase.md";
  slug: "tachybase";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tadabase.md": {
	id: "tadabase.md";
  slug: "tadabase";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tailortask.md": {
	id: "tailortask.md";
  slug: "tailortask";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"talently-ai.md": {
	id: "talently-ai.md";
  slug: "talently-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"talk-codebase.md": {
	id: "talk-codebase.md";
  slug: "talk-codebase";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"talk-to-chatgpt-voice-interface.md": {
	id: "talk-to-chatgpt-voice-interface.md";
  slug: "talk-to-chatgpt-voice-interface";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"talkd-ai-dialog.md": {
	id: "talkd-ai-dialog.md";
  slug: "talkd-ai-dialog";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tally.md": {
	id: "tally.md";
  slug: "tally";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"taplio.md": {
	id: "taplio.md";
  slug: "taplio";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"taranify.md": {
	id: "taranify.md";
  slug: "taranify";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"taskade-genesis.md": {
	id: "taskade-genesis.md";
  slug: "taskade-genesis";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"taskade.md": {
	id: "taskade.md";
  slug: "taskade";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"taskweaver.md": {
	id: "taskweaver.md";
  slug: "taskweaver";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"taskyon.md": {
	id: "taskyon.md";
  slug: "taskyon";
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
"telborg.md": {
	id: "telborg.md";
  slug: "telborg";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"telegram-channels.md": {
	id: "telegram-channels.md";
  slug: "telegram-channels";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"teleprompter.md": {
	id: "teleprompter.md";
  slug: "teleprompter";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tempo.md": {
	id: "tempo.md";
  slug: "tempo";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tensorboard.md": {
	id: "tensorboard.md";
  slug: "tensorboard";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tensorboardx.md": {
	id: "tensorboardx.md";
  slug: "tensorboardx";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tensorrt-llm.md": {
	id: "tensorrt-llm.md";
  slug: "tensorrt-llm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tensorstore.md": {
	id: "tensorstore.md";
  slug: "tensorstore";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tensorzero.md": {
	id: "tensorzero.md";
  slug: "tensorzero";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"termgpt.md": {
	id: "termgpt.md";
  slug: "termgpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"terminusdb.md": {
	id: "terminusdb.md";
  slug: "terminusdb";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"test-gru.md": {
	id: "test-gru.md";
  slug: "test-gru";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"testing.md": {
	id: "testing.md";
  slug: "testing";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tests-testing.md": {
	id: "tests-testing.md";
  slug: "tests-testing";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"text-embeddings-inference.md": {
	id: "text-embeddings-inference.md";
  slug: "text-embeddings-inference";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"text-generation-inference.md": {
	id: "text-generation-inference.md";
  slug: "text-generation-inference";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"text2infographic.md": {
	id: "text2infographic.md";
  slug: "text2infographic";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"text2sql-ai.md": {
	id: "text2sql-ai.md";
  slug: "text2sql-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"textai.md": {
	id: "textai.md";
  slug: "textai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"textsynth-server-benchmarks.md": {
	id: "textsynth-server-benchmarks.md";
  slug: "textsynth-server-benchmarks";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"textworld.md": {
	id: "textworld.md";
  slug: "textworld";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tf-encrypted.md": {
	id: "tf-encrypted.md";
  slug: "tf-encrypted";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tfdv.md": {
	id: "tfdv.md";
  slug: "tfdv";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tfx.md": {
	id: "tfx.md";
  slug: "tfx";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tgi.md": {
	id: "tgi.md";
  slug: "tgi";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"the-analytics-engineering-roundup.md": {
	id: "the-analytics-engineering-roundup.md";
  slug: "the-analytics-engineering-roundup";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"the-chinese-book-for-large-language-models.md": {
	id: "the-chinese-book-for-large-language-models.md";
  slug: "the-chinese-book-for-large-language-models";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"the-complete-prompt-engineering-for-ai-bootcamp.md": {
	id: "the-complete-prompt-engineering-for-ai-bootcamp.md";
  slug: "the-complete-prompt-engineering-for-ai-bootcamp";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"the-data-science-toolbox.md": {
	id: "the-data-science-toolbox.md";
  slug: "the-data-science-toolbox";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"the-first-book-written-with-gpt-4.md": {
	id: "the-first-book-written-with-gpt-4.md";
  slug: "the-first-book-written-with-gpt-4";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"the-next-generation-of-large-language-models.md": {
	id: "the-next-generation-of-large-language-models.md";
  slug: "the-next-generation-of-large-language-models";
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
"theia-ide.md": {
	id: "theia-ide.md";
  slug: "theia-ide";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"there-s-an-ai.md": {
	id: "there-s-an-ai.md";
  slug: "there-s-an-ai";
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
"things-to-know.md": {
	id: "things-to-know.md";
  slug: "things-to-know";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"thinkgpt.md": {
	id: "thinkgpt.md";
  slug: "thinkgpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"thinking-bayes.md": {
	id: "thinking-bayes.md";
  slug: "thinking-bayes";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"this-image-does-not-exist.md": {
	id: "this-image-does-not-exist.md";
  slug: "this-image-does-not-exist";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"thoughtsource.md": {
	id: "thoughtsource.md";
  slug: "thoughtsource";
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
"thunkable.md": {
	id: "thunkable.md";
  slug: "thunkable";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tilda.md": {
	id: "tilda.md";
  slug: "tilda";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tiledesk.md": {
	id: "tiledesk.md";
  slug: "tiledesk";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tiller-money.md": {
	id: "tiller-money.md";
  slug: "tiller-money";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"time-series-anomaly-detection.md": {
	id: "time-series-anomaly-detection.md";
  slug: "time-series-anomaly-detection";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"timescaledb.md": {
	id: "timescaledb.md";
  slug: "timescaledb";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tinysnap.md": {
	id: "tinysnap.md";
  slug: "tinysnap";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tinyzero.md": {
	id: "tinyzero.md";
  slug: "tinyzero";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tls-based-api-python.md": {
	id: "tls-based-api-python.md";
  slug: "tls-based-api-python";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tmuxai.md": {
	id: "tmuxai.md";
  slug: "tmuxai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"together-ai.md": {
	id: "together-ai.md";
  slug: "together-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tokscale.md": {
	id: "tokscale.md";
  slug: "tokscale";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"toolhive.md": {
	id: "toolhive.md";
  slug: "toolhive";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tools-and-code.md": {
	id: "tools-and-code.md";
  slug: "tools-and-code";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tools-code.md": {
	id: "tools-code.md";
  slug: "tools-code";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tools-infrastructure.md": {
	id: "tools-infrastructure.md";
  slug: "tools-infrastructure";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tools-technologies.md": {
	id: "tools-technologies.md";
  slug: "tools-technologies";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tools.md": {
	id: "tools.md";
  slug: "tools";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"topol.md": {
	id: "topol.md";
  slug: "topol";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"torch.md": {
	id: "torch.md";
  slug: "torch";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"torchbench.md": {
	id: "torchbench.md";
  slug: "torchbench";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"torchrec.md": {
	id: "torchrec.md";
  slug: "torchrec";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"torchserve.md": {
	id: "torchserve.md";
  slug: "torchserve";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"torchtitan.md": {
	id: "torchtitan.md";
  slug: "torchtitan";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"torchtune.md": {
	id: "torchtune.md";
  slug: "torchtune";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tortoise.md": {
	id: "tortoise.md";
  slug: "tortoise";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"towards-data-science-genetic-algorithm-topic.md": {
	id: "towards-data-science-genetic-algorithm-topic.md";
  slug: "towards-data-science-genetic-algorithm-topic";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"towhee.md": {
	id: "towhee.md";
  slug: "towhee";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tpot.md": {
	id: "tpot.md";
  slug: "tpot";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"traceloop.md": {
	id: "traceloop.md";
  slug: "traceloop";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"traceroot-ai.md": {
	id: "traceroot-ai.md";
  slug: "traceroot-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"trae.md": {
	id: "trae.md";
  slug: "trae";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"trag.md": {
	id: "trag.md";
  slug: "trag";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"training-resources.md": {
	id: "training-resources.md";
  slug: "training-resources";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"trajectory-prediction.md": {
	id: "trajectory-prediction.md";
  slug: "trajectory-prediction";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"transfer-learning.md": {
	id: "transfer-learning.md";
  slug: "transfer-learning";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"transformer-explainer.md": {
	id: "transformer-explainer.md";
  slug: "transformer-explainer";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"transformer-lab.md": {
	id: "transformer-lab.md";
  slug: "transformer-lab";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"transformers-agents.md": {
	id: "transformers-agents.md";
  slug: "transformers-agents";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"transgate.md": {
	id: "transgate.md";
  slug: "transgate";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tray.md": {
	id: "tray.md";
  slug: "tray";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"traycer.md": {
	id: "traycer.md";
  slug: "traycer";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"trellis.md": {
	id: "trellis.md";
  slug: "trellis";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"trevor.md": {
	id: "trevor.md";
  slug: "trevor";
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
"triggre.md": {
	id: "triggre.md";
  slug: "triggre";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"triton-inference-server.md": {
	id: "triton-inference-server.md";
  slug: "triton-inference-server";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"trl.md": {
	id: "trl.md";
  slug: "trl";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"trolley.md": {
	id: "trolley.md";
  slug: "trolley";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"trolly-ai.md": {
	id: "trolly-ai.md";
  slug: "trolly-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"trulens.md": {
	id: "trulens.md";
  slug: "trulens";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"trustllm.md": {
	id: "trustllm.md";
  slug: "trustllm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"trypromptly.md": {
	id: "trypromptly.md";
  slug: "trypromptly";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tsfresh.md": {
	id: "tsfresh.md";
  slug: "tsfresh";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tts-webui.md": {
	id: "tts-webui.md";
  slug: "tts-webui";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tune-studio.md": {
	id: "tune-studio.md";
  slug: "tune-studio";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"turbopilot.md": {
	id: "turbopilot.md";
  slug: "turbopilot";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tutorgpt.md": {
	id: "tutorgpt.md";
  slug: "tutorgpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"twig.md": {
	id: "twig.md";
  slug: "twig";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"txtai.md": {
	id: "txtai.md";
  slug: "txtai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"typechat.md": {
	id: "typechat.md";
  slug: "typechat";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"typeform.md": {
	id: "typeform.md";
  slug: "typeform";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"uagents.md": {
	id: "uagents.md";
  slug: "uagents";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ubc-machine-learning-video.md": {
	id: "ubc-machine-learning-video.md";
  slug: "ubc-machine-learning-video";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"udacity-deep-learning.md": {
	id: "udacity-deep-learning.md";
  slug: "udacity-deep-learning";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"udesly.md": {
	id: "udesly.md";
  slug: "udesly";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"udio.md": {
	id: "udio.md";
  slug: "udio";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ui-bakery.md": {
	id: "ui-bakery.md";
  slug: "ui-bakery";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ui-generators.md": {
	id: "ui-generators.md";
  slug: "ui-generators";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ui-pilot.md": {
	id: "ui-pilot.md";
  slug: "ui-pilot";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"uizard.md": {
	id: "uizard.md";
  slug: "uizard";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"unblocked.md": {
	id: "unblocked.md";
  slug: "unblocked";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"unbounce.md": {
	id: "unbounce.md";
  slug: "unbounce";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"undraw.md": {
	id: "undraw.md";
  slug: "undraw";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"unito.md": {
	id: "unito.md";
  slug: "unito";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"universe.md": {
	id: "universe.md";
  slug: "universe";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"unofficial-api-in-dart.md": {
	id: "unofficial-api-in-dart.md";
  slug: "unofficial-api-in-dart";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"unofficial-api-in-js-ts.md": {
	id: "unofficial-api-in-js-ts.md";
  slug: "unofficial-api-in-js-ts";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"unofficial-api-in-python.md": {
	id: "unofficial-api-in-python.md";
  slug: "unofficial-api-in-python";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"unpkg-ai.md": {
	id: "unpkg-ai.md";
  slug: "unpkg-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"unsloth.md": {
	id: "unsloth.md";
  slug: "unsloth";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"unstructured.md": {
	id: "unstructured.md";
  slug: "unstructured";
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
"utilize.md": {
	id: "utilize.md";
  slug: "utilize";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"uwaterloo-cs-886.md": {
	id: "uwaterloo-cs-886.md";
  slug: "uwaterloo-cs-886";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"v0.md": {
	id: "v0.md";
  slug: "v0";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"vall-e-x.md": {
	id: "vall-e-x.md";
  slug: "vall-e-x";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"vanna-ai.md": {
	id: "vanna-ai.md";
  slug: "vanna-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"vanna.md": {
	id: "vanna.md";
  slug: "vanna";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"vbench.md": {
	id: "vbench.md";
  slug: "vbench";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"vdp.md": {
	id: "vdp.md";
  slug: "vdp";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"vega-altair.md": {
	id: "vega-altair.md";
  slug: "vega-altair";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"vercel-ai.md": {
	id: "vercel-ai.md";
  slug: "vercel-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"veritone-voice.md": {
	id: "veritone-voice.md";
  slug: "veritone-voice";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"versoly.md": {
	id: "versoly.md";
  slug: "versoly";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"vespa.md": {
	id: "vespa.md";
  slug: "vespa";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"vibe-compiler-vibec.md": {
	id: "vibe-compiler-vibec.md";
  slug: "vibe-compiler-vibec";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"vibe-engineering-manning.md": {
	id: "vibe-engineering-manning.md";
  slug: "vibe-engineering-manning";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"vibe-transcribe.md": {
	id: "vibe-transcribe.md";
  slug: "vibe-transcribe";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"vicuna-13b.md": {
	id: "vicuna-13b.md";
  slug: "vicuna-13b";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"videos-and-lectures.md": {
	id: "videos-and-lectures.md";
  slug: "videos-and-lectures";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"videos.md": {
	id: "videos.md";
  slug: "videos";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"videosys.md": {
	id: "videosys.md";
  slug: "videosys";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"vipe.md": {
	id: "vipe.md";
  slug: "vipe";
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
"vision-agent.md": {
	id: "vision-agent.md";
  slug: "vision-agent";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"vision-language-model-knowledge-distillation-methods.md": {
	id: "vision-language-model-knowledge-distillation-methods.md";
  slug: "vision-language-model-knowledge-distillation-methods";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"vision-language-model-transfer-learning-methods.md": {
	id: "vision-language-model-transfer-learning-methods.md";
  slug: "vision-language-model-transfer-learning-methods";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"vision-language-pre-training-methods.md": {
	id: "vision-language-pre-training-methods.md";
  slug: "vision-language-pre-training-methods";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"visualisation.md": {
	id: "visualisation.md";
  slug: "visualisation";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"visualsitemaps.md": {
	id: "visualsitemaps.md";
  slug: "visualsitemaps";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"vllm.md": {
	id: "vllm.md";
  slug: "vllm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"vlmevalkit.md": {
	id: "vlmevalkit.md";
  slug: "vlmevalkit";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"vocalreplica.md": {
	id: "vocalreplica.md";
  slug: "vocalreplica";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"voice-based-chatgpt.md": {
	id: "voice-based-chatgpt.md";
  slug: "voice-based-chatgpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"voil.md": {
	id: "voil.md";
  slug: "voil";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"voltagent.md": {
	id: "voltagent.md";
  slug: "voltagent";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"volusion.md": {
	id: "volusion.md";
  slug: "volusion";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"voyager.md": {
	id: "voyager.md";
  slug: "voyager";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"vsync.md": {
	id: "vsync.md";
  slug: "vsync";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"vuix.md": {
	id: "vuix.md";
  slug: "vuix";
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
"vulpes.md": {
	id: "vulpes.md";
  slug: "vulpes";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"vx-dev.md": {
	id: "vx-dev.md";
  slug: "vx-dev";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"waggledance-ai.md": {
	id: "waggledance-ai.md";
  slug: "waggledance-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"wallaroo-ai.md": {
	id: "wallaroo-ai.md";
  slug: "wallaroo-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"warp.md": {
	id: "warp.md";
  slug: "warp";
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
"weaviate.md": {
	id: "weaviate.md";
  slug: "weaviate";
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
"webchatgpt.md": {
	id: "webchatgpt.md";
  slug: "webchatgpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"webflow.md": {
	id: "webflow.md";
  slug: "webflow";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"webnode.md": {
	id: "webnode.md";
  slug: "webnode";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"websites.md": {
	id: "websites.md";
  slug: "websites";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"webstudio.md": {
	id: "webstudio.md";
  slug: "webstudio";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"wechat-chatgpt.md": {
	id: "wechat-chatgpt.md";
  slug: "wechat-chatgpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"weebly.md": {
	id: "weebly.md";
  slug: "weebly";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"weights-biases-effective-mlops-model-development.md": {
	id: "weights-biases-effective-mlops-model-development.md";
  slug: "weights-biases-effective-mlops-model-development";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"weights-biases.md": {
	id: "weights-biases.md";
  slug: "weights-biases";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"weld.md": {
	id: "weld.md";
  slug: "weld";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"wellsaid-labs.md": {
	id: "wellsaid-labs.md";
  slug: "wellsaid-labs";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"wellsaid.md": {
	id: "wellsaid.md";
  slug: "wellsaid";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"what-if-gpt-4-writing-alternate-history-timelines.md": {
	id: "what-if-gpt-4-writing-alternate-history-timelines.md";
  slug: "what-if-gpt-4-writing-alternate-history-timelines";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"what-is-data-science.md": {
	id: "what-is-data-science.md";
  slug: "what-is-data-science";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"what-is-openclaw.md": {
	id: "what-is-openclaw.md";
  slug: "what-is-openclaw";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"what-s-new.md": {
	id: "what-s-new.md";
  slug: "what-s-new";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"what-security-teams-need-to-know.md": {
	id: "what-security-teams-need-to-know.md";
  slug: "what-security-teams-need-to-know";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"what-the-diff.md": {
	id: "what-the-diff.md";
  slug: "what-the-diff";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"whatif.md": {
	id: "whatif.md";
  slug: "whatif";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"whatsapp-bot.md": {
	id: "whatsapp-bot.md";
  slug: "whatsapp-bot";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"where-do-i-start.md": {
	id: "where-do-i-start.md";
  slug: "where-do-i-start";
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
"whimsical-ai.md": {
	id: "whimsical-ai.md";
  slug: "whimsical-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"whisper-api.md": {
	id: "whisper-api.md";
  slug: "whisper-api";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"whisper-cpp.md": {
	id: "whisper-cpp.md";
  slug: "whisper-cpp";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"whisper.md": {
	id: "whisper.md";
  slug: "whisper";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"whodb.md": {
	id: "whodb.md";
  slug: "whodb";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"widgetic.md": {
	id: "widgetic.md";
  slug: "widgetic";
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
"windows-mac-linux-desktop-app.md": {
	id: "windows-mac-linux-desktop-app.md";
  slug: "windows-mac-linux-desktop-app";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"windsurf.md": {
	id: "windsurf.md";
  slug: "windsurf";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"wispr-flow.md": {
	id: "wispr-flow.md";
  slug: "wispr-flow";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"without-code.md": {
	id: "without-code.md";
  slug: "without-code";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"wix.md": {
	id: "wix.md";
  slug: "wix";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"wizi.md": {
	id: "wizi.md";
  slug: "wizi";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"wllama.md": {
	id: "wllama.md";
  slug: "wllama";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"wolverine.md": {
	id: "wolverine.md";
  slug: "wolverine";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"wonder-dynamics.md": {
	id: "wonder-dynamics.md";
  slug: "wonder-dynamics";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"wordflow.md": {
	id: "wordflow.md";
  slug: "wordflow";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"wordtune.md": {
	id: "wordtune.md";
  slug: "wordtune";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"wordware.md": {
	id: "wordware.md";
  slug: "wordware";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"workshops.md": {
	id: "workshops.md";
  slug: "workshops";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"worldquant-university-applied-data-science-lab.md": {
	id: "worldquant-university-applied-data-science-lab.md";
  slug: "worldquant-university-applied-data-science-lab";
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
"wren-ai.md": {
	id: "wren-ai.md";
  slug: "wren-ai";
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
"x-doc-ai.md": {
	id: "x-doc-ai.md";
  slug: "x-doc-ai";
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
"ycml.md": {
	id: "ycml.md";
  slug: "ycml";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ydata-profiling.md": {
	id: "ydata-profiling.md";
  slug: "ydata-profiling";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ydata-synthetic.md": {
	id: "ydata-synthetic.md";
  slug: "ydata-synthetic";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"yepcode.md": {
	id: "yepcode.md";
  slug: "yepcode";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"yochengliu-point-cloud-analysis.md": {
	id: "yochengliu-point-cloud-analysis.md";
  slug: "yochengliu-point-cloud-analysis";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"yomu.md": {
	id: "yomu.md";
  slug: "yomu";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"you-com.md": {
	id: "you-com.md";
  slug: "you-com";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"yoyo-games.md": {
	id: "yoyo-games.md";
  slug: "yoyo-games";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"zapier.md": {
	id: "zapier.md";
  slug: "zapier";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"zarr.md": {
	id: "zarr.md";
  slug: "zarr";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"zed.md": {
	id: "zed.md";
  slug: "zed";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"zenable.md": {
	id: "zenable.md";
  slug: "zenable";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"zenmic-com.md": {
	id: "zenmic-com.md";
  slug: "zenmic-com";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"zenml.md": {
	id: "zenml.md";
  slug: "zenml";
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
"zero-shot-learning.md": {
	id: "zero-shot-learning.md";
  slug: "zero-shot-learning";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"zilliz-cloud-cloud-native-service-for-milvus.md": {
	id: "zilliz-cloud-cloud-native-service-for-milvus.md";
  slug: "zilliz-cloud-cloud-native-service-for-milvus";
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
"zoho-creator.md": {
	id: "zoho-creator.md";
  slug: "zoho-creator";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"zzz-code-ai.md": {
	id: "zzz-code-ai.md";
  slug: "zzz-code-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
};
"blogs": {
"academic-research-ai-agents.md": {
	id: "academic-research-ai-agents.md";
  slug: "academic-research-ai-agents";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".md"] };
"academic-research-assistants-boosting-productivity.md": {
	id: "academic-research-assistants-boosting-productivity.md";
  slug: "academic-research-assistants-boosting-productivity";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".md"] };
"ai-agent-frameworks-compared.md": {
	id: "ai-agent-frameworks-compared.md";
  slug: "ai-agent-frameworks-compared";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".md"] };
"ai-agents-for-customer-service.md": {
	id: "ai-agents-for-customer-service.md";
  slug: "ai-agents-for-customer-service";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".md"] };
"ai-api-integration-guide.md": {
	id: "ai-api-integration-guide.md";
  slug: "ai-api-integration-guide";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".md"] };
"ai-financial-revolution.md": {
	id: "ai-financial-revolution.md";
  slug: "ai-financial-revolution";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".md"] };
"ai-in-education.md": {
	id: "ai-in-education.md";
  slug: "ai-in-education";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".md"] };
"ai-in-healthcare-2025.md": {
	id: "ai-in-healthcare-2025.md";
  slug: "ai-in-healthcare-2025";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".md"] };
"ai-powered-data-processing.md": {
	id: "ai-powered-data-processing.md";
  slug: "ai-powered-data-processing";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".md"] };
"ai-regulation-updates-navigating-the-future.md": {
	id: "ai-regulation-updates-navigating-the-future.md";
  slug: "ai-regulation-updates-navigating-the-future";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".md"] };
"ai-regulation-updates.md": {
	id: "ai-regulation-updates.md";
  slug: "ai-regulation-updates";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".md"] };
"ai-research-agents-for-academics.md": {
	id: "ai-research-agents-for-academics.md";
  slug: "ai-research-agents-for-academics";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".md"] };
"ai-revolutionizes-finance-trends-and-tools.md": {
	id: "ai-revolutionizes-finance-trends-and-tools.md";
  slug: "ai-revolutionizes-finance-trends-and-tools";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".md"] };
"ai-revolutionizes-finance.md": {
	id: "ai-revolutionizes-finance.md";
  slug: "ai-revolutionizes-finance";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".md"] };
"ai-safety-considerations.md": {
	id: "ai-safety-considerations.md";
  slug: "ai-safety-considerations";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".md"] };
"automate-your-workflow-with-ai-power.md": {
	id: "automate-your-workflow-with-ai-power.md";
  slug: "automate-your-workflow-with-ai-power";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".md"] };
"automating-repetitive-tasks-with-ai.md": {
	id: "automating-repetitive-tasks-with-ai.md";
  slug: "automating-repetitive-tasks-with-ai";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".md"] };
"autonomous-ai-agents-revolutionizing-workflows.md": {
	id: "autonomous-ai-agents-revolutionizing-workflows.md";
  slug: "autonomous-ai-agents-revolutionizing-workflows";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".md"] };
"boost-customer-service-with-ai-agents.md": {
	id: "boost-customer-service-with-ai-agents.md";
  slug: "boost-customer-service-with-ai-agents";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".md"] };
"build-your-first-ai-agent.md": {
	id: "build-your-first-ai-agent.md";
  slug: "build-your-first-ai-agent";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".md"] };
"building-chatbots-with-ai.md": {
	id: "building-chatbots-with-ai.md";
  slug: "building-chatbots-with-ai";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".md"] };
"building-smart-chatbots-with-ai.md": {
	id: "building-smart-chatbots-with-ai.md";
  slug: "building-smart-chatbots-with-ai";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".md"] };
"building-your-first-ai-agent.md": {
	id: "building-your-first-ai-agent.md";
  slug: "building-your-first-ai-agent";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".md"] };
"claude-vs-gpt-ultimate-ai-agent-comparison.md": {
	id: "claude-vs-gpt-ultimate-ai-agent-comparison.md";
  slug: "claude-vs-gpt-ultimate-ai-agent-comparison";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".md"] };
"coding-agents-revolutionizing-software-development.md": {
	id: "coding-agents-revolutionizing-software-development.md";
  slug: "coding-agents-revolutionizing-software-development";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".md"] };
"creating-ai-workflows-ethically.md": {
	id: "creating-ai-workflows-ethically.md";
  slug: "creating-ai-workflows-ethically";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".md"] };
"creating-ai-workflows.md": {
	id: "creating-ai-workflows.md";
  slug: "creating-ai-workflows";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".md"] };
"fine-tune-language-models-for-peak-performance.md": {
	id: "fine-tune-language-models-for-peak-performance.md";
  slug: "fine-tune-language-models-for-peak-performance";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".md"] };
"fine-tune-language-models.md": {
	id: "fine-tune-language-models.md";
  slug: "fine-tune-language-models";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".md"] };
"future-of-work-with-ai-agents.md": {
	id: "future-of-work-with-ai-agents.md";
  slug: "future-of-work-with-ai-agents";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".md"] };
"getting-started-with-ai-agents.md": {
	id: "getting-started-with-ai-agents.md";
  slug: "getting-started-with-ai-agents";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".md"] };
"getting-started-with-langchain-ai-ethics.md": {
	id: "getting-started-with-langchain-ai-ethics.md";
  slug: "getting-started-with-langchain-ai-ethics";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".md"] };
"getting-started-with-langchain.md": {
	id: "getting-started-with-langchain.md";
  slug: "getting-started-with-langchain";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".md"] };
"latest-gpt-developments.md": {
	id: "latest-gpt-developments.md";
  slug: "latest-gpt-developments";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".md"] };
"mastering-prompt-engineering-best-practices.md": {
	id: "mastering-prompt-engineering-best-practices.md";
  slug: "mastering-prompt-engineering-best-practices";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".md"] };
"multi-agent-systems-for-complex-tasks.md": {
	id: "multi-agent-systems-for-complex-tasks.md";
  slug: "multi-agent-systems-for-complex-tasks";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".md"] };
"no-code-ai-automation-tools.md": {
	id: "no-code-ai-automation-tools.md";
  slug: "no-code-ai-automation-tools";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".md"] };
"open-source-llms-2025.md": {
	id: "open-source-llms-2025.md";
  slug: "open-source-llms-2025";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".md"] };
"rag-systems-explained.md": {
	id: "rag-systems-explained.md";
  slug: "rag-systems-explained";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".md"] };
"responsible-ai-development.md": {
	id: "responsible-ai-development.md";
  slug: "responsible-ai-development";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".md"] };
"revolutionizing-education-with-ai.md": {
	id: "revolutionizing-education-with-ai.md";
  slug: "revolutionizing-education-with-ai";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".md"] };
"revolutionizing-startups-with-ai-tools.md": {
	id: "revolutionizing-startups-with-ai-tools.md";
  slug: "revolutionizing-startups-with-ai-tools";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".md"] };
"rpa-vs-ai-agents-automation-evolution.md": {
	id: "rpa-vs-ai-agents-automation-evolution.md";
  slug: "rpa-vs-ai-agents-automation-evolution";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".md"] };
"rpa-vs-ai-agents.md": {
	id: "rpa-vs-ai-agents.md";
  slug: "rpa-vs-ai-agents";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".md"] };
"startup-ai-tools-landscape.md": {
	id: "startup-ai-tools-landscape.md";
  slug: "startup-ai-tools-landscape";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".md"] };
"staying-ahead-of-ai-regulation-updates.md": {
	id: "staying-ahead-of-ai-regulation-updates.md";
  slug: "staying-ahead-of-ai-regulation-updates";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".md"] };
"streamline-customer-service-with-ai-agents.md": {
	id: "streamline-customer-service-with-ai-agents.md";
  slug: "streamline-customer-service-with-ai-agents";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".md"] };
"unlocking-rag-systems-ai-next-frontier.md": {
	id: "unlocking-rag-systems-ai-next-frontier.md";
  slug: "unlocking-rag-systems-ai-next-frontier";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".md"] };
"unlocking-rag-systems-boosting-automation-efficiency.md": {
	id: "unlocking-rag-systems-boosting-automation-efficiency.md";
  slug: "unlocking-rag-systems-boosting-automation-efficiency";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".md"] };
"vector-databases-for-ai.md": {
	id: "vector-databases-for-ai.md";
  slug: "vector-databases-for-ai";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
