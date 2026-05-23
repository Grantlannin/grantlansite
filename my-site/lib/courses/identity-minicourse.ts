export type LessonVideo =
  | { provider: "loom"; id: string }
  | { provider: "youtube"; id: string };

export type Lesson = {
  number: number;
  title: string;
  video: LessonVideo;
};

export const IDENTITY_MINICOURSE = {
  slug: "identityminicourse",
  title: "Your Identity Mini Course",
  description:
    "Five lessons on identity and becoming who you choose to be.",
  optInNote: "(course link will also be emailed to you, so you have it)",
  storageKey: "identity-minicourse-unlocked",
  lessons: [
    {
      number: 1,
      title: "seeing reality with new eyes",
      video: { provider: "loom", id: "821a059989bb46c5a8ba3f3867ec1319" },
    },
    {
      number: 2,
      title: "Results in your life = identify game",
      video: { provider: "loom", id: "f98f320b19a94b05b2be92d4d165bea9" },
    },
    {
      number: 3,
      title: "Crafting your new identity",
      video: { provider: "loom", id: "60593b8e0f544fb0a6591edcc6eca62b" },
    },
    {
      number: 4,
      title: "Sidestep your identity",
      video: { provider: "youtube", id: "SVwUsvH7jvk" },
    },
    {
      number: 5,
      title: "How to leave an old identity behind",
      video: { provider: "youtube", id: "O51BNou8aeY" },
    },
  ] satisfies Lesson[],
} as const;

export function getVideoEmbedUrl(video: LessonVideo): string {
  if (video.provider === "loom") {
    return `https://www.loom.com/embed/${video.id}?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true`;
  }
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    controls: "1",
    fs: "1",
    iv_load_policy: "3",
  });
  return `https://www.youtube-nocookie.com/embed/${video.id}?${params.toString()}`;
}
