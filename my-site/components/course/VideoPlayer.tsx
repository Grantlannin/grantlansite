import type { LessonVideo } from "@/lib/courses/identity-minicourse";
import { getVideoEmbedUrl } from "@/lib/courses/identity-minicourse";

type VideoPlayerProps = {
  video: LessonVideo;
  title: string;
};

export function VideoPlayer({ video, title }: VideoPlayerProps) {
  return (
    <div className="course-video-wrap">
      <iframe
        src={getVideoEmbedUrl(video)}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        className="course-video"
      />
    </div>
  );
}
