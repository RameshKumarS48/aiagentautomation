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
"100-nlp-papers.md": {
	id: "100-nlp-papers.md";
  slug: "100-nlp-papers";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"1000-data-science-projects.md": {
	id: "1000-data-science-projects.md";
  slug: "1000-data-science-projects";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
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
"2012-paper-diginorm.md": {
	id: "2012-paper-diginorm.md";
  slug: "2012-paper-diginorm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"250k-job-postings.md": {
	id: "250k-job-postings.md";
  slug: "250k-job-postings";
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
"40-data-analytics-projects-ideas.md": {
	id: "40-data-analytics-projects-ideas.md";
  slug: "40-data-analytics-projects-ideas";
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
"5000-images-of-clothes.md": {
	id: "5000-images-of-clothes.md";
  slug: "5000-images-of-clothes";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"a-deep-catalog-of-human-genetic-variation.md": {
	id: "a-deep-catalog-of-human-genetic-variation.md";
  slug: "a-deep-catalog-of-human-genetic-variation";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"a-gallery-of-interesting-ipython-notebooks.md": {
	id: "a-gallery-of-interesting-ipython-notebooks.md";
  slug: "a-gallery-of-interesting-ipython-notebooks";
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
"academic-torrents.md": {
	id: "academic-torrents.md";
  slug: "academic-torrents";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"accelerate.md": {
	id: "accelerate.md";
  slug: "accelerate";
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
"aclue.md": {
	id: "aclue.md";
  slug: "aclue";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"acme.md": {
	id: "acme.md";
  slug: "acme";
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
"adaboost.md": {
	id: "adaboost.md";
  slug: "adaboost";
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
"adam.md": {
	id: "adam.md";
  slug: "adam";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"adapters.md": {
	id: "adapters.md";
  slug: "adapters";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"adaptive-resonance-theory.md": {
	id: "adaptive-resonance-theory.md";
  slug: "adaptive-resonance-theory";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"aditi-rastogi.md": {
	id: "aditi-rastogi.md";
  slug: "aditi-rastogi";
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
"ads-b-exchange.md": {
	id: "ads-b-exchange.md";
  slug: "ads-b-exchange";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"advanced-chatgpt-prompt-engineering.md": {
	id: "advanced-chatgpt-prompt-engineering.md";
  slug: "advanced-chatgpt-prompt-engineering";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"advanced-openai-playground.md": {
	id: "advanced-openai-playground.md";
  slug: "advanced-openai-playground";
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
"advances-in-evolutionary-algorithms.md": {
	id: "advances-in-evolutionary-algorithms.md";
  slug: "advances-in-evolutionary-algorithms";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"advances-in-genetic-programming-vol-3.md": {
	id: "advances-in-genetic-programming-vol-3.md";
  slug: "advances-in-genetic-programming-vol-3";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"adventures-in-data-land.md": {
	id: "adventures-in-data-land.md";
  slug: "adventures-in-data-land";
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
"adversarial-learning.md": {
	id: "adversarial-learning.md";
  slug: "adversarial-learning";
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
"aerosolve.md": {
	id: "aerosolve.md";
  slug: "aerosolve";
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
"ahaz.md": {
	id: "ahaz.md";
  slug: "ahaz";
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
"ai-aiart-generative.md": {
	id: "ai-aiart-generative.md";
  slug: "ai-aiart-generative";
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
"ai-boost.md": {
	id: "ai-boost.md";
  slug: "ai-boost";
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
"ai-for-productivity.md": {
	id: "ai-for-productivity.md";
  slug: "ai-for-productivity";
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
"ai-phone-call-agents.md": {
	id: "ai-phone-call-agents.md";
  slug: "ai-phone-call-agents";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ai-photo-forge.md": {
	id: "ai-photo-forge.md";
  slug: "ai-photo-forge";
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
"ai-text.md": {
	id: "ai-text.md";
  slug: "ai-text";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ai-today.md": {
	id: "ai-today.md";
  slug: "ai-today";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ai-tools-for-marketing.md": {
	id: "ai-tools-for-marketing.md";
  slug: "ai-tools-for-marketing";
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
"ailingbot.md": {
	id: "ailingbot.md";
  slug: "ailingbot";
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
"aistore.md": {
	id: "aistore.md";
  slug: "aistore";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"aisuite.md": {
	id: "aisuite.md";
  slug: "aisuite";
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
"aitoolbox.md": {
	id: "aitoolbox.md";
  slug: "aitoolbox";
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
"akhil-soni.md": {
	id: "akhil-soni.md";
  slug: "akhil-soni";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"albumentations.md": {
	id: "albumentations.md";
  slug: "albumentations";
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
"algebird.md": {
	id: "algebird.md";
  slug: "algebird";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"algorithm-svmlight.md": {
	id: "algorithm-svmlight.md";
  slug: "algorithm-svmlight";
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
"align-anything.md": {
	id: "align-anything.md";
  slug: "align-anything";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"allen-downey-s-data-science-course.md": {
	id: "allen-downey-s-data-science-course.md";
  slug: "allen-downey-s-data-science-course";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"allen-downey-s-think-bayes-code.md": {
	id: "allen-downey-s-think-bayes-code.md";
  slug: "allen-downey-s-think-bayes-code";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"allen-downey-s-think-complexity-code.md": {
	id: "allen-downey-s-think-complexity-code.md";
  slug: "allen-downey-s-think-complexity-code";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"allen-downey-s-think-os-code.md": {
	id: "allen-downey-s-think-os-code.md";
  slug: "allen-downey-s-think-os-code";
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
"alpaca.md": {
	id: "alpaca.md";
  slug: "alpaca";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"alpacaeval-leaderboard.md": {
	id: "alpacaeval-leaderboard.md";
  slug: "alpacaeval-leaderboard";
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
"altair.md": {
	id: "altair.md";
  slug: "altair";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"altern.md": {
	id: "altern.md";
  slug: "altern";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"alternatives-comparisons.md": {
	id: "alternatives-comparisons.md";
  slug: "alternatives-comparisons";
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
"amazon-web-services.md": {
	id: "amazon-web-services.md";
  slug: "amazon-web-services";
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
"amcharts.md": {
	id: "amcharts.md";
  slug: "amcharts";
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
"amidst-toolbox.md": {
	id: "amidst-toolbox.md";
  slug: "amidst-toolbox";
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
"an-introduction-to-statistical-learning.md": {
	id: "an-introduction-to-statistical-learning.md";
  slug: "an-introduction-to-statistical-learning";
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
"ando-figma-plugin.md": {
	id: "ando-figma-plugin.md";
  slug: "ando-figma-plugin";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"andrej-karpathy-series.md": {
	id: "andrej-karpathy-series.md";
  slug: "andrej-karpathy-series";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"andrew-carr.md": {
	id: "andrew-carr.md";
  slug: "andrew-carr";
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
"anee.md": {
	id: "anee.md";
  slug: "anee";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"angewandte-data-science.md": {
	id: "angewandte-data-science.md";
  slug: "angewandte-data-science";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"anil-chandra-naidu-matcha.md": {
	id: "anil-chandra-naidu-matcha.md";
  slug: "anil-chandra-naidu-matcha";
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
"ann.md": {
	id: "ann.md";
  slug: "ann";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"annoy.md": {
	id: "annoy.md";
  slug: "annoy";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"anomaly-detection.md": {
	id: "anomaly-detection.md";
  slug: "anomaly-detection";
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
"anthropic-courses.md": {
	id: "anthropic-courses.md";
  slug: "anthropic-courses";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"anychart.md": {
	id: "anychart.md";
  slug: "anychart";
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
"apache-2-0.md": {
	id: "apache-2-0.md";
  slug: "apache-2-0";
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
"apache-ctakes.md": {
	id: "apache-ctakes.md";
  slug: "apache-ctakes";
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
"apache-singa.md": {
	id: "apache-singa.md";
  slug: "apache-singa";
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
"applied-ai-blogs.md": {
	id: "applied-ai-blogs.md";
  slug: "applied-ai-blogs";
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
"apriori.md": {
	id: "apriori.md";
  slug: "apriori";
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
"areal.md": {
	id: "areal.md";
  slug: "areal";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"arel.md": {
	id: "arel.md";
  slug: "arel";
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
"artbreeder.md": {
	id: "artbreeder.md";
  slug: "artbreeder";
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
"articles-news.md": {
	id: "articles-news.md";
  slug: "articles-news";
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
"artificial-intelligence-with-python-tutorialspoint.md": {
	id: "artificial-intelligence-with-python-tutorialspoint.md";
  slug: "artificial-intelligence-with-python-tutorialspoint";
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
"arules.md": {
	id: "arules.md";
  slug: "arules";
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
"astroml.md": {
	id: "astroml.md";
  slug: "astroml";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"astropy.md": {
	id: "astropy.md";
  slug: "astropy";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"atari2600.md": {
	id: "atari2600.md";
  slug: "atari2600";
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
"audio.md": {
	id: "audio.md";
  slug: "audio";
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
"auto-evaluator.md": {
	id: "auto-evaluator.md";
  slug: "auto-evaluator";
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
"auto-ml.md": {
	id: "auto-ml.md";
  slug: "auto-ml";
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
"auto-viml.md": {
	id: "auto-viml.md";
  slug: "auto-viml";
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
"autoencoder.md": {
	id: "autoencoder.md";
  slug: "autoencoder";
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
"automl-implementation-for-static-and-dynamic-data-analytics.md": {
	id: "automl-implementation-for-static-and-dynamic-data-analytics.md";
  slug: "automl-implementation-for-static-and-dynamic-data-analytics";
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
"autoviz.md": {
	id: "autoviz.md";
  slug: "autoviz";
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
"avatar-ai.md": {
	id: "avatar-ai.md";
  slug: "avatar-ai";
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
"awesome-ai-books.md": {
	id: "awesome-ai-books.md";
  slug: "awesome-ai-books";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-ai-coding-tools.md": {
	id: "awesome-ai-coding-tools.md";
  slug: "awesome-ai-coding-tools";
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
"awesome-ai-models.md": {
	id: "awesome-ai-models.md";
  slug: "awesome-ai-models";
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
"awesome-align-llm-human.md": {
	id: "awesome-align-llm-human.md";
  slug: "awesome-align-llm-human";
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
"awesome-chatgpt-prompts-zh.md": {
	id: "awesome-chatgpt-prompts-zh.md";
  slug: "awesome-chatgpt-prompts-zh";
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
"awesome-chatgpt.md": {
	id: "awesome-chatgpt.md";
  slug: "awesome-chatgpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-chinese-llm.md": {
	id: "awesome-chinese-llm.md";
  slug: "awesome-chinese-llm";
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
"awesome-code-llm.md": {
	id: "awesome-code-llm.md";
  slug: "awesome-code-llm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-community-detection.md": {
	id: "awesome-community-detection.md";
  slug: "awesome-community-detection";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-computer-vision-models.md": {
	id: "awesome-computer-vision-models.md";
  slug: "awesome-computer-vision-models";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-core-ml-models.md": {
	id: "awesome-core-ml-models.md";
  slug: "awesome-core-ml-models";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-coreml.md": {
	id: "awesome-coreml.md";
  slug: "awesome-coreml";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-data-analysis.md": {
	id: "awesome-data-analysis.md";
  slug: "awesome-data-analysis";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-data-science-ideas.md": {
	id: "awesome-data-science-ideas.md";
  slug: "awesome-data-science-ideas";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-datasets.md": {
	id: "awesome-datasets.md";
  slug: "awesome-datasets";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-dataviz.md": {
	id: "awesome-dataviz.md";
  slug: "awesome-dataviz";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-decision-tree-papers.md": {
	id: "awesome-decision-tree-papers.md";
  slug: "awesome-decision-tree-papers";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-deliberative-prompting.md": {
	id: "awesome-deliberative-prompting.md";
  slug: "awesome-deliberative-prompting";
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
"awesome-explainable-graph-reasoning.md": {
	id: "awesome-explainable-graph-reasoning.md";
  slug: "awesome-explainable-graph-reasoning";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-fraud-detection-papers.md": {
	id: "awesome-fraud-detection-papers.md";
  slug: "awesome-fraud-detection-papers";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-game-datasets.md": {
	id: "awesome-game-datasets.md";
  slug: "awesome-game-datasets";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-gpt-3.md": {
	id: "awesome-gpt-3.md";
  slug: "awesome-gpt-3";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-gpt.md": {
	id: "awesome-gpt.md";
  slug: "awesome-gpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-gradient-boosting-papers.md": {
	id: "awesome-gradient-boosting-papers.md";
  slug: "awesome-gradient-boosting-papers";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-graph-classification.md": {
	id: "awesome-graph-classification.md";
  slug: "awesome-graph-classification";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-hallucination-detection.md": {
	id: "awesome-hallucination-detection.md";
  slug: "awesome-hallucination-detection";
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
"awesome-japanese-llm.md": {
	id: "awesome-japanese-llm.md";
  slug: "awesome-japanese-llm";
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
"awesome-language-agents.md": {
	id: "awesome-language-agents.md";
  slug: "awesome-language-agents";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-language-model-analysis.md": {
	id: "awesome-language-model-analysis.md";
  slug: "awesome-language-model-analysis";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-llm-3d.md": {
	id: "awesome-llm-3d.md";
  slug: "awesome-llm-3d";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-llm-compression.md": {
	id: "awesome-llm-compression.md";
  slug: "awesome-llm-compression";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-llm-hallucination.md": {
	id: "awesome-llm-hallucination.md";
  slug: "awesome-llm-hallucination";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-llm-healthcare.md": {
	id: "awesome-llm-healthcare.md";
  slug: "awesome-llm-healthcare";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-llm-human-preference-datasets.md": {
	id: "awesome-llm-human-preference-datasets.md";
  slug: "awesome-llm-human-preference-datasets";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-llm-inference.md": {
	id: "awesome-llm-inference.md";
  slug: "awesome-llm-inference";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-llm-security.md": {
	id: "awesome-llm-security.md";
  slug: "awesome-llm-security";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-llm-systems.md": {
	id: "awesome-llm-systems.md";
  slug: "awesome-llm-systems";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-llm-webapps.md": {
	id: "awesome-llm-webapps.md";
  slug: "awesome-llm-webapps";
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
"awesome-local-llms.md": {
	id: "awesome-local-llms.md";
  slug: "awesome-local-llms";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-machine-learning-deep-learning-tutorials.md": {
	id: "awesome-machine-learning-deep-learning-tutorials.md";
  slug: "awesome-machine-learning-deep-learning-tutorials";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-machine-learning-on-source-code.md": {
	id: "awesome-machine-learning-on-source-code.md";
  slug: "awesome-machine-learning-on-source-code";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-machine-learning-with-ruby.md": {
	id: "awesome-machine-learning-with-ruby.md";
  slug: "awesome-machine-learning-with-ruby";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-machine-learning.md": {
	id: "awesome-machine-learning.md";
  slug: "awesome-machine-learning";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-marketing.md": {
	id: "awesome-marketing.md";
  slug: "awesome-marketing";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-monte-carlo-tree-search.md": {
	id: "awesome-monte-carlo-tree-search.md";
  slug: "awesome-monte-carlo-tree-search";
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
"awesome-nlp-with-ruby.md": {
	id: "awesome-nlp-with-ruby.md";
  slug: "awesome-nlp-with-ruby";
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
"awesome-python.md": {
	id: "awesome-python.md";
  slug: "awesome-python";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"awesome-r.md": {
	id: "awesome-r.md";
  slug: "awesome-r";
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
"awesome-speech-recognition-speech-synthesis-papers.md": {
	id: "awesome-speech-recognition-speech-synthesis-papers.md";
  slug: "awesome-speech-recognition-speech-synthesis-papers";
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
"awesome-workflow-automation.md": {
	id: "awesome-workflow-automation.md";
  slug: "awesome-workflow-automation";
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
"aws-amazon-com-datasets.md": {
	id: "aws-amazon-com-datasets.md";
  slug: "aws-amazon-com-datasets";
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
"backprop.md": {
	id: "backprop.md";
  slug: "backprop";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"banditlib.md": {
	id: "banditlib.md";
  slug: "banditlib";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"bandlets.md": {
	id: "bandlets.md";
  slug: "bandlets";
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
"bayesian-bandit.md": {
	id: "bayesian-bandit.md";
  slug: "bayesian-bandit";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"bayesian-methods-for-hackers.md": {
	id: "bayesian-methods-for-hackers.md";
  slug: "bayesian-methods-for-hackers";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"bayesian.md": {
	id: "bayesian.md";
  slug: "bayesian";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"bayeso.md": {
	id: "bayeso.md";
  slug: "bayeso";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"bayespy.md": {
	id: "bayespy.md";
  slug: "bayespy";
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
"behonest.md": {
	id: "behonest.md";
  slug: "behonest";
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
"bender.md": {
	id: "bender.md";
  slug: "bender";
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
"berkeley-function-calling-leaderboard.md": {
	id: "berkeley-function-calling-leaderboard.md";
  slug: "berkeley-function-calling-leaderboard";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"berkeley-institute-for-data-science.md": {
	id: "berkeley-institute-for-data-science.md";
  slug: "berkeley-institute-for-data-science";
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
"bertopic.md": {
	id: "bertopic.md";
  slug: "bertopic";
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
"best-cv-resume-for-data-science-freshers.md": {
	id: "best-cv-resume-for-data-science-freshers.md";
  slug: "best-cv-resume-for-data-science-freshers";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"best-data-science-courses-with-certificates.md": {
	id: "best-data-science-courses-with-certificates.md";
  slug: "best-data-science-courses-with-certificates";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"best-of-ai.md": {
	id: "best-of-ai.md";
  slug: "best-of-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"best-openclaw-alternatives.md": {
	id: "best-openclaw-alternatives.md";
  slug: "best-openclaw-alternatives";
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
"bidmach.md": {
	id: "bidmach.md";
  slug: "bidmach";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"bidmat.md": {
	id: "bidmat.md";
  slug: "bidmat";
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
"big-data-analytics-using-r.md": {
	id: "big-data-analytics-using-r.md";
  slug: "big-data-analytics-using-r";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"big-data-analytics-with-r-and-hadoop.md": {
	id: "big-data-analytics-with-r-and-hadoop.md";
  slug: "big-data-analytics-with-r-and-hadoop";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"big-data-for-chimps.md": {
	id: "big-data-for-chimps.md";
  slug: "big-data-for-chimps";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"big-data-hadoop-nosql-hive-hbase.md": {
	id: "big-data-hadoop-nosql-hive-hbase.md";
  slug: "big-data-hadoop-nosql-hive-hbase";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"big-data-learnings.md": {
	id: "big-data-learnings.md";
  slug: "big-data-learnings";
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
"big-data-scientist.md": {
	id: "big-data-scientist.md";
  slug: "big-data-scientist";
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
"bigartm.md": {
	id: "bigartm.md";
  slug: "bigartm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"bigdata-hadoop-expert.md": {
	id: "bigdata-hadoop-expert.md";
  slug: "bigdata-hadoop-expert";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"biglasso.md": {
	id: "biglasso.md";
  slug: "biglasso";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"bigml.md": {
	id: "bigml.md";
  slug: "bigml";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"billion-scale-similarity-search-with-gpus.md": {
	id: "billion-scale-similarity-search-with-gpus.md";
  slug: "billion-scale-similarity-search-with-gpus";
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
"bing-image-creator.md": {
	id: "bing-image-creator.md";
  slug: "bing-image-creator";
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
"biopy.md": {
	id: "biopy.md";
  slug: "biopy";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"bioruby.md": {
	id: "bioruby.md";
  slug: "bioruby";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"bioscala.md": {
	id: "bioscala.md";
  slug: "bioscala";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"birdland.md": {
	id: "birdland.md";
  slug: "birdland";
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
"bitblas.md": {
	id: "bitblas.md";
  slug: "bitblas";
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
"bitsandbytes.md": {
	id: "bitsandbytes.md";
  slug: "bitsandbytes";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"black-headshots.md": {
	id: "black-headshots.md";
  slug: "black-headshots";
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
"blaze.md": {
	id: "blaze.md";
  slug: "blaze";
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
"bllip-parser.md": {
	id: "bllip-parser.md";
  slug: "bllip-parser";
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
"blog-post-how-to-use-crew-ai.md": {
	id: "blog-post-how-to-use-crew-ai.md";
  slug: "blog-post-how-to-use-crew-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"blog-posts.md": {
	id: "blog-posts.md";
  slug: "blog-posts";
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
"bmrm.md": {
	id: "bmrm.md";
  slug: "bmrm";
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
"bolt.md": {
	id: "bolt.md";
  slug: "bolt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"boltzmann-machines.md": {
	id: "boltzmann-machines.md";
  slug: "boltzmann-machines";
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
"book-gpt.md": {
	id: "book-gpt.md";
  slug: "book-gpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"bookmark.md": {
	id: "bookmark.md";
  slug: "bookmark";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"books.md": {
	id: "books.md";
  slug: "books";
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
"boost-your-day-to-day-efficiency-with-generative-ai.md": {
	id: "boost-your-day-to-day-efficiency-with-generative-ai.md";
  slug: "boost-your-day-to-day-efficiency-with-generative-ai";
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
"boruta.md": {
	id: "boruta.md";
  slug: "boruta";
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
"bowtie.md": {
	id: "bowtie.md";
  slug: "bowtie";
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
"bqplot.md": {
	id: "bqplot.md";
  slug: "bqplot";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"brain-js.md": {
	id: "brain-js.md";
  slug: "brain-js";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"brain.md": {
	id: "brain.md";
  slug: "brain";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"braincore.md": {
	id: "braincore.md";
  slug: "braincore";
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
"brainstorm.md": {
	id: "brainstorm.md";
  slug: "brainstorm";
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
"breeze.md": {
	id: "breeze.md";
  slug: "breeze";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"breze.md": {
	id: "breze.md";
  slug: "breze";
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
"brushfire.md": {
	id: "brushfire.md";
  slug: "brushfire";
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
"bsd-3-clause.md": {
	id: "bsd-3-clause.md";
  slug: "bsd-3-clause";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"bst.md": {
	id: "bst.md";
  slug: "bst";
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
"build-a-career-in-data-science.md": {
	id: "build-a-career-in-data-science.md";
  slug: "build-a-career-in-data-science";
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
"building-data-start-ups-fast-big-and-focused.md": {
	id: "building-data-start-ups-fast-big-and-focused.md";
  slug: "building-data-start-ups-fast-big-and-focused";
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
"burn.md": {
	id: "burn.md";
  slug: "burn";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"burr.md": {
	id: "burr.md";
  slug: "burr";
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
"byo-knowledge-graph.md": {
	id: "byo-knowledge-graph.md";
  slug: "byo-knowledge-graph";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"bytehub.md": {
	id: "bytehub.md";
  slug: "bytehub";
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
"c3-js.md": {
	id: "c3-js.md";
  slug: "c3-js";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"c3.md": {
	id: "c3.md";
  slug: "c3";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"c4-5.md": {
	id: "c4-5.md";
  slug: "c4-5";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"c50.md": {
	id: "c50.md";
  slug: "c50";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"caes-for-data-assimilation.md": {
	id: "caes-for-data-assimilation.md";
  slug: "caes-for-data-assimilation";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"caffe.md": {
	id: "caffe.md";
  slug: "caffe";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"calculated-risk.md": {
	id: "calculated-risk.md";
  slug: "calculated-risk";
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
"campusx.md": {
	id: "campusx.md";
  slug: "campusx";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"candle.md": {
	id: "candle.md";
  slug: "candle";
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
"cardmagic-classifier.md": {
	id: "cardmagic-classifier.md";
  slug: "cardmagic-classifier";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"caret.md": {
	id: "caret.md";
  slug: "caret";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"caretensemble.md": {
	id: "caretensemble.md";
  slug: "caretensemble";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cart-classification-and-regression-trees.md": {
	id: "cart-classification-and-regression-trees.md";
  slug: "cart-classification-and-regression-trees";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cartodb.md": {
	id: "cartodb.md";
  slug: "cartodb";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cartoons.md": {
	id: "cartoons.md";
  slug: "cartoons";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cartopy.md": {
	id: "cartopy.md";
  slug: "cartopy";
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
"casual-inference-for-data-science.md": {
	id: "casual-inference-for-data-science.md";
  slug: "casual-inference-for-data-science";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"catalyst.md": {
	id: "catalyst.md";
  slug: "catalyst";
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
"catboost.md": {
	id: "catboost.md";
  slug: "catboost";
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
"catniff.md": {
	id: "catniff.md";
  slug: "catniff";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"causal-inference-for-data-science.md": {
	id: "causal-inference-for-data-science.md";
  slug: "causal-inference-for-data-science";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"causalml.md": {
	id: "causalml.md";
  slug: "causalml";
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
"ccv.md": {
	id: "ccv.md";
  slug: "ccv";
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
"center-for-data-science.md": {
	id: "center-for-data-science.md";
  slug: "center-for-data-science";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cerebro2.md": {
	id: "cerebro2.md";
  slug: "cerebro2";
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
"chai-time-data-science.md": {
	id: "chai-time-data-science.md";
  slug: "chai-time-data-science";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"chain-of-thought-hub.md": {
	id: "chain-of-thought-hub.md";
  slug: "chain-of-thought-hub";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"chain-of-thoughts-papers.md": {
	id: "chain-of-thoughts-papers.md";
  slug: "chain-of-thoughts-papers";
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
"chalk.md": {
	id: "chalk.md";
  slug: "chalk";
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
"chartjs.md": {
	id: "chartjs.md";
  slug: "chartjs";
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
"chatabstractions.md": {
	id: "chatabstractions.md";
  slug: "chatabstractions";
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
"chatbot-arena-leaderboard.md": {
	id: "chatbot-arena-leaderboard.md";
  slug: "chatbot-arena-leaderboard";
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
"chatgpt-5-prompt-engineering-secrets-for-beginners.md": {
	id: "chatgpt-5-prompt-engineering-secrets-for-beginners.md";
  slug: "chatgpt-5-prompt-engineering-secrets-for-beginners";
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
"chatgpt-launch-blog.md": {
	id: "chatgpt-launch-blog.md";
  slug: "chatgpt-launch-blog";
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
"chatgpt-prompts-for-data-science.md": {
	id: "chatgpt-prompts-for-data-science.md";
  slug: "chatgpt-prompts-for-data-science";
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
"chatgptcoding.md": {
	id: "chatgptcoding.md";
  slug: "chatgptcoding";
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
"chefboost.md": {
	id: "chefboost.md";
  slug: "chefboost";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cheminfo.md": {
	id: "cheminfo.md";
  slug: "cheminfo";
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
"chinese-large-model-leaderboard.md": {
	id: "chinese-large-model-leaderboard.md";
  slug: "chinese-large-model-leaderboard";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"chip-huyen-s-blog.md": {
	id: "chip-huyen-s-blog.md";
  slug: "chip-huyen-s-blog";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"chips-n-salsa.md": {
	id: "chips-n-salsa.md";
  slug: "chips-n-salsa";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"chris-albon-s-website.md": {
	id: "chris-albon-s-website.md";
  slug: "chris-albon-s-website";
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
"clairesilver12.md": {
	id: "clairesilver12.md";
  slug: "clairesilver12";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"clare-corthell.md": {
	id: "clare-corthell.md";
  slug: "clare-corthell";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"clarin-repository.md": {
	id: "clarin-repository.md";
  slug: "clarin-repository";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"classic-computer-science-problems-in-python.md": {
	id: "classic-computer-science-problems-in-python.md";
  slug: "classic-computer-science-problems-in-python";
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
"cleanrl.md": {
	id: "cleanrl.md";
  slug: "cleanrl";
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
"cleartk.md": {
	id: "cleartk.md";
  slug: "cleartk";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"clever-algorithms-for-machine-learning.md": {
	id: "clever-algorithms-for-machine-learning.md";
  slug: "clever-algorithms-for-machine-learning";
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
"climatedata-us.md": {
	id: "climatedata-us.md";
  slug: "climatedata-us";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"climin.md": {
	id: "climin.md";
  slug: "climin";
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
"clipdrop.md": {
	id: "clipdrop.md";
  slug: "clipdrop";
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
"clj-boost.md": {
	id: "clj-boost.md";
  slug: "clj-boost";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"clj-ml.md": {
	id: "clj-ml.md";
  slug: "clj-ml";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"clojisr.md": {
	id: "clojisr.md";
  slug: "clojisr";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"clojupyter.md": {
	id: "clojupyter.md";
  slug: "clojupyter";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"clojure-opennlp.md": {
	id: "clojure-opennlp.md";
  slug: "clojure-opennlp";
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
"clojush.md": {
	id: "clojush.md";
  slug: "clojush";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"clortex.md": {
	id: "clortex.md";
  slug: "clortex";
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
"cloudforest.md": {
	id: "cloudforest.md";
  slug: "cloudforest";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cltk.md": {
	id: "cltk.md";
  slug: "cltk";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"clugen.md": {
	id: "clugen.md";
  slug: "clugen";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"clugenr.md": {
	id: "clugenr.md";
  slug: "clugenr";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"clusterfck.md": {
	id: "clusterfck.md";
  slug: "clusterfck";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"clustering-js.md": {
	id: "clustering-js.md";
  slug: "clustering-js";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"clustering.md": {
	id: "clustering.md";
  slug: "clustering";
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
"cmu-advanced-nlp-2022-prompting.md": {
	id: "cmu-advanced-nlp-2022-prompting.md";
  slug: "cmu-advanced-nlp-2022-prompting";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cmu-sphinx.md": {
	id: "cmu-sphinx.md";
  slug: "cmu-sphinx";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cntk.md": {
	id: "cntk.md";
  slug: "cntk";
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
"coach.md": {
	id: "coach.md";
  slug: "coach";
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
"code-with-ai.md": {
	id: "code-with-ai.md";
  slug: "code-with-ai";
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
"codetf.md": {
	id: "codetf.md";
  slug: "codetf";
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
"codexatlas.md": {
	id: "codexatlas.md";
  slug: "codexatlas";
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
"coding.md": {
	id: "coding.md";
  slug: "coding";
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
"cogcompnlp.md": {
	id: "cogcompnlp.md";
  slug: "cogcompnlp";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cogitare.md": {
	id: "cogitare.md";
  slug: "cogitare";
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
"colah-s-blog.md": {
	id: "colah-s-blog.md";
  slug: "colah-s-blog";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"colibri-core.md": {
	id: "colibri-core.md";
  slug: "colibri-core";
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
"colossal-ai.md": {
	id: "colossal-ai.md";
  slug: "colossal-ai";
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
"cometllm.md": {
	id: "cometllm.md";
  slug: "cometllm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cometml.md": {
	id: "cometml.md";
  slug: "cometml";
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
"comic-compilation.md": {
	id: "comic-compilation.md";
  slug: "comic-compilation";
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
"command-lines.md": {
	id: "command-lines.md";
  slug: "command-lines";
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
"community-curated-data-science-resources.md": {
	id: "community-curated-data-science-resources.md";
  slug: "community-curated-data-science-resources";
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
"community-projects.md": {
	id: "community-projects.md";
  slug: "community-projects";
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
"compassrank.md": {
	id: "compassrank.md";
  slug: "compassrank";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"competitions.md": {
	id: "competitions.md";
  slug: "competitions";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"compilergym.md": {
	id: "compilergym.md";
  slug: "compilergym";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"compmix.md": {
	id: "compmix.md";
  slug: "compmix";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"comportex.md": {
	id: "comportex.md";
  slug: "comportex";
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
"composer.md": {
	id: "composer.md";
  slug: "composer";
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
"computer-vision-in-action.md": {
	id: "computer-vision-in-action.md";
  slug: "computer-vision-in-action";
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
"conditional-random-field-crf.md": {
	id: "conditional-random-field-crf.md";
  slug: "conditional-random-field-crf";
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
"conjecture.md": {
	id: "conjecture.md";
  slug: "conjecture";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"connxr.md": {
	id: "connxr.md";
  slug: "connxr";
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
"contact-info.md": {
	id: "contact-info.md";
  slug: "contact-info";
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
"context-aware-rule-mining-transformer-based-framework.md": {
	id: "context-aware-rule-mining-transformer-based-framework.md";
  slug: "context-aware-rule-mining-transformer-based-framework";
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
"contextual-analysis.md": {
	id: "contextual-analysis.md";
  slug: "contextual-analysis";
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
"contourlets.md": {
	id: "contourlets.md";
  slug: "contourlets";
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
"convnet-js.md": {
	id: "convnet-js.md";
  slug: "convnet-js";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"convolutional-neural-network-cnn.md": {
	id: "convolutional-neural-network-cnn.md";
  slug: "convolutional-neural-network-cnn";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"copilotkit.md": {
	id: "copilotkit.md";
  slug: "copilotkit";
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
"core-torch7-demos-repository.md": {
	id: "core-torch7-demos-repository.md";
  slug: "core-torch7-demos-repository";
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
"corelearn.md": {
	id: "corelearn.md";
  slug: "corelearn";
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
"cornac.md": {
	id: "cornac.md";
  slug: "cornac";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"corpus-loaders.md": {
	id: "corpus-loaders.md";
  slug: "corpus-loaders";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cortex.md": {
	id: "cortex.md";
  slug: "cortex";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cortical-io.md": {
	id: "cortical-io.md";
  slug: "cortical-io";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"corvid.md": {
	id: "corvid.md";
  slug: "corvid";
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
"coursera-big-data-specialization.md": {
	id: "coursera-big-data-specialization.md";
  slug: "coursera-big-data-specialization";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"coursera-deep-learning-specialization.md": {
	id: "coursera-deep-learning-specialization.md";
  slug: "coursera-deep-learning-specialization";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"coursera-gan-specialization.md": {
	id: "coursera-gan-specialization.md";
  slug: "coursera-gan-specialization";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"coursera-introduction-to-data-science.md": {
	id: "coursera-introduction-to-data-science.md";
  slug: "coursera-introduction-to-data-science";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"coursera-natural-language-processing-specialization.md": {
	id: "coursera-natural-language-processing-specialization.md";
  slug: "coursera-natural-language-processing-specialization";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"coursera-tensorflow-in-practice.md": {
	id: "coursera-tensorflow-in-practice.md";
  slug: "coursera-tensorflow-in-practice";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"courses.md": {
	id: "courses.md";
  slug: "courses";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"covertree.md": {
	id: "covertree.md";
  slug: "covertree";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"covid-19-google.md": {
	id: "covid-19-google.md";
  slug: "covid-19-google";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"covid-19.md": {
	id: "covid-19.md";
  slug: "covid-19";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"crab.md": {
	id: "crab.md";
  slug: "crab";
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
"create-your-first-app-using-chatgpt.md": {
	id: "create-your-first-app-using-chatgpt.md";
  slug: "create-your-first-app-using-chatgpt";
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
"creatify-mcp.md": {
	id: "creatify-mcp.md";
  slug: "creatify-mcp";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"credits.md": {
	id: "credits.md";
  slug: "credits";
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
"crf.md": {
	id: "crf.md";
  slug: "crf";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"crfsuite.md": {
	id: "crfsuite.md";
  slug: "crfsuite";
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
"crystal-fann.md": {
	id: "crystal-fann.md";
  slug: "crystal-fann";
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
"cube.md": {
	id: "cube.md";
  slug: "cube";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cubist.md": {
	id: "cubist.md";
  slug: "cubist";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cuda.md": {
	id: "cuda.md";
  slug: "cuda";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cudf.md": {
	id: "cudf.md";
  slug: "cudf";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cuml.md": {
	id: "cuml.md";
  slug: "cuml";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"cupy.md": {
	id: "cupy.md";
  slug: "cupy";
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
"curvelets.md": {
	id: "curvelets.md";
  slug: "curvelets";
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
"cv.md": {
	id: "cv.md";
  slug: "cv";
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
"cybertron.md": {
	id: "cybertron.md";
  slug: "cybertron";
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
"d3-js.md": {
	id: "d3-js.md";
  slug: "d3-js";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"d3plus.md": {
	id: "d3plus.md";
  slug: "d3plus";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"d3py.md": {
	id: "d3py.md";
  slug: "d3py";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"d3rlpy.md": {
	id: "d3rlpy.md";
  slug: "d3rlpy";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"d3xter.md": {
	id: "d3xter.md";
  slug: "d3xter";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"d4rl.md": {
	id: "d4rl.md";
  slug: "d4rl";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"da.md": {
	id: "da.md";
  slug: "da";
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
"dalle-vs-mj-vs-stablediffusion.md": {
	id: "dalle-vs-mj-vs-stablediffusion.md";
  slug: "dalle-vs-mj-vs-stablediffusion";
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
"daniel-forsyth.md": {
	id: "daniel-forsyth.md";
  slug: "daniel-forsyth";
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
"darknet.md": {
	id: "darknet.md";
  slug: "darknet";
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
"dash.md": {
	id: "dash.md";
  slug: "dash";
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
"dask.md": {
	id: "dask.md";
  slug: "dask";
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
"data-analysis-with-python-and-pyspark.md": {
	id: "data-analysis-with-python-and-pyspark.md";
  slug: "data-analysis-with-python-and-pyspark";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"data-analytics-interview-questions-beginner-to-advanced.md": {
	id: "data-analytics-interview-questions-beginner-to-advanced.md";
  slug: "data-analytics-interview-questions-beginner-to-advanced";
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
"data-arrays.md": {
	id: "data-arrays.md";
  slug: "data-arrays";
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
"data-driven-code.md": {
	id: "data-driven-code.md";
  slug: "data-driven-code";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"data-driven-documents-d3js.md": {
	id: "data-driven-documents-d3js.md";
  slug: "data-driven-documents-d3js";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"data-engineering-podcast.md": {
	id: "data-engineering-podcast.md";
  slug: "data-engineering-podcast";
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
"data-for-all.md": {
	id: "data-for-all.md";
  slug: "data-for-all";
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
"data-frames-meta.md": {
	id: "data-frames-meta.md";
  slug: "data-frames-meta";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"data-gov.md": {
	id: "data-gov.md";
  slug: "data-gov";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"data-magnum.md": {
	id: "data-magnum.md";
  slug: "data-magnum";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"data-mania-blog.md": {
	id: "data-mania-blog.md";
  slug: "data-mania-blog";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"data-mania.md": {
	id: "data-mania.md";
  slug: "data-mania";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"data-mesh-in-action.md": {
	id: "data-mesh-in-action.md";
  slug: "data-mesh-in-action";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"data-mining-big-data-social-network-ana.md": {
	id: "data-mining-big-data-social-network-ana.md";
  slug: "data-mining-big-data-social-network-ana";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"data-mining-machine-learning-ai.md": {
	id: "data-mining-machine-learning-ai.md";
  slug: "data-mining-machine-learning-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"data-read.md": {
	id: "data-read.md";
  slug: "data-read";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"data-school.md": {
	id: "data-school.md";
  slug: "data-school";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"data-science-101.md": {
	id: "data-science-101.md";
  slug: "data-science-101";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"data-science-academy.md": {
	id: "data-science-academy.md";
  slug: "data-science-academy";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"data-science-bookcamp.md": {
	id: "data-science-bookcamp.md";
  slug: "data-science-bookcamp";
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
"data-science-closed-group.md": {
	id: "data-science-closed-group.md";
  slug: "data-science-closed-group";
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
"data-science-day.md": {
	id: "data-science-day.md";
  slug: "data-science-day";
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
"data-science-for-beginners.md": {
	id: "data-science-for-beginners.md";
  slug: "data-science-for-beginners";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"data-science-interviews-questions.md": {
	id: "data-science-interviews-questions.md";
  slug: "data-science-interviews-questions";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"data-science-ipython-notebooks.md": {
	id: "data-science-ipython-notebooks.md";
  slug: "data-science-ipython-notebooks";
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
"data-science-lab.md": {
	id: "data-science-lab.md";
  slug: "data-science-lab";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"data-science-london.md": {
	id: "data-science-london.md";
  slug: "data-science-london";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"data-science-mixer.md": {
	id: "data-science-mixer.md";
  slug: "data-science-mixer";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"data-science-primer.md": {
	id: "data-science-primer.md";
  slug: "data-science-primer";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"data-science-projects.md": {
	id: "data-science-projects.md";
  slug: "data-science-projects";
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
"data-science-technology-and-corporation.md": {
	id: "data-science-technology-and-corporation.md";
  slug: "data-science-technology-and-corporation";
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
"data-science-weekly.md": {
	id: "data-science-weekly.md";
  slug: "data-science-weekly";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"data-science-with-genetic-algorithms.md": {
	id: "data-science-with-genetic-algorithms.md";
  slug: "data-science-with-genetic-algorithms";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"data-science-your-way.md": {
	id: "data-science-your-way.md";
  slug: "data-science-your-way";
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
"data-scientist.md": {
	id: "data-scientist.md";
  slug: "data-scientist";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"data-skeptic.md": {
	id: "data-skeptic.md";
  slug: "data-skeptic";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"data-stories.md": {
	id: "data-stories.md";
  slug: "data-stories";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"data-table.md": {
	id: "data-table.md";
  slug: "data-table";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"data-visualization-ruby.md": {
	id: "data-visualization-ruby.md";
  slug: "data-visualization-ruby";
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
"datacamp-cheatsheets.md": {
	id: "datacamp-cheatsheets.md";
  slug: "datacamp-cheatsheets";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"datacast.md": {
	id: "datacast.md";
  slug: "datacast";
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
"datacite-org.md": {
	id: "datacite-org.md";
  slug: "datacite-org";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"dataclysm.md": {
	id: "dataclysm.md";
  slug: "dataclysm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"datacompy.md": {
	id: "datacompy.md";
  slug: "datacompy";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"dataconomy.md": {
	id: "dataconomy.md";
  slug: "dataconomy";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"datadeps.md": {
	id: "datadeps.md";
  slug: "datadeps";
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
"dataframe-go.md": {
	id: "dataframe-go.md";
  slug: "dataframe-go";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"dataframed.md": {
	id: "dataframed.md";
  slug: "dataframed";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"dataframes.md": {
	id: "dataframes.md";
  slug: "dataframes";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"datahub-io.md": {
	id: "datahub-io.md";
  slug: "datahub-io";
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
"datakit.md": {
	id: "datakit.md";
  slug: "datakit";
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
"datamaps.md": {
	id: "datamaps.md";
  slug: "datamaps";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"datamelt.md": {
	id: "datamelt.md";
  slug: "datamelt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"datanews.md": {
	id: "datanews.md";
  slug: "datanews";
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
"datascientistjourney.md": {
	id: "datascientistjourney.md";
  slug: "datascientistjourney";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"datascopeanalytics.md": {
	id: "datascopeanalytics.md";
  slug: "datascopeanalytics";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"datasetgpt.md": {
	id: "datasetgpt.md";
  slug: "datasetgpt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"datasets.md": {
	id: "datasets.md";
  slug: "datasets";
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
"datavisualization.md": {
	id: "datavisualization.md";
  slug: "datavisualization";
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
"datawrangling.md": {
	id: "datawrangling.md";
  slug: "datawrangling";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"datumbox.md": {
	id: "datumbox.md";
  slug: "datumbox";
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
"dc-js.md": {
	id: "dc-js.md";
  slug: "dc-js";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"deap.md": {
	id: "deap.md";
  slug: "deap";
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
"decision-tree.md": {
	id: "decision-tree.md";
  slug: "decision-tree";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"decision-trees.md": {
	id: "decision-trees.md";
  slug: "decision-trees";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"decision-weights.md": {
	id: "decision-weights.md";
  slug: "decision-weights";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"dedupe.md": {
	id: "dedupe.md";
  slug: "dedupe";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"deep-diamond.md": {
	id: "deep-diamond.md";
  slug: "deep-diamond";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"deep-embedded-clustering-dec.md": {
	id: "deep-embedded-clustering-dec.md";
  slug: "deep-embedded-clustering-dec";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"deep-high-resolution-net.md": {
	id: "deep-high-resolution-net.md";
  slug: "deep-high-resolution-net";
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
"deep-learning-architectures.md": {
	id: "deep-learning-architectures.md";
  slug: "deep-learning-architectures";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"deep-learning-cookbook.md": {
	id: "deep-learning-cookbook.md";
  slug: "deep-learning-cookbook";
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
"deep-learning-intelligence-from-big-data.md": {
	id: "deep-learning-intelligence-from-big-data.md";
  slug: "deep-learning-intelligence-from-big-data";
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
"deep-learning-interview-questions.md": {
	id: "deep-learning-interview-questions.md";
  slug: "deep-learning-interview-questions";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"deep-learning-with-pytorch.md": {
	id: "deep-learning-with-pytorch.md";
  slug: "deep-learning-with-pytorch";
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
"deepep.md": {
	id: "deepep.md";
  slug: "deepep";
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
"deepface.md": {
	id: "deepface.md";
  slug: "deepface";
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
"deepjavalibrary-djl.md": {
	id: "deepjavalibrary-djl.md";
  slug: "deepjavalibrary-djl";
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
"deeplearn-rs.md": {
	id: "deeplearn-rs.md";
  slug: "deeplearn-rs";
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
"deeplearning-scala.md": {
	id: "deeplearning-scala.md";
  slug: "deeplearning-scala";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"deeplearning4j.md": {
	id: "deeplearning4j.md";
  slug: "deeplearning4j";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"deepmind-lab.md": {
	id: "deepmind-lab.md";
  slug: "deepmind-lab";
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
"deeppavlov.md": {
	id: "deeppavlov.md";
  slug: "deeppavlov";
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
"deid-gpt-zero-shot-medical-text-de-identification-by-gpt-4.md": {
	id: "deid-gpt-zero-shot-medical-text-de-identification-by-gpt-4.md";
  slug: "deid-gpt-zero-shot-medical-text-de-identification-by-gpt-4";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"delight.md": {
	id: "delight.md";
  slug: "delight";
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
"delta.md": {
	id: "delta.md";
  slug: "delta";
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
"designing-cloud-data-platforms.md": {
	id: "designing-cloud-data-platforms.md";
  slug: "designing-cloud-data-platforms";
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
"detectron.md": {
	id: "detectron.md";
  slug: "detectron";
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
"dfdx.md": {
	id: "dfdx.md";
  slug: "dfdx";
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
"dgl.md": {
	id: "dgl.md";
  slug: "dgl";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"di-engine.md": {
	id: "di-engine.md";
  slug: "di-engine";
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
"diagramgpt.md": {
	id: "diagramgpt.md";
  slug: "diagramgpt";
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
"diffusion-segmentation.md": {
	id: "diffusion-segmentation.md";
  slug: "diffusion-segmentation";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"diffusionbot.md": {
	id: "diffusionbot.md";
  slug: "diffusionbot";
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
"digital-transformation.md": {
	id: "digital-transformation.md";
  slug: "digital-transformation";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"digits.md": {
	id: "digits.md";
  slug: "digits";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"dimension-reduction.md": {
	id: "dimension-reduction.md";
  slug: "dimension-reduction";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"dimple.md": {
	id: "dimple.md";
  slug: "dimple";
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
"disco.md": {
	id: "disco.md";
  slug: "disco";
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
"distance.md": {
	id: "distance.md";
  slug: "distance";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"distances.md": {
	id: "distances.md";
  slug: "distances";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"distill.md": {
	id: "distill.md";
  slug: "distill";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"distributed-machine-learning-patterns.md": {
	id: "distributed-machine-learning-patterns.md";
  slug: "distributed-machine-learning-patterns";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"distributed-machine-learning-tool-kit-dmtk.md": {
	id: "distributed-machine-learning-tool-kit-dmtk.md";
  slug: "distributed-machine-learning-tool-kit-dmtk";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"distributions.md": {
	id: "distributions.md";
  slug: "distributions";
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
"dive-into-deep-learning.md": {
	id: "dive-into-deep-learning.md";
  slug: "dive-into-deep-learning";
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
"dl-translate.md": {
	id: "dl-translate.md";
  slug: "dl-translate";
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
"dl4clj.md": {
	id: "dl4clj.md";
  slug: "dl4clj";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"dlib.md": {
	id: "dlib.md";
  slug: "dlib";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"dlrover.md": {
	id: "dlrover.md";
  slug: "dlrover";
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
"dn2a.md": {
	id: "dn2a.md";
  slug: "dn2a";
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
"dnngraph.md": {
	id: "dnngraph.md";
  slug: "dnngraph";
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
"dockerdl.md": {
	id: "dockerdl.md";
  slug: "dockerdl";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"dockerface.md": {
	id: "dockerface.md";
  slug: "dockerface";
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
"docuwriter-ai.md": {
	id: "docuwriter-ai.md";
  slug: "docuwriter-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"doddle-model.md": {
	id: "doddle-model.md";
  slug: "doddle-model";
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
"dominodatalab.md": {
	id: "dominodatalab.md";
  slug: "dominodatalab";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"dopamine.md": {
	id: "dopamine.md";
  slug: "dopamine";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"dora.md": {
	id: "dora.md";
  slug: "dora";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"dowel.md": {
	id: "dowel.md";
  slug: "dowel";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"dplyr.md": {
	id: "dplyr.md";
  slug: "dplyr";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"dr-michael-thomas-flanagan-s-java-scientific-library.md": {
	id: "dr-michael-thomas-flanagan-s-java-scientific-library.md";
  slug: "dr-michael-thomas-flanagan-s-java-scientific-library";
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
"dream-creator.md": {
	id: "dream-creator.md";
  slug: "dream-creator";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"dreambench.md": {
	id: "dreambench.md";
  slug: "dreambench";
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
"drew-conway.md": {
	id: "drew-conway.md";
  slug: "drew-conway";
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
"drqa.md": {
	id: "drqa.md";
  slug: "drqa";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"dsp.md": {
	id: "dsp.md";
  slug: "dsp";
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
"dsstne.md": {
	id: "dsstne.md";
  slug: "dsstne";
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
"dtaidistance.md": {
	id: "dtaidistance.md";
  slug: "dtaidistance";
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
"dygraphs.md": {
	id: "dygraphs.md";
  slug: "dygraphs";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"dynamic-animations-in-swiftui-with-gpt-4.md": {
	id: "dynamic-animations-in-swiftui-with-gpt-4.md";
  slug: "dynamic-animations-in-swiftui-with-gpt-4";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"dynaml.md": {
	id: "dynaml.md";
  slug: "dynaml";
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
"dynet.md": {
	id: "dynet.md";
  slug: "dynet";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"e1071.md": {
	id: "e1071.md";
  slug: "e1071";
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
"eaopt.md": {
	id: "eaopt.md";
  slug: "eaopt";
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
"earth.md": {
	id: "earth.md";
  slug: "earth";
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
"eblearn.md": {
	id: "eblearn.md";
  slug: "eblearn";
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
"editdistance.md": {
	id: "editdistance.md";
  slug: "editdistance";
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
"editor-s-choice.md": {
	id: "editor-s-choice.md";
  slug: "editor-s-choice";
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
"edward.md": {
	id: "edward.md";
  slug: "edward";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"effective-data-science-infrastructure.md": {
	id: "effective-data-science-infrastructure.md";
  slug: "effective-data-science-infrastructure";
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
"einops.md": {
	id: "einops.md";
  slug: "einops";
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
"elasticnet.md": {
	id: "elasticnet.md";
  slug: "elasticnet";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"elemstatlearn.md": {
	id: "elemstatlearn.md";
  slug: "elemstatlearn";
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
"elki.md": {
	id: "elki.md";
  slug: "elki";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"em-expectation-maximization.md": {
	id: "em-expectation-maximization.md";
  slug: "em-expectation-maximization";
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
"embeddings.md": {
	id: "embeddings.md";
  slug: "embeddings";
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
"emcee.md": {
	id: "emcee.md";
  slug: "emcee";
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
"emel.md": {
	id: "emel.md";
  slug: "emel";
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
"emgu-cv.md": {
	id: "emgu-cv.md";
  slug: "emgu-cv";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"emilio-ferrara-s-web-page.md": {
	id: "emilio-ferrara-s-web-page.md";
  slug: "emilio-ferrara-s-web-page";
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
"end-to-end-data-science-playlist.md": {
	id: "end-to-end-data-science-playlist.md";
  slug: "end-to-end-data-science-playlist";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"enigma-com.md": {
	id: "enigma-com.md";
  slug: "enigma-com";
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
"enron-email-dataset.md": {
	id: "enron-email-dataset.md";
  slug: "enron-email-dataset";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ensemble-learning.md": {
	id: "ensemble-learning.md";
  slug: "ensemble-learning";
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
"enterprise-miner.md": {
	id: "enterprise-miner.md";
  slug: "enterprise-miner";
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
"envision.md": {
	id: "envision.md";
  slug: "envision";
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
"espnet.md": {
	id: "espnet.md";
  slug: "espnet";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"essential-natural-language-processing.md": {
	id: "essential-natural-language-processing.md";
  slug: "essential-natural-language-processing";
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
"eurybia.md": {
	id: "eurybia.md";
  slug: "eurybia";
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
"evals-by-mosaicml.md": {
	id: "evals-by-mosaicml.md";
  slug: "evals-by-mosaicml";
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
"everyday-data-science.md": {
	id: "everyday-data-science.md";
  slug: "everyday-data-science";
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
"evolutionary-algorithms.md": {
	id: "evolutionary-algorithms.md";
  slug: "evolutionary-algorithms";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"evostra.md": {
	id: "evostra.md";
  slug: "evostra";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"evotorch.md": {
	id: "evotorch.md";
  slug: "evotorch";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"evtree.md": {
	id: "evtree.md";
  slug: "evtree";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"exadel-compreface.md": {
	id: "exadel-compreface.md";
  slug: "exadel-compreface";
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
"exhibit.md": {
	id: "exhibit.md";
  slug: "exhibit";
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
"exploring-data-science.md": {
	id: "exploring-data-science.md";
  slug: "exploring-data-science";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"exploring-the-data-jungle.md": {
	id: "exploring-the-data-jungle.md";
  slug: "exploring-the-data-jungle";
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
"face-recognition.md": {
	id: "face-recognition.md";
  slug: "face-recognition";
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
"facebook-data-science-page.md": {
	id: "facebook-data-science-page.md";
  slug: "facebook-data-science-page";
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
"factorie.md": {
	id: "factorie.md";
  slug: "factorie";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"factory-miner.md": {
	id: "factory-miner.md";
  slug: "factory-miner";
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
"far-search-tool.md": {
	id: "far-search-tool.md";
  slug: "far-search-tool";
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
"fastai.md": {
	id: "fastai.md";
  slug: "fastai";
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
"fastmath.md": {
	id: "fastmath.md";
  slug: "fastmath";
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
"featureforge.md": {
	id: "featureforge.md";
  slug: "featureforge";
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
"fedot.md": {
	id: "fedot.md";
  slug: "fedot";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"felm.md": {
	id: "felm.md";
  slug: "felm";
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
"fido.md": {
	id: "fido.md";
  slug: "fido";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"figaro.md": {
	id: "figaro.md";
  slug: "figaro";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"fighting-churn-with-data.md": {
	id: "fighting-churn-with-data.md";
  slug: "fighting-churn-with-data";
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
"figshare-com.md": {
	id: "figshare-com.md";
  slug: "figshare-com";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"figue.md": {
	id: "figue.md";
  slug: "figue";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"fin.md": {
	id: "fin.md";
  slug: "fin";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"financialdata-net.md": {
	id: "financialdata-net.md";
  slug: "financialdata-net";
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
"finrl.md": {
	id: "finrl.md";
  slug: "finrl";
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
"flaggems.md": {
	id: "flaggems.md";
  slug: "flaggems";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"flair.md": {
	id: "flair.md";
  slug: "flair";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"flama.md": {
	id: "flama.md";
  slug: "flama";
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
"flan5-llm.md": {
	id: "flan5-llm.md";
  slug: "flan5-llm";
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
"flare.md": {
	id: "flare.md";
  slug: "flare";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"flashlight.md": {
	id: "flashlight.md";
  slug: "flashlight";
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
"flax.md": {
	id: "flax.md";
  slug: "flax";
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
"flexml.md": {
	id: "flexml.md";
  slug: "flexml";
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
"flight-fare-prediction.md": {
	id: "flight-fare-prediction.md";
  slug: "flight-fare-prediction";
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
"flink.md": {
	id: "flink.md";
  slug: "flink";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"flinkml-in-apache-flink.md": {
	id: "flinkml-in-apache-flink.md";
  slug: "flinkml-in-apache-flink";
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
"flowingdata.md": {
	id: "flowingdata.md";
  slug: "flowingdata";
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
"floydhub.md": {
	id: "floydhub.md";
  slug: "floydhub";
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
"forecast.md": {
	id: "forecast.md";
  slug: "forecast";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"forecasthybrid.md": {
	id: "forecasthybrid.md";
  slug: "forecasthybrid";
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
"foundations-of-data-science.md": {
	id: "foundations-of-data-science.md";
  slug: "foundations-of-data-science";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"fp-growth-frequent-pattern-growth-algorithm.md": {
	id: "fp-growth-frequent-pattern-growth-algorithm.md";
  slug: "fp-growth-frequent-pattern-growth-algorithm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"fpc.md": {
	id: "fpc.md";
  slug: "fpc";
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
"frbs.md": {
	id: "frbs.md";
  slug: "frbs";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"freepik-ai.md": {
	id: "freepik-ai.md";
  slug: "freepik-ai";
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
"frog.md": {
	id: "frog.md";
  slug: "frog";
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
"frouros.md": {
	id: "frouros.md";
  slug: "frouros";
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
"fuku-ml.md": {
	id: "fuku-ml.md";
  slug: "fuku-ml";
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
"full-stack-data-scientist.md": {
	id: "full-stack-data-scientist.md";
  slug: "full-stack-data-scientist";
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
"fungp.md": {
	id: "fungp.md";
  slug: "fungp";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"fusioncharts.md": {
	id: "fusioncharts.md";
  slug: "fusioncharts";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"fuzzy-wuzzy.md": {
	id: "fuzzy-wuzzy.md";
  slug: "fuzzy-wuzzy";
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
"gadfly.md": {
	id: "gadfly.md";
  slug: "gadfly";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gaimc.md": {
	id: "gaimc.md";
  slug: "gaimc";
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
"gamboost.md": {
	id: "gamboost.md";
  slug: "gamboost";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gamboostlss.md": {
	id: "gamboostlss.md";
  slug: "gamboostlss";
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
"ganitha.md": {
	id: "ganitha.md";
  slug: "ganitha";
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
"garage.md": {
	id: "garage.md";
  slug: "garage";
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
"gaugan2.md": {
	id: "gaugan2.md";
  slug: "gaugan2";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gaussian-mixture-model.md": {
	id: "gaussian-mixture-model.md";
  slug: "gaussian-mixture-model";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gaussian-processes.md": {
	id: "gaussian-processes.md";
  slug: "gaussian-processes";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gaussianmixtures.md": {
	id: "gaussianmixtures.md";
  slug: "gaussianmixtures";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gbm.md": {
	id: "gbm.md";
  slug: "gbm";
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
"gempix2.md": {
	id: "gempix2.md";
  slug: "gempix2";
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
"generative-adversarial-network-gan.md": {
	id: "generative-adversarial-network-gan.md";
  slug: "generative-adversarial-network-gan";
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
"generative-ai-audio.md": {
	id: "generative-ai-audio.md";
  slug: "generative-ai-audio";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"generative-ai-for-games.md": {
	id: "generative-ai-for-games.md";
  slug: "generative-ai-for-games";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"generative-ai-images.md": {
	id: "generative-ai-images.md";
  slug: "generative-ai-images";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"generative-ai-models.md": {
	id: "generative-ai-models.md";
  slug: "generative-ai-models";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"generative-ai-video.md": {
	id: "generative-ai-video.md";
  slug: "generative-ai-video";
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
"generative-deep-art.md": {
	id: "generative-deep-art.md";
  slug: "generative-deep-art";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"generative-models.md": {
	id: "generative-models.md";
  slug: "generative-models";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"genetic-algorithms-and-evolutionary-computation.md": {
	id: "genetic-algorithms-and-evolutionary-computation.md";
  slug: "genetic-algorithms-and-evolutionary-computation";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"genetic-algorithms-and-genetic-programming.md": {
	id: "genetic-algorithms-and-genetic-programming.md";
  slug: "genetic-algorithms-and-genetic-programming";
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
"geni.md": {
	id: "geni.md";
  slug: "geni";
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
"genius.md": {
	id: "genius.md";
  slug: "genius";
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
"gensbot.md": {
	id: "gensbot.md";
  slug: "gensbot";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"genshare.md": {
	id: "genshare.md";
  slug: "genshare";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gensim.md": {
	id: "gensim.md";
  slug: "gensim";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"geoffrey-hinton-s-neural-networks-for-machine-learning.md": {
	id: "geoffrey-hinton-s-neural-networks-for-machine-learning.md";
  slug: "geoffrey-hinton-s-neural-networks-for-machine-learning";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"geolite-legacy-downloadable-databases.md": {
	id: "geolite-legacy-downloadable-databases.md";
  slug: "geolite-legacy-downloadable-databases";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"geomap.md": {
	id: "geomap.md";
  slug: "geomap";
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
"gephi.md": {
	id: "gephi.md";
  slug: "gephi";
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
"ggfortify.md": {
	id: "ggfortify.md";
  slug: "ggfortify";
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
"ggplot.md": {
	id: "ggplot.md";
  slug: "ggplot";
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
"ghdx.md": {
	id: "ghdx.md";
  slug: "ghdx";
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
"ghtorrent.md": {
	id: "ghtorrent.md";
  slug: "ghtorrent";
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
"glean.md": {
	id: "glean.md";
  slug: "glean";
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
"glm.md": {
	id: "glm.md";
  slug: "glm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"glmnet.md": {
	id: "glmnet.md";
  slug: "glmnet";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"glmpath.md": {
	id: "glmpath.md";
  slug: "glmpath";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"globe.md": {
	id: "globe.md";
  slug: "globe";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"glossary-of-common-statistics-and-ml-terms.md": {
	id: "glossary-of-common-statistics-and-ml-terms.md";
  slug: "glossary-of-common-statistics-and-ml-terms";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"glot.md": {
	id: "glot.md";
  slug: "glot";
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
"glue.md": {
	id: "glue.md";
  slug: "glue";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gmmboost.md": {
	id: "gmmboost.md";
  slug: "gmmboost";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"go-dnn.md": {
	id: "go-dnn.md";
  slug: "go-dnn";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"go-featureprocessing.md": {
	id: "go-featureprocessing.md";
  slug: "go-featureprocessing";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"go-galib.md": {
	id: "go-galib.md";
  slug: "go-galib";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"go-geom.md": {
	id: "go-geom.md";
  slug: "go-geom";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"go-graph.md": {
	id: "go-graph.md";
  slug: "go-graph";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"go-ml-benchmarks.md": {
	id: "go-ml-benchmarks.md";
  slug: "go-ml-benchmarks";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"go-ml-transpiler.md": {
	id: "go-ml-transpiler.md";
  slug: "go-ml-transpiler";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"go-ml.md": {
	id: "go-ml.md";
  slug: "go-ml";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"go-mxnet-predictor.md": {
	id: "go-mxnet-predictor.md";
  slug: "go-mxnet-predictor";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"go-ngram.md": {
	id: "go-ngram.md";
  slug: "go-ngram";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"go-porterstemmer.md": {
	id: "go-porterstemmer.md";
  slug: "go-porterstemmer";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"go-pr.md": {
	id: "go-pr.md";
  slug: "go-pr";
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
"gobrain.md": {
	id: "gobrain.md";
  slug: "gobrain";
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
"gocv.md": {
	id: "gocv.md";
  slug: "gocv";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gogeo.md": {
	id: "gogeo.md";
  slug: "gogeo";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gold.md": {
	id: "gold.md";
  slug: "gold";
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
"golearn.md": {
	id: "golearn.md";
  slug: "golearn";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"goml.md": {
	id: "goml.md";
  slug: "goml";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gonn.md": {
	id: "gonn.md";
  slug: "gonn";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gonum-graph.md": {
	id: "gonum-graph.md";
  slug: "gonum-graph";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gonum-mat.md": {
	id: "gonum-mat.md";
  slug: "gonum-mat";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gonum-optimize.md": {
	id: "gonum-optimize.md";
  slug: "gonum-optimize";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gonum-plot.md": {
	id: "gonum-plot.md";
  slug: "gonum-plot";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gonum-stat.md": {
	id: "gonum-stat.md";
  slug: "gonum-stat";
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
"google-chart-gallery.md": {
	id: "google-chart-gallery.md";
  slug: "google-chart-gallery";
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
"google-dataset-search-beta.md": {
	id: "google-dataset-search-beta.md";
  slug: "google-dataset-search-beta";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"google-dataset-search.md": {
	id: "google-dataset-search.md";
  slug: "google-dataset-search";
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
"google-public-data.md": {
	id: "google-public-data.md";
  slug: "google-public-data";
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
"gorgonia.md": {
	id: "gorgonia.md";
  slug: "gorgonia";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gorilla.md": {
	id: "gorilla.md";
  slug: "gorilla";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"goro.md": {
	id: "goro.md";
  slug: "goro";
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
"gota.md": {
	id: "gota.md";
  slug: "gota";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gower-express.md": {
	id: "gower-express.md";
  slug: "gower-express";
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
"gpt-3-demo.md": {
	id: "gpt-3-demo.md";
  slug: "gpt-3-demo";
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
"gpt-4-demo.md": {
	id: "gpt-4-demo.md";
  slug: "gpt-4-demo";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gpt-4-for-debugging.md": {
	id: "gpt-4-for-debugging.md";
  slug: "gpt-4-for-debugging";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gpt-4-for-making-google-chrome-extensions.md": {
	id: "gpt-4-for-making-google-chrome-extensions.md";
  slug: "gpt-4-for-making-google-chrome-extensions";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gpt-4-for-matchmaking.md": {
	id: "gpt-4-for-matchmaking.md";
  slug: "gpt-4-for-matchmaking";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gpt-4-for-roblox-game-dev.md": {
	id: "gpt-4-for-roblox-game-dev.md";
  slug: "gpt-4-for-roblox-game-dev";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gpt-4-news-and-announcements.md": {
	id: "gpt-4-news-and-announcements.md";
  slug: "gpt-4-news-and-announcements";
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
"gpt-4-technical-report.md": {
	id: "gpt-4-technical-report.md";
  slug: "gpt-4-technical-report";
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
"gpt-fast.md": {
	id: "gpt-fast.md";
  slug: "gpt-fast";
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
"gpt-political-compass.md": {
	id: "gpt-political-compass.md";
  slug: "gpt-political-compass";
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
"gpt4.md": {
	id: "gpt4.md";
  slug: "gpt4";
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
"gpytorch.md": {
	id: "gpytorch.md";
  slug: "gpytorch";
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
"gradient-boosting.md": {
	id: "gradient-boosting.md";
  slug: "gradient-boosting";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gradient-descent.md": {
	id: "gradient-descent.md";
  slug: "gradient-descent";
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
"graph-algorithms-for-data-science.md": {
	id: "graph-algorithms-for-data-science.md";
  slug: "graph-algorithms-for-data-science";
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
"graph-layout.md": {
	id: "graph-layout.md";
  slug: "graph-layout";
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
"graphlab-create.md": {
	id: "graphlab-create.md";
  slug: "graphlab-create";
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
"greatcircle.md": {
	id: "greatcircle.md";
  slug: "greatcircle";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"greg-kamradt-playlist.md": {
	id: "greg-kamradt-playlist.md";
  slug: "greg-kamradt-playlist";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"greg-reda.md": {
	id: "greg-reda.md";
  slug: "greg-reda";
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
"grokking-bayes.md": {
	id: "grokking-bayes.md";
  slug: "grokking-bayes";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"grokking-machine-learning.md": {
	id: "grokking-machine-learning.md";
  slug: "grokking-machine-learning";
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
"group-lasso.md": {
	id: "group-lasso.md";
  slug: "group-lasso";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"grouplens-org.md": {
	id: "grouplens-org.md";
  slug: "grouplens-org";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"grplasso.md": {
	id: "grplasso.md";
  slug: "grplasso";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"grpreg.md": {
	id: "grpreg.md";
  slug: "grpreg";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"grt.md": {
	id: "grt.md";
  slug: "grt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gru-ai.md": {
	id: "gru-ai.md";
  slug: "gru-ai";
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
"gym4real.md": {
	id: "gym4real.md";
  slug: "gym4real";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gymnasium-robotics.md": {
	id: "gymnasium-robotics.md";
  slug: "gymnasium-robotics";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"gymnasium.md": {
	id: "gymnasium.md";
  slug: "gymnasium";
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
"h2o-sparkling-water.md": {
	id: "h2o-sparkling-water.md";
  slug: "h2o-sparkling-water";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"h2o.md": {
	id: "h2o.md";
  slug: "h2o";
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
"h2ogpt.md": {
	id: "h2ogpt.md";
  slug: "h2ogpt";
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
"hadoop.md": {
	id: "hadoop.md";
  slug: "hadoop";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"hadoopilluminated-com.md": {
	id: "hadoopilluminated-com.md";
  slug: "hadoopilluminated-com";
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
"hakan-kardas.md": {
	id: "hakan-kardas.md";
  slug: "hakan-kardas";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"half-beer.md": {
	id: "half-beer.md";
  slug: "half-beer";
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
"hanami.md": {
	id: "hanami.md";
  slug: "hanami";
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
"handsonml.md": {
	id: "handsonml.md";
  slug: "handsonml";
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
"harvard-data-science.md": {
	id: "harvard-data-science.md";
  slug: "harvard-data-science";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"haskell-ml.md": {
	id: "haskell-ml.md";
  slug: "haskell-ml";
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
"hda.md": {
	id: "hda.md";
  slug: "hda";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"hdbscan.md": {
	id: "hdbscan.md";
  slug: "hdbscan";
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
"heart-disease-prediction.md": {
	id: "heart-disease-prediction.md";
  slug: "heart-disease-prediction";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"hebel.md": {
	id: "hebel.md";
  slug: "hebel";
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
"hera.md": {
	id: "hera.md";
  slug: "hera";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"heroes-wear-masks.md": {
	id: "heroes-wear-masks.md";
  slug: "heroes-wear-masks";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"heuristic-approaches.md": {
	id: "heuristic-approaches.md";
  slug: "heuristic-approaches";
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
"hidden-markov-models-hmm.md": {
	id: "hidden-markov-models-hmm.md";
  slug: "hidden-markov-models-hmm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"high-charts.md": {
	id: "high-charts.md";
  slug: "high-charts";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"highcarts.md": {
	id: "highcarts.md";
  slug: "highcarts";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"hilary-mason.md": {
	id: "hilary-mason.md";
  slug: "hilary-mason";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"hilary-parker.md": {
	id: "hilary-parker.md";
  slug: "hilary-parker";
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
"hivemind.md": {
	id: "hivemind.md";
  slug: "hivemind";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"hlearn.md": {
	id: "hlearn.md";
  slug: "hlearn";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"hnn.md": {
	id: "hnn.md";
  slug: "hnn";
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
"homemade-machine-learning.md": {
	id: "homemade-machine-learning.md";
  slug: "homemade-machine-learning";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"hopfield-networks.md": {
	id: "hopfield-networks.md";
  slug: "hopfield-networks";
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
"horovod.md": {
	id: "horovod.md";
  slug: "horovod";
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
"how-generative-ai-is-changing-creative-work.md": {
	id: "how-generative-ai-is-changing-creative-work.md";
  slug: "how-generative-ai-is-changing-creative-work";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"how-to-become-a-data-scientist.md": {
	id: "how-to-become-a-data-scientist.md";
  slug: "how-to-become-a-data-scientist";
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
"how-to-interview-a-data-scientist.md": {
	id: "how-to-interview-a-data-scientist.md";
  slug: "how-to-interview-a-data-scientist";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"how-to-lead-in-data-science.md": {
	id: "how-to-lead-in-data-science.md";
  slug: "how-to-lead-in-data-science";
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
"htm-java.md": {
	id: "htm-java.md";
  slug: "htm-java";
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
"hub.md": {
	id: "hub.md";
  slug: "hub";
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
"human-generator.md": {
	id: "human-generator.md";
  slug: "human-generator";
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
"hybrid-recommender-system.md": {
	id: "hybrid-recommender-system.md";
  slug: "hybrid-recommender-system";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"hydrosphere-mist.md": {
	id: "hydrosphere-mist.md";
  slug: "hydrosphere-mist";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"hyperas.md": {
	id: "hyperas.md";
  slug: "hyperas";
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
"hyperlearn.md": {
	id: "hyperlearn.md";
  slug: "hyperlearn";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"hyperopt.md": {
	id: "hyperopt.md";
  slug: "hyperopt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"hyperparameter-optimization-of-machine-learning-algorithms.md": {
	id: "hyperparameter-optimization-of-machine-learning-algorithms.md";
  slug: "hyperparameter-optimization-of-machine-learning-algorithms";
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
"hypothesis-tests.md": {
	id: "hypothesis-tests.md";
  slug: "hypothesis-tests";
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
"i-am-trask.md": {
	id: "i-am-trask.md";
  slug: "i-am-trask";
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
"ibb-open-portal.md": {
	id: "ibb-open-portal.md";
  slug: "ibb-open-portal";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ibm-asset-dataset.md": {
	id: "ibm-asset-dataset.md";
  slug: "ibm-asset-dataset";
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
"icoloring.md": {
	id: "icoloring.md";
  slug: "icoloring";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ideogram.md": {
	id: "ideogram.md";
  slug: "ideogram";
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
"igraph.md": {
	id: "igraph.md";
  slug: "igraph";
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
"image-creation-with-dall-e-3.md": {
	id: "image-creation-with-dall-e-3.md";
  slug: "image-creation-with-dall-e-3";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"image.md": {
	id: "image.md";
  slug: "image";
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
"images.md": {
	id: "images.md";
  slug: "images";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"imagine-by-magic-studio.md": {
	id: "imagine-by-magic-studio.md";
  slug: "imagine-by-magic-studio";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"imbalanced-ensemble.md": {
	id: "imbalanced-ensemble.md";
  slug: "imbalanced-ensemble";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"imbalanced-learn.md": {
	id: "imbalanced-learn.md";
  slug: "imbalanced-learn";
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
"imodels.md": {
	id: "imodels.md";
  slug: "imodels";
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
"impala.md": {
	id: "impala.md";
  slug: "impala";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"implicit.md": {
	id: "implicit.md";
  slug: "implicit";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"import-io.md": {
	id: "import-io.md";
  slug: "import-io";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"improving-language-understanding-by-generative-pre-training.md": {
	id: "improving-language-understanding-by-generative-pre-training.md";
  slug: "improving-language-understanding-by-generative-pre-training";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"imutils.md": {
	id: "imutils.md";
  slug: "imutils";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"incanter.md": {
	id: "incanter.md";
  slug: "incanter";
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
"infections-clj.md": {
	id: "infections-clj.md";
  slug: "infections-clj";
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
"infer.md": {
	id: "infer.md";
  slug: "infer";
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
"infibench.md": {
	id: "infibench.md";
  slug: "infibench";
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
"installation-guides.md": {
	id: "installation-guides.md";
  slug: "installation-guides";
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
"instruction-tuning-papers.md": {
	id: "instruction-tuning-papers.md";
  slug: "instruction-tuning-papers";
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
"integrations.md": {
	id: "integrations.md";
  slug: "integrations";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"intel-oneapi-data-analytics-library.md": {
	id: "intel-oneapi-data-analytics-library.md";
  slug: "intel-oneapi-data-analytics-library";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"intel-r-extension-for-scikit-learn.md": {
	id: "intel-r-extension-for-scikit-learn.md";
  slug: "intel-r-extension-for-scikit-learn";
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
"interactive-composition-explorer.md": {
	id: "interactive-composition-explorer.md";
  slug: "interactive-composition-explorer";
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
"interpretable.md": {
	id: "interpretable.md";
  slug: "interpretable";
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
"introducing-data-science.md": {
	id: "introducing-data-science.md";
  slug: "introducing-data-science";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"introduction-to-data-science.md": {
	id: "introduction-to-data-science.md";
  slug: "introduction-to-data-science";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"introduction-to-deep-learning-with-python.md": {
	id: "introduction-to-deep-learning-with-python.md";
  slug: "introduction-to-deep-learning-with-python";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"introduction-to-generative-ai-for-business-professionals.md": {
	id: "introduction-to-generative-ai-for-business-professionals.md";
  slug: "introduction-to-generative-ai-for-business-professionals";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"introduction-to-generative-ai-in-marketing.md": {
	id: "introduction-to-generative-ai-in-marketing.md";
  slug: "introduction-to-generative-ai-in-marketing";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"introduction-to-machine-learning-with-python.md": {
	id: "introduction-to-machine-learning-with-python.md";
  slug: "introduction-to-machine-learning-with-python";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"introduction-to-machine-learning-with-scikit-learn.md": {
	id: "introduction-to-machine-learning-with-scikit-learn.md";
  slug: "introduction-to-machine-learning-with-scikit-learn";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"introduction-to-prompt-engineering.md": {
	id: "introduction-to-prompt-engineering.md";
  slug: "introduction-to-prompt-engineering";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"introduction-to-prompt-hacking.md": {
	id: "introduction-to-prompt-hacking.md";
  slug: "introduction-to-prompt-hacking";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"introduction-to-statistical-learning.md": {
	id: "introduction-to-statistical-learning.md";
  slug: "introduction-to-statistical-learning";
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
"ios-shortcut-to-gpt-4-and-github.md": {
	id: "ios-shortcut-to-gpt-4-and-github.md";
  slug: "ios-shortcut-to-gpt-4-and-github";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"iot-owl.md": {
	id: "iot-owl.md";
  slug: "iot-owl";
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
"ipred.md": {
	id: "ipred.md";
  slug: "ipred";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ipychart.md": {
	id: "ipychart.md";
  slug: "ipychart";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ipython-notebooks.md": {
	id: "ipython-notebooks.md";
  slug: "ipython-notebooks";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"iris.md": {
	id: "iris.md";
  slug: "iris";
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
"is-data-science-a-good-career.md": {
	id: "is-data-science-a-good-career.md";
  slug: "is-data-science-a-good-career";
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
"isolation-forest.md": {
	id: "isolation-forest.md";
  slug: "isolation-forest";
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
"jan-oliver-r-diger.md": {
	id: "jan-oliver-r-diger.md";
  slug: "jan-oliver-r-diger";
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
"java-interop.md": {
	id: "java-interop.md";
  slug: "java-interop";
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
"javascript-for-data-science.md": {
	id: "javascript-for-data-science.md";
  slug: "javascript-for-data-science";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"javascript-interop.md": {
	id: "javascript-interop.md";
  slug: "javascript-interop";
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
"jax.md": {
	id: "jax.md";
  slug: "jax";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"jellyfish.md": {
	id: "jellyfish.md";
  slug: "jellyfish";
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
"jieba.md": {
	id: "jieba.md";
  slug: "jieba";
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
"jina-ai.md": {
	id: "jina-ai.md";
  slug: "jina-ai";
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
"jina.md": {
	id: "jina.md";
  slug: "jina";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"jingles.md": {
	id: "jingles.md";
  slug: "jingles";
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
"joligen.md": {
	id: "joligen.md";
  slug: "joligen";
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
"jprocessing.md": {
	id: "jprocessing.md";
  slug: "jprocessing";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"jruby-mahout.md": {
	id: "jruby-mahout.md";
  slug: "jruby-mahout";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"jscipy.md": {
	id: "jscipy.md";
  slug: "jscipy";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"jsmlt.md": {
	id: "jsmlt.md";
  slug: "jsmlt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"julia-data.md": {
	id: "julia-data.md";
  slug: "julia-data";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"julia-evans.md": {
	id: "julia-evans.md";
  slug: "julia-evans";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"julia-for-data-analysis.md": {
	id: "julia-for-data-analysis.md";
  slug: "julia-for-data-analysis";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"julia-for-data-science.md": {
	id: "julia-for-data-science.md";
  slug: "julia-for-data-science";
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
"juliacon-presentations.md": {
	id: "juliacon-presentations.md";
  slug: "juliacon-presentations";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"jumanji.md": {
	id: "jumanji.md";
  slug: "jumanji";
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
"jupyter-notebooks.md": {
	id: "jupyter-notebooks.md";
  slug: "jupyter-notebooks";
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
"jutsu-ai.md": {
	id: "jutsu-ai.md";
  slug: "jutsu-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"k-means.md": {
	id: "k-means.md";
  slug: "k-means";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"kaggle-accelerometer.md": {
	id: "kaggle-accelerometer.md";
  slug: "kaggle-accelerometer";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"kaggle-acquire-valued-shoppers-challenge.md": {
	id: "kaggle-acquire-valued-shoppers-challenge.md";
  slug: "kaggle-acquire-valued-shoppers-challenge";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"kaggle-advertised-salaries.md": {
	id: "kaggle-advertised-salaries.md";
  slug: "kaggle-advertised-salaries";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"kaggle-amazon.md": {
	id: "kaggle-amazon.md";
  slug: "kaggle-amazon";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"kaggle-and-business-analyses.md": {
	id: "kaggle-and-business-analyses.md";
  slug: "kaggle-and-business-analyses";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"kaggle-bestbuy-big.md": {
	id: "kaggle-bestbuy-big.md";
  slug: "kaggle-bestbuy-big";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"kaggle-bestbuy-small.md": {
	id: "kaggle-bestbuy-small.md";
  slug: "kaggle-bestbuy-small";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"kaggle-blackbox.md": {
	id: "kaggle-blackbox.md";
  slug: "kaggle-blackbox";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"kaggle-cifar.md": {
	id: "kaggle-cifar.md";
  slug: "kaggle-cifar";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"kaggle-datasets.md": {
	id: "kaggle-datasets.md";
  slug: "kaggle-datasets";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"kaggle-dogs-vs-cats.md": {
	id: "kaggle-dogs-vs-cats.md";
  slug: "kaggle-dogs-vs-cats";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"kaggle-galaxy-challenge.md": {
	id: "kaggle-galaxy-challenge.md";
  slug: "kaggle-galaxy-challenge";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"kaggle-gender.md": {
	id: "kaggle-gender.md";
  slug: "kaggle-gender";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"kaggle-insults.md": {
	id: "kaggle-insults.md";
  slug: "kaggle-insults";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"kaggle-merck.md": {
	id: "kaggle-merck.md";
  slug: "kaggle-merck";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"kaggle-past-solutions.md": {
	id: "kaggle-past-solutions.md";
  slug: "kaggle-past-solutions";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"kaggle-stackoverflow.md": {
	id: "kaggle-stackoverflow.md";
  slug: "kaggle-stackoverflow";
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
"kaldi.md": {
	id: "kaldi.md";
  slug: "kaldi";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"kalman.md": {
	id: "kalman.md";
  slug: "kalman";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"kandle.md": {
	id: "kandle.md";
  slug: "kandle";
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
"kartograph-py.md": {
	id: "kartograph-py.md";
  slug: "kartograph-py";
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
"kd-nuggets.md": {
	id: "kd-nuggets.md";
  slug: "kd-nuggets";
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
"keras-beginner-tutorial.md": {
	id: "keras-beginner-tutorial.md";
  slug: "keras-beginner-tutorial";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"keras-contrib.md": {
	id: "keras-contrib.md";
  slug: "keras-contrib";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"keras-gpt-copilot.md": {
	id: "keras-gpt-copilot.md";
  slug: "keras-gpt-copilot";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"keras-in-motion.md": {
	id: "keras-in-motion.md";
  slug: "keras-in-motion";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"keras-js.md": {
	id: "keras-js.md";
  slug: "keras-js";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"keras-rl.md": {
	id: "keras-rl.md";
  slug: "keras-rl";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"keras-tuner.md": {
	id: "keras-tuner.md";
  slug: "keras-tuner";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"keras-tutorials.md": {
	id: "keras-tutorials.md";
  slug: "keras-tutorials";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"keras.md": {
	id: "keras.md";
  slug: "keras";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"kerascv.md": {
	id: "kerascv.md";
  slug: "kerascv";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"kernel-density.md": {
	id: "kernel-density.md";
  slug: "kernel-density";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"kernlab.md": {
	id: "kernlab.md";
  slug: "kernlab";
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
"kinho.md": {
	id: "kinho.md";
  slug: "kinho";
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
"kixistats.md": {
	id: "kixistats.md";
  slug: "kixistats";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"klar.md": {
	id: "klar.md";
  slug: "klar";
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
"kmeans-js.md": {
	id: "kmeans-js.md";
  slug: "kmeans-js";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"knear.md": {
	id: "knear.md";
  slug: "knear";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"knet.md": {
	id: "knet.md";
  slug: "knet";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"knn-java-library.md": {
	id: "knn-java-library.md";
  slug: "knn-java-library";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"knn-k-nearest-neighbors.md": {
	id: "knn-k-nearest-neighbors.md";
  slug: "knn-k-nearest-neighbors";
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
"knwl-js.md": {
	id: "knwl-js.md";
  slug: "knwl-js";
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
"kompute.md": {
	id: "kompute.md";
  slug: "kompute";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"konlpy.md": {
	id: "konlpy.md";
  slug: "konlpy";
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
"kotlindl.md": {
	id: "kotlindl.md";
  slug: "kotlindl";
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
"kubernetes-and-prometheus-chatgpt-bot.md": {
	id: "kubernetes-and-prometheus-chatgpt-bot.md";
  slug: "kubernetes-and-prometheus-chatgpt-bot";
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
"l0learn.md": {
	id: "l0learn.md";
  slug: "l0learn";
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
"lambda-ml.md": {
	id: "lambda-ml.md";
  slug: "lambda-ml";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"lambdanet.md": {
	id: "lambdanet.md";
  slug: "lambdanet";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"lambdo.md": {
	id: "lambdo.md";
  slug: "lambdo";
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
"lamini.md": {
	id: "lamini.md";
  slug: "lamini";
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
"langchain-blog.md": {
	id: "langchain-blog.md";
  slug: "langchain-blog";
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
"langchain-chinese-getting-started-guide.md": {
	id: "langchain-chinese-getting-started-guide.md";
  slug: "langchain-chinese-getting-started-guide";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"langchain-decorators.md": {
	id: "langchain-decorators.md";
  slug: "langchain-decorators";
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
"langchain-handbook.md": {
	id: "langchain-handbook.md";
  slug: "langchain-handbook";
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
"langchain-james-briggs-playlist.md": {
	id: "langchain-james-briggs-playlist.md";
  slug: "langchain-james-briggs-playlist";
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
"langchain-semantic-search.md": {
	id: "langchain-semantic-search.md";
  slug: "langchain-semantic-search";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"langchain-series-by-sam-witteveen.md": {
	id: "langchain-series-by-sam-witteveen.md";
  slug: "langchain-series-by-sam-witteveen";
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
"langchain-tutorials-playlist.md": {
	id: "langchain-tutorials-playlist.md";
  slug: "langchain-tutorials-playlist";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"langchain-tutorials.md": {
	id: "langchain-tutorials.md";
  slug: "langchain-tutorials";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"langchain-visualizer.md": {
	id: "langchain-visualizer.md";
  slug: "langchain-visualizer";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"langchain-wolfram-alpha.md": {
	id: "langchain-wolfram-alpha.md";
  slug: "langchain-wolfram-alpha";
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
"langfair.md": {
	id: "langfair.md";
  slug: "langfair";
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
"language-models-are-few-shot-learners.md": {
	id: "language-models-are-few-shot-learners.md";
  slug: "language-models-are-few-shot-learners";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"language-models-are-unsupervised-multitask-learners.md": {
	id: "language-models-are-unsupervised-multitask-learners.md";
  slug: "language-models-are-unsupervised-multitask-learners";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"languages.md": {
	id: "languages.md";
  slug: "languages";
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
"laplacian-regularization.md": {
	id: "laplacian-regularization.md";
  slug: "laplacian-regularization";
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
"large-language-models-course.md": {
	id: "large-language-models-course.md";
  slug: "large-language-models-course";
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
"lars.md": {
	id: "lars.md";
  slug: "lars";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"lasagne.md": {
	id: "lasagne.md";
  slug: "lasagne";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"lasso2.md": {
	id: "lasso2.md";
  slug: "lasso2";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"lava.md": {
	id: "lava.md";
  slug: "lava";
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
"lawbench.md": {
	id: "lawbench.md";
  slug: "lawbench";
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
"lbjava.md": {
	id: "lbjava.md";
  slug: "lbjava";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"lda-js.md": {
	id: "lda-js.md";
  slug: "lda-js";
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
"leaf.md": {
	id: "leaf.md";
  slug: "leaf";
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
"learn-js-data.md": {
	id: "learn-js-data.md";
  slug: "learn-js-data";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"learn-langchain-js.md": {
	id: "learn-langchain-js.md";
  slug: "learn-langchain-js";
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
"learnergy.md": {
	id: "learnergy.md";
  slug: "learnergy";
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
"learning-js.md": {
	id: "learning-js.md";
  slug: "learning-js";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"learning-machines-101.md": {
	id: "learning-machines-101.md";
  slug: "learning-machines-101";
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
"leaves.md": {
	id: "leaves.md";
  slug: "leaves";
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
"lensa.md": {
	id: "lensa.md";
  slug: "lensa";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"leonardo-ai.md": {
	id: "leonardo-ai.md";
  slug: "leonardo-ai";
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
"let-s-data-brazil.md": {
	id: "let-s-data-brazil.md";
  slug: "let-s-data-brazil";
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
"libfm.md": {
	id: "libfm.md";
  slug: "libfm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"libfolia.md": {
	id: "libfolia.md";
  slug: "libfolia";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"liblinear-java.md": {
	id: "liblinear-java.md";
  slug: "liblinear-java";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"liblinear.md": {
	id: "liblinear.md";
  slug: "liblinear";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"libonnx.md": {
	id: "libonnx.md";
  slug: "libonnx";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"libpython-clj.md": {
	id: "libpython-clj.md";
  slug: "libpython-clj";
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
"libsvm.md": {
	id: "libsvm.md";
  slug: "libsvm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"lifelines.md": {
	id: "lifelines.md";
  slug: "lifelines";
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
"lightfm.md": {
	id: "lightfm.md";
  slug: "lightfm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"lightgbm-light-gradient-boosting-machine.md": {
	id: "lightgbm-light-gradient-boosting-machine.md";
  slug: "lightgbm-light-gradient-boosting-machine";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"lightgbm.md": {
	id: "lightgbm.md";
  slug: "lightgbm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"lightgraphs.md": {
	id: "lightgraphs.md";
  slug: "lightgraphs";
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
"lightwood.md": {
	id: "lightwood.md";
  slug: "lightwood";
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
"lime.md": {
	id: "lime.md";
  slug: "lime";
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
"linear-digressions.md": {
	id: "linear-digressions.md";
  slug: "linear-digressions";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"linear-regression.md": {
	id: "linear-regression.md";
  slug: "linear-regression";
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
"linfa.md": {
	id: "linfa.md";
  slug: "linfa";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"lingpipe.md": {
	id: "lingpipe.md";
  slug: "lingpipe";
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
"listof.md": {
	id: "listof.md";
  slug: "listof";
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
"lists.md": {
	id: "lists.md";
  slug: "lists";
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
"livebench.md": {
	id: "livebench.md";
  slug: "livebench";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"lkydeepnn.md": {
	id: "lkydeepnn.md";
  slug: "lkydeepnn";
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
"llama-cult-and-more.md": {
	id: "llama-cult-and-more.md";
  slug: "llama-cult-and-more";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"llama-factory.md": {
	id: "llama-factory.md";
  slug: "llama-factory";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"llama-github.md": {
	id: "llama-github.md";
  slug: "llama-github";
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
"llama-police.md": {
	id: "llama-police.md";
  slug: "llama-police";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"llama.md": {
	id: "llama.md";
  slug: "llama";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"llama2-accessory.md": {
	id: "llama2-accessory.md";
  slug: "llama2-accessory";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"llama2-embedding-server.md": {
	id: "llama2-embedding-server.md";
  slug: "llama2-embedding-server";
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
"llamahub.md": {
	id: "llamahub.md";
  slug: "llamahub";
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
"llm-grovers-search-party.md": {
	id: "llm-grovers-search-party.md";
  slug: "llm-grovers-search-party";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"llm-leaderboard-streamlit.md": {
	id: "llm-leaderboard-streamlit.md";
  slug: "llm-leaderboard-streamlit";
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
"llm-lobbyist.md": {
	id: "llm-lobbyist.md";
  slug: "llm-lobbyist";
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
"llm-reading-list.md": {
	id: "llm-reading-list.md";
  slug: "llm-reading-list";
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
"llm-strategy.md": {
	id: "llm-strategy.md";
  slug: "llm-strategy";
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
"llm4opt.md": {
	id: "llm4opt.md";
  slug: "llm4opt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"llmbox.md": {
	id: "llmbox.md";
  slug: "llmbox";
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
"llmdatahub.md": {
	id: "llmdatahub.md";
  slug: "llmdatahub";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"llmeval.md": {
	id: "llmeval.md";
  slug: "llmeval";
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
"llmspracticalguide.md": {
	id: "llmspracticalguide.md";
  slug: "llmspracticalguide";
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
"lmflow.md": {
	id: "lmflow.md";
  slug: "lmflow";
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
"lmsys-org.md": {
	id: "lmsys-org.md";
  slug: "lmsys-org";
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
"local-regression.md": {
	id: "local-regression.md";
  slug: "local-regression";
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
"localllama.md": {
	id: "localllama.md";
  slug: "localllama";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"locally-estimated-scatterplot-smoothing.md": {
	id: "locally-estimated-scatterplot-smoothing.md";
  slug: "locally-estimated-scatterplot-smoothing";
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
"logicreg.md": {
	id: "logicreg.md";
  slug: "logicreg";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"logistic-regression.md": {
	id: "logistic-regression.md";
  slug: "logistic-regression";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"loic-tetrel.md": {
	id: "loic-tetrel.md";
  slug: "loic-tetrel";
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
"loso.md": {
	id: "loso.md";
  slug: "loso";
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
"louis-dorard.md": {
	id: "louis-dorard.md";
  slug: "louis-dorard";
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
"low-code-handbook.md": {
	id: "low-code-handbook.md";
  slug: "low-code-handbook";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"low-density-separation.md": {
	id: "low-density-separation.md";
  slug: "low-density-separation";
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
"lua-numerical-algorithms.md": {
	id: "lua-numerical-algorithms.md";
  slug: "lua-numerical-algorithms";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"lucent.md": {
	id: "lucent.md";
  slug: "lucent";
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
"lunatic-python.md": {
	id: "lunatic-python.md";
  slug: "lunatic-python";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"lunum.md": {
	id: "lunum.md";
  slug: "lunum";
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
"m3cot.md": {
	id: "m3cot.md";
  slug: "m3cot";
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
"machine-learning-bookcamp.md": {
	id: "machine-learning-bookcamp.md";
  slug: "machine-learning-bookcamp";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"machine-learning-books-for-beginners.md": {
	id: "machine-learning-books-for-beginners.md";
  slug: "machine-learning-books-for-beginners";
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
"machine-learning-for-absolute-beginners.md": {
	id: "machine-learning-for-absolute-beginners.md";
  slug: "machine-learning-for-absolute-beginners";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"machine-learning-for-hackers.md": {
	id: "machine-learning-for-hackers.md";
  slug: "machine-learning-for-hackers";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"machine-learning-for-software-engineers.md": {
	id: "machine-learning-for-software-engineers.md";
  slug: "machine-learning-for-software-engineers";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"machine-learning-from-scratch.md": {
	id: "machine-learning-from-scratch.md";
  slug: "machine-learning-from-scratch";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"machine-learning-in-matlab-octave.md": {
	id: "machine-learning-in-matlab-octave.md";
  slug: "machine-learning-in-matlab-octave";
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
"machine-learning-mastery.md": {
	id: "machine-learning-mastery.md";
  slug: "machine-learning-mastery";
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
"machine-learning-module.md": {
	id: "machine-learning-module.md";
  slug: "machine-learning-module";
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
"machine-learning-q-and-ai.md": {
	id: "machine-learning-q-and-ai.md";
  slug: "machine-learning-q-and-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"machine-learning-ruby.md": {
	id: "machine-learning-ruby.md";
  slug: "machine-learning-ruby";
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
"machine-learning-with-python-tutorialspoint.md": {
	id: "machine-learning-with-python-tutorialspoint.md";
  slug: "machine-learning-with-python-tutorialspoint";
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
"machine.md": {
	id: "machine.md";
  slug: "machine";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"machinelearn-js.md": {
	id: "machinelearn-js.md";
  slug: "machinelearn-js";
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
"magic-eraser.md": {
	id: "magic-eraser.md";
  slug: "magic-eraser";
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
"magician.md": {
	id: "magician.md";
  slug: "magician";
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
"mahout.md": {
	id: "mahout.md";
  slug: "mahout";
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
"make-a-film-from-script-to-screen.md": {
	id: "make-a-film-from-script-to-screen.md";
  slug: "make-a-film-from-script-to-screen";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"make-a-scene.md": {
	id: "make-a-scene.md";
  slug: "make-a-scene";
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
"mallet.md": {
	id: "mallet.md";
  slug: "mallet";
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
"mamba.md": {
	id: "mamba.md";
  slug: "mamba";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"managing-ml-projects.md": {
	id: "managing-ml-projects.md";
  slug: "managing-ml-projects";
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
"manifoldlearning.md": {
	id: "manifoldlearning.md";
  slug: "manifoldlearning";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"manning-publications-youtube-channel.md": {
	id: "manning-publications-youtube-channel.md";
  slug: "manning-publications-youtube-channel";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"manus-ai-vs-openclaw.md": {
	id: "manus-ai-vs-openclaw.md";
  slug: "manus-ai-vs-openclaw";
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
"map-reduce-implementations-of-common-ml-algorithms.md": {
	id: "map-reduce-implementations-of-common-ml-algorithms.md";
  slug: "map-reduce-implementations-of-common-ml-algorithms";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"maplight.md": {
	id: "maplight.md";
  slug: "maplight";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mapreduce-python.md": {
	id: "mapreduce-python.md";
  slug: "mapreduce-python";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"maptree.md": {
	id: "maptree.md";
  slug: "maptree";
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
"maria-khalusova.md": {
	id: "maria-khalusova.md";
  slug: "maria-khalusova";
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
"marllib.md": {
	id: "marllib.md";
  slug: "marllib";
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
"mars.md": {
	id: "mars.md";
  slug: "mars";
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
"math-for-programmers.md": {
	id: "math-for-programmers.md";
  slug: "math-for-programmers";
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
"matheval.md": {
	id: "matheval.md";
  slug: "matheval";
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
"matlab-bgl.md": {
	id: "matlab-bgl.md";
  slug: "matlab-bgl";
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
"matlib.md": {
	id: "matlib.md";
  slug: "matlib";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"matplotlib.md": {
	id: "matplotlib.md";
  slug: "matplotlib";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"matt-harrison.md": {
	id: "matt-harrison.md";
  slug: "matt-harrison";
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
"matthew-russell.md": {
	id: "matthew-russell.md";
  slug: "matthew-russell";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mava.md": {
	id: "mava.md";
  slug: "mava";
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
"maze.md": {
	id: "maze.md";
  slug: "maze";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mboost.md": {
	id: "mboost.md";
  slug: "mboost";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mcmc.md": {
	id: "mcmc.md";
  slug: "mcmc";
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
"mcp-memory-service.md": {
	id: "mcp-memory-service.md";
  slug: "mcp-memory-service";
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
"mcp-support.md": {
	id: "mcp-support.md";
  slug: "mcp-support";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"meaning-of.md": {
	id: "meaning-of.md";
  slug: "meaning-of";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"medley.md": {
	id: "medley.md";
  slug: "medley";
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
"meka.md": {
	id: "meka.md";
  slug: "meka";
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
"mesh-tensorflow.md": {
	id: "mesh-tensorflow.md";
  slug: "mesh-tensorflow";
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
"meta-brown.md": {
	id: "meta-brown.md";
  slug: "meta-brown";
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
"meta.md": {
	id: "meta.md";
  slug: "meta";
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
"metadrive.md": {
	id: "metadrive.md";
  slug: "metadrive";
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
"metaworld.md": {
	id: "metaworld.md";
  slug: "metaworld";
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
"metric-learn.md": {
	id: "metric-learn.md";
  slug: "metric-learn";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mexopencv.md": {
	id: "mexopencv.md";
  slug: "mexopencv";
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
"microsoft-ml-for-apache-spark.md": {
	id: "microsoft-ml-for-apache-spark.md";
  slug: "microsoft-ml-for-apache-spark";
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
"microsoft-recommenders.md": {
	id: "microsoft-recommenders.md";
  slug: "microsoft-recommenders";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"microsoft-research-open-data.md": {
	id: "microsoft-research-open-data.md";
  slug: "microsoft-research-open-data";
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
"mil-tokyo.md": {
	id: "mil-tokyo.md";
  slug: "mil-tokyo";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mildlyoverfitted-tutorials-on-intermediate-ml-dl-topics.md": {
	id: "mildlyoverfitted-tutorials-on-intermediate-ml-dl-topics.md";
  slug: "mildlyoverfitted-tutorials-on-intermediate-ml-dl-topics";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"milk.md": {
	id: "milk.md";
  slug: "milk";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"milo.md": {
	id: "milo.md";
  slug: "milo";
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
"minbpe.md": {
	id: "minbpe.md";
  slug: "minbpe";
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
"mindnlp.md": {
	id: "mindnlp.md";
  slug: "mindnlp";
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
"minidiff.md": {
	id: "minidiff.md";
  slug: "minidiff";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"minigrad.md": {
	id: "minigrad.md";
  slug: "minigrad";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"minigrid.md": {
	id: "minigrid.md";
  slug: "minigrid";
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
"mining-massive-datasets.md": {
	id: "mining-massive-datasets.md";
  slug: "mining-massive-datasets";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"miniworld.md": {
	id: "miniworld.md";
  slug: "miniworld";
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
"miraiml.md": {
	id: "miraiml.md";
  slug: "miraiml";
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
"mit-information-extraction-toolkit.md": {
	id: "mit-information-extraction-toolkit.md";
  slug: "mit-information-extraction-toolkit";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mit.md": {
	id: "mit.md";
  slug: "mit";
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
"mixed-models.md": {
	id: "mixed-models.md";
  slug: "mixed-models";
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
"ml-agents.md": {
	id: "ml-agents.md";
  slug: "ml-agents";
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
"ml-from-scratch.md": {
	id: "ml-from-scratch.md";
  slug: "ml-from-scratch";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ml-js.md": {
	id: "ml-js.md";
  slug: "ml-js";
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
"ml-system-designs.md": {
	id: "ml-system-designs.md";
  slug: "ml-system-designs";
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
"ml5.md": {
	id: "ml5.md";
  slug: "ml5";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mlbase.md": {
	id: "mlbase.md";
  slug: "mlbase";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mlc-llm.md": {
	id: "mlc-llm.md";
  slug: "mlc-llm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mldb.md": {
	id: "mldb.md";
  slug: "mldb";
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
"mlens.md": {
	id: "mlens.md";
  slug: "mlens";
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
"mlforgex.md": {
	id: "mlforgex.md";
  slug: "mlforgex";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mlgym.md": {
	id: "mlgym.md";
  slug: "mlgym";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mlj.md": {
	id: "mlj.md";
  slug: "mlj";
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
"mlkit.md": {
	id: "mlkit.md";
  slug: "mlkit";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mllib-in-apache-spark.md": {
	id: "mllib-in-apache-spark.md";
  slug: "mllib-in-apache-spark";
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
"mlpack.md": {
	id: "mlpack.md";
  slug: "mlpack";
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
"mlpleasehelp.md": {
	id: "mlpleasehelp.md";
  slug: "mlpleasehelp";
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
"mlr.md": {
	id: "mlr.md";
  slug: "mlr";
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
"mlu-github.md": {
	id: "mlu-github.md";
  slug: "mlu-github";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mlx-lm.md": {
	id: "mlx-lm.md";
  slug: "mlx-lm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mlx.md": {
	id: "mlx.md";
  slug: "mlx";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mlxtend.md": {
	id: "mlxtend.md";
  slug: "mlxtend";
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
"mmcv.md": {
	id: "mmcv.md";
  slug: "mmcv";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mmedbench.md": {
	id: "mmedbench.md";
  slug: "mmedbench";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mmtom-qa.md": {
	id: "mmtom-qa.md";
  slug: "mmtom-qa";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mne-python-notebooks.md": {
	id: "mne-python-notebooks.md";
  slug: "mne-python-notebooks";
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
"moclugen.md": {
	id: "moclugen.md";
  slug: "moclugen";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"modal.md": {
	id: "modal.md";
  slug: "modal";
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
"model-zoo.md": {
	id: "model-zoo.md";
  slug: "model-zoo";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"modeleditingpapers.md": {
	id: "modeleditingpapers.md";
  slug: "modeleditingpapers";
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
"modin.md": {
	id: "modin.md";
  slug: "modin";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"modyfi.md": {
	id: "modyfi.md";
  slug: "modyfi";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"molecular-design.md": {
	id: "molecular-design.md";
  slug: "molecular-design";
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
"montague.md": {
	id: "montague.md";
  slug: "montague";
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
"more-lists.md": {
	id: "more-lists.md";
  slug: "more-lists";
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
"multilayer-perceptron.md": {
	id: "multilayer-perceptron.md";
  slug: "multilayer-perceptron";
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
"multivariate-adaptive-regression-splines.md": {
	id: "multivariate-adaptive-regression-splines.md";
  slug: "multivariate-adaptive-regression-splines";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"multivariatestats.md": {
	id: "multivariatestats.md";
  slug: "multivariatestats";
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
"mushroomrl.md": {
	id: "mushroomrl.md";
  slug: "mushroomrl";
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
"mxnet-for-deep-learning-in-perl.md": {
	id: "mxnet-for-deep-learning-in-perl.md";
  slug: "mxnet-for-deep-learning-in-perl";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mxnet-sharp.md": {
	id: "mxnet-sharp.md";
  slug: "mxnet-sharp";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"mxnet.md": {
	id: "mxnet.md";
  slug: "mxnet";
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
"n2d2.md": {
	id: "n2d2.md";
  slug: "n2d2";
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
"naive-bayes.md": {
	id: "naive-bayes.md";
  slug: "naive-bayes";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"nalp.md": {
	id: "nalp.md";
  slug: "nalp";
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
"nasdaq-data.md": {
	id: "nasdaq-data.md";
  slug: "nasdaq-data";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"national-centers-for-environmental-information.md": {
	id: "national-centers-for-environmental-information.md";
  slug: "national-centers-for-environmental-information";
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
"natural.md": {
	id: "natural.md";
  slug: "natural";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"nayn-co-turkish-news-with-categories.md": {
	id: "nayn-co-turkish-news-with-categories.md";
  slug: "nayn-co-turkish-news-with-categories";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"nbshare.md": {
	id: "nbshare.md";
  slug: "nbshare";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ncvreg.md": {
	id: "ncvreg.md";
  slug: "ncvreg";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ndscala.md": {
	id: "ndscala.md";
  slug: "ndscala";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"neanderthal.md": {
	id: "neanderthal.md";
  slug: "neanderthal";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"neat.md": {
	id: "neat.md";
  slug: "neat";
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
"neofuzz.md": {
	id: "neofuzz.md";
  slug: "neofuzz";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"neon-course.md": {
	id: "neon-course.md";
  slug: "neon-course";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"neon.md": {
	id: "neon.md";
  slug: "neon";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"neonrvm.md": {
	id: "neonrvm.md";
  slug: "neonrvm";
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
"networkx.md": {
	id: "networkx.md";
  slug: "networkx";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"neupy.md": {
	id: "neupy.md";
  slug: "neupy";
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
"neural-dream.md": {
	id: "neural-dream.md";
  slug: "neural-dream";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"neural-fortran.md": {
	id: "neural-fortran.md";
  slug: "neural-fortran";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"neural-network-designer.md": {
	id: "neural-network-designer.md";
  slug: "neural-network-designer";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"neural-networks-and-deep-learning.md": {
	id: "neural-networks-and-deep-learning.md";
  slug: "neural-networks-and-deep-learning";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"neural-networks-by-3blue1brown.md": {
	id: "neural-networks-by-3blue1brown.md";
  slug: "neural-networks-by-3blue1brown";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"neural-networks-from-scratch-by-sentdex.md": {
	id: "neural-networks-from-scratch-by-sentdex.md";
  slug: "neural-networks-from-scratch-by-sentdex";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"neural-networks-video-series-by-hugo-larochelle.md": {
	id: "neural-networks-video-series-by-hugo-larochelle.md";
  slug: "neural-networks-video-series-by-hugo-larochelle";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"neural-networks.md": {
	id: "neural-networks.md";
  slug: "neural-networks";
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
"neural-style-pt.md": {
	id: "neural-style-pt.md";
  slug: "neural-style-pt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"neural.md": {
	id: "neural.md";
  slug: "neural";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"neuraln.md": {
	id: "neuraln.md";
  slug: "neuraln";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"neuraltalk.md": {
	id: "neuraltalk.md";
  slug: "neuraltalk";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"neuraxle.md": {
	id: "neuraxle.md";
  slug: "neuraxle";
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
"neurolab.md": {
	id: "neurolab.md";
  slug: "neurolab";
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
"neuron.md": {
	id: "neuron.md";
  slug: "neuron";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"neuroner.md": {
	id: "neuroner.md";
  slug: "neuroner";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"neuroph.md": {
	id: "neuroph.md";
  slug: "neuroph";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"neuropredict.md": {
	id: "neuropredict.md";
  slug: "neuropredict";
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
"nevergrad.md": {
	id: "nevergrad.md";
  slug: "nevergrad";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"new-data-scientist.md": {
	id: "new-data-scientist.md";
  slug: "new-data-scientist";
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
"nilearn.md": {
	id: "nilearn.md";
  slug: "nilearn";
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
"nivo.md": {
	id: "nivo.md";
  slug: "nivo";
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
"nlp-compromise.md": {
	id: "nlp-compromise.md";
  slug: "nlp-compromise";
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
"nlp-js.md": {
	id: "nlp-js.md";
  slug: "nlp-js";
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
"nlp4j.md": {
	id: "nlp4j.md";
  slug: "nlp4j";
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
"nltk.md": {
	id: "nltk.md";
  slug: "nltk";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"nmf.md": {
	id: "nmf.md";
  slug: "nmf";
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
"nn-builder.md": {
	id: "nn-builder.md";
  slug: "nn-builder";
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
"nnet.md": {
	id: "nnet.md";
  slug: "nnet";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"noah-iliinsky.md": {
	id: "noah-iliinsky.md";
  slug: "noah-iliinsky";
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
"nobodywho.md": {
	id: "nobodywho.md";
  slug: "nobodywho";
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
"node-fann.md": {
	id: "node-fann.md";
  slug: "node-fann";
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
"node-svm.md": {
	id: "node-svm.md";
  slug: "node-svm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"norse.md": {
	id: "norse.md";
  slug: "norse";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"not-so-standard-deviations.md": {
	id: "not-so-standard-deviations.md";
  slug: "not-so-standard-deviations";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"notebook-installation.md": {
	id: "notebook-installation.md";
  slug: "notebook-installation";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"notebooklm.md": {
	id: "notebooklm.md";
  slug: "notebooklm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"notebooks.md": {
	id: "notebooks.md";
  slug: "notebooks";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"notesjor-corpus-collection.md": {
	id: "notesjor-corpus-collection.md";
  slug: "notesjor-corpus-collection";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"notespace.md": {
	id: "notespace.md";
  slug: "notespace";
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
"nsfwjs.md": {
	id: "nsfwjs.md";
  slug: "nsfwjs";
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
"numba.md": {
	id: "numba.md";
  slug: "numba";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"numeric-lua.md": {
	id: "numeric-lua.md";
  slug: "numeric-lua";
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
"numpic.md": {
	id: "numpic.md";
  slug: "numpic";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"numpy-ml.md": {
	id: "numpy-ml.md";
  slug: "numpy-ml";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"numpy.md": {
	id: "numpy.md";
  slug: "numpy";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"nupic-studio.md": {
	id: "nupic-studio.md";
  slug: "nupic-studio";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"nupic.md": {
	id: "nupic.md";
  slug: "nupic";
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
"nut.md": {
	id: "nut.md";
  slug: "nut";
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
"nvd3-js.md": {
	id: "nvd3-js.md";
  slug: "nvd3-js";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"nvd3.md": {
	id: "nvd3.md";
  slug: "nvd3";
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
"nvidia-tensorrt.md": {
	id: "nvidia-tensorrt.md";
  slug: "nvidia-tensorrt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"nyc-taxi-data.md": {
	id: "nyc-taxi-data.md";
  slug: "nyc-taxi-data";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"nyc-taxi-visualization-blog.md": {
	id: "nyc-taxi-visualization-blog.md";
  slug: "nyc-taxi-visualization-blog";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"o-reilly-data-show-podcast.md": {
	id: "o-reilly-data-show-podcast.md";
  slug: "o-reilly-data-show-podcast";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"o-reilly-learning-blog.md": {
	id: "o-reilly-learning-blog.md";
  slug: "o-reilly-learning-blog";
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
"occam-s-razor.md": {
	id: "occam-s-razor.md";
  slug: "occam-s-razor";
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
"official-resources.md": {
	id: "official-resources.md";
  slug: "official-resources";
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
"okrolearn.md": {
	id: "okrolearn.md";
  slug: "okrolearn";
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
"olmocr.md": {
	id: "olmocr.md";
  slug: "olmocr";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"olympicarena.md": {
	id: "olympicarena.md";
  slug: "olympicarena";
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
"omnisafe.md": {
	id: "omnisafe.md";
  slug: "omnisafe";
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
"onednn.md": {
	id: "onednn.md";
  slug: "onednn";
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
"online-learning.md": {
	id: "online-learning.md";
  slug: "online-learning";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"onnx-c.md": {
	id: "onnx-c.md";
  slug: "onnx-c";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"onnx-scala.md": {
	id: "onnx-scala.md";
  slug: "onnx-scala";
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
"onyx.md": {
	id: "onyx.md";
  slug: "onyx";
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
"open-data-index.md": {
	id: "open-data-index.md";
  slug: "open-data-index";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"open-data-philly.md": {
	id: "open-data-philly.md";
  slug: "open-data-philly";
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
"open-data-sources.md": {
	id: "open-data-sources.md";
  slug: "open-data-sources";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"open-government-data-platform-india.md": {
	id: "open-government-data-platform-india.md";
  slug: "open-government-data-platform-india";
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
"open-llm-leaderboard.md": {
	id: "open-llm-leaderboard.md";
  slug: "open-llm-leaderboard";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"open-llms.md": {
	id: "open-llms.md";
  slug: "open-llms";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"open-mining.md": {
	id: "open-mining.md";
  slug: "open-mining";
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
"open-pretrained-transformers.md": {
	id: "open-pretrained-transformers.md";
  slug: "open-pretrained-transformers";
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
"open-solution-data-science-bowl-2018.md": {
	id: "open-solution-data-science-bowl-2018.md";
  slug: "open-solution-data-science-bowl-2018";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"open-solution-googleai-object-detection.md": {
	id: "open-solution-googleai-object-detection.md";
  slug: "open-solution-googleai-object-detection";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"open-solution-home-credit.md": {
	id: "open-solution-home-credit.md";
  slug: "open-solution-home-credit";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"open-solution-salt-identification.md": {
	id: "open-solution-salt-identification.md";
  slug: "open-solution-salt-identification";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"open-solution-ship-detection.md": {
	id: "open-solution-ship-detection.md";
  slug: "open-solution-ship-detection";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"open-solution-toxic-comments.md": {
	id: "open-solution-toxic-comments.md";
  slug: "open-solution-toxic-comments";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"open-solution-value-prediction.md": {
	id: "open-solution-value-prediction.md";
  slug: "open-solution-value-prediction";
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
"openai-discord-channel.md": {
	id: "openai-discord-channel.md";
  slug: "openai-discord-channel";
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
"openclaw-wikipedia.md": {
	id: "openclaw-wikipedia.md";
  slug: "openclaw-wikipedia";
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
"opencv.md": {
	id: "opencv.md";
  slug: "opencv";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"opencvdotnet.md": {
	id: "opencvdotnet.md";
  slug: "opencvdotnet";
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
"openface.md": {
	id: "openface.md";
  slug: "openface";
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
"openmetriclearning.md": {
	id: "openmetriclearning.md";
  slug: "openmetriclearning";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"opennlp.md": {
	id: "opennlp.md";
  slug: "opennlp";
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
"openpose.md": {
	id: "openpose.md";
  slug: "openpose";
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
"openrefine.md": {
	id: "openrefine.md";
  slug: "openrefine";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"openrlhf.md": {
	id: "openrlhf.md";
  slug: "openrlhf";
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
"openvisionapi.md": {
	id: "openvisionapi.md";
  slug: "openvisionapi";
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
"opfython.md": {
	id: "opfython.md";
  slug: "opfython";
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
"optimum.md": {
	id: "optimum.md";
  slug: "optimum";
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
"optunity-examples.md": {
	id: "optunity-examples.md";
  slug: "optunity-examples";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"optunity.md": {
	id: "optunity.md";
  slug: "optunity";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"opytimizer.md": {
	id: "opytimizer.md";
  slug: "opytimizer";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"orange.md": {
	id: "orange.md";
  slug: "orange";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ordinary-least-squares.md": {
	id: "ordinary-least-squares.md";
  slug: "ordinary-least-squares";
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
"oryx.md": {
	id: "oryx.md";
  slug: "oryx";
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
"other-ai-tools.md": {
	id: "other-ai-tools.md";
  slug: "other-ai-tools";
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
"other.md": {
	id: "other.md";
  slug: "other";
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
"oxford-deep-learning-video.md": {
	id: "oxford-deep-learning-video.md";
  slug: "oxford-deep-learning-video";
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
"oz.md": {
	id: "oz.md";
  slug: "oz";
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
"paddlenlp.md": {
	id: "paddlenlp.md";
  slug: "paddlenlp";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"paddlepaddle.md": {
	id: "paddlepaddle.md";
  slug: "paddlepaddle";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pagerank.md": {
	id: "pagerank.md";
  slug: "pagerank";
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
"paicehusk.md": {
	id: "paicehusk.md";
  slug: "paicehusk";
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
"pamr.md": {
	id: "pamr.md";
  slug: "pamr";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pandas-cookbook.md": {
	id: "pandas-cookbook.md";
  slug: "pandas-cookbook";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pandas-in-action.md": {
	id: "pandas-in-action.md";
  slug: "pandas-in-action";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pandas.md": {
	id: "pandas.md";
  slug: "pandas";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"panthera.md": {
	id: "panthera.md";
  slug: "panthera";
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
"parallel-machine-learning-with-scikit-learn-and-ipython.md": {
	id: "parallel-machine-learning-with-scikit-learn-and-ipython.md";
  slug: "parallel-machine-learning-with-scikit-learn-and-ipython";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"paramonte.md": {
	id: "paramonte.md";
  slug: "paramonte";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"parl.md": {
	id: "parl.md";
  slug: "parl";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"parris.md": {
	id: "parris.md";
  slug: "parris";
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
"partially-derivative.md": {
	id: "partially-derivative.md";
  slug: "partially-derivative";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"party.md": {
	id: "party.md";
  slug: "party";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"partykit.md": {
	id: "partykit.md";
  slug: "partykit";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pastalog.md": {
	id: "pastalog.md";
  slug: "pastalog";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"patience-ai.md": {
	id: "patience-ai.md";
  slug: "patience-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pattern-classification.md": {
	id: "pattern-classification.md";
  slug: "pattern-classification";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pattern-recognition-and-machine-learning.md": {
	id: "pattern-recognition-and-machine-learning.md";
  slug: "pattern-recognition-and-machine-learning";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pattern-recognition-toolbox.md": {
	id: "pattern-recognition-toolbox.md";
  slug: "pattern-recognition-toolbox";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pattern.md": {
	id: "pattern.md";
  slug: "pattern";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pavlov-js.md": {
	id: "pavlov-js.md";
  slug: "pavlov-js";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pawtrait.md": {
	id: "pawtrait.md";
  slug: "pawtrait";
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
"pcv.md": {
	id: "pcv.md";
  slug: "pcv";
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
"pebl.md": {
	id: "pebl.md";
  slug: "pebl";
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
"penalized.md": {
	id: "penalized.md";
  slug: "penalized";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"penalizedlda.md": {
	id: "penalizedlda.md";
  slug: "penalizedlda";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"penalizedsvm.md": {
	id: "penalizedsvm.md";
  slug: "penalizedsvm";
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
"perfect-tensorflow.md": {
	id: "perfect-tensorflow.md";
  slug: "perfect-tensorflow";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"periscopic.md": {
	id: "periscopic.md";
  slug: "periscopic";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"perl-data-language.md": {
	id: "perl-data-language.md";
  slug: "perl-data-language";
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
"perpetualbooster.md": {
	id: "perpetualbooster.md";
  slug: "perpetualbooster";
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
"petrel.md": {
	id: "petrel.md";
  slug: "petrel";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pettingzoo.md": {
	id: "pettingzoo.md";
  slug: "pettingzoo";
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
"pgm.md": {
	id: "pgm.md";
  slug: "pgm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pgmpy.md": {
	id: "pgmpy.md";
  slug: "pgmpy";
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
"photoguruai.md": {
	id: "photoguruai.md";
  slug: "photoguruai";
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
"php-ml.md": {
	id: "php-ml.md";
  slug: "php-ml";
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
"pigpen.md": {
	id: "pigpen.md";
  slug: "pigpen";
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
"pink-gorilla-notebook.md": {
	id: "pink-gorilla-notebook.md";
  slug: "pink-gorilla-notebook";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pipcook.md": {
	id: "pipcook.md";
  slug: "pipcook";
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
"pixelz-ai-art-generator.md": {
	id: "pixelz-ai-art-generator.md";
  slug: "pixelz-ai-art-generator";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pixvify-ai.md": {
	id: "pixvify-ai.md";
  slug: "pixvify-ai";
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
"pkuseg-python.md": {
	id: "pkuseg-python.md";
  slug: "pkuseg-python";
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
"plantphotoai.md": {
	id: "plantphotoai.md";
  slug: "plantphotoai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"planttattoosai.md": {
	id: "planttattoosai.md";
  slug: "planttattoosai";
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
"playground-ai.md": {
	id: "playground-ai.md";
  slug: "playground-ai";
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
"plot-ly.md": {
	id: "plot-ly.md";
  slug: "plot-ly";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"plot-rb.md": {
	id: "plot-rb.md";
  slug: "plot-rb";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"plotly.md": {
	id: "plotly.md";
  slug: "plotly";
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
"pollinations-ai.md": {
	id: "pollinations-ai.md";
  slug: "pollinations-ai";
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
"polyglot.md": {
	id: "polyglot.md";
  slug: "polyglot";
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
"pomegranate.md": {
	id: "pomegranate.md";
  slug: "pomegranate";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ponzu.md": {
	id: "ponzu.md";
  slug: "ponzu";
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
"post-processing-tools.md": {
	id: "post-processing-tools.md";
  slug: "post-processing-tools";
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
"practical-data-science-with-r.md": {
	id: "practical-data-science-with-r.md";
  slug: "practical-data-science-with-r";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"practical-xgboost-in-python.md": {
	id: "practical-xgboost-in-python.md";
  slug: "practical-xgboost-in-python";
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
"prash-chan.md": {
	id: "prash-chan.md";
  slug: "prash-chan";
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
"predictionio.md": {
	id: "predictionio.md";
  slug: "predictionio";
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
"probabilistic-machine-learning-an-introduction.md": {
	id: "probabilistic-machine-learning-an-introduction.md";
  slug: "probabilistic-machine-learning-an-introduction";
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
"prodmodel.md": {
	id: "prodmodel.md";
  slug: "prodmodel";
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
"programming-in-python.md": {
	id: "programming-in-python.md";
  slug: "programming-in-python";
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
"prompt-engineering-a-new-profession.md": {
	id: "prompt-engineering-a-new-profession.md";
  slug: "prompt-engineering-a-new-profession";
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
"prompt-engineering-guide.md": {
	id: "prompt-engineering-guide.md";
  slug: "prompt-engineering-guide";
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
"prompts.md": {
	id: "prompts.md";
  slug: "prompts";
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
"pronet-core.md": {
	id: "pronet-core.md";
  slug: "pronet-core";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"prophet.md": {
	id: "prophet.md";
  slug: "prophet";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"public-big-data-sets.md": {
	id: "public-big-data-sets.md";
  slug: "public-big-data-sets";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"public-git-archive.md": {
	id: "public-git-archive.md";
  slug: "public-git-archive";
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
"pubmedqa.md": {
	id: "pubmedqa.md";
  slug: "pubmedqa";
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
"pybrain.md": {
	id: "pybrain.md";
  slug: "pybrain";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pybroker.md": {
	id: "pybroker.md";
  slug: "pybroker";
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
"pycascading.md": {
	id: "pycascading.md";
  slug: "pycascading";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pyclugen.md": {
	id: "pyclugen.md";
  slug: "pyclugen";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pycm.md": {
	id: "pycm.md";
  slug: "pycm";
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
"pycon-2015-scikit-learn-tutorial.md": {
	id: "pycon-2015-scikit-learn-tutorial.md";
  slug: "pycon-2015-scikit-learn-tutorial";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pycuda.md": {
	id: "pycuda.md";
  slug: "pycuda";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pydata-book.md": {
	id: "pydata-book.md";
  slug: "pydata-book";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pydeep.md": {
	id: "pydeep.md";
  slug: "pydeep";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pydexter.md": {
	id: "pydexter.md";
  slug: "pydexter";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pydy.md": {
	id: "pydy.md";
  slug: "pydy";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pyevolve.md": {
	id: "pyevolve.md";
  slug: "pyevolve";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pyg.md": {
	id: "pyg.md";
  slug: "pyg";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pygal.md": {
	id: "pygal.md";
  slug: "pygal";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pygam.md": {
	id: "pygam.md";
  slug: "pygam";
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
"pygrid.md": {
	id: "pygrid.md";
  slug: "pygrid";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pyhsmm.md": {
	id: "pyhsmm.md";
  slug: "pyhsmm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pylearn2.md": {
	id: "pylearn2.md";
  slug: "pylearn2";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pyllms.md": {
	id: "pyllms.md";
  slug: "pyllms";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pymc.md": {
	id: "pymc.md";
  slug: "pymc";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pynlpl.md": {
	id: "pynlpl.md";
  slug: "pynlpl";
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
"pyqtgraph.md": {
	id: "pyqtgraph.md";
  slug: "pyqtgraph";
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
"pyro.md": {
	id: "pyro.md";
  slug: "pyro";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pyspark-cheatsheet.md": {
	id: "pyspark-cheatsheet.md";
  slug: "pyspark-cheatsheet";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pyss3.md": {
	id: "pyss3.md";
  slug: "pyss3";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pystanforddependencies.md": {
	id: "pystanforddependencies.md";
  slug: "pystanforddependencies";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pystruct.md": {
	id: "pystruct.md";
  slug: "pystruct";
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
"pytessarct.md": {
	id: "pytessarct.md";
  slug: "pytessarct";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"python-data-science-handbook.md": {
	id: "python-data-science-handbook.md";
  slug: "python-data-science-handbook";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"python-data.md": {
	id: "python-data.md";
  slug: "python-data";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"python-for-ai-ml-dl.md": {
	id: "python-for-ai-ml-dl.md";
  slug: "python-for-ai-ml-dl";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"python-for-data-science-a-beginner-s-guide.md": {
	id: "python-for-data-science-a-beginner-s-guide.md";
  slug: "python-for-data-science-a-beginner-s-guide";
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
"python-frog.md": {
	id: "python-frog.md";
  slug: "python-frog";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"python-performance.md": {
	id: "python-performance.md";
  slug: "python-performance";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"python-programming-for-the-humanities.md": {
	id: "python-programming-for-the-humanities.md";
  slug: "python-programming-for-the-humanities";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"python-recsys.md": {
	id: "python-recsys.md";
  slug: "python-recsys";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"python-timbl.md": {
	id: "python-timbl.md";
  slug: "python-timbl";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"python-zpar.md": {
	id: "python-zpar.md";
  slug: "python-zpar";
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
"pytorch-geometric.md": {
	id: "pytorch-geometric.md";
  slug: "pytorch-geometric";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pytorch-lightning-bolts.md": {
	id: "pytorch-lightning-bolts.md";
  slug: "pytorch-lightning-bolts";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pytorch-lightning.md": {
	id: "pytorch-lightning.md";
  slug: "pytorch-lightning";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pytorch-tabular.md": {
	id: "pytorch-tabular.md";
  slug: "pytorch-tabular";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pytorch.md": {
	id: "pytorch.md";
  slug: "pytorch";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pytorchcv.md": {
	id: "pytorchcv.md";
  slug: "pytorchcv";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pytorchnet.md": {
	id: "pytorchnet.md";
  slug: "pytorchnet";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pytoune.md": {
	id: "pytoune.md";
  slug: "pytoune";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"pyvarinf.md": {
	id: "pyvarinf.md";
  slug: "pyvarinf";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"q-learning.md": {
	id: "q-learning.md";
  slug: "q-learning";
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
"qkeras.md": {
	id: "qkeras.md";
  slug: "qkeras";
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
"quantregforest.md": {
	id: "quantregforest.md";
  slug: "quantregforest";
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
"quepy.md": {
	id: "quepy.md";
  slug: "quepy";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"query-the-youtube-video-transcripts.md": {
	id: "query-the-youtube-video-transcripts.md";
  slug: "query-the-youtube-video-transcripts";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"questdb.md": {
	id: "questdb.md";
  slug: "questdb";
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
"quora-data-science.md": {
	id: "quora-data-science.md";
  slug: "quora-data-science";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"quora-s-big-datasets-answer.md": {
	id: "quora-s-big-datasets-answer.md";
  slug: "quora-s-big-datasets-answer";
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
"r-bloggers.md": {
	id: "r-bloggers.md";
  slug: "r-bloggers";
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
"r-datasets.md": {
	id: "r-datasets.md";
  slug: "r-datasets";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"r-for-data-science.md": {
	id: "r-for-data-science.md";
  slug: "r-for-data-science";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"r-in-action-third-edition.md": {
	id: "r-in-action-third-edition.md";
  slug: "r-in-action-third-edition";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"r2d3.md": {
	id: "r2d3.md";
  slug: "r2d3";
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
"randomforest.md": {
	id: "randomforest.md";
  slug: "randomforest";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"randomforestsrc.md": {
	id: "randomforestsrc.md";
  slug: "randomforestsrc";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ranklib.md": {
	id: "ranklib.md";
  slug: "ranklib";
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
"ranx.md": {
	id: "ranx.md";
  slug: "ranx";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"rapaio.md": {
	id: "rapaio.md";
  slug: "rapaio";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"rapidminer.md": {
	id: "rapidminer.md";
  slug: "rapidminer";
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
"rasa.md": {
	id: "rasa.md";
  slug: "rasa";
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
"raspell.md": {
	id: "raspell.md";
  slug: "raspell";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"rattle.md": {
	id: "rattle.md";
  slug: "rattle";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"raw.md": {
	id: "raw.md";
  slug: "raw";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ray.md": {
	id: "ray.md";
  slug: "ray";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ray3-run.md": {
	id: "ray3-run.md";
  slug: "ray3-run";
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
"rb-libsvm.md": {
	id: "rb-libsvm.md";
  slug: "rb-libsvm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"rda.md": {
	id: "rda.md";
  slug: "rda";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"rdatasets.md": {
	id: "rdatasets.md";
  slug: "rdatasets";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"rdetools.md": {
	id: "rdetools.md";
  slug: "rdetools";
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
"readme-ai.md": {
	id: "readme-ai.md";
  slug: "readme-ai";
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
"realtime-deployment.md": {
	id: "realtime-deployment.md";
  slug: "realtime-deployment";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"reasoning-using-language-models.md": {
	id: "reasoning-using-language-models.md";
  slug: "reasoning-using-language-models";
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
"recommended-reading.md": {
	id: "recommended-reading.md";
  slug: "recommended-reading";
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
"recommender.md": {
	id: "recommender.md";
  slug: "recommender";
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
"recraft.md": {
	id: "recraft.md";
  slug: "recraft";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"recurrent-neural-network-rnn.md": {
	id: "recurrent-neural-network-rnn.md";
  slug: "recurrent-neural-network-rnn";
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
"reddit-textmining.md": {
	id: "reddit-textmining.md";
  slug: "reddit-textmining";
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
"reemtree.md": {
	id: "reemtree.md";
  slug: "reemtree";
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
"regression-a-friendly-guide.md": {
	id: "regression-a-friendly-guide.md";
  slug: "regression-a-friendly-guide";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"regression-js.md": {
	id: "regression-js.md";
  slug: "regression-js";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"regression-models-applying-simple-poisson-regression.md": {
	id: "regression-models-applying-simple-poisson-regression.md";
  slug: "regression-models-applying-simple-poisson-regression";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"regression.md": {
	id: "regression.md";
  slug: "regression";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"regular-expression-puzzles-and-ai-coding-assistants.md": {
	id: "regular-expression-puzzles-and-ai-coding-assistants.md";
  slug: "regular-expression-puzzles-and-ai-coding-assistants";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"reinforcement-learning.md": {
	id: "reinforcement-learning.md";
  slug: "reinforcement-learning";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"relaxo.md": {
	id: "relaxo.md";
  slug: "relaxo";
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
"rep.md": {
	id: "rep.md";
  slug: "rep";
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
"republiclabs-ai.md": {
	id: "republiclabs-ai.md";
  slug: "republiclabs-ai";
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
"research-papers.md": {
	id: "research-papers.md";
  slug: "research-papers";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"research-quality-data-sets.md": {
	id: "research-quality-data-sets.md";
  slug: "research-quality-data-sets";
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
"resseract-lite.md": {
	id: "resseract-lite.md";
  slug: "resseract-lite";
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
"restricted-boltzmann-machines.md": {
	id: "restricted-boltzmann-machines.md";
  slug: "restricted-boltzmann-machines";
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
"retext.md": {
	id: "retext.md";
  slug: "retext";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"retinaface.md": {
	id: "retinaface.md";
  slug: "retinaface";
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
"retro.md": {
	id: "retro.md";
  slug: "retro";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"reve-image.md": {
	id: "reve-image.md";
  slug: "reve-image";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"revolution-analytics.md": {
	id: "revolution-analytics.md";
  slug: "revolution-analytics";
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
"rf.md": {
	id: "rf.md";
  slug: "rf";
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
"rgenoud.md": {
	id: "rgenoud.md";
  slug: "rgenoud";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"rgf-python.md": {
	id: "rgf-python.md";
  slug: "rgf-python";
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
"river.md": {
	id: "river.md";
  slug: "river";
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
"rl2.md": {
	id: "rl2.md";
  slug: "rl2";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"rl4co.md": {
	id: "rl4co.md";
  slug: "rl4co";
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
"rlinf.md": {
	id: "rlinf.md";
  slug: "rlinf";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"rllib.md": {
	id: "rllib.md";
  slug: "rllib";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"rltools.md": {
	id: "rltools.md";
  slug: "rltools";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"rmalschains.md": {
	id: "rmalschains.md";
  slug: "rmalschains";
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
"rminer.md": {
	id: "rminer.md";
  slug: "rminer";
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
"robert-miles-ai-safety.md": {
	id: "robert-miles-ai-safety.md";
  slug: "robert-miles-ai-safety";
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
"roboschool.md": {
	id: "roboschool.md";
  slug: "roboschool";
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
"rocanalysis.md": {
	id: "rocanalysis.md";
  slug: "rocanalysis";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"rock-paper-scissors.md": {
	id: "rock-paper-scissors.md";
  slug: "rock-paper-scissors";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"rockpool.md": {
	id: "rockpool.md";
  slug: "rockpool";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"rocr.md": {
	id: "rocr.md";
  slug: "rocr";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"roll.md": {
	id: "roll.md";
  slug: "roll";
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
"room-reinvented.md": {
	id: "room-reinvented.md";
  slug: "room-reinvented";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"root.md": {
	id: "root.md";
  slug: "root";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"rosetta.md": {
	id: "rosetta.md";
  slug: "rosetta";
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
"roughsets.md": {
	id: "roughsets.md";
  slug: "roughsets";
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
"rpart.md": {
	id: "rpart.md";
  slug: "rpart";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"rpmm.md": {
	id: "rpmm.md";
  slug: "rpmm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"rsnns.md": {
	id: "rsnns.md";
  slug: "rsnns";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"rsruby.md": {
	id: "rsruby.md";
  slug: "rsruby";
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
"ruby-machine-learning.md": {
	id: "ruby-machine-learning.md";
  slug: "ruby-machine-learning";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ruby-plot.md": {
	id: "ruby-plot.md";
  slug: "ruby-plot";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ruffus.md": {
	id: "ruffus.md";
  slug: "ruffus";
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
"rulefit.md": {
	id: "rulefit.md";
  slug: "rulefit";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"ruleskill.md": {
	id: "ruleskill.md";
  slug: "ruleskill";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"rumale.md": {
	id: "rumale.md";
  slug: "rumale";
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
"rundiffusion.md": {
	id: "rundiffusion.md";
  slug: "rundiffusion";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"runway-ml-for-everyone.md": {
	id: "runway-ml-for-everyone.md";
  slug: "runway-ml-for-everyone";
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
"rust-bert.md": {
	id: "rust-bert.md";
  slug: "rust-bert";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"rusticsom.md": {
	id: "rusticsom.md";
  slug: "rusticsom";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"rustlearn.md": {
	id: "rustlearn.md";
  slug: "rustlearn";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"rustnn.md": {
	id: "rustnn.md";
  slug: "rustnn";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"rusty-machine.md": {
	id: "rusty-machine.md";
  slug: "rusty-machine";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"rweka.md": {
	id: "rweka.md";
  slug: "rweka";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"rwkv-howto.md": {
	id: "rwkv-howto.md";
  slug: "rwkv-howto";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"rxshrink.md": {
	id: "rxshrink.md";
  slug: "rxshrink";
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
"saite.md": {
	id: "saite.md";
  slug: "saite";
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
"samoa.md": {
	id: "samoa.md";
  slug: "samoa";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"sampling.md": {
	id: "sampling.md";
  slug: "sampling";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"san-fransisco-government-open-data.md": {
	id: "san-fransisco-government-open-data.md";
  slug: "san-fransisco-government-open-data";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"sanebox.md": {
	id: "sanebox.md";
  slug: "sanebox";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"santiago-basulto.md": {
	id: "santiago-basulto.md";
  slug: "santiago-basulto";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"sarah-palin-lda.md": {
	id: "sarah-palin-lda.md";
  slug: "sarah-palin-lda";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"sarsa-state-action-reward-state-action-algorithm.md": {
	id: "sarsa-state-action-reward-state-action-algorithm.md";
  slug: "sarsa-state-action-reward-state-action-algorithm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"sas-stat.md": {
	id: "sas-stat.md";
  slug: "sas-stat";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"saul.md": {
	id: "saul.md";
  slug: "saul";
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
"scalanlp.md": {
	id: "scalanlp.md";
  slug: "scalanlp";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"scalding.md": {
	id: "scalding.md";
  slug: "scalding";
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
"scaler-blogs.md": {
	id: "scaler-blogs.md";
  slug: "scaler-blogs";
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
"scibench.md": {
	id: "scibench.md";
  slug: "scibench";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"scicloj-ml.md": {
	id: "scicloj-ml.md";
  slug: "scicloj-ml";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"scicloj.md": {
	id: "scicloj.md";
  slug: "scicloj";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"science-js.md": {
	id: "science-js.md";
  slug: "science-js";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"scikit-feature.md": {
	id: "scikit-feature.md";
  slug: "scikit-feature";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"scikit-image.md": {
	id: "scikit-image.md";
  slug: "scikit-image";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"scikit-learn-tutorials.md": {
	id: "scikit-learn-tutorials.md";
  slug: "scikit-learn-tutorials";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"scikit-learn.md": {
	id: "scikit-learn.md";
  slug: "scikit-learn";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"scikit-multiflow.md": {
	id: "scikit-multiflow.md";
  slug: "scikit-multiflow";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"scikit-multilearn.md": {
	id: "scikit-multilearn.md";
  slug: "scikit-multilearn";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"scikit-opt.md": {
	id: "scikit-opt.md";
  slug: "scikit-opt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"scikit-plot.md": {
	id: "scikit-plot.md";
  slug: "scikit-plot";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"scikit-posthocs.md": {
	id: "scikit-posthocs.md";
  slug: "scikit-posthocs";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"scikit-rebate.md": {
	id: "scikit-rebate.md";
  slug: "scikit-rebate";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"scikit-survival.md": {
	id: "scikit-survival.md";
  slug: "scikit-survival";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"scikitlearn.md": {
	id: "scikitlearn.md";
  slug: "scikitlearn";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"scilua.md": {
	id: "scilua.md";
  slug: "scilua";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"scipy-tutorials.md": {
	id: "scipy-tutorials.md";
  slug: "scipy-tutorials";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"scipy.md": {
	id: "scipy.md";
  slug: "scipy";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"sciruby.md": {
	id: "sciruby.md";
  slug: "sciruby";
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
"scoruby.md": {
	id: "scoruby.md";
  slug: "scoruby";
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
"scruffy.md": {
	id: "scruffy.md";
  slug: "scruffy";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"sda.md": {
	id: "sda.md";
  slug: "sda";
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
"seaborn.md": {
	id: "seaborn.md";
  slug: "seaborn";
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
"sean-j-taylor.md": {
	id: "sean-j-taylor.md";
  slug: "sean-j-taylor";
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
"sebastian-s-blog.md": {
	id: "sebastian-s-blog.md";
  slug: "sebastian-s-blog";
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
"security.md": {
	id: "security.md";
  slug: "security";
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
"segmentation-models-pytorch.md": {
	id: "segmentation-models-pytorch.md";
  slug: "segmentation-models-pytorch";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"segmentation-models.md": {
	id: "segmentation-models.md";
  slug: "segmentation-models";
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
"self-organized-maps.md": {
	id: "self-organized-maps.md";
  slug: "self-organized-maps";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"self-organizing-map.md": {
	id: "self-organizing-map.md";
  slug: "self-organizing-map";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"self-supervised-learning.md": {
	id: "self-supervised-learning.md";
  slug: "self-supervised-learning";
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
"sentence-transformers.md": {
	id: "sentence-transformers.md";
  slug: "sentence-transformers";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"sentencepiece.md": {
	id: "sentencepiece.md";
  slug: "sentencepiece";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"sentences.md": {
	id: "sentences.md";
  slug: "sentences";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"sentiment-analysis.md": {
	id: "sentiment-analysis.md";
  slug: "sentiment-analysis";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"sentiment-analyzer.md": {
	id: "sentiment-analyzer.md";
  slug: "sentiment-analyzer";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"sentiment-classifier.md": {
	id: "sentiment-classifier.md";
  slug: "sentiment-classifier";
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
"seqlearn.md": {
	id: "seqlearn.md";
  slug: "seqlearn";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"sequitur.md": {
	id: "sequitur.md";
  slug: "sequitur";
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
"serpent-ai.md": {
	id: "serpent-ai.md";
  slug: "serpent-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"serrano-academy.md": {
	id: "serrano-academy.md";
  slug: "serrano-academy";
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
"setfit.md": {
	id: "setfit.md";
  slug: "setfit";
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
"shaman.md": {
	id: "shaman.md";
  slug: "shaman";
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
"shark.md": {
	id: "shark.md";
  slug: "shark";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"shearlets.md": {
	id: "shearlets.md";
  slug: "shearlets";
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
"shimmy.md": {
	id: "shimmy.md";
  slug: "shimmy";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"shiny.md": {
	id: "shiny.md";
  slug: "shiny";
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
"shogun.md": {
	id: "shogun.md";
  slug: "shogun";
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
"siah.md": {
	id: "siah.md";
  slug: "siah";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"sigma-js.md": {
	id: "sigma-js.md";
  slug: "sigma-js";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"signalprocessing.md": {
	id: "signalprocessing.md";
  slug: "signalprocessing";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"sigopt-sklearn.md": {
	id: "sigopt-sklearn.md";
  slug: "sigopt-sklearn";
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
"simple-bayes.md": {
	id: "simple-bayes.md";
  slug: "simple-bayes";
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
"simple-mcmc.md": {
	id: "simple-mcmc.md";
  slug: "simple-mcmc";
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
"simple-statistics.md": {
	id: "simple-statistics.md";
  slug: "simple-statistics";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"simpleai.md": {
	id: "simpleai.md";
  slug: "simpleai";
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
"simplecv.md": {
	id: "simplecv.md";
  slug: "simplecv";
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
"sinabs.md": {
	id: "sinabs.md";
  slug: "sinabs";
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
"singularity.md": {
	id: "singularity.md";
  slug: "singularity";
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
"skbayes.md": {
	id: "skbayes.md";
  slug: "skbayes";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"skbel.md": {
	id: "skbel.md";
  slug: "skbel";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"skforecast.md": {
	id: "skforecast.md";
  slug: "skforecast";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"skills-plugins.md": {
	id: "skills-plugins.md";
  slug: "skills-plugins";
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
"sklearn-bayes.md": {
	id: "sklearn-bayes.md";
  slug: "sklearn-bayes";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"sklearn-crfsuite.md": {
	id: "sklearn-crfsuite.md";
  slug: "sklearn-crfsuite";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"sklearn-deap.md": {
	id: "sklearn-deap.md";
  slug: "sklearn-deap";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"sklearn-evaluation.md": {
	id: "sklearn-evaluation.md";
  slug: "sklearn-evaluation";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"sklearn-expertsys.md": {
	id: "sklearn-expertsys.md";
  slug: "sklearn-expertsys";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"sklearn-genetic-opt.md": {
	id: "sklearn-genetic-opt.md";
  slug: "sklearn-genetic-opt";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"skll.md": {
	id: "skll.md";
  slug: "skll";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"skorch.md": {
	id: "skorch.md";
  slug: "skorch";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"skrl.md": {
	id: "skrl.md";
  slug: "skrl";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"skrub.md": {
	id: "skrub.md";
  slug: "skrub";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"sktime.md": {
	id: "sktime.md";
  slug: "sktime";
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
"skynet.md": {
	id: "skynet.md";
  slug: "skynet";
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
"slemma.md": {
	id: "slemma.md";
  slug: "slemma";
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
"slime.md": {
	id: "slime.md";
  slug: "slime";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"slm-lab.md": {
	id: "slm-lab.md";
  slug: "slm-lab";
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
"smartcore.md": {
	id: "smartcore.md";
  slug: "smartcore";
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
"smile.md": {
	id: "smile.md";
  slug: "smile";
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
"snips-nlu.md": {
	id: "snips-nlu.md";
  slug: "snips-nlu";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"snntorch.md": {
	id: "snntorch.md";
  slug: "snntorch";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"snowball.md": {
	id: "snowball.md";
  slug: "snowball";
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
"snownlp.md": {
	id: "snownlp.md";
  slug: "snownlp";
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
"sofia-ml.md": {
	id: "sofia-ml.md";
  slug: "sofia-ml";
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
"softmax-regression.md": {
	id: "softmax-regression.md";
  slug: "softmax-regression";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"software-engineering-for-data-scientists.md": {
	id: "software-engineering-for-data-scientists.md";
  slug: "software-engineering-for-data-scientists";
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
"somoclu.md": {
	id: "somoclu.md";
  slug: "somoclu";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"sompy.md": {
	id: "sompy.md";
  slug: "sompy";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"sonnet.md": {
	id: "sonnet.md";
  slug: "sonnet";
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
"spacy.md": {
	id: "spacy.md";
  slug: "spacy";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"spago.md": {
	id: "spago.md";
  slug: "spago";
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
"spammy.md": {
	id: "spammy.md";
  slug: "spammy";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"spark-nlp.md": {
	id: "spark-nlp.md";
  slug: "spark-nlp";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"spark-notebook.md": {
	id: "spark-notebook.md";
  slug: "spark-notebook";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"spark.md": {
	id: "spark.md";
  slug: "spark";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"sparkit-learn.md": {
	id: "sparkit-learn.md";
  slug: "sparkit-learn";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"sparklingpandas.md": {
	id: "sparklingpandas.md";
  slug: "sparklingpandas";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"spearmint.md": {
	id: "spearmint.md";
  slug: "spearmint";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"spectralgraphtopology.md": {
	id: "spectralgraphtopology.md";
  slug: "spectralgraphtopology";
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
"speedster.md": {
	id: "speedster.md";
  slug: "speedster";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"spektral.md": {
	id: "spektral.md";
  slug: "spektral";
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
"spider.md": {
	id: "spider.md";
  slug: "spider";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"spinning-up.md": {
	id: "spinning-up.md";
  slug: "spinning-up";
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
"springboard.md": {
	id: "springboard.md";
  slug: "springboard";
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
"stable-baselines.md": {
	id: "stable-baselines.md";
  slug: "stable-baselines";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"stable-baselines3.md": {
	id: "stable-baselines3.md";
  slug: "stable-baselines3";
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
"stable-diffusion-explained.md": {
	id: "stable-diffusion-explained.md";
  slug: "stable-diffusion-explained";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"stable-diffusion-for-krita.md": {
	id: "stable-diffusion-for-krita.md";
  slug: "stable-diffusion-for-krita";
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
"stablediffusion.md": {
	id: "stablediffusion.md";
  slug: "stablediffusion";
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
"stacked-generalization.md": {
	id: "stacked-generalization.md";
  slug: "stacked-generalization";
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
"stackexchange-data-explorer.md": {
	id: "stackexchange-data-explorer.md";
  slug: "stackexchange-data-explorer";
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
"stan.md": {
	id: "stan.md";
  slug: "stan";
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
"stanford-classifier.md": {
	id: "stanford-classifier.md";
  slug: "stanford-classifier";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"stanford-corenlp-python.md": {
	id: "stanford-corenlp-python.md";
  slug: "stanford-corenlp-python";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"stanford-english-tokenizer.md": {
	id: "stanford-english-tokenizer.md";
  slug: "stanford-english-tokenizer";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"stanford-name-entity-recognizer.md": {
	id: "stanford-name-entity-recognizer.md";
  slug: "stanford-name-entity-recognizer";
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
"stanford-parser.md": {
	id: "stanford-parser.md";
  slug: "stanford-parser";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"stanford-phrasal-a-phrase-based-translation-system.md": {
	id: "stanford-phrasal-a-phrase-based-translation-system.md";
  slug: "stanford-phrasal-a-phrase-based-translation-system";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"stanford-pos-tagger.md": {
	id: "stanford-pos-tagger.md";
  slug: "stanford-pos-tagger";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"stanford-spied.md": {
	id: "stanford-spied.md";
  slug: "stanford-spied";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"stanford-temporal-tagger.md": {
	id: "stanford-temporal-tagger.md";
  slug: "stanford-temporal-tagger";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"stanford-tokens-regex.md": {
	id: "stanford-tokens-regex.md";
  slug: "stanford-tokens-regex";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"stanford-word-segmenter.md": {
	id: "stanford-word-segmenter.md";
  slug: "stanford-word-segmenter";
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
"startups-builtwithgenai.md": {
	id: "startups-builtwithgenai.md";
  slug: "startups-builtwithgenai";
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
"statistical-inference-scipy.md": {
	id: "statistical-inference-scipy.md";
  slug: "statistical-inference-scipy";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"statistiker.md": {
	id: "statistiker.md";
  slug: "statistiker";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"statkit.md": {
	id: "statkit.md";
  slug: "statkit";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"stats.md": {
	id: "stats.md";
  slug: "stats";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"statsmodels.md": {
	id: "statsmodels.md";
  slug: "statsmodels";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"stdlib.md": {
	id: "stdlib.md";
  slug: "stdlib";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"stellargraph.md": {
	id: "stellargraph.md";
  slug: "stellargraph";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"stemmer.md": {
	id: "stemmer.md";
  slug: "stemmer";
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
"steppy-toolkit.md": {
	id: "steppy-toolkit.md";
  slug: "steppy-toolkit";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"steppy.md": {
	id: "steppy.md";
  slug: "steppy";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"stepwise-regression.md": {
	id: "stepwise-regression.md";
  slug: "stepwise-regression";
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
"stockphotoai-net.md": {
	id: "stockphotoai-net.md";
  slug: "stockphotoai-net";
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
"streaming.md": {
	id: "streaming.md";
  slug: "streaming";
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
"suiron.md": {
	id: "suiron.md";
  slug: "suiron";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"suit-me-up.md": {
	id: "suit-me-up.md";
  slug: "suit-me-up";
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
"summer-school-2015.md": {
	id: "summer-school-2015.md";
  slug: "summer-school-2015";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"summing-bird.md": {
	id: "summing-bird.md";
  slug: "summing-bird";
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
"supacodes.md": {
	id: "supacodes.md";
  slug: "supacodes";
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
"superbench.md": {
	id: "superbench.md";
  slug: "superbench";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"superdatascience.md": {
	id: "superdatascience.md";
  slug: "superdatascience";
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
"superlearner.md": {
	id: "superlearner.md";
  slug: "superlearner";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"superlim.md": {
	id: "superlim.md";
  slug: "superlim";
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
"superset.md": {
	id: "superset.md";
  slug: "superset";
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
"support-vector-machines.md": {
	id: "support-vector-machines.md";
  slug: "support-vector-machines";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"surprise.md": {
	id: "surprise.md";
  slug: "surprise";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"survey-papers.md": {
	id: "survey-papers.md";
  slug: "survey-papers";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"svgo.md": {
	id: "svgo.md";
  slug: "svgo";
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
"svm-explorer.md": {
	id: "svm-explorer.md";
  slug: "svm-explorer";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"svm-support-vector-machine.md": {
	id: "svm-support-vector-machine.md";
  slug: "svm-support-vector-machine";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"svm.md": {
	id: "svm.md";
  slug: "svm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"svmpath.md": {
	id: "svmpath.md";
  slug: "svmpath";
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
"sweden-statistics.md": {
	id: "sweden-statistics.md";
  slug: "sweden-statistics";
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
"swift-ai.md": {
	id: "swift-ai.md";
  slug: "swift-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"swift-brain.md": {
	id: "swift-brain.md";
  slug: "swift-brain";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"swift-for-tensorflow.md": {
	id: "swift-for-tensorflow.md";
  slug: "swift-for-tensorflow";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"swift.md": {
	id: "swift.md";
  slug: "swift";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"swiftlearner.md": {
	id: "swiftlearner.md";
  slug: "swiftlearner";
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
"swix.md": {
	id: "swix.md";
  slug: "swix";
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
"sylvester.md": {
	id: "sylvester.md";
  slug: "sylvester";
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
"sympy.md": {
	id: "sympy.md";
  slug: "sympy";
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
"synaptic.md": {
	id: "synaptic.md";
  slug: "synaptic";
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
"synthia.md": {
	id: "synthia.md";
  slug: "synthia";
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
"systemml.md": {
	id: "systemml.md";
  slug: "systemml";
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
"tablecloth.md": {
	id: "tablecloth.md";
  slug: "tablecloth";
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
"talos.md": {
	id: "talos.md";
  slug: "talos";
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
"tat-dqa.md": {
	id: "tat-dqa.md";
  slug: "tat-dqa";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tat-qa.md": {
	id: "tat-qa.md";
  slug: "tat-qa";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tch-rs.md": {
	id: "tch-rs.md";
  slug: "tch-rs";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tdb.md": {
	id: "tdb.md";
  slug: "tdb";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tdsp-utilities.md": {
	id: "tdsp-utilities.md";
  slug: "tdsp-utilities";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"teachable-machine.md": {
	id: "teachable-machine.md";
  slug: "teachable-machine";
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
"tech-ml-dataset.md": {
	id: "tech-ml-dataset.md";
  slug: "tech-ml-dataset";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"techanjs.md": {
	id: "techanjs.md";
  slug: "techanjs";
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
"temporal-difference-learning.md": {
	id: "temporal-difference-learning.md";
  slug: "temporal-difference-learning";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tensor-js.md": {
	id: "tensor-js.md";
  slug: "tensor-js";
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
"tensorflex.md": {
	id: "tensorflex.md";
  slug: "tensorflex";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tensorflow-book.md": {
	id: "tensorflow-book.md";
  slug: "tensorflow-book";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tensorflow-examples.md": {
	id: "tensorflow-examples.md";
  slug: "tensorflow-examples";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tensorflow-federated.md": {
	id: "tensorflow-federated.md";
  slug: "tensorflow-federated";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tensorflow-fold.md": {
	id: "tensorflow-fold.md";
  slug: "tensorflow-fold";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tensorflow-js.md": {
	id: "tensorflow-js.md";
  slug: "tensorflow-js";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tensorflow-lingvo.md": {
	id: "tensorflow-lingvo.md";
  slug: "tensorflow-lingvo";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tensorflow-model-analysis.md": {
	id: "tensorflow-model-analysis.md";
  slug: "tensorflow-model-analysis";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tensorflow-privacy.md": {
	id: "tensorflow-privacy.md";
  slug: "tensorflow-privacy";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tensorflow-scala.md": {
	id: "tensorflow-scala.md";
  slug: "tensorflow-scala";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tensorflow-serving.md": {
	id: "tensorflow-serving.md";
  slug: "tensorflow-serving";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tensorflow-text.md": {
	id: "tensorflow-text.md";
  slug: "tensorflow-text";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tensorflow-tutorials.md": {
	id: "tensorflow-tutorials.md";
  slug: "tensorflow-tutorials";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tensorflow-upstream.md": {
	id: "tensorflow-upstream.md";
  slug: "tensorflow-upstream";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tensorflow.md": {
	id: "tensorflow.md";
  slug: "tensorflow";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tensorforce.md": {
	id: "tensorforce.md";
  slug: "tensorforce";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tensorlayer.md": {
	id: "tensorlayer.md";
  slug: "tensorlayer";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tensorlight.md": {
	id: "tensorlight.md";
  slug: "tensorlight";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tensorlm.md": {
	id: "tensorlm.md";
  slug: "tensorlm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tensorpack.md": {
	id: "tensorpack.md";
  slug: "tensorpack";
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
"tensorwatch.md": {
	id: "tensorwatch.md";
  slug: "tensorwatch";
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
"tenuo.md": {
	id: "tenuo.md";
  slug: "tenuo";
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
"tevfik-kosar.md": {
	id: "tevfik-kosar.md";
  slug: "tevfik-kosar";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"text-analysis.md": {
	id: "text-analysis.md";
  slug: "text-analysis";
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
"text-miner.md": {
	id: "text-miner.md";
  slug: "text-miner";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"text-to-image-models.md": {
	id: "text-to-image-models.md";
  slug: "text-to-image-models";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"text.md": {
	id: "text.md";
  slug: "text";
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
"textacy.md": {
	id: "textacy.md";
  slug: "textacy";
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
"textblob.md": {
	id: "textblob.md";
  slug: "textblob";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"textcl.md": {
	id: "textcl.md";
  slug: "textcl";
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
"textworld-react-agent.md": {
	id: "textworld-react-agent.md";
  slug: "textworld-react-agent";
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
"tf-agents.md": {
	id: "tf-agents.md";
  slug: "tf-agents";
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
"tf-gan.md": {
	id: "tf-gan.md";
  slug: "tf-gan";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tfdeploy.md": {
	id: "tfdeploy.md";
  slug: "tfdeploy";
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
"tflearn.md": {
	id: "tflearn.md";
  slug: "tflearn";
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
"tgp.md": {
	id: "tgp.md";
  slug: "tgp";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"thampi.md": {
	id: "thampi.md";
  slug: "thampi";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"the-analytics-engineering-podcast.md": {
	id: "the-analytics-engineering-podcast.md";
  slug: "the-analytics-engineering-podcast";
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
"the-bot.md": {
	id: "the-bot.md";
  slug: "the-bot";
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
"the-data-engineering-show.md": {
	id: "the-data-engineering-show.md";
  slug: "the-data-engineering-show";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"the-data-science-blog.md": {
	id: "the-data-science-blog.md";
  slug: "the-data-science-blog";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"the-data-science-handbook.md": {
	id: "the-data-science-handbook.md";
  slug: "the-data-science-handbook";
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
"the-elements-of-statistical-learning.md": {
	id: "the-elements-of-statistical-learning.md";
  slug: "the-elements-of-statistical-learning";
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
"the-gdelt-project.md": {
	id: "the-gdelt-project.md";
  slug: "the-gdelt-project";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"the-generative-ai-application-landscape.md": {
	id: "the-generative-ai-application-landscape.md";
  slug: "the-generative-ai-application-landscape";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"the-generative-ai-index.md": {
	id: "the-generative-ai-index.md";
  slug: "the-generative-ai-index";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"the-generative-ai-landscape.md": {
	id: "the-generative-ai-landscape.md";
  slug: "the-generative-ai-landscape";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"the-humanitarian-data-exchange.md": {
	id: "the-humanitarian-data-exchange.md";
  slug: "the-humanitarian-data-exchange";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"the-math-behind-artificial-intelligence.md": {
	id: "the-math-behind-artificial-intelligence.md";
  slug: "the-math-behind-artificial-intelligence";
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
"the-official-portal-for-european-data.md": {
	id: "the-official-portal-for-european-data.md";
  slug: "the-official-portal-for-european-data";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"the-practical-quant.md": {
	id: "the-practical-quant.md";
  slug: "the-practical-quant";
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
"the-radical-ai-podcast.md": {
	id: "the-radical-ai-podcast.md";
  slug: "the-radical-ai-podcast";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"theano.md": {
	id: "theano.md";
  slug: "theano";
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
"theory-learning.md": {
	id: "theory-learning.md";
  slug: "theory-learning";
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
"therfoo.md": {
	id: "therfoo.md";
  slug: "therfoo";
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
"think-like-a-data-scientist.md": {
	id: "think-like-a-data-scientist.md";
  slug: "think-like-a-data-scientist";
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
"thinking-stats-2.md": {
	id: "thinking-stats-2.md";
  slug: "thinking-stats-2";
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
"thundergbm.md": {
	id: "thundergbm.md";
  slug: "thundergbm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"thunderkittens.md": {
	id: "thunderkittens.md";
  slug: "thunderkittens";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"thundersvm.md": {
	id: "thundersvm.md";
  slug: "thundersvm";
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
"tidytuesday.md": {
	id: "tidytuesday.md";
  slug: "tidytuesday";
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
"timbl.md": {
	id: "timbl.md";
  slug: "timbl";
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
"time-series-modelling-and-analysis.md": {
	id: "time-series-modelling-and-analysis.md";
  slug: "time-series-modelling-and-analysis";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"time-series.md": {
	id: "time-series.md";
  slug: "time-series";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"timeline.md": {
	id: "timeline.md";
  slug: "timeline";
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
"timm.md": {
	id: "timm.md";
  slug: "timm";
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
"tm.md": {
	id: "tm.md";
  slug: "tm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tmap.md": {
	id: "tmap.md";
  slug: "tmap";
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
"tome.md": {
	id: "tome.md";
  slug: "tome";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tomlikesrobots.md": {
	id: "tomlikesrobots.md";
  slug: "tomlikesrobots";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tonic.md": {
	id: "tonic.md";
  slug: "tonic";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"toolbench.md": {
	id: "toolbench.md";
  slug: "toolbench";
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
"tools-and-resources-for-ai-art.md": {
	id: "tools-and-resources-for-ai-art.md";
  slug: "tools-and-resources-for-ai-art";
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
"top-13-data-science-programming-languages.md": {
	id: "top-13-data-science-programming-languages.md";
  slug: "top-13-data-science-programming-languages";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"top-ai-directories.md": {
	id: "top-ai-directories.md";
  slug: "top-ai-directories";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"top-data-science-interview-questions.md": {
	id: "top-data-science-interview-questions.md";
  slug: "top-data-science-interview-questions";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"topic-models.md": {
	id: "topic-models.md";
  slug: "topic-models";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"topicwizard.md": {
	id: "topicwizard.md";
  slug: "topicwizard";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"topik.md": {
	id: "topik.md";
  slug: "topik";
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
"tops.md": {
	id: "tops.md";
  slug: "tops";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"torch-datasets.md": {
	id: "torch-datasets.md";
  slug: "torch-datasets";
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
"torch7.md": {
	id: "torch7.md";
  slug: "torch7";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"torchaudio.md": {
	id: "torchaudio.md";
  slug: "torchaudio";
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
"torchdistill.md": {
	id: "torchdistill.md";
  slug: "torchdistill";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"torchkeras.md": {
	id: "torchkeras.md";
  slug: "torchkeras";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"torchopt.md": {
	id: "torchopt.md";
  slug: "torchopt";
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
"torchrl.md": {
	id: "torchrl.md";
  slug: "torchrl";
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
"torchtext.md": {
	id: "torchtext.md";
  slug: "torchtext";
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
"torchvision.md": {
	id: "torchvision.md";
  slug: "torchvision";
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
"touchstone.md": {
	id: "touchstone.md";
  slug: "touchstone";
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
"tpu-top-k-periodic-and-high-utility-patterns.md": {
	id: "tpu-top-k-periodic-and-high-utility-patterns.md";
  slug: "tpu-top-k-periodic-and-high-utility-patterns";
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
"transformer.md": {
	id: "transformer.md";
  slug: "transformer";
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
"transformers.md": {
	id: "transformers.md";
  slug: "transformers";
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
"treat.md": {
	id: "treat.md";
  slug: "treat";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tree.md": {
	id: "tree.md";
  slug: "tree";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tregex-tsurgeon-and-semgrex.md": {
	id: "tregex-tsurgeon-and-semgrex.md";
  slug: "tregex-tsurgeon-and-semgrex";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"trelent.md": {
	id: "trelent.md";
  slug: "trelent";
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
"tresnet-high-performance-gpu-dedicated-architecture.md": {
	id: "tresnet-high-performance-gpu-dedicated-architecture.md";
  slug: "tresnet-high-performance-gpu-dedicated-architecture";
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
"trfl.md": {
	id: "trfl.md";
  slug: "trfl";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tribou.md": {
	id: "tribou.md";
  slug: "tribou";
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
"triton.md": {
	id: "triton.md";
  slug: "triton";
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
"truss.md": {
	id: "truss.md";
  slug: "truss";
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
"turi-create.md": {
	id: "turi-create.md";
  slug: "turi-create";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"turn-napkin-sketch-into-a-web-app.md": {
	id: "turn-napkin-sketch-into-a-web-app.md";
  slug: "turn-napkin-sketch-into-a-web-app";
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
"tutorials-guides.md": {
	id: "tutorials-guides.md";
  slug: "tutorials-guides";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tutorials.md": {
	id: "tutorials.md";
  slug: "tutorials";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"tweetopic.md": {
	id: "tweetopic.md";
  slug: "tweetopic";
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
"uc-irvine-machine-learning-repository.md": {
	id: "uc-irvine-machine-learning-repository.md";
  slug: "uc-irvine-machine-learning-repository";
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
"uea-stemmer.md": {
	id: "uea-stemmer.md";
  slug: "uea-stemmer";
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
"umar-jamil-series.md": {
	id: "umar-jamil-series.md";
  slug: "umar-jamil-series";
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
"undata.md": {
	id: "undata.md";
  slug: "undata";
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
"understand-data-science-course-in-java.md": {
	id: "understand-data-science-course-in-java.md";
  slug: "understand-data-science-course-in-java";
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
"unicef-data.md": {
	id: "unicef-data.md";
  slug: "unicef-data";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"united-states-census-bureau.md": {
	id: "united-states-census-bureau.md";
  slug: "united-states-census-bureau";
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
"university-edition.md": {
	id: "university-edition.md";
  slug: "university-edition";
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
"upgini.md": {
	id: "upgini.md";
  slug: "upgini";
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
"uqlm.md": {
	id: "uqlm.md";
  slug: "uqlm";
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
"vademecum-of-practical-data-science.md": {
	id: "vademecum-of-practical-data-science.md";
  slug: "vademecum-of-practical-data-science";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"vae.md": {
	id: "vae.md";
  slug: "vae";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"vaex.md": {
	id: "vaex.md";
  slug: "vaex";
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
"vamshi-ambati.md": {
	id: "vamshi-ambati.md";
  slug: "vamshi-ambati";
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
"variancecharts.md": {
	id: "variancecharts.md";
  slug: "variancecharts";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"varselrf.md": {
	id: "varselrf.md";
  slug: "varselrf";
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
"vectorart-ai.md": {
	id: "vectorart-ai.md";
  slug: "vectorart-ai";
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
"veri-bilimi-istanbul.md": {
	id: "veri-bilimi-istanbul.md";
  slug: "veri-bilimi-istanbul";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"veritasgraph.md": {
	id: "veritasgraph.md";
  slug: "veritasgraph";
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
"verl.md": {
	id: "verl.md";
  slug: "verl";
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
"vescale.md": {
	id: "vescale.md";
  slug: "vescale";
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
"vida.md": {
	id: "vida.md";
  slug: "vida";
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
"video.md": {
	id: "video.md";
  slug: "video";
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
"vigra.md": {
	id: "vigra.md";
  slug: "vigra";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"vigranumpy.md": {
	id: "vigranumpy.md";
  slug: "vigranumpy";
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
"vispy.md": {
	id: "vispy.md";
  slug: "vispy";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"visual-data-mining-and-machine-learning.md": {
	id: "visual-data-mining-and-machine-learning.md";
  slug: "visual-data-mining-and-machine-learning";
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
"visualize-ml.md": {
	id: "visualize-ml.md";
  slug: "visualize-ml";
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
"visualwebarena.md": {
	id: "visualwebarena.md";
  slug: "visualwebarena";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"vizdoom.md": {
	id: "vizdoom.md";
  slug: "vizdoom";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"vizzu.md": {
	id: "vizzu.md";
  slug: "vizzu";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"vlfeat.md": {
	id: "vlfeat.md";
  slug: "vlfeat";
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
"vosk.md": {
	id: "vosk.md";
  slug: "vosk";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"vowpal-wabbit-vw.md": {
	id: "vowpal-wabbit-vw.md";
  slug: "vowpal-wabbit-vw";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"vowpal-wabbit.md": {
	id: "vowpal-wabbit.md";
  slug: "vowpal-wabbit";
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
"warp-ctc.md": {
	id: "warp-ctc.md";
  slug: "warp-ctc";
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
"we-math.md": {
	id: "we-math.md";
  slug: "we-math";
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
"webdnn.md": {
	id: "webdnn.md";
  slug: "webdnn";
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
"webnn.md": {
	id: "webnn.md";
  slug: "webnn";
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
"weka.md": {
	id: "weka.md";
  slug: "weka";
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
"wes-mckinney.md": {
	id: "wes-mckinney.md";
  slug: "wes-mckinney";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"what-does-a-data-scientist-do.md": {
	id: "what-does-a-data-scientist-do.md";
  slug: "what-does-a-data-scientist-do";
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
"what-is-generative-ai.md": {
	id: "what-is-generative-ai.md";
  slug: "what-is-generative-ai";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"what-is-machine-learning.md": {
	id: "what-is-machine-learning.md";
  slug: "what-is-machine-learning";
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
"what-s-the-point.md": {
	id: "what-s-the-point.md";
  slug: "what-s-the-point";
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
"whats-ai-louis-bouchard.md": {
	id: "whats-ai-louis-bouchard.md";
  slug: "whats-ai-louis-bouchard";
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
"whatsthebigdata.md": {
	id: "whatsthebigdata.md";
  slug: "whatsthebigdata";
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
"whoops.md": {
	id: "whoops.md";
  slug: "whoops";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"why-you-should-work-on-ai-agents.md": {
	id: "why-you-should-work-on-ai-agents.md";
  slug: "why-you-should-work-on-ai-agents";
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
"wiki-challenge.md": {
	id: "wiki-challenge.md";
  slug: "wiki-challenge";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"windml.md": {
	id: "windml.md";
  slug: "windml";
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
"wine-quality.md": {
	id: "wine-quality.md";
  slug: "wine-quality";
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
"word-embedding.md": {
	id: "word-embedding.md";
  slug: "word-embedding";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"word-tokenizers.md": {
	id: "word-tokenizers.md";
  slug: "word-tokenizers";
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
"wordnet.md": {
	id: "wordnet.md";
  slug: "wordnet";
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
"workflow-automation-softwares.md": {
	id: "workflow-automation-softwares.md";
  slug: "workflow-automation-softwares";
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
"world-bank-data.md": {
	id: "world-bank-data.md";
  slug: "world-bank-data";
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
"wrangler.md": {
	id: "wrangler.md";
  slug: "wrangler";
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
"xad.md": {
	id: "xad.md";
  slug: "xad";
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
"xcessiv.md": {
	id: "xcessiv.md";
  slug: "xcessiv";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"xerial.md": {
	id: "xerial.md";
  slug: "xerial";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"xgboost-extreme-gradient-boosting.md": {
	id: "xgboost-extreme-gradient-boosting.md";
  slug: "xgboost-extreme-gradient-boosting";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"xgboost-node.md": {
	id: "xgboost-node.md";
  slug: "xgboost-node";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"xgboost-r.md": {
	id: "xgboost-r.md";
  slug: "xgboost-r";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"xgboost.md": {
	id: "xgboost.md";
  slug: "xgboost";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"xlearn.md": {
	id: "xlearn.md";
  slug: "xlearn";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"xrbm.md": {
	id: "xrbm.md";
  slug: "xrbm";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"yalign.md": {
	id: "yalign.md";
  slug: "yalign";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"yase.md": {
	id: "yase.md";
  slug: "yase";
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
"ydf.md": {
	id: "ydf.md";
  slug: "ydf";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"yellowbrick.md": {
	id: "yellowbrick.md";
  slug: "yellowbrick";
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
"yet-another-data-blog.md": {
	id: "yet-another-data-blog.md";
  slug: "yet-another-data-blog";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"yhat-blog.md": {
	id: "yhat-blog.md";
  slug: "yhat-blog";
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
"yolov3.md": {
	id: "yolov3.md";
  slug: "yolov3";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"yolov5.md": {
	id: "yolov5.md";
  slug: "yolov5";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"yolov8.md": {
	id: "yolov8.md";
  slug: "yolov8";
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
"your-guide-to-latent-dirichlet-allocation.md": {
	id: "your-guide-to-latent-dirichlet-allocation.md";
  slug: "your-guide-to-latent-dirichlet-allocation";
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
"z3d.md": {
	id: "z3d.md";
  slug: "z3d";
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
"zingchart.md": {
	id: "zingchart.md";
  slug: "zingchart";
  body: string;
  collection: "agents";
  data: InferEntrySchema<"agents">
} & { render(): Render[".md"] };
"zipline.md": {
	id: "zipline.md";
  slug: "zipline";
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
