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
"adon-ai.md": {
	id: "adon-ai.md";
  slug: "adon-ai";
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
"agentic-radar.md": {
	id: "agentic-radar.md";
  slug: "agentic-radar";
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
"agentset-ai.md": {
	id: "agentset-ai.md";
  slug: "agentset-ai";
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
"ai-character-for-gpt.md": {
	id: "ai-character-for-gpt.md";
  slug: "ai-character-for-gpt";
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
"ai-text.md": {
	id: "ai-text.md";
  slug: "ai-text";
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
"ailaflow-ai-agents-no-code-platform.md": {
	id: "ailaflow-ai-agents-no-code-platform.md";
  slug: "ailaflow-ai-agents-no-code-platform";
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
"aiva.md": {
	id: "aiva.md";
  slug: "aiva";
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
"alphahoundai.md": {
	id: "alphahoundai.md";
  slug: "alphahoundai";
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
"amazon-q-developer.md": {
	id: "amazon-q-developer.md";
  slug: "amazon-q-developer";
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
"ankidecks-ai.md": {
	id: "ankidecks-ai.md";
  slug: "ankidecks-ai";
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
"architecture-helper.md": {
	id: "architecture-helper.md";
  slug: "architecture-helper";
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
"audify-ai.md": {
	id: "audify-ai.md";
  slug: "audify-ai";
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
"avatar-ai.md": {
	id: "avatar-ai.md";
  slug: "avatar-ai";
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
"awesome-ai-models.md": {
	id: "awesome-ai-models.md";
  slug: "awesome-ai-models";
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
"basic-security-helper.md": {
	id: "basic-security-helper.md";
  slug: "basic-security-helper";
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
"best-of-ai.md": {
	id: "best-of-ai.md";
  slug: "best-of-ai";
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
"bing-chat.md": {
	id: "bing-chat.md";
  slug: "bing-chat";
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
"blog-post-how-to-use-crew-ai.md": {
	id: "blog-post-how-to-use-crew-ai.md";
  slug: "blog-post-how-to-use-crew-ai";
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
"boomy.md": {
	id: "boomy.md";
  slug: "boomy";
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
"bricks.md": {
	id: "bricks.md";
  slug: "bricks";
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
"cald-ai.md": {
	id: "cald-ai.md";
  slug: "cald-ai";
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
"canva.md": {
	id: "canva.md";
  slug: "canva";
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
"chadgpt.md": {
	id: "chadgpt.md";
  slug: "chadgpt";
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
"chat-with-pdf-by-copilot-us.md": {
	id: "chat-with-pdf-by-copilot-us.md";
  slug: "chat-with-pdf-by-copilot-us";
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
"chatfuel.md": {
	id: "chatfuel.md";
  slug: "chatfuel";
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
"chatgpt-prompt-engineering-for-developers.md": {
	id: "chatgpt-prompt-engineering-for-developers.md";
  slug: "chatgpt-prompt-engineering-for-developers";
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
"chatwithcloud.md": {
	id: "chatwithcloud.md";
  slug: "chatwithcloud";
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
"claude-3.md": {
	id: "claude-3.md";
  slug: "claude-3";
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
"cleverbee.md": {
	id: "cleverbee.md";
  slug: "cleverbee";
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
"co-here.md": {
	id: "co-here.md";
  slug: "co-here";
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
"coderabbit.md": {
	id: "coderabbit.md";
  slug: "coderabbit";
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
"cogram.md": {
	id: "cogram.md";
  slug: "cogram";
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
"consensus.md": {
	id: "consensus.md";
  slug: "consensus";
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
"cosmos.md": {
	id: "cosmos.md";
  slug: "cosmos";
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
"craiyon.md": {
	id: "craiyon.md";
  slug: "craiyon";
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
"custompod-io.md": {
	id: "custompod-io.md";
  slug: "custompod-io";
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
"dall-e-2.md": {
	id: "dall-e-2.md";
  slug: "dall-e-2";
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
"datapup.md": {
	id: "datapup.md";
  slug: "datapup";
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
"deepl-write.md": {
	id: "deepl-write.md";
  slug: "deepl-write";
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
"defender-for-endpoint-guardian.md": {
	id: "defender-for-endpoint-guardian.md";
  slug: "defender-for-endpoint-guardian";
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
"dittto-ai.md": {
	id: "dittto-ai.md";
  slug: "dittto-ai";
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
"draggan.md": {
	id: "draggan.md";
  slug: "draggan";
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
"ecrett-music.md": {
	id: "ecrett-music.md";
  slug: "ecrett-music";
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
"embedchain.md": {
	id: "embedchain.md";
  slug: "embedchain";
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
"eu-cra-assistant.md": {
	id: "eu-cra-assistant.md";
  slug: "eu-cra-assistant";
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
"excelmatic.md": {
	id: "excelmatic.md";
  slug: "excelmatic";
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
"fairytailai.md": {
	id: "fairytailai.md";
  slug: "fairytailai";
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
"finchat.md": {
	id: "finchat.md";
  slug: "finchat";
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
"flexapp.md": {
	id: "flexapp.md";
  slug: "flexapp";
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
"forefront.md": {
	id: "forefront.md";
  slug: "forefront";
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
"gaugan2.md": {
	id: "gaugan2.md";
  slug: "gaugan2";
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
"generative-ai-audio.md": {
	id: "generative-ai-audio.md";
  slug: "generative-ai-audio";
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
"generative-ai-video.md": {
	id: "generative-ai-video.md";
  slug: "generative-ai-video";
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
"geoffrey-hinton-s-neural-networks-for-machine-learning.md": {
	id: "geoffrey-hinton-s-neural-networks-for-machine-learning.md";
  slug: "geoffrey-hinton-s-neural-networks-for-machine-learning";
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
"ghostwriter.md": {
	id: "ghostwriter.md";
  slug: "ghostwriter";
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
"github-copilot.md": {
	id: "github-copilot.md";
  slug: "github-copilot";
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
"gito.md": {
	id: "gito.md";
  slug: "gito";
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
"google-adk.md": {
	id: "google-adk.md";
  slug: "google-adk";
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
"gpt-4o-mini.md": {
	id: "gpt-4o-mini.md";
  slug: "gpt-4o-mini";
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
"gpt4all.md": {
	id: "gpt4all.md";
  slug: "gpt4all";
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
"gradgpt.md": {
	id: "gradgpt.md";
  slug: "gradgpt";
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
"harbor.md": {
	id: "harbor.md";
  slug: "harbor";
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
"have-i-been-trained.md": {
	id: "have-i-been-trained.md";
  slug: "have-i-been-trained";
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
"hexabot.md": {
	id: "hexabot.md";
  slug: "hexabot";
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
"hour-one.md": {
	id: "hour-one.md";
  slug: "hour-one";
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
"human-generator.md": {
	id: "human-generator.md";
  slug: "human-generator";
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
"iac-code-guardian.md": {
	id: "iac-code-guardian.md";
  slug: "iac-code-guardian";
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
"imagen.md": {
	id: "imagen.md";
  slug: "imagen";
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
"impacketgpt.md": {
	id: "impacketgpt.md";
  slug: "impacketgpt";
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
"ioc-analyzer.md": {
	id: "ioc-analyzer.md";
  slug: "ioc-analyzer";
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
"kazimir-ai.md": {
	id: "kazimir-ai.md";
  slug: "kazimir-ai";
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
"klingai.md": {
	id: "klingai.md";
  slug: "klingai";
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
"laika.md": {
	id: "laika.md";
  slug: "laika";
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
"langfa-st.md": {
	id: "langfa-st.md";
  slug: "langfa-st";
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
"lavender.md": {
	id: "lavender.md";
  slug: "lavender";
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
"learn-prompting.md": {
	id: "learn-prompting.md";
  slug: "learn-prompting";
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
"libraire.md": {
	id: "libraire.md";
  slug: "libraire";
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
"llama-2.md": {
	id: "llama-2.md";
  slug: "llama-2";
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
"llama.md": {
	id: "llama.md";
  slug: "llama";
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
"llm-leaderboard.md": {
	id: "llm-leaderboard.md";
  slug: "llm-leaderboard";
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
"lmql.md": {
	id: "lmql.md";
  slug: "lmql";
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
"loopin-ai.md": {
	id: "loopin-ai.md";
  slug: "loopin-ai";
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
"lovo-ai.md": {
	id: "lovo-ai.md";
  slug: "lovo-ai";
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
"magicunprotect.md": {
	id: "magicunprotect.md";
  slug: "magicunprotect";
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
"marblism.md": {
	id: "marblism.md";
  slug: "marblism";
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
"mathos-ai.md": {
	id: "mathos-ai.md";
  slug: "mathos-ai";
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
"meetgeek.md": {
	id: "meetgeek.md";
  slug: "meetgeek";
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
"mem.md": {
	id: "mem.md";
  slug: "mem";
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
"microsoft-semantic-kernel.md": {
	id: "microsoft-semantic-kernel.md";
  slug: "microsoft-semantic-kernel";
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
"mindpal.md": {
	id: "mindpal.md";
  slug: "mindpal";
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
"mocha.md": {
	id: "mocha.md";
  slug: "mocha";
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
"moonbeam.md": {
	id: "moonbeam.md";
  slug: "moonbeam";
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
"murf-ai.md": {
	id: "murf-ai.md";
  slug: "murf-ai";
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
"napkin.md": {
	id: "napkin.md";
  slug: "napkin";
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
"notebooklm.md": {
	id: "notebooklm.md";
  slug: "notebooklm";
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
"notte.md": {
	id: "notte.md";
  slug: "notte";
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
"ollama.md": {
	id: "ollama.md";
  slug: "ollama";
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
"openagents.md": {
	id: "openagents.md";
  slug: "openagents";
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
"openai-downtime-monitor.md": {
	id: "openai-downtime-monitor.md";
  slug: "openai-downtime-monitor";
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
"openmanus.md": {
	id: "openmanus.md";
  slug: "openmanus";
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
"opik.md": {
	id: "opik.md";
  slug: "opik";
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
"other-ai-tools.md": {
	id: "other-ai-tools.md";
  slug: "other-ai-tools";
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
"owasp-llm-advisor.md": {
	id: "owasp-llm-advisor.md";
  slug: "owasp-llm-advisor";
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
"patience-ai.md": {
	id: "patience-ai.md";
  slug: "patience-ai";
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
"pieces.md": {
	id: "pieces.md";
  slug: "pieces";
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
"plandex.md": {
	id: "plandex.md";
  slug: "plandex";
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
"podcast-ai.md": {
	id: "podcast-ai.md";
  slug: "podcast-ai";
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
"ponzu.md": {
	id: "ponzu.md";
  slug: "ponzu";
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
"postwise.md": {
	id: "postwise.md";
  slug: "postwise";
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
"prediction-guard.md": {
	id: "prediction-guard.md";
  slug: "prediction-guard";
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
"privategpt.md": {
	id: "privategpt.md";
  slug: "privategpt";
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
"promptbase.md": {
	id: "promptbase.md";
  slug: "promptbase";
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
"rabbitholes-ai.md": {
	id: "rabbitholes-ai.md";
  slug: "rabbitholes-ai";
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
"rapidtextai.md": {
	id: "rapidtextai.md";
  slug: "rapidtextai";
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
"refinder-ai.md": {
	id: "refinder-ai.md";
  slug: "refinder-ai";
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
"rephrase-ai.md": {
	id: "rephrase-ai.md";
  slug: "rephrase-ai";
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
"republiclabs-ai.md": {
	id: "republiclabs-ai.md";
  slug: "republiclabs-ai";
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
"respeecher.md": {
	id: "respeecher.md";
  slug: "respeecher";
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
"risk-guardian.md": {
	id: "risk-guardian.md";
  slug: "risk-guardian";
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
"room-reinvented.md": {
	id: "room-reinvented.md";
  slug: "room-reinvented";
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
"salesagent-chat.md": {
	id: "salesagent-chat.md";
  slug: "salesagent-chat";
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
"scale-spellbook.md": {
	id: "scale-spellbook.md";
  slug: "scale-spellbook";
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
"scribbl.md": {
	id: "scribbl.md";
  slug: "scribbl";
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
"seventh-sense.md": {
	id: "seventh-sense.md";
  slug: "seventh-sense";
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
"slideswizard.md": {
	id: "slideswizard.md";
  slug: "slideswizard";
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
"smartly-io.md": {
	id: "smartly-io.md";
  slug: "smartly-io";
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
"soc-copilot.md": {
	id: "soc-copilot.md";
  slug: "soc-copilot";
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
"sourcely.md": {
	id: "sourcely.md";
  slug: "sourcely";
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
"squidshing.md": {
	id: "squidshing.md";
  slug: "squidshing";
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
"starops.md": {
	id: "starops.md";
  slug: "starops";
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
"stockphotoai-net.md": {
	id: "stockphotoai-net.md";
  slug: "stockphotoai-net";
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
"superagi.md": {
	id: "superagi.md";
  slug: "superagi";
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
"sybill.md": {
	id: "sybill.md";
  slug: "sybill";
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
"systems-security-analyst.md": {
	id: "systems-security-analyst.md";
  slug: "systems-security-analyst";
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
"teleprompter.md": {
	id: "teleprompter.md";
  slug: "teleprompter";
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
"tensorzero.md": {
	id: "tensorzero.md";
  slug: "tensorzero";
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
"textsynth-server-benchmarks.md": {
	id: "textsynth-server-benchmarks.md";
  slug: "textsynth-server-benchmarks";
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
"this-image-does-not-exist.md": {
	id: "this-image-does-not-exist.md";
  slug: "this-image-does-not-exist";
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
"tiledesk.md": {
	id: "tiledesk.md";
  slug: "tiledesk";
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
"top-ai-directories.md": {
	id: "top-ai-directories.md";
  slug: "top-ai-directories";
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
"transgate.md": {
	id: "transgate.md";
  slug: "transgate";
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
"trolly-ai.md": {
	id: "trolly-ai.md";
  slug: "trolly-ai";
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
"turbopilot.md": {
	id: "turbopilot.md";
  slug: "turbopilot";
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
"vall-e-x.md": {
	id: "vall-e-x.md";
  slug: "vall-e-x";
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
"veritone-voice.md": {
	id: "veritone-voice.md";
  slug: "veritone-voice";
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
"vocalreplica.md": {
	id: "vocalreplica.md";
  slug: "vocalreplica";
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
"webchatgpt.md": {
	id: "webchatgpt.md";
  slug: "webchatgpt";
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
"whichsat.md": {
	id: "whichsat.md";
  slug: "whichsat";
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
"whodb.md": {
	id: "whodb.md";
  slug: "whodb";
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
"zenmic-com.md": {
	id: "zenmic-com.md";
  slug: "zenmic-com";
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
"blogs": {
"getting-started-with-ai-agents.md": {
	id: "getting-started-with-ai-agents.md";
  slug: "getting-started-with-ai-agents";
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
